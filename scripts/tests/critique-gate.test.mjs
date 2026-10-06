// Run: node scripts/tests/critique-gate.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { makeWiki, run, day, domain, idea, brief, critique, analysis } from "./helpers.mjs";

const gate = (root, rel, text) => run("hooks/critique-gate.mjs", root, [],
  JSON.stringify({ tool_name: "Write", tool_input: { file_path: join(root, rel), content: text } }));
const report = (target, type) => `---\nid: R-001\ntarget: ${target}\ntype: ${type}\nauthor: writer\ncreated: ${day(0)}\n---\n# x\n`;

test("ignores writes outside wiki/reports", () => {
  const root = makeWiki();
  assert.equal(gate(root, "wiki/briefs/B-001-x.md", "---\nid: B-001\n---\n").code, 0);
});

test("lets a primer through without a critique", () => {
  const root = makeWiki(domain("D-001"));
  assert.equal(gate(root, "wiki/reports/R-001-x.md", report("D-001", "primer")).code, 0);
});

test("blocks a domain report without a critique", () => {
  const root = makeWiki(domain("D-001"));
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("D-001", "domain"));
  assert.equal(code, 2);
  assert.match(out, /critique-gate: wiki\/critique\/D-001-critique.md is missing/);
});

test("blocks a domain report whose critique is older than the newest reviewed brief", () => {
  const root = makeWiki(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(0) }),
    critique("D-001", { created: day(-3), updated: day(-3) }),
  );
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("D-001", "domain"));
  assert.equal(code, 2);
  assert.match(out, /older than the newest reviewed brief/);
});

test("lets a domain report through with a fresh critique", () => {
  const root = makeWiki(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(-1) }),
    critique("D-001"),
  );
  assert.equal(gate(root, "wiki/reports/R-001-x.md", report("D-001", "domain")).code, 0);
});

test("blocks a final report whose critique is older than the analysis", () => {
  const root = makeWiki(idea("I-001"), analysis("I-001", { updated: day(0) }), critique("I-001", { created: day(-1), updated: day(-1) }));
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("I-001", "final"));
  assert.equal(code, 2);
  assert.match(out, /older than the analysis/);
});

test("blocks a report without target or with an unknown type", () => {
  const root = makeWiki(domain("D-001"));
  assert.equal(gate(root, "wiki/reports/R-001-x.md", "---\nid: R-001\ntype: domain\n---\n").code, 2);
  assert.equal(gate(root, "wiki/reports/R-001-x.md", report("D-001", "screen")).code, 2);
});

test("blocks a final report that targets a domain", () => {
  const root = makeWiki(domain("D-001"), critique("D-001"));
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("D-001", "final"));
  assert.equal(code, 2);
  assert.match(out, /does not match target/);
});

test("blocks a domain report whose critique date is unreadable", () => {
  const root = makeWiki(domain("D-001"), critique("D-001", { updated: "yesterday" }));
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("D-001", "domain"));
  assert.equal(code, 2);
  assert.match(out, /unreadable date/);
});

test("accepts a quoted target in the frontmatter", () => {
  const root = makeWiki(domain("D-001"), critique("D-001"));
  assert.equal(gate(root, "wiki/reports/R-001-x.md", report('"D-001"', "domain")).code, 0);
});

test("a body line starting with type: is not frontmatter", () => {
  const root = makeWiki(domain("D-001"));
  assert.equal(gate(root, "wiki/reports/R-001-x.md", "---\nid: R-001\ntarget: D-001\n---\ntype: primer\n").code, 2);
});

test("malformed stdin and a non-string file_path are ignored", () => {
  const root = makeWiki();
  const a = run("hooks/critique-gate.mjs", root, [], "null");
  assert.equal(a.code, 0);
  assert.doesNotMatch(a.out, /TypeError|at /);
  const b = run("hooks/critique-gate.mjs", root, [], JSON.stringify({ tool_input: { file_path: 42 } }));
  assert.equal(b.code, 0);
});

test("blocks a report whose target page does not exist", () => {
  const root = makeWiki();
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("D-009", "domain"));
  assert.equal(code, 2);
  assert.match(out, /unknown target D-009/);
});
