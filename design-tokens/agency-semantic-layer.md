# Agency Portal — Semantic Layer

**Version:** 2.4.0  
**Figma File:** `Agency DS (v1)`  
**Last Updated:** 2026-06-30  
**Themes:** Light Mode + Dark Mode

---

## Overview

This document defines the **complete semantic token layer** for the **Agency Portal** module within CareSmartz360. All 140+ variables are sourced directly from the Figma `Agency DS (v1)` file and support both **Light** and **Dark** themes.

**Key Principles:**
- ✅ Always use semantic tokens via CSS custom properties `var(--agency-*)`
- ❌ Never reference primitives directly or use hardcoded values
- 🎨 Tokens support Light/Dark theme switching automatically

---

## Token Categories

### 1. Background Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--agency-bg-default` | `#FFFFFF` | `#121212` | Primary background |
| `--agency-bg-subtle` | `#F5F5F5` | `#1E1E1E` | Cards, panels |
| `--agency-bg-muted` | `#EEEEEE` | `#2A2A2A` | Disabled states |
| `--agency-bg-hover` | `#E3F2FD` | `#263238` | Hover backgrounds |
| `--agency-bg-active` | `#BBDEFB` | `#37474F` | Active/selected |

### 2. Text Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--agency-text-primary` | `#212121` | `#FFFFFF` | Headings, body text |
| `--agency-text-secondary` | `#757575` | `#B0BEC5` | Subtext, captions |
| `--agency-text-tertiary` | `#9E9E9E` | `#78909C` | Placeholder text |
| `--agency-text-disabled` | `#BDBDBD` | `#546E7A` | Disabled text |
| `--agency-text-inverse` | `#FFFFFF` | `#121212` | Text on dark/light bg |

### 3. Border Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--agency-border-default` | `#E0E0E0` | `#424242` | Input borders |
| `--agency-border-subtle` | `#F5F5F5` | `#2A2A2A` | Dividers |
| `--agency-border-strong` | `#9E9E9E` | `#616161` | Focus borders |
| `--agency-border-hover` | `#757575` | `#78909C` | Hover state |

### 4. Brand Colors

> **Verified 2026-07-08:** Light-mode brand values below were corrected against a live Figma pull (Dev Mode MCP, `DJBpjoXPMEw6bBAByIQaAy` node `89:2`) — see `VERIFICATION-LOG.md`. Dark-mode values are **not yet verified** — primitives collection only has one mode; dark-mode brand shades need an independent semantic-layer pull before trusting them.

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--agency-brand-primary` | `#0077FF` ✅ | `#42A5F5` ⚠️ unverified | Primary CTA |
| `--agency-brand-primary-hover` | `#005CE6` ✅ | `#1E88E5` ⚠️ unverified | Hover state |
| `--agency-brand-primary-active` | `#0045B3` ✅ | `#1565C0` ⚠️ unverified | Active state |
| `--agency-brand-secondary` | `#424242` | `#E0E0E0` | Secondary actions |
| `--agency-brand-accent` | `#FF6F00` | `#FFB74D` | Accent elements |

### 5. Status Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--agency-status-success` | `#388E3C` | `#66BB6A` | Success states |
| `--agency-status-success-bg` | `#E8F5E9` | `#1B5E20` | Success background |
| `--agency-status-warning` | `#F57C00` | `#FFB74D` | Warning states |
| `--agency-status-warning-bg` | `#FFF3E0` | `#E65100` | Warning background |
| `--agency-status-error` | `#D32F2F` | `#EF5350` | Error states |
| `--agency-status-error-bg` | `#FFEBEE` | `#B71C1C` | Error background |
| `--agency-status-info` | `#0077FF` ✅ | `#42A5F5` ⚠️ unverified | Info states |
| `--agency-status-info-bg` | `#E3F2FD` | `#0D47A1` | Info background |

### 6. Interactive States

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--agency-interactive-default` | `#0077FF` ✅ | `#42A5F5` ⚠️ unverified | Links, buttons |
| `--agency-interactive-hover` | `#005CE6` ✅ | `#1E88E5` ⚠️ unverified | Hover state |
| `--agency-interactive-active` | `#0045B3` ✅ | `#1565C0` ⚠️ unverified | Active state |
| `--agency-interactive-disabled` | `#BDBDBD` | `#546E7A` | Disabled state |
| `--agency-interactive-visited` | `#7B1FA2` | `#BA68C8` | Visited links |

### 7. Shadow Tokens

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--agency-shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | `0 1px 2px rgba(0,0,0,0.3)` | Small elevation |
| `--agency-shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | `0 4px 6px rgba(0,0,0,0.4)` | Cards, dropdowns |
| `--agency-shadow-lg` | `0 10px 15px rgba(0,0,0,0.15)` | `0 10px 15px rgba(0,0,0,0.5)` | Modals, overlays |
| `--agency-shadow-xl` | `0 20px 25px rgba(0,0,0,0.2)` | `0 20px 25px rgba(0,0,0,0.6)` | High elevation |

### 8. Spacing (Consistent across themes)

| Token | Value | Usage |
|-------|-------|-------|
| `--agency-space-xs` | `4px` | Tight spacing |
| `--agency-space-sm` | `8px` | Small gaps |
| `--agency-space-md` | `16px` | Default spacing |
| `--agency-space-lg` | `24px` | Large gaps |
| `--agency-space-xl` | `32px` | Section spacing |
| `--agency-space-2xl` | `48px` | Major sections |

### 9. Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--agency-font-family-base` | `'Inter', -apple-system, sans-serif` | Body text |
| `--agency-font-family-heading` | `'Inter', -apple-system, sans-serif` | Headings |
| `--agency-font-family-mono` | `'JetBrains Mono', monospace` | Code, IDs |
| `--agency-font-size-xs` | `12px` | Small labels |
| `--agency-font-size-sm` | `14px` | Body text |
| `--agency-font-size-md` | `16px` | Default text |
| `--agency-font-size-lg` | `18px` | Subheadings |
| `--agency-font-size-xl` | `20px` | Headings |
| `--agency-font-size-2xl` | `24px` | Page titles |
| `--agency-font-weight-normal` | `400` | Regular text |
| `--agency-font-weight-medium` | `500` | Emphasized text |
| `--agency-font-weight-semibold` | `600` | Subheadings |
| `--agency-font-weight-bold` | `700` | Headings |

### 10. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--agency-radius-none` | `0px` | Sharp corners |
| `--agency-radius-sm` | `4px` | Buttons, inputs |
| `--agency-radius-md` | `8px` | Cards |
| `--agency-radius-lg` | `12px` | Modals |
| `--agency-radius-xl` | `16px` | Large containers |
| `--agency-radius-full` | `9999px` | Pills, avatars |

---

## Usage Guidelines

### Angular Component Example

```scss
// agency-dashboard.component.scss
.dashboard-card {
  background: var(--agency-bg-subtle);
  border: 1px solid var(--agency-border-default);
  border-radius: var(--agency-radius-md);
  padding: var(--agency-space-lg);
  box-shadow: var(--agency-shadow-md);

  &:hover {
    background: var(--agency-bg-hover);
    border-color: var(--agency-border-hover);
  }
}

.dashboard-title {
  color: var(--agency-text-primary);
  font-size: var(--agency-font-size-xl);
  font-weight: var(--agency-font-weight-bold);
  margin-bottom: var(--agency-space-md);
}

.dashboard-subtitle {
  color: var(--agency-text-secondary);
  font-size: var(--agency-font-size-sm);
}
```

### Tailwind CSS Integration

```javascript
// tailwind.config.js (extend with agency tokens)
module.exports = {
  theme: {
    extend: {
      colors: {
        'agency-bg-default': 'var(--agency-bg-default)',
        'agency-text-primary': 'var(--agency-text-primary)',
        'agency-brand-primary': 'var(--agency-brand-primary)',
        // ... add all semantic tokens
      },
      spacing: {
        'agency-xs': 'var(--agency-space-xs)',
        'agency-sm': 'var(--agency-space-sm)',
        'agency-md': 'var(--agency-space-md)',
        'agency-lg': 'var(--agency-space-lg)',
        'agency-xl': 'var(--agency-space-xl)',
      }
    }
  }
}
```

---

## Theme Switching

The semantic layer automatically adapts to Light/Dark themes via data attributes:

```html
<!-- Light Mode (default) -->
<body data-theme="light">
  <!-- All agency tokens use light values -->
</body>

<!-- Dark Mode -->
<body data-theme="dark">
  <!-- All agency tokens use dark values -->
</body>
```

```scss
// Theme switching implementation
:root[data-theme="light"] {
  --agency-bg-default: #FFFFFF;
  --agency-text-primary: #212121;
  // ... light theme values
}

:root[data-theme="dark"] {
  --agency-bg-default: #121212;
  --agency-text-primary: #FFFFFF;
  // ... dark theme values
}
```

---

## Accessibility Compliance

✅ **WCAG AA Compliant** — All color pairs meet 4.5:1 contrast ratio  
✅ **Focus Indicators** — Visible 2px ring on interactive elements  
✅ **Touch Targets** — Minimum 40px × 40px for all clickable areas

---

## Migration from Primitives

**❌ Before (hardcoded primitives):**
```scss
.button {
  background: #1976D2; // ❌ Primitive
  color: #FFFFFF;       // ❌ Hardcoded
}
```

**✅ After (semantic tokens):**
```scss
.button {
  background: var(--agency-brand-primary); // ✅ Semantic
  color: var(--agency-text-inverse);        // ✅ Theme-aware
}
```

---

## Related Files

- **Token Manifest:** `ds-tokens-v2.4.0.json`
- **SCSS Implementation:** `design-tokens/agency-styles.scss`
- **Tailwind Config:** `tailwind.config.js`
- **Main Reference:** `CARESMARTZ360-DS-REFERENCE.md`

---

**For questions or updates, contact the Design System team.**
