<!--
=============================================================================
COMPONENT CONTRACT — Form Fields family (Agency portal)

The 10-component form-field system: 1 sub-atom, 6 atoms, 3 molecules.
Measured LIVE from Figma section 26955:66554 on 2026-09-10 (bound variables +
node geometry — never Figma's prose). Machine contract: ./form-fields.json.

SUPERSEDES ./field-type-1.md — Figma renamed field-set-type1 to
form-field-primary and restructured it (62→66px, real header component,
disabled bg fixed). field-type-1.* stays as the historical record.

MARKERS: [MEASURED] read live · [DERIVED] computed, arithmetic shown ·
[UNVERIFIED] not read — do not build from it.

CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira source: C360-47183
=============================================================================
-->

# Form Fields — Agency component contract (family)

Jira: **C360-47183** (source ticket) · parent **C360-44737** · machine contract `form-fields.json`.

## The three field types (owner's model)

| | PRIMARY | SECONDARY | TERTIARY |
|---|---|---|---|
| Purpose | **View/display** | **Edit/input** | **Settings/config** |
| Context | grids, tables, list views | popups, forms, modals | settings panels |
| Layout | vertical 2-row, one outer border | vertical: header + bordered input (+ message) | horizontal: info block left, input right |
| Input border | none — state colour on the container | visible, per state | visible, per state |
| Variants | 7 states (incl. **ai**) | 6 states | 3 sizes (S/M/L header) |
| Height | **66** | **56** / **76** with message | **104** (row) |
| Node | `26938:65997` | `27062:7663` | `27395:30147` |

Hierarchy: `field-label` (sub-atom) → headers (`field-header-primary/-secondary/-tertiary`) +
shared `field-input`, `field-message`, `form-section-header` (atoms) → the three
`form-field-*` molecules.

## Measured geometry (all [MEASURED] 2026-09-10)

- **form-field-primary** `26938:65997` — 360×**66**; grid rows **30** (header) + **34** (value) inside a 1px border (1+30+34+1=66). Value text inset 8px (`spacing/md`), radius 0 (`border-radius/rounded-none`). 360 = variant width; treat as 100% of parent (the form-grid pattern instances it at 254.5).
- **form-field-secondary** `27062:7663` — 360×**56** (default/focus) or **76** (error/success/warning/disabled): header 26 + input **30** + message 20. No row gaps.
- **form-field-tertiary** `27395:30147` — 1036×**104**; padding 12 (`spacing/lg`); header block 560×80 left, input 400×**34** in a 440 column at x=572 (gap 12, vertically centered).
- **field-input** `27062:8145` — base variants 358×**34**; embedded at **30** in secondary, **34** in tertiary. Text inset 8; trailing 30×30 control slot ("Fields Toys"); radius **4** (`border-radius/rounded`). Editable default border = `field/border-hard` #94A3B8 (kit fix 2026-09-09).
- **field-header-primary** `27388:28274` — 358×**30**; label cluster left (inset 8), icon rail right: error 18 / help 18 / AI 18, gaps 4.
- **field-header-secondary** `27388:29316` — 186×**26**; field-label + right AI icon 18.
- **field-header-tertiary** `27290:41702` — S 560×80 / M 560×86 / L 560×90; rows title → description → AI message → error message, all gaps 4 (`spacing/sm`). Title styles S/M/L = Fields/label 12/16 · Fields/header 14/20 · Fields/header-large 16/24 [DERIVED from row-height arithmetic].
- **field-message** `11116:25116` — 20h (Error/Help/Warning/Success, icon 16) or 18h (AI, icon 14); icon-text gap 4; Body/micro 10/14. Colours: danger #dc2626 / secondary #475569 / warning #ca8a04 / success #16a34a / AI icon `action/ai/text-hard` #9333ea with secondary text.
- **field-label** `27062:10162` — 16h; Fields/label 12/16 Medium `text/primary`; required marker 8×16 `icon/danger`; help 16×16 `icon/brand`; gaps 4.
- **form-section-header** `27395:30130` — 1036×**80**; padding 12; title Fields/header 14/20 + 2-line description Body/small 12/16 (gap 4) on `surface/tertiary` #F1F5F9 with `field/border-default` border.

## State → token map (identical family-wide; verified per-variant)

| state | bg | border | value text |
|---|---|---|---|
| default | `field/bg-default` | `field/border-default` (primary) / `field/border-hard` (editable input) | `field/value-placeholder` |
| focus | `field/bg-focus` | `field/border-focus` | `field/value-primary` |
| error | `field/bg-danger` | `field/border-danger` | `field/value-primary` |
| success | `field/bg-success` | `field/border-success` | `field/value-primary` |
| warning | `field/bg-warning` | `field/border-warning` | `field/value-primary` |
| ai (primary only) | `field/bg-ai` | `field/border-ai` | `field/value-primary` |
| disabled | `field/bg-disabled` | `field/border-default` | `field/value-disabled` |

**Alias chain (verified against the owner exports, NOT the ticket):** primitives are
`colors/neutral-0/-100/-200/-400/-500/-800`, `colors/Brandblue-50/-600`, `colors/red-50/-500`,
`colors/green-50/-700`, `colors/yellow-50/-400`, `colors/purple-50/-600`.
The ticket's `gray/*` names exist in **no** Agency export.

## What changed since field-type-1 v1.0.0 (drift, all [MEASURED])

1. Renamed `field-set-type1` → `form-field-primary`; height **62 → 66** (header 26 → 30) — kit already fixed (CHANGELOG 3.3.1).
2. Header is now the real `field-header-primary` with required/help/error/AI icons — the old "required marker OFF everywhere" blocker is **resolved**.
3. `disabled` now binds `field/bg-disabled` — the old "no background" defect is **resolved in Figma**.
4. Message rows exist at family level via `field-message` (primary itself still has none — use secondary when a message must show).

## Behavior spec (purpose/actions)

- **Primary** = read-first display. In product flows, entering edit switches the context to a secondary field. `ai` state marks auto-populated values (header AI icon + AI message pattern: "Auto-populated from [source_name]").
- **Secondary** = the editable control; message row appears with validation.
- **Tertiary** = settings row; long description + inline messages live left, control right.
- Help icon opens per-form guidance (tooltip content out of contract).
- No hover state exists on any axis — do not invent one.

## Accessibility

- Input row 30–34px ≥ WCAG 2.5.8 24px floor — PASS.
- Label is a real row: use `<label for>` / `aria-labelledby`.
- Error: `aria-invalid` + `aria-describedby` pointing at the field-message row (now exists in secondary/tertiary).
- Required: `aria-required` + the 8×16 marker (now available via headers).
- Disabled: `disabled` + `aria-disabled`; `readonly` is inert on `<select>` — emit `disabled` there.
- Focus ring beyond the border-colour change: [UNVERIFIED].

## Open items (flagged, not invented)

- `state=ai` master's value copy reads "Warning input value" — Figma-side copy slip.
- Secondary `disabled` is 76px (implies a message row in disabled state) — intended copy unspecified.
- Tertiary stacking under narrow widths: not designed.
- Dark/HC/warm-dark values, icon path data, the 12 "Fields Toys" variants: not measured.

## Ticket reconciliation (C360-47183)

Delivered here at the portal-scoped authority path instead of the ticket's root paths:
the promised `docs/FORM-FIELDS-SYSTEM.md`/`components/form-field-mapping.json` were never
found anywhere; the root `components/component-mapping.json` is legacy (self-declared
fabricated node IDs, different file key) and stays untouched. Angular M3 snippet-writing is
out of DS-lane scope; the structural mat-form-field incompatibility recorded in
field-type-1.md stands.
