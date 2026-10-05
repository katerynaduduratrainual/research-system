# Research System

Система для планомірного ресерчу бізнес-ідей на Claude Code: людина в циклі,
суб-агенти для збору доказів, wiki у git як накопичувальна база знань.

## Що потрібно
- Claude Code (особистий акаунт Pro/Max, не корпоративний)
- Node.js 20+ (для скриптів `scripts/*.mjs`, без залежностей)
- git; репозиторій в **особистому** GitHub

## Старт
```bash
git init && git add . && git commit -m "chore: research-system v0"
claude
```
У Claude Code:
1. Заповніть `docs/context.md` (команда, ресурси, обмеження) — від цього залежить
   критерій «відповідність» у рубриці.
2. `/screen <ідея>` → швидкий скринінг у фоні → `/review I-001` → **рішення**: park,
   kill або «на довгий трек».
3. `/plan I-001` → план дослідження на 1–3 місяці: п'ять напрямів, черга питань, три
   фази → **затверджуєте** план і перші brief'и.
4. Brief'и збираються у фоні, сесія вільна. Коли готово, приходить один рядок;
   `/review B-001` → digest → **ревʼю**, коли вам зручно.
5. Після фаз «карта» і «глибина» — контрольна точка (аналітик + red team); у кінці
   звіт із планом MVP → `/review I-001` → `/decide` → decision log і картка оновлені.

Окреме питання поза планом: `/research "питання"` → brief → `/run B-001`.

Інші команди: `/status` — що чекає на вас, що біжить, де плани; `/ingest <url|file>` —
покласти власне джерело в raw/ і витягнути докази; `/red-team I-001` — окремий
red team; `/report I-001` — звіт (тільки після red team); `/lint` — перевірка
цілісності wiki. Докладно: `docs/workflow.md`.

## Де що лежить
```
docs/        концепція, рубрика, контекст, workflow, decision log
raw/         незмінні копії джерел (YYYY-MM-DD-slug.md)
wiki/        ideas · plans · briefs · evidence · sources · topics · analysis · redteam · reports
templates/   шаблони сторінок
scripts/     lint, next-id, source-id, status, now, tests/ (Node, без залежностей)
.claude/     agents (ролі) · skills (команди) · settings.json
```

## Переїзд на інший акаунт
Усе, що потрібно системі, лежить у цьому репозиторії. На новій машині / акаунті:
`git clone`, `claude`, `/login`. Нічого не зберігається глобально в `~/.claude/`.
