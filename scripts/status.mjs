#!/usr/bin/env node
// Pipeline state for /status.
import { loadWiki } from "./_lib.mjs";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./_lib.mjs";

const pages = loadWiki();
const ideas = pages.filter(p => p.rel.startsWith("wiki/ideas/") && p.fm);
const briefs = pages.filter(p => p.rel.startsWith("wiki/briefs/") && p.fm);
const reports = pages.filter(p => p.rel.startsWith("wiki/reports/") && p.fm);
const evidence = pages.filter(p => p.rel.startsWith("wiki/evidence/"));
const sources = pages.filter(p => p.rel.startsWith("wiki/sources/") && p.fm);

const NEXT = { draft: "/research (гейт 1 не пройдено)", approved: "/run", running: "/run (перезапустити/дочекатись)", collected: "/deep-dive або /report (після /red-team)", done: "—" };

console.log("## Ideas");
for (const st of ["inbox", "screening", "deep-dive", "validation", "parked", "killed"]) {
  const list = ideas.filter(i => i.fm.stage === st);
  if (list.length) console.log(`${st}: ` + list.map(i => `${i.fm.id} ${i.fm.title ?? ""} (${i.fm.total ?? "—"})`).join(" · "));
}
console.log("\n## Briefs");
for (const b of briefs) console.log(`${b.fm.id} [${b.fm.status}] ${b.fm.question} → next: ${NEXT[b.fm.status] ?? "?"}${b.fm.idea ? ` (${b.fm.idea})` : ""}`);
console.log("\n## Reports");
for (const r of reports.slice(-5)) console.log(`${r.fm.id} → ${r.fm.target} (${r.fm.type}, ${r.fm.confidence})`);
const grades = {}; for (const s of sources) grades[s.fm.grade] = (grades[s.fm.grade] ?? 0) + 1;
const topics = pages.filter(p => p.rel.startsWith("wiki/topics/") && p.fm);
console.log(`\n## Counts\nevidence ${evidence.length} · sources ${sources.length} ${JSON.stringify(grades)} · ideas ${ideas.length} · topics ${topics.length} (stale ${topics.filter(t => t.fm.status === "stale").length})`);
const oq = join(ROOT, "wiki", "open-questions.md");
if (existsSync(oq)) {
  const open = readFileSync(oq, "utf8").split("\n").filter(l => l.startsWith("- [ ]"));
  console.log(`\n## Open questions (${open.length})`);
  open.slice(0, 5).forEach(l => console.log(l));
}
