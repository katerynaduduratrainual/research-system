---
name: ingest
description: A source the editor brings (URL, file, call notes) — raw copy, source page, evidence pages, critic verify, fold into topics and the domain or idea page. Not a command — the lead follows it when the editor shares a source.
---

Trigger: the user gives a URL or a file path, or pastes their own notes from a call or
meeting, and says it is a source — "ось джерело", "поклади в raw", "з розмови з …".
Optional: a domain, idea or brief ID to file the evidence against.

1. Fetch the URL (WebFetch) or read the file. Save a plain-text copy to
   `raw/<yyyy-mm-dd>-<slug>.md` with the header from `raw/README.md` (`url`, `title`,
   `fetched`, `added_by: user`, `source`). Never overwrite an existing raw file; add
   `-2` to the slug.
2. `node scripts/source-id.mjs "<url>"` (for a file or notes: `file://<absolute path>`).
   Create or update the source page from `templates/source.md`; grade it by AGENTS.md
   (the user's own notes: grade B, `type: primary`, `author` = the user).
3. Extract every claim worth keeping — usually 3–10 — as evidence pages from
   `templates/evidence.md`. IDs: `node scripts/next-id.mjs E-ING-<yyyymmdd>`. Fill
   `domain:` / `idea:` / `brief:` when given (`brief: null` otherwise). Contradictions
   with existing evidence → `contradicts:` on both pages.
4. Spawn `critic` with `verify <E-IDs…> <today>` in the background. Tell the user in
   one line: source ID and grade, how many evidence pages, verification running. End
   the turn.
5. Critic finished → fold the verified claims into the relevant topic pages and into
   the domain or idea page («Що знаємо» of the matching layer or workstream, tick the
   queue items they answer, close the matching «Потрібно від редактора» items, set
   `updated:`, add a `## Лог` line). Run `node scripts/lint.mjs --fix` and
   `node scripts/index.mjs`. Commit `ingest(S-<hash8>): <slug>`. Tell the user in ≤ 6
   lines: evidence IDs with one-line claims, the verification tally, any contradiction.
