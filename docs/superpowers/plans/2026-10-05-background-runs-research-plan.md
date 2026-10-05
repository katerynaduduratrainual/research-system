# Background Runs and Research Plan — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** No step with subagents blocks the session, gates are asked on demand, and an
idea on the long track has a 1–3 month research plan ending in a decision plus an MVP plan.

**Architecture:** State lives in frontmatter (`run_stage` on briefs, `checkpoint` on
plans). Skills start background agents and end the turn; the lead continues the chain on
completion notifications by re-reading that state. Deferred gates are asked only in
`/review`. A new wiki entity, the plan (`wiki/plans/P-I-###.md`), carries five fixed
workstreams, question queues and three phases.

**Tech Stack:** Claude Code skills and agents (Markdown), Node 20+ scripts without
dependencies, `node:test` for script tests.

**Spec:** `docs/superpowers/specs/2026-10-05-background-runs-research-plan-design.md`

This plan is executed inline by the session that wrote the spec, so tasks name files,
interfaces and checks and do not repeat full file bodies; the spec is the source for
wording.

## Global Constraints

- Skills, agent prompts, frontmatter keys: English. Everything the user reads: Ukrainian.
- Never touch `raw/` or `docs/decision-log.md`. `docs/context.md` and `docs/rubric.md`
  are not changed by this plan.
- Gates do not weaken: nothing passes a gate without the user's explicit answer.
- `git push` only at gates, always through the permission prompt; never add it to the
  allow list.
- Frontmatter must stay inside the parser's subset (`scripts/_lib.mjs`): scalars, quoted
  strings, `[a, b]` lists, one-level nested maps.
- Brief `status` values do not change: `draft | approved | running | collected | done`.
- Idea `stage` values do not change.
- Enumerations, copied from the spec:
  - `run_stage`: `queued | scouts | verify | librarian | digest | redteam | report | null`
  - `workstream`: `demand | competition | complexity | economics | entry | null`
  - plan `status`: `draft | active | paused | closed`
  - plan `phase`: `map | depth | synthesis`
  - plan `checkpoint`: `running | ready | null`
- At most two briefs run at once; tails run one at a time.
- `node scripts/lint.mjs` on the real wiki must end with 0 errors after every task.
- One commit per task; message `<stage>(<id>): <summary>`.

## File Map

| File | Responsibility | Task |
|---|---|---|
| `scripts/_lib.mjs` | `ROOT` overridable by `RESEARCH_ROOT` (tests) | 2 |
| `scripts/now.mjs` | print local `yyyy-mm-ddThh:mm` for run logs | 2 |
| `scripts/lint.mjs` | validate new brief fields and plan pages | 2 |
| `scripts/status.mjs` | blocks Waiting on you / Running / Plans; `--waiting` | 2 |
| `scripts/tests/helpers.mjs`, `lint.test.mjs`, `status.test.mjs` | fixtures and tests | 2 |
| `templates/brief.md`, `wiki/briefs/B-00{1,2,3}-*.md` | new fields, migration | 2 |
| `.claude/skills/run/SKILL.md` | background chain, resume, queue | 3 |
| `.claude/skills/review/SKILL.md` | deferred gates 2 and 3, checkpoints, push | 3 |
| `.claude/skills/status/SKILL.md` | present the new blocks | 3 |
| `CLAUDE.md` | rules 1 and 8, schema, delegation, checkpoint format | 3 |
| `.claude/skills/{screen,red-team,report,ingest,decide,lint}/SKILL.md` | background | 4 |
| `templates/plan.md`, `.claude/skills/plan/SKILL.md` | the long track | 5 |
| `.claude/skills/deep-dive/` | removed | 5 |
| `templates/report.md`, `templates/analysis.md`, `.claude/agents/{analyst,writer}.md` | MVP plan | 5 |
| `.claude/agents/{research-lead,librarian,red-team}.md` | roles | 5 |
| `docs/vision.md`, `docs/workflow.md`, `README.md` | documentation | 5 |

---

### Task 1: Background probe

- [x] One background `scout`: WebSearch, WebFetch, `node scripts/source-id.mjs`, Write
  under `wiki/`. Result 2026-10-05: all four ok, no permission prompts, the completion
  notification arrived while the lead was mid-turn. Probe file removed. Design stands.

### Task 2: State and visibility (scripts)

**Files:** see the file map, rows marked 2.

**Interfaces — produces:**
- `RESEARCH_ROOT=<dir> node scripts/lint.mjs` and `… status.mjs` run against `<dir>/wiki`.
- `node scripts/now.mjs` → `2026-10-06T10:15`.
- `node scripts/status.mjs [--waiting]` output sections, in order: `## Waiting on you`,
  `## Running`, `## Plans`, `## Ideas`, `## Briefs`, `## Reports`, `## Counts`.
  `--waiting` prints only the first.
- Waiting rules: gate 1 = briefs `draft`, plans `draft`; gate 2 = briefs `collected`,
  `reviewed` null, `run_stage` null; gate 3 = latest report per idea where the idea's
  `decided` is null or earlier than the report's `created`, and plans with
  `checkpoint: ready`; then the open-question count and the first five.
- Running rules: briefs with `run_stage` other than null and `queued` (stage, minutes
  since `run_started`, sub-questions with evidence / verified, a "possibly interrupted"
  note after 180 minutes); queued briefs; plans with `checkpoint: running`.
- Lint errors: invalid `run_stage`; `status: running` without `run_stage`; invalid
  `workstream`; plan id not `P-I-###` or not `P-<idea>`; unknown idea; invalid plan
  `status` / `phase` / `checkpoint`; `confidence` missing a workstream key or holding an
  invalid value; `active` or `paused` plan without `started` or `target_decision`.
- Lint warnings: brief awaiting gate 2 for 7+ days; active plan not updated for 14+
  days; brief of an idea with an active plan, created on or after the plan's `started`,
  without `workstream`.

**Steps:**
- [ ] `RESEARCH_ROOT` in `_lib.mjs`; `scripts/tests/helpers.mjs` (temp wiki builder,
  script runner).
- [ ] Failing tests in `scripts/tests/lint.test.mjs` and `status.test.mjs` for every
  rule above. Run: `node scripts/tests/lint.test.mjs`, `node scripts/tests/status.test.mjs`
  — expect failures.
- [ ] Implement in `lint.mjs`, `status.mjs`, `now.mjs` until both test files pass.
- [ ] `templates/brief.md`: the five new fields and `## Журнал прогону`.
- [ ] Migration: add the fields to B-001 (`reviewed: 2026-09-09`), B-002
  (`reviewed: 2026-09-11`), B-003 (`reviewed: null`).
- [ ] `node scripts/lint.mjs` → 0 errors; `node scripts/status.mjs` → B-003 under gate 2,
  nothing under gate 3.
- [ ] Commit `feat(pipeline): run state, plan checks and waiting list in status`.

### Task 3: Background `/run`, deferred gates, rules

**Files:** rows marked 3.

**Interfaces — consumes:** Task 2 fields and scripts. **Produces:** the chain contract
other skills refer to: "Start", "On each completion notification", "Resume", "Follow-up
run" in `/run`; `/review [B-### | I-###]`.

**Steps:**
- [ ] Rewrite `run/SKILL.md` per spec 4.2, 4.5–4.7.
- [ ] Write `review/SKILL.md` per spec 5 and 6.4 (model-invocable; push at the end).
- [ ] Update `status/SKILL.md` to present the three new blocks first.
- [ ] `CLAUDE.md`: rule 1 (deferred gates), rule 8 (push at gates, dated 2026-10-05),
  schema row for Plan, Delegation (background always, continue from the file's state,
  verifier right after its scout, limit of two, tails one at a time, `now.mjs`),
  checkpoint format, "What you never do".
- [ ] Check: every skill frontmatter still parses (name, description present); lint 0
  errors.
- [ ] Commit `feat(pipeline): background runs and gates on demand`.

### Task 4: The other skills in the background

**Files:** rows marked 4.

**Steps:**
- [ ] `screen`: steps 1–2 unchanged, then the `/run` chain; after the digest the lead
  scores, then `run_stage: redteam` → red team lite → `run_stage: report` → writer →
  brief `status: done`, `run_stage: null`; one line pointing to `/review I-###`.
- [ ] `red-team`, `report`, `ingest`, `lint`: agent in the background, one line at the
  start, continuation on completion.
- [ ] `decide`: record and commit at once, push, librarian in the background; advance
  from screening points to `/plan I-###`; a recorded decision closes the idea's plan.
- [ ] Check: `grep -rn "Wait\b" .claude/skills` finds no foreground wait; lint 0 errors.
- [ ] Commit `feat(skills): screen, red-team, report, ingest, decide, lint run in background`.

### Task 5: The plan

**Files:** rows marked 5.

**Steps:**
- [ ] `templates/plan.md` per spec 6.1–6.3.
- [ ] `plan/SKILL.md` per spec 6.4–6.5 (sections: no plan yet; plan exists; phase exit
  and checkpoints; synthesis; edits in plain words).
- [ ] Remove `.claude/skills/deep-dive/`; replace every `/deep-dive` reference
  (`grep -rn "deep-dive" --include=*.md --include=*.mjs .` must leave only the idea
  `stage` value, the spec, the plan and the retro).
- [ ] MVP plan: `## План MVP` in `templates/report.md`, `## Основа для плану MVP` in
  `templates/analysis.md`, matching steps in `analyst.md` and `writer.md`.
- [ ] `research-lead.md`, `librarian.md` (plans table in the index, `briefs:` on plans),
  `red-team.md` description.
- [ ] `docs/vision.md` (editor drives ideas, deferred gates, long track, stage meanings,
  roadmap), `docs/workflow.md` (day on the long track, gates, commands), `README.md`.
- [ ] Check: a plan built from the template with real IDs passes lint in a temp wiki
  (covered by Task 2 tests); real wiki lint 0 errors; `node scripts/status.mjs` runs.
- [ ] Commit `feat(plan): research plan entity, /plan replaces /deep-dive`.

### Task 6: Acceptance on I-002 (needs the editor)

- [ ] Editor runs `/plan I-002`; the plan is built from B-003 evidence, no new searches.
- [ ] Editor approves the plan and one brief; it starts in the background.
- [ ] During the run the editor passes `/review B-003`.
- [ ] Criteria: the session is never blocked; `/status` mid-run shows the stage; the run
  ends with a one-line notice and no question; `## Журнал прогону` has a time per stage;
  lint 0 errors.
