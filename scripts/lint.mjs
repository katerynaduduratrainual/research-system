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
const E_TYPES = ["fact", "statistic", "estimate", "opinion", "anecdote", "absence"];
const ACCESS = ["direct", "archive", "secondary", "blocked"];
const blockedSources = new Set();
const CONF = ["high", "medium", "low"];
const VERIF = ["ok", "inexact", "failed", "unreachable"];
const TOPIC_STATUS = ["active", "stale"];
const briefStatus = new Map();

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
    if (p.fm.id) briefStatus.set(p.fm.id, p.fm.status);
  }
  if (p.rel.startsWith("wiki/evidence/")) {
    const required = p.fm.type === "absence" ? ["claim", "type", "confidence", "brief"] : ["claim", "source", "type", "confidence", "brief"];
    for (const k of required) if (p.fm[k] == null || p.fm[k] === "") err(p, `missing ${k}`);
    if (p.fm.type === "absence" && !/##\s*Метод пошуку/.test(p.body)) err(p, "absence without ## Метод пошуку");
    if (!E_TYPES.includes(p.fm.type)) err(p, `invalid type "${p.fm.type}"`);
    if (!CONF.includes(p.fm.confidence)) err(p, `invalid confidence "${p.fm.confidence}"`);
    if (p.fm.verification != null && !VERIF.includes(p.fm.verification)) err(p, `invalid verification "${p.fm.verification}"`);
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
    if (p.fm.accessed_via != null && !ACCESS.includes(p.fm.accessed_via)) err(p, `invalid accessed_via "${p.fm.accessed_via}"`);
    if (p.fm.accessed_via === "blocked") blockedSources.add(p.fm.id);
    if (p.fm.url) {
      const n = normaliseUrl(p.fm.url);
      if (sourceUrls.has(n)) err(p, `duplicate source url (also ${sourceUrls.get(n).rel})`);
      sourceUrls.set(n, p);
    }
    if (!p.fm.published || /невідомо/i.test(String(p.fm.published))) warn(p, "undated source");
  }
  if (p.rel.startsWith("wiki/topics/")) {
    if (!/^T-[a-z0-9-]+$/.test(String(p.fm.id))) err(p, `invalid topic id "${p.fm.id}"`);
    if (!p.fm.title) err(p, "missing title");
    if (!p.fm.updated) err(p, "missing updated");
    if (!TOPIC_STATUS.includes(p.fm.status)) err(p, `invalid status "${p.fm.status}"`);
    else if (p.fm.updated && Date.now() - Date.parse(p.fm.updated) > 60 * 86400e3 && p.fm.status !== "stale") warn(p, "not updated for 60+ days; mark status: stale");
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
// Accumulation: a collected brief must be folded into topic pages; numeric claims verified
const topicText = pages.filter(p => p.rel.startsWith("wiki/topics/") && p.fm).map(t => t.text).join("\n");
for (const [bid, st] of briefStatus) {
  if (!["collected", "done"].includes(st)) continue;
  const prefix = "E-" + bid.replace("-", "") + "-";
  const b = pages.find(p => p.fm?.id === bid);
  if (b && !topicText.includes("[[" + prefix)) warn(b, `collected brief not folded into any topic page (no [[${prefix}…]] under wiki/topics/)`);
}
for (const p of pages.filter(p => p.rel.startsWith("wiki/evidence/") && p.fm)) {
  const st = briefStatus.get(p.fm.brief);
  if (["collected", "done"].includes(st) && p.fm.type !== "absence" && /\d/.test(String(p.fm.claim)) && p.fm.verification == null) warn(p, "numeric claim not verified");
}
// Evidence resting on a blocked source
for (const p of pages.filter(p => p.rel.startsWith("wiki/evidence/") && p.fm)) {
  if (typeof p.fm.source === "string" && blockedSources.has(p.fm.source)) warn(p, `rests on a blocked source ${p.fm.source}`);
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
