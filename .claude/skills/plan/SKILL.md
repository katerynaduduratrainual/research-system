---
name: plan
description: The long track for one idea — a 1–3 month research plan with five fixed workstreams, question queues, three phases with checkpoints, ending in a decision plus an MVP plan. The first call builds the plan; later calls show where it stands and line up the next briefs. Use after an idea passed screening, or on an idea the user wants investigated properly.
argument-hint: 'I-###'
disable-model-invocation: true
---

Idea: $ARGUMENTS. The plan page is `wiki/plans/P-<idea-id>.md` (`templates/plan.md`).

The user drives the idea and sets the agenda; the plan is the research back office
around it. You propose, they choose. Everything the user reads is Ukrainian.

## A. No plan yet — build it (gate: plan approved)
1. Read the idea card, the digests of its briefs, the topic pages they touch,
   `wiki/redteam/<idea>-redteam.md` if present, `wiki/open-questions.md`,
   `docs/context.md`, `docs/rubric.md`. No new searches here.
2. Write the plan with `status: draft`:
   - «Гіпотеза зараз» — copied from the idea card.
   - For each of the five workstreams: «Що знаємо» in 2–4 lines with topic and
     evidence IDs; `confidence` only where evidence exists, otherwise `null` and "ще не
     досліджували"; up to three queue items, kill-capable ones first, each with its
     origin (редактор / red team / digest B-###); «Потрібно від редактора» from the
     open questions only a human can close.
   - «Kill-критерії» from the red-team page, or one row "red team ще не запускався".
   - `briefs:` — the idea's existing briefs.
3. Show the plan in ≤ 15 lines. Ask with AskUserQuestion for the target decision date
   (4, 8 or 12 weeks from today, or the user's own), fill «Фази» from it, then ask:
   затвердити / змінити черги / стоп.
4. On approval: `status: active`, `started: <today>`, `target_decision`, `updated:`. If
   the idea's `stage` is `inbox` or `screening`, the move onto the long track is a stage
   transition: run the `/decide` steps with `advance` and the user's one-sentence
   reason. Commit `plan(I-###): created`. `git push`.

## B. Plan exists — show it and line up work
1. Run `node scripts/status.mjs`. Show ≤ 15 lines: phase and week, per workstream the
   confidence and queue length, what is running, what waits on the user.
2. If something of this idea waits at a gate, say so first with its `/review` command.
   The user may still line up more work.
3. Propose 1–3 next briefs: open kill criteria first, then the workstreams with the
   lowest confidence; in the `map` phase one broad brief per workstream not yet
   covered. For each: workstream, the question, why now. Ask which to prepare
   (AskUserQuestion, multiSelect), or take the user's own question instead. Skip this
   step when the plan is `paused`.
4. For each chosen one, write the brief by `/research` steps 1–3 with `idea:` and
   `workstream:` set; its sub-questions come from the queue items. Gate 1 for all of
   them in one AskUserQuestion round (per brief: затвердити / змінити / відкласти).
   Approved briefs get `status: approved` and a commit `brief(B-###): <slug>`; mark
   their queue items `→ B-###` in the plan; then start each by the **Start** steps of
   `/run` (background; a third one waits as `queued`).
5. End the turn with the launch notice in plain words (what started, what it gives,
   roughly how long) and, if `node scripts/status.mjs --waiting` has items, name them.

## C. Phase exit and checkpoints
Exit conditions: `map` — every workstream has a reviewed brief or the user's explicit
"пропустити"; `depth` — every kill criterion is lifted or has fired, or the user says
"досить". When the condition holds, or the user asks for a checkpoint, propose one. On
yes:
1. Plan `checkpoint: running`, `## Лог` line. Spawn `analyst` for the idea in the
   background. Tell the user what it does and roughly how long; end the turn.
2. Analyst finished → spawn `red-team` with mode `full` in the background.
3. Red team finished → lint; commit `analysis(I-###)` and `redteam(I-###)`; copy the
   red team's kill criteria into the plan's table, keeping the state of the ones
   already there; `checkpoint: ready`, `updated:`, log. Then, right away, show the checkpoint
   summary and ask the checkpoint question — section I-###, case a, of `/review`;
   `/review I-###` shows the same later.

## D. Synthesis
In the `synthesis` phase, when the user says the evidence is enough:
`checkpoint: running`; `analyst` (it must fill «Основа для плану MVP») → `red-team`
`full` → `writer` with report type `full` and a report ID from `next-id.mjs R` — each in
the background, each started by the previous one's completion. Then link the report on
the idea card, commit `report(R-###): <slug>`, set `checkpoint: null`, then right
away do the gate-3 steps of `/review` (section I-###, case b); `/review I-###` shows
the same later. Any recorded decision closes the plan.

## Edits in plain words
At any time the user may say "додай питання …", "підніми … нагору", "пропусти напрям
…", "зміни дату", "пауза", "продовжуємо". Edit the plan accordingly, add a `## Лог`
line, set `updated:`, commit `plan(I-###): <what>`. No gate: it is their plan. "пауза"
→ `status: paused`; "продовжуємо" → `status: active`.
