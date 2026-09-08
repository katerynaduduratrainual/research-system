---
name: red-team
description: Run the red team on an idea (full or lite) outside the deep-dive pipeline.
argument-hint: 'I-### [full|lite]'
disable-model-invocation: true
---

Arguments: $ARGUMENTS (idea ID, mode defaults to `full`).

1. Verify the idea card exists and has at least one brief with `status: collected` or
   later. If not, say what is missing and stop.
2. Spawn `red-team` with the idea ID and mode. Wait.
3. Run lint (new evidence may have been added). Commit `redteam(I-###): <mode>`.
4. Show the return (top 3 failure reasons, downgrade count, spot-check tally, the single
   most decisive fact). Remind the user that `/report` is now unlocked.
