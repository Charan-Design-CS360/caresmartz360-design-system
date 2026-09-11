<!--
=============================================================================
BINDING PLAN — control/height-* (Option A, approved by Singh 2026-09-11)
Ready to execute the moment the refreshed Agency export lands.
Every site below was classified, then ADVERSARIALLY re-verified by a second
pass whose default answer was "reject". Exclusions are listed on purpose.
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526)
=============================================================================
-->

# Binding plan — `control/height-default` (30) · `control/height-compact` (24)

**Status: PREPARED, NOT APPLIED.** Blocked on one thing only — the refreshed Agency export.
Nothing here is bound until the token exists in the owner's export.

## ⚠️ First, a naming conflict you need to settle

Two different names exist for the same two values, and they must not both ship:

| source | names it uses | values |
|---|---|---|
| **Figma (live, already bound)** | `control/height-default` · `control/height-compact` | 30 · 24 |
| **`button.json` `openTokenDecision`** (written earlier) | `control/min-height` · `control/min-height-compact` | 30 · 24 |

**Recommendation: keep Figma's names** (`height-default` / `height-compact`). They already exist and
are already bound to live components — renaming them in Figma would break those bindings, while the
contract's proposal is only a proposal. I'll then retire the competing names from `button.json`.

**Useful corroboration:** `button.json` independently concluded these belong in the **Density Modes
collection, scope WIDTH_HEIGHT** — the same home I recommended from a different direction.

**Related, your call:** that same proposal asks for two more tokens — `control/min-width` = 80 and
`control/min-width-label` = 60 (button widths). I have **not** verified those two live in Figma. If
you want them, they can ride along in the same export instead of forcing a second round trip.

---

## Sites to bind — 17 confirmed

Each was classified by one pass and then re-checked by an independent pass instructed to refute it.

### `control/height-default` (30)

| file | line | declaration | element |
|---|---|---|---|
| `components/css/buttons.css` | 73 | `min-height: 30px` | `.cs-btn` — base button |
| `components/css/fields.css` | 238 | `height: 30px` | field control, Compact=Yes |
| `components/css/column-arrangement.css` | 142 | `height: 30px` | Columns trigger (pinned min+max) |
| `catalog/styles/components/buttons.css` | 75 | `min-height: 30px` | gallery copy of `.cs-btn` |
| `catalog/styles/components/fields.css` | 240 | `height: 30px` | gallery copy |
| `catalog/styles/components/search-field.css` | 63 | `height: 30px` | `.cs-search` |
| `catalog/styles/components/search-field.css` | 64 | `min-height: 30px` | `.cs-search` |
| `catalog/styles/components/search-field.css` | 65 | `max-height: 30px` | `.cs-search` |
| `catalog/styles/components/select.css` | 80 | `height: 30px` | select control |
| `portals/agency/components/button.json` | 34 | `"standard": 30` | `geometry.minHeight` |
| `portals/agency/components/button.md` | 86 | `min-height, standard 30px` | contract table |

### `control/height-compact` (24)

| file | line | declaration | element |
|---|---|---|---|
| `components/css/buttons.css` | 188 | `min-height: 24px` | `.cs-btn--compact` |
| `catalog/styles/components/buttons.css` | 190 | `min-height: 24px` | gallery copy |
| `portals/agency/components/button.json` | 34 | `"compact": 24` | `geometry.minHeight` |

*(`button.json:81` prose "raw min-height 30 → 24" is a description, not a binding site — it gets
reworded, not bound.)*

---

## Sites DELIBERATELY EXCLUDED — do not bind these

This is the half that makes the pass safe. Each was proposed by a scanner and **rejected** on review:

| file | line | value | why excluded |
|---|---|---|---|
| `components/css/buttons.css` | 161 | `min-width: 30px` | **a WIDTH**, not a height — icon-only button kept square |
| `components/css/buttons.css` | 191 | `min-width: 24px` | **a WIDTH** — compact icon-only stays square |
| `catalog/styles/components/fields.css` | 382 | `height: 30px` | **an ICON BOX** (`.cs-field__toy`), not a control |
| `components/css/table.css` | 426 | `min-height: 30px` | **table data cell** — not an interactive control |
| `components/css/table.css` | 427 | `height: 30px` | same; the table contract owns this number |
| `src/styles/3-components/_tables.scss` | 100, 101 | `height/min-height: 30px` | same — table row, not a control |
| `components/css/skeleton.css` | 49 | `height: 30px` | a **skeleton placeholder** shaped like a button |
| `portals/agency/components/button.json` | 155, 156 | 30 / 24 in prose | the token **proposal text** itself |

**Why this mattered:** `spacing/3xl` is also **24**, and 24×24 icon boxes are everywhere. A blind
find-and-replace would have bound at least 8 wrong sites, including two widths — shipping visibly
broken controls.

---

## Open cross-portal warning (surfaced by the census)

`components/css/buttons.css` header records **OPEN-REGISTER O-14 / CONTRADICTIONS S4**: Agency's
button is **30px** while **CGPortal's `--btn-min-height` is 32px** — unresolved, pending you. These
bindings are **Agency-only**. A Caregiver/CGPortal copy must not silently inherit 30 — that decision
is still yours and is untouched by this plan.

---

## Execution order once the export lands

1. Read the new zip; confirm both names and values. **Stop and report if either is missing or differs.**
2. `npm run sync:variables`
3. Recompute manifest hashes + counts (Agency Density Modes **29 → 31**; agencySemantics **263 → 265**)
   from the real files — never by editing expectations to make a gate pass.
4. `npm run verify:variables` + all 6 gates.
5. Apply the 17 bindings above; touch nothing on the exclusion list.
6. Re-run gates + the gallery integrity checks; confirm the rendered heights are unchanged (the value
   is identical — 30 stays 30 — so this is a provenance fix, not a visual change).
7. Clear the "pending export" flags in the 7 contracts that raised this; reply on the tickets.
