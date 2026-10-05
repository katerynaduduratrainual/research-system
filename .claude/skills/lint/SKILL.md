---
name: lint
description: Check wiki integrity (IDs, links, frontmatter, orphans, duplicate sources, run state, plans) and have the librarian fix errors in the background.
disable-model-invocation: true
---

1. Run `node scripts/lint.mjs` and show the summary line.
2. If there are errors, spawn `librarian` with the full lint output and task 1 only, in
   the background; say so in one line and end the turn. When it finishes, re-run lint.
   Repeat once more at most; if errors persist, list them for the user.
3. Show remaining warnings grouped by type, ≤ 15 lines. Commit `lint: <n> fixes` if
   anything changed.
