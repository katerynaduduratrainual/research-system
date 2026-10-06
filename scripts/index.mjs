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
