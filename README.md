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
