---
name: research
description: Turn a research question into a brief and a scout plan, then stop for approval (gate 1). Does not collect anything.
argument-hint: '"<question>" [I-###]'
disable-model-invocation: true
---

Act as research lead (see CLAUDE.md). The question: $ARGUMENTS. If an idea ID is given,
link the brief to that idea.

1. Read `docs/vision.md`, `docs/context.md`, `docs/rubric.md`, `wiki/index.md`,
   `wiki/open-questions.md`. Grep `wiki/briefs` and `wiki/evidence` for the question's
   key terms; if it is already covered, say so and propose to reuse or extend instead.
2. If the question is ambiguous about scope, geography, time horizon or the decision it
   serves, ask at most 3 clarifying questions with AskUserQuestion. Otherwise proceed.
3. Allocate `node scripts/next-id.mjs B`. Write `wiki/briefs/B-###-<slug>.md` from
   `templates/brief.md`:
   - **Питання** as the user meant it, one sentence.
   - **Навіщо / яке рішення обслуговує.**
   - **Що змінило б рішення** — 2–4 concrete facts.
   - **Підпитання** — 3–7, mutually independent, each with: IN scope, OUT of scope
     (naming which other sub-question covers it), sources to try first, expected evidence
     type. Order them so the ones that could kill the question come first.
   - **Бюджет** — scouts, searches per scout, max sources.
   - **Критерії успіху** — when is this brief "done".
   - `status: draft`.
4. Gate 1. Show the brief in ≤ 12 lines (question, what would change the decision,
   sub-question titles, budget). Ask with AskUserQuestion: затвердити / змінити
   підпитання / звузити / стоп. On approval set `status: approved`, commit
   `brief(B-###): <slug>`, and tell the user to run `/run B-###`. Do not spawn scouts here.
