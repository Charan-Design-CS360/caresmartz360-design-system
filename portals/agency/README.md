# CareSmartz360 Design System — Agency Portal Semantic Layer

This directory contains documentation and assets specific to the **Agency Portal** (Web application).

## Overview

| Metric | Value |
|--------|-------|
| Portal | Agency Portal (Web) |
| Figma File Key | `4bh29laapcuKBTghfaRXF0` |
| Variable Collection | `Color Modes` |
| Total Variables | 204 COLOR variables |
| Theme Modes | 5 (Light, Dark, High Contrast, Warm Dark, HC Light) |
| Total Declarations | 1,020 (204 × 5) |
| Cross-Reference | [C360-44253](https://netsmartz.atlassian.net/browse/C360-44253) |

## Theme Modes (5)

1. **Light Mode (Default)**: `:root`, `[data-theme="light"]` — Standard light theme
2. **Dark Theme**: `[data-theme="dark"]` — Modern dark theme with proper primitive aliases
3. **High Contrast**: `[data-theme="high-contrast"]` — WCAG AAA dark background high contrast
4. **Warm Dark**: `[data-theme="warm-dark"]` — Warm earthy dark theme (*ON HOLD for primitive additions*)
5. **HC Light**: `[data-theme="hc-light"]` — WCAG AAA light background high contrast

## Active Assets

Root-level artifacts containing Agency Portal token definitions:
- `semantic-tokens.scss` — Prefix-free CSS custom property declarations for all 5 modes
- `ds-tokens-v2.6.0.json` & `ds-tokens-latest.json` — DTCG-format token manifests

## Exclusivity Rule

⚠️ **AGENCY PORTAL EXCLUSIVE**: Tokens in this collection apply **only** to Agency Portal UI components. Never mix or cross-apply these variables to Caregiver Portal screens or components (`portals/caregiver/`).
