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
| `action.primary.bg` / `semantic.brand.primary` | `blue.600` → `#0077FF` (verified) | Form save, submit, dialog confirmation CTAs |
| `action.success.bg` / `semantic.status.success` | `green.600` → `#16A34A` (verified) | **Creation / Addition CTAs** (`Add New`, `Add Client`, `Create`) & positive status |
| `action.primary.hover` / `semantic.brand.hover` | `blue.700` → `#005CE6` (verified) | Primary button hover state |
| `action.success.hover` | `green.700` → `#15803D` (verified) | Success button hover state |
| `semantic.brand.disabled` | `gray.300` | Disabled interactive elements |
| `semantic.status.warning` | `yellow.500` | Warning states, caution |
| `semantic.status.error` | `red.600` | Error states, destructive actions |
| `semantic.status.info` | `blue.700` | Info states |
| `semantic.text.primary` | `gray.900` | High-contrast body text |
| `semantic.surface.default` | `white` | Main content areas / page canvas |

---

## Component Sources & Discovery Directory

All engineers and AI tools must source component geometries, layout rules, and node definitions from these canonical locations before authoring or modifying code:

| Component | Figma File Key | Figma Node ID | Published Contract / Rule | Canonical CSS Class |
|---|---|---|---|---|
| **Buttons (All Variants)** | `4bh29laapcuKBTghfaRXF0` | `5703:7087` (Primary)<br>`10356:17309` (Success)<br>`5703:7709` (Ghost)<br>`5703:8495` (Soft)<br>`27098:1282` (Secondary) | `button.md` v1.0.0 / `buttons.css [CS-BTN-01..16]` | `.cs-btn`<br>`.cs-btn--primary`<br>`.cs-btn--success`<br>`.cs-btn--ghost`<br>`.cs-btn--soft`<br>`.cs-btn--secondary` |
| **Complete Page Header** | `4bh29laapcuKBTghfaRXF0` | `27232:65833` / `27232:65797` (Pageheader)<br>`27232:64816` (Refresh action 20×20 `cached`) | `page-header.md` / `00-MEASUREMENT-page-header-2026-08-25.md` | `.cs-pheader`<br>`.cs-pheader__top-row`<br>`.cs-pheader__filter-row` |
| **Table 3.0 System** | `4bh29laapcuKBTghfaRXF0` | `5865:162` (`Head / Tiltes for tables`)<br>`10797:21483` (`global / base / Table / Actions` 60×30)<br>`13147:33749` (Master actions) | `table.md` v1.0.0 / `table.css [CS-TBL-01..16]` | `.cs-table__wrap`<br>`.cs-table`<br>`.cs-table__head-cell`<br>`.cs-table__cell`<br>`.cs-table__actions` |
| **Checkbox & Radio** | `4bh29laapcuKBTghfaRXF0` | `26938:66000` | `checkbox-radio.css [CS-CHK-01..05]` | `.cs-checkbox`<br>`.cs-radio` |
| **Nav Search Field** | `4bh29laapcuKBTghfaRXF0` | `26938:65997` (sub-node) | `search-field.css [CS-SRCH-01..03]` | `.cs-search`<br>`.cs-search__input` |
| **Profile Side Navigation** | `4bh29laapcuKBTghfaRXF0` | `10441:17071` (240px expanded)<br>`10441:17045` (50px collapsed rail) | `profile-side-navigation.css [CS-PNAV-01..06]` | `.pnav`<br>`.pnav-full`<br>`.pnav-rail` |
| **Primary Side Navigation** | `4bh29laapcuKBTghfaRXF0` | `10441:17045` (158px rail) | `primary-side-navigation.css` | `.cs-snav` |
| **Tab Navigation Strip** | `4bh29laapcuKBTghfaRXF0` | `base/Tabs/Primary` (1128×46 / 50px canonical) | `tabs.css [CS-TABS-01..03]` | `.cs-tabs`<br>`.cs-tabs__tab` |

### Architectural Rules for Page Construction

#### Rule [DS-HDR-ACT-01] — Creation Action Green Button
1. **Creation / Addition Actions** (`Add New`, `Add Client`, `Create New`, `New Form`) **MUST use `.cs-btn--success`** (`action/success/bg` `#16a34a` / `var(--action-success-bg)`), accompanied by a leading `add` Material Symbol.
2. **Confirmation / Save Actions** (`Save`, `Submit`, `Confirm`, `Apply`) use `.cs-btn--primary` (Brand Blue `#0077ff` / `var(--action-primary-bg)`).
3. **Rationale:** In CareSmartz360, clinical and administrative workflows clearly distinguish "starting a new workflow / record" (Green affirmative creation) from "persisting or acknowledging an existing form" (Blue primary).

#### Rule [DS-TBL-01] — Table Grid & Alignment Standards
1. **4-Sided Cell Border Grid:** Every `th` and `td` cell carries `border: var(--border-width-default) solid var(--border-subtle)`. Never style row bottoms only.
2. **Row Actions Sizing & Alignment:** Per-row actions must be 30×30 ghost icon buttons (`.cs-btn.cs-btn--ghost.cs-btn--icon-only`) holding 18×18 icons (`edit` and `more_vert`). They are **RIGHT-ALIGNED** (`justify-content: flex-end`) at the right edge of the table [CS-TBL-15]. Text buttons are strictly forbidden in row action cells.
3. **No Zebra Striping:** Zebra striping is banned. Rows are solid `#ffffff` (`var(--surface-base)`), transitioning to `var(--surface-tertiary)` on hover.
4. **Frozen Columns:** First column sticky left (z-index: 2); last column sticky right (z-index: 2) with `flex: 1 0 auto` to absorb remaining container width.

#### Rule [DS-LAY-01] — Container Rhythm & Spacing ([UIG-086])
1. **Zero Page-Level Double Padding:** Never place outer padding on `.page-content`. The tab bar, header, and data containers butt edge-to-edge.
2. **Header-to-Table Gap:** The data container (`.cs-data-container`) enforces an explicit 12px vertical rhythm (`gap: var(--spacing-lg)`).
3. **Side Nav Boundary:** Profile Side Nav (`.pnav`) has **NO drawn border**; it relies purely on flat background contrast (`var(--sidebar-secondary-bg)` `#f8fafc` against the pure white `#ffffff` canvas).

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
