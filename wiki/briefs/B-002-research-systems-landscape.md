---
id: B-002
question: "Які підходи до LLM-систем дослідження (deep research, multi-agent, LLM-wiki, валідація бізнес-ідей) існують на ринку та в літературі 2025–2026, і що з них варто запозичити в research-system?"
idea: null            # мета-дослідження системи, не бізнес-ідея
status: draft         # draft | approved | running | collected | done
created: 2026-09-11
approved: null
run_started: null
budget:
  scouts: 6
  searches_per_scout: 12
  max_sources_per_scout: 10
---

# Які підходи до LLM-систем дослідження існують на ринку та в літературі 2025–2026, і що з них варто запозичити в research-system?

## Навіщо
Рішення, які обслуговує brief (приймає редактор до старту ресерчу ідей на початку
жовтня 2026):
1. Які з 15 правок у `docs/retro-2026-09-09.md` застосувати першими, і чого в тому
   списку немає взагалі.
2. Чи будувати далі власну систему, чи частину циклу віддати готовому інструменту
   (buy vs build), і що саме.
3. Що і коли будувати у v1 на Agent SDK (нічні скаути, черга, дашборд), і чи
   будувати взагалі. Оновити `docs/vision.md`, розділ «Що запозичено».

## Що змінило б рішення
1. Якщо готовий комерційний продукт уже дає накопичувальну базу знань + людські гейти
   + провенанс до джерела за прийнятну ціну — переглянути «будувати самим».
2. Якщо в літературі є перевірений evals-ом патерн, якого в нас немає (верифікація
   цитат, оцінка джерел, обмеження контексту), — додати в правки з пріоритетом P1.
3. Якщо докази покажуть, що red team / spot-check дають мало при своїй вартості або,
   навпаки, що deep-research продукти масово вигадують цитати, — змінити вагу цих
   кроків у конвеєрі.
4. Якщо стандартні методики валідації ідей мають інші гейти чи критерії, ніж наша
   рубрика, — переглянути рубрику окремим комітом.

## Фіксовані виміри порівняння
Кожен скаут описує системи за одними осями, щоб таблицю можна було скласти: (а) план /
brief і уточнюючі питання; (б) паралелізм та ізоляція контекстів; (в) точки участі
людини; (г) провенанс і цитати; (д) накопичення між сесіями (wiki, memory); (е) робота
з протиріччями; (є) adversarial review; (ж) evals і метрики якості; (з) вартість і час
прогону; (и) open source чи закрите; ціна.

## Підпитання
### 1. Комерційні deep-research продукти
- Питання: Як влаштовані й що вміють deep-research продукти (OpenAI Deep Research,
  Gemini Deep Research, Perplexity, Claude Research, Grok DeepSearch, Manus, Genspark,
  Kimi Researcher та інші), де в них людина, як вони цитують, скільки коштують, і які
  задокументовані збої?
- В межах (IN): офіційні описи архітектури й лімітів, evals (BrowseComp, HLE, DeepResearch
  Bench), незалежні огляди й тести якості цитат, ціни, формати виходу, наявність
  накопичення між сесіями.
- Поза межами (OUT): open-source фреймворки — це покриває підпитання №2; бази знань і
  wiki — №3; методики валідації ідей — №4.
- Джерела спробувати першими: openai.com/index/introducing-deep-research; blog.google
  (Gemini Deep Research); perplexity.ai/hub; anthropic.com/news (Research); Every, Stratechery,
  Latent Space, Simon Willison; arXiv «deep research agents survey 2025».
- Очікуваний тип доказів: факти, статистика (evals, ціни), думки експертів.

### 2. Open-source агентні дослідницькі фреймворки
- Питання: Які open-source системи дослідження існують (LangChain Open Deep Research,
  GPT Researcher, Stanford STORM / Co-STORM, HF Open Deep Research / smolagents, ByteDance
  DeerFlow, CAMEL OWL, Anthropic multi-agent research post та інші), які патерни
  оркестрації вони використовують і які з них підтверджені evals-ом?
- В межах (IN): архітектура orchestrator–worker, ізоляція контекстів, brief як «північна
  зірка», очищення знахідок, бюджети, результати evals, зірки/активність, ліцензії.
- Поза межами (OUT): комерційні продукти — №1; wiki/накопичення — №3; Claude
  Code-специфічні практики — №6.
- Джерела спробувати першими: GitHub README та docs; blog.langchain.com (open deep
  research); storm.genie.stanford.edu, arXiv STORM/Co-STORM; anthropic.com/engineering
  (multi-agent research system); huggingface.co/blog/open-deep-research.
- Очікуваний тип доказів: факти, статистика, приклади.

### 3. LLM-wiki і накопичувальні бази знань
- Питання: Як будують бази знань, що накопичуються між сесіями LLM-агентів (LLM Wiki
  Карпаті та реалізації, compound knowledge, Obsidian/Notion + агенти, memory-системи),
  як тримають провенанс, свіжість, протиріччя і lint, і які збої задокументовані?
- В межах (IN): дизайни raw/ vs wiki/, схеми сторінок, lint і дедуп, робота з
  протиріччями й застаріванням, вартість підтримки, звіти про практику (що зламалось
  через місяць).
- Поза межами (OUT): оркестрація агентів — №2; валідація бізнес-ідей — №4; загальні
  memory-фічі Claude Code — №6.
- Джерела спробувати першими: gist Karpathy «LLM wiki»; реалізації на GitHub; блоги
  «compound engineering», «knowledge compounding»; Obsidian forum; arXiv про agent memory
  (2025–2026); статті про drift/staleness у RAG-базах.
- Очікуваний тип доказів: факти, приклади, думки експертів.

### 4. Методики валідації бізнес-ідей і stage-gate
- Питання: Які методики валідації та відбору ідей використовують стартапи, корпоративні
  R&D і венчурні студії (Lean Startup, Disciplined Entrepreneurship, stage-gate Купера,
  скоркарди), які в них гейти, критерії й kill-правила, і які AI-інструменти валідації
  ідей існують (можливості, ціни, обмеження)?
- В межах (IN): гейти й критерії з першоджерел, scorecard-ваги, bottom-up TAM практика,
  корпоративні venture studio процеси; AI-валідатори (Validator AI, IdeaBuddy, DimeADozen,
  Founderpal, CheckMyIdea тощо): що роблять, чи мають джерела, ціна.
- Поза межами (OUT): deep-research інструменти — №1; wiki — №3.
- Джерела спробувати першими: книги/сайти авторів методик; Stage-Gate International;
  YC Startup School, a16z; звіти BCG/McKinsey про corporate venturing; сайти й прайси
  AI-валідаторів; Product Hunt; G2.
- Очікуваний тип доказів: факти, приклади, думки експертів.

### 5. Якість, провенанс і adversarial review
- Питання: Що відомо про вигадані цитати й помилки в deep-research виходах, які
  пайплайни верифікації цитат і оцінки джерел існують, і які adversarial-патерни
  (debate, devil's advocate, red team agents, LLM-as-judge) підтверджені дослідженнями?
- В межах (IN): arXiv і бенчмарки 2024–2026 (citation accuracy, DeepResearch Bench,
  ResearchRubrics, BrowseComp), схеми оцінки джерел (NewsGuard, CRAAP та ін.), звіти
  про частоту вигаданих цитат, ефект adversarial review на якість.
- Поза межами (OUT): опис продуктів — №1; фреймворки — №2.
- Джерела спробувати першими: arXiv; Semantic Scholar; блоги evals-команд (OpenAI,
  Anthropic, Google DeepMind); Nature/Science про AI citation errors; NewsGuard.
- Очікуваний тип доказів: статистика, факти.

### 6. Практики на Claude Code і Agent SDK
- Питання: Як інші будують дослідницькі й моніторингові системи на Claude Code / Agent
  SDK (субагенти, skills, hooks, memory, scheduled/nightly агенти), як реалізують людські
  гейти й бюджети токенів, і що потрібно для v1 з нічними скаутами, чергою і дашбордом?
- В межах (IN): офіційна документація Anthropic (subagents, skills, hooks, Agent SDK,
  scheduled tasks), добре задокументовані публічні репозиторії й статті з цифрами
  вартості й часу, обмеження (глибина спавну, ліміти ходів).
- Поза межами (OUT): фреймворки не на Claude — №2; продукти — №1.
- Джерела спробувати першими: docs.anthropic.com (Claude Code, Agent SDK);
  anthropic.com/engineering; GitHub awesome-claude-code; статті Simon Willison, Latent
  Space; блоги команд з реальними цифрами.
- Очікуваний тип доказів: факти, приклади, статистика (вартість).

## Критерії успіху
Brief закрито, коли: по кожному підпитанню ≥ 5 доказів grade A/B або явна сторінка
«доказів не знайдено» з методом пошуку; є порівняльна таблиця ≥ 8 систем за фіксованими
вимірами; є список патернів «варто запозичити» з посиланням на доказ і список
задокументованих збоїв; кожна з 15 правок ретро має позначку «підтверджено / спростовано
/ не стосується» з ID доказу.

## Digest
_(заповнює /run після збору доказів)_
