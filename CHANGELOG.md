# Changelog

All notable changes to the CareSmartz360 Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
