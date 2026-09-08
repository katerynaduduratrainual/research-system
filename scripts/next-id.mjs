#!/usr/bin/env node
// Usage: node scripts/next-id.mjs <prefix>   e.g. I, B, R, E-ING-20260908
// Scans wiki frontmatter `id:` fields and prints the next sequential ID.
import { loadWiki } from "./_lib.mjs";

const prefix = process.argv[2];
if (!prefix) { console.error("usage: node scripts/next-id.mjs <prefix>"); process.exit(1); }
const width = prefix.length === 1 ? 3 : 2;
const re = new RegExp(`^${prefix.replace(/[-]/g, "\\-")}-(\\d+)$`);
let max = 0;
for (const page of loadWiki()) {
  const id = page.fm?.id;
  const m = typeof id === "string" && re.exec(id);
  if (m) max = Math.max(max, Number(m[1]));
}
console.log(`${prefix}-${String(max + 1).padStart(width, "0")}`);
