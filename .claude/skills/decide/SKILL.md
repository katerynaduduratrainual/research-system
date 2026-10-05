---
name: decide
description: Record a decision on an idea — advance, park or kill — in the decision log and on the idea card. The only way docs/decision-log.md is edited.
argument-hint: 'I-### advance|park|kill "<reason>"'
disable-model-invocation: true
---

Arguments: $ARGUMENTS.

1. Parse idea ID, decision, reason. If the reason is missing, ask for one sentence with
   AskUserQuestion — a decision without a written reason is not recorded.
2. Append to `docs/decision-log.md` (newest last), one entry:
   ```
   ## <yyyy-mm-dd> · I-### · <advance|park|kill>
   - Рішення: <decision> — <reason, user's words>
   - Стадія до/після: <from> → <to>
   - На основі: [[R-###]] (звіт), бал <total>/5, red team: <top objection, one line>
   - Що б змінило рішення: <copy from report>
   - Переглянути: <date or condition, for park>
   ```
   If there is no report yet (the user moves an idea onto the long track on their own
   call), write `На основі: звіту немає — рішення редактора; докази: [[B-###]]` and
   `Що б змінило рішення: визначить план [[P-I-###]]`.
3. Update the idea card: `decision:`, `decided:`, `stage:` (advance → `deep-dive` from
   `inbox` or `screening`, `validation` from `deep-dive`; park → `parked`; kill →
   `killed`), `updated:`.
4. If the idea has a plan and the decision is park, kill, or an advance out of
   `deep-dive`: set the plan `status: closed`, `checkpoint: null`, `updated:`, and add a
   `## Лог` line with the decision.
5. Commit `decide(I-###): <decision>`. `git push`. Confirm in one line; after an advance
   onto the long track add the next step, `/plan I-###`. No commentary on the decision.
6. Spawn `librarian` for tasks 3–5 only (index, cards, open questions) in the
   background. When it finishes, commit `lint: index after decide(I-###)` if anything
   changed. Say nothing unless it failed.
