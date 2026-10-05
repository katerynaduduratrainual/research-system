---
id: B-000
question: ""
idea: null            # I-### або null
workstream: null      # demand | competition | complexity | economics | entry | null (наскрізний)
status: draft         # draft | approved | running | collected | done
created: 0000-00-00
approved: null
run_stage: null       # queued | scouts | verify | librarian | digest | redteam | report | null
run_started: null     # yyyy-mm-ddThh:mm
run_finished: null    # yyyy-mm-ddThh:mm
reviewed: null        # yyyy-mm-dd — гейт 2 пройдено
budget:
  scouts: 0
  searches_per_scout: 12
  max_sources_per_scout: 10
---

# {{question}}

## Навіщо
Яке рішення обслуговує це питання. Хто його прийматиме, коли.

## Що вже є у wiki
Сторінки тем і докази, які перевикористовуємо, а не збираємо знову: [[T-...]],
[[E-...]]. Якщо нічого — «wiki порожня по цій темі» і які запити перевірено.

## Що змінило б рішення
1. Якщо виявиться, що … — тоді …
2. …

## Підпитання
### 1. <назва>
- Питання:
- В межах (IN):
- Поза межами (OUT): … — це покриває підпитання №…
- Джерела спробувати першими:
- Очікуваний тип доказів: статистика / факти / приклади / думки експертів

### 2. <назва>
…

## Критерії успіху
Brief закрито, коли: …

## Журнал прогону
_(дописує /run на кожному кроці: `- <yyyy-mm-dd hh:mm> · <крок> · <що сталося>`)_

## Digest
_(заповнює /run після збору доказів)_
