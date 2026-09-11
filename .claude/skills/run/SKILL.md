---
name: run
description: Execute an approved brief — scouts in parallel, librarian, lint, evidence digest — then stop for evidence review (gate 2).
argument-hint: 'B-###'
disable-model-invocation: true
---

Brief: $ARGUMENTS.

1. Read the brief. If `status` is not `approved`, stop and say which gate is missing.
   Set `status: running`, add `run_started:`.
2. Spawn one `scout` subagent per sub-question, all in this same turn so they run in
   parallel. Each task prompt follows the Delegation section of CLAUDE.md exactly:
   sub-question text, brief ID + sub-question number, idea ID or "none", IN scope, OUT of
   scope with the sibling sub-question named, sources to try first, budget from the brief,
   the return format. Tell each scout its evidence ID prefix (`E-<brief>-<sq>-`).
3. Wait for all scouts. Do not summarise partial results to the user.
4. Spawn one `verifier` per sub-question, all in the same turn, each with the brief ID,
   its sub-question number and today's date. Wait. Verification comes before anyone
   reads the digest: an unverified number is not evidence yet.
5. Spawn `librarian` (full tasks). Then run `node scripts/lint.mjs`; if errors remain,
   spawn `librarian` again with the lint output.
6. Write the **Evidence digest** into the brief under `## Digest`, in Ukrainian:
   per sub-question 3–5 key findings with evidence IDs and grades; the verification
   tally (ok / inexact / failed / unreachable) and every page the verifier downgraded;
   contradictions (pairs, what differs); gaps; the scouts' "для інших скаутів" leads;
   budget used. Set `status: collected`.
7. Fold the new knowledge into `wiki/topics/`: for each theme the brief touched, update
   the existing topic page or create one from `templates/topic.md` — claims with
   evidence IDs and grades, contradictions, unknowns; set `updated:`; add the brief to
   `briefs:`. List the topic pages in the brief's «Що вже є у wiki». Commit
   `run(B-###): <n> evidence, <m> sources, <k> topics`.
8. Gate 2. Show the digest headline (≤ 12 lines) and ask with AskUserQuestion:
   переходити до аналізу / копати глибше в підпитання №… / додати підпитання / стоп.
   - "копати глибше": write the follow-up sub-questions into the brief as `sq 8+`,
     get a one-word confirmation, spawn scouts for them only, repeat steps 3–8.
   - "переходити до аналізу": tell the user the next command (`/deep-dive I-###`
     continues from here, or `/report B-###` for a question-level report which still
     requires `/red-team`).
