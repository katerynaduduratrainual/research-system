---
name: run
description: Start an approved brief in the background — scouts, verifiers, librarian, lint, digest — and hand the session back to the user at once. Evidence review (gate 2) happens later, on demand, in /review.
argument-hint: 'B-###'
disable-model-invocation: true
---

Brief: $ARGUMENTS.

A run is a chain of background steps. You never wait on a subagent in the foreground and
you never ask a gate question here. The brief's frontmatter is the state of the run:
every transition updates `run_stage` and appends one line to the brief's
`## Журнал прогону` (`- <yyyy-mm-dd hh:mm> · <stage> · <what happened>`, Ukrainian).
Timestamps come from `node scripts/now.mjs`.

## Start
1. Read the brief.
   - `status: running` → this is a resume, go to **Resume**.
   - `status` is not `approved` → stop and say which gate is missing.
   - Two other briefs are already in a chain (`run_stage` is `scouts`, `verify`,
     `librarian`, `digest`, `redteam` or `report`) → set `run_stage: queued`, tell the
     user in one line which brief it waits for, stop.
2. Set `status: running`, `run_stage: scouts`, `run_started: <now>`,
   `run_finished: null`, `reviewed: null`. Log the line.
3. Spawn one `scout` per sub-question, all in this turn, all in the background. Each
   task prompt follows the Delegation section of CLAUDE.md exactly: sub-question text,
   brief ID + sub-question number, idea ID or "none", IN scope, OUT of scope with the
   sibling sub-question named, sources to try first, budget from the brief, the return
   format. Tell each scout its evidence ID prefix (`E-<brief>-<sq>-`).
4. Tell the user in one line what started (brief, number of scouts). Run
   `node scripts/status.mjs --waiting` and offer up to three of its items as things to
   do meanwhile, each with its exact command. End the turn. Do not wait.

## On each completion notification
Re-read the brief's frontmatter first: the file, not your memory, says where the run is.

- **A scout finished** → spawn the `verifier` for that sub-question at once, in the
  background (brief ID, sub-question number, today's date). Do not wait for the other
  scouts. On the first verifier set `run_stage: verify` and log. A scout that failed,
  returned nothing or ran out of turns gets a log line and a note for the digest, and no
  verifier.
- **All scouts and all verifiers finished** → if another brief is at
  `run_stage: librarian` or `digest`, wait until it reaches `collected`: tails write
  shared files and run one at a time. Then set `run_stage: librarian`, log, spawn
  `librarian` (full tasks) in the background.
- **Librarian finished** → run `node scripts/lint.mjs`. Errors → spawn `librarian` once
  more with the lint output. Errors after that second pass → leave
  `run_stage: librarian`, give the user one line with the lint errors, stop.
- **Lint clean** → set `run_stage: digest`, log, then:
  - Write the **Evidence digest** into the brief under `## Digest`, in Ukrainian: per
    sub-question 3–5 key findings with evidence IDs and grades; the verification tally
    (ok / inexact / failed / unreachable) and every page the verifier downgraded;
    contradictions (pairs, what differs); gaps; scouts that did not finish; the scouts'
    "для інших скаутів" leads; budget used.
  - Fold the new knowledge into `wiki/topics/`: for each theme the brief touched, update
    the existing topic page or create one from `templates/topic.md` — claims with
    evidence IDs and grades, contradictions, unknowns; set `updated:`; add the brief to
    `briefs:`. List the topic pages in the brief's «Що вже є у wiki».
  - Set `status: collected`, `run_stage: null`, `run_finished: <now>`. Log. Commit
    `run(B-###): <n> evidence, <m> sources, <k> topics`. Do not push.
  - Tell the user one line: `B-### готовий до перегляду: /review B-###`, with the
    evidence count. Do not show the digest. Do not ask anything.
  - If a brief has `run_stage: queued`, start the oldest one from **Start** step 2.

While a run is going, never summarise partial findings: an unverified number is not
evidence yet. If the user asks how it is going, answer from `node scripts/status.mjs`
(stage, elapsed time, sub-questions with evidence / verified).

## Resume
`/run B-###` on a brief with `status: running`. For each sub-question check whether
evidence pages `E-<brief>-<sq>-*` exist and whether their `verification:` is filled.
Spawn scouts only for sub-questions without evidence and verifiers only for
sub-questions with unverified evidence, then continue the chain from the matching step
above. Log "відновлено".

## Follow-up run
Called from `/review` after "копати глибше" or "додати підпитання". Same chain, scouts
only for the new sub-questions; `status` goes back to `running`, `reviewed` to `null`.
