<!--
=============================================================================
COMPONENT CONTRACT — Fields type 3 / TERTIARY (Agency portal)
The SETTINGS-mode field: info column left, input right, responsive wrap.
Measured LIVE 2026-09-10 AFTERNOON — after the same-day Figma restructure;
supersedes all morning numbers. Machine contract: ./form-field-tertiary.json.
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira: C360-47325
=============================================================================
-->

# Fields type 3 (TERTIARY) — Agency component contract

Jira: **C360-47325** · molecule `27395:30147` · atoms in [field-atoms.md](./field-atoms.md) ·
family index [form-fields.md](./form-fields.md) · guidelines `27401:30526` · left-section
reference `27507:56751`.

**Purpose:** settings/configuration rows — a rich info column on the left (title, description,
AI note, error, comments) beside the input control on the right, wrapping to a stack on narrow
containers.

## form-field-tertiary `27395:30147` (molecule) — measured 2026-09-10 PM

- **1036×112** at rest; root VERTICAL, padding **12** (`spacing/lg`), 1px `field/border-default`, transparent bg.
- `group1` (1012×88): header column + input column, **gap 12**; input column vertically centered.
- **Header column** = `field-header-tertiary` Size=M instance, **400×88**, **min 200 / max 400, FILL/HUG** — the min/max read live from design context.
- **Input column** = `field_info` (600×34, item gap 8) holding `field-input` 400×34.
- **Responsive:** group1 wraps to a vertical stack below ~**462px** (200 measured + 12 measured + 250 **asserted**). The WRAP flag and the 250/120/400 input minima come from ticket #633283 and are marked **ASSERTED** — re-verify before building responsive behaviour.

## field-header-tertiary `27290:41702` (atom, S/M/L) — all at 400w, min 200 / max 400

| Size | node | h | title | description | arithmetic |
|---|---|---|---|---|---|
| S | `27290:41703` | **82** | Fields/label 12/16 | Body/micro 10/14 | 16+4+14+4+20+4+20 |
| M | `27290:41707` | **88** | Fields/header 14/20 | Body/small 12/16 | 20+4+16+4+20+4+20 |
| L | `27290:41714` | **92** | Fields/header-large 16/24 | Body/small 12/16 | 24+4+16+4+20+4+20 |

Row gap 4 (`spacing/sm`); title `text/primary`, description **`text/secondary`** (live-verified —
the morning DERIVED guess of field/value-placeholder was wrong). Boolean props: showMandatory,
showDescription, showAiInfo, errorMessage.

## The left stack (reference frame `27507:56751`, 400×112, measured)

title → description → AI message (20h) → error message (20h) → **field-comment** (92×20:
chat icon 16 + "2 Comments" 12/16 **`text/links`** #0077FF). Item 5 is today a **manual frame**,
not yet an instance of `field-message type=comments` — flagged for Figma-side cleanup.
Extensibility rule: new rows = icon 16 + caption text, gap 4, semantic colour.

## form-section-header `27395:30130` (atom) — REBUILT in Figma 2026-09-10

- Now **1036×64**: padding 12 + a real `field-header-tertiary` Size=M instance (1012×40, title+description only). Was 80px with a hand-built frame.
- Background **`surface/tertiary`** #F1F5F9 and border **`field/border-default`** #E2E8F0 — **live-verified; the ticket's "light blue / darker blue" description is wrong** (same gray tokens as before).
- Usage: one per logical section, above its run of form-field-tertiary rows.

## Open items (flagged, not invented)

- WRAP flag + field_info/input min-max widths: ASSERTED (#633283), pending a live constraint read.
- field-comment as a manual frame duplicating the comments variant — Figma-side cleanup candidate.
- `27395:29530` (Design Structure and Patterns frame) not read.
- Non-Light modes not measured.
