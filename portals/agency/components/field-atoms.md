<!--
=============================================================================
COMPONENT CONTRACT — Field Atoms (Agency portal)
The shared building blocks used by all three field types: field-label,
field-header-primary, field-input, field-message. Measured LIVE 2026-09-10
(morning pass + afternoon re-verification after Figma-side changes).
Machine contract: ./field-atoms.json · Family index: ./form-fields.md
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira: C360-47325
=============================================================================
-->

# Field Atoms — Agency component contract

Jira: **C360-47325** · family index [form-fields.md](./form-fields.md) · guidelines frame `27401:30526`
([open](https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/?node-id=27401-30526)).

## field-label `27062:10162` (sub-atom, 158×16)
Fields/label 12/16 Medium `text/primary` + optional required marker (8×16 slot, 8×8 icon,
`icon/danger`) + optional help icon (16×16, `icon/brand`); gaps 4 (`spacing/sm`).

## field-header-primary `27388:28274` (atom, 358×30)
Label cluster left (inset 8) + right icon rail: error 18 / help 18 / AI 18, gaps 4.
Used only by form-field-primary ([field-type-1.md](./field-type-1.md)).

## field-input `27062:8145` (atom, 6 states)
- Base variants 358×**34**; embedded at **30** in field-type-2, **34** in field-type-3.
- Text inset 8 (`spacing/md`); trailing 30×30 control slot ("Fields Toys"); radius **4** (`border-radius/rounded`).
- Editable default border = `field/border-hard` #94A3B8; container/read-only border = `field/border-default` #E2E8F0.
- States bind `field/bg-<state>` + `field/border-<state>` (danger pair = error state).
- Variant nodes: default `27062:8093` · focus `27062:8066` · error `27062:8075` · success `27062:8084` · warning `27062:8155` · disabled `27062:8164`.
- Tertiary min-width 120 / max-width 400: **ASSERTED** (ticket #633283) — auto-layout props not machine-readable this pass.

## field-message `11116:25116` (atom, **6 types** — changed in Figma 2026-09-10 PM, re-verified live)

**What changed:** typography **Body/micro 10/14 → caption 12/16** on ALL variants; every variant
now **20px** tall; new 6th variant `type=comments`.

| type | node | w | icon (16 box) | text token | copy |
|---|---|---|---|---|---|
| Error | `11116:24791` | 138 | warning · `icon/danger` | `text/danger` #dc2626 | "This field is required." |
| Help | `16549:388669` | 115 | info · `icon/soft` | `text/secondary` #475569 | "Field information" |
| Warning | `16549:388678` | 185 | warning · `icon/warning` | `text/warning` #ca8a04 | "This is the warning message." |
| Success | `11116:25115` | 185 | task_alt · `icon/success` | `text/success` #16a34a | "Field validation is successful." |
| AI autopopulated | `27291:41761` | 225 | AI-Sparkle (14 button) · `action/ai/text-hard` | `text/secondary` | "Auto-populated from [source_name]" |
| **comments** | `27507:56752` | 93 | mark_unread_chat_alt | **`text/links` #0077ff → colors/Brandblue-600** (alias verified vs export) | "0 Comments" |

Shared: icon-text gap 4 (`spacing/sm`), block padding 2 (`spacing/xs`). AI + comments additionally:
min-width **80**, radius **4**, centered content.

**Figma-side bugs (flagged, not fixed here):** the comments variant's *description* is a copy-paste
of the AI text; no hover/visited link states are bound (`text/links-hover`/`-visited` exist in the
exports but are unused).

## Not verified
field-label afternoon re-read · field-input tertiary min/max · Fields-Toys variants · non-Light modes · icon path data.
