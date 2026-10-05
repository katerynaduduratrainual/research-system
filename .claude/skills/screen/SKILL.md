---
name: screen
description: One-page screening of a new idea — light brief, 3 scouts, quick rubric scores, red team lite, screen report — run in the background, with the decision gate opened later in /review. Budget ~1 hour of agent time. A screening ends in park, kill or "worth the long track"; it never decides a product.
argument-hint: '"<idea title or one-line description>"'
disable-model-invocation: true
---

Idea: $ARGUMENTS.

1. Allocate `node scripts/next-id.mjs I`; create `wiki/ideas/I-###-<slug>.md` from
   `templates/idea.md` with `stage: screening`. Read `docs/context.md`, `docs/rubric.md`
   and the topic pages under `wiki/topics/` that touch the idea; name them and the
   reusable evidence in the brief's «Що вже є у wiki».
2. Allocate a brief `B-###` (`templates/brief.md`, `status: approved`, linked to the
   idea) with exactly three sub-questions:
   1. Проблема і попит — who has this problem, how do they solve it today, is there
      evidence they pay for a solution.
   2. Конкуренти і альтернативи — direct, indirect, "do nothing"; pricing seen.
   3. Здійсненність і відповідність — what it takes to build/launch, regulation,
      fit with `docs/context.md`.
   Budget per scout: ≤ 8 searches, ≤ 6 sources. Show the three sub-questions in 3 lines
   and continue without waiting (screening is deliberately fast; the gate is at the end).
3. Start the background chain of `/run` for this brief (its **Start** steps) and follow
   `/run` on every completion notification — scouts, verifiers, librarian, lint, digest,
   topics, commit `run(B-###): …` — with one difference at the end: set
   `status: collected` but do not announce the brief; keep the chain going with
   `run_stage: redteam`.
4. Score the idea yourself against `docs/rubric.md`: each criterion 1–5, one-line
   justification, evidence IDs; mark criteria you cannot score. Write scores into the
   idea card. Then spawn `red-team` with mode `lite` in the background. Log.
5. Red team finished → set `run_stage: report`, log, spawn `writer` with report type
   `screen` (`templates/screen.md`) and a report ID from `next-id.mjs R`, in the
   background.
6. Writer finished → link the report in the idea card; set the brief to `status: done`,
   `run_stage: null`, `run_finished: <now>`; log. Commit `screen(I-###): <slug>`. If a
   brief has `run_stage: queued`, start it.
7. Tell the user one line: `R-### готовий: /review I-###`. Do not show the report and do
   not ask anything. Gate 3 — advance (onto the long track, `/plan I-###`) / park / kill
   / ще досліджувати — is asked in `/review`. A screening has no separate gate 2: the
   evidence is reviewed together with the report.
