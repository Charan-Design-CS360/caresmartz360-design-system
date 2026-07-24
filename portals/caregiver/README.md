# CareSmartz360 Design System — Caregiver Portal Semantic Layer

This directory contains documentation and assets specific to the **Caregiver Portal** (Web + Mobile App).

## Overview

| Metric | Value |
|--------|-------|
| Portal | Caregiver Portal (Web + Mobile) |
| Figma File Key | `TSOq0ugv6zfr6gFZh5zYrP` |
| Primary Collection | `Color Theme` |
| Total Variables | 171 variables (134 Color + 23 Density + 14 General) |
| Color Modes | 3 (Light Mode Default, Soothing Dark, High Contrast) |
| Density Modes | 3 (Default, Large, Small) |
| Cross-Reference | [C360-44333](https://netsmartz.atlassian.net/browse/C360-44333) |

## Collections Breakdown

### 1. Color Theme (134 Variables × 3 Modes)
- **Light Mode (Default)**: Standard light theme for caregiver workflow
- **Soothing Dark**: Calming dark mode for nighttime shift management
- **High Contrast**: WCAG AAA high contrast theme

#### Token Groups:
- `action` (38): Button states (primary, secondary, soft, ghost, destructive, attention, warning, disabled)
- `fields` (17): Input backgrounds, borders, values, icons
- `surface` (16): Page backgrounds, overlays, brand surfaces, status backgrounds
- `tags` (13): Tag foreground + background per color
- `sidebar` (12): Navigation sidebar backgrounds, text, icons, accents
- `text` (10): Primary, secondary, brand, links, status text
- `border` (8): Border strengths, brand, status
- `icon` (8): Icon colors by context
- `status` (8): Shift, meeting status colors + backgrounds
- `popover` (4): Popover primary + secondary bg/foreground

### 2. Density Modes (23 Variables × 3 Modes)
- `font-size` (9): heading-1 through micro — aliased to `fonts/size/*` primitives
- `spacing` (8): none through 3xl — responsive spacing per density mode
- `line-height` (6): Heading & body line heights per density mode
- **Modes**: Default, Large (Comfortable accessibility), Small (Compact data-dense)

### 3. General (14 Variables × 1 Mode)
- `radius` (9): rounded-none through rounded-full — aliased to `radius/*` primitives
- `font-weight` (4): body-base through heading-strong — aliased to `fonts/weight/*` primitives
- `font-family` (1): Primary font — aliased to `fonts/family/font-family-sans`

## Active Assets

- `semantic-tokens.json` — DTCG format manifest containing all 171 Caregiver semantic variables across all 3 collections and modes

## Known Notes & Issues

| ID | Note | Status |
|----|------|--------|
| N1 | Density Modes spacing values are direct per density mode | NOTED |
| N2 | Density Modes line-height values are direct per density mode | NOTED |
| N3 | Caregiver uses a streamlined 3-mode color system (No Warm Dark / HC Light) | BY DESIGN |
| N4 | Density Modes features 3 responsive layout modes (Default / Large / Small) | BY DESIGN |
| N5 | Caregiver uses 8 focused status tokens | BY DESIGN |
| N6 | All 134 color values cleanly alias to Tier 1 Primitives (0 broken / 0 raw hex) | CLEAN |

## Exclusivity Rule

⚠️ **CAREGIVER PORTAL EXCLUSIVE**: Tokens in this directory apply **only** to Caregiver Portal web and mobile UI components. Never mix or cross-apply these variables to Agency Portal screens (`portals/agency/`).
