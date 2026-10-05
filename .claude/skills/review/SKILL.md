---
name: review
description: Pass the deferred gates when the user is ready — evidence review of a collected brief (gate 2), the decision on a screen or final report (gate 3), or a plan's phase checkpoint. With no argument, list everything that waits on the user. Use when the user asks to see, review or decide on finished work ("показуй B-004", "що чекає на мене").
argument-hint: '[B-### | I-###]'
---

Arguments: $ARGUMENTS.

This is where gates are asked. Nothing moves past a gate without the user's explicit
answer here. Everything shown is Ukrainian.

## No argument
Run `node scripts/status.mjs --waiting`. Present it in ≤ 12 lines, each item with its
exact command. Nothing else.

## B-### — gate 2, evidence reviewed
1. The brief must be `status: collected` with `run_stage: null`. Still in a chain → say
   which stage (`node scripts/status.mjs`) and stop. Already `reviewed` → say when, and
   ask whether to open it again.
2. Show the digest headline in ≤ 12 lines: key findings per sub-question with grades,
   the verification tally and downgrades, contradictions, gaps, scouts that did not
   finish.
3. Ask with AskUserQuestion: далі / копати глибше в підпитання №… / додати підпитання /
   стоп.
   - **далі** → set `reviewed: <today>`. If the brief's idea has an active plan
     (`wiki/plans/P-<idea>.md`), update the plan: the workstream's «Що знаємо» (claims
     with evidence IDs), its `confidence` with a one-sentence reason, tick the queue
     items this brief answered, append new queue items from the digest's gaps and the
     scouts' leads (origin `digest B-###`), add human-only items to «Потрібно від
     редактора», add the brief to `briefs:`, set `updated:`, add a `## Лог` line. A
     brief with `workstream: null` may touch several workstreams. Commit
     `review(B-###): gate 2`.
   - **копати глибше / додати підпитання** → write the follow-up sub-questions into the
     brief with the next numbers under `## Доповнюючі підпитання (<date>)`, get a
     one-word confirmation, then run the **Follow-up run** of `/run` in the background.
   - **стоп** → change nothing.
4. `git push` — the permission prompt is the user's confirmation. Then name the next
   step in one line: `/plan I-###` when the idea is on the long track, otherwise
   `/red-team` and `/report`.

## I-### — gate 3 or a phase checkpoint
Pick the case from the files.

**a. The idea's plan has `checkpoint: ready`** — phase checkpoint. Show ≤ 10 lines:
base-case market size with range, top competitors, the red team's top three failure
reasons, the spot-check tally, the state of every kill criterion. Ask with
AskUserQuestion: наступна фаза / змінити гіпотезу / ще раунд доказів / park / kill.
- **наступна фаза** → plan `phase` moves on (`map` → `depth` → `synthesis`),
  `checkpoint: null`, a `## Лог` line with the user's reason. Commit
  `plan(I-###): phase <name>`.
- **змінити гіпотезу** → ask for the new one-sentence hypothesis; update the idea card
  and the plan's «Гіпотеза зараз»; log it in both; go through the queues with the user
  and drop what no longer applies. `checkpoint: null`.
- **ще раунд доказів** → `checkpoint: null`, phase unchanged; point to `/plan I-###`.
- **park / kill** → run the `/decide` steps with the user's reason.

**b. The idea has a report newer than its last decision** (`decided` is empty or earlier
than the report's `created`) — gate 3. Show the three-sentence answer, the confidence
and what set it, the total score, the red team's top risk; for a final report also the
«План MVP» table in brief. Ask with AskUserQuestion: advance / park / kill / ще
досліджувати. Then run the `/decide` steps with the choice and the user's reason. "ще
досліджувати" records nothing; point to `/plan I-###` or `/research`.

**c. Neither** → say nothing waits for this idea and show
`node scripts/status.mjs --waiting`.

Finish with `git push`.
