# CareSmartz360 Design System — Agency Portal Semantic Layer

This directory contains documentation and assets specific to the **Agency Portal** (Web application).

## Overview

| Metric | Value |
|--------|-------|
| Portal | Agency Portal (Web) |
| Figma File Key | `4bh29laapcuKBTghfaRXF0` |
| Primary Collections | 3 collections (Color Modes, Density Modes, General) |
| Total Variables | **247 variables** |
| Color Modes | 5 (Light, Dark, High Contrast, Warm Dark, HC Light) |
| Cross-Reference | [C360-44253](https://netsmartz.atlassian.net/browse/C360-44253) |

---

## Collections Breakdown (247 Total Variables)

### 1. Color Modes Collection (204 Variables × 5 Modes = 1,020 Values)

#### Theme Modes (5):
1. **Light Mode (Default)**: `:root`, `[data-theme="light"]` — Standard light theme
2. **Dark Theme**: `[data-theme="dark"]` — Modern dark theme with proper primitive aliases
3. **High Contrast**: `[data-theme="high-contrast"]` — WCAG AAA dark background high contrast
4. **Warm Dark**: `[data-theme="warm-dark"]` — Warm earthy dark theme (*ON HOLD for primitive additions*)
5. **HC Light**: `[data-theme="hc-light"]` — WCAG AAA light background high contrast

#### Token Groups (13):
`field` (13), `text` (11), `border` (8), `icon` (9), `action` (52), `surface` (19), `tooltip` (2), `status` (30), `sidebar` (13), `tags` (12), `elevation` (6), `popover` (2), `chart` (10)

---

### 2. Density Modes Collection (29 Variables × 1 Mode "Mode 1")

| Token Name | Type | Value Type | Alias Target | Resolved Value |
| --- | --- | --- | --- | --- |
| `font-size/Display` | FLOAT | alias | `fonts/size/36` | 36 |
| `font-size/heading-1` | FLOAT | alias | `fonts/size/32` | 32 |
| `font-size/heading-2` | FLOAT | alias | `fonts/size/24` | 24 |
| `font-size/heading-3` | FLOAT | alias | `fonts/size/20` | 20 |
| `font-size/heading-4` | FLOAT | alias | `fonts/size/18` | 18 |
| `font-size/heading-5` | FLOAT | alias | `fonts/size/16` | 16 |
| `font-size/body-strong` | FLOAT | alias | `fonts/size/16` | 16 |
| `font-size/body-base` | FLOAT | alias | `fonts/size/14` | 14 |
| `font-size/caption` | FLOAT | alias | `fonts/size/12` | 12 |
| `font-size/micro` | FLOAT | alias | `fonts/size/10` | 10 |
| `line-height/display` | FLOAT | raw | — | 44 |
| `line-height/heading-1` | FLOAT | raw | — | 40 |
| `line-height/heading-2` | FLOAT | raw | — | 32 |
| `line-height/heading-3` | FLOAT | raw | — | 28 |
| `line-height/heading-4` | FLOAT | raw | — | 24 |
| `line-height/body-strong` | FLOAT | raw | — | 24 |
| `line-height/body-base` | FLOAT | raw | — | 20 |
| `line-height/caption` | FLOAT | raw | — | 16 |
| `line-height/micro` | FLOAT | raw | — | 14 |
| `spacing/none` | FLOAT | raw | — | 0 |
| `spacing/xs` | FLOAT | raw | — | 2 |
| `spacing/sm` | FLOAT | raw | — | 4 |
| `spacing/md` | FLOAT | raw | — | 8 |
| `spacing/lg` | FLOAT | raw | — | 12 |
| `spacing/xl` | FLOAT | raw | — | 16 |
| `spacing/2xl` | FLOAT | raw | — | 20 |
| `spacing/3xl` | FLOAT | raw | — | 24 |
| `spacing/4xl` | FLOAT | raw | — | 32 |
| `letter-spacing/heading` | FLOAT | raw | — | -0.24 |

---

### 3. General Collection (14 Variables × 1 Mode "Mode 1")

| Token Name | Type | Value Type | Alias Target | Resolved Value |
| --- | --- | --- | --- | --- |
| `font-weight/body-base` | FLOAT | alias | `fonts/weight/regular-400` | 400 |
| `font-weight/body-strong` | FLOAT | alias | `fonts/weight/medium-500` | 500 |
| `font-weight/heading-base` | FLOAT | alias | `fonts/weight/medium-500` | 500 |
| `font-weight/heading-strong` | FLOAT | alias | `fonts/weight/semibold-600` | 600 |
| `font-family/primary-font` | STRING | alias | `fonts/family/font-family-sans` | Inter |
| `border-radius/rounded-none` | FLOAT | alias | `radius/radius-0` | 0 |
| `border-radius/rounded-sm` | FLOAT | alias | `radius/radius-2` | 2 |
| `border-radius/rounded` | FLOAT | alias | `radius/radius-4` | 4 |
| `border-radius/rounded-md` | FLOAT | alias | `radius/radius-6` | 6 |
| `border-radius/rounded-lg` | FLOAT | alias | `radius/radius-8` | 8 |
| `border-radius/rounded-xl` | FLOAT | alias | `radius/radius-12` | 12 |
| `border-radius/rounded-2xl` | FLOAT | alias | `radius/radius-16` | 16 |
| `border-radius/rounded-3xl` | FLOAT | alias | `radius/radius-24` | 24 |
| `border-radius/rounded-full` | FLOAT | alias | `radius/radius-999` | 9999 |

---

## Active Assets

Root-level artifacts containing Agency Portal token definitions:
- `semantic-tokens.scss` — Prefix-free CSS custom property declarations for all 5 modes
- `ds-tokens-v2.6.0.json` & `ds-tokens-latest.json` — DTCG-format token manifests

---

## Known Issues & HOLD Status

| ID | Issue | Status | Collection |
|---|-------|--------|------------|
| H1 | Warm Dark mode: 180/204 values are raw hex (only 24 aliased) — pending warm primitive palette expansion | **ON HOLD** | Color Modes |
| H2 | Density Modes line-height and spacing: direct values (not aliased to primitives) — 19 tokens total | **NOTED** | Density Modes |

---

## Exclusivity Rule

⚠️ **AGENCY PORTAL EXCLUSIVE**: Tokens in this collection apply **only** to Agency Portal UI components. Never mix or cross-apply these variables to Caregiver Portal screens or components (`portals/caregiver/`).
