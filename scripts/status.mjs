#!/usr/bin/env node
// Pipeline state for /status and /review. `--waiting` prints only what waits on the user.
import { loadWiki } from "./_lib.mjs";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./_lib.mjs";

const onlyWaiting = process.argv.includes("--waiting");
const pages = loadWiki();
const under = dir => pages.filter(p => p.rel.startsWith(`wiki/${dir}/`) && p.fm);
const ideas = under("ideas"), briefs = under("briefs"), reports = under("reports");
const evidence = under("evidence"), sources = under("sources"), plans = under("plans");
const topics = under("topics");
const ideaById = new Map(ideas.map(i => [i.fm.id, i]));

const ACTIVE_STAGES = ["scouts", "verify", "librarian", "digest", "redteam", "report"];
const WORKSTREAMS = ["demand", "competition", "complexity", "economics", "entry"];
const DAY = 86400e3;
const inChain = b => ACTIVE_STAGES.includes(b.fm.run_stage);
const short = (s, n = 90) => { s = String(s ?? ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; };

// --- Waiting on you: the deferred gates ---------------------------------------
const waiting = [];
for (const b of briefs) if (b.fm.status === "draft") waiting.push(`gate 1: ${b.fm.id} [draft] ${short(b.fm.question)} → approve or edit the brief`);
for (const p of plans) if (p.fm.status === "draft") waiting.push(`gate 1: ${p.fm.id} [draft] → /plan ${p.fm.idea}`);
for (const b of briefs) {
  if (b.fm.status !== "collected" || b.fm.reviewed != null || b.fm.run_stage != null) continue;
  const since = String(b.fm.run_finished ?? b.fm.run_started ?? "?").slice(0, 10);
  waiting.push(`gate 2: ${b.fm.id}${b.fm.idea ? ` (${b.fm.idea})` : ""} collected ${since} → /review ${b.fm.id}`);
}
for (const idea of ideas) {
  const own = reports.filter(r => r.fm.target === idea.fm.id).sort((a, b) => String(a.fm.created).localeCompare(String(b.fm.created)) || String(a.fm.id).localeCompare(String(b.fm.id)));
  const last = own.at(-1);
  if (last && (!idea.fm.decided || Date.parse(idea.fm.decided) < Date.parse(last.fm.created)))
    waiting.push(`gate 3: ${last.fm.id} → ${idea.fm.id} (${last.fm.type}) → /review ${idea.fm.id}`);
}
for (const p of plans) if (p.fm.checkpoint === "ready") waiting.push(`gate 3: ${p.fm.id} checkpoint (${p.fm.phase}) → /review ${p.fm.idea}`);
const oq = join(ROOT, "wiki", "open-questions.md");
const open = existsSync(oq) ? readFileSync(oq, "utf8").split("\n").filter(l => l.startsWith("- [ ]")) : [];

console.log("## Waiting on you");
if (!waiting.length && !open.length) console.log("nothing is waiting");
waiting.forEach(l => console.log(l));
if (open.length) { console.log(`questions (${open.length}):`); open.slice(0, 5).forEach(l => console.log(l)); }
if (onlyWaiting) process.exit(0);

// --- Running: background chains -------------------------------------------------
const needsCheck = e => e.fm.type !== "absence" && /\d/.test(String(e.fm.claim));
function progress(b) {
  const sqs = new Set([...b.body.matchAll(/^### (\d+)\. /gm)].map(m => m[1]));
  const prefix = "E-" + b.fm.id.replace("-", "") + "-";
  const bySq = new Map();
  for (const e of evidence) {
    if (!String(e.fm.id).startsWith(prefix)) continue;
    const sq = e.fm.id.slice(prefix.length).split("-")[0];
    if (!bySq.has(sq)) bySq.set(sq, []);
    bySq.get(sq).push(e);
  }
  const covered = [...sqs].filter(s => bySq.has(s));
  const verified = covered.filter(s => bySq.get(s).every(e => !needsCheck(e) || e.fm.verification != null));
  return `evidence ${covered.length}/${sqs.size} sq · verified ${verified.length}/${sqs.size} sq`;
}
console.log("\n## Running");
const runningLines = [];
for (const b of briefs.filter(inChain)) {
  const mins = b.fm.run_started ? Math.round((Date.now() - Date.parse(b.fm.run_started)) / 60000) : null;
  const stale = mins != null && mins > 180 ? ` · possibly interrupted: /run ${b.fm.id}` : "";
  runningLines.push(`${b.fm.id} [${b.fm.run_stage}] ${mins ?? "?"} min · ${progress(b)}${b.fm.idea ? ` (${b.fm.idea})` : ""}${stale}`);
}
for (const b of briefs.filter(b => b.fm.run_stage === "queued")) runningLines.push(`${b.fm.id} [queued] starts when a running brief finishes`);
for (const p of plans) if (p.fm.checkpoint === "running") runningLines.push(`${p.fm.id} checkpoint running (analyst → red team), phase ${p.fm.phase}`);
console.log(runningLines.length ? runningLines.join("\n") : "nothing is running");

// --- Plans: the long track --------------------------------------------------------
console.log("\n## Plans");
const livePlans = plans.filter(p => p.fm.status !== "closed");
if (!livePlans.length) console.log("none");
for (const p of livePlans) {
  const start = Date.parse(p.fm.started), target = Date.parse(p.fm.target_decision);
  const week = Number.isFinite(start) && Number.isFinite(target)
    ? `week ${Math.floor((Date.now() - start) / (7 * DAY)) + 1} of ${Math.max(1, Math.ceil((target - start) / (7 * DAY)))}` : "not started";
  const conf = WORKSTREAMS.map(w => `${w}: ${p.fm.confidence?.[w] ?? "—"}`).join(" · ");
  const queue = (p.body.match(/^\s*(?:\d+\.|-)\s+\[ \]/gm) ?? []).length;
  console.log(`${p.fm.id} ${p.fm.idea} [${p.fm.status}] phase ${p.fm.phase} · ${week} · ${conf} · queue ${queue} · briefs ${(p.fm.briefs ?? []).length}`);
}

// --- Inventory ----------------------------------------------------------------------
console.log("\n## Ideas");
for (const st of ["inbox", "screening", "deep-dive", "validation", "parked", "killed"]) {
  const list = ideas.filter(i => i.fm.stage === st);
  if (list.length) console.log(`${st}: ` + list.map(i => `${i.fm.id} ${i.fm.title ?? ""} (${i.fm.total ?? "—"})`).join(" · "));
}
function next(b) {
  const { status, run_stage, reviewed, idea, id } = b.fm;
  if (status === "draft") return "approve or edit (gate 1)";
  if (status === "approved") return run_stage === "queued" ? "queued" : `/run ${id}`;
  if (status === "running" || inChain(b)) return "running";
  if (status === "collected") {
    if (reviewed == null) return `/review ${id}`;
    if (!idea) return `/red-team ${id} → /report ${id}`;
    return ["parked", "killed"].includes(ideaById.get(idea)?.fm.stage) ? "—" : `/plan ${idea}`;
  }
  return "—";
}
console.log("\n## Briefs");
for (const b of briefs) console.log(`${b.fm.id} [${b.fm.status}] ${short(b.fm.question, 110)} → next: ${next(b)}${b.fm.idea ? ` (${b.fm.idea})` : ""}`);
console.log("\n## Reports");
for (const r of reports.slice(-5)) console.log(`${r.fm.id} → ${r.fm.target} (${r.fm.type}, ${r.fm.confidence})`);
const grades = {}; for (const s of sources) grades[s.fm.grade] = (grades[s.fm.grade] ?? 0) + 1;
console.log(`\n## Counts\nevidence ${evidence.length} · sources ${sources.length} ${JSON.stringify(grades)} · ideas ${ideas.length} · topics ${topics.length} (stale ${topics.filter(t => t.fm.status === "stale").length}) · plans ${plans.length}`);
