// Run: node scripts/tests/now.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { makeWiki, run } from "./helpers.mjs";

test("prints the local time as yyyy-mm-ddThh:mm, within a minute of now", () => {
  const { out, code } = run("now.mjs", makeWiki());
  assert.equal(code, 0, out);
  assert.match(out.trim(), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  assert.ok(Math.abs(Date.now() - Date.parse(out.trim())) < 120000, out);
});
