---
name: ingest
description: Add a source the user found — URL or local file — to raw/, create its source page, extract evidence pages, and file them against an idea or brief if given.
argument-hint: '<url|path> [I-### | B-###]'
disable-model-invocation: true
---

Arguments: $ARGUMENTS.

1. Fetch the URL (WebFetch) or read the file. Save a plain-text copy to
   `raw/<yyyy-mm-dd>-<slug>.md` with a header block: `url`, `title`, `fetched`, `added_by:
   user`. Never overwrite an existing raw file; add `-2` to the slug.
2. `node scripts/source-id.mjs "<url>"` (for a file, use `file://<absolute path>`).
   Create or update the source page from `templates/source.md`; grade it.
3. Extract every claim worth keeping — usually 3–10 — as evidence pages using
   `templates/evidence.md`. IDs: `node scripts/next-id.mjs E-ING-<yyyymmdd>`. Fill
   `ideas:` / `brief:` when given. Contradictions with existing evidence → `contradicts:`.
4. Spawn `verifier` for the new evidence IDs. Update the relevant topic page(s) under
   `wiki/topics/` with the new claims. Spawn `librarian` for lint and index. Commit
   `ingest(S-<hash8>): <slug>`.
5. Return: source ID + grade, evidence IDs with one-line claims, any contradiction found.
