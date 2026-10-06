---
name: red-team
description: Run the red team on an idea or a brief (full or lite) in the background, outside a plan checkpoint.
argument-hint: 'I-### | B-### [full|lite]'
disable-model-invocation: true
---

Arguments: $ARGUMENTS (idea or brief ID, mode defaults to `full`).

1. Verify the target exists and has at least one brief with `status: collected` or
   later. If not, say what is missing and stop.
2. Spawn `red-team` with the ID and mode in the background. Tell the user what it will
   do (pre-mortem, evidence audit, spot-check of sources), roughly how long, and end
   the turn.
3. On its completion: run lint (new evidence may have been added). Commit
   `redteam(<id>): <mode>`. Tell the user in ≤ 4 lines: top 3 failure reasons, downgrade
   count, spot-check tally, the single most decisive fact; and that `/report` is now
   unlocked. Ask whether to go on to the report.
