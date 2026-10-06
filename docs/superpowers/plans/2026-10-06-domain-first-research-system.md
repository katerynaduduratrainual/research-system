# Domain-First Research System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the research system around a *domain* (`D-###`) as the root entity,
with three agents (scout, critic, writer), four commands (`/explore`, `/research`,
`/decide`, `/review`), a runtime-neutral protocol (`AGENTS.md`, `agents/`, `playbooks/`)
with `.claude/` as a thin adapter, and a clean `main` with the v0 test base archived.

**Architecture:** State lives in frontmatter (`run_stage` on briefs, `checkpoint` and
`phase` on domains and ideas). Playbooks describe every chain as numbered steps; the
lead follows them from plain words or from a command alias. Scripts (Node, no deps)
validate the schema, generate the index, print pipeline state and enforce the
"critique before report" gate. Markdown role files carry Claude-compatible
frontmatter and are symlinked into `.claude/`.

**Tech Stack:** Markdown, Node 20+ scripts without dependencies, `node:test`, git,
Claude Code agents/skills/hooks.

**Spec:** `docs/superpowers/specs/2026-10-06-domain-first-research-system-design.md`

**Convention of this plan.** Scripts, tests, hook, settings and shell commands are
given in full. For prose files (agents, playbooks, templates, docs) the plan gives the
exact frontmatter, the section skeleton and every rule that must be present, and names
the old file to start from where one exists (`git show v0-test-base:<path>`). The spec
is the source for wording; the user reads Ukrainian, agents and playbooks are English.

## Global Constraints

- Instructions, agent prompts, playbooks, frontmatter keys: English. Everything the
  user reads (wiki pages, briefs, reports, decision log, stop texts): Ukrainian.
  Quotes in the original language; terms like TAM, churn, CAC, MVP as-is.
- `raw/` is immutable for agents. The only removal of `raw/` content is Task 1, the
  editor-approved archival (decision 2026-10-06), after `git tag v0-test-base`.
- `docs/decision-log.md` is edited only by `/decide`; the only exception is the
  reset entry in Task 1, approved by the editor.
- `docs/context.md` and `docs/rubric.md` are not changed by this plan.
- Gates do not weaken: nothing passes a gate or a stop without the user's explicit
  answer. Never mark an option as recommended.
- `git push` only at the end (Task 12), through the permission prompt. Never add push
  to the allow list.
- Frontmatter stays inside the parser's subset (`scripts/_lib.mjs`): scalars, quoted
  strings, `[a, b]` lists, `{a: 1}` flow maps, one-level nested maps.
- Enumerations, verbatim from the spec:
  - domain `status`: `active | paused | closed`; `phase`: `intro | map | focus | candidates`;
    `checkpoint`: `running | ready | null`; layers: `fundamentals | demand | models | signals | entry`
  - idea `stage`: `active | validation | parked | killed`; `decision`: `advance | park | kill | null`;
    workstreams: `demand | competition | complexity | economics | entry`
  - brief `status`: `draft | approved | running | collected`;
    `run_stage`: `queued | scouts | verify | checked | digest | null`
  - evidence `type`: `fact | statistic | estimate | opinion | anecdote | absence`;
    `verification`: `ok | inexact | failed | unreachable | null`
  - evidence IDs: `E-B###-<sq>-<nn>`, `E-D###-C-<nn>`, `E-I###-C-<nn>`, `E-ING-<yyyymmdd>-<nn>`
  - report `type`: `primer | domain | final`
  - source `grade`: `A | B | C | D`; `accessed_via`: `direct | archive | secondary | blocked`
- Models: scout and writer `opus`, critic `inherit` (editor's decision 2026-10-05:
  nothing below Opus). No turn limits on agents.
- At most two briefs run at once; tails (step 7 of the research playbook) run one at
  a time.
- `node scripts/lint.mjs` on the real wiki ends with 0 errors after every task.
- One commit per task, message `<stage>(<scope>): <summary>`, ending with
  `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## File Map

| File | Responsibility | Task |
|---|---|---|
| `wiki/**`, `raw/*.md`, `docs/retro-*`, old spec/plan | removed from main after tagging | 1 |
| `docs/decision-log.md`, `wiki/open-questions.md`, `wiki/index.md` | reset | 1 |
| `playbooks/probe.md`, `.claude/skills/probe/SKILL.md`, `agents/probe.md`, `.claude/agents/probe.md` | throwaway symlink probe | 2 |
| `scripts/sync-adapters.mjs` | fallback only if symlinks are not read | 2 |
| `templates/*.md` | 12 templates, 3 deleted | 3 |
| `scripts/tests/templates.test.mjs` | every template has its required keys | 3 |
| `scripts/_lib.mjs` | `under()` helper | 4 |
| `scripts/lint.mjs` | new schema, critique rule, `--fix` | 4 |
| `scripts/tests/helpers.mjs`, `scripts/tests/lint.test.mjs` | fixtures and lint tests | 4 |
| `scripts/index.mjs`, `scripts/tests/index.test.mjs` | generated `wiki/index.md` | 5 |
| `scripts/status.mjs`, `scripts/tests/status.test.mjs` | waiting / running / domains / ideas / briefs | 6 |
| `scripts/hooks/critique-gate.mjs`, `scripts/tests/critique-gate.test.mjs`, `.claude/settings.json` | report gate | 7 |
| `agents/scout.md`, `agents/critic.md`, `agents/writer.md`, `.claude/agents/*` | three roles | 8 |
| `playbooks/*.md`, `.claude/skills/*` | six playbooks, four commands | 9 |
| `AGENTS.md`, `CLAUDE.md` | operating rules | 10 |
| `docs/vision.md`, `docs/workflow.md`, `README.md` | user-facing docs | 11 |
| — | verification, push | 12 |

---

### Task 1: Archive the v0 test base

**Files:**
- Delete: everything under `wiki/ideas/`, `wiki/briefs/`, `wiki/evidence/`, `wiki/sources/`,
  `wiki/topics/`, `wiki/analysis/`, `wiki/redteam/`, `wiki/reports/`; `raw/2026-*.md`;
  `docs/retro-2026-09-09.md`; `docs/superpowers/specs/2026-10-05-background-runs-research-plan-design.md`;
  `docs/superpowers/plans/2026-10-05-background-runs-research-plan.md`
- Create: `wiki/{domains,ideas,briefs,evidence,sources,topics,critique,analysis,reports}/.gitkeep`
- Rewrite: `wiki/index.md`, `wiki/open-questions.md`, `docs/decision-log.md`

**Interfaces:**
- Produces: the git tag `v0-test-base`, which later tasks use as `git show v0-test-base:<path>` to read old agent and skill files.

- [ ] **Step 1: Confirm the tree is clean and tag it**

Run:
```bash
cd /Users/valentindmitruk/research-system && git status --short && git tag v0-test-base && git tag --list v0-test-base
```
Expected: no status lines; prints `v0-test-base`.

- [ ] **Step 2: Remove the test base from main**

Run:
```bash
cd /Users/valentindmitruk/research-system && git rm -r -q wiki/ideas wiki/briefs wiki/evidence wiki/sources wiki/topics wiki/analysis wiki/redteam wiki/reports && git rm -q raw/2026-*.md docs/retro-2026-09-09.md docs/superpowers/specs/2026-10-05-background-runs-research-plan-design.md docs/superpowers/plans/2026-10-05-background-runs-research-plan.md && ([ -d wiki/plans ] && rmdir wiki/plans || true) && mkdir -p wiki/domains wiki/ideas wiki/briefs wiki/evidence wiki/sources wiki/topics wiki/critique wiki/analysis wiki/reports && for d in domains ideas briefs evidence sources topics critique analysis reports; do : > wiki/$d/.gitkeep; done && ls wiki raw docs
```
Expected: `wiki` lists the nine folders plus `index.md` and `open-questions.md`; `raw` lists only `README.md`; `docs` has no retro.

- [ ] **Step 3: Reset the three shared files**

Write `wiki/open-questions.md`:
```markdown
# Відкриті питання

Питання, на які може відповісти лише людина, або які агенти не змогли закрити.
Формат: `- [ ] <B-###/sq | D-### | I-###>: <питання>` · закриті — `[x]` з посиланням на доказ.
```

Write `wiki/index.md` (Task 5 will regenerate it):
```markdown
# Індекс wiki

_(Генерує `node scripts/index.mjs`. Не редагуйте руками — перезапишеться.)_

## Напрями

_(напрямів поки немає)_
```

Write `docs/decision-log.md`:
```markdown
# Decision log

Записи додає лише `/decide`. Найновіші — внизу. Формат запису — у
`playbooks/decide.md`.

---

## 2026-10-06 · система · перезапуск
- Хто: редактор
- Рішення: перезапуск — тестову базу v0 (2 ідеї, 6 brief'ів, 299 доказів, 201 джерело, 17 тем, raw/) знято з main; усе було калібруванням системи.
- На основі: рішення редактора 2026-10-06; дизайн `docs/superpowers/specs/2026-10-06-domain-first-research-system-design.md`. Історія збережена тегом `v0-test-base`.
- Що б змінило рішення: —
```

- [ ] **Step 4: Verify the old scripts still run on the empty wiki**

Run:
```bash
cd /Users/valentindmitruk/research-system && node scripts/lint.mjs | tail -1 && node scripts/tests/lint.test.mjs 2>&1 | tail -3 && node scripts/tests/status.test.mjs 2>&1 | tail -3
```
Expected: `lint: 0 error(s), 0 warning(s), 0 page(s)`; both test files end with `# fail 0`.

- [ ] **Step 5: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add -A && git commit -q -m "$(cat <<'EOF'
chore(reset): archive v0 test base

Tag v0-test-base keeps the history; main starts clean.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 2: Probe the adapter mechanism (symlinks into `.claude/`)

**Files:**
- Create (throwaway): `playbooks/probe.md`, `.claude/skills/probe/SKILL.md` (symlink),
  `agents/probe.md`, `.claude/agents/probe.md` (symlink)
- Create only on fallback: `scripts/sync-adapters.mjs`

**Interfaces:**
- Produces: the decision "symlinks" or "sync script", recorded in the commit message and used by Tasks 8 and 9.

- [ ] **Step 1: Create the probe skill and agent through symlinks**

```bash
cd /Users/valentindmitruk/research-system && mkdir -p playbooks agents .claude/skills/probe && cat > playbooks/probe.md <<'EOF'
---
name: probe
description: Temporary probe that checks whether Claude Code reads a symlinked SKILL.md. Delete after the check.
disable-model-invocation: true
---

Reply with exactly the text PROBE-SKILL-OK and nothing else.
EOF
cat > agents/probe.md <<'EOF'
---
name: probe
description: Temporary probe that checks whether Claude Code reads a symlinked agent file. Delete after the check.
tools: Read
model: haiku
---

Whatever the task says, reply with exactly the text PROBE-AGENT-OK and nothing else.
EOF
ln -s ../../../playbooks/probe.md .claude/skills/probe/SKILL.md && ln -s ../../agents/probe.md .claude/agents/probe.md && ls -l .claude/skills/probe .claude/agents | grep probe
```
Expected: two `->` symlink lines.

- [ ] **Step 2: Check that Claude Code resolves both**

Run (a nested non-interactive session; it needs no permissions):
```bash
cd /Users/valentindmitruk/research-system && claude -p "/probe" --max-turns 1 2>&1 | tail -3
```
Expected: output contains `PROBE-SKILL-OK`.

Run:
```bash
cd /Users/valentindmitruk/research-system && claude -p "Use the Agent tool with subagent_type \"probe\" and prompt \"go\". Reply with exactly what it returned." --max-turns 3 2>&1 | tail -3
```
Expected: output contains `PROBE-AGENT-OK`.

If `claude -p` cannot run here (sandbox, auth), ask the user to open a new session in
this folder, type `/` and confirm `probe` is listed, and run the probe agent once. If
either check fails, go to Step 3 (fallback); otherwise skip it.

- [ ] **Step 3 (fallback only): Write the sync script and use it instead of symlinks**

Create `scripts/sync-adapters.mjs`:
```js
#!/usr/bin/env node
// Copies agents/*.md and the four command playbooks into .claude/ for runtimes that
// do not follow symlinks. Run after editing anything under agents/ or playbooks/.
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./_lib.mjs";

const COMMANDS = ["explore", "research", "decide", "review"];
mkdirSync(join(ROOT, ".claude", "agents"), { recursive: true });
for (const f of readdirSync(join(ROOT, "agents"))) {
  if (f.endsWith(".md")) copyFileSync(join(ROOT, "agents", f), join(ROOT, ".claude", "agents", f));
}
for (const c of COMMANDS) {
  mkdirSync(join(ROOT, ".claude", "skills", c), { recursive: true });
  copyFileSync(join(ROOT, "playbooks", `${c}.md`), join(ROOT, ".claude", "skills", c, "SKILL.md"));
}
console.log("adapters synced: agents " + readdirSync(join(ROOT, "agents")).filter(f => f.endsWith(".md")).length + " · skills " + COMMANDS.length);
```
Then remove the two symlinks (`rm .claude/skills/probe/SKILL.md .claude/agents/probe.md`), copy the probe files in their place, and repeat Step 2. In Tasks 8 and 9 replace every `ln -s` with `node scripts/sync-adapters.mjs`.

- [ ] **Step 4: Remove the probe files**

```bash
cd /Users/valentindmitruk/research-system && rm -r .claude/skills/probe && rm .claude/agents/probe.md playbooks/probe.md agents/probe.md && rmdir playbooks agents 2>/dev/null; git status --short
```
Expected: no changes, or only `scripts/sync-adapters.mjs` if the fallback was needed.

- [ ] **Step 5: Commit the result (only if the fallback script exists)**

```bash
cd /Users/valentindmitruk/research-system && git add scripts/sync-adapters.mjs && git commit -q -m "$(cat <<'EOF'
chore(adapters): sync script for runtimes that do not follow symlinks

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)"
```
If symlinks worked, nothing is committed; note "symlinks: ok" in the Task 8 commit message.

---

### Task 3: Templates

**Files:**
- Create: `templates/domain.md`, `templates/critique-domain.md`, `templates/critique-idea.md`,
  `templates/primer.md`, `templates/report-domain.md`
- Rewrite: `templates/idea.md`
- Modify: `templates/brief.md`, `templates/evidence.md`, `templates/source.md`,
  `templates/topic.md`, `templates/analysis.md`
- Rename: `templates/report.md` → `templates/report-final.md`
- Delete: `templates/plan.md`, `templates/screen.md`, `templates/redteam.md`
- Test: `scripts/tests/templates.test.mjs`

**Interfaces:**
- Produces: the frontmatter keys that `lint.mjs` (Task 4), `status.mjs` (Task 6), agents (Task 8) and playbooks (Task 9) rely on. Exact keys are listed in the test below.

- [ ] **Step 1: Write the failing test**

Create `scripts/tests/templates.test.mjs`:
```js
// Run: node scripts/tests/templates.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "../_lib.mjs";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "templates");
const REPORT = ["id", "target", "type", "author", "created", "confidence", "confidence_set_by", "briefs"];
const CRITIQUE = ["target", "author", "created", "updated", "spotcheck"];
const REQUIRED = {
  "domain.md": ["id", "title", "owner", "author", "status", "phase", "checkpoint", "created", "updated", "target", "confidence", "briefs", "candidates", "reports"],
  "idea.md": ["id", "title", "domain", "owner", "author", "stage", "decision", "checkpoint", "created", "updated", "decided", "target_decision", "confidence", "briefs", "reports", "scores", "total"],
  "brief.md": ["id", "question", "domain", "idea", "layer", "author", "status", "created", "approved", "run_stage", "run_started", "run_finished", "reviewed", "budget"],
  "evidence.md": ["id", "claim", "type", "source", "source_grade", "confidence", "date_of_info", "brief", "domain", "idea", "contradicts", "created", "verified", "verification"],
  "source.md": ["id", "url", "title", "publisher", "author", "published", "accessed", "accessed_via", "type", "grade", "raw"],
  "topic.md": ["id", "title", "updated", "briefs", "domains", "status"],
  "critique-domain.md": CRITIQUE,
  "critique-idea.md": CRITIQUE,
  "analysis.md": ["idea", "brief", "created", "updated", "author"],
  "primer.md": REPORT,
  "report-domain.md": REPORT,
  "report-final.md": [...REPORT, "total_score"],
};

test("the templates folder holds exactly the twelve templates", () => {
  const files = readdirSync(DIR).filter(f => f.endsWith(".md")).sort();
  assert.deepEqual(files, Object.keys(REQUIRED).sort());
});

test("every template has frontmatter with its required keys", () => {
  for (const [file, keys] of Object.entries(REQUIRED)) {
    const { fm } = parseFrontmatter(readFileSync(join(DIR, file), "utf8"));
    assert.ok(fm, `${file}: no frontmatter`);
    for (const k of keys) assert.ok(k in fm, `${file}: missing ${k}`);
  }
});

test("domain and idea templates carry the five confidence keys", () => {
  const keys = file => Object.keys(parseFrontmatter(readFileSync(join(DIR, file), "utf8")).fm.confidence);
  assert.deepEqual(keys("domain.md"), ["fundamentals", "demand", "models", "signals", "entry"]);
  assert.deepEqual(keys("idea.md"), ["demand", "competition", "complexity", "economics", "entry"]);
});

test("the source template no longer carries the hand-maintained usage list", () => {
  assert.ok(!/Використано в/.test(readFileSync(join(DIR, "source.md"), "utf8")));
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/templates.test.mjs 2>&1 | tail -5`
Expected: `# fail 3` or more (missing files, missing keys).

- [ ] **Step 3: Delete and rename**

```bash
cd /Users/valentindmitruk/research-system && git rm -q templates/plan.md templates/screen.md templates/redteam.md && git mv templates/report.md templates/report-final.md
```

- [ ] **Step 4: Write `templates/domain.md`**

```markdown
---
id: D-000
title: ""
owner: ""             # хто затверджує гейти цього напряму
author: ""            # хто створив
status: active        # active | paused | closed
phase: intro          # intro | map | focus | candidates
checkpoint: null      # null | running | ready
created: 0000-00-00
updated: 0000-00-00
target: null          # yyyy-mm-dd, орієнтир виходу на кандидатів; ставить редактор
confidence:           # low | medium | high | null (ще не досліджували), по шарах
  fundamentals: null
  demand: null
  models: null
  signals: null
  entry: null
briefs: []            # веде scripts/lint.mjs --fix
candidates: []        # I-### ідей, що виросли з напряму; веде lint --fix
reports: []           # веде lint --fix
---

# {{title}}

## Чому цей напрям
Слова редактора, дата.

## Межі
- В межах: …
- Поза межами: …
- Географія: …
- Час: …

## Шари

### 1. Основи (`fundamentals`)
Як влаштована галузь, ланцюжок вартості, хто кому платить, масштаб, терміни, технологія.
- **Що знаємо:** … [[T-...]] [[E-...]] (grade, дата)
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] … _(походження: редактор | критик | digest B-###)_
- **Потрібно від редактора:** …

### 2. Попит (`demand`)
У кого які проблеми, як їх вирішують сьогодні, за що платять, скільки їх.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

### 3. Хто й як заробляє (`models`)
Існуючі бізнес-моделі, ціни, маржа, що з цими бізнесами стало.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

### 4. Що змінюється (`signals`)
Технологія, регуляторика, гроші, що відкрилося недавно, що закривається.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

### 5. Вхід і правила (`entry`)
Закупівлі, сертифікація, ліцензії, бар'єри для нового гравця.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

## Фокус
_(після зупинки карти: 1–3 піднапрями, причина вибору, дата; записує `/decide D-### focus`)_

## Кандидати
_(пише лід на зупинці фокусу, лише з доказів карти: кожен кандидат має ≥ 1 доказ про
проблему і ≥ 1 про те, хто за це платить. Стан: запропоновано | ідея I-### | відхилено)_

| # | Хто | Проблема | Як | За що платять | Докази | Заперечення критика | Стан |
|---|---|---|---|---|---|---|---|

## Фази
| Фаза | Період | Умова виходу | Стан |
|---|---|---|---|
| Вступ (`intro`) | … – … | конспект прочитано, редактор сказав «карта» | |
| Карта (`map`) | … – … | кожен із шарів 2–5 має переглянутий brief або «пропустити» від редактора | |
| Фокус (`focus`) | … – … | редактор сказав «досить» або черги фокусу порожні | |
| Кандидати (`candidates`) | … – … | редактор закрив напрям | |

## Лог
- 0000-00-00 — створено
```

- [ ] **Step 5: Rewrite `templates/idea.md`**

```markdown
---
id: I-000
title: ""
domain: null          # D-### або null, якщо редактор приніс ідею напряму
owner: ""
author: ""
stage: active         # active | validation | parked | killed
decision: null        # null | advance | park | kill
checkpoint: null      # null | running | ready
created: 0000-00-00
updated: 0000-00-00
decided: null
target_decision: null # yyyy-mm-dd, ставить редактор
confidence:           # low | medium | high | null, по напрямах роботи
  demand: null
  competition: null
  complexity: null
  economics: null
  entry: null
briefs: []            # веде lint --fix
reports: []           # веде lint --fix
scores:               # 1–5 за docs/rubric.md; null = не оцінено
  fit: null
  market: null
  competition: null
  time_to_revenue: null
  risk: null
  why_us: null
total: null           # зважена сума, див. docs/rubric.md
---

# {{title}}

## Гіпотеза (одне речення)
Хто · яку проблему · як вирішуємо · за що платять.

## Звідки ідея
Кандидат № … напряму [[D-000]], дата; або слова редактора.

## Напрями роботи

### 1. Попит і ринок (`demand`)
Хто платить за це рішення, скільки їх, розмір bottom-up. Рубрика: market.
- **Що знаємо:** … [[E-...]]
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] … _(походження: редактор | критик | digest B-###)_
- **Потрібно від редактора:** …

### 2. Конкуренти й альтернативи (`competition`)
Прямі, непрямі, держава, «нічого не робити»; ціни. Рубрика: competition, why_us.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

### 3. Складність реалізації (`complexity`)
Техніка, залізо, команда, строки. Рубрика: fit, time_to_revenue.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

### 4. Економіка (`economics`)
Ціна, собівартість, маржа, юніт-економіка. План MVP: ціна.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

### 5. Вхід (`entry`)
Шлях до першого контракту, закупівлі, юридика, сертифікація. Рубрика: risk, time_to_revenue.
- **Що знаємо:** …
- **Впевненість:** ще не досліджували
- **Черга питань:**
  1. [ ] …
- **Потрібно від редактора:** …

## Kill-критерії
Від критика. Стан: відкритий · знято · спрацював.

| # | Критерій | Стан | Докази |
|---|---|---|---|
| 1 | Якщо … — ідею варто закрити | відкритий | |

## Бали
| Критерій | Бал | Обґрунтування | Докази |
|---|---|---|---|
| Відповідність активам | | | |
| Ринок | | | |
| Конкуренція | | | |
| Час до доходу | | | |
| Ризики | | | |
| Чому ми | | | |

## Лог
- 0000-00-00 — створено
```

- [ ] **Step 6: Modify `templates/brief.md` frontmatter**

Replace the whole frontmatter block with:
```yaml
---
id: B-000
question: ""
domain: null          # D-### або null
idea: null            # I-### або null
layer: null           # напрям: fundamentals | demand | models | signals | entry
                      # ідея: demand | competition | complexity | economics | entry
                      # null = наскрізний або поза напрямом
author: ""
status: draft         # draft | approved | running | collected
created: 0000-00-00
approved: null
run_stage: null       # queued | scouts | verify | checked | digest | null
run_started: null     # yyyy-mm-ddThh:mm
run_finished: null    # yyyy-mm-ddThh:mm
reviewed: null        # yyyy-mm-dd — гейт 2 пройдено
budget:
  scouts: 0
  searches_per_scout: 12
  max_sources_per_scout: 10
---
```
Body unchanged, except the Digest placeholder reads `_(заповнює лід на кроці 7 playbook'у research)_`.

- [ ] **Step 7: Modify `templates/evidence.md` frontmatter**

Replace `ideas: []             # [I-001]` with two lines:
```yaml
domain: null          # D-### або null; скауту досить заповнити brief
idea: null            # I-### або null
```
and change the first line comment to `id: E-B000-0-00      # E-B###-<sq>-<nn> | E-D###-C-<nn> | E-I###-C-<nn> | E-ING-<yyyymmdd>-<nn>`. Keep `brief: B-000` (null for ingest and critic pages). Body unchanged.

- [ ] **Step 8: Modify `templates/source.md`, `templates/topic.md`, `templates/analysis.md`**

`source.md`: delete the section `## Використано в` and its placeholder line. Everything else unchanged.

`topic.md`: replace `ideas: []              # ідеї, яких стосується тема` with `domains: []            # напрями, яких стосується тема`.

`analysis.md`: `author: analyst` → `author: writer`; in «Основа для плану MVP» replace the two italic/intro lines with:
```markdown
Обсяг MVP визначає редактор у гіпотезі картки [[I-000]]. Тут — що під кожним пунктом
кажуть докази; де нічого немає — «невідомо» і питання у `wiki/open-questions.md`.
```

- [ ] **Step 9: Write `templates/critique-domain.md` and `templates/critique-idea.md`**

`critique-domain.md`:
```markdown
---
target: D-000
author: critic
created: 0000-00-00
updated: 0000-00-00
spotcheck: {ok: 0, inexact: 0, failed: 0}
---

# Критика напряму: {{title}}

## Де твердження про гроші найслабші
1. … — тримається на [[E-...]] (grade C) / доказів немає

## Аудит доказів по шарах
| Шар | Сторінок | На джерелах C/D | Заяви вендорів як факти | Що знизив би |
|---|---|---|---|---|

## Перевірка джерел (5 вибіркових, включно з позначеними ok)
| Доказ | Джерело | Результат | Коментар |
|---|---|---|---|
| [[E-...]] | [[S-...]] | ✅ / ⚠️ / ❌ | |

## Кого немає в доказах
Інкумбенти, регулятор, «нічого не робити», субститути, суміжні гравці.

## Сигнали: докази грошей чи лише преса
| Сигнал | Докази грошей | Лише преса | Висновок |
|---|---|---|---|

## Кандидати (якщо є)
| # | Найсильніше заперечення | Один факт, що вбив би | Докази |
|---|---|---|---|

## Що карта не покриває
- …

## Один факт, який змінив би картину найбільше
…
```

`critique-idea.md`: the old `templates/redteam.md` (`git show v0-test-base:templates/redteam.md`) with the frontmatter replaced by the block above (`target: I-000`), the `mode` field removed, the title `# Критика ідеї: {{title}}`, and the section «Атака на припущення аналітика» renamed «Атака на припущення аналізу». Sections otherwise unchanged: pre-mortem, аудит доказів, перевірка джерел, кого немає, kill-критерії, атака на припущення, один факт.

- [ ] **Step 10: Write `templates/primer.md`, `templates/report-domain.md`, update `templates/report-final.md`**

`primer.md`:
```markdown
---
id: R-000
target: D-000
type: primer
author: writer
created: 0000-00-00
confidence: medium    # high | medium | low — найнижчий grade серед центральних тверджень
confidence_set_by: "" # grade доказів
briefs: []
---

# Конспект напряму: {{title}}

## Як це влаштовано
Ланцюжок вартості, хто кому платить, за що. … [[E-...]]

## Масштаб і структура
Числа з ID доказів; діапазони, не точки. … [[E-...]]

## Гравці й сегменти
… [[E-...]]

## Терміни
- **Термін** — пояснення [[E-...]]

## Що змінилося за п'ять років
… [[E-...]]

## Чого ми ще не знаємо
- … (з прогалин digest'у; посилання на `wiki/open-questions.md`)

## Що читати далі
- [[S-...]] (grade, дата) — чому саме воно
```

`report-domain.md`:
```markdown
---
id: R-000
target: D-000
type: domain
author: writer
created: 0000-00-00
confidence: medium    # high | medium | low
confidence_set_by: "" # grade доказів | spot-check критика
briefs: []
---

# Стан напряму: {{title}}

## Що знаємо по шарах
| Шар | Головне | Впевненість | Докази |
|---|---|---|---|
| Основи | | | |
| Попит | | | |
| Хто й як заробляє | | | |
| Що змінюється | | | |
| Вхід і правила | | | |

## Де гроші
… [[E-...]]

## Що слабке (за критикою)
1. … [[E-...]]
Spot-check: ✅ n · ⚠️ n · ❌ n.

## Кого немає
…

## Кандидати
_(лише у фазі фокусу й пізніше; інакше розділ прибрати)_
| # | Гіпотеза | Докази | Заперечення критика |
|---|---|---|---|

## Відкриті питання
- …

## Наступний крок дослідження
… (не рішення — його приймає редактор)
```

`report-final.md`: the renamed old `report.md` with frontmatter changed to:
```yaml
---
id: R-000
target: I-000
type: final
author: writer
created: 0000-00-00
confidence: medium    # high | medium | low
confidence_set_by: "" # grade доказів | чутливість аналізу | spot-check критика
total_score: null
briefs: []
---
```
In the body: «Контраргументи (red team)» → «Контраргументи (критик)»; in «План MVP» replace the italic note and the quote line with `> Обсяг MVP за гіпотезою редактора з картки [[I-000]]: …`. Everything else unchanged.

- [ ] **Step 11: Run the template test**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/templates.test.mjs 2>&1 | tail -5`
Expected: `# pass 4`, `# fail 0`.

- [ ] **Step 12: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add -A templates scripts/tests/templates.test.mjs && git commit -q -m "$(cat <<'EOF'
feat(templates): domain, critique, primer and domain report; plan and screen removed

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 4: Lint for the new schema, with `--fix`

**Files:**
- Modify: `scripts/_lib.mjs` (add `under`)
- Rewrite: `scripts/lint.mjs`
- Rewrite: `scripts/tests/helpers.mjs`, `scripts/tests/lint.test.mjs`

**Interfaces:**
- Consumes: template keys from Task 3.
- Produces: `under(pages, dir)` in `_lib.mjs`; fixture builders `domain, idea, brief, evidence, source, topic, report, critique, analysis, NO_LAYERS, NO_WORKSTREAMS` and `run(script, root, args, input)` in `helpers.mjs`, used by Tasks 5–7; lint messages quoted in the tests below, which playbooks may echo to the user.

- [ ] **Step 1: Add `under` to `scripts/_lib.mjs`**

Append after `loadWiki`:
```js
// Pages of one wiki folder that have frontmatter, e.g. under(pages, "domains").
export const under = (pages, dir) => pages.filter(p => p.rel.startsWith(`wiki/${dir}/`) && p.fm);
```

- [ ] **Step 2: Rewrite `scripts/tests/helpers.mjs`**

```js
// Test helpers: build a throwaway wiki and run a script against it via RESEARCH_ROOT.
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), "..");

// entries: [relative path, text] pairs, as returned by the builders below.
export function makeWiki(...entries) {
  const root = mkdtempSync(join(tmpdir(), "research-wiki-"));
  mkdirSync(join(root, "wiki"), { recursive: true });
  for (const [rel, text] of entries) {
    const p = join(root, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, text);
  }
  return root;
}

// Runs scripts/<script> with RESEARCH_ROOT=root; `input` is piped to stdin (hooks).
export function run(script, root, args = [], input = "") {
  const r = spawnSync(process.execPath, [join(SCRIPTS, script), ...args], {
    env: { ...process.env, RESEARCH_ROOT: root }, encoding: "utf8", input,
  });
  return { code: r.status, out: r.stdout + r.stderr };
}

const pad = n => String(n).padStart(2, "0");
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// Local date `offset` days from today, yyyy-mm-dd.
export const day = offset => ymd(new Date(Date.now() + offset * 86400e3));
// Local timestamp `minutes` ago, yyyy-mm-ddThh:mm — the format run logs use.
export const stamp = minutes => {
  const d = new Date(Date.now() - minutes * 60000);
  return `${ymd(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const val = v => v === null ? "null"
  : Array.isArray(v) ? `[${v.join(", ")}]`
  : typeof v === "string" && (v === "" || /: |#/.test(v)) ? JSON.stringify(v)
  : String(v);

export function page(fm, body = "") {
  const lines = [];
  for (const [k, v] of Object.entries(fm)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const [k2, v2] of Object.entries(v)) lines.push(`  ${k2}: ${val(v2)}`);
    } else lines.push(`${k}: ${val(v)}`);
  }
  return `---\n${lines.join("\n")}\n---\n${body}\n`;
}

export const NO_LAYERS = { fundamentals: null, demand: null, models: null, signals: null, entry: null };
export const NO_WORKSTREAMS = { demand: null, competition: null, complexity: null, economics: null, entry: null };

export const domain = (id, extra = {}, body = "") => [`wiki/domains/${id}-x.md`, page({
  id, title: `Domain ${id}`, owner: "editor", author: "editor", status: "active", phase: "intro",
  checkpoint: null, created: day(-3), updated: day(0), target: null,
  confidence: NO_LAYERS, briefs: [], candidates: [], reports: [], ...extra,
}, body)];

export const idea = (id, extra = {}, body = "") => [`wiki/ideas/${id}-x.md`, page({
  id, title: `Idea ${id}`, domain: null, owner: "editor", author: "editor", stage: "active",
  decision: null, checkpoint: null, created: day(-3), updated: day(0), decided: null,
  target_decision: null, confidence: NO_WORKSTREAMS, briefs: [], reports: [], total: null, ...extra,
}, body)];

export const brief = (id, extra = {}, body = "") => [`wiki/briefs/${id}-x.md`, page({
  id, question: `Question ${id}`, domain: null, idea: null, layer: null, author: "editor",
  status: "draft", created: day(0), approved: null, run_stage: null, run_started: null,
  run_finished: null, reviewed: null, ...extra,
}, body)];

export const evidence = (id, extra = {}) => [`wiki/evidence/${id}.md`, page({
  id, claim: "Claim with 10 units", type: "fact", source: "S-00000000", source_grade: "B",
  confidence: "low", date_of_info: day(0), brief: null, domain: null, idea: null,
  contradicts: [], created: day(0), verified: null, verification: null, ...extra,
}, "\n## Цитата\n> quote\n")];

export const source = (id = "S-00000000", extra = {}) => [`wiki/sources/${id}.md`, page({
  id, url: `https://example.com/${id}`, title: `Source ${id}`, publisher: "x", published: "2026",
  accessed: day(0), accessed_via: "direct", type: "primary", grade: "B", raw: null, ...extra,
})];

export const topic = (id, extra = {}, body = "") => [`wiki/topics/${id}.md`, page({
  id, title: `Topic ${id}`, updated: day(0), briefs: [], domains: [], status: "active", ...extra,
}, body)];

export const report = (id, target, type = "primer", extra = {}, body = "") => [`wiki/reports/${id}-x.md`, page({
  id, target, type, author: "writer", created: day(0), confidence: "low",
  confidence_set_by: "grade", total_score: null, briefs: [], ...extra,
}, body)];

export const critique = (target, extra = {}) => [`wiki/critique/${target}-critique.md`, page({
  target, author: "critic", created: day(0), updated: day(0),
  spotcheck: { ok: 0, inexact: 0, failed: 0 }, ...extra,
})];

export const analysis = (ideaId, extra = {}) => [`wiki/analysis/${ideaId}-analysis.md`, page({
  idea: ideaId, brief: [], created: day(0), updated: day(0), author: "writer", ...extra,
})];
```

- [ ] **Step 3: Rewrite `scripts/tests/lint.test.mjs` (the failing tests)**

```js
// Run: node scripts/tests/lint.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { makeWiki, run, day, stamp, domain, idea, brief, evidence, source, topic, report, critique, analysis } from "./helpers.mjs";

const lint = (...entries) => run("lint.mjs", makeWiki(...entries));
const errors = out => out.split("\n").filter(l => l.startsWith("ERROR"));
const warnings = out => out.split("\n").filter(l => l.startsWith("WARNING"));
const hasError = (out, text) => errors(out).some(l => l.includes(text));
const hasWarning = (out, text) => warnings(out).some(l => l.includes(text));

test("an empty wiki passes", () => {
  const { out, code } = lint();
  assert.match(out, /lint: 0 error\(s\), 0 warning\(s\), 0 page\(s\)/);
  assert.equal(code, 0);
});

// --- domains ----------------------------------------------------------------

test("accepts a valid active domain", () => {
  const { out, code } = lint(domain("D-001"));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects an unknown phase", () => {
  const { out } = lint(domain("D-001", { phase: "depth" }));
  assert.ok(hasError(out, 'invalid phase "depth"'), out);
});

test("rejects a domain missing a layer in confidence", () => {
  const { out } = lint(domain("D-001", { confidence: { fundamentals: null, demand: null, models: null, signals: null } }));
  assert.ok(hasError(out, "confidence missing entry"), out);
});

test("rejects an active domain without owner", () => {
  const { out } = lint(domain("D-001", { owner: "" }));
  assert.ok(hasError(out, "active domain without owner"), out);
});

test("rejects a domain whose file name does not start with its id", () => {
  const [, text] = domain("D-001");
  const { out } = lint(["wiki/domains/local-llm.md", text]);
  assert.ok(hasError(out, "file name must start with D-001-"), out);
});

// --- ideas ------------------------------------------------------------------

test("accepts an idea under an existing domain", () => {
  const { out, code } = lint(domain("D-001"), idea("I-001", { domain: "D-001" }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects an unknown idea stage", () => {
  const { out } = lint(idea("I-001", { stage: "screening" }));
  assert.ok(hasError(out, 'invalid stage "screening"'), out);
});

test("rejects an idea pointing at a missing domain", () => {
  const { out } = lint(idea("I-001", { domain: "D-009" }));
  assert.ok(hasError(out, "unknown domain D-009"), out);
});

// --- briefs -----------------------------------------------------------------

test("accepts a running domain brief with a layer", () => {
  const { out, code } = lint(domain("D-001"), brief("B-001", {
    domain: "D-001", layer: "fundamentals", status: "running", run_stage: "verify", run_started: stamp(10),
  }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects a domain layer on an idea brief", () => {
  const { out } = lint(idea("I-001"), brief("B-001", { idea: "I-001", layer: "fundamentals" }));
  assert.ok(hasError(out, 'invalid layer "fundamentals" for an idea brief'), out);
});

test("rejects the retired run stages", () => {
  const { out } = lint(brief("B-001", { status: "running", run_stage: "librarian" }));
  assert.ok(hasError(out, 'invalid run_stage "librarian"'), out);
});

test("rejects a running brief without run_stage", () => {
  const { out } = lint(brief("B-001", { status: "running" }));
  assert.ok(hasError(out, "running brief without run_stage"), out);
});

test("rejects an approved brief without author", () => {
  const { out } = lint(brief("B-001", { status: "approved", author: "" }));
  assert.ok(hasError(out, "brief past gate 1 without author"), out);
});

test("warns when a collected brief has waited a week for gate 2", () => {
  const { out } = lint(brief("B-001", { status: "collected", run_finished: `${day(-8)}T10:00` }));
  assert.ok(hasWarning(out, "awaiting gate 2 for 7+ days"), out);
});

test("does not warn about gate 2 once reviewed or while under a week", () => {
  assert.ok(!hasWarning(lint(brief("B-001", { status: "collected", run_finished: `${day(-8)}T10:00`, reviewed: day(-7) })).out, "awaiting gate 2"));
  assert.ok(!hasWarning(lint(brief("B-001", { status: "collected", run_finished: `${day(-2)}T10:00` })).out, "awaiting gate 2"));
});

// --- evidence ---------------------------------------------------------------

test("accepts evidence that names only its brief", () => {
  const { out, code } = lint(brief("B-001"), source(), evidence("E-B001-1-01", { brief: "B-001" }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("rejects evidence with neither brief nor domain nor idea", () => {
  const { out } = lint(source(), evidence("E-ING-20261006-01"));
  assert.ok(hasError(out, "evidence without brief, domain or idea"), out);
});

test("rejects an evidence id outside the three patterns", () => {
  const { out } = lint(brief("B-001"), source(), evidence("E-B001-R-01", { brief: "B-001" }));
  assert.ok(hasError(out, 'invalid evidence id "E-B001-R-01"'), out);
});

test("accepts critic evidence on a domain", () => {
  const { out, code } = lint(domain("D-001"), source(), evidence("E-D001-C-01", { domain: "D-001" }));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

// --- reports and the critique rule -------------------------------------------

test("a primer needs no critique", () => {
  const { out, code } = lint(domain("D-001"), report("R-001", "D-001", "primer"));
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("a domain report without a critique is an error", () => {
  const { out } = lint(domain("D-001"), report("R-001", "D-001", "domain"));
  assert.ok(hasError(out, "no critique for D-001"), out);
});

test("a domain report whose critique is older than the newest reviewed brief is an error", () => {
  const { out } = lint(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(0) }),
    critique("D-001", { created: day(-2), updated: day(-2) }),
    report("R-001", "D-001", "domain"),
  );
  assert.ok(hasError(out, "older than the newest reviewed brief"), out);
});

test("a domain report with a fresh critique passes", () => {
  const { out, code } = lint(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(-1) }),
    critique("D-001"),
    report("R-001", "D-001", "domain"),
  );
  assert.deepEqual(errors(out), []);
  assert.equal(code, 0);
});

test("a final report whose critique is older than the analysis is an error", () => {
  const { out } = lint(
    idea("I-001"),
    analysis("I-001", { updated: day(0) }),
    critique("I-001", { created: day(-1), updated: day(-1) }),
    report("R-001", "I-001", "final"),
  );
  assert.ok(hasError(out, "older than the analysis"), out);
});

test("rejects an unknown report type and a report on a missing target", () => {
  const { out } = lint(domain("D-001"), report("R-001", "D-001", "screen"), report("R-002", "I-009", "primer"));
  assert.ok(hasError(out, 'invalid type "screen"'), out);
  assert.ok(hasError(out, "unknown target I-009"), out);
});

// --- ids and links ------------------------------------------------------------

test("rejects duplicate ids and broken links", () => {
  const { out } = lint(domain("D-001"), ["wiki/domains/D-001-y.md", domain("D-001")[1]], topic("T-x", { domains: ["D-007"] }));
  assert.ok(hasError(out, "duplicate id D-001"), out);
  assert.ok(hasError(out, "broken link [[D-007]]"), out);
});

// --- fix --------------------------------------------------------------------

test("--fix fills the derived lists on a domain and an idea", () => {
  const root = makeWiki(
    domain("D-001"), idea("I-001", { domain: "D-001" }),
    brief("B-001", { domain: "D-001", layer: "demand" }), brief("B-002", { idea: "I-001", layer: "economics" }),
    report("R-001", "D-001", "primer"),
  );
  const { out, code } = run("lint.mjs", root, ["--fix"]);
  assert.equal(code, 0, out);
  const d = readFileSync(join(root, "wiki/domains/D-001-x.md"), "utf8");
  assert.match(d, /^briefs: \[B-001\]$/m);
  assert.match(d, /^candidates: \[I-001\]$/m);
  assert.match(d, /^reports: \[R-001\]$/m);
  assert.match(readFileSync(join(root, "wiki/ideas/I-001-x.md"), "utf8"), /^briefs: \[B-002\]$/m);
  assert.match(out, /FIXED {3}wiki\/domains\/D-001-x.md: briefs/);
});

test("--fix adds the missing contradicts back-link and marks stale topics", () => {
  const root = makeWiki(
    brief("B-001"), source(),
    evidence("E-B001-1-01", { brief: "B-001", contradicts: ["E-B001-1-02"] }),
    evidence("E-B001-1-02", { brief: "B-001" }),
    topic("T-old", { updated: day(-61) }),
  );
  const { out } = run("lint.mjs", root, ["--fix"]);
  assert.match(readFileSync(join(root, "wiki/evidence/E-B001-1-02.md"), "utf8"), /^contradicts: \[E-B001-1-01\]$/m);
  assert.match(readFileSync(join(root, "wiki/topics/T-old.md"), "utf8"), /^status: stale$/m);
  assert.ok(!hasWarning(out, "does not link back"), out);
});

test("without --fix the missing back-link is only a warning", () => {
  const { out, code } = lint(
    brief("B-001"), source(),
    evidence("E-B001-1-01", { brief: "B-001", contradicts: ["E-B001-1-02"] }),
    evidence("E-B001-1-02", { brief: "B-001" }),
  );
  assert.ok(hasWarning(out, "does not link back"), out);
  assert.equal(code, 0);
});
```

- [ ] **Step 4: Run the tests to verify they fail**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/lint.test.mjs 2>&1 | tail -4`
Expected: `# fail` greater than 0 (the old lint knows nothing about domains).

- [ ] **Step 5: Rewrite `scripts/lint.mjs`**

```js
#!/usr/bin/env node
// Wiki integrity check. Exit 1 on errors. Warnings never fail.
// `--fix` first rewrites derived fields (briefs / candidates / reports lists on domains
// and ideas, stale topics, contradicts back-links), then checks the result.
import { writeFileSync } from "node:fs";
import { loadWiki, normaliseUrl, under } from "./_lib.mjs";

const FIX = process.argv.includes("--fix");
const DOMAIN_STATUS = ["active", "paused", "closed"];
const DOMAIN_PHASE = ["intro", "map", "focus", "candidates"];
const CHECKPOINT = ["running", "ready"];
const LAYERS = ["fundamentals", "demand", "models", "signals", "entry"];
const WORKSTREAMS = ["demand", "competition", "complexity", "economics", "entry"];
const IDEA_STAGE = ["active", "validation", "parked", "killed"];
const DECISION = ["advance", "park", "kill"];
const BRIEF_STATUS = ["draft", "approved", "running", "collected"];
const RUN_STAGE = ["queued", "scouts", "verify", "checked", "digest"];
const REPORT_TYPE = ["primer", "domain", "final"];
const GRADES = ["A", "B", "C", "D"];
const E_TYPES = ["fact", "statistic", "estimate", "opinion", "anecdote", "absence"];
const ACCESS = ["direct", "archive", "secondary", "blocked"];
const CONF = ["high", "medium", "low"];
const VERIF = ["ok", "inexact", "failed", "unreachable"];
const TOPIC_STATUS = ["active", "stale"];
const E_ID = /^E-(B\d{3}-\d+-\d{2}|[DI]\d{3}-C-\d{2}|ING-\d{8}-\d{2})$/;
const DAY = 86400e3;
const date = v => (v ? Date.parse(String(v).slice(0, 10)) : NaN);
const sorted = a => [...new Set(a ?? [])].sort();
const same = (a, b) => JSON.stringify(sorted(a)) === JSON.stringify(sorted(b));

// --- --fix: derived fields only ---------------------------------------------------
const fixes = [];
function setLine(p, key, line) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const text = re.test(p.text) ? p.text.replace(re, line) : p.text.replace(/^(id:.*)$/m, `$1\n${line}`);
  if (text === p.text) return;
  writeFileSync(p.path, text);
  p.text = text;
  fixes.push(`${p.rel}: ${key}`);
}
function setList(p, key, arr) {
  p.fm[key] = sorted(arr);
  setLine(p, key, `${key}: [${p.fm[key].join(", ")}]`);
}
function applyFixes(pages) {
  const domains = under(pages, "domains"), ideas = under(pages, "ideas"), briefs = under(pages, "briefs");
  const reports = under(pages, "reports"), topics = under(pages, "topics"), evidence = under(pages, "evidence");
  const ids = (list, pick) => list.filter(pick).map(p => p.fm.id);
  for (const d of domains) {
    const want = {
      briefs: ids(briefs, b => b.fm.domain === d.fm.id),
      candidates: ids(ideas, i => i.fm.domain === d.fm.id),
      reports: ids(reports, r => r.fm.target === d.fm.id),
    };
    for (const [k, v] of Object.entries(want)) if (!same(d.fm[k], v)) setList(d, k, v);
  }
  for (const i of ideas) {
    const want = { briefs: ids(briefs, b => b.fm.idea === i.fm.id), reports: ids(reports, r => r.fm.target === i.fm.id) };
    for (const [k, v] of Object.entries(want)) if (!same(i.fm[k], v)) setList(i, k, v);
  }
  for (const t of topics) {
    if (t.fm.status === "active" && t.fm.updated && Date.now() - date(t.fm.updated) > 60 * DAY) setLine(t, "status", "status: stale");
  }
  const byId = new Map(evidence.map(e => [e.fm.id, e]));
  for (const e of evidence) for (const c of e.fm.contradicts ?? []) {
    const other = byId.get(c);
    if (other && !(other.fm.contradicts ?? []).includes(e.fm.id)) setList(other, "contradicts", [...(other.fm.contradicts ?? []), e.fm.id]);
  }
}

let pages = loadWiki();
if (FIX) { applyFixes(pages); pages = loadWiki(); }

// --- checks -------------------------------------------------------------------------
const errors = [], warnings = [];
const err = (p, m) => errors.push(`${p.rel}: ${m}`);
const warn = (p, m) => warnings.push(`${p.rel}: ${m}`);
const domains = under(pages, "domains"), ideas = under(pages, "ideas"), briefs = under(pages, "briefs");
const evidence = under(pages, "evidence"), sources = under(pages, "sources"), topics = under(pages, "topics");
const reports = under(pages, "reports"), critiques = under(pages, "critique"), analyses = under(pages, "analysis");
const byId = new Map(), referenced = new Set(), sourceUrls = new Map(), blockedSources = new Set(), briefStatus = new Map();
const isA = (id, dir) => byId.get(id)?.rel.startsWith(`wiki/${dir}/`) === true;

function checkConfidence(p, keys) {
  for (const k of keys) {
    const c = p.fm.confidence?.[k];
    if (c === undefined) err(p, `confidence missing ${k}`);
    else if (c !== null && !CONF.includes(c)) err(p, `invalid confidence.${k} "${c}"`);
  }
}
// Rule 4: a domain or final report needs a critique newer than the material it covers.
function critiqueFresh(p) {
  const crit = critiques.find(c => c.fm.target === p.fm.target);
  if (!crit) return err(p, `no critique for ${p.fm.target} (wiki/critique/${p.fm.target}-critique.md)`);
  const critDate = date(crit.fm.updated ?? crit.fm.created);
  if (p.fm.type === "domain") {
    const newest = Math.max(-Infinity, ...briefs.filter(b => b.fm.domain === p.fm.target && b.fm.reviewed).map(b => date(b.fm.reviewed)));
    if (Number.isFinite(newest) && critDate < newest) err(p, `critique for ${p.fm.target} is older than the newest reviewed brief`);
  } else {
    const an = analyses.find(a => a.fm.idea === p.fm.target);
    if (an && critDate < date(an.fm.updated ?? an.fm.created)) err(p, `critique for ${p.fm.target} is older than the analysis`);
  }
}

for (const p of pages) {
  if (/wiki\/(index|open-questions)\.md$/.test(p.rel)) continue;
  if (!p.fm) { err(p, "no frontmatter"); continue; }
  if (p.fm.id) {
    if (byId.has(p.fm.id)) err(p, `duplicate id ${p.fm.id} (also ${byId.get(p.fm.id).rel})`);
    byId.set(p.fm.id, p);
  }
  for (const m of p.text.matchAll(/\[\[([A-Z]-[A-Za-z0-9-]+)\]\]/g)) referenced.add(m[1]);

  if (p.rel.startsWith("wiki/domains/")) {
    if (!/^D-\d{3}$/.test(String(p.fm.id))) err(p, `invalid domain id "${p.fm.id}"`);
    else if (!p.rel.startsWith(`wiki/domains/${p.fm.id}-`)) err(p, `file name must start with ${p.fm.id}-`);
    if (!p.fm.title) err(p, "missing title");
    if (!DOMAIN_STATUS.includes(p.fm.status)) err(p, `invalid status "${p.fm.status}"`);
    if (!DOMAIN_PHASE.includes(p.fm.phase)) err(p, `invalid phase "${p.fm.phase}"`);
    if (p.fm.checkpoint != null && !CHECKPOINT.includes(p.fm.checkpoint)) err(p, `invalid checkpoint "${p.fm.checkpoint}"`);
    checkConfidence(p, LAYERS);
    if (p.fm.status === "active" && !p.fm.owner) err(p, "active domain without owner");
    if (p.fm.status === "active" && p.fm.updated && Date.now() - date(p.fm.updated) > 14 * DAY) warn(p, "active domain not updated for 14+ days");
  }
  if (p.rel.startsWith("wiki/ideas/")) {
    if (!/^I-\d{3}$/.test(String(p.fm.id))) err(p, `invalid idea id "${p.fm.id}"`);
    if (!p.fm.title) err(p, "missing title");
    if (!IDEA_STAGE.includes(p.fm.stage)) err(p, `invalid stage "${p.fm.stage}"`);
    if (p.fm.decision != null && !DECISION.includes(p.fm.decision)) err(p, `invalid decision "${p.fm.decision}"`);
    if (p.fm.checkpoint != null && !CHECKPOINT.includes(p.fm.checkpoint)) err(p, `invalid checkpoint "${p.fm.checkpoint}"`);
    checkConfidence(p, WORKSTREAMS);
  }
  if (p.rel.startsWith("wiki/briefs/")) {
    if (!BRIEF_STATUS.includes(p.fm.status)) err(p, `invalid status "${p.fm.status}"`);
    if (!p.fm.question) err(p, "missing question");
    if (p.fm.id) briefStatus.set(p.fm.id, p.fm.status);
    if (p.fm.run_stage != null && !RUN_STAGE.includes(p.fm.run_stage)) err(p, `invalid run_stage "${p.fm.run_stage}"`);
    if (p.fm.status === "running" && p.fm.run_stage == null) err(p, "running brief without run_stage");
    if (p.fm.status !== "draft" && !p.fm.author) err(p, "brief past gate 1 without author");
    if (p.fm.layer != null) {
      const allowed = p.fm.idea != null ? WORKSTREAMS : LAYERS;
      if (!allowed.includes(p.fm.layer)) err(p, `invalid layer "${p.fm.layer}" for ${p.fm.idea != null ? "an idea" : "a domain"} brief`);
    } else if (p.fm.domain != null || p.fm.idea != null) warn(p, "brief under a domain or idea without layer");
    const since = p.fm.run_finished ?? p.fm.run_started;
    if (p.fm.status === "collected" && p.fm.reviewed == null && p.fm.run_stage == null && since && Date.now() - date(since) > 7 * DAY)
      warn(p, `awaiting gate 2 for 7+ days: /review ${p.fm.id}`);
  }
  if (p.rel.startsWith("wiki/evidence/")) {
    const required = p.fm.type === "absence" ? ["claim", "type", "confidence"] : ["claim", "source", "type", "confidence"];
    for (const k of required) if (p.fm[k] == null || p.fm[k] === "") err(p, `missing ${k}`);
    if (!E_ID.test(String(p.fm.id))) err(p, `invalid evidence id "${p.fm.id}"`);
    if (p.fm.brief == null && p.fm.domain == null && p.fm.idea == null) err(p, "evidence without brief, domain or idea");
    if (p.fm.type === "absence" && !/##\s*Метод пошуку/.test(p.body)) err(p, "absence without ## Метод пошуку");
    if (!E_TYPES.includes(p.fm.type)) err(p, `invalid type "${p.fm.type}"`);
    if (!CONF.includes(p.fm.confidence)) err(p, `invalid confidence "${p.fm.confidence}"`);
    if (p.fm.verification != null && !VERIF.includes(p.fm.verification)) err(p, `invalid verification "${p.fm.verification}"`);
    if (p.fm.type === "estimate" && !/##\s*Метод/.test(p.body)) warn(p, "estimate without ## Метод");
    if (typeof p.fm.claim === "string" && p.fm.claim.split(/\s+/).length > 30) warn(p, "claim longer than 30 words");
    if (!p.fm.date_of_info) warn(p, "missing date_of_info");
    if (["C", "D"].includes(p.fm.source_grade) && p.fm.confidence === "high") warn(p, "high confidence on C/D source");
    for (const c of p.fm.contradicts ?? []) referenced.add(c);
    if (typeof p.fm.source === "string") referenced.add(p.fm.source);
  }
  if (p.rel.startsWith("wiki/sources/")) {
    for (const k of ["url", "title", "accessed"]) if (!p.fm[k]) err(p, `missing ${k}`);
    if (!GRADES.includes(p.fm.grade)) err(p, `invalid grade "${p.fm.grade}"`);
    if (p.fm.accessed_via != null && !ACCESS.includes(p.fm.accessed_via)) err(p, `invalid accessed_via "${p.fm.accessed_via}"`);
    if (p.fm.accessed_via === "blocked") blockedSources.add(p.fm.id);
    if (p.fm.url) {
      const n = normaliseUrl(p.fm.url);
      if (sourceUrls.has(n)) err(p, `duplicate source url (also ${sourceUrls.get(n).rel})`);
      sourceUrls.set(n, p);
    }
    if (!p.fm.published || /невідомо/i.test(String(p.fm.published))) warn(p, "undated source");
  }
  if (p.rel.startsWith("wiki/topics/")) {
    if (!/^T-[a-z0-9-]+$/.test(String(p.fm.id))) err(p, `invalid topic id "${p.fm.id}"`);
    if (!p.fm.title) err(p, "missing title");
    if (!p.fm.updated) err(p, "missing updated");
    if (!TOPIC_STATUS.includes(p.fm.status)) err(p, `invalid status "${p.fm.status}"`);
    else if (p.fm.updated && Date.now() - date(p.fm.updated) > 60 * DAY && p.fm.status !== "stale") warn(p, "not updated for 60+ days; lint --fix marks it stale");
    for (const d of p.fm.domains ?? []) referenced.add(d);
  }
  if (p.rel.startsWith("wiki/critique/")) {
    if (!p.fm.target) err(p, "missing target");
    else if (!p.rel.endsWith(`/${p.fm.target}-critique.md`)) err(p, `file name must be ${p.fm.target}-critique.md`);
    if (!p.fm.created) err(p, "missing created");
  }
  if (p.rel.startsWith("wiki/analysis/")) {
    if (!p.fm.idea) err(p, "missing idea");
    else if (!p.rel.endsWith(`/${p.fm.idea}-analysis.md`)) err(p, `file name must be ${p.fm.idea}-analysis.md`);
  }
  if (p.rel.startsWith("wiki/reports/")) {
    if (!p.fm.target) err(p, "missing target");
    if (!REPORT_TYPE.includes(p.fm.type)) err(p, `invalid type "${p.fm.type}"`);
    if (!CONF.includes(p.fm.confidence)) err(p, `invalid confidence "${p.fm.confidence}"`);
    if (p.fm.target && p.fm.type !== "primer" && REPORT_TYPE.includes(p.fm.type)) critiqueFresh(p);
    const untagged = p.body.split("\n").filter(l => /^[^#|>\-\s].{40,}$/.test(l) && !/\[\[E-/.test(l) && !/доказів не знайдено/i.test(l));
    if (untagged.length) warn(p, `${untagged.length} long sentence(s) without evidence tag`);
  }
}

// --- cross-page checks --------------------------------------------------------------
for (const ref of referenced) {
  if (!byId.has(ref)) {
    const owners = pages.filter(p => p.text.includes(`[[${ref}]]`) || p.fm?.source === ref || (p.fm?.contradicts ?? []).includes(ref) || (p.fm?.domains ?? []).includes(ref)).map(p => p.rel);
    errors.push(`broken link [[${ref}]] in ${owners.join(", ")}`);
  }
}
for (const p of [...ideas, ...briefs, ...evidence]) {
  if (p.fm.domain != null && !isA(p.fm.domain, "domains")) err(p, `unknown domain ${p.fm.domain}`);
  if (p.fm.idea != null && !isA(p.fm.idea, "ideas")) err(p, `unknown idea ${p.fm.idea}`);
}
for (const p of evidence) if (p.fm.brief != null && !isA(p.fm.brief, "briefs")) err(p, `unknown brief ${p.fm.brief}`);
for (const p of [...critiques, ...reports]) if (p.fm.target && !byId.has(p.fm.target)) err(p, `unknown target ${p.fm.target}`);
for (const p of analyses) if (p.fm.idea && !isA(p.fm.idea, "ideas")) err(p, `unknown idea ${p.fm.idea}`);
// Orphan evidence: nothing links to it and it names no domain or idea
for (const p of evidence) if (!referenced.has(p.fm.id) && p.fm.domain == null && p.fm.idea == null) warn(p, "orphan evidence (not linked from any page, no domain or idea)");
// Accumulation: a collected brief with evidence must be folded into topic pages; numeric claims verified
const topicText = topics.map(t => t.text).join("\n");
for (const [bid, st] of briefStatus) {
  if (st !== "collected") continue;
  const prefix = "E-" + bid.replace("-", "") + "-";
  const b = byId.get(bid);
  if (b && evidence.some(e => String(e.fm.id).startsWith(prefix)) && !topicText.includes("[[" + prefix))
    warn(b, `collected brief not folded into any topic page (no [[${prefix}…]] under wiki/topics/)`);
}
for (const p of evidence) {
  if (briefStatus.get(p.fm.brief) === "collected" && p.fm.type !== "absence" && /\d/.test(String(p.fm.claim)) && p.fm.verification == null) warn(p, "numeric claim not verified");
  if (typeof p.fm.source === "string" && blockedSources.has(p.fm.source)) warn(p, `rests on a blocked source ${p.fm.source}`);
  for (const c of p.fm.contradicts ?? []) {
    const other = byId.get(c);
    if (other && !(other.fm.contradicts ?? []).includes(p.fm.id)) warn(p, `contradicts ${c} but ${c} does not link back (lint --fix adds it)`);
  }
}

for (const f of fixes) console.log("FIXED   " + f);
for (const e of errors) console.log("ERROR   " + e);
for (const w of warnings) console.log("WARNING " + w);
console.log(`\nlint: ${errors.length} error(s), ${warnings.length} warning(s), ${pages.length} page(s)${FIX ? `, ${fixes.length} fix(es)` : ""}`);
process.exit(errors.length ? 1 : 0);
```

- [ ] **Step 6: Run the lint tests and the real lint**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/lint.test.mjs 2>&1 | tail -4 && node scripts/lint.mjs | tail -1`
Expected: `# fail 0`; `lint: 0 error(s), 0 warning(s), 0 page(s)`.

The old `status.test.mjs` will fail now (it imports `plan` from helpers); Task 6 replaces it. Run only `lint.test.mjs`, `templates.test.mjs` and `now.test.mjs` here.

- [ ] **Step 7: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add scripts/_lib.mjs scripts/lint.mjs scripts/tests/helpers.mjs scripts/tests/lint.test.mjs && git commit -q -m "$(cat <<'EOF'
feat(lint): domain schema, critique rule, --fix for derived fields

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 5: Generated index

**Files:**
- Create: `scripts/index.mjs`
- Test: `scripts/tests/index.test.mjs`

**Interfaces:**
- Consumes: `under`, `loadWiki`, `ROOT` from `_lib.mjs`; fixtures from `helpers.mjs`.
- Produces: `node scripts/index.mjs` rewrites `wiki/index.md` and prints one line `index: n domains · n ideas · n briefs · n topics · n reports`. Playbooks call it after every commit-worthy step.

- [ ] **Step 1: Write the failing test**

Create `scripts/tests/index.test.mjs`:
```js
// Run: node scripts/tests/index.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { makeWiki, run, domain, idea, brief, topic, report } from "./helpers.mjs";

test("index.mjs writes wiki/index.md with domains, ideas, topics, briefs and reports", () => {
  const root = makeWiki(
    domain("D-001", { title: "Local LLM", phase: "map", confidence: { fundamentals: "high", demand: null, models: "low", signals: null, entry: null } }),
    idea("I-001", { domain: "D-001" }),
    brief("B-001", { domain: "D-001", layer: "demand" }),
    topic("T-x"),
    report("R-001", "D-001", "primer"),
  );
  const { out, code } = run("index.mjs", root);
  assert.equal(code, 0, out);
  const index = readFileSync(join(root, "wiki/index.md"), "utf8");
  assert.match(index, /\| \[\[D-001\]\] \| Local LLM \| карта \| editor \| H · – · L · – · – \|/);
  assert.match(index, /\| \[\[I-001\]\] \| Idea I-001 \| в роботі \| \[\[D-001\]\] \|/);
  assert.match(index, /\[\[T-x\]\]/);
  assert.match(index, /\[\[B-001\]\]/);
  assert.match(index, /\[\[R-001\]\] \| \[\[D-001\]\] \| конспект/);
  assert.match(out, /index: 1 domains · 1 ideas · 1 briefs · 1 topics · 1 reports/);
});

test("index.mjs on an empty wiki writes the placeholders", () => {
  const root = makeWiki();
  const { code } = run("index.mjs", root);
  assert.equal(code, 0);
  assert.match(readFileSync(join(root, "wiki/index.md"), "utf8"), /_\(напрямів поки немає\)_/);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/index.test.mjs 2>&1 | tail -4`
Expected: `# fail 2` (script missing).

- [ ] **Step 3: Write `scripts/index.mjs`**

```js
#!/usr/bin/env node
// Rewrites wiki/index.md from frontmatter. Never edit the index by hand.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadWiki, under, ROOT } from "./_lib.mjs";

const pages = loadWiki();
const domains = under(pages, "domains"), ideas = under(pages, "ideas"), briefs = under(pages, "briefs");
const topics = under(pages, "topics"), reports = under(pages, "reports");
const evidence = under(pages, "evidence"), sources = under(pages, "sources");
const LAYERS = ["fundamentals", "demand", "models", "signals", "entry"];
const SHORT = { high: "H", medium: "M", low: "L" };
const PHASE = { intro: "вступ", map: "карта", focus: "фокус", candidates: "кандидати" };
const STAGE = { active: "в роботі", validation: "validation", parked: "parked", killed: "killed" };
const REPORT = { primer: "конспект", domain: "стан напряму", final: "фінальний" };
const link = id => `[[${id}]]`;
const byUpdated = (a, b) => String(b.fm.updated ?? b.fm.created ?? "").localeCompare(String(a.fm.updated ?? a.fm.created ?? ""));
const count = (list, key) => { const o = {}; for (const p of list) { const k = p.fm[key] ?? "—"; o[k] = (o[k] ?? 0) + 1; } return o; };
const fmt = o => Object.entries(o).sort().map(([k, v]) => `${k} ${v}`).join(" · ") || "—";

const out = ["# Індекс wiki", "", "_(Генерує `node scripts/index.mjs`. Не редагуйте руками — перезапишеться.)_", ""];

out.push("## Напрями", "");
if (!domains.length) out.push("_(напрямів поки немає)_");
else {
  out.push("| ID | Назва | Фаза | Власник | Впевненість (основи · попит · моделі · сигнали · вхід) | Briefs | Оновлено |", "|---|---|---|---|---|---|---|");
  for (const d of [...domains].sort(byUpdated)) {
    const conf = LAYERS.map(l => SHORT[d.fm.confidence?.[l]] ?? "–").join(" · ");
    const phase = `${PHASE[d.fm.phase] ?? d.fm.phase}${d.fm.status !== "active" ? ` (${d.fm.status})` : ""}`;
    out.push(`| ${link(d.fm.id)} | ${d.fm.title ?? ""} | ${phase} | ${d.fm.owner ?? ""} | ${conf} | ${(d.fm.briefs ?? []).length} | ${d.fm.updated ?? ""} |`);
  }
}

out.push("", "## Ідеї", "");
if (!ideas.length) out.push("_(ідей поки немає)_");
else {
  out.push("| ID | Назва | Стадія | Напрям | Бал | Оновлено |", "|---|---|---|---|---|---|");
  for (const i of [...ideas].sort(byUpdated))
    out.push(`| ${link(i.fm.id)} | ${i.fm.title ?? ""} | ${STAGE[i.fm.stage] ?? i.fm.stage} | ${i.fm.domain ? link(i.fm.domain) : "—"} | ${i.fm.total ?? "—"} | ${i.fm.updated ?? ""} |`);
}

out.push("", "## Теми", "");
if (!topics.length) out.push("_(тем поки немає)_");
else {
  out.push("| ID | Назва | Оновлено | Briefs |", "|---|---|---|---|");
  for (const t of [...topics].sort(byUpdated))
    out.push(`| ${link(t.fm.id)} | ${t.fm.title ?? ""} | ${t.fm.updated ?? ""}${t.fm.status === "stale" ? " (stale)" : ""} | ${(t.fm.briefs ?? []).map(link).join(", ")} |`);
}

out.push("", "## Відкриті briefs", "");
const open = briefs.filter(b => !(b.fm.status === "collected" && b.fm.reviewed));
if (!open.length) out.push("_(немає)_");
else {
  out.push("| ID | Питання | Статус | Напрям / ідея |", "|---|---|---|---|");
  for (const b of open)
    out.push(`| ${link(b.fm.id)} | ${b.fm.question ?? ""} | ${b.fm.status}${b.fm.run_stage ? ` · ${b.fm.run_stage}` : ""} | ${[b.fm.domain, b.fm.idea].filter(Boolean).map(link).join(", ") || "—"} |`);
}

out.push("", "## Останні звіти", "");
if (!reports.length) out.push("_(немає)_");
else {
  out.push("| ID | Ціль | Тип | Впевненість | Дата |", "|---|---|---|---|---|");
  const recent = [...reports].sort((a, b) => String(b.fm.created).localeCompare(String(a.fm.created))).slice(0, 10);
  for (const r of recent) out.push(`| ${link(r.fm.id)} | ${link(r.fm.target)} | ${REPORT[r.fm.type] ?? r.fm.type} | ${r.fm.confidence ?? ""} | ${r.fm.created ?? ""} |`);
}

const absence = evidence.filter(e => e.fm.type === "absence").length;
out.push("", "## Статистика", "",
  `Доказів: ${evidence.length} (за grade джерела: ${fmt(count(evidence.filter(e => e.fm.type !== "absence"), "source_grade"))}; absence ${absence}) · ` +
  `Джерел: ${sources.length} (${fmt(count(sources, "grade"))}) · Напрямів: ${domains.length} · Ідей: ${ideas.length} · Тем: ${topics.length} · Звітів: ${reports.length}`);

writeFileSync(join(ROOT, "wiki", "index.md"), out.join("\n") + "\n");
console.log(`index: ${domains.length} domains · ${ideas.length} ideas · ${briefs.length} briefs · ${topics.length} topics · ${reports.length} reports`);
```

- [ ] **Step 4: Run the test, then regenerate the real index**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/index.test.mjs 2>&1 | tail -4 && node scripts/index.mjs && head -8 wiki/index.md`
Expected: `# fail 0`; `index: 0 domains · 0 ideas · 0 briefs · 0 topics · 0 reports`; the placeholder line in the file.

- [ ] **Step 5: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add scripts/index.mjs scripts/tests/index.test.mjs wiki/index.md && git commit -q -m "$(cat <<'EOF'
feat(index): generated wiki index

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 6: Pipeline status for domains and ideas

**Files:**
- Rewrite: `scripts/status.mjs`
- Rewrite: `scripts/tests/status.test.mjs`

**Interfaces:**
- Produces: `node scripts/status.mjs [--waiting]` with blocks `## Waiting on you`, `## Running`, `## Domains`, `## Ideas`, `## Briefs`, `## Reports`, `## Counts`. The waiting lines use the exact wording below; the review playbook turns them into Ukrainian sentences.

- [ ] **Step 1: Rewrite `scripts/tests/status.test.mjs` (failing tests)**

```js
// Run: node scripts/tests/status.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { makeWiki, run, day, stamp, domain, idea, brief, evidence, source } from "./helpers.mjs";

const status = (...entries) => run("status.mjs", makeWiki(...entries));
const waiting = (...entries) => run("status.mjs", makeWiki(...entries), ["--waiting"]);

test("an empty wiki reports nothing waiting and nothing running", () => {
  const { out, code } = status();
  assert.equal(code, 0, out);
  assert.match(out, /## Waiting on you\nnothing is waiting/);
  assert.match(out, /## Running\nnothing is running/);
  assert.match(out, /## Domains\nnone/);
});

test("lists the stops and gates that wait on the user", () => {
  const { out } = waiting(
    brief("B-001"),
    brief("B-002", { status: "running", run_stage: "checked", run_started: stamp(30), domain: "D-001", layer: "demand" }),
    brief("B-003", { status: "collected", run_finished: `${day(-1)}T10:00` }),
    domain("D-001", { checkpoint: "ready", phase: "map" }),
    idea("I-001", { checkpoint: "ready" }),
  );
  assert.match(out, /gate 1: B-001 \[draft\]/);
  assert.match(out, /stop after collection: B-002 \(D-001\) collected and verified → \/review B-002/);
  assert.match(out, /gate 2: B-003 collected \d{4}-\d{2}-\d{2} → \/review B-003/);
  assert.match(out, /phase stop: D-001 \(map\) → \/review D-001/);
  assert.match(out, /gate 3: I-001 → \/review I-001/);
  assert.doesNotMatch(out, /## Running/);
});

test("shows a running brief with elapsed time and progress", () => {
  const body = "\n## Підпитання\n### 1. A\n### 2. B\n";
  const { out } = status(
    brief("B-001", { status: "running", run_stage: "verify", run_started: stamp(12) }, body),
    source(), evidence("E-B001-1-01", { brief: "B-001", verification: "ok" }),
  );
  assert.match(out, /B-001 \[verify\] 1[1-3] min · evidence 1\/2 sq · verified 1\/2 sq/);
});

test("flags a brief that has been running for over three hours", () => {
  const { out } = status(brief("B-001", { status: "running", run_stage: "scouts", run_started: stamp(200) }));
  assert.match(out, /possibly interrupted: \/research B-001/);
});

test("shows the domain line with phase, week, confidence, queue and checkpoint", () => {
  const body = "\n### 1. Основи\n- **Черга питань:**\n  1. [ ] a\n  2. [ ] b\n  3. [x] done\n";
  const { out } = status(domain("D-001", {
    title: "Local LLM", phase: "intro", created: day(-10), target: day(60), checkpoint: "running",
    confidence: { fundamentals: "medium", demand: null, models: null, signals: null, entry: null },
  }, body));
  assert.match(out, /D-001 Local LLM \[active\] phase intro · week 2 of 10 · fundamentals: medium · demand: — · models: — · signals: — · entry: — · queue 2 · briefs 0 · checkpoint running/);
  assert.match(out, /D-001 phase stop running \(writer primer\)/);
});

test("shows briefs with their next step in words", () => {
  const { out } = status(brief("B-001", { status: "approved" }), brief("B-002", { status: "collected", reviewed: day(0) }));
  assert.match(out, /B-001 \[approved\] .* → next: start or resume: \/research B-001/);
  assert.match(out, /B-002 \[collected\] .* → next: reviewed/);
});

test("prints the first open questions", () => {
  const { out } = waiting(["wiki/open-questions.md", "# Open\n\n- [ ] D-001: who pays?\n- [x] closed\n"]);
  assert.match(out, /questions \(1\):\n- \[ \] D-001: who pays\?/);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/status.test.mjs 2>&1 | tail -4`
Expected: failures (the old script prints `## Plans` and knows no domains).

- [ ] **Step 3: Rewrite `scripts/status.mjs`**

```js
#!/usr/bin/env node
// Pipeline state for /review and /explore. `--waiting` prints only what waits on the user.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { loadWiki, under, ROOT } from "./_lib.mjs";

const onlyWaiting = process.argv.includes("--waiting");
const pages = loadWiki();
const domains = under(pages, "domains"), ideas = under(pages, "ideas"), briefs = under(pages, "briefs");
const evidence = under(pages, "evidence"), sources = under(pages, "sources"), topics = under(pages, "topics");
const reports = under(pages, "reports");
const LAYERS = ["fundamentals", "demand", "models", "signals", "entry"];
const WORKSTREAMS = ["demand", "competition", "complexity", "economics", "entry"];
const CHAIN = ["scouts", "verify", "digest"];
const DAY = 86400e3;
const inChain = b => CHAIN.includes(b.fm.run_stage);
const short = (s, n = 90) => { s = String(s ?? ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; };
const tag = b => b.fm.idea ? ` (${b.fm.idea})` : b.fm.domain ? ` (${b.fm.domain})` : "";
const queue = p => (p.body.match(/^\s*(?:\d+\.|-)\s+\[ \]/gm) ?? []).length;
const conf = (p, keys) => keys.map(k => `${k}: ${p.fm.confidence?.[k] ?? "—"}`).join(" · ");

// --- Waiting on you: stops and gates --------------------------------------------------
const waiting = [];
for (const b of briefs) if (b.fm.status === "draft") waiting.push(`gate 1: ${b.fm.id} [draft] ${short(b.fm.question)} → approve or edit the brief`);
for (const b of briefs) if (b.fm.run_stage === "checked") waiting.push(`stop after collection: ${b.fm.id}${tag(b)} collected and verified → /review ${b.fm.id}`);
for (const b of briefs) {
  if (b.fm.status !== "collected" || b.fm.reviewed != null || b.fm.run_stage != null) continue;
  const since = String(b.fm.run_finished ?? b.fm.run_started ?? "?").slice(0, 10);
  waiting.push(`gate 2: ${b.fm.id}${tag(b)} collected ${since} → /review ${b.fm.id}`);
}
for (const d of domains) if (d.fm.checkpoint === "ready") waiting.push(`phase stop: ${d.fm.id} (${d.fm.phase}) → /review ${d.fm.id}`);
for (const i of ideas) if (i.fm.checkpoint === "ready") waiting.push(`gate 3: ${i.fm.id} → /review ${i.fm.id}`);
const oq = join(ROOT, "wiki", "open-questions.md");
const open = existsSync(oq) ? readFileSync(oq, "utf8").split("\n").filter(l => l.startsWith("- [ ]")) : [];

console.log("## Waiting on you");
if (!waiting.length && !open.length) console.log("nothing is waiting");
waiting.forEach(l => console.log(l));
if (open.length) { console.log(`questions (${open.length}):`); open.slice(0, 5).forEach(l => console.log(l)); }
if (onlyWaiting) process.exit(0);

// --- Running: background chains -------------------------------------------------------
const needsCheck = e => e.fm.type !== "absence" && /\d/.test(String(e.fm.claim));
function progress(b) {
  const sqs = new Set([...b.body.matchAll(/^### (\d+)\. /gm)].map(m => m[1]));
  const prefix = "E-" + b.fm.id.replace("-", "") + "-";
  const bySq = new Map();
  for (const e of evidence) {
    if (!String(e.fm.id).startsWith(prefix)) continue;
    const sq = e.fm.id.slice(prefix.length).split("-")[0];
    if (!bySq.has(sq)) bySq.set(sq, []);
    bySq.get(sq).push(e);
  }
  const covered = [...sqs].filter(s => bySq.has(s));
  const verified = covered.filter(s => bySq.get(s).every(e => !needsCheck(e) || e.fm.verification != null));
  return `evidence ${covered.length}/${sqs.size} sq · verified ${verified.length}/${sqs.size} sq`;
}
console.log("\n## Running");
const running = [];
for (const b of briefs.filter(inChain)) {
  const mins = b.fm.run_started ? Math.round((Date.now() - Date.parse(b.fm.run_started)) / 60000) : null;
  const stale = mins != null && mins > 180 ? ` · possibly interrupted: /research ${b.fm.id}` : "";
  running.push(`${b.fm.id} [${b.fm.run_stage}] ${mins ?? "?"} min · ${progress(b)}${tag(b)}${stale}`);
}
for (const b of briefs.filter(b => b.fm.run_stage === "queued")) running.push(`${b.fm.id} [queued] starts when a running brief finishes`);
for (const d of domains) if (d.fm.checkpoint === "running") running.push(`${d.fm.id} phase stop running (${d.fm.phase === "intro" ? "writer primer" : "critic → writer"})`);
for (const i of ideas) if (i.fm.checkpoint === "running") running.push(`${i.fm.id} synthesis running (writer analysis → critic → writer final)`);
console.log(running.length ? running.join("\n") : "nothing is running");

// --- Domains ----------------------------------------------------------------------------
console.log("\n## Domains");
const live = domains.filter(d => d.fm.status !== "closed");
if (!live.length) console.log("none");
for (const d of live) {
  const start = Date.parse(d.fm.created), target = Date.parse(d.fm.target);
  const wk = Number.isFinite(start) ? Math.floor((Date.now() - start) / (7 * DAY)) + 1 : "?";
  const week = Number.isFinite(start) && Number.isFinite(target) ? `week ${wk} of ${Math.max(1, Math.ceil((target - start) / (7 * DAY)))}` : `week ${wk}`;
  const cp = d.fm.checkpoint ? ` · checkpoint ${d.fm.checkpoint}` : "";
  console.log(`${d.fm.id} ${d.fm.title ?? ""} [${d.fm.status}] phase ${d.fm.phase} · ${week} · ${conf(d, LAYERS)} · queue ${queue(d)} · briefs ${(d.fm.briefs ?? []).length}${cp}`);
}

// --- Ideas ------------------------------------------------------------------------------
console.log("\n## Ideas");
if (!ideas.length) console.log("none");
for (const i of ideas.filter(i => !["parked", "killed"].includes(i.fm.stage))) {
  const cp = i.fm.checkpoint ? ` · checkpoint ${i.fm.checkpoint}` : "";
  console.log(`${i.fm.id} ${i.fm.title ?? ""} [${i.fm.stage}]${i.fm.domain ? ` ${i.fm.domain}` : ""} · ${conf(i, WORKSTREAMS)} · queue ${queue(i)} · total ${i.fm.total ?? "—"}${cp}`);
}
for (const st of ["parked", "killed"]) {
  const list = ideas.filter(i => i.fm.stage === st);
  if (list.length) console.log(`${st}: ` + list.map(i => `${i.fm.id} ${i.fm.title ?? ""}`).join(" · "));
}

// --- Briefs -----------------------------------------------------------------------------
function next(b) {
  const { status, run_stage, reviewed, id } = b.fm;
  if (status === "draft") return "approve or edit (gate 1)";
  if (status === "approved") return run_stage === "queued" ? "queued" : `start or resume: /research ${id}`;
  if (run_stage === "checked") return `/review ${id}`;
  if (status === "running") return "running";
  if (status === "collected") return reviewed == null ? `/review ${id}` : "reviewed";
  return "—";
}
console.log("\n## Briefs");
if (!briefs.length) console.log("none");
for (const b of briefs) console.log(`${b.fm.id} [${b.fm.status}] ${short(b.fm.question, 110)} → next: ${next(b)}${tag(b)}`);

// --- Reports and counts -----------------------------------------------------------------
console.log("\n## Reports");
if (!reports.length) console.log("none");
for (const r of reports.slice(-5)) console.log(`${r.fm.id} → ${r.fm.target} (${r.fm.type}, ${r.fm.confidence})`);
const grades = {}; for (const s of sources) grades[s.fm.grade] = (grades[s.fm.grade] ?? 0) + 1;
console.log(`\n## Counts\nevidence ${evidence.length} · sources ${sources.length} ${JSON.stringify(grades)} · domains ${domains.length} · ideas ${ideas.length} · topics ${topics.length} (stale ${topics.filter(t => t.fm.status === "stale").length})`);
```

- [ ] **Step 4: Run all script tests**

Run: `cd /Users/valentindmitruk/research-system && for t in scripts/tests/*.test.mjs; do echo "== $t"; node "$t" 2>&1 | grep -E "^# (pass|fail)"; done && node scripts/status.mjs | head -3`
Expected: every file `# fail 0`; status prints `## Waiting on you` then `nothing is waiting`.

- [ ] **Step 5: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add scripts/status.mjs scripts/tests/status.test.mjs && git commit -q -m "$(cat <<'EOF'
feat(status): domains, phase stops and idea checkpoints replace plans

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 7: Critique gate hook and settings

**Files:**
- Rename + rewrite: `scripts/hooks/redteam-gate.mjs` → `scripts/hooks/critique-gate.mjs`
- Test: `scripts/tests/critique-gate.test.mjs`
- Modify: `.claude/settings.json`

**Interfaces:**
- Consumes: `ROOT`, `loadWiki` from `_lib.mjs` (so `RESEARCH_ROOT` works in tests); `run(script, root, args, input)` from `helpers.mjs`.
- Produces: the PreToolUse hook `node "$CLAUDE_PROJECT_DIR"/scripts/hooks/critique-gate.mjs`, exit 2 blocks the write with a message on stderr.

- [ ] **Step 1: Write the failing test**

Create `scripts/tests/critique-gate.test.mjs`:
```js
// Run: node scripts/tests/critique-gate.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { makeWiki, run, day, domain, idea, brief, critique, analysis } from "./helpers.mjs";

const gate = (root, rel, text) => run("hooks/critique-gate.mjs", root, [],
  JSON.stringify({ tool_name: "Write", tool_input: { file_path: join(root, rel), content: text } }));
const report = (target, type) => `---\nid: R-001\ntarget: ${target}\ntype: ${type}\nauthor: writer\ncreated: ${day(0)}\n---\n# x\n`;

test("ignores writes outside wiki/reports", () => {
  const root = makeWiki();
  assert.equal(gate(root, "wiki/briefs/B-001-x.md", "---\nid: B-001\n---\n").code, 0);
});

test("lets a primer through without a critique", () => {
  const root = makeWiki(domain("D-001"));
  assert.equal(gate(root, "wiki/reports/R-001-x.md", report("D-001", "primer")).code, 0);
});

test("blocks a domain report without a critique", () => {
  const root = makeWiki(domain("D-001"));
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("D-001", "domain"));
  assert.equal(code, 2);
  assert.match(out, /critique-gate: wiki\/critique\/D-001-critique.md is missing/);
});

test("blocks a domain report whose critique is older than the newest reviewed brief", () => {
  const root = makeWiki(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(0) }),
    critique("D-001", { created: day(-3), updated: day(-3) }),
  );
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("D-001", "domain"));
  assert.equal(code, 2);
  assert.match(out, /older than the newest reviewed brief/);
});

test("lets a domain report through with a fresh critique", () => {
  const root = makeWiki(
    domain("D-001"),
    brief("B-001", { domain: "D-001", layer: "demand", status: "collected", reviewed: day(-1) }),
    critique("D-001"),
  );
  assert.equal(gate(root, "wiki/reports/R-001-x.md", report("D-001", "domain")).code, 0);
});

test("blocks a final report whose critique is older than the analysis", () => {
  const root = makeWiki(idea("I-001"), analysis("I-001", { updated: day(0) }), critique("I-001", { created: day(-1), updated: day(-1) }));
  const { code, out } = gate(root, "wiki/reports/R-001-x.md", report("I-001", "final"));
  assert.equal(code, 2);
  assert.match(out, /older than the analysis/);
});

test("blocks a report without target or with an unknown type", () => {
  const root = makeWiki(domain("D-001"));
  assert.equal(gate(root, "wiki/reports/R-001-x.md", "---\nid: R-001\ntype: domain\n---\n").code, 2);
  assert.equal(gate(root, "wiki/reports/R-001-x.md", report("D-001", "screen")).code, 2);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd /Users/valentindmitruk/research-system && node scripts/tests/critique-gate.test.mjs 2>&1 | tail -4`
Expected: `# fail 7` (script missing).

- [ ] **Step 3: Write the hook**

```bash
cd /Users/valentindmitruk/research-system && git mv scripts/hooks/redteam-gate.mjs scripts/hooks/critique-gate.mjs
```
Then replace its content with:
```js
#!/usr/bin/env node
// PreToolUse hook (Write|Edit): a report of type `domain` or `final` needs a critique
// newer than the material it covers (AGENTS.md rule 4). Mirrors the lint rule.
// Exit 0 = allow, exit 2 = block (stderr is shown to the model).
import { readFileSync, existsSync } from "node:fs";
import { resolve, relative } from "node:path";
import { ROOT, loadWiki } from "../_lib.mjs";

let data = {};
try { data = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch {}
const ti = data.tool_input ?? {};
const fp = ti.file_path ?? ti.path ?? "";
if (!fp) process.exit(0);
const abs = resolve(ROOT, fp);
const rel = relative(ROOT, abs).replace(/\\/g, "/");
if (!rel.startsWith("wiki/reports/") || !rel.endsWith(".md")) process.exit(0);

let text = typeof ti.content === "string" ? ti.content : "";
if (!text && existsSync(abs)) text = readFileSync(abs, "utf8");
const field = k => (new RegExp(`^${k}:\\s*(\\S+)`, "m").exec(text) ?? [])[1];
const target = field("target"), type = field("type");
const block = m => { console.error(`critique-gate: ${m}`); process.exit(2); };
if (!target) block("no `target:` in the report frontmatter — add it before writing the report.");
if (!type) block("no `type:` in the report frontmatter — primer | domain | final.");
if (type === "primer") process.exit(0);
if (type !== "domain" && type !== "final") block(`unknown report type "${type}" — primer | domain | final.`);

const pages = loadWiki();
const crit = pages.find(p => p.rel === `wiki/critique/${target}-critique.md` && p.fm);
if (!crit) block(`wiki/critique/${target}-critique.md is missing — run the critic (attack ${target}) before writing a ${type} report (AGENTS.md rule 4).`);
const date = v => (v ? Date.parse(String(v).slice(0, 10)) : NaN);
const critDate = date(crit.fm.updated ?? crit.fm.created);
if (type === "domain") {
  const reviewed = pages.filter(p => p.rel.startsWith("wiki/briefs/") && p.fm?.domain === target && p.fm.reviewed).map(p => date(p.fm.reviewed));
  const newest = Math.max(-Infinity, ...reviewed);
  if (Number.isFinite(newest) && critDate < newest) block(`critique for ${target} is older than the newest reviewed brief — re-run the critic first.`);
} else {
  const an = pages.find(p => p.rel === `wiki/analysis/${target}-analysis.md` && p.fm);
  if (an && critDate < date(an.fm.updated ?? an.fm.created)) block(`critique for ${target} is older than the analysis — re-run the critic first.`);
}
process.exit(0);
```

- [ ] **Step 4: Point `.claude/settings.json` at the new hook**

Replace the file with:
```json
{
  "permissions": {
    "allow": [
      "WebSearch",
      "WebFetch",
      "Edit(wiki/**)",
      "Edit(raw/**)",
      "Edit(docs/**)",
      "Bash(node scripts/:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)"
    ]
  },
  "env": {
    "CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH": "1"
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR\"/scripts/hooks/critique-gate.mjs"
          }
        ]
      }
    ]
  }
}
```

- [ ] **Step 5: Run the hook tests and the whole suite**

Run: `cd /Users/valentindmitruk/research-system && for t in scripts/tests/*.test.mjs; do echo "== $t"; node "$t" 2>&1 | grep -E "^# (pass|fail)"; done`
Expected: every file `# fail 0`.

- [ ] **Step 6: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add -A scripts/hooks scripts/tests/critique-gate.test.mjs .claude/settings.json && git commit -q -m "$(cat <<'EOF'
feat(hooks): critique gate replaces the red-team gate

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 8: The three agents

**Files:**
- Create: `agents/scout.md`, `agents/critic.md`, `agents/writer.md`
- Create: `.claude/agents/scout.md`, `.claude/agents/critic.md`, `.claude/agents/writer.md` (symlinks, or copies via `scripts/sync-adapters.mjs` if Task 2 chose the fallback)
- Delete: `.claude/agents/{analyst,librarian,red-team,research-lead,scout,verifier,writer}.md`

**Interfaces:**
- Consumes: old bodies via `git show v0-test-base:.claude/agents/<name>.md`; templates from Task 3; lint messages from Task 4.
- Produces: subagent types `scout`, `critic`, `writer` with the task-prompt grammar the playbooks (Task 9) use: scout — the Delegation block of AGENTS.md; critic — `verify B-### <sq> <today>` or `verify <E-IDs…> <today>` or `attack D-###|I-###`; writer — `primer D-### R-###`, `analysis I-###`, `report D-### R-###`, `report I-### R-###`.

- [ ] **Step 1: Write `agents/scout.md`**

Frontmatter:
```yaml
---
name: scout
description: Researches ONE sub-question from a brief. Searches the web, reads sources, writes evidence and source pages to the wiki, returns only IDs and one-line claims. Spawn one per sub-question, in parallel, always in the background.
tools: WebSearch, WebFetch, Read, Write, Glob, Grep, Bash
model: opus
color: blue
---
```
Body: start from `git show v0-test-base:.claude/agents/scout.md` (everything after its frontmatter) and apply exactly these changes:
1. Procedure step 1 becomes: "Read `docs/context.md`, the brief page named in your task including its section «Що вже є у wiki», and the domain or idea page the brief names in `domain:` / `idea:` — its layers say what is already known. Read every topic page named there (`wiki/topics/T-*.md`) and Grep `wiki/topics/`, `wiki/evidence/` and `wiki/sources/` for your key terms. Evidence that already exists is cited by ID in your return and in new pages' `## Контекст`; it is never re-collected. Read `wiki/open-questions.md`."
2. Procedure step 4, the list of fields to fill: replace `ideas` with `brief`, and add the sentence "`domain:` and `idea:` may stay `null`: they are derived from the brief."
3. Every "CLAUDE.md" becomes "AGENTS.md"; "verifier" becomes "the critic (mode verify)".
4. Rules: the never-write list becomes "`wiki/domains/`, `wiki/ideas/`, `wiki/briefs/`, `wiki/reports/`, `wiki/critique/`, `docs/`."
5. Return format gains one optional line after «Для інших скаутів»: `Для конспекту: S-… — <why this source is the best primer>` (only when the brief's `layer` is `fundamentals`; up to 3 sources).
Everything else — quote rules, grading, raw copies, absence pages, blocked fetches, budget, write-as-you-go — is kept verbatim.

- [ ] **Step 2: Write `agents/critic.md`**

Frontmatter:
```yaml
---
name: critic
description: The checker. Mode verify checks the evidence pages of one sub-question (or a list of IDs) against their sources, right after each scout. Mode attack tries to kill a domain map or an idea in a clean context, audits evidence, spot-checks sources and writes the critique page. Never reads reports. Always in the background.
tools: Read, Glob, Grep, WebFetch, WebSearch, Edit, Write, Bash
model: inherit
color: red
---
```
Body skeleton, in this order:

```markdown
You are the critic. Your task prompt names a mode and a target:
`verify B-### <sq> <today>`, `verify <E-ID> <E-ID> … <today>`, or `attack D-###` / `attack I-###`.
You never read `wiki/reports/`. You do not collect evidence for its own sake and you do
not judge whether an idea is good: you check (verify) and you attack (attack).

## Mode verify
<the old `.claude/agents/verifier.md` body (`git show v0-test-base:.claude/agents/verifier.md`): sections Input, Procedure 1–5, Rules, Return — verbatim, with three edits: "CLAUDE.md" → "AGENTS.md"; the rule "You are not the red team …" → "In this mode you are not attacking: no opinion on the domain or idea, no search for missing perspectives."; the never-edit list gains `wiki/domains/` and `wiki/critique/`.>

## Mode attack
Input: the target ID. Read the target page, the digests of every brief whose `domain:`
or `idea:` is the target, every evidence page they cite, `wiki/analysis/<I-###>-analysis.md`
for an idea, and the «Кандидати» table for a domain.

### Procedure for a domain (sections of `templates/critique-domain.md`)
1. **Where the money claims are weakest.** For each claim about who pays and how much:
   the evidence behind it, its grade, what is missing.
2. **Evidence audit by layer.** Per layer: pages, how many rest on C/D sources, vendor
   claims presented as facts, pages you would downgrade and why.
3. **Spot-check.** Pick 5 evidence pages — prefer the biggest numbers and pages that
   verify mode marked `ok`: you are checking that work too. Fetch the sources, verify
   the claims: ✅ підтверджено / ⚠️ неточно / ❌ не підтверджено. Fill `spotcheck:`.
   List separately every page where you disagree with the recorded `verification`.
4. **Who is missing.** Incumbents, regulators, the customer's option of doing nothing,
   substitutes, adjacent players who could add this as a feature.
5. **Signals: money or press.** For each trend in layer 4: evidence of money moving
   (contracts, revenue, funding with terms) versus press and vendor announcements.
6. **Candidates** (when the table is non-empty): per candidate the strongest objection,
   the one fact that would kill it, how to check it within a week.
7. **What the map does not cover.** Questions the layers never asked.
8. **One fact that would change the picture most.**

### Procedure for an idea (sections of `templates/critique-idea.md`)
1. **Pre-mortem.** It is 18 months later and the idea failed. The three most likely
   post-mortems, each with the evidence (or missing evidence) that already points to it.
2. **Evidence audit.** For every evidence page: is the claim supported by the quoted
   source? Dated within the window that matters? Grade C/D dressed as fact? List every
   page you would downgrade and why.
3. **Spot-check.** As for a domain.
4. **Missing perspectives.** As step 4 for a domain.
5. **Kill criteria.** 2–4 concrete facts which, if true, should kill the idea, and how
   to check each within a week.
6. **Assumption attack.** Take the analysis' two most sensitive assumptions; argue the
   pessimistic end and say what would prove you right.
7. **One fact that would change the picture most.**

### Output
`wiki/critique/<target>-critique.md` from the matching template, Ukrainian; keep
`created` from the first version, set `updated: <today>`. Every objection references
evidence IDs or states explicitly that no evidence exists. New sources you read become
source pages (as a scout would write them) and evidence pages `E-<target>-C-<nn>` with
`domain:` or `idea:` set and `brief: null`. Never write anywhere else.

### Return (≤ 10 lines, Ukrainian)
Path written; top 3 objections, one line each; number of pages you would downgrade;
spot-check tally (✅/⚠️/❌); the single fact that would most change the picture.
```

- [ ] **Step 3: Write `agents/writer.md`**

Frontmatter:
```yaml
---
name: writer
description: Writes from the wiki only, with no web access — the primer of a domain, the analysis of an idea, the state-of-domain report at a phase stop, the final report of an idea. Every factual sentence carries evidence IDs. Refuses when its precondition (a reviewed brief, a fresh critique) is not met. Always in the background.
tools: Read, Glob, Grep, Write, Bash
model: opus
color: purple
---
```
Body skeleton:

```markdown
You are the writer. You turn what is already in the wiki into something the user can
read in ten minutes. You have no web access on purpose: if it is not in the wiki, it is
not in your text. Your task prompt names the output and the target, and for reports the
report ID: `primer D-### R-###`, `analysis I-###`, `report D-### R-###`, `report I-### R-###`.

## Outputs and preconditions
| Task | Precondition (check first; refuse with one line if unmet) | Template | Writes |
|---|---|---|---|
| `primer D-###` | the intro brief of D-### (`layer: fundamentals`) has `reviewed` | `templates/primer.md` | `wiki/reports/R-###-<slug>.md`, `type: primer` |
| `analysis I-###` | at least one reviewed brief of I-### or of its domain | `templates/analysis.md` | `wiki/analysis/I-###-analysis.md` |
| `report D-###` | `wiki/critique/D-###-critique.md` exists and its `updated` ≥ the newest `reviewed` among briefs of D-### | `templates/report-domain.md` | `wiki/reports/…`, `type: domain` |
| `report I-###` | `wiki/critique/I-###-critique.md` exists and its `updated` ≥ `updated` of `wiki/analysis/I-###-analysis.md` | `templates/report-final.md` | `wiki/reports/…`, `type: final` |
Refusal line: "Передумову не виконано: <what is missing> — не пишу."

## Procedure: primer
1. Read the domain page, the intro brief's digest, every evidence page of that brief,
   the source pages the scouts marked «для конспекту», the topic pages in `domains:`.
2. Fill `templates/primer.md` in order, for a reader new to the field. Every factual
   sentence ends with evidence IDs in brackets; numbers as ranges where sources differ,
   with both IDs. «Чого ми ще не знаємо» from the digest's gaps and absence pages. «Що
   читати далі»: ≤ 8 sources, grade A/B first, one line why each.
3. `confidence` = the lowest grade among the central claims; `confidence_set_by: grade доказів`.

## Procedure: analysis
<the old `.claude/agents/analyst.md` body (`git show v0-test-base:.claude/agents/analyst.md`): Input and Produce steps 1–6, with these edits: the opening paragraph loses "You may search the web …" and gains "You have no web access: a gap stays a gap, written as «невідомо» with a line in `wiki/open-questions.md` (`- [ ] I-###: …`)."; the plan references become the idea card («Напрями роботи», «Kill-критерії», the hypothesis); step 6 «Основа для плану MVP» is always filled; `author: writer`.>

## Procedure: report D-### (type domain)
Read the domain page, the digests of all its briefs, the critique, the evidence. Fill
`templates/report-domain.md`: the per-layer table with the headline claim, confidence
and IDs; «Де гроші» from layer 3 and the critique's money section; «Що слабке»
reproduces the critic's objections in their strength, not softened; «Кого немає»;
«Кандидати» only from the domain page's table, with the critic's objection per row
(delete the section before the focus phase); open questions; the next research step,
never a decision. `confidence` = the lowest of the evidence grade on the central claims
and the spot-check result; `confidence_set_by` names which.

## Procedure: report I-### (type final)
<the old `.claude/agents/writer.md` Procedure steps 1–8 (`git show v0-test-base:.claude/agents/writer.md`) with these edits: "red-team page" → "critique page"; «Контраргументи (red team)» → «Контраргументи (критик)»; step 8: the MVP scope is the hypothesis on the idea card (there is no plan page); the rows come from the analysis' «Основа для плану MVP».>

## Rules
- Ukrainian; short paragraphs; tables for scores; no marketing adjectives.
- Never introduce a fact, number or competitor that has no page in the wiki. A sentence
  you cannot tag is removed or becomes «доказів не знайдено».
- Write only under `wiki/reports/` and `wiki/analysis/`; append to
  `wiki/open-questions.md` only from the analysis. Set `author: writer`, `created`,
  `briefs:` (the briefs you used), `target`, `type`.

## Return (≤ 5 lines, Ukrainian)
Path written; the headline (three sentences for a final report, one for the others);
the stated confidence and what set it; for the analysis, the rows left as «невідомо».
```

- [ ] **Step 4: Replace the old agent files with symlinks**

```bash
cd /Users/valentindmitruk/research-system && git rm -q .claude/agents/analyst.md .claude/agents/librarian.md .claude/agents/red-team.md .claude/agents/research-lead.md .claude/agents/scout.md .claude/agents/verifier.md .claude/agents/writer.md && for a in scout critic writer; do ln -s ../../agents/$a.md .claude/agents/$a.md; done && ls -l .claude/agents
```
(Fallback from Task 2: `node scripts/sync-adapters.mjs` instead of the `ln -s` loop.)
Expected: exactly three entries, each `-> ../../agents/<name>.md`.

- [ ] **Step 5: Verify the role files**

Run:
```bash
cd /Users/valentindmitruk/research-system && node -e '
import("./scripts/_lib.mjs").then(({ parseFrontmatter }) => {
  const fs = require("fs");
  for (const [f, model] of [["scout","opus"],["critic","inherit"],["writer","opus"]]) {
    const { fm } = parseFrontmatter(fs.readFileSync(`.claude/agents/${f}.md`, "utf8"));
    if (fm.name !== f || fm.model !== model || !fm.tools || !fm.description) { console.error("bad frontmatter: " + f); process.exit(1); }
  }
  console.log("agents ok");
});' && ! grep -l "CLAUDE.md\|librarian\|red team\|red-team" agents/*.md
```
Expected: `agents ok` and no file names from grep (exit code of the negated grep is 0).

- [ ] **Step 6: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add -A agents .claude/agents && git commit -q -m "$(cat <<'EOF'
feat(agents): scout, critic and writer; adapters as symlinks

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```
If Task 2 chose the fallback, replace "adapters as symlinks" with "adapters via sync script".

---

### Task 9: Playbooks and the four commands

**Files:**
- Create: `playbooks/explore.md`, `playbooks/research.md`, `playbooks/checkpoint.md`, `playbooks/ingest.md`, `playbooks/decide.md`, `playbooks/review.md`
- Create: `.claude/skills/{explore,research,decide,review}/SKILL.md` (symlinks or copies)
- Delete: `.claude/skills/{decide,ingest,lint,plan,red-team,report,research,review,run,screen,status}/`

**Interfaces:**
- Consumes: agent task grammar from Task 8; script outputs from Tasks 4–7; templates from Task 3.
- Produces: the step numbers other playbooks cross-reference (research steps 1–9; checkpoint chains; review cases). Keep the numbering exactly as written here.

- [ ] **Step 1: Write `playbooks/research.md`**

```markdown
---
name: research
description: One question from brief to reviewed evidence — write the brief, gate 1, then the background run with two stops (after collection and verification, after the digest). With a brief ID, resume an interrupted run or reopen its stop.
argument-hint: '"<question>" [D-### | I-###] | B-###'
disable-model-invocation: true
---

Argument: $ARGUMENTS — a question (optionally with a domain or idea ID), or a brief ID.

Common rules are in AGENTS.md (Agents and delegation, Stop format). The brief's
frontmatter is the state of the run: every transition updates `run_stage` and appends
one line to `## Журнал прогону` (`- <yyyy-mm-dd hh:mm> · <stage> · <what happened>`,
Ukrainian; time from `node scripts/now.mjs`). While a stage is going, never summarise
unverified findings.

## New question
1. Read the domain or idea page (if given), the topic pages it names, and Grep
   `wiki/briefs`, `wiki/evidence`, `wiki/topics` for the key terms. Fill «Що вже є у
   wiki» with topic pages and evidence IDs to reuse. If the question is already
   answered there, say so and propose to reuse or extend instead.
2. If the question is ambiguous about scope, geography, horizon or the decision it
   serves, ask at most 3 clarifying questions with AskUserQuestion. Allocate
   `node scripts/next-id.mjs B` and write `wiki/briefs/B-###-<slug>.md` from
   `templates/brief.md`: the question in one sentence; «Навіщо»; «Що змінило б
   рішення» (2–4 facts); 3–7 independent sub-questions, each with IN, OUT (naming the
   sibling that covers it), sources to try first, expected evidence type, kill-capable
   ones first; budget; «Критерії успіху». Set `domain`, `idea`, `layer`, `author`,
   `status: draft`.
3. **Stop, gate 1.** Show the brief in ≤ 12 lines (question, what would change the
   decision, sub-question titles, budget). Ask: затвердити / змінити підпитання /
   звузити / стоп. On approval: `status: approved`, `approved: <today>`, commit
   `brief(B-###): <slug>`, and continue to step 4 in the same turn.
4. If two other briefs are in a chain (`run_stage` in scouts, verify, checked, digest),
   set `run_stage: queued`, tell the user which brief it waits for, and stop. Otherwise
   set `status: running`, `run_stage: scouts`, `run_started`, log. Spawn one `scout` per
   sub-question, all in this turn, all in the background; each task prompt follows the
   Delegation block of AGENTS.md and names the evidence prefix `E-<brief>-<sq>-`. Tell
   the user what started (brief, number of scouts, what each looks for, 5–15 minutes per
   scout plus verification) and that the next stop is after collection and
   verification. End the turn.
5. **A scout finished** → spawn `critic` with `verify B-### <sq> <today>` at once, in
   the background; do not wait for the other scouts. On the first verify set
   `run_stage: verify`, log. A scout that stopped without a report: resume it once with
   SendMessage, telling it to write pages from what it has already read and then
   report; if it still returns nothing, log it and spawn verify only if evidence pages
   exist. Between notifications say nothing unless asked; then answer from
   `node scripts/status.mjs` (stage, elapsed time, sub-questions covered).
6. **All scouts and all verifies finished → stop after collection.** Set
   `run_stage: checked`, log. Report in ≤ 12 lines: evidence per sub-question with
   grades; the verification tally and every failed or downgraded page with the reason;
   2–3 headline findings in words; scouts that did not finish; what comes next (lint,
   index, digest, topics, ≈ 5–10 minutes). Ask: продовжити до digest / перезапустити
   скаута № / додати підпитання / стоп. End the turn and wait.
   - продовжити → step 7.
   - перезапустити / додати → write the sub-question(s) into the brief under
     `## Доповнюючі підпитання (<date>)`, get a one-word confirmation,
     `run_stage: scouts`, log, spawn those scouts; the chain returns to this stop.
   - стоп → leave `run_stage: checked`; `/review B-###` reopens it.
7. **Tail** — one brief at a time: if another brief is at `run_stage: digest`, wait for
   it to reach `collected`. Set `run_stage: digest`, log. Run `node scripts/lint.mjs --fix`
   and fix any error yourself; run `node scripts/index.mjs`. Write `## Digest` in the
   brief, Ukrainian: per sub-question 3–5 key findings with evidence IDs and grades;
   the verification tally and every downgraded page; contradictions (pairs, what
   differs); gaps; scouts that did not finish; the scouts' leads for other scouts;
   budget used. Fold the new knowledge into `wiki/topics/`: update or create topic
   pages from `templates/topic.md` (claims with IDs and grades, contradictions,
   unknowns, `updated:`, the brief in `briefs:`, the domain in `domains:`); list them in
   the brief's «Що вже є у wiki». Set `status: collected`, `run_stage: null`,
   `run_finished`, log. Commit `run(B-###): <n> evidence, <m> sources, <k> topics`.
8. **Stop after the digest, gate 2** — right away, in this turn: the digest headline in
   ≤ 12 lines (key findings per sub-question with grades, verification tally and
   downgrades, contradictions, gaps). Ask: далі / копати глибше в підпитання № /
   додати підпитання / стоп. The user must see what was found without opening a file.
9. On далі: `reviewed: <today>`. Update the domain layer or idea workstream the brief
   belongs to: «Що знаємо» (claims with IDs), «Впевненість» with a one-sentence reason
   and the matching `confidence` key in the frontmatter, tick the queue items this
   brief answered, append new queue items from the digest's gaps and leads (origin
   `digest B-###`), add human-only items to «Потрібно від редактора», set `updated:`,
   add a `## Лог` line. Run `node scripts/lint.mjs --fix` and `node scripts/index.mjs`.
   Commit `review(B-###): gate 2`. `git push` (the permission prompt is the user's
   confirmation). If a brief has `run_stage: queued`, start the oldest from step 4 and
   say so. Then say in one sentence what comes next for the domain or idea.
   - копати глибше / додати підпитання → as in step 6; the chain runs for the new
     sub-questions only and `reviewed` goes back to `null`.
   - стоп → change nothing.

## Brief ID given
- `status: draft` → gate 1 (step 3).
- `status: approved`, `run_stage` null or `queued` → start from step 4.
- `run_stage: checked` → repeat the stop after collection (step 6).
- `status: collected`, `reviewed` null → repeat gate 2 (step 8).
- `status: running`, any other stage → **resume**: for each sub-question check whether
  evidence pages `E-<brief>-<sq>-*` exist and whether their `verification:` is filled.
  Spawn scouts only for sub-questions without evidence and verifies only for
  sub-questions with unverified evidence, then continue from the matching step. Log
  "відновлено".
```

- [ ] **Step 2: Write `playbooks/explore.md`**

```markdown
---
name: explore
description: The long track of a domain or an idea. A new domain — questions about motive and boundaries, the domain page, the intro brief and gate 1. An existing domain or idea — where it stands, what runs, what waits, the next briefs to approve, phase stops. Also plain-word edits of the page.
argument-hint: '"<domain>" | D-### | I-###'
disable-model-invocation: true
---

Argument: $ARGUMENTS — a domain title in quotes, a domain ID, or an idea ID.

The user drives the domain and sets the agenda; you propose, they choose. Everything the
user reads is Ukrainian. Common rules: AGENTS.md. Candidates appear only at the stop
after the focus phase (rule 6).

## New domain (`/explore "<title>"`)
1. Ask up to three questions with AskUserQuestion: why this domain (their words); what
   is in and out of scope (geography, time horizon, adjacent fields); a rough target
   date for reaching candidates (8, 12 or 16 weeks from today, or their own).
2. Allocate `node scripts/next-id.mjs D`; create `wiki/domains/D-###-<slug>.md` from
   `templates/domain.md`: «Чому цей напрям» in the user's words with the date, «Межі»,
   empty layers, the phase table with periods derived from the target date, the log.
   `phase: intro`, `owner` and `author` = the user, `created`, `updated`, `target`.
3. Grep `wiki/topics` for the domain's key terms; write what is already known into
   layer 1 «Що знаємо» with topic and evidence IDs, and add the domain to those topics'
   `domains:`.
4. Write the intro brief by steps 1–2 of `playbooks/research.md` with `domain: D-###`,
   `layer: fundamentals` and 4–6 sub-questions: how the industry works and its value
   chain (who pays whom); size and structure; segments and players; terms and
   technology; what changed in the last five years; where to read (the best primers,
   reports, data sources).
5. Gate 1 by step 3 of `playbooks/research.md`. After approval, commit
   `domain(D-###): created` and start the run (steps 4–9 of research).

## Existing domain (`/explore D-###`)
1. Run `node scripts/status.mjs`. Show ≤ 15 lines: phase and week, per layer the
   confidence and the queue length, what is running, what waits on the user.
2. If something of this domain waits on the user, say so first and open it by
   `playbooks/review.md`. The user may still line up more work.
3. If the phase exit condition holds — intro: the primer is written and the user has
   read it; map: every layer 2–5 has a reviewed brief or a logged «пропустити»; focus:
   the user said «досить» or the focus queues are empty — propose the phase stop in one
   sentence. On yes, follow `playbooks/checkpoint.md`.
4. Otherwise propose 1–3 next briefs by the phase rule: intro — none until the primer;
   map — one broad brief per layer 2–5 without a reviewed brief; focus — from the focus
   queues (segments, specific problems, who tried and what happened, costs, real
   prices); candidates — only idea-level work. For each: layer, the question, why now.
   Ask which to prepare (AskUserQuestion, multiSelect), or take the user's own question
   instead. Skip this step when the domain is `paused`.
5. For each chosen one, write the brief by steps 1–2 of research with `domain:` and
   `layer:`; its sub-questions come from the queue items. Gate 1 for all of them in one
   AskUserQuestion round (per brief: затвердити / змінити / відкласти). Approved
   briefs: `status: approved`, commit `brief(B-###): <slug>`, mark their queue items
   `→ B-###` on the domain page; start each by step 4 of research (at most two at once;
   the rest `queued`).
6. End the turn with the launch notice in plain words (what started, what it gives,
   roughly how long) and name anything that waits on the user.

## Idea (`/explore I-###`)
The same as an existing domain, with workstreams instead of layers and `idea:` on the
briefs. For an idea with no reviewed brief, the first proposal is the quick check
preset: three sub-questions — попит (who has the problem, how they solve it today,
evidence that they pay), конкуренти й альтернативи (direct, indirect, do nothing;
prices seen), здійсненність і відповідність (what it takes to build and launch,
regulation, fit with `docs/context.md`) — ≤ 8 searches and ≤ 6 sources each. Reuse the
domain's evidence through «Що вже є у wiki». When the queues are empty or
`target_decision` is within two weeks, propose synthesis; on yes follow the idea chain
of `playbooks/checkpoint.md`.

## Edits in plain words
"додай питання …", "підніми … нагору", "пропусти шар …", "зміни дату", "пауза",
"продовжуємо": edit the page, add a `## Лог` line, set `updated:`, commit
`domain(D-###): <what>` or `idea(I-###): <what>`. No gate: it is the user's page.
"пауза" → `status: paused`; "продовжуємо" → `status: active`.
```

- [ ] **Step 3: Write `playbooks/checkpoint.md`**

```markdown
---
name: checkpoint
description: The critic-then-writer chain for a domain phase stop or an idea synthesis. Not a command — the lead follows it after the editor's "yes" to a proposed stop, or on words like "синтез", "зроби звіт", "атакуй карту".
---

Target: a domain ID or an idea ID. Entered after the user's "yes" to a proposed phase
stop, or on words like "синтез", "зроби звіт", "атакуй карту", "атакуй ідею".
Precondition: the target has at least one brief with `reviewed`; otherwise say what is
missing and stop. Common rules: AGENTS.md. Report IDs: `node scripts/next-id.mjs R`.
Every spawn is in the background; before each one write `checkpoint: running` and a
log line; after each one tell the user in one sentence what started and end the turn.

## Domain in phase intro
1. `checkpoint: running`, log. Spawn `writer` with `primer D-### R-###`. Say what
   started (a primer of 2–4 pages from the verified pages, ≈ 5–10 minutes). End the turn.
2. Writer finished → `node scripts/lint.mjs --fix`, `node scripts/index.mjs`, commit
   `report(R-###): primer D-###`, `checkpoint: ready`, log.
3. Show the primer in ≤ 12 lines (how it works, scale, players, what changed, what we
   do not know). Ask: карта / змінити межі / закрити.
4. карта → `phase: map`, `checkpoint: null`, log, commit `domain(D-###): phase map`,
   `git push`. змінити межі → edit «Межі» with the user, log, `checkpoint: null`, and
   offer a follow-up brief if the change opens new ground. закрити → `/decide D-### close`.

## Domain in phase map
1. `checkpoint: running`, log. Spawn `critic` with `attack D-###`. Say what started
   (≈ 15–25 minutes). End the turn.
2. Critic finished → spawn `writer` with `report D-### R-###`. One sentence to the user.
3. Writer finished → lint --fix, index, commit `report(R-###): domain D-###`,
   `checkpoint: ready`, log.
4. Show ≤ 12 lines: what we know per layer, where the money is, the critic's three
   strongest objections, the spot-check tally. Ask: фокус на … / ще раунд по шару … /
   змінити межі / закрити.
5. фокус → `/decide D-### focus "<sub-areas>" "<reason>"` (it writes «Фокус», the queue
   items and `phase: focus`), `checkpoint: null`. ще раунд → `checkpoint: null`, phase
   unchanged, continue at step 4 of `/explore D-###`. змінити межі / закрити → as in intro.

## Domain in phase focus or candidates
1. Write or update «Кандидати» on the domain page from the evidence of the map: each
   candidate as хто · проблема · як · за що платять, with ≥ 1 evidence ID about the
   problem and ≥ 1 about who pays; state `запропоновано`. If none can be grounded, write
   that in the log and tell the user; the stop still happens. Commit
   `domain(D-###): candidates`.
2. `checkpoint: running`, log. Spawn `critic` with `attack D-###` (it sees the
   candidates). Say what started. End the turn.
3. Critic finished → spawn `writer` with `report D-### R-###`.
4. Writer finished → lint --fix, index; copy the critic's objection per candidate into
   the «Заперечення критика» column; commit `report(R-###): domain D-###`,
   `checkpoint: ready`, log.
5. Show the candidates with objections in ≤ 12 lines. Ask: promote <n> / drop <n> /
   ще копати / закрити. Each choice goes through `/decide`; `checkpoint: null`.

## Idea (synthesis)
1. `checkpoint: running`, log. Spawn `writer` with `analysis I-###`. Say what started.
   End the turn.
2. Writer finished → spawn `critic` with `attack I-###`.
3. Critic finished → spawn `writer` with `report I-### R-###`.
4. Writer finished → lint --fix, index, commit `report(R-###): final I-###`,
   `checkpoint: ready`, log.
5. **Gate 3.** Show the three-sentence answer, the confidence and what set it, the
   total score, the critic's top risk, the «План MVP» table in brief. Ask: advance /
   park / kill / ще досліджувати. advance, park, kill → `/decide I-### …` with the
   user's reason. ще досліджувати → `checkpoint: null`, nothing recorded, point to
   `/explore I-###`.

## Critique only
On "атакуй карту" / "атакуй ідею": steps 1–2 of the matching chain without the
writer; show the critic's return in the chat; `checkpoint: null`; commit
`critique(<id>): <date>`. No report is written.

If the writer refuses (precondition not met), show its one-line reason and stop with
`checkpoint: null`.
```

- [ ] **Step 4: Write `playbooks/ingest.md`**

```markdown
---
name: ingest
description: A source the editor brings (URL, file, call notes) — raw copy, source page, evidence pages, critic verify, fold into topics and the domain or idea page. Not a command — the lead follows it when the editor shares a source.
---

Trigger: the user gives a URL or a file path, or pastes their own notes from a call or
meeting, and says it is a source — "ось джерело", "поклади в raw", "з розмови з …".
Optional: a domain, idea or brief ID to file the evidence against.

1. Fetch the URL (WebFetch) or read the file. Save a plain-text copy to
   `raw/<yyyy-mm-dd>-<slug>.md` with the header from `raw/README.md` (`url`, `title`,
   `fetched`, `added_by: user`, `source`). Never overwrite an existing raw file; add
   `-2` to the slug.
2. `node scripts/source-id.mjs "<url>"` (for a file or notes: `file://<absolute path>`).
   Create or update the source page from `templates/source.md`; grade it by AGENTS.md
   (the user's own notes: grade B, `type: primary`, `author` = the user).
3. Extract every claim worth keeping — usually 3–10 — as evidence pages from
   `templates/evidence.md`. IDs: `node scripts/next-id.mjs E-ING-<yyyymmdd>`. Fill
   `domain:` / `idea:` / `brief:` when given (`brief: null` otherwise). Contradictions
   with existing evidence → `contradicts:` on both pages.
4. Spawn `critic` with `verify <E-IDs…> <today>` in the background. Tell the user in
   one line: source ID and grade, how many evidence pages, verification running. End
   the turn.
5. Critic finished → fold the verified claims into the relevant topic pages and into
   the domain or idea page («Що знаємо» of the matching layer or workstream, tick the
   queue items they answer, close the matching «Потрібно від редактора» items, set
   `updated:`, add a `## Лог` line). Run `node scripts/lint.mjs --fix` and
   `node scripts/index.mjs`. Commit `ingest(S-<hash8>): <slug>`. Tell the user in ≤ 6
   lines: evidence IDs with one-line claims, the verification tally, any contradiction.
```

- [ ] **Step 5: Write `playbooks/decide.md`**

```markdown
---
name: decide
description: Record a decision — on an idea (advance, park, kill) or on a domain (focus, promote, drop, pause, continue, close) — in the decision log and on the page. The only way docs/decision-log.md is edited.
argument-hint: 'I-### advance|park|kill "<reason>" | D-### focus|promote|drop|pause|continue|close [<n> | "<text>"] "<reason>"'
disable-model-invocation: true
---

Arguments: $ARGUMENTS.

The only way `docs/decision-log.md` is edited. A decision without a one-sentence reason
is not recorded: if the reason is missing, ask for it with AskUserQuestion.

## Idea: `I-### advance|park|kill "<reason>"`
1. Append to `docs/decision-log.md` (newest last):
   ```
   ## <yyyy-mm-dd> · I-### · <advance|park|kill>
   - Хто: <owner>
   - Рішення: <decision> — <reason, the user's words>
   - Стадія до/після: <from> → <to>
   - На основі: [[R-###]] (звіт), бал <total>/5, критик: <top objection, one line>
   - Що б змінило рішення: <copy from the report>
   - Переглянути: <date or condition, for park>
   ```
   Without a report: `На основі: звіту немає — рішення редактора; докази: [[B-###]]`
   and `Що б змінило рішення: визначить дослідження`.
2. Update the idea card: `decision:`, `decided:`, `stage:` (advance → `validation`;
   park → `parked`; kill → `killed`), `checkpoint: null`, `updated:`, a `## Лог` line.
3. Commit `decide(I-###): <decision>`. Run `node scripts/index.mjs`; commit
   `index: after decide(I-###)` if it changed. `git push`. Confirm in one line; no
   commentary on the decision.

## Domain
- `D-### focus "<sub-areas>" "<reason>"`: write «Фокус» (sub-areas, reason, date); add
  queue items for them under the matching layers (origin `редактор`); `phase: focus`,
  `checkpoint: null`.
- `D-### promote <n> "<reason>"`: allocate `node scripts/next-id.mjs I`; create
  `wiki/ideas/I-###-<slug>.md` from `templates/idea.md`: the hypothesis from the
  candidate row, «Звідки ідея» = candidate n of D-###, `domain: D-###`, `owner` = the
  domain's owner, `author` = the user, `stage: active`, kill criteria from the critic's
  objections to this candidate, `created`, `updated`. Set the candidate's state to
  `ідея I-###`. On the first promote: `phase: candidates`. Commit
  `idea(I-###): promoted from D-### candidate n`.
- `D-### drop <n> "<reason>"`: the candidate's state → `відхилено`.
- `D-### pause|continue "<reason>"`: `status: paused` / `status: active`.
- `D-### close "<reason>"`: `status: closed`, `checkpoint: null`.

Each domain action appends
```
## <yyyy-mm-dd> · D-### · <focus|promote|drop|pause|continue|close>
- Хто: <owner>
- Рішення: <action> — <reason, the user's words>
- На основі: [[R-###]] (звіт) або «звіту немає — рішення редактора»; критик: <top objection>
- Що б змінило рішення: <from the report or critique, or —>
```
then sets `updated:` and a `## Лог` line on the domain page, commits
`decide(D-###): <action>`, runs `node scripts/lint.mjs --fix` and `node scripts/index.mjs`,
and does `git push`. Confirm in one line; after a promote add the next step in words
(the idea's quick check through `/explore I-###`).
```

- [ ] **Step 6: Write `playbooks/review.md`**

```markdown
---
name: review
description: Where the pipeline stands and what waits on the editor; with an ID, reopen the stop or gate that waits for that brief, domain or idea. Use when the user asks what waits, or to see or decide on finished work ("показуй B-004", "що чекає на мене").
argument-hint: '[B-### | D-### | I-###]'
---

Argument: $ARGUMENTS — nothing, or a brief, domain or idea ID.

Stops and gates are asked in the chat the moment a stage finishes; this playbook
reopens them later or lists what waits. Nothing moves past a gate without the user's
explicit answer. Everything shown is Ukrainian, in plain words; the stop format is in
AGENTS.md.

## No argument
1. Run `node scripts/status.mjs`. Present ≤ 20 lines in this order: **Чекає на вас** —
   every waiting item as a sentence saying what is there, not only its command; then
   the first 5 open questions. **Біжить** — stage and elapsed time. **Напрями** — phase,
   week, confidence per layer, queue. **Ідеї** by stage. **Brief'и** with the next step
   in words. Then one line of lint (`node scripts/lint.mjs | tail -1`); if it reports
   errors, list up to 10.
2. If nothing waits, say so and name what could run next (`/explore` of the active
   domain, or a new domain).

## B-###
- `run_stage: checked` → the stop after collection: step 6 of `playbooks/research.md`.
- `status: collected`, `reviewed` null, `run_stage` null → gate 2: steps 8–9 of research.
- Already `reviewed` → say when, and ask whether to open it again.
- Any other state → say which (`node scripts/status.mjs`) and stop.

## D-###
- `checkpoint: ready` → the phase stop of `playbooks/checkpoint.md` for the current
  phase: its "show … and ask" step.
- Otherwise → the state of the domain in ≤ 15 lines (step 1 of `/explore D-###`) and
  what waits, if anything.

## I-###
- `checkpoint: ready` → gate 3: step 5 of the idea chain in `playbooks/checkpoint.md`.
- Otherwise → the state of the idea and what waits.

Finish with `git push` when a gate was passed in this call.
```

- [ ] **Step 7: Replace the old skills with the four command symlinks**

```bash
cd /Users/valentindmitruk/research-system && git rm -r -q .claude/skills/decide .claude/skills/ingest .claude/skills/lint .claude/skills/plan .claude/skills/red-team .claude/skills/report .claude/skills/research .claude/skills/review .claude/skills/run .claude/skills/screen .claude/skills/status && for c in explore research decide review; do mkdir -p .claude/skills/$c && ln -s ../../../playbooks/$c.md .claude/skills/$c/SKILL.md; done && ls -l .claude/skills/*/SKILL.md
```
(Fallback from Task 2: `node scripts/sync-adapters.mjs` instead of the `ln -s` loop.)
Expected: four symlinks, each `-> ../../../playbooks/<name>.md`.

- [ ] **Step 8: Verify the playbooks**

Run:
```bash
cd /Users/valentindmitruk/research-system && node -e '
import("./scripts/_lib.mjs").then(({ parseFrontmatter }) => {
  const fs = require("fs");
  for (const n of ["explore","research","decide","review","checkpoint","ingest"]) {
    const { fm } = parseFrontmatter(fs.readFileSync(`playbooks/${n}.md`, "utf8"));
    if (fm.name !== n || !fm.description) { console.error("bad frontmatter: " + n); process.exit(1); }
  }
  for (const c of ["explore","research","decide","review"]) {
    const { fm } = parseFrontmatter(fs.readFileSync(`.claude/skills/${c}/SKILL.md`, "utf8"));
    if (fm.name !== c) { console.error("skill not readable: " + c); process.exit(1); }
  }
  console.log("playbooks ok");
});' && ! grep -l "librarian\|red-team\|\`/run\|\`/plan\|\`/screen\|\`/status\|\`/report\|\`/ingest\|\`/lint" playbooks/*.md
```
Expected: `playbooks ok`; grep prints nothing.

- [ ] **Step 9: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add -A playbooks .claude/skills && git commit -q -m "$(cat <<'EOF'
feat(playbooks): explore, research, checkpoint, ingest, decide, review; four commands

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 10: AGENTS.md and CLAUDE.md

**Files:**
- Create: `AGENTS.md`
- Rewrite: `CLAUDE.md`

**Interfaces:**
- Produces: the rules every playbook and agent cites ("AGENTS.md rule 4", "the Delegation block of AGENTS.md", "Stop format").

- [ ] **Step 1: Write `AGENTS.md`**

```markdown
# Research System — operating rules

You are the **research lead** of a human-in-the-loop research system. The user is the
editor-in-chief. Your job: build the map of a domain the editor names, delegate to the
three agents, keep the wiki accurate, propose the next questions, and STOP at every
gate and stop. The product is the wiki, not the chat. The editor says where the wind
blows; you run the research around it. Ideas are an output of the map, never an input
you invent. You never keep the editor waiting on an agent.

This file is the protocol. Claude Code reads it through `CLAUDE.md`; any other tool or
person running the system reads it directly. Roles live in `agents/`, procedures in
`playbooks/`, page shapes in `templates/`, checks in `scripts/`.

Read first, every session: `docs/vision.md`, `docs/context.md`, `docs/rubric.md`,
`wiki/index.md`, `wiki/open-questions.md`, the domain or idea page the task belongs
to, and the topic pages under `wiki/topics/` that touch it.

## Language
- Instructions, agent prompts, playbooks, frontmatter keys: English.
- Everything the user reads (wiki pages, briefs, evidence, reports, decision log, stop
  texts in the chat): **Ukrainian**. Keep source quotes in the original language. Keep
  domain terms (TAM, churn, CAC, MVP) as-is.

## Non-negotiable rules
1. **Gates and stops.** Three gates: brief approved → evidence reviewed → decision
   recorded. Inside a run two stops: after collection and verification, and after the
   digest (gate 2). A domain has a phase stop after the primer, after the map and after
   the focus; an idea has gate 3 after its final report. At every stop you say in the
   chat, in plain words, what you have and what comes next, then ask with
   `AskUserQuestion` and wait. A chain never runs past a stop on its own. When a stage
   finishes while the editor is away, the work waits (`node scripts/status.mjs` →
   "Waiting on you") and `/review` reopens the stop. Subagents cannot ask the user; only
   you can. A subagent that needs a human answer appends the question to
   `wiki/open-questions.md` and continues with what it can.
2. **Provenance.** Every claim in the wiki links to an evidence page; every evidence
   page links to a source page with URL, publisher, date and grade. A number without a
   source is written as `type: estimate` with the method stated. No exceptions for
   "well-known" facts. Every evidence page carrying a number is checked against its
   source by the critic (mode verify) before the stop after collection; the verdict
   lives on the page (`verification:`).
3. **raw/ is immutable.** Never edit or delete anything under `raw/`. Saved copies of
   sources are written there once, by the ingest playbook or by scouts.
4. **Critique before report.** A report of type `domain` or `final` may not be written
   unless `wiki/critique/<target>-critique.md` exists and is newer than the material it
   covers (the newest reviewed brief of the domain; the analysis of the idea). Lint
   enforces it everywhere; a hook enforces it in Claude Code. A `primer` needs no
   critique: its pages were verified during the run.
5. **Writer never invents.** Missing evidence is written as "доказів не знайдено",
   never as a plausible sentence. The writer has no web access.
6. **No candidates before the focus stop.** Candidate ideas appear on the domain page
   only at the stop after the focus phase, written only by the lead, and only when each
   has at least one evidence page about the problem and one about who pays. Before
   that, when the editor asks "what idea", the answer is the map and the next question.
7. **Contradictions are data.** When sources disagree, keep both evidence pages and
   link them with `contradicts:`. Never average, never pick one silently.
8. **Quotes ≤ 30 words.** Paraphrase; the source page carries the link.
9. **Commit after every step** (`<stage>(<id>): <summary>`). **Push at gates**: at the
   end of `/review`, `/decide`, and after gate 2 of a run, or when the editor asks. Push
   is deliberately not on the allow list; every push goes through the permission prompt
   and the editor confirms it. Never bypass or pre-approve it.
10. **Only `/decide` writes `docs/decision-log.md`.**

## Wiki schema
| Entity | Path | ID | Template |
|---|---|---|---|
| Domain | `wiki/domains/D-###-<slug>.md` | `D-001` | `templates/domain.md` |
| Idea | `wiki/ideas/I-###-<slug>.md` | `I-001` | `templates/idea.md` |
| Brief | `wiki/briefs/B-###-<slug>.md` | `B-001` | `templates/brief.md` |
| Evidence | `wiki/evidence/E-<prefix>-<nn>.md` | `E-B001-2-03`, `E-D001-C-01`, `E-ING-20261006-01` | `templates/evidence.md` |
| Source | `wiki/sources/S-<hash8>.md` | `node scripts/source-id.mjs <url>` | `templates/source.md` |
| Topic | `wiki/topics/T-<slug>.md` | `T-local-llm-hardware` | `templates/topic.md` |
| Critique | `wiki/critique/<D or I>-critique.md` | by target | `templates/critique-domain.md`, `templates/critique-idea.md` |
| Analysis | `wiki/analysis/<I-###>-analysis.md` | by target | `templates/analysis.md` |
| Report | `wiki/reports/R-###-<slug>.md` | `R-001` | `templates/primer.md`, `templates/report-domain.md`, `templates/report-final.md` |

- A **domain** is the long track (weeks to months): five layers — `fundamentals`,
  `demand`, `models`, `signals`, `entry` — each with what is known, a confidence and a
  queue of questions; four phases `intro → map → focus → candidates`, each ending in a
  stop. State: `phase`, `checkpoint` (`running | ready | null`), `confidence` per layer.
- An **idea** carries five workstreams — `demand`, `competition`, `complexity`,
  `economics`, `entry` — in the same shape, kill criteria, rubric scores and a
  `target_decision`; no phases. State: `stage` (`active | validation | parked | killed`),
  `checkpoint`.
- A **brief** names its `domain:` and/or `idea:` and its `layer:` (a domain layer or an
  idea workstream). Run state lives on it: `status` (`draft | approved | running |
  collected`), `run_stage` (`queued | scouts | verify | checked | digest | null`;
  `checked` is the stop after collection), `run_started`, `run_finished`, `reviewed`
  (gate 2 passed), and one line per transition in `## Журнал прогону`. Timestamps:
  `node scripts/now.mjs`.
- Sequential IDs (D, I, B, R): `node scripts/next-id.mjs <prefix>`. Ingest evidence:
  `next-id.mjs E-ING-<yyyymmdd>`. Source IDs are a hash of the normalised URL, so
  parallel scouts never collide: check whether the file exists before creating it.
- Link entities by ID in double brackets: `[[E-B001-2-03]]`, `[[S-a1b2c3d4]]`, `[[D-001]]`.
- Source grades: **A** primary data, official statistics, peer-reviewed publications,
  filings; **B** reputable press, analyst reports, named experts, preprints without a
  confirmed peer-reviewed venue, and a vendor's official documentation or price list
  about its **own** product (features, limits, prices only); **C** vendor marketing,
  blogs, a vendor's quality or performance claims, secondary summaries; **D** forums,
  anonymous, undated. A claim supported only by C/D sources gets `confidence: low`.
- `source:` names the page the scout actually read. Every source page carries
  `accessed_via: direct | archive | secondary | blocked`; evidence must not rest on a
  `blocked` source.
- Missing evidence is a page too: `type: absence`, `source: null`, claim "доказів …
  не знайдено", with a `## Метод пошуку` section listing the queries tried. It counts
  as evidence for scoring a criterion `1` instead of `null`.
- Derived lists (`briefs`, `candidates`, `reports` on domains and ideas, `contradicts`
  back-links, stale topics) are kept by `node scripts/lint.mjs --fix`; `wiki/index.md`
  by `node scripts/index.mjs`. Never edit them by hand.

## Agents and delegation
Three roles, files in `agents/`: **scout** collects one sub-question; **critic** checks
(mode `verify` after each scout; mode `attack` at a stop, writing the critique page);
**writer** writes from the wiki without web (primer, analysis, domain report, final
report). The lead (you) writes briefs, digests, folds knowledge into layers and topics,
writes candidates, scores, asks at stops, runs the scripts. Models: scout and writer
`opus`, critic `inherit` (editor's decision 2026-10-05: nothing below Opus). No turn
limits; a scout is bounded by the brief's budget of searches and sources.

- **Background, always.** Spawn every subagent in the background. Before spawning,
  write the state to the file (`run_stage` on the brief, `checkpoint` on the domain or
  idea); after spawning, tell the user in plain words what started, what it will give
  and roughly how long, and end the turn. Never wait on a subagent in the foreground.
- **On a completion notification**, re-read that state from the file and do the next
  step of the playbook it belongs to (`playbooks/research.md` for briefs,
  `playbooks/checkpoint.md` for domain stops and idea synthesis, `playbooks/ingest.md`
  for ingested sources). If the notification completes a stop, report and ask;
  otherwise continue the chain. The file, not your memory, says where the run is.
- One scout per sub-question, all spawned in the same turn. Every scout task prompt
  contains: the sub-question, the brief and sub-question number, the domain and idea
  IDs (or none), IN scope, OUT of scope ("другий скаут досліджує X — не дублюй"),
  sources to try first, the budget, and the return format (≤ 15 lines: evidence IDs
  and one-line claims, contradictions, gaps).
- Subagents write pages to the wiki themselves and return only IDs and one-liners.
  Never paste raw findings into this conversation.
- At most two briefs run at once; a third gets `run_stage: queued`. Tails (step 7 of
  the research playbook) run one at a time, because they write shared files.
- While a stage is going, show progress on request (`node scripts/status.mjs`: stage,
  elapsed time, sub-questions covered), never unverified findings. At the stop after
  collection the pages are verified, so findings may be shown.

## Commands and playbooks
The protocol lives in `playbooks/`; commands are aliases. You follow a playbook from
plain words as readily as from its command.

| Playbook | Command | Plain words that trigger it |
|---|---|---|
| `playbooks/explore.md` | `/explore` | "вивчаємо напрям …", "де ми по D-001", "що далі по ідеї" |
| `playbooks/research.md` | `/research` | "дослідь питання …", "продовж B-007" |
| `playbooks/decide.md` | `/decide` | only the command |
| `playbooks/review.md` | `/review` | "що чекає на мене", "показуй B-004" |
| `playbooks/checkpoint.md` | — | "так" to a proposed phase stop; "синтез"; "зроби звіт"; "атакуй карту" |
| `playbooks/ingest.md` | — | a link or file with "ось джерело", "поклади в raw" |

## Stop format
At every stop, write ≤ 12 lines in Ukrainian, in plain words: what we have now
(counts, 2–3 headline items, what failed), what comes next and what it gives. Then
ask with `AskUserQuestion`, offering the options named in the playbook. Never mark an
option as recommended: your view goes in the text before the question. Wait. Never
reduce a finished stage to a command to type: the user must see what happened without
opening a file.

## Team
- `owner` on a domain or idea approves its gates. Others may write briefs (`draft`)
  and run approved ones. `author` on briefs, reports, critiques and decision entries
  says who was the editor of that step.
- Create new entities on an up-to-date `main`; lint reports duplicate IDs as errors.
- `wiki/index.md` is generated; `wiki/open-questions.md` and `docs/decision-log.md`
  are append-only.

## Without Claude Code
Any tool or person can run a role: open `agents/<role>.md` as the instruction of a
fresh session and give it the task prompt described in the playbook. Background
agents and completion notifications exist only in Claude Code; elsewhere the same
steps run one after another, and the lint rule replaces the hook.

## What you never do
- Choose which idea wins, or propose candidates before the focus stop. You score
  against `docs/rubric.md` with justification; the user decides.
- Hold the session waiting for a subagent, or let a chain run past a stop without the
  user's yes.
- Set the research agenda. You propose the next briefs; the user picks, adds, reorders.
- Talk to customers or send anything outside this repository.
- Push without the user's confirmation in the permission prompt, delete files under
  `raw/`, or edit `docs/decision-log.md` except via `/decide`.
```

- [ ] **Step 2: Rewrite `CLAUDE.md`**

```markdown
@AGENTS.md
```
(One line: Claude Code imports `AGENTS.md` into its context.)

- [ ] **Step 3: Verify the import works**

Run: `cd /Users/valentindmitruk/research-system && claude -p "Quote the exact title of rule 6 from your operating rules, nothing else." --max-turns 1 2>&1 | tail -2`
Expected: contains `No candidates before the focus stop`. If `claude -p` cannot run here, ask the user to confirm in a new session.

- [ ] **Step 4: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add AGENTS.md CLAUDE.md && git commit -q -m "$(cat <<'EOF'
docs(protocol): AGENTS.md as the source of rules; CLAUDE.md imports it

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 11: User-facing docs

**Files:**
- Rewrite: `docs/vision.md`, `docs/workflow.md`, `README.md`

**Interfaces:**
- Consumes: spec sections 1–6 for wording; the four command names; the playbook step numbers.

- [ ] **Step 1: Rewrite `docs/vision.md`**

```markdown
# Концепція системи

Система для планомірного дослідження напряму, який називає редактор, до появи ідеї,
вартої місяців роботи. Не чат, який «виплюне ідею», а конвеєр з людиною в циклі, який
накопичує знання у wiki і поступово підводить до кандидатів, кожен з яких стоїть на
доказах.

Редактор каже, куди дує вітер. Система вивчає напрям від основ: як влаштована галузь,
у кого які проблеми й за що платять, хто й як уже заробляє, що змінюється, як туди
зайти. Вона вводить редактора і себе в курс, пропонує наступні питання, і лише після
карти й фокусу пише кандидатів в ідеї. Ідея це вихід процесу, а не вхід. Робота над
одним напрямом триває тижні й місяці і не тримає редактора біля екрана, поки працюють
агенти.

## Принципи
1. **Продукт — wiki, а не агенти.** Сторінки напрямів, тем, доказів, джерел, критики
   й звітів лежать у git і не залежать від акаунту, моделі чи інструменту. Через два
   місяці будь-який напрям можна відкрити й побачити, що знаємо і чому. Знання живе на
   сторінках тем (`wiki/topics/`), які переживають напрями; новий напрям починається з
   читання тем, не з Google.
2. **Людина — головний редактор.** Три обов'язкові гейти: затвердити brief → переглянути
   докази → зафіксувати рішення. Три зупинки напряму: після конспекту, після карти,
   після фокусу. Агенти не вибирають ідей і не пропонують кандидатів до зупинки
   фокусу: вони дають охоплення, швидкість, структуру і критика. Судження — людське.
   Редактор не чекає на агентів: прогони йдуть у фоні, на кожній зупинці система каже
   простими словами, що має і що далі, і чекає відповіді; `/review` відкриває зупинку
   пізніше. Порядок денний теж задає редактор: система пропонує наступні питання, він
   вибирає.
3. **Все з джерелами.** Кожне твердження → доказ → джерело з URL, датою, grade. Число
   без джерела — це оцінка з описаним методом, і так і позначається. Кожен доказ із
   числом перевіряє критик проти джерела до того, як його прочитає редактор; на
   зупинці критик вибірково перевіряє й самого себе.
4. **Протиріччя — це дані.** Розбіжності між джерелами записуються, а не згладжуються.
5. **Критика обов'язкова.** Звіт агента звучить переконливо незалежно від якості. Тому
   перед звітом стану напряму і перед фінальним звітом ідеї окремий агент у чистому
   контексті шукає, де карта слабка, кого немає, і намагається вбити кожного
   кандидата. Конспект після вступу критики не потребує: його сторінки вже перевірені.
6. **Фіксовані формати.** П'ять шарів напряму, п'ять напрямів роботи ідеї, рубрика,
   шаблони brief'у і звітів не змінюються від напряму до напряму, інакше їх неможливо
   порівняти.

## Трек напряму
Чотири фази, зупинка після кожної. **Вступ**: один широкий brief по основах і конспект
на 2–4 сторінки. **Карта**: по одному brief'у на шари попиту, бізнес-моделей, змін і
входу; на зупинці критик і звіт стану напряму; редактор вибирає фокус. **Фокус**:
глибші brief'и по вибраних піднапрямах і польові знахідки редактора; на зупинці лід
пише кандидатів з доказів, критик їх атакує, редактор вирішує, який стає ідеєю.
**Кандидати**: напрям лишається відкритим, поки редактор його не закриє.

Трек ідеї коротший: п'ять напрямів роботи з чергами, дата рішення, brief'и на те, що
специфічне для ідеї; коли редактор каже «синтез» — аналіз, критика, фінальний звіт із
планом MVP, рішення advance / park / kill через `/decide`.

## Ролі
| Роль | Що робить | Не робить |
|---|---|---|
| лід (головна розмова) | brief'и, digest'и, шари й теми, кандидати на зупинці фокусу, бали, зупинки | не збирає докази сам, не вирішує, не задає порядок денний, не пропонує ідей до фокусу |
| scout | одне підпитання → докази й джерела у wiki | не робить висновків |
| critic | verify: кожен доказ із числом проти джерела; attack: критика карти чи ідеї, вибіркова перевірка, kill-критерії | не читає звітів, не оцінює, чи ідея добра |
| writer | конспект, аналіз, звіт стану напряму, фінальний звіт; кожне речення з доказом | без інтернету, нічого не вигадує |

## Що запозичено
- Orchestrator–worker з ізольованими контекстами і явними межами делегування
  (Anthropic, Claude Research).
- Research brief як «північна зірка» і очищення знахідок перед поверненням
  оркестратору (LangChain Open Deep Research).
- raw/ + wiki/ + lint, секція протиріч, відповіді файляться назад у wiki (LLM Wiki
  Карпаті).
- Галузевий пошук search funds: список галузей → короткий список за 1–2 місяці →
  письмова теза; занурення через людей із галузі поруч (дослідження B-004, 2026-10).
- Scorecard + критик + фіксований звіт.

## Чого немає в готових інструментах і є тут
Людина всередині циклу на кожній фазі, не лише на вході; напрям як сутність із
картою, що накопичується тижнями; кандидати лише з доказів і лише після фокусу;
обов'язкова критика перед звітом; протиріччя як дані; протокол у звичайному markdown,
який може виконати людина або інший інструмент.

## Дорожня карта
- **v0, v0.5 (вересень–жовтень 2026):** ідея як корінь, 7 агентів, 11 команд. Тестова
  база архівована тегом `v0-test-base`.
- **v1 (зараз):** напрям як корінь, три агенти, чотири команди, протокол в `AGENTS.md`
  і `playbooks/`, `.claude/` як адаптер. Дизайн:
  `docs/superpowers/specs/2026-10-06-domain-first-research-system-design.md`.
  Переглянути після першого повного напряму: чи п'ять шарів достатньо, чи правильно
  вибрано момент появи кандидатів, чи заважає оркестрація в головній розмові.
- **Далі:** адаптер для іншого інструменту з тестовим прогоном; ID з датою, якщо
  команда виросте; перевірка цитат після синтезу.

## Чого не делегувати
Вибір напряму і вибір ідеї. Розмови з клієнтами (лід готує питання й підсумовує).
Довіру до звіту без критики.
```

- [ ] **Step 2: Rewrite `docs/workflow.md`**

```markdown
# Workflow і команди

## Два треки
- **Ви** називаєте напрям, відповідаєте на зупинках, приносите власні знахідки
  (розмови, документи) словами «ось джерело», вибираєте фокус і кандидатів.
- **Агенти** досліджують у фоні. Поки вони працюють, сесія вільна.

## Типовий день
1. `/review` — що чекає на вас, що біжить, де напрями.
2. Відповісти на зупинки, які настали, поки вас не було (`/review B-###`, `/review D-###`).
3. `/explore D-###` — вибрати 1–3 наступні brief'и з черг і затвердити (гейт 1). Вони
   йдуть у фон.
4. Поки агенти працюють: читати докази, додавати й переставляти питання словами,
   приносити власні джерела, обговорювати напрям.
5. Прогін зупиняється двічі й питає вас: після збору й перевірки і після digest'у
   (гейт 2). Обидва рази система пише в чат, що має, і питає, чи йти далі.

## Напрям: чотири фази
| Фаза | Орієнтир | Що відбувається | Зупинка |
|---|---|---|---|
| Вступ | тижні 1–2 | один широкий brief по основах, конспект на 2–4 сторінки | ви прочитали конспект: карта · змінити межі · закрити |
| Карта | тижні 3–6 | по brief'у на попит, бізнес-моделі, зміни, вхід | критик і звіт стану: фокус на … · ще раунд · змінити межі · закрити |
| Фокус | тижні 7–12 | глибші brief'и по піднапрямах, ваші польові знахідки | кандидати з запереченнями критика: promote n · drop n · ще копати · закрити |
| Кандидати | далі | ідеї йдуть своїм треком, напрям відкритий | закрити через `/decide` |

Шари однакові для всіх напрямів: основи · попит · хто й як заробляє · що змінюється ·
вхід і правила. Дату виходу на кандидатів ставите ви; закрити напрям можна на будь-якій
зупинці.

## Ідея
Ідея з'являється з кандидата (`/decide D-### promote n`) або від вас словами. Вона має
п'ять напрямів роботи — попит, конкуренти, складність, економіка, вхід — з чергами,
kill-критерії і дату рішення. `/explore I-###` пропонує brief'и; перший для свіжої
ідеї — швидка перевірка на три підпитання. Коли ви кажете «синтез»: аналіз, критика,
фінальний звіт із планом MVP, гейт 3, `/decide I-### advance|park|kill`.

## Як іде один brief (`/research`)
1. Лід пише brief: питання, навіщо, що змінило б рішення, 3–7 підпитань, бюджет.
2. **Гейт 1.** Ви бачите brief у 12 рядках: затвердити · змінити підпитання · звузити · стоп.
3. Скаути стартують у фоні, по одному на підпитання. Сесія вільна.
4. Щойно скаут закінчив, критик перевіряє його сторінки проти джерел.
5. **Зупинка після збору.** Скільки доказів, що не підтвердилось, 2–3 знахідки:
   продовжити · перезапустити скаута · додати підпитання · стоп.
6. Лід запускає lint та index, пише digest, складає знання в шари й теми, робить коміт.
7. **Гейт 2.** Digest у 12 рядках: далі · копати глибше · додати підпитання · стоп.
8. На «далі» сторінка напряму чи ідеї оновлюється, коміт і push.

## Гейти і зупинки
| Де | Що ви читаєте | Що можна вибрати |
|---|---|---|
| brief, гейт 1 | brief у 12 рядках | затвердити · змінити підпитання · звузити · стоп |
| прогін, після збору | докази, перевірка, знахідки | продовжити · перезапустити скаута · додати підпитання · стоп |
| прогін, після digest'у (гейт 2) | digest | далі · копати глибше · додати підпитання · стоп |
| напрям, після вступу | конспект | карта · змінити межі · закрити |
| напрям, після карти | стан напряму й критика | фокус на … · ще раунд · змінити межі · закрити |
| напрям, після фокусу | кандидати з запереченнями | promote n · drop n · ще копати · закрити |
| ідея, гейт 3 | фінальний звіт | advance · park · kill · ще досліджувати |

Коли фоновий крок завершився, система пише в чат, що має, і питає. Без вашої відповіді
за зупинку чи гейт нічого не проходить.

## Команди
| Команда | Що робить |
|---|---|
| `/explore "<напрям>"` | новий напрям: три питання, сторінка, вступний brief, гейт 1, прогін |
| `/explore D-### \| I-###` | де ми, що біжить, наступні brief'и на вибір, зупинки фаз |
| `/research "<питання>" [D-### \| I-###]` | один brief: гейт 1 і прогін із двома зупинками |
| `/research B-###` | продовжити обірваний прогін або відкрити його зупинку |
| `/decide I-### advance\|park\|kill "причина"` | рішення по ідеї в decision log і на картці |
| `/decide D-### focus\|promote\|drop\|pause\|continue\|close … "причина"` | рішення по напряму |
| `/review [B-### \| D-### \| I-###]` | що чекає на вас; з ID відкриває зупинку чи гейт |

Словами, без команди: «ось джерело <посилання>» кладе його в raw/, витягує докази,
перевіряє і складає в напрям; «синтез», «зроби звіт», «атакуй карту» запускають
критика й writer; «додай питання …», «підніми … нагору», «пропусти шар …», «пауза»
правлять сторінку напряму.

## Паралельність і push
- Одночасно біжать не більше двох brief'ів; третій стає в чергу і стартує сам.
- Проміжних знахідок під час прогону система не показує: неверифіковане число ще не
  доказ. Прогрес видно в `/review`.
- Коміт після кожного кроку. `git push` — на гейтах, через запит дозволу.

## Бюджет
Прогін brief'у — 4–7 скаутів × ≤ 12 пошуків; швидка перевірка ідеї — 3 скаути × ≤ 8;
зупинка фази — критик і writer. Бюджет фіксується в brief і скаути його дотримуються.

## Коли щось пішло не так
- Скаут повернув порожньо → перевірте OUT-межі в brief; на зупинці виберіть «додати
  підпитання» і переформулюйте.
- Lint червоний → `node scripts/lint.mjs --fix`; якщо не допомагає — помилка у
  frontmatter, дивіться вивід.
- Writer відмовився → немає свіжої критики або переглянутого brief'у: скажіть «атакуй
  карту» або пройдіть гейт 2.
- Сесія обірвалась посередині прогону, або прогін «висить» понад 3 години → `/review`
  покаже крок і позначку «можливо, обірвано»; `/research B-###` продовжить із того ж
  місця.
- Тести скриптів: `for t in scripts/tests/*.test.mjs; do node $t; done`.
```

- [ ] **Step 3: Rewrite `README.md`**

```markdown
# Research System

Система для планомірного дослідження напряму до появи ідеї: людина в циклі, три
агенти для збору, перевірки й написання, wiki у git як накопичувальна база знань.
Протокол лежить у звичайному markdown (`AGENTS.md`, `agents/`, `playbooks/`), Claude
Code — основне середовище, `.claude/` лише адаптер.

## Що потрібно
- Claude Code (особистий акаунт Pro/Max, не корпоративний)
- Node.js 20+ (для скриптів `scripts/*.mjs`, без залежностей)
- git; репозиторій в **особистому** GitHub

## Старт
```bash
git clone <repo> && cd research-system && claude
```
У Claude Code:
1. Заповніть `docs/context.md` (команда, ресурси, обмеження) — від цього залежить
   критерій «відповідність» у рубриці.
2. `/explore "<напрям>"` → три питання про мотив і межі → вступний brief → **гейт 1** →
   прогін у фоні з двома зупинками → конспект на 2–4 сторінки → **зупинка**: карта.
3. `/explore D-001` → наступні brief'и на вибір → після карти критик і звіт стану →
   **ви вибираєте фокус** → глибші brief'и → **кандидати** з доказів → `/decide D-001
   promote n` → ідея.
4. `/explore I-001` → brief'и по ідеї → «синтез» → аналіз, критика, фінальний звіт →
   **гейт 3** → `/decide I-001 advance|park|kill`.

Поки агенти працюють, сесія вільна. `/review` показує, що чекає на вас, і відкриває
зупинки, які настали без вас. Власне джерело — словами: «ось джерело <посилання>».
Докладно: `docs/workflow.md`.

## Де що лежить
```
AGENTS.md    правила системи (CLAUDE.md лише імпортує його)
agents/      ролі: scout, critic, writer
playbooks/   процедури: explore, research, checkpoint, ingest, decide, review
templates/   шаблони сторінок
scripts/     lint, index, status, next-id, source-id, now, hooks/, tests/ (Node, без залежностей)
docs/        концепція, workflow, контекст, рубрика, decision log, специфікації
wiki/        domains · ideas · briefs · evidence · sources · topics · critique · analysis · reports
raw/         незмінні копії джерел (YYYY-MM-DD-slug.md)
.claude/     адаптер Claude Code: symlink'и на agents/ і playbooks/, settings.json
```

## Без Claude Code
Людина або інший інструмент виконує роль, відкривши `agents/<роль>.md` як інструкцію
для нової сесії; кроки з `playbooks/` ідуть один за одним; правило lint замінює hook.

## Переїзд на інший акаунт
Усе, що потрібно системі, лежить у цьому репозиторії. На новій машині: `git clone`,
`claude`, `/login`. Нічого не зберігається глобально в `~/.claude/`.
```

- [ ] **Step 4: Check for stale references**

Run: `cd /Users/valentindmitruk/research-system && ! grep -rn "librarian\|red-team\|\`/run\|\`/plan\|\`/screen\|\`/status\|\`/report\|\`/ingest\|\`/lint\|wiki/plans\|wiki/redteam\|verifier\|analyst" README.md docs/vision.md docs/workflow.md AGENTS.md`
Expected: no matches (exit 0 of the negation). The words "analyst" or "verifier" may appear only in `docs/vision.md` roadmap line about v0; if so, rephrase it ("7 агентів") so the check passes.

- [ ] **Step 5: Commit**

```bash
cd /Users/valentindmitruk/research-system && git add README.md docs/vision.md docs/workflow.md && git commit -q -m "$(cat <<'EOF'
docs: domain-first vision, workflow as steps, README

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
EOF
)" && git log --oneline -1
```

---

### Task 12: Verification and push

**Files:** none changed except the throwaway probe domain, which is removed again.

- [ ] **Step 1: Scripts and tests**

Run:
```bash
cd /Users/valentindmitruk/research-system && node scripts/lint.mjs | tail -1 && for t in scripts/tests/*.test.mjs; do echo "== $t"; node "$t" 2>&1 | grep -E "^# (pass|fail)"; done && node scripts/next-id.mjs D && node scripts/next-id.mjs R && node scripts/index.mjs && node scripts/status.mjs | head -2
```
Expected: `lint: 0 error(s), 0 warning(s), 0 page(s)`; every test file `# fail 0`; `D-001`; `R-001`; the index line; `## Waiting on you` / `nothing is waiting`.

- [ ] **Step 2: Adapters are visible**

Run: `cd /Users/valentindmitruk/research-system && ls -l .claude/agents .claude/skills/*/SKILL.md && git status --short`
Expected: three agent links, four skill links, clean tree.

- [ ] **Step 3: Dry run to gate 1 (with the user)**

In this session, say in one sentence that a dry run starts, then follow `playbooks/explore.md` "New domain" for the title «пробний напрям» with answers you give yourself (motive: перевірка системи; boundaries: none; target: 8 weeks). Stop at gate 1 and ask the user to answer **стоп**. Do not spawn scouts. Then check:
```bash
cd /Users/valentindmitruk/research-system && node scripts/lint.mjs | tail -1 && ls wiki/domains wiki/briefs
```
Expected: `0 error(s)`; `D-001-probnyi-napriam.md` and `B-001-….md` exist with `status: draft`.
Then remove the probe: `git rm -q wiki/domains/D-001-* wiki/briefs/B-001-* && node scripts/index.mjs && git add wiki/index.md && git commit -q -m "chore: remove dry-run probe"` (with the attribution trailer).

- [ ] **Step 4: Hook blocks a report without a critique**

With the Write tool, try to create `wiki/reports/R-001-probe.md` with content `---\nid: R-001\ntarget: D-001\ntype: domain\n---\n`. Expected: the hook blocks it with `critique-gate: wiki/critique/D-001-critique.md is missing …`. Nothing is written. Then try `type: primer` with the same target: expected the write succeeds; delete the file (`rm wiki/reports/R-001-probe.md`) and confirm `git status --short` is clean.

- [ ] **Step 5: Push**

```bash
cd /Users/valentindmitruk/research-system && git log --oneline v0-test-base..HEAD && git push
```
The push goes through the permission prompt; the user confirms it. Report the commit list and that `main` is pushed.

---

## Self-review notes

- **Spec coverage.** §3 entities → Tasks 3 (templates) and 4 (lint); §4–5 tracks → Tasks 9 (playbooks) and 11 (docs); §6 gates → Task 10 (AGENTS.md) and the stop steps in Task 9; §7 agents → Task 8; §8 playbooks → Task 9; §9 scripts → Tasks 4–7 (`next-id.mjs` already handles any one-letter prefix, verified in Task 12); §10 files and adapters → Tasks 2, 8, 9, 10; §11 team → Task 10 (Team section) and Task 11; §12 cleanup → Task 1; §13 verification → Task 12; §14 deferred → not planned, by design.
- **Interfaces.** `under(pages, dir)` (Task 4) is used by Tasks 5–7; `run(script, root, args, input)` (Task 4) by Task 7; fixture builders by Tasks 5–7; agent task grammar (Task 8) by Task 9; playbook step numbers (Task 9) by Task 10's table and Task 11's docs.
- **Known judgment calls.** Lint treats a missing `author` on a non-draft brief as an error (spec §9 lists it among checks). `--fix` drops trailing comments on the lines it rewrites. The "collected brief not folded" warning fires only when the brief has evidence pages.
