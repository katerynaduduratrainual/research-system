// Run: node scripts/tests/lint.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { makeWiki, run, day, stamp, domain, idea, brief, evidence, source, topic, report, critique, analysis } from "./helpers.mjs";

const lint = (...entries) => run("lint.mjs", makeWiki(...entries));
const errors = out => out.split("\n").filter(l => l.startsWith("ERROR"));
const warnings = out => out.split("\n").filter(l => l.startsWith("WARNING"));
const hasError = (out, text) => errors(out).some(l => l.includes(text));
const hasWarning = (out, text) => warnings(out).some(l => l.includes(text));

test("an empty wiki passes", () => {
  const { out, code } = lint();
  assert.match(out, /lint: 0 error\(s\), 0 warning\(s\), 0 page\(s\)/);
  assert.equal(code, 0);
});

// --- domains ----------------------------------------------------------------

test("accepts a valid active domain", () => {
  const { out, code } = lint(domain("D-001"));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects an unknown phase", () => {
  const { out } = lint(domain("D-001", { phase: "depth" }));
  assert.ok(hasError(out, 'invalid phase "depth"'), out);
});

test("rejects a domain missing a layer in confidence", () => {
  const { out } = lint(domain("D-001", { confidence: { fundamentals: null, demand: null, models: null, signals: null } }));
  assert.ok(hasError(out, "confidence missing entry"), out);
});

test("rejects an active domain without owner", () => {
  const { out } = lint(domain("D-001", { owner: "" }));
  assert.ok(hasError(out, "active domain without owner"), out);
});

test("rejects a domain whose file name does not start with its id", () => {
  const [, text] = domain("D-001");
  const { out } = lint(["wiki/domains/local-llm.md", text]);
  assert.ok(hasError(out, "file name must start with D-001-"), out);
});

// --- ideas ------------------------------------------------------------------

test("accepts an idea under an existing domain", () => {
  const { out, code } = lint(domain("D-001"), idea("I-001", { domain: "D-001" }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects an unknown idea stage", () => {
  const { out } = lint(idea("I-001", { stage: "screening" }));
  assert.ok(hasError(out, 'invalid stage "screening"'), out);
});

test("rejects an idea pointing at a missing domain", () => {
  const { out } = lint(idea("I-001", { domain: "D-009" }));
  assert.ok(hasError(out, "unknown domain D-009"), out);
});

// --- briefs -----------------------------------------------------------------

test("accepts a running domain brief with a layer", () => {
  const { out, code } = lint(domain("D-001"), brief("B-001", {
    domain: "D-001", layer: "fundamentals", status: "running", run_stage: "verify", run_started: stamp(10),
  }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects a domain layer on an idea brief", () => {
  const { out } = lint(idea("I-001"), brief("B-001", { idea: "I-001", layer: "fundamentals" }));
  assert.ok(hasError(out, 'invalid layer "fundamentals" for an idea brief'), out);
});

test("rejects the retired run stages", () => {
  const { out } = lint(brief("B-001", { status: "running", run_stage: "librarian" }));
  assert.ok(hasError(out, 'invalid run_stage "librarian"'), out);
});

test("rejects a running brief without run_stage", () => {
  const { out } = lint(brief("B-001", { status: "running" }));
  assert.ok(hasError(out, "running brief without run_stage"), out);
});

test("rejects an approved brief without author", () => {
  const { out } = lint(brief("B-001", { status: "approved", author: "" }));
  assert.ok(hasError(out, "brief past gate 1 without author"), out);
});

test("warns when a collected brief has waited a week for gate 2", () => {
  const { out } = lint(brief("B-001", { status: "collected", run_finished: `${day(-8)}T10:00` }));
  assert.ok(hasWarning(out, "awaiting gate 2 for 7+ days"), out);
});

test("does not warn about gate 2 once reviewed or while under a week", () => {
  assert.ok(!hasWarning(lint(brief("B-001", { status: "collected", run_finished: `${day(-8)}T10:00`, reviewed: day(-7) })).out, "awaiting gate 2"));
  assert.ok(!hasWarning(lint(brief("B-001", { status: "collected", run_finished: `${day(-2)}T10:00` })).out, "awaiting gate 2"));
});

// --- evidence ---------------------------------------------------------------

test("accepts evidence that names only its brief", () => {
  const { out, code } = lint(brief("B-001"), source(), evidence("E-B001-1-01", { brief: "B-001" }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects evidence with neither brief nor domain nor idea", () => {
  const { out } = lint(source(), evidence("E-ING-20261006-01"));
  assert.ok(hasError(out, "evidence without brief, domain or idea"), out);
});

test("rejects an evidence id outside the three patterns", () => {
  const { out } = lint(brief("B-001"), source(), evidence("E-B001-R-01", { brief: "B-001" }));
  assert.ok(hasError(out, 'invalid evidence id "E-B001-R-01"'), out);
});

test("accepts critic evidence on a domain", () => {
  const { out, code } = lint(domain("D-001"), source(), evidence("E-D001-C-01", { domain: "D-001" }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

// --- reports and the critique rule -------------------------------------------

test("a primer needs no critique", () => {
  const { out, code } = lint(domain("D-001"), report("R-001", "D-001", "primer"));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("a domain report without a critique is an error", () => {
  const { out } = lint(domain("D-001"), report("R-001", "D-001", "domain"));
  assert.ok(hasError(out, "no critique for D-001"), out);
});

test("a domain report whose critique is older than the newest reviewed brief is an error", () => {
  const { out } = lint(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(0) }),
    critique("D-001", { created: day(-2), updated: day(-2) }),
    report("R-001", "D-001", "domain"),
  );
  assert.ok(hasError(out, "older than the newest reviewed brief"), out);
});

test("a domain report with a fresh critique passes", () => {
  const { out, code } = lint(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(-1) }),
    critique("D-001"),
    report("R-001", "D-001", "domain"),
  );
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("a final report whose critique is older than the analysis is an error", () => {
  const { out } = lint(
    idea("I-001"),
    analysis("I-001", { updated: day(0) }),
    critique("I-001", { created: day(-1), updated: day(-1) }),
    report("R-001", "I-001", "final"),
  );
  assert.ok(hasError(out, "older than the analysis"), out);
});

test("rejects an unknown report type and a report on a missing target", () => {
  const { out } = lint(domain("D-001"), report("R-001", "D-001", "screen"), report("R-002", "I-009", "primer"));
  assert.ok(hasError(out, 'invalid type "screen"'), out);
  assert.ok(hasError(out, "unknown target I-009"), out);
});

// --- ids and links ------------------------------------------------------------

test("rejects duplicate ids and broken links", () => {
  const { out } = lint(domain("D-001"), ["wiki/domains/D-001-y.md", domain("D-001")[1]], topic("T-x", { domains: ["D-007"] }));
  assert.ok(hasError(out, "duplicate id D-001"), out);
  assert.ok(hasError(out, "broken link [[D-007]]"), out);
});

// --- fix --------------------------------------------------------------------

test("--fix fills the derived lists on a domain and an idea", () => {
  const root = makeWiki(
    domain("D-001"), idea("I-001", { domain: "D-001" }),
    brief("B-001", { domain: "D-001", layer: "demand" }), brief("B-002", { idea: "I-001", layer: "economics" }),
    report("R-001", "D-001", "primer"),
  );
  const { out, code } = run("lint.mjs", root, ["--fix"]);
  assert.equal(code, 0, out);
  const d = readFileSync(join(root, "wiki/domains/D-001-x.md"), "utf8");
  assert.match(d, /^briefs: \[B-001\]$/m);
  assert.match(d, /^candidates: \[I-001\]$/m);
  assert.match(d, /^reports: \[R-001\]$/m);
  assert.match(readFileSync(join(root, "wiki/ideas/I-001-x.md"), "utf8"), /^briefs: \[B-002\]$/m);
  assert.match(out, /FIXED {3}wiki\/domains\/D-001-x.md: briefs/);
});

test("--fix adds the missing contradicts back-link and marks stale topics", () => {
  const root = makeWiki(
    brief("B-001"), source(),
    evidence("E-B001-1-01", { brief: "B-001", contradicts: ["E-B001-1-02"] }),
    evidence("E-B001-1-02", { brief: "B-001" }),
    topic("T-old", { updated: day(-61) }),
  );
  const { out } = run("lint.mjs", root, ["--fix"]);
  assert.match(readFileSync(join(root, "wiki/evidence/E-B001-1-02.md"), "utf8"), /^contradicts: \[E-B001-1-01\]$/m);
  assert.match(readFileSync(join(root, "wiki/topics/T-old.md"), "utf8"), /^status: stale$/m);
  assert.ok(!hasWarning(out, "does not link back"), out);
});

test("without --fix the missing back-link is only a warning", () => {
  const { out, code } = lint(
    brief("B-001"), source(),
    evidence("E-B001-1-01", { brief: "B-001", contradicts: ["E-B001-1-02"] }),
    evidence("E-B001-1-02", { brief: "B-001" }),
  );
  assert.ok(hasWarning(out, "does not link back"), out);
  assert.equal(code, 0);
});
