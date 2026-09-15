import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = fs.readFileSync(path.join(root, "AI_CONTEXT.md"), "utf8");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "config", "variable-export-manifest.json"), "utf8"),
);

test("AI entrypoint declares exact authority and logical totals", () => {
  // Singh's 2026-09-14 ruling: Figma first, owner exports fallback,
  // disagreement between the two = hard alert, never silently resolved.
  assert.match(context, /Live Figma first/i);
  assert.match(context, /export folder second/i);
  assert.match(context, /HARD ALERT/);
  assert.match(context, /DS_VARIABLE_SOURCE_DIR/);
  assert.match(context, /never \*infer or fabricate\* a value/i);
  assert.match(context, /Shared Primitives[^\n]*264/);
  assert.match(context, /Agency Semantics[^\n]*280/);
  assert.match(context, /Caregiver Semantics[^\n]*171/);
  assert.deepEqual(manifest.logicalTotals, {
    sharedPrimitives: 264,
    agencySemantics: 280,
    caregiverSemantics: 171,
  });
});

test("AI entrypoint routes semantics to isolated portal paths", () => {
  assert.match(context, /portals\/agency\/semantics/);
  assert.match(context, /portals\/caregiver\/semantics/);
  assert.match(context, /Only Primitives are shared/);
  assert.match(context, /If the portal is unknown, stop and request it/);
});
