// Test helpers: build a throwaway wiki and run a script against it via RESEARCH_ROOT.
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), "..");

// entries: [relative path, text] pairs, as returned by the builders below.
export function makeWiki(...entries) {
  const root = mkdtempSync(join(tmpdir(), "research-wiki-"));
  mkdirSync(join(root, "wiki"), { recursive: true });
  for (const [rel, text] of entries) {
    const p = join(root, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, text);
  }
  return root;
}

export function run(script, root, args = []) {
  const r = spawnSync(process.execPath, [join(SCRIPTS, script), ...args], {
    env: { ...process.env, RESEARCH_ROOT: root }, encoding: "utf8",
  });
  return { code: r.status, out: r.stdout + r.stderr };
}

const pad = n => String(n).padStart(2, "0");
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// Local date `offset` days from today, yyyy-mm-dd.
export const day = offset => ymd(new Date(Date.now() + offset * 86400e3));
// Local timestamp `minutes` ago, yyyy-mm-ddThh:mm — the format run logs use.
export const stamp = minutes => {
  const d = new Date(Date.now() - minutes * 60000);
  return `${ymd(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const val = v => v === null ? "null"
  : Array.isArray(v) ? `[${v.join(", ")}]`
  : typeof v === "string" && (v === "" || /: |#/.test(v)) ? JSON.stringify(v)
  : String(v);

export function page(fm, body = "") {
  const lines = [];
  for (const [k, v] of Object.entries(fm)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const [k2, v2] of Object.entries(v)) lines.push(`  ${k2}: ${val(v2)}`);
    } else lines.push(`${k}: ${val(v)}`);
  }
  return `---\n${lines.join("\n")}\n---\n${body}\n`;
}

export const idea = (id, extra = {}) => [`wiki/ideas/${id}-x.md`, page({
  id, title: `Idea ${id}`, stage: "screening", decision: null, decided: null,
  briefs: [], reports: [], ...extra,
})];

export const brief = (id, extra = {}, body = "") => [`wiki/briefs/${id}-x.md`, page({
  id, question: `Question ${id}`, idea: null, workstream: null, status: "draft",
  created: day(0), run_stage: null, run_started: null, run_finished: null,
  reviewed: null, ...extra,
}, body)];

export const NO_CONFIDENCE = { demand: null, competition: null, complexity: null, economics: null, entry: null };

export const plan = (ideaId, extra = {}, body = "") => [`wiki/plans/P-${ideaId}.md`, page({
  id: `P-${ideaId}`, idea: ideaId, status: "active", phase: "map", checkpoint: null,
  started: day(-3), target_decision: day(60), updated: day(0),
  confidence: NO_CONFIDENCE, briefs: [], ...extra,
}, body)];

export const report = (id, target, extra = {}) => [`wiki/reports/${id}-x.md`, page({
  id, target, type: "screen", created: day(0), confidence: "low", ...extra,
})];

export const evidence = (id, briefId, extra = {}) => [`wiki/evidence/${id}.md`, page({
  id, claim: "Claim with 10 units", source: "S-00000000", type: "fact",
  confidence: "low", brief: briefId, date_of_info: day(0), verification: null, ...extra,
})];
