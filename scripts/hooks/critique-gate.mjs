#!/usr/bin/env node
// PreToolUse hook (Write|Edit): a report of type `domain` or `final` needs a critique
// newer than the material it covers (AGENTS.md rule 4). Mirrors the lint rule.
// Exit 0 = allow, exit 2 = block (stderr is shown to the model).
import { readFileSync, existsSync } from "node:fs";
import { resolve, relative } from "node:path";
import { ROOT, loadWiki } from "../_lib.mjs";

let data = {};
try { data = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch {}
const ti = data.tool_input ?? {};
const fp = ti.file_path ?? ti.path ?? "";
if (!fp) process.exit(0);
const abs = resolve(ROOT, fp);
const rel = relative(ROOT, abs).replace(/\\/g, "/");
if (!rel.startsWith("wiki/reports/") || !rel.endsWith(".md")) process.exit(0);

let text = typeof ti.content === "string" ? ti.content : "";
if (!text && existsSync(abs)) text = readFileSync(abs, "utf8");
const field = k => (new RegExp(`^${k}:\\s*(\\S+)`, "m").exec(text) ?? [])[1];
const target = field("target"), type = field("type");
const block = m => { console.error(`critique-gate: ${m}`); process.exit(2); };
if (!target) block("no `target:` in the report frontmatter — add it before writing the report.");
if (!type) block("no `type:` in the report frontmatter — primer | domain | final.");
if (type === "primer") process.exit(0);
if (type !== "domain" && type !== "final") block(`unknown report type "${type}" — primer | domain | final.`);

const pages = loadWiki();
const tp = pages.find(p => p.fm?.id === target);
const dir = { domain: "domains", final: "ideas" }[type];
if (tp && !tp.rel.startsWith(`wiki/${dir}/`)) block(`report type "${type}" does not match target ${target}`);
const crit = pages.find(p => p.rel.startsWith("wiki/critique/") && p.fm?.target === target);
if (!crit) block(`wiki/critique/${target}-critique.md is missing — run the critic (attack ${target}) before writing a ${type} report (AGENTS.md rule 4).`);
const date = v => (v ? Date.parse(String(v).slice(0, 10)) : NaN);
const bad = (page, f) => block(`unreadable date on ${page.rel}: ${f} "${page.fm[f]}"`);
const critField = crit.fm.updated != null ? "updated" : "created";
const critDate = date(crit.fm[critField]);
if (Number.isNaN(critDate)) bad(crit, critField);
if (type === "domain") {
  let newest = -Infinity;
  for (const b of pages.filter(p => p.rel.startsWith("wiki/briefs/") && p.fm?.domain === target && p.fm.reviewed)) {
    const d = date(b.fm.reviewed);
    if (Number.isNaN(d)) bad(b, "reviewed");
    newest = Math.max(newest, d);
  }
  if (Number.isFinite(newest) && critDate < newest) block(`critique for ${target} is older than the newest reviewed brief — re-run the critic first.`);
} else {
  const an = pages.find(p => p.rel.startsWith("wiki/analysis/") && p.fm?.idea === target);
  if (an) {
    const f = an.fm.updated != null ? "updated" : "created";
    const d = date(an.fm[f]);
    if (Number.isNaN(d)) bad(an, f);
    if (critDate < d) block(`critique for ${target} is older than the analysis — re-run the critic first.`);
  }
}
process.exit(0);
