# CareSmartz360 Design System — AI Handoff Reference

**Version:** 2.5.0  
**Figma File:** `$-Primitives (CS360) V2.0` (**ID:** `DJBpjoXPMEw6bBAByIQaAy`)  
**Last Updated:** 2026-06-30  
**Stack:** Angular 19 + **Angular Material M3** + Tailwind CSS + SCSS

---

## Overview

This document serves as the authoritative reference for AI-assisted development, design handoff, and component implementation for the CareSmartz360 product design system.

**Stack (v2.5.0 CORRECTED):**

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

### How the layers work together

```
Angular Material M3
  → provides: component structure, accessibility, interaction patterns
  → override: theming via CSS custom properties (not M3 theme object)

Tailwind CSS
  → provides: layout (flex, grid, gap), display utilities
  → do NOT use for color/spacing/radius — use tokens instead

SCSS + CSS custom properties
  → provides: all token-based values (color, spacing, radius, shadow)
  → maps Figma variables → --css-custom-properties

Rule: Tailwind for layout. SCSS tokens for visual styling. Angular Material for components.
```

---

## Token Architecture

### Layer 1: Primitives

Foundational raw values. Never reference primitives directly in components — always use semantic tokens.

| Category | Example Token | Value |
|----------|---------------|-------|
| Color | `primitives.colors.blue.600` | `#0077FF` *(corrected 2026-07-08 — verified against live Figma "Brandblue" collection; was `#2563EB`, which turned out to be Tailwind's stock default, not a real CareSmartz360 color — see `VERIFICATION-LOG.md`)* |
| Spacing | `primitives.spacing.4` | `16px` |
| Typography | `primitives.typography.fontSize.base` | `14px` |
| Radius | `primitives.radius.md` | `4px` |
| Shadow | `primitives.shadow.md` | `0 4px 6px rgba(0,0,0,0.1)` |

### Layer 2: Semantic Tokens

Meaning-based tokens referencing primitives.

| Token | References | Usage |
|-------|------------|-------|
| `semantic.brand.primary` | `blue.600` → `#0077FF` (verified) | Primary CTA buttons |
| `semantic.brand.hover` | `blue.700` → `#005CE6` (verified) | Button hover state |
| `semantic.brand.disabled` | `gray.300` | Disabled interactive elements |
| `semantic.status.success` | `green.600` | Success states, positive feedback |
| `semantic.status.warning` | `yellow.500` | Warning states, caution |
| `semantic.status.error` | `red.600` | Error states, destructive actions |
| `semantic.status.info` | `blue.700` | Info states |
| `semantic.text.primary` | `gray.00` | Disabled text |
| `semantic.surface.default` | `white` | Main content areas |

---

## Angular Material M3 Theme Setup

Angular Material M3 is the **primary component library**. Override its CSS custom properties using CareSmartz360 token values.

### Installation

```bash
npm install @angular/material @angular/cdk
```

### Material Theme Overrides

Create `_material-theme-overrides.scss`:

```scss
// Override Angular Material M3 using CareSmartz360 tokens

.mat-mdc-button.mat-primary {
  --mdc-filled-button-container-color:      var(--action-primary-bg);
  --mdc-filled-button-label-text-color:     var(--action-primary-text-neutral);
  --mdc-filled-button-hover-container-color:var(--action-primary-hover);
  --mdc-filled-button-pressed-container-color: var(--action-primary-pressed);
}

.mat-mdc-outlined-button.mat-primary {
  --mdc-outlined-button-outline-color:      var(--action-secondary-border);
  --mdc-outlined-button-label-text-color:   var(--action-secondary-text);
}

.mat-mdc-form-field {
  --mdc-outlined-text-field-outline-color:        var(--field-border-default);
  --mdc-outlined-text-field-focus-outline-color:  var(--field-border-focus);
  --mdc-outlined-text-field-error-outline-color:  var(--field-border-danger);
  --mdc-outlined-text-field-input-text-color:     var(--field-value-primary);
  --mdc-outlined-text-field-placeholder-color:    var(--field-value-placeholder);
  --mdc-outlined-text-field-disabled-outline-color: var(--border-subtle);
  --mdc-outlined-text-field-container-shape:      var(--radius-lg);
}

.mat-mdc-checkbox {
  --mdc-checkbox-selected-checkmark-color:         var(--action-primary-text-neutral);
  --mdc-checkbox-selected-focus-icon-color:        var(--action-primary-bg);
  --mdc-checkbox-selected-hover-icon-color:        var(--action-primary-hover);
  --mdc-checkbox-selected-icon-color:              var(--action-primary-bg);
  --mdc-checkbox-selected-pressed-icon-color:      var(--action-primary-pressed);
  --mdc-checkbox-unselected-hover-icon-color:      var(--border-medium);
  --mdc-checkbox-unselected-icon-color:            var(--border-medium);
}

.mat-mdc-chip {
  --mdc-chip-label-text-color:       var(--text-secondary);
  --mdc-chip-elevated-container-color: var(--surface-secondary);
  --mdc-chip-outline-color:          var(--border-subtle);
  --mdc-chip-container-shape-radius: var(--radius-full);
}

.mat-mdc-card {
  --mdc-elevated-card-container-color: var(--surface-base);
  --mdc-elevated-card-container-shape: var(--radius-xl);
}

.mat-mdc-dialog-container {
  --mdc-dialog-container-color: var(--surface-base);
  --mdc-dialog-container-shape: var(--radius-xl);
}

.mat-mdc-tooltip {
  --mdc-plain-tooltip-container-color: var(--tool-tip-bg);
  --mdc-plain-tooltip-supporting-text-color: var(--tool-tip-text);
}

.mat-mdc-select {
  --mdc-outlined-text-field-outline-color:       var(--field-border-default);
  --mdc-outlined-text-field-focus-outline-color: var(--field-border-focus);
}

.mat-typography {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-base);
  color: var(--text-primary);
}
```

### Icon Setup

```html
<!-- index.html -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
```

```typescript
// icon usage
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatIconModule],
  template: `
    <mat-icon fontSet="material-symbols-rounded">filter_list</mat-icon>
  `
})
```

---

## Component Patterns

### Button (Angular Material M3)

```typescript
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cs-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button
      mat-flat-button
      [color]="color"
      [disabled]="disabled"
      class="cs-button">
      @if (icon) {
        <mat-icon fontSet="material-symbols-rounded">{{ icon }}</mat-icon>
      }
      <span>{{ label }}</span>
    </button>
  `,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() color: 'primary' | 'warn' = 'primary';
  @Input() disabled = false;
}
```

```scss
// button.component.scss
.cs-button {
  min-height: 40px;
  border-radius: var(--radius-lg) !important;
  font-size: var(--font-size-body-base);
  font-weight: var(--font-weight-medium);
}
```

### Form Field (Angular Material M3)

```html
<mat-form-field appearance="outline" class="cs-field w-full">
  <mat-label>{{ label }}</mat-label>
  <input matInput [placeholder]="placeholder" [formControl]="control"/>
  @if (hint) {
    <mat-hint>{{ hint }}</mat-hint>
  }
  @if (control.hasError('required')) {
    <mat-error>This field is required</mat-error>
  }
</mat-form-field>
```

---

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-size-display` | `36px` | Display headings |
| `--font-size-heading-1` | `32px` | Page titles |
| `--font-size-heading-2` | `24px` | Section headings |
| `--font-size-heading-3` | `20px` | Subsection headings |
| `--font-size-body-strong` | `16px` | Emphasized body |
| `--font-size-body-base` | `14px` | Default text |
| `--font-size-caption` | `12px` | Small labels |
| `--font-weight-regular` | `400` | Regular text |
| `--font-weight-medium` | `500` | Emphasized text |
| `--font-weight-semibold` | `600` | Subheadings |

---

## Spacing (Real Figma Values)

> **Note (2026-07-08):** these semantic names alias Tailwind's index-based spacing scale (see `tailwind.config.js`), which is indexed differently from Figma's own primitive names. Figma names spacing by literal pixel value (`space-4` = 4px, `space-16` = 16px); Tailwind's classic convention indexes by step (`spacing.4` = 16px). Same underlying scale, different numbering — don't cross-reference the numbers directly between the two without checking this table. Not changed to avoid a breaking rename across live app classes; flagged for a developer decision.

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | `2px` | Tight spacing |
| `--spacing-sm` | `4px` | Small gaps |
| `--spacing-md` | `8px` | Default spacing |
| `--spacing-lg` | `12px` | Large gaps |
| `--spacing-xl` | `16px` | Section spacing |
| `--spacing-2xl` | `20px` | Major sections |
| `--spacing-3xl` | `24px` | Large sections |
| `--spacing-4xl` | `32px` | Container spacing |

---

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `2px` | Sharp corners |
| `--radius-base` | `4px` | Buttons, inputs |
| `--radius-md` | `6px` | Small cards |
| `--radius-lg` | `8px` | Cards, dialogs |
| `--radius-xl` | `12px` | Large modals |
| `--radius-2xl` | `16px` | Large containers |
| `--radius-full` | `9999px` | Pills, avatars |

---

## Accessibility Standards

✅ **WCAG AA Compliant** — All color pairs meet 4.5:1 contrast ratio  
✅ **Focus Indicators** — Visible 2px ring via Angular Material  
✅ **Touch Targets** — Minimum 40px × 40px for all clickable areas  
✅ **Screen Readers** — `aria-` attributes provided by Material  

---

## Related Files

- **Token Manifest:** `ds-tokens-v2.5.0.json`
- **Material Overrides:** `_material-theme-overrides.scss`
- **Agency Tokens:** `design-tokens/agency-styles.scss`
- **Tailwind Config:** `tailwind.config.js`
- **AI Guide:** `AI-TOOLS-GUIDE.md`

---

**For questions or updates, contact the Design System team.**
