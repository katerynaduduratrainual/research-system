#!/usr/bin/env node
// Wiki integrity check. Exit 1 on errors. Warnings never fail.
import { loadWiki, normaliseUrl } from "./_lib.mjs";

const pages = loadWiki();
const errors = [], warnings = [];
const err = (p, m) => errors.push(`${p.rel}: ${m}`);
const warn = (p, m) => warnings.push(`${p.rel}: ${m}`);

const STAGES = ["inbox", "screening", "deep-dive", "validation", "parked", "killed"];
const BRIEF_STATUS = ["draft", "approved", "running", "collected", "done"];
const GRADES = ["A", "B", "C", "D"];
const E_TYPES = ["fact", "statistic", "estimate", "opinion", "anecdote"];
const CONF = ["high", "medium", "low"];

const byId = new Map();
const referenced = new Set();
const sourceUrls = new Map();

for (const p of pages) {
  if (/wiki\/(index|open-questions)\.md$/.test(p.rel)) continue;
  if (!p.fm) { err(p, "no frontmatter"); continue; }
  const id = p.fm.id ?? p.fm.target ?? p.fm.idea;
  if (p.fm.id) {
    if (byId.has(p.fm.id)) err(p, `duplicate id ${p.fm.id} (also ${byId.get(p.fm.id).rel})`);
    byId.set(p.fm.id, p);
  }
  for (const m of p.text.matchAll(/\[\[([A-Z]-[A-Za-z0-9-]+)\]\]/g)) referenced.add(m[1]);

  if (p.rel.startsWith("wiki/ideas/")) {
    if (!STAGES.includes(p.fm.stage)) err(p, `invalid stage "${p.fm.stage}"`);
    if (!p.fm.title) err(p, "missing title");
  }
  if (p.rel.startsWith("wiki/briefs/")) {
    if (!BRIEF_STATUS.includes(p.fm.status)) err(p, `invalid status "${p.fm.status}"`);
    if (!p.fm.question) err(p, "missing question");
  }
  if (p.rel.startsWith("wiki/evidence/")) {
    for (const k of ["claim", "source", "type", "confidence", "brief"]) if (p.fm[k] == null || p.fm[k] === "") err(p, `missing ${k}`);
    if (!E_TYPES.includes(p.fm.type)) err(p, `invalid type "${p.fm.type}"`);
    if (!CONF.includes(p.fm.confidence)) err(p, `invalid confidence "${p.fm.confidence}"`);
    if (p.fm.type === "estimate" && !/##\s*Метод/.test(p.body)) warn(p, "estimate without ## Метод");
    if (typeof p.fm.claim === "string" && p.fm.claim.split(/\s+/).length > 30) warn(p, "claim longer than 30 words");
    if (!p.fm.date_of_info) warn(p, "missing date_of_info");
    if (["C", "D"].includes(p.fm.source_grade) && p.fm.confidence === "high") warn(p, "high confidence on C/D source");
    for (const c of p.fm.contradicts ?? []) referenced.add(c);
    if (typeof p.fm.source === "string") referenced.add(p.fm.source);
  }
  if (p.rel.startsWith("wiki/sources/")) {
    for (const k of ["url", "title", "accessed"]) if (!p.fm[k]) err(p, `missing ${k}`);
    if (!GRADES.includes(p.fm.grade)) err(p, `invalid grade "${p.fm.grade}"`);
    if (p.fm.url) {
      const n = normaliseUrl(p.fm.url);
      if (sourceUrls.has(n)) err(p, `duplicate source url (also ${sourceUrls.get(n).rel})`);
      sourceUrls.set(n, p);
    }
    if (!p.fm.published || /невідомо/i.test(String(p.fm.published))) warn(p, "undated source");
  }
  if (p.rel.startsWith("wiki/reports/")) {
    if (!p.fm.target) err(p, "missing target");
    if (!CONF.includes(p.fm.confidence)) err(p, `invalid confidence "${p.fm.confidence}"`);
    const untagged = p.body.split("\n").filter(l => /^[^#|>\-\s].{40,}$/.test(l) && !/\[\[E-/.test(l) && !/доказів не знайдено/i.test(l));
    if (untagged.length) warn(p, `${untagged.length} long sentence(s) without evidence tag`);
  }
}

// Broken links
for (const ref of referenced) {
  if (!byId.has(ref)) {
    const owners = pages.filter(p => p.text.includes(`[[${ref}]]`) || p.fm?.source === ref || (p.fm?.contradicts ?? []).includes(ref)).map(p => p.rel);
    errors.push(`broken link [[${ref}]] in ${owners.join(", ")}`);
  }
}
// Orphan evidence: no idea, no brief link back
for (const p of pages.filter(p => p.rel.startsWith("wiki/evidence/") && p.fm)) {
  if (!referenced.has(p.fm.id) && !(p.fm.ideas?.length) ) warn(p, "orphan evidence (not linked from any page, no ideas)");
}
// Contradiction symmetry
for (const p of pages.filter(p => p.rel.startsWith("wiki/evidence/") && p.fm)) {
  for (const c of p.fm.contradicts ?? []) {
    const other = byId.get(c);
    if (other && !(other.fm.contradicts ?? []).includes(p.fm.id)) warn(p, `contradicts ${c} but ${c} does not link back`);
  }
}

for (const e of errors) console.log("ERROR   " + e);
for (const w of warnings) console.log("WARNING " + w);
console.log(`\nlint: ${errors.length} error(s), ${warnings.length} warning(s), ${pages.length} page(s)`);
process.exit(errors.length ? 1 : 0);
