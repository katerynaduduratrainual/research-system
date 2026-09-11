---
name: screen
description: One-page screening of a new idea — light brief, 3 scouts, quick rubric scores, red team lite, screen report — with a decision gate at the end. Budget ~1 hour of agent time.
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
3. Spawn three `scout`s in parallel. Wait. Spawn three `verifier`s in parallel, one per
   sub-question. Wait. Spawn `librarian`. Run lint. Write the digest into the brief
   (`## Digest`, with the verification tally), set `status: collected`, fold the new
   claims into `wiki/topics/` (see `/run` step 7). Commit `run(B-###): …`.
4. Score the idea yourself against `docs/rubric.md`: each criterion 1–5, one-line
   justification, evidence IDs; mark criteria you cannot score. Write scores into the idea
   card.
5. Spawn `red-team` with mode `lite`. Wait.
6. Spawn `writer` with report type `screen` (`templates/screen.md`), report ID from
   `next-id.mjs R`. Link the report in the idea card. Commit `screen(I-###): <slug>`.
7. Gate 3. Show the three-sentence answer, total score, and the red team's top risk.
   Ask with AskUserQuestion: advance (→ deep-dive) / park / kill / копати глибше.
   Then run the `/decide` steps with the chosen option and the user's one-line reason.
