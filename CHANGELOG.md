# Changelog

All notable changes to the CareSmartz360 Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.4.0] — 2026-09-10

Q1 tickets **C360-47183** (Form Fields) and **C360-47184** (Page Layout Patterns) delivered — measured live from Figma on 2026-09-10, reconciled against the owner exports, published at the portal-scoped authority paths.

### Added
- **Form Fields family contract 1.0.0** — `portals/agency/components/form-fields.json` / `.md`: all 10 components (field-label · field-header-primary/secondary/tertiary · field-input · field-message · form-section-header · form-field-primary/secondary/tertiary) with measured geometry, per-state token bindings and behavior spec. Key measurements: form-field-primary 360×**66** (rows 30+34, 7 states incl. `ai`); secondary 56/**76** with message row; tertiary 1036×104 horizontal; field-input 34 base / 30 embedded, radius 4, editable border `field/border-hard`; field-message 20h (18h AI).
- **Page Layout Patterns 1.0.0 (Layer 4, draft)** — `portals/agency/patterns/page-layout-patterns.json` / `.md`: the shared shell + 3 Middle-Matter variants (`data-table` 27337:73093 · `empty-state` 27401:30856 · `form-grid` 27401:31504). Measured deltas the ticket diagram missed: pattern 1 runs the **collapsed 48px** nav (patterns 2–3 expanded 158) and page-header is **110 with** filter toolbar vs **68 without**. First entries under `LAYER-4-PATTERN-TEMPLATE-CONTRACT.md` (reference section added there).

### Changed
- **field-type-1 → 1.1.0, SUPERSEDED** by form-fields.json — Figma renamed `field-set-type1` → `form-field-primary` and restructured it (62→**66**, real header component with required/help/AI icons, `field/bg-disabled` now bound — three v1.0.0 defects resolved by drift). File kept as the 2026-08-24 historical measurement.
- `docs/CARESMARTZ360-DS-REFERENCE.md` — Form Field section now points at the portal contract and marks the mat-form-field snippet as a legacy sketch (structural incompatibility stands).

### Second pass (same day) — ticket comments #633267/#633270 incorporated
- **field-message → 6 variants**: new `type=comments` (`27507:56752`, 80×18) — existence + size **re-verified live**; internals (chat icon, gray text) and the AI/comments 80px min-widths recorded as **ASSERTED** pending a live read.
- **field-header-tertiary**: min-width 200 / max-width 400 / FILL / HUG recorded as **ASSERTED** (#633270) with an explicit reconcile flag (at-rest width measured 560 the same morning); tertiary left column documented as the extensible 4px stack (title → description → AI → error → comments-extended, ref frame `27507:56751` asserted).
- The Figma tab closed mid-verification — every unread value is marked, none invented.

### Corrections vs the source tickets (recorded per §"verify, don't trust")
- C360-47183's token table names `gray/200|600|900` primitives — **no `gray/*` exists in any Agency export**; real aliases are `colors/neutral-200|500|800|0` (verified byte-for-byte against `Variables/Agency/Color Modes.zip`).
- The ticket-promised `docs/FORM-FIELDS-SYSTEM.md` (268 lines) and `components/form-field-mapping.json` (214 lines) exist nowhere; this release is the reconciled replacement. The legacy root `components/component-mapping.json` (self-declared fabricated node IDs) stays untouched — the portal contract is the authoritative mapping.

---

## [3.3.1] — 2026-09-09

Component-fidelity corrections from a 7-auditor kit↔contract↔live-Figma audit (18 confirmed defects), all re-verified live with the Agency file open. The copy-from kit (`Universal Html Rules/02-components`, local) was fixed the same day; this entry records the contract-side corrections and the kit changes for the ecosystem.

### Changed
- **Primary Side Navigation → 1.2.0** — collapsed rail corrected: the logo **slot stays 48×102** with a 48×52 white surface top-aligned inside it (slot `27337:73617`, surface `27337:73618`); 1.0.0 recorded the surface as the slot, which lifted the toggle and every icon 50px. Label-only (Icon=No) links measured **36px** (Icon=Yes stays 40). **T4 resolved:** the icon↔section mapping is enumerated in the icon set's variant names (`10883:20899`): Dashboard=grid_view · Client=verified_user · Caregiver=people_alt · Scheduling=pending_actions · Accounting=calculate · Training=model_training · Report=assignment · AI Dashboard=psychology · Other=assignment_ind. Open ruling: the set's assets are Material ICONS while the kit loads Material Symbols.

### Kit (local copy-from CSS — not in this repo; recorded here as the durable broadcast)
- **F-014 fixed:** 21 undefined shorthand custom properties renamed to canonical export tokens; 17 of them (all radius, no fallback) had every rounded corner rendering **square**.
- **Tabs:** `text-decoration: none` (labels rendered with a UA link underline under the intended 2px baseline) + the row now owns its 12px page gutter (page-setup §2).
- **Fields:** editable input border corrected to `field/border-hard` #94A3B8 (live `27062:8093`); `form-field-primary` grew 62 → **66px** (header row 30, live `26938:65991`).
- **Status:** new `.cs-tag` hue modifiers (green/red/yellow/purple) matching the live `Status` component `26535:26277` — 18px uppercase pill, **no dot**; the old `Status/info` dot treatment is marked **LEGACY**. Clinical "Healing" (blue) still has no variant — F-012 stays open.
- **Primary nav:** collapsed logo slot fix (above) + `.cs-pnav__link--label-only` (36px) + new `[CS-COLPANEL-09] .cs-coltrigger` — the "Column(s)" opener is a field-style control, not a Button (`--action-secondary-outlined` is deliberately transparent).

### Notice
- Table rendering: `table.css` is scoped to **real `<table>` elements** (its own §203 warning). Two audit claims against it were my reproduction's div markup, not kit defects — corrected on my side, kit untouched.

---

## [3.3.0] — 2026-09-08

Agency and Caregiver semantic tokens synchronized to the owner's variable exports. The published repo had been behind since 2026-08-24 (Agency) and was 2 values behind the 2026-09-08 Caregiver re-export.

### Added
- **Agency Color Modes: 208 → 220 tokens per mode**, all five modes. 12 new token paths × 5 = 60 definitions: `action/ai/{bg,bg-soft,border,hover,outlined,pressed,text-hard,text-neutral}`, `field/bg-ai`, `field/border-ai`, `field/border-hard`, `status/shift/text`. Agency logical total 251 → 263.

### Changed
- **43 existing token-mode values** brought to the exports: Agency Light 3, Dark Theme 12, High Contrast 25, HC Light 1, Warm Dark 0; **Caregiver High Contrast 2** — `popover/primary-foreground` → `colors/neutral-900` and `popover/secondary-foreground` → `colors/neutral-0`, the Figma-side fixes for a white-on-white and a dark-on-dark popover (Jira C360-44333 #628192, 2026-08-20), which reached the export only in the 2026-09-08 re-export.
- All six token files are **byte-identical** to their owner-export members — copied, never transformed. No token path was deleted.
- `config/variable-export-manifest.json` — six artifacts' `sha256` + `tokenDefinitions` recomputed, Caregiver + Primitives `sourceArchiveSha256` refreshed, `logicalTotals.agencySemantics` 251 → 263.
- `scripts/sync-owner-variable-exports.mjs` — the hard-coded authority path `/Users/netsmartz/Documents/Variables` (absent since the 2026-08-24 move) corrected to `/Users/netsmartz/Documents/Design-System/Variables`; hard-coded total 251 → 263.
- `README.md` — Agency counts 251/208 → 263/220.

### Verified
- All six repo gates pass. `verify:variables` initially **failed** on the stale manifest hashes — caught by the gate, fixed by recomputing from the files, not by editing the expectation.
- Independent re-diff (`Design-System/alignment-2026-09-08/ds_diff_v2.py`) against the exports: **every** local↔GitHub row MATCH; primitives 264/264.

---

## [3.2.1] — 2026-09-08

Live re-verification of measured Figma nodes (the Figma-AI lane had edited them without notice). Contract corrections only.

### Changed
- **Primary Side Navigation → 1.1.0** — adds the link **Hover** state now present in Figma (3 variants `27364:6859 / 27364:7900 / 27364:7908`, bound to `surface/brand-hover`); nav-link variants 6 → 9; defect T1 resolved. **New defect T7:** that token contrasts with the rail text only in Light (5.72:1) and fails Dark / High Contrast / HC Light / Warm Dark (1.0–1.7:1; HC Light icon 1.00:1 = invisible) — proposed a new `sidebar/primary-hover` token (an add, permitted under the naming lock). T3 extended with all-mode figures (HC selected = 1.92:1).
- **Page Setup pattern §4** — the demo page's sample table was re-laid in Figma (115 / 953 / 60 → 200 / 598 / 330; same 1128); grid, gutters and the CS-TBL-13 rule are unchanged. The section is now "Page Layout Patterns" and holds two further pages (`pattern-page-empty-state` 27401:30856, `pattern-page-form-grid` 27401:31504) to be added as variants of this shell.

### Notice
- Figma-side edits to measured nodes (renames, re-layouts, new variants) currently reach no session. Re-verify a contract's nodes live before building from it; report drift through the normal gate.

---

## [3.2.0] — 2026-09-04

Component & pattern contract layer for the **Agency** portal. Every component below
consumes semantic tokens only (no `--p-*` primitives, no hardcoded hex) and holds in
light / dark / high-contrast. This is the shared source other AI tools must build from —
do not reinvent these structures.

### Added — components (Layer 3)
- **Profile Side Navigation** (`portals/agency/components/profile-side-navigation.*`) — the grey record-nav rail: top actions (48h), profile card (70px avatar + camera badge, name/timezone, full-width **View Notes**, 5 contact rows at 18px icons), then the nav list (30px rows, 8px inset). **v1.1.0** adds the card **click model** (Singh, 2026-09-04): *expanded* → every action is individually clickable; *collapsed* → only the avatar shows and the **whole rail** is one tap target that expands the card.
- **Primary Side Navigation** (`primary-side-navigation.*`) — the blue rail, **48 collapsed / 158 expanded**, full height (outermost, left of the header): white logo header (52h), toggle, nav icons (40h; first selected uses `--sidebar-ring`), copyright. Includes a focus-ring WCAG fix (`:focus-visible` → `--sidebar-text`, not `--sidebar-ring`) and selected-icon token wiring (`--sidebar-icon-active`).
- **Tabs** (`tabs.*`) — **Primary** (underline) + **Secondary** (segmented).

### Added — patterns (Layer 4)
- **Side Navigation pattern** (`patterns/side-navigation.md`) — how Primary (blue) and Profile (grey) rails compose and when each is used.
- **Page Setup pattern** (`patterns/page-setup.md`) — the **basic page skeleton** every content page reuses: grid `Primary 48/158 + Shell 1392` → `Global header 52` over `[Profile 240 | Content = shell−240]`, content stack `Tabs → Data container → Page info`, **12px (`--spacing-lg`) gutter** on every content block. Grid reconciles 16/16 by dry-run. **Status: assembled, visual sign-off pending.**

### Changed — header structure (gutter ruling)
- **Page Header** (`page-header.*`) — **v1.1.0**: new **`completeHeader`** molecule that owns a self-contained **12px (`--spacing-lg`) gutter on all four sides** (header left/right margin ruling, Figma node `27232:65833`). The header *atom* stays 0-padding; pages must **not** add page-level padding on top of the complete header.

### Changed — column setting
- **Column Arrangement** (`column-arrangement.*`) — **v2.1.0**: adds the **"Column(s)" trigger button** (field-style, 30px, 4 states: default / hover / active-selected / disabled) that opens the column-setting panel and stays highlighted while it is open. Full behaviour spec (search / check / drag / Apply / Cancel / Reset); frozen column = first row in "Selected", tied to the existing table rule **CS-TBL-13**.
- **Table** (`table.*`) — **v3.0.0**: column-width bands ruled, density settled, **frozen-left + scrollable + frozen-right** structure (CS-TBL-13: first & last columns frozen).

### Verified
- Component CSS token-purity: `validate-design-components-dryrun.sh` — 9 components, semantic tokens only, 0 primitives / 0 hardcoded hex.
- Page-setup grid + 12px gutter: `validate-page-setup-dryrun.sh` — 16/16 sums reconcile against measured Figma.

---

## [3.1.0] — 2026-07-27

### Added
- **Warm Dark theme** (`_theme-warm-dark.scss`): 204 tokens, 180 using direct hex (warm palette), 24 aliased to primitives. ON HOLD for full aliasing.
- **HC Light theme** (`_theme-hc-light.scss`): 204 tokens, all aliased to primitives. WCAG AAA light background high contrast.
- **Typography primitives**: `--line-height-14`, `--line-height-16`, `--line-height-32`, `--line-height-40`, `--line-height-44` added to `_typography.scss`.

### Changed
- **`_theme-light.scss`**: Synced from 187 → 204 tokens. Added `field/bg-success`, `field/border-success`, `field/bg-warning`, `field/border-warning`, `text/links-hover`, `text/links-visited`, `surface/overlay`, `surface/scrim`, `surface/skeleton`, `surface/skeleton-active`, `border/focus`, `action/focus/*`, `action/toggle/*`, `elevation/sm-xl`, `chart/6-10`.
- **`_theme-dark.scss`**: Synced from 185 → 204 tokens. Same missing tokens added.
- **`_theme-high-contrast.scss`**: Synced from 185 → 204 tokens. Same missing tokens added.
- **`_density.scss`**: Fixed `line-height/heading-2` value (28→32px), added missing `line-height/display` (44px), `line-height/caption` (16px), `line-height/micro` (14px), `letter-spacing/heading` (-0.24px).
- **`tailwind.config.js`**: Updated from 128 → 204 token bindings (100% coverage). Version bumped to 2.6.2.
- **`styles.scss`**: Enabled high-contrast import, added warm-dark and hc-light imports.
- **`AI_CONTEXT.md`**: Agency Portal updated to 247 vars across 3 collections.
- **`src/styles/README.md`**: Updated verification statuses, added all 5 theme modes, removed obsolete `VERIFICATION-LOG.md` reference.

### Fixed
- All 5 theme files now have exactly 204 CSS custom properties each (1,020 total declarations).
- Tailwind CSS utilities now cover 100% of design system tokens.
- Typography/density tokens now match Figma Density Modes collection exactly.

---

## [3.0.0] — 2026-07-24

### Added
- **Multi-Portal Support**: Restructured repository architecture to support multi-portal semantic isolation (`portals/agency/`, `portals/caregiver/`).
- **Caregiver Portal Semantic Tokens (`portals/caregiver/semantic-tokens.json`)**: Complete 171 variables across 3 collections (Color Theme 134, Density Modes 23, General 14) extracted directly from Figma file `TSOq0ugv6zfr6gFZh5zYrP`.
- **Caregiver Portal Documentation (`portals/caregiver/README.md`)**: Complete token group breakdown, 3-mode color theme guide, density scale documentation, and known issues.
- **Agency Portal Documentation (`portals/agency/README.md`)**: Agency-exclusive semantic layer reference (204 variables across 5 modes).
- **Repository Guardrails (`GUARDRAILS.md`)**: Enforced scope boundaries, allowed vs prohibited repo content rules, and portal isolation guidelines.
- **Figma Query Hub Integration**: Integrated direct cross-reference to Jira C360-44222 for complex AI Figma queries.

### Changed
- **`README.md`**: Updated with multi-portal architecture overview, portal registry table, 3-tier rules, and portal comparison matrix.
- **`AI_CONTEXT.md`**: Updated with strict portal exclusivity rules, 7 mandatory AI rules, query hub instructions, and data source priorities.

### Removed
- **Obsolete Files (10)**: Deleted legacy handoff docs (`CODEX-HANDOFF-primitives-integration.md`, `HANDOFF-PLAN.md`, `HIGH-CONTRAST-FIGMA-HANDOFF.md`, `REPO-VERIFICATION-2026-07-07.md`, `VERIFICATION-LOG.md`) and outdated version snapshots (`ds-tokens-v2.4.4.json`, `ds-tokens-v2.4.5.json`, `ds-tokens-v2.4.6.json`, `ds-tokens-v2.4.7.json`, `ds-tokens-v2.4.9.json`).

## [2.6.2] — 2026-07-24

### Added
- Agency Density Modes documentation (29 variables: font-size, line-height, spacing, letter-spacing).
- Agency General collection documentation (14 variables: border-radius, font-weight, font-family).
- Warm Dark mode HOLD status documentation (180/204 raw hex values pending warm primitive palette).

### Changed
- **Portal Registry**: Agency total updated from 204 → 247 across 3 collections (Color Modes 204 × 5 modes, Density Modes 29 × 1 mode, General 14 × 1 mode).
- **`portals/agency/README.md`**: Expanded to cover all 3 collections and 247 total variables.

---

## [2.6.0] — 2026-07-20

### Added
- **HC Light mode** — 5th theme mode (white bg, black text, darkened brand colors) for users who need high contrast on light backgrounds
- **20 new semantic tokens:**
  - `surface/overlay`, `surface/scrim` — modal/dialog overlays
  - `border/focus` — dedicated focus ring color (yellow in HC modes)
  - `field/bg-success`, `field/border-success`, `field/bg-warning`, `field/border-warning` — field validation states
  - `text/links-hover`, `text/links-visited` — link interaction states
  - `surface/skeleton`, `surface/skeleton-active` — loading skeleton animations
  - `action/focus/ring`, `action/focus/ring-offset` — focus ring system
  - `action/toggle/*` (11 tokens) — checkbox/switch/radio toggle states
  - `elevation/sm`, `elevation/md`, `elevation/lg`, `elevation/xl` — MD3 tonal elevation scale
  - `chart/6` through `chart/10` — extended chart palette (purple, orange, cyan, forest, light blue)

### Changed
- **Light mode remappings (6):**
  - `action/primary/bg`: Brandblue-500 → Brandblue-600 (better contrast)
  - `action/primary/hover`: Brandblue-600 → Brandblue-700
  - `action/primary/pressed`: Brandblue-700 → Brandblue-800
  - `action/primary/text-hard`: Brandblue-500 → Brandblue-600
  - `action/ghost/text-hard`: Brandblue-600 → Brandblue-800
  - `text/tertiary`: neutral-400 → neutral-500 (WCAG AA fix)
- **Dark mode remappings (16):** Full dark mode audit — button labels, border scale, surface tiers, status backgrounds all corrected to proper Figma primitive aliases
- **Naming cleanup (13 renames):** `action/Toggle/*` → `action/toggle/*` (lowercase), `tool-tip/*` → `tooltip/*`

### Fixed
- Button label contrast in Dark mode — `action/primary/text-neutral` now resolves to neutral-950 (#020617) instead of neutral-0
- `border/subtle` Dark mode — neutral-400 → neutral-500 for better visibility
- `action/disabled/text-neutral` HC mode — neutral-300 → neutral-200 for WCAG compliance
- All status background tokens Dark mode — corrected from wrong -900 to proper -950 primitives

### Verified
- 204 COLOR variables × 5 modes = 1,020 values
- 840 alias references, 0 broken
- Visual QA passed on 7 component pages
- WCAG AA contrast verified for all text/bg pairs

---

## [2.5.0] - 2026-06-30 -- CORRECTED

### **MAJOR CORRECTION:** Angular Material M3 reinstated as primary component library

- **Stack:** Angular 19 + **Angular Material M3 (PRIMARY)** + Tailwind CSS v4 + SCSS
- Added `material-theme-overrides.scss` with complete Material M3 theming
- Updated all documentation to reflect Material M3 priority
- Updated documentation to reflect Material M3 theming approach (--mdc-* CSS custom properties)

---

## [2.4.0] - 2026-06-30

### Breaking Changes
- **Stack Migration**: Removed React, shadcn/ui, and Angular Material dependencies
- **Framework**: Angular 19 standalone components ONLY
- **Styling**: Tailwind CSS + SCSS custom properties only — no CSS-in-JS, no inline styles
- **Icons**: Migrated to Google Material Symbols Rounded (`<span class="material-symbols-rounded">`)
- **Content globs** updated from `{html,ts,jsx,tsx}` to `{html,ts,scss}`

### Added
- Angular 19 standalone component architecture documentation
- SCSS token variable system (`var(--color-*)` custom properties)
- Google Material Symbols Rounded icon library integration
- WCAG AA touch target enforcement (`minHeight.touch: 40px`, `minHeight.touch-lg: 48px`)
- `semantic.icon` token group with `library`, `sizeDefault`, `sizeSm`, `sizeLg`
- `ds-tokens-v2.4.0.json` versioned snapshot
- Shadow token set (sm, md, lg, xl, none) in primitives
- `snapshotOf` metadata field in versioned token files
- Stack metadata field in all token files

### Changed
- `tailwind.config.js`: content paths now target `.scss` instead of `.jsx/.tsx`
- `tailwind.config.js`: removed React/JSX component glob patterns
- All documentation updated to reflect Angular 19 + Tailwind CSS + SCSS stack
- `ds-tokens-latest.json` version bumped to `2.4.0`
- Tailwind `fontFamily` now uses Inter (sans) and JetBrains Mono (mono)
- README badges updated to reflect v2.4.0

### Removed
- React component references from all documentation
- shadcn/ui component references
- Angular Material component references
- PrimeNG references
- CSS-in-JS patterns from guidelines
- JSX/TSX content glob from tailwind.config.js

### Fixed
- Touch target minimum sizes now explicitly enforced via Tailwind `minHeight`/`minWidth`
- Semantic token references consistently use SCSS `var(--color-*)` pattern

---

## [2.3.0] - 2025-01-01

### Added
- Full primitive token set: colors, spacing, typography, radius, shadow, opacity, z-index
- Semantic token layer mapped to primitives (brand, neutral, status, surface, text, border)
- Component-level token mapping for 40+ components
- Tailwind CSS v4 configuration with full token integration
- AI handoff reference documentation
- GitHub Actions workflow for automated version bumping
- Component mapping JSON with Figma node IDs
- Export pipeline documentation

### Changed
- Migrated from scattered color variables to structured primitive/semantic architecture
- Updated typography scale to 13-step fluid system
- Standardized spacing to 8px base grid

### Fixed
- ADA compliance gaps in status colors (WCAG AA 4.5:1 contrast ratios)
- Inconsistent border-radius values across components

---

## [2.0.0] - 2024-06-01

### Added
- Initial design system structure
- Basic color primitives
- Component library foundations

---

## [1.0.0] - 2024-01-01

### Added
- Initial Figma file setup
- Brand color palette
- Typography foundations
