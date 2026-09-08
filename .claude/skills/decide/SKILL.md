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
3. Update the idea card: `decision:`, `decided:`, `stage:` (advance → `validation` from
   deep-dive, or `deep-dive` from screening; park → `parked`; kill → `killed`), `updated:`.
4. Spawn `librarian` for tasks 3–5 only (index, cards, open questions).
5. Commit `decide(I-###): <decision>`. Confirm in one line. No commentary on the decision.
