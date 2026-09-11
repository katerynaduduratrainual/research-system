#!/usr/bin/env node
// PreToolUse hook (Write|Edit): enforces CLAUDE.md rule 4 deterministically.
// Blocks writing a report under wiki/reports/ unless wiki/redteam/<target>-redteam.md
// exists and is not older than wiki/analysis/<target>-analysis.md.
// Exit 0 = allow, exit 2 = block (stderr is shown to the model).
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const ROOT = resolve(new URL("../..", import.meta.url).pathname);
let raw = "";
try { raw = readFileSync(0, "utf8"); } catch {}
let data = {};
try { data = JSON.parse(raw || "{}"); } catch {}
const ti = data.tool_input ?? {};
const fp = ti.file_path ?? ti.path ?? "";
if (!fp) process.exit(0);

const abs = resolve(ROOT, fp);
const rel = relative(ROOT, abs).replace(/\\/g, "/");
if (!rel.startsWith("wiki/reports/") || !rel.endsWith(".md")) process.exit(0);

let text = typeof ti.content === "string" ? ti.content : "";
if (!text && existsSync(abs)) text = readFileSync(abs, "utf8");
const m = /^target:\s*([A-Z]-\d+)/m.exec(text);
if (!m) {
  console.error("redteam-gate: no `target:` in the report frontmatter — add it before writing the report.");
  process.exit(2);
}
const target = m[1];
const rt = join(ROOT, "wiki", "redteam", `${target}-redteam.md`);
if (!existsSync(rt)) {
  console.error(`redteam-gate: wiki/redteam/${target}-redteam.md is missing — run the red team before writing a report (CLAUDE.md rule 4).`);
  process.exit(2);
}
const an = join(ROOT, "wiki", "analysis", `${target}-analysis.md`);
if (existsSync(an)) {
  const updated = f => { const u = /^updated:\s*(\d{4}-\d{2}-\d{2})/m.exec(readFileSync(f, "utf8")); return u ? Date.parse(u[1]) : null; };
  const rtU = updated(rt), anU = updated(an);
  const older = (rtU != null && anU != null && rtU !== anU) ? rtU < anU : statSync(rt).mtimeMs < statSync(an).mtimeMs;
  if (older) {
    console.error(`redteam-gate: red team for ${target} is older than the analysis — re-run /red-team ${target} first (CLAUDE.md rule 4).`);
    process.exit(2);
  }
}
process.exit(0);
