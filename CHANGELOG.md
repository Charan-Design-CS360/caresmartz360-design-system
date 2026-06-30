# Changelog

All notable changes to the CareSmartz360 Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
