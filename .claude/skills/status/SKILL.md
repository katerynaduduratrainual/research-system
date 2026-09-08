---
name: status
description: Show where the pipeline stands — ideas by stage, briefs by status, pending gates, open questions.
disable-model-invocation: true
---

Pipeline state:
!`node scripts/status.mjs`

Present it in ≤ 20 lines, Ukrainian. For every brief in `draft`, `approved`, `running`
or `collected`, name the exact next command. List the first 5 open questions. Nothing
else.
