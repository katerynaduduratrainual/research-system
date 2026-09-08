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
2. `/research "ваше питання"` → отримаєте brief і план → **затверджуєте**.
3. `/run B-001` → скаути паралельно збирають докази → digest → **ревʼю**.
4. `/screen <ідея>` для швидкого скринінгу або `/deep-dive I-001` для повного циклу
   (brief → докази → аналітик → red team → звіт) з трьома чекпоінтами.
5. `/decide I-001 advance|park|kill "причина"` → decision log і картка ідеї оновлені.

Інші команди: `/ingest <url|file>` — покласти джерело в raw/ і витягнути докази;
`/red-team I-001` — окремий red team; `/report I-001` — звіт (тільки після red team);
`/lint` — перевірка цілісності wiki; `/status` — стан пайплайну.

## Де що лежить
```
docs/        концепція, рубрика, контекст, workflow, decision log
raw/         незмінні копії джерел (YYYY-MM-DD-slug.md)
wiki/        ideas · briefs · evidence · sources · analysis · redteam · reports
templates/   шаблони сторінок
scripts/     lint, next-id, source-id, status (Node, без залежностей)
.claude/     agents (ролі) · skills (команди) · settings.json
```

## Переїзд на інший акаунт
Усе, що потрібно системі, лежить у цьому репозиторії. На новій машині / акаунті:
`git clone`, `claude`, `/login`. Нічого не зберігається глобально в `~/.claude/`.
