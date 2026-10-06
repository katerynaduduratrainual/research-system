---
id: E-B000-0-00      # E-B###-<sq>-<nn> | E-D###-C-<nn> | E-I###-C-<nn> | E-ING-<yyyymmdd>-<nn>
claim: ""             # одне твердження, своїми словами, ≤ 25 слів
type: fact            # fact | statistic | estimate | opinion | anecdote | absence
source: S-00000000    # null лише для type: absence
source_grade: C       # A | B | C | D — копія з сторінки джерела
confidence: medium    # high | medium | low
date_of_info: ""      # до якого періоду стосується інформація, напр. 2025-Q3
brief: B-000
subquestion: 0
domain: null          # D-### або null; скауту досить заповнити brief
idea: null            # I-### або null
contradicts: []       # [E-...]
created: 0000-00-00
verified: null        # дата перевірки критиком (verify)
verification: null    # ok | inexact | failed | unreachable
---

# {{claim}}

## Контекст
Де саме в джерелі це сказано; хто автор твердження; вибірка/методологія, якщо є.

## Цитата
> ≤ 30 слів мовою оригіналу.

## Метод (тільки для type: estimate; видалити, якщо не стосується)
Як отримано число; з чого складається; діапазон.

## Метод пошуку (тільки для type: absence; видалити, якщо не стосується)
Які запити й джерела перевірено, коли; що саме не знайдено.

## Верифікація
_(заповнює критик у режимі verify: дата — вердикт: що каже джерело; що виправити)_

## Нотатки
Чому саме така впевненість. З чим суперечить.
