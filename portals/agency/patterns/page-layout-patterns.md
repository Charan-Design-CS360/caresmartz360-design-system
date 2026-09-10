<!--
=============================================================================
LAYER-4 PATTERN — Page Layout Patterns (Agency portal)

The three documented page-level layouts. All share ONE shell (see
./page-setup.md for the ratified grid); only "Middle Matter" changes.
Measured LIVE 2026-09-10 from section 27337:74297. Machine contract:
./page-layout-patterns.json. Maturity: DRAFT (no attested snapshot yet).

CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira source: C360-47184
=============================================================================
-->

# Page Layout Patterns — Agency (Layer 4)

Jira: **C360-47184** · pattern epic **C360-45159** · shell grid: [page-setup.md](./page-setup.md).

Every Agency content page uses the same skeleton — primary side nav, 52px global
header, 240px user-profile rail, 50px tab row, page header, then **Middle
Matter**, the only region that changes.

## The three patterns (all [MEASURED] 2026-09-10, 1440×900 frames)

| | 1 · data-table | 2 · empty-state | 3 · form-grid |
|---|---|---|---|
| Node | `27337:73093` | `27401:30856` | `27401:31504` |
| Nav state | **collapsed 48** | expanded 158 | expanded 158 |
| Shell / page width | 1392 / 1152 | 1282 / 1042 | 1282 / 1042 |
| Page header | **110** (with filter toolbar) | 68 | 68 |
| Middle Matter | table: 34 header + 30 rows (step 29, shared 1px border), 200 columns, 330 actions column | `empty states` 800×154, inset 12 | 12× `form-field-primary` in a 4×3 grid, cells **254.5×66**, inset 12, no gaps |
| Footer | page-info 136 (message 800×112) | — | — |
| Use case | records/schedules/lists with inline editing | first-run, empty results | demographics, read-first detail |

Two measured corrections to the ticket's shared-shell diagram (recorded as
**states**, not divergences): pattern 1 runs the **collapsed** nav; the page
header is **110 vs 68** depending on the filter toolbar.

## Component dependencies (all portal-scoped)

`primary-side-navigation` · `profile-side-navigation` · `tabs` · `page-header`
· `table` + `filters` + `column-arrangement` (pattern 1) · `empty-states`
(pattern 2) · `form-fields` → form-field-primary (pattern 3). Contracts in
`portals/agency/components/`.

## Rules

- Middle Matter content insets are **12px** (`spacing/lg`).
- Compose only Agency components + shared primitives — never Caregiver/Staff (portal isolation).
- Responsive/breakpoint behaviour is **UNVERIFIED** — the frames are desktop 1440×900 only.

## Maturity: draft

Per `docs/LAYER-4-PATTERN-TEMPLATE-CONTRACT.md`: no attested Figma snapshot and
no adopted product flow yet. Promotion to *reviewed/pilot* needs Singh's visual
sign-off + one real flow.
