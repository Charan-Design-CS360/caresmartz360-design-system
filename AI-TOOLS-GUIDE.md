# AI Tools Guide — CareSmartz360 Design System

> Version: 2.5.0 | Stack: Angular 19 + Angular Material M3 (PRIMARY) + Tailwind CSS + SCSS

This guide provides AI assistants and developers with structured context for working with the CareSmartz360 design system. Read this before generating any component code.

---

## ⚠️ CRITICAL STACK RULES

Before generating any code, these rules are **non-negotiable**:

| Rule | Status |
|------|--------|
| Framework | Angular 19 standalone components ONLY |
| Styling | Tailwind CSS + SCSS custom properties ONLY |
| Icons | Google Material Symbols Rounded ONLY |
| Inline styles | NEVER use |
| Hardcoded hex values | NEVER use |
| React / JSX | NEVER use |
| shadcn/ui | NEVER use |
| **Component Library** | **Angular Material M3 (PRIMARY)** - Use for all UI components |
| PrimeNG | NEVER use |
| CSS-in-JS | NEVER use |
| `!important` | NEVER use |

---

## Repository Structure

```
caresmartz360-design-system/
├── README.md                      # Project overview
├── CHANGELOG.md                   # Version history
├── AI-TOOLS-GUIDE.md              # This file
├── CARESMARTZ360-DS-REFERENCE.md  # Full AI handoff reference
├── ds-tokens-latest.json          # Latest token export (always current)
├── ds-tokens-v2.4.0.json          # Versioned token snapshot
├── tailwind.config.js             # Tailwind CSS v4 configuration
├── components/
│   └── component-mapping.json     # Component → Figma node ID map
└── .github/
    └── workflows/
        └── version-bump.yml       # Auto version bump workflow
```

---

## Token Architecture

The design system uses a 3-tier token architecture:

### Tier 1: Primitives
Raw values — never used directly in components.
- `colors/*` — Full color ramps (50–950)
- `spacing/*` — 4px base grid values
- `typography/*` — Font families, sizes, weights, line heights
- `radius/*` — Border radius scale
- `shadow/*` — Box shadow definitions

### Tier 2: Semantic Tokens
Meaning-based aliases mapped to primitives.
- `brand/*` — Primary brand colors
- `status/*` — Success, warning, error, info states
- `surface/*` — Background surface colors
- `text/*` — Text color roles
- `border/*` — Border color roles
- `icon/*` — Icon color roles

### Tier 3: Component Tokens
Component-specific overrides.
- `button/*`, `input/*`, `badge/*`, etc.

---

## Angular 19 Component Pattern

All components must follow this pattern:

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cs-button',
  standalone: true,  // REQUIRED
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClasses"
      [attr.aria-label]="ariaLabel"
      [disabled]="disabled">
      <!-- Icon using Material Symbols Rounded -->
      <span *ngIf="icon" class="material-symbols-rounded">{{ icon }}</span>
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() ariaLabel?: string;

  get buttonClasses(): string {
    return `btn btn--${this.variant} ${this.disabled ? 'btn--disabled' : ''}`;
  }
}
```

---

## SCSS Token Usage Pattern

```scss
// ✅ CORRECT — always reference semantic token via CSS custom property
.btn--primary {
  background-color: var(--color-brand-primary);   // #2563EB
  color:            var(--color-text-inverse);     // #FFFFFF
  border-radius:    var(--radius-md);              // 4px
  min-height:       40px;                          // WCAG touch target
  padding:          0 var(--spacing-4);            // 0 16px

  &:hover {
    background-color: var(--color-brand-hover);   // #1D4ED8
  }

  &:focus-visible {
    outline: 2px solid var(--color-border-focus); // #3B82F6
    outline-offset: 2px;
  }

  &:disabled {
    background-color: var(--color-brand-disabled); // #D1D5DB
    cursor: not-allowed;
  }
}

// ❌ WRONG — never hardcode
.btn--primary {
  background-color: #2563EB;
  color: white;
}
```

---

## Tailwind Usage Pattern

```html
<!-- ✅ Primary Button -->
<button
  class="bg-brand-primary text-text-inverse hover:bg-brand-hover
         min-h-touch px-4 rounded-lg font-medium
         focus-visible:ring-2 focus-visible:ring-border-focus
         disabled:bg-brand-disabled disabled:cursor-not-allowed"
  aria-label="Save changes">
  <span class="material-symbols-rounded">save</span>
  Save
</button>

<!-- ✅ Status Badge -->
<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
             bg-status-success/10 text-status-success">
  Active
</span>

<!-- ✅ Input Field -->
<input
  class="w-full border border-border-default rounded-md px-3 py-2
         text-text-primary bg-surface-default
         focus:border-border-focus focus:ring-1 focus:ring-border-focus
         placeholder:text-text-disabled"
  placeholder="Enter value"
  aria-label="Input field" />
```

---

## Icon Usage

Always use Google Material Symbols Rounded:

```html
<!-- Size via font-size or Tailwind text-* class -->
<span class="material-symbols-rounded text-[24px] text-icon-primary">check_circle</span>
<span class="material-symbols-rounded text-[20px] text-icon-brand">arrow_forward</span>
<span class="material-symbols-rounded text-[32px] text-icon-danger">error</span>
```

Required in `index.html`:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" />
```

---

## Accessibility Requirements

Every component MUST:
- Have minimum touch target of **40x40px** (`min-h-touch min-w-touch`)
- Use `aria-label` on all icon-only buttons
- Use `aria-describedby` for form error states
- Use `role` attributes for custom interactive elements
- Meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
- Support keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`)
- Show visible focus state with `focus-visible:ring-2`

---

## AI Prompt Template

Use this template when asking AI to generate a component:

```
Using the CareSmartz360 Design System v2.4.0:
- Framework: Angular 19 standalone component
- Styling: Tailwind CSS + SCSS (NO inline styles, NO hardcoded colors)
- Icons: Google Material Symbols Rounded
- Tokens: reference via CSS custom properties (var(--color-*))
- Accessibility: WCAG AA, 40px touch targets, aria attributes

Generate a [COMPONENT_NAME] component with:
[REQUIREMENTS]
```

---

## Token Quick Reference

### Most-Used Semantic Tokens

| Token Path | CSS Property | Light Value |
|-----------|-------------|-------------|
| brand.primary | `var(--color-brand-primary)` | #2563EB |
| brand.hover | `var(--color-brand-hover)` | #1D4ED8 |
| brand.disabled | `var(--color-brand-disabled)` | #D1D5DB |
| status.success | `var(--color-status-success)` | #16A34A |
| status.warning | `var(--color-status-warning)` | #EAB308 |
| status.error | `var(--color-status-error)` | #DC2626 |
| surface.default | `var(--color-surface-default)` | #FFFFFF |
| surface.subtle | `var(--color-surface-subtle)` | #F9FAFB |
| text.primary | `var(--color-text-primary)` | #111827 |
| text.secondary | `var(--color-text-secondary)` | #4B5563 |
| text.inverse | `var(--color-text-inverse)` | #FFFFFF |
| border.default | `var(--color-border-default)` | #E5E7EB |
| border.focus | `var(--color-border-focus)` | #3B82F6 |

---

## Version History

| Version | Date | Stack |
|---------|------|-------|
| 2.5.0 | 2026-06-30 | Angular 19 + Angular Material M3 (PRIMARY) + Tailwind CSS + SCSS |
| 2.4.0 | 2026-06-30 | Angular 19 + Tailwind CSS + SCSS |
| 2.3.0 | 2025-01-01 | Tailwind CSS v4 + full token system |
| 2.0.0 | 2024-06-01 | Initial structured system |
| 1.0.0 | 2024-01-01 | Initial setup |
