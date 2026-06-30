# CareSmartz360 Design System

> Figma tokens, component map, AI handoff reference, and export pipeline docs

![Version](https://img.shields.io/badge/version-2.4.0-blue)
![Status](https://img.shields.io/badge/status-active-green)
![License](https://img.shields.io/badge/license-private-red)
![Stack](https://img.shields.io/badge/stack-Angular%2019%20%2B%20Tailwind%20CSS%20%2B%20SCSS-blueviolet)

---

## Overview

The CareSmartz360 Design System is a comprehensive, token-driven design system for the CareSmartz360 healthcare product. It provides a single source of truth for design tokens, component specifications, and implementation guidelines used across web and mobile platforms.

**Stack (v2.4.0):** Angular 19 standalone components + Tailwind CSS v4 + SCSS custom properties

---

## Key Features

- **3-Tier Token Architecture** — Primitives → Semantic → Component
- **Figma Integration** — All tokens sourced from Figma Variables
- **Tailwind CSS v4** — Full configuration with design tokens
- **Angular 19 Standalone** — All components use standalone architecture
- **SCSS Token System** — All tokens exposed as CSS custom properties via `var(--color-*)`
- **AI Handoff Ready** — Structured for AI-assisted development
- **Automated Versioning** — GitHub Actions for version bumping
- **ADA Compliant** — WCAG AA (4.5:1) contrast ratios enforced
- **Google Material Symbols Rounded** — Icon library via `<span class="material-symbols-rounded">`

---

## Stack Constraints (v2.4.0)

| Rule | Detail |
|------|--------|
| **Framework** | Angular 19 standalone components ONLY |
| **Styling** | Tailwind CSS + SCSS — no CSS-in-JS, no inline styles |
| **Icons** | Google Material Symbols Rounded only |
| **Prohibited** | React, JSX, shadcn/ui, Angular Material, PrimeNG |
| **Token usage** | Always `var(--color-*)` — never hardcoded hex values |
| **Touch targets** | Minimum 40px (WCAG AA) via `min-h-touch` utility |

---

## Repository Structure

```
caresmartz360-design-system/
├── README.md                      # This file
├── CHANGELOG.md                   # Version history
├── AI-TOOLS-GUIDE.md              # Guide for AI-assisted development
├── CARESMARTZ360-DS-REFERENCE.md  # Full AI handoff reference
├── ds-tokens-latest.json          # Current token export (always latest)
├── ds-tokens-v2.4.0.json          # Versioned token snapshot
├── tailwind.config.js             # Tailwind CSS v4 configuration
├── components/
│   └── component-mapping.json     # Component → Figma node ID map
└── .github/
    └── workflows/
        └── version-bump.yml       # Auto version bump on token changes
```

---

## Token Architecture

### 3-Tier System

```
Primitives (ds-tokens-latest.json)
  └── Raw values: colors, spacing, radius, shadow, typography

Semantic Layer
  └── Named roles: brand.primary, status.error, surface.default, text.primary
  └── Always reference primitives — never hardcode

Component Layer
  └── Component-specific overrides: button.bg, input.border, badge.text
```

### SCSS Usage Pattern

```scss
// ✅ CORRECT — always use semantic token via CSS custom property
.btn-primary {
  background-color: var(--color-brand-primary);
  color: var(--color-text-inverse);
  min-height: var(--spacing-touch); // 40px
}

// ❌ WRONG — never hardcode values
.btn-primary {
  background-color: #2563EB;
  color: #FFFFFF;
}
```

### Tailwind Usage Pattern

```html
<!-- ✅ CORRECT -->
<button class="bg-brand-primary text-text-inverse min-h-touch rounded-lg">
  Save
</button>

<!-- ✅ Icon pattern -->
<span class="material-symbols-rounded text-icon-primary">check_circle</span>
```

---

## Component Map

See [`components/component-mapping.json`](./components/component-mapping.json) for the full Figma node ID map.

Key components tracked:

| Component | Figma Node | Status |
|-----------|-----------|--------|
| Button | 1:100 | Active |
| Input Field | 1:200 | Active |
| Dropdown | 1:300 | Active |
| Badge / Tag | 1:400 | Active |
| Modal / Dialog | 1:500 | Active |
| Data Table | 1:600 | Active |
| Navigation / Sidebar | 1:700 | Active |
| Form | 1:800 | Active |
| Card | 1:900 | Active |
| Toast / Alert | 1:1000 | Active |

---

## Accessibility

- All color pairs meet **WCAG AA** (4.5:1 contrast ratio)
- Focus states use `var(--color-border-focus)` — `#3B82F6`
- Status colors always paired with background for full context
- Minimum touch target: **40×40px** enforced via Tailwind `min-h-touch`
- All interactive components require `aria-` attributes

---

## Versioning

This repo uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- **Current Version:** `2.4.0`
- Version bumps are automated via GitHub Actions (`.github/workflows/version-bump.yml`)
- Each version creates a snapshot: `ds-tokens-v{version}.json`
- `ds-tokens-latest.json` always reflects the current version

---

## Documentation

| Document | Description |
|----------|-------------|
| [CHANGELOG.md](./CHANGELOG.md) | Full version history with breaking changes |
| [AI-TOOLS-GUIDE.md](./AI-TOOLS-GUIDE.md) | Guide for AI-assisted Angular 19 development |
| [CARESMARTZ360-DS-REFERENCE.md](./CARESMARTZ360-DS-REFERENCE.md) | Full AI handoff reference |
| [component-mapping.json](./components/component-mapping.json) | Figma node ID mappings |

---

## Contributing

This repository is maintained by the CareSmartz360 UX team.

1. Export updated tokens from Figma Variables
2. Replace `ds-tokens-latest.json` with new export
3. Push to `main` — GitHub Actions will auto-bump the version
4. Update `CHANGELOG.md` with changes
5. **Never** use React, shadcn/ui, Angular Material, or inline styles
6. All components must be Angular 19 standalone
7. All icons must use `<span class="material-symbols-rounded">`
