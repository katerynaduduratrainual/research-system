#!/usr/bin/env node
// Usage: node scripts/source-id.mjs "<url>"  → prints ID, path and whether it exists.
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { normaliseUrl, WIKI } from "./_lib.mjs";

const url = process.argv[2];
if (!url) { console.error("usage: node scripts/source-id.mjs <url>"); process.exit(1); }
const id = "S-" + createHash("sha1").update(normaliseUrl(url)).digest("hex").slice(0, 8);
const path = join("wiki", "sources", `${id}.md`);
console.log(JSON.stringify({ id, path, exists: existsSync(join(WIKI, "sources", `${id}.md`)), normalised: normaliseUrl(url) }));
