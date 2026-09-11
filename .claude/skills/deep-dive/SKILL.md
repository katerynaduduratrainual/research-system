---
name: deep-dive
description: Full pipeline for one idea — brief mapped to the rubric, scouts, analyst, red team, report — with three human gates. Use after an idea passed screening, or on an idea the user already wants investigated properly.
argument-hint: 'I-###'
disable-model-invocation: true
---

Idea: $ARGUMENTS. Set `stage: deep-dive` on the idea card.

**Stage A — brief (gate 1).** Follow `/research` steps 1–4 with this difference: derive
the sub-questions from `docs/rubric.md` — at least one sub-question per criterion the
screening could not score or scored ≤ 3, plus the red team's kill criteria from the
screen report if one exists. 5–7 sub-questions, kill-capable ones first. Stop at gate 1.

**Stage B — evidence (gate 2).** On approval, follow `/run` steps 1–8 for this brief.
Stop at gate 2. Loop on "копати глибше" until the user says proceed.

**Stage C — analysis and attack.** Spawn `analyst` for the idea. Wait. Then spawn
`red-team` with mode `full`. Wait. Run lint. Commit `analysis(I-###)` and
`redteam(I-###)`. Show ≤ 10 lines: base-case size with range, top competitors, the
red team's top 3 failure reasons and spot-check tally. Ask with AskUserQuestion:
писати звіт / ще один раунд доказів по … / стоп. This is an intermediate check, not a
formal gate; keep it short.

**Stage D — report (gate 3).** Spawn `writer` with report type `full`, report ID from
`next-id.mjs R`. Link the report in the idea card. Commit `report(R-###)`. Show the
three-sentence answer, confidence and what set it, total score. Ask with
AskUserQuestion: advance (→ validation) / park / kill / ще досліджувати. Run the
`/decide` steps with the choice and the user's reason.

Never skip a gate to save time. If the user is not available, stop and leave the state in
the brief's `status` so `/status` shows where to resume.
