// Run: node scripts/tests/lint.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { makeWiki, run, day, stamp, idea, brief, plan, NO_CONFIDENCE } from "./helpers.mjs";

const lint = (...entries) => run("lint.mjs", makeWiki(...entries));
const errors = out => out.split("\n").filter(l => l.startsWith("ERROR"));
const warnings = out => out.split("\n").filter(l => l.startsWith("WARNING"));
const hasError = (out, text) => errors(out).some(l => l.includes(text));
const hasWarning = (out, text) => warnings(out).some(l => l.includes(text));

test("lint reads the wiki under RESEARCH_ROOT", () => {
  const { out } = lint(idea("I-001"));
  assert.match(out, /lint: 0 error\(s\), 0 warning\(s\), 1 page\(s\)/);
});

// --- briefs -----------------------------------------------------------------

test("accepts a running brief with a run stage, a workstream and a timestamp", () => {
  const { out, code } = lint(brief("B-001", {
    status: "running", run_stage: "verify", workstream: "demand", run_started: stamp(10),
  }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects an unknown run_stage", () => {
  const { out, code } = lint(brief("B-001", { status: "running", run_stage: "bogus" }));
  assert.ok(hasError(out, 'invalid run_stage "bogus"'), out);
  assert.equal(code, 1);
});

test("rejects a running brief without run_stage", () => {
  const { out } = lint(brief("B-001", { status: "running" }));
  assert.ok(hasError(out, "running brief without run_stage"), out);
});

test("rejects an unknown workstream", () => {
  const { out } = lint(brief("B-001", { workstream: "sales" }));
  assert.ok(hasError(out, 'invalid workstream "sales"'), out);
});

test("warns when a collected brief has waited a week for gate 2", () => {
  const { out } = lint(brief("B-001", { status: "collected", run_finished: `${day(-8)}T10:00` }));
  assert.ok(hasWarning(out, "awaiting gate 2 for 7+ days"), out);
});

test("does not warn about gate 2 once the brief is reviewed", () => {
  const { out } = lint(brief("B-001", {
    status: "collected", run_finished: `${day(-8)}T10:00`, reviewed: day(-7),
  }));
  assert.ok(!hasWarning(out, "awaiting gate 2"), out);
});

test("does not warn about gate 2 while the wait is under a week", () => {
  const { out } = lint(brief("B-001", { status: "collected", run_finished: `${day(-2)}T10:00` }));
  assert.ok(!hasWarning(out, "awaiting gate 2"), out);
});

// --- plans ------------------------------------------------------------------

test("accepts a valid active plan", () => {
  const { out, code } = lint(idea("I-001"), plan("I-001", {
    checkpoint: "ready", confidence: { ...NO_CONFIDENCE, demand: "medium" },
  }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("accepts a draft plan without dates", () => {
  const { out } = lint(idea("I-001"), plan("I-001", {
    status: "draft", started: null, target_decision: null,
  }));
  assert.deepEqual(errors(out), []);
});

test("rejects a plan whose id does not match its idea", () => {
  const { out } = lint(idea("I-001"), idea("I-009"), plan("I-009", { idea: "I-001" }));
  assert.ok(hasError(out, "plan id must be P-I-001"), out);
});

test("rejects a plan for an idea that does not exist", () => {
  const { out } = lint(plan("I-404"));
  assert.ok(hasError(out, "unknown idea I-404"), out);
});

test("rejects an unknown plan status", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { status: "open" }));
  assert.ok(hasError(out, 'invalid status "open"'), out);
});

test("rejects an unknown plan phase", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { phase: "explore" }));
  assert.ok(hasError(out, 'invalid phase "explore"'), out);
});

test("rejects an unknown plan checkpoint", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { checkpoint: "done" }));
  assert.ok(hasError(out, 'invalid checkpoint "done"'), out);
});

test("rejects a confidence map that lacks a workstream", () => {
  const { economics, ...four } = NO_CONFIDENCE;
  const { out } = lint(idea("I-001"), plan("I-001", { confidence: four }));
  assert.ok(hasError(out, "confidence missing economics"), out);
});

test("rejects an invalid confidence value", () => {
  const { out } = lint(idea("I-001"), plan("I-001", {
    confidence: { ...NO_CONFIDENCE, demand: "sure" },
  }));
  assert.ok(hasError(out, 'invalid confidence.demand "sure"'), out);
});

test("rejects an active plan without a start date", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { started: null }));
  assert.ok(hasError(out, "active plan without started"), out);
});

test("rejects a paused plan without a target decision date", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { status: "paused", target_decision: null }));
  assert.ok(hasError(out, "paused plan without target_decision"), out);
});

test("flags a plan that lists a brief which does not exist", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { briefs: ["B-404"] }));
  assert.ok(hasError(out, "broken link [[B-404]]"), out);
});

test("warns when an active plan was not updated for two weeks", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { updated: day(-15) }));
  assert.ok(hasWarning(out, "active plan not updated for 14+ days"), out);
});

test("does not warn about a stale plan once it is closed", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { status: "closed", updated: day(-40) }));
  assert.ok(!hasWarning(out, "not updated for 14+ days"), out);
});

test("warns about a brief without workstream created under an active plan", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { started: day(-3) }),
    brief("B-001", { idea: "I-001", created: day(-1) }));
  assert.ok(hasWarning(out, "has no workstream"), out);
});

test("does not ask for a workstream on briefs older than the plan", () => {
  const { out } = lint(idea("I-001"), plan("I-001", { started: day(-3) }),
    brief("B-001", { idea: "I-001", created: day(-10) }));
  assert.ok(!hasWarning(out, "has no workstream"), out);
});

test("accepts the checked run_stage (stop b: collected and verified, waiting for the editor)", () => {
  const { out } = lint(brief("B-001", { status: "running", run_stage: "checked", run_started: stamp(10) }));
  assert.ok(!hasError(out, "invalid run_stage"), out);
});
