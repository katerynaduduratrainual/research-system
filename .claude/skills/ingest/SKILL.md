---
name: ingest
description: Add a source the user found — URL or local file, including their own notes from calls and meetings — to raw/, create its source page, extract evidence pages, and file them against an idea or brief if given. Verification and indexing run in the background.
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
4. Spawn `verifier` for the new evidence IDs in the background. Tell the user in one
   line: source ID + grade, how many evidence pages, verification running. End the turn.
5. Verifier finished → update the relevant topic page(s) under `wiki/topics/` with the
   new claims. If the idea has an active plan (`wiki/plans/P-<idea>.md`), add the
   verified claims to the matching workstream's «Що знаємо», tick the queue items they
   answer, close the matching items in «Потрібно від редактора», set `updated:`, add a
   `## Лог` line. Spawn `librarian` for lint and index in the background.
6. Librarian finished → commit `ingest(S-<hash8>): <slug>`. Tell the user in ≤ 6 lines:
   evidence IDs with one-line claims, the verification tally, any contradiction found.
