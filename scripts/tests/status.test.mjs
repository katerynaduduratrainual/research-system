// Run: node scripts/tests/status.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { makeWiki, run, day, stamp, idea, brief, plan, report, evidence, NO_CONFIDENCE } from "./helpers.mjs";

const status = (entries, args = []) => run("status.mjs", makeWiki(...entries), args).out;
// Lines of one "## <title>" block.
const block = (out, title) => {
  const lines = out.split("\n");
  const start = lines.indexOf(`## ${title}`);
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex(l => l.startsWith("## "));
  return (end === -1 ? rest : rest.slice(0, end)).filter(Boolean);
};
const waiting = entries => block(status(entries), "Waiting on you");
const running = entries => block(status(entries), "Running");
const line = (lines, ...parts) => lines.find(l => parts.every(p => l.includes(p)));

// --- waiting on you ---------------------------------------------------------

test("lists a draft brief under gate 1", () => {
  assert.ok(line(waiting([brief("B-001")]), "gate 1", "B-001"));
});

test("lists a draft plan under gate 1 with the /plan command", () => {
  const w = waiting([idea("I-001"), plan("I-001", { status: "draft", started: null, target_decision: null })]);
  assert.ok(line(w, "gate 1", "P-I-001", "/plan I-001"), w.join("\n"));
});

test("lists a collected, unreviewed brief under gate 2 with the /review command", () => {
  const w = waiting([brief("B-001", { status: "collected" })]);
  assert.ok(line(w, "gate 2", "/review B-001"), w.join("\n"));
});

test("does not list a reviewed brief under gate 2", () => {
  const w = waiting([brief("B-001", { status: "collected", reviewed: day(0) })]);
  assert.equal(line(w, "gate 2"), undefined);
});

test("does not list a collected brief under gate 2 while its chain still runs", () => {
  const w = waiting([brief("B-001", { status: "collected", run_stage: "redteam", run_started: stamp(5) })]);
  assert.equal(line(w, "gate 2"), undefined);
});

test("lists the report of an undecided idea under gate 3", () => {
  const w = waiting([idea("I-001"), report("R-001", "I-001")]);
  assert.ok(line(w, "gate 3", "R-001", "/review I-001"), w.join("\n"));
});

test("lists a report that is newer than the idea's last decision", () => {
  const w = waiting([idea("I-001", { decision: "advance", decided: day(-5) }), report("R-002", "I-001")]);
  assert.ok(line(w, "gate 3", "R-002"), w.join("\n"));
});

test("does not list a report the idea was already decided on", () => {
  const w = waiting([idea("I-001", { decision: "park", decided: day(0) }), report("R-001", "I-001")]);
  assert.equal(line(w, "gate 3"), undefined);
});

test("does not list a brief-level report under gate 3", () => {
  const w = waiting([brief("B-001", { status: "done", reviewed: day(0) }), report("R-001", "B-001")]);
  assert.equal(line(w, "gate 3"), undefined);
});

test("lists a ready plan checkpoint under gate 3", () => {
  const w = waiting([idea("I-001", { decision: "advance", decided: day(-9) }), plan("I-001", { checkpoint: "ready" })]);
  assert.ok(line(w, "gate 3", "P-I-001", "checkpoint", "/review I-001"), w.join("\n"));
});

test("lists the open-question count and the first five questions", () => {
  const questions = Array.from({ length: 6 }, (_, i) => `- [ ] B-001/1: question ${i + 1}`).join("\n");
  const w = waiting([["wiki/open-questions.md", `# Open\n\n${questions}\n- [x] closed one\n`]]);
  assert.ok(line(w, "questions (6)"), w.join("\n"));
  assert.ok(line(w, "question 5"));
  assert.equal(line(w, "question 6"), undefined);
});

test("says so when nothing is waiting", () => {
  assert.ok(line(waiting([idea("I-001", { decision: "park", decided: day(0) })]), "nothing is waiting"));
});

test("--waiting prints only the waiting block", () => {
  const out = status([brief("B-001"), idea("I-001")], ["--waiting"]);
  assert.match(out, /^## Waiting on you/);
  assert.ok(!out.includes("## Running") && !out.includes("## Ideas"), out);
});

// --- running ----------------------------------------------------------------

test("shows stage, elapsed minutes and sub-question progress of a running brief", () => {
  const r = running([
    brief("B-001", { status: "running", run_stage: "verify", run_started: stamp(40) },
      "\n## Підпитання\n### 1. Попит\n- Питання: a\n### 2. Конкуренти\n- Питання: b\n"),
    evidence("E-B001-1-01", "B-001", { verification: "ok" }),
    evidence("E-B001-2-01", "B-001"),
    evidence("E-B001-R-01", "B-001"),
  ]);
  const l = line(r, "B-001", "[verify]");
  assert.ok(l, r.join("\n"));
  assert.match(l, /\b(39|40|41) min\b/);
  assert.match(l, /evidence 2\/2 sq/);
  assert.match(l, /verified 1\/2 sq/);
});

test("counts a sub-question without evidence as not yet covered", () => {
  const r = running([
    brief("B-001", { status: "running", run_stage: "scouts", run_started: stamp(5) },
      "\n### 1. A\n### 2. B\n### 3. C\n"),
    evidence("E-B001-1-01", "B-001"),
  ]);
  assert.match(line(r, "B-001"), /evidence 1\/3 sq/);
});

test("flags a run older than three hours as possibly interrupted", () => {
  const r = running([brief("B-001", { status: "running", run_stage: "scouts", run_started: stamp(200) })]);
  assert.ok(line(r, "B-001", "possibly interrupted", "/run B-001"), r.join("\n"));
});

test("does not flag a fresh run as interrupted", () => {
  const r = running([brief("B-001", { status: "running", run_stage: "scouts", run_started: stamp(20) })]);
  assert.ok(!line(r, "B-001").includes("interrupted"));
});

test("shows a queued brief as queued", () => {
  const r = running([brief("B-002", { status: "approved", run_stage: "queued" })]);
  assert.ok(line(r, "B-002", "queued"), r.join("\n"));
});

test("shows a plan checkpoint that is in progress", () => {
  const r = running([idea("I-001"), plan("I-001", { checkpoint: "running" })]);
  assert.ok(line(r, "P-I-001", "checkpoint"), r.join("\n"));
});

test("says so when nothing is running", () => {
  assert.ok(line(running([idea("I-001")]), "nothing is running"));
});

// --- plans ------------------------------------------------------------------

test("shows phase, week, confidence and queue length of a plan", () => {
  const out = status([idea("I-001"), plan("I-001", {
    phase: "depth", started: day(-8), target_decision: day(62),
    confidence: { ...NO_CONFIDENCE, demand: "medium" }, briefs: ["B-001", "B-002"],
  }, "\n## Напрями\n- **Черга питань:**\n  1. [ ] перше\n  2. [x] закрите\n  3. [ ] третє\n"),
  brief("B-001"), brief("B-002")]);
  const l = line(block(out, "Plans"), "P-I-001");
  assert.ok(l, out);
  assert.match(l, /phase depth/);
  assert.match(l, /week 2 of 10/);
  assert.match(l, /demand: medium/);
  assert.match(l, /economics: —/);
  assert.match(l, /queue 2/);
  assert.match(l, /briefs 2/);
});

test("leaves closed plans out of the plans block", () => {
  const out = status([idea("I-001"), plan("I-001", { status: "closed" })]);
  assert.equal(line(block(out, "Plans"), "P-I-001"), undefined);
});

// --- briefs: next command -----------------------------------------------------

test("points a collected, unreviewed brief to /review", () => {
  const b = block(status([brief("B-001", { status: "collected" })]), "Briefs");
  assert.ok(line(b, "B-001", "/review B-001"), b.join("\n"));
});

test("points a reviewed brief of a live idea to /plan", () => {
  const b = block(status([idea("I-001"), brief("B-001", { status: "collected", reviewed: day(0), idea: "I-001" })]), "Briefs");
  assert.ok(line(b, "B-001", "/plan I-001"), b.join("\n"));
});

test("offers no next command for a brief of a parked idea", () => {
  const b = block(status([idea("I-001", { stage: "parked", decision: "park", decided: day(0) }),
    brief("B-001", { status: "collected", reviewed: day(0), idea: "I-001" })]), "Briefs");
  assert.ok(!line(b, "B-001").includes("/plan"), b.join("\n"));
});
