<!--
=============================================================================
COMPONENT CONTRACT — Fields type 2 / SECONDARY (Agency portal)
The EDIT-mode form field: header + bordered input + validation message.
Measured LIVE 2026-09-10. Machine contract: ./field-type-2.json.
Family: field-type-1 (view) · field-type-2 (edit) · field-type-3 (settings).
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira: C360-47325
=============================================================================
-->

# Fields type 2 (SECONDARY) — Agency component contract

Jira: **C360-47325** · set `27062:7663` · atoms in [field-atoms.md](./field-atoms.md) · family
index [form-fields.md](./form-fields.md) · guidelines `27401:30526`.

**Purpose:** the editable field for popups, forms and modals — label above a bordered input,
message row on validation states. View-mode counterpart: [field-type-1](./field-type-1.md);
settings counterpart: [field-type-3](./field-type-3.md).

## Measured geometry (2026-09-10)

- 360×**56** (default, focus) · 360×**76** (error, success, warning, disabled — message row shows).
- Rows, no gaps: `field-header-secondary` 26 → `field-input` embed **30** → optional `field-message` **20**.
- 360 = variant width; treat as 100% of parent.

## Variant nodes

default `27062:7664` · focus `27062:7669` · error `27062:7674` · success `27062:7679` ·
warning `27062:7684` · disabled `27062:7689`.

## field-header-secondary `27388:29316` (atom, 186×26)

`field-label` instance (x0 y5, 160×16) + right AI icon 18×18 (x168 y4). Required marker and help
icon ride on field-label.

## States → tokens

Input row binds `field/bg-<state>` + `field/border-<state>` (danger pair = error); message type
matches the state. Full map + verified alias chain (`colors/neutral-*` — no `gray/*` exists):
[field-atoms.md](./field-atoms.md) and [form-fields.md](./form-fields.md).

## Behavior

The editable control. A primary (view) field switches to this on edit in product flows. Message
row appears with validation.

## Open items (flagged, not invented)

- disabled is 76px — a message row in disabled state is implied, its copy unspecified.
- No hover state exists on the axis.
- Non-Light modes and the focus ring beyond border-colour: not measured.
