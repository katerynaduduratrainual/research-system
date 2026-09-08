---
name: report
description: Write the report for an idea (full) or a brief (question-level). Requires a fresh red-team page; refuses otherwise.
argument-hint: 'I-### | B-### [full|screen]'
disable-model-invocation: true
---

Arguments: $ARGUMENTS.

1. For an idea: check `wiki/redteam/<idea-id>-redteam.md` exists and is newer than the
   analysis. For a brief-level report: check the brief has `status: collected` and a
   red-team page named `wiki/redteam/<brief-id>-redteam.md` exists (run `/red-team` with
   the brief ID first if not — the red-team agent accepts a brief ID in place of an idea).
   If the precondition fails, say so and stop. Do not spawn the writer.
2. Allocate `node scripts/next-id.mjs R`. Spawn `writer` with the target ID, report type
   and report ID. Wait.
3. Link the report in the idea card (or brief). Commit `report(R-###): <slug>`.
4. Show the three-sentence answer and the confidence line. Do not add your own verdict.
