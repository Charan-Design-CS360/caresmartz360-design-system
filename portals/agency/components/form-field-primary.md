<!--
=============================================================================
COMPONENT CONTRACT — form-field-primary (Agency portal) · v2.0.0
The VIEW-mode form field: label row above a value row, inside one border.
Measured LIVE 2026-09-10; independently re-measured by Antigravity the same day.
Machine contract: ./form-field-primary.json
Renamed 2026-09-11 from field-type-1 ("Fields type 1") to match Figma.
Superseded 2026-08-24 record: ./form-field-primary-2026-08-24-historical.md
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira: C360-47183 + C360-47325
=============================================================================
-->

# form-field-primary — Agency component contract

Set `26938:65997` · section `26955:66554` · guidelines `27401:30526` ·
family index [form-fields.md](./form-fields.md) · atoms [field-atoms.md](./field-atoms.md).

> **⚠️ What changed in 2.0.0 — read this before building.** The repo shipped **62px** for this
> component from 2026-08-24 until today. Figma restructured it (header row **26 → 30**), making the
> live component **66px**. The old file was marked "superseded" on 2026-09-10 but *never carried the
> corrected numbers*, so the only machine-readable height in the repo stayed wrong. Anything built
> from the old contract is 4px short. **66 is correct.**

**Purpose:** read-first display field for data grids, tables and list views. The value row has no
input border of its own — the state colour lives on the container. Edit-mode counterpart:
[form-field-secondary](./form-field-secondary.md); settings counterpart:
[form-field-tertiary](./form-field-tertiary.md).

## Measured geometry (2026-09-10, all 7 variants)

| Property | Value | Token |
|---|---|---|
| Size | **360 × 66** (all 7 variants) | — |
| Grid rows | **30** (header) + **34** (value) | — |
| Arithmetic | 1 + 30 + 34 + 1 = **66** | — |
| Header | `field-header-primary` `27388:28274` instance, 358 × 30 | — |
| Value row | 358 × 34, text inset **8**, text box 20 | `spacing/md` |
| Padding | 0 | `spacing/none` |
| Border | 1px solid, inside-aligned | per state |
| Radius | 0 | `border-radius/rounded-none` |

360 is the variant's own width — treat as 100% of parent (`pattern-page-form-grid` instances it at
254.5px).

## States → tokens (7; structure identical, token swap only)

| state | node | bg | border | value text |
|---|---|---|---|---|
| default | `26938:65991` | `field/bg-default` | `field/border-default` | `field/value-placeholder` |
| focus | `26938:65992` | `field/bg-focus` | `field/border-focus` | `field/value-primary` |
| error | `26938:65993` | `field/bg-danger` | `field/border-danger` | `field/value-primary` |
| success | `26938:65994` | `field/bg-success` | `field/border-success` | `field/value-primary` |
| warning | `26938:65995` | `field/bg-warning` | `field/border-warning` | `field/value-primary` |
| **ai** | `27079:10664` | `field/bg-ai` | `field/border-ai` | `field/value-primary` |
| disabled | `26938:65996` | `field/bg-disabled` | `field/border-default` | `field/value-disabled` |

Figma's generated docs claim **6** variants and omit `state=ai` — the 7 above are measured from the
set's own children. Trust the nodes, not the prose.

## Two old defects are now RESOLVED (do not carry them forward)

1. **"Required marker and help icon are OFF in all 7 variants"** — Figma replaced the hand-built
   header with the real `field-header-primary` component, which carries required / help / error / AI
   icon slots.
2. **"disabled emits no background"** — `field/bg-disabled` is now bound.

## Typography

Label `Fields/label` Inter Medium 12/16 `text/primary` · value `Fields/value` Inter Regular 12/16.
Figma's prose claims line-height 120% / letter-spacing −0.24px; the bound variables say 16 and 0
(120% of 12 = 14.4, not 16). **The bindings win.**

## Behavior

Display-mode field; entering edit switches the context to `form-field-secondary`. The `ai` state
marks auto-populated values and pairs with the header's AI icon plus an AI `field-message`.
**No hover state exists** on the axis — building one would be an invention.

## Accessibility

Value row 34px ≥ the WCAG 2.5.8 24px floor. The label is a real row — use `<label for>` /
`aria-labelledby`. Required uses `aria-required` + the header marker. Disabled: `disabled` +
`aria-disabled` (`readonly` is inert on `<select>` — emit `disabled` there). **Error is the gap:**
this component has no message row, so `aria-describedby` has nothing to point at — use
`form-field-secondary` when a message must show.

## Implementation risk (HIGHEST — unchanged)

A Material `mat-form-field appearance="outline"` **cannot** produce this layout: Material floats the
label into a notch that interrupts the top border; this component keeps a static full-width label
row inside an unbroken border. Different structures, not different skins — no token override
converts one into the other. Decide custom-build vs redraw before any implementation diff.

## Open items (flagged, not invented)

- `state=ai` sample copy reads "Warning input value" — Figma-side copy slip (`27079:10668`).
- No message row on this component; no hover state.
- Dark / high-contrast / warm-dark / hc-light values, focus-ring intent, textarea behaviour, and the
  12 "Fields Toys" trailing-control variants: not measured.
