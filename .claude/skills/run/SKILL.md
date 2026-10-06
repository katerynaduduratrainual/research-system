---
name: run
description: Start an approved brief in the background — scouts and verifiers, then, after the editor's go, librarian, lint and digest — and hand the session back to the user at once. The run stops twice for the editor — after collection and verification, and at the digest (gate 2) — and reports in the chat each time.
argument-hint: 'B-###'
disable-model-invocation: true
---

Brief: $ARGUMENTS.

A run is a chain of background steps with two stops for the editor. You never wait on a
subagent in the foreground. The brief's frontmatter is the state of the run: every
transition updates `run_stage` and appends one line to the brief's `## Журнал прогону`
(`- <yyyy-mm-dd hh:mm> · <stage> · <what happened>`, Ukrainian). Timestamps come from
`node scripts/now.mjs`.

Stops (editor's decision 2026-10-06) — the chain never runs past one on its own:
- **(a) before launch** — the brief is approved (gate 1 in `/research` or `/plan`).
- **(b) after all scouts and verifiers** — `run_stage: checked`. You report what was
  collected and ask whether to go on to the digest.
- **(c) after the digest** — `status: collected`, `run_stage: null`. You show the digest
  headline and ask gate 2, right there.

At every stop: plain words, ≤ 12 lines, what we have and what comes next, then
`AskUserQuestion` with concrete options. No option is marked as recommended; your view
goes in the text before the question. Never reduce a stop to a command to type.

## Start
1. Read the brief.
   - `status: running` → this is a resume, go to **Resume**.
   - `status` is not `approved` → stop and say which gate is missing.
   - Two other briefs are already in a chain (`run_stage` is `scouts`, `verify`,
     `librarian`, `digest`, `redteam` or `report`) → set `run_stage: queued`, tell the
     user which brief it waits for, stop.
2. Set `status: running`, `run_stage: scouts`, `run_started: <now>`,
   `run_finished: null`, `reviewed: null`. Log the line.
3. Spawn one `scout` per sub-question, all in this turn, all in the background. Each
   task prompt follows the Delegation section of CLAUDE.md exactly: sub-question text,
   brief ID + sub-question number, idea ID or "none", IN scope, OUT of scope with the
   sibling sub-question named, sources to try first, budget from the brief, the return
   format. Tell each scout its evidence ID prefix (`E-<brief>-<sq>-`).
4. Tell the user in plain words: what started (brief, number of scouts, what each looks
   for), roughly how long (a scout takes 5–15 minutes, verification a few more), and
   that the next stop is after collection and verification. If
   `node scripts/status.mjs --waiting` has items, name them in words. End the turn. Do
   not wait.

## On each completion notification
Re-read the brief's frontmatter first: the file, not your memory, says where the run is.

- **A scout finished** → spawn the `verifier` for that sub-question at once, in the
  background (brief ID, sub-question number, today's date). Do not wait for the other
  scouts. On the first verifier set `run_stage: verify` and log. A scout that
  stopped without a report: resume it once with SendMessage, telling it to write pages
  from what it has already read and then report. If it still returns nothing, give it a
  log line and a note for the digest; spawn a verifier only if evidence pages exist.
  Between notifications say nothing unless the user asks; then answer from
  `node scripts/status.mjs` (stage, elapsed time, sub-questions covered), not findings.
- **All scouts and all verifiers finished** → **stop (b)**. Set `run_stage: checked`,
  log. Report to the user in ≤ 12 lines: evidence count per sub-question with grades;
  the verification tally and every failed or downgraded page with the reason; 2–3
  headline findings in words (verified now, so numbers may be shown); scouts that did
  not finish and what they did not reach; what comes next (librarian → lint → digest →
  topics, ≈ 5–10 minutes) and what it gives. Ask with AskUserQuestion: продовжити до
  digest · перезапустити скаута №… · додати підпитання · стоп. End the turn and wait.
  - **продовжити** → **Tail**.
  - **перезапустити / додати** → write the sub-question(s) into the brief, get a
    one-word confirmation, `run_stage: scouts`, log, spawn the scouts; the chain comes
    back to this stop when they and their verifiers finish.
  - **стоп** → leave `run_stage: checked`; `/review B-###` reopens this stop.
- **Tail** (on the user's go) → if another brief is at `run_stage: librarian` or
  `digest`, wait until it reaches `collected`: tails write shared files and run one at
  a time. Set `run_stage: librarian`, log, spawn `librarian` (full tasks) in the
  background. One sentence to the user on what it does.
- **Librarian finished** → run `node scripts/lint.mjs`. Errors → spawn `librarian` once
  more with the lint output. Errors after that second pass → leave
  `run_stage: librarian`, show the user the lint errors, stop.
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
  - **Stop (c)** → right away, in this turn, do the gate-2 steps of `/review` for this
    brief: the digest headline in ≤ 12 lines, then the gate question. The user must see
    what was found without opening a file; `/review B-###` shows the same later.
  - If a brief has `run_stage: queued`, start the oldest one from **Start** step 2 and
    say so.

While a stage is going, never summarise unverified findings: an unverified number is
not evidence yet.

## Resume
`/run B-###` on a brief with `status: running`. `run_stage: checked` → repeat stop (b).
Otherwise, for each sub-question check whether evidence pages `E-<brief>-<sq>-*` exist
and whether their `verification:` is filled. Spawn scouts only for sub-questions without
evidence and verifiers only for sub-questions with unverified evidence, then continue
the chain from the matching step above. Log "відновлено".

## Follow-up run
Called from `/review` after "копати глибше" or "додати підпитання". Same chain, scouts
only for the new sub-questions; `status` goes back to `running`, `reviewed` to `null`.
