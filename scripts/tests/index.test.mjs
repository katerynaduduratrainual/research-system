// Run: node scripts/tests/index.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { makeWiki, run, domain, idea, brief, topic, report } from "./helpers.mjs";

test("index.mjs writes wiki/index.md with domains, ideas, topics, briefs and reports", () => {
  const root = makeWiki(
    domain("D-001", { title: "Local LLM", phase: "map", confidence: { fundamentals: "high", demand: null, models: "low", signals: null, entry: null } }),
    idea("I-001", { domain: "D-001" }),
    brief("B-001", { domain: "D-001", layer: "demand" }),
    topic("T-x"),
    report("R-001", "D-001", "primer"),
  );
  const { out, code } = run("index.mjs", root);
  assert.equal(code, 0, out);
  const index = readFileSync(join(root, "wiki/index.md"), "utf8");
  assert.match(index, /\| \[\[D-001\]\] \| Local LLM \| карта \| editor \| H · – · L · – · – \|/);
  assert.match(index, /\| \[\[I-001\]\] \| Idea I-001 \| в роботі \| \[\[D-001\]\] \|/);
  assert.match(index, /\[\[T-x\]\]/);
  assert.match(index, /\[\[B-001\]\]/);
  assert.match(index, /\[\[R-001\]\] \| \[\[D-001\]\] \| конспект/);
  assert.match(out, /index: 1 domains · 1 ideas · 1 briefs · 1 topics · 1 reports/);
});

test("index.mjs on an empty wiki writes the placeholders", () => {
  const root = makeWiki();
  const { code } = run("index.mjs", root);
  assert.equal(code, 0);
  assert.match(readFileSync(join(root, "wiki/index.md"), "utf8"), /_\(напрямів поки немає\)_/);
});
