# CareSmartz360 Design System

> Figma tokens, component map, AI handoff reference, and export pipeline docs

![Version](https://img.shields.io/badge/version-2.5.0-blue)
![Status](https://img.shields.io/badge/status-active-green)
![License](https://img.shields.io/badge/license-private-red)
![Stack](https://img.shields.io/badge/stack-Angular%2019%2BAngular%20Material%20M3%2BTailwind%20CSS-blueviolet)

---

## Overview

The CareSmartz360 Design System is a comprehensive, token-driven design system for the CareSmartz360 healthcare product. It provides a single source of truth for design tokens, component specifications, and implementation guidelines used across web and mobile platforms.

**Stack (v2.5.0):** Angular 19 standalone components + **Angular Material M3** (PRIMARY) + Tailwind CSS v4 + SCSS custom properties

---

## Key Features

- **3-Tier Token Architecture** — Primitives → Semantic → Component
- **Figma Integration** — All tokens sourced from Figma Variables
- **Tailwind CSS v4** — Full configuration with design tokens
- **Angular 19 Standalone** — All components use standalone architecture
- **Angular Material M3** — Primary component library with CSS custom property overrides
- **SCSS Token System** — All tokens exposed as CSS custom properties via `var(--color-*)`
- **AI Handoff Readiness** — Structured for AI-assisted development
- **Automated Versioning** — GitHub Actions for version bumping
- **ADA Compliant** — WCAG AA (4.5:1) contrast ratios enforced
- **Google Material Symbols Rounded** — Icon library via `<span class="material-symbols-rounded">`

---

## Stack Details (v2.5.0 — CORRECTED)

| Layer | Technology | Priority |
|-------|-----------|----------|
| Framework | Angular 19 (standalone components) | Required |
| **Component Library** | **Angular Material M3** | **PRIMARY — use on priority** |
| Utility CSS | Tailwind CSS | Layout, spacing utilities |
| Component Styling | SCSS + CSS custom properties | Token-based overrides |
| Icons | Google Material Symbols Rounded | Required |
| Fonts | Inter (base), JetBrains Mono (code) | Required |
| ❌ Prohibited | React, Next.js, Vue, shadcn/ui, PrimeNG | Never use |
| ❌ Prohibited | Hardcoded hex values, inline styles | Never use |

---

## Installation

### 1. Install Dependencies

```bash
npm install @angular/material @angular/cdk
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2. Import Angular Material M3

```typescript
// app.config.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {
  providers: [
    provideAnimationsAsync()
  ]
};
```

### 3. Add Material Theme Overrides

```scss
// styles.scss
@import '_material-theme-overrides.scss';
```

### 4. Add Fonts & Icons

```html
<!-- index.html -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
```

### 5. Configure Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      // Use for layout only — colors/spacing from SCSS tokens
    }
  }
}
```

---

## Quick Start

### Button Component (Angular Material M3)

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-flat-button color="primary" class="cs-button">
      <mat-icon fontSet="material-symbols-rounded">check</mat-icon>
      <span>Save Changes</span>
    </button>
  `,
  styleUrl: './demo.component.scss'
})
export class DemoComponent {}
```

```scss
// demo.component.scss
.cs-button {
  min-height: 40px;
  border-radius: var(--radius-lg) !important;
  font-family: var(--font-family-primary);
}
```

---

## Token Usage

### SCSS Tokens (PRIMARY METHOD)

```scss
.card {
  background: var(--surface-base);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  color: var(--text-primary);
}
```

### Tailwind (LAYOUT ONLY)

```html
<div class="flex gap-md items-center">
  <span>Layout utilities only</span>
</div>
```

---

## Project Structure

```
caresmartz360-design-system/
├── design-tokens/
│   ├── agency-semantic-layer.md
│   └── agency-styles.scss
├── components/               (future)
├── ds-tokens-v2.5.0.json
├── ds-tokens-latest.json
├── tailwind.config.js
├── _material-theme-overrides.scss  (NEW in v2.5.0)
├── CARESMARTZ360-DS-REFERENCE.md
├── AI-TOOLS-GUIDE.md
├── CHANGELOG.md
└── README.md
```

---

## Material M3 Override Pattern

All Angular Material components are themed via CSS custom properties, NOT via the M3 theme object:

```scss
// _material-theme-overrides.scss
.mat-mdc-button.mat-primary {
  --mdc-filled-button-container-color: var(--action-primary-bg);
  --mdc-filled-button-label-text-color: var(--action-primary-text-neutral);
}

.mat-mdc-form-field {
  --mdc-outlined-text-field-outline-color: var(--field-border-default);
  --mdc-outlined-text-field-focus-outline-color: var(--field-border-focus);
}
```

---

## Documentation

- **[CARESMARTZ360-DS-REFERENCE.md](./CARESMARTZ360-DS-REFERENCE.md)** — Complete AI handoff reference
- **[AI-TOOLS-GUIDE.md](./AI-TOOLS-GUIDE.md)** — AI code generation patterns
- **[CHANGELOG.md](./CHANGELOG.md)** — Version history
- **[design-tokens/agency-semantic-layer.md](./design-tokens/agency-semantic-layer.md)** — Agency Portal tokens

---

## Versioning

This project uses semantic versioning via GitHub Actions:

```bash
git commit -m "feat: add new component"
git push origin main
# Triggers version-bump.yml workflow
```

**Current Version:** 2.5.0 (Angular Material M3 reinstated as primary)

---

## License

Private — CareSmartz360 Internal Use Only

---

## Changelog

### v2.5.0 (2026-06-30) — CORRECTED

- **MAJOR CORRECTION:** Angular Material M3 reinstated as primary component library
- Added `_material-theme-overrides.scss` with complete Material M3 theming
- Updated all documentation to reflect Material M3 priority
- Stack: Angular 19 + **Angular Material M3** (PRIMARY) + Tailwind CSS + SCSS

### v2.4.0 (2026-06-30)

- Added Agency Portal semantic layer (140+ tokens, Light/Dark themes)
- Real Figma variables from `Agency DS (v1)` file
- Created `design-tokens/agency-semantic-layer.md`
- Created `design-tokens/agency-styles.scss`

### v2.3.0 (2026-06-29)

- Initial AI-consumable manifest published
- 3-tier token architecture established

---

**Maintained by:** Singh, Senior UX/UI Consultant  
**Repository:** github.com/Charanjeetsingh360/caresmartz360-design-system  
**Stack:** Angular 19 + Angular Material M3 (PRIMARY) + Tailwind CSS + SCSS
