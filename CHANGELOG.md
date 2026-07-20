# Changelog

All notable changes to the CareSmartz360 Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
