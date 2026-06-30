# CareSmartz360 Design System — AI Handoff Reference

**Version:** 2.4.0
**Figma File:** `$-Primitives (CS360) V2.0` (ID: `DJBpjoXPMEw6bBAByIQaAy`)
**Last Updated:** 2026-06-30
**Stack:** Angular 19 + Tailwind CSS + SCSS

---

## Overview

This document serves as the authoritative reference for AI-assisted development, design handoff, and component implementation for the CareSmartz360 product design system.

**Stack (v2.4.0 Breaking Change):**
- Framework: Angular 19 standalone components ONLY
- Styling: Tailwind CSS + SCSS (NO React, NO Angular Material, NO inline styles)
- Icons: Google Material Symbols Rounded ONLY
- Tokens: Always via CSS custom properties `var(--color-*)` — never hardcoded

---

## Token Architecture

### Layer 1: Primitives
Foundational raw values. Never reference primitives directly in components — always use semantic tokens.

| Category | Example Token | Value |
|----------|--------------|-------|
| Color | `primitives.colors.blue.600` | `#2563EB` |
| Spacing | `primitives.spacing.4` | `16px` |
| Typography | `primitives.typography.fontSize.base` | `14px` |
| Radius | `primitives.radius.md` | `4px` |
| Shadow | `primitives.shadow.md` | `0 4px 6px rgba(0,0,0,0.1)` |

### Layer 2: Semantic Tokens
Meaning-based tokens referencing primitives.

| Token | References | Usage |
|-------|-----------|-------|
| `semantic.brand.primary` | `blue.600` | Primary CTA buttons |
| `semantic.brand.hover` | `blue.700` | Button hover state |
| `semantic.brand.disabled` | `gray.300` | Disabled interactive elements |
| `semantic.status.success` | `green.600` | Success states, positive feedback |
| `semantic.status.warning` | `yellow.500` | Warning states, caution |
| `semantic.status.error` | `red.600` | Error states, destructive actions |
| `semantic.status.info` | `blue.600` | Informational states |
| `semantic.surface.default` | `white` | Main content areas |
| `semantic.surface.subtle` | `gray.50` | Subtle backgrounds |
| `semantic.surface.muted` | `gray.100` | Muted/secondary surfaces |
| `semantic.surface.overlay` | `gray.800` | Modal overlays, tooltips |
| `semantic.text.primary` | `gray.900` | Body text, headings |
| `semantic.text.secondary` | `gray.600` | Secondary text, labels |
| `semantic.text.disabled` | `gray.400` | Disabled text |
| `semantic.text.inverse` | `white` | Text on dark/colored backgrounds |
| `semantic.text.brand` | `blue.600` | Links, brand text |
| `semantic.border.default` | `gray.200` | Standard borders |
| `semantic.border.strong` | `gray.400` | Emphasized borders |
| `semantic.border.focus` | `blue.500` | Focus rings |
| `semantic.border.error` | `red.500` | Error state borders |
| `semantic.icon.library` | `material-symbols-rounded` | Icon font library |

---

## CSS Custom Property Map

All semantic tokens map to SCSS CSS custom properties:

```scss
// Brand
--color-brand-primary:   #2563EB;
--color-brand-secondary: #DBEAFE;
--color-brand-hover:     #1D4ED8;
--color-brand-active:    #1E40AF;
--color-brand-disabled:  #D1D5DB;

// Status
--color-status-success: #16A34A;
--color-status-warning: #EAB308;
--color-status-error:   #DC2626;
--color-status-info:    #2563EB;

// Surface
--color-surface-default: #FFFFFF;
--color-surface-subtle:  #F9FAFB;
--color-surface-muted:   #F3F4F6;
--color-surface-overlay: #1F2937;

// Text
--color-text-primary:   #111827;
--color-text-secondary: #4B5563;
--color-text-disabled:  #9CA3AF;
--color-text-inverse:   #FFFFFF;
--color-text-brand:     #2563EB;

// Border
--color-border-default: #E5E7EB;
--color-border-strong:  #9CA3AF;
--color-border-focus:   #3B82F6;
--color-border-error:   #EF4444;
```

---

## Component Specifications

### Button

| Variant | Background | Text | Hover | Min Height |
|---------|-----------|------|-------|------------|
| Primary | `var(--color-brand-primary)` | `var(--color-text-inverse)` | `var(--color-brand-hover)` | 40px |
| Secondary | `var(--color-surface-subtle)` | `var(--color-brand-primary)` | `var(--color-surface-muted)` | 40px |
| Ghost | transparent | `var(--color-text-primary)` | `var(--color-surface-muted)` | 40px |
| Destructive | `#EF4444` | `var(--color-text-inverse)` | `#DC2626` | 40px |
| Disabled | `var(--color-brand-disabled)` | `var(--color-text-disabled)` | none | 40px |

Angular 19 component selector: `cs-button`
Icon: `<span class="material-symbols-rounded">icon_name</span>`

### Input Field

| State | Border | Background | Text |
|-------|--------|-----------|------|
| Default | `var(--color-border-default)` | `var(--color-surface-default)` | `var(--color-text-primary)` |
| Focus | `var(--color-border-focus)` | `var(--color-surface-default)` | `var(--color-text-primary)` |
| Error | `var(--color-border-error)` | `#FEF2F2` | `var(--color-text-primary)` |
| Disabled | `var(--color-border-default)` | `var(--color-surface-muted)` | `var(--color-text-disabled)` |

Min height: 40px. Always include `aria-label` or `aria-labelledby`.

### Badge / Tag

| Type | Text Color | Background |
|------|-----------|------------|
| Success | `var(--color-status-success)` | `#F0FDF4` |
| Warning | `var(--color-status-warning)` | `#FEFCE8` |
| Error | `var(--color-status-error)` | `#FEF2F2` |
| Info | `var(--color-status-info)` | `#EFF6FF` |
| Neutral | `var(--color-text-secondary)` | `var(--color-surface-subtle)` |

### Navigation / Sidebar

| Element | Color |
|---------|-------|
| Background | `var(--color-brand-primary)` — `#2563EB` |
| Text | `var(--color-text-inverse)` — `#FFFFFF` |
| Active item | `var(--color-brand-active)` |
| Icon | `var(--color-text-inverse)` |
| Border | `var(--color-border-default)` |

### Modal / Dialog

- Backdrop: `rgba(0,0,0,0.5)`
- Surface: `var(--color-surface-default)`
- Border radius: `var(--radius-lg)` — `8px`
- Shadow: `var(--shadow-xl)`
- Close button: `<span class="material-symbols-rounded">close</span>`
- Trap focus within modal
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby`

---

## Spacing Scale

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| spacing.0 | 0px | `p-0` |
| spacing.1 | 4px | `p-1` |
| spacing.2 | 8px | `p-2` |
| spacing.3 | 12px | `p-3` |
| spacing.4 | 16px | `p-4` |
| spacing.5 | 20px | `p-5` |
| spacing.6 | 24px | `p-6` |
| spacing.8 | 32px | `p-8` |
| spacing.10 | 40px | `p-10` |
| spacing.12 | 48px | `p-12` |

---

## Typography Scale

| Role | Size | Weight | Tailwind |
|------|------|--------|----------|
| Display | 36px | 600 | `text-4xl font-semibold` |
| Heading 1 | 32px | 600 | `text-3xl font-semibold` |
| Heading 2 | 24px | 600 | `text-2xl font-semibold` |
| Heading 3 | 20px | 500 | `text-xl font-medium` |
| Heading 4 | 18px | 500 | `text-lg font-medium` |
| Body Strong | 16px | 500 | `text-base font-medium` |
| Body Base | 14px | 400 | `text-sm font-normal` |
| Caption | 12px | 400 | `text-xs font-normal` |

Font family: Inter (sans-serif)

---

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| radius.none | 0px | Sharp corners |
| radius.sm | 2px | Subtle rounding |
| radius.md | 4px | Default — inputs, cards |
| radius.lg | 8px | Buttons, modals |
| radius.xl | 12px | Cards, panels |
| radius.2xl | 16px | Large cards |
| radius.full | 9999px | Pills, badges, avatars |

---

## Accessibility Standards

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color contrast | WCAG AA 4.5:1 | Enforced via semantic token pairs |
| Touch target | Min 40×40px | `min-h-touch` Tailwind class |
| Focus indicator | Visible 2px ring | `focus-visible:ring-2 ring-border-focus` |
| Screen reader | Full ARIA | `aria-label`, `aria-describedby`, `role` |
| Keyboard nav | Full support | `Tab`, `Enter`, `Space`, `Escape` |

---

## Figma File Reference

| File | Figma ID | Contents |
|------|----------|----------|
| Primitives | `DJBpjoXPMEw6bBAByIQaAy` | Color ramps, spacing, typography |
| Agency DS | `4bh29laapcuKBTghfaRXF0` | Component library, semantic layer |

---

## Version

| Version | Date | Changes |
|---------|------|---------|
| 2.4.0 | 2026-06-30 | Angular 19 stack migration. Removed React/shadcn/Angular Material. Added icon token group, SCSS-only constraint, touch target enforcement. |
| 2.3.0 | 2025-01-01 | Full 3-tier token architecture, Tailwind CSS v4 integration |
| 2.0.0 | 2024-06-01 | Initial structured reference |
