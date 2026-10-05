---
name: status
description: Show where the pipeline stands — what waits on the user, what is running in the background, plans on the long track, ideas by stage, briefs by status.
disable-model-invocation: true
---

Pipeline state:
!`node scripts/status.mjs`

Present it in ≤ 20 lines, Ukrainian, in this order:
1. **Чекає на вас** — every gate item with its exact command; then the first 5 open
   questions.
2. **Біжить** — brief, stage, minutes, sub-questions with evidence / verified; queued
   briefs; a run marked "possibly interrupted" with the `/run B-###` to resume it.
3. **Плани** — idea, phase, week, confidence per workstream, queue length.
4. Briefs and ideas only where they add something not already said above.

Nothing else.
