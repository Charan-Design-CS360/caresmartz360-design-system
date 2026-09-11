<!--
=============================================================================
FAMILY INDEX — Form Fields (Agency portal) · v2.0.0
1.0.0 carried every measurement in one file; 2.0.0 is the INDEX after the
per-type split C360-47325 asked for. Detail lives in the member contracts —
no measured value is kept in two places. Machine index: ./form-fields.json.
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira: C360-47183 + C360-47325
=============================================================================
-->

# Form Fields — Agency family index

Section `26955:66554` · guidelines `27401:30526` · measured live 2026-09-10 (morning + evening
re-verification after same-day Figma changes).

## The three field types → member contracts

| | PRIMARY | SECONDARY | TERTIARY |
|---|---|---|---|
| Purpose | **view/display** | **edit/input** | **settings/config** |
| Context | grids, tables, lists | popups, forms, modals | settings panels |
| Height | 66 | 56 / 76 with message | 112 at rest (HUG) |
| Contract | [form-field-primary.md](./form-field-primary.md)¹ | [form-field-secondary.md](./form-field-secondary.md) | [form-field-tertiary.md](./form-field-tertiary.md) |

**Shared atoms** (field-label, field-header-primary, field-input, field-message incl. the new
`comments` type): [field-atoms.md](./field-atoms.md).

¹ **2.0.0 as of 2026-09-11** — a live contract carrying the measured **66px** (7 states, 360×66).
Until then the repo shipped only the superseded **62px** record under the old `field-type-1` name;
that record is kept for provenance at
[form-field-primary-2026-08-24-historical.md](./form-field-primary-2026-08-24-historical.md).

## Hierarchy

`field-label` → headers (`field-header-primary/-secondary/-tertiary`) + shared `field-input`,
`field-message`, `form-section-header` → molecules `form-field-primary` `26938:65997` ·
`form-field-secondary` `27062:7663` · `form-field-tertiary` `27395:30147`.

## Shared token chain (verified vs the owner exports — never the tickets' `gray/*`)

`field/*` semantics alias `colors/neutral-0/-100/-200/-400/-500/-800`, `colors/Brandblue-50/-600`,
`colors/red-*`, `colors/green-*`, `colors/yellow-*`, `colors/purple-*`; the comments link uses
`text/links` → `colors/Brandblue-600`. Full table: [form-fields.json](./form-fields.json).
Typography: Fields/label 12/16 M · Fields/value 12/16 · Fields/header 14/20 M ·
Fields/header-large 16/24 M · Body/small 12/16 · Body/micro 10/14 (Size=S descriptions only).

## Drift log

1. **Pre-2026-09-10:** field-set-type1 → form-field-primary (62→66, real header with
   required/help/AI, disabled bg bound) — three 1.0.0 defects resolved. See the form-field-primary 2.0.0 banner.
2. **2026-09-10 afternoon:** field-message 10/14 → **12/16**, all variants 20h, new
   **type=comments**; field-header-tertiary min 200/max 400 (400w, 82/88/92);
   form-field-tertiary 1036×112; form-section-header rebuilt 80→**64**. All re-measured live the
   same evening. Two ticket claims failed verification and are recorded as corrections
   ("light blue" section-header fill → actually `surface/tertiary`; 10px comments text →
   self-corrected to 12px by #633284).

## Standing corrections to the source tickets

`gray/*` primitives exist in no export · the root `docs/FORM-FIELDS-SYSTEM.md` /
`components/form-field-mapping.json` never existed (these portal contracts are the replacement,
indexed by both component-mapping files) · Angular M3 snippets stay out of DS-lane scope.
