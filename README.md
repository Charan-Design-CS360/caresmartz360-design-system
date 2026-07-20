# CareSmartz360 Design System — Color Tokens v2.6.0

Semantic color token system for CareSmartz360, exported from Figma and consumed by Angular 19 + Angular Material M3 + Tailwind CSS v4 + SCSS.

## Overview

| Metric | Value |
|--------|-------|
| Total tokens | 204 |
| Theme modes | 5 (Light, Dark, High Contrast, Warm Dark, HC Light) |
| Total declarations | 1,020 (204 × 5) |
| Alias references | 840 |
| Broken aliases | 0 |

## Token Groups (13)

| Group | Count | Purpose |
|-------|-------|---------|
| field | 13 | Form field backgrounds, borders, text, icons |
| text | 11 | Typography colors — primary, secondary, links, status |
| border | 8 | Border colors — brand, strong, subtle, status |
| icon | 9 | Icon colors across states |
| action | 52 | Button variants — primary, secondary, soft, ghost, destructive, warning, success, toggle, focus, outlined |
| surface | 19 | Background surfaces — base, brand, status, overlays, skeleton |
| tooltip | 2 | Tooltip background and text |
| status | 30 | Shift, meeting, task status colors and backgrounds |
| sidebar | 13 | Sidebar navigation colors |
| tags | 12 | Tag/badge colors by semantic meaning |
| elevation | 6 | MD3 tonal elevation scale (none/xs/sm/md/lg/xl) |
| popover | 2 | Popover/dropdown colors |
| chart | 10 | Data visualization palette |

## Theme Modes

| Mode | Selector | Description |
|------|----------|-------------|
| Light | `:root`, `[data-theme="light"]` | Default mode |
| Dark | `[data-theme="dark"]` | Dark theme with proper Figma primitive aliases |
| High Contrast | `[data-theme="high-contrast"]` | WCAG AAA — black bg, white text, yellow focus |
| Warm Dark | `[data-theme="warm-dark"]` | Warm earthy tones (ON HOLD for primitives) |
| HC Light | `[data-theme="hc-light"]` | High contrast on light bg — white bg, black text, darkened brand |

## Files

| File | Purpose |
|------|---------|
| `ds-tokens-v2.6.0.json` | DTCG format token manifest — all 204 vars × 5 modes |
| `ds-tokens-latest.json` | Always points to latest version |
| `semantic-tokens.scss` | Prefix-free SCSS with CSS custom properties |
| `agency-styles.scss` | DEPRECATED — old 2-mode file with wrong prefix |

## Usage

```scss
// Import in your SCSS
@use 'semantic-tokens';

// Use tokens as CSS custom properties
.card {
  background: var(--surface-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-primary {
  background: var(--action-primary-bg);
  color: var(--action-primary-text-neutral);
}
```

## Accessibility

* All text/background pairs meet WCAG AA (4.5:1) minimum
* High Contrast mode targets WCAG AAA (7:1)
* HC modes use yellow focus indicators for visibility
* Disabled states maintain minimum 3:1 contrast

## Auto Theme Switching

```scss
// Auto dark mode
@media (prefers-color-scheme: dark) { ... }

// Auto high contrast
@media (prefers-contrast: more) { ... }

// Print forces light mode
@media print { ... }
```

## Audit Trail

| Date | Version | Audit | Result |
| --- | --- | --- | --- |
| 2026-07-20 | 2.6.0 | Pass 11 — Full 5-mode audit | 204 vars, 0 broken, 7 pages QA'd |

## References

* **Figma**: [CareSmartz360 V2 Design System](https://www.figma.com/design/4bh29laapcuKBTghfaRXF0)
* **Jira Audit**: C360-44027
* **Jira Repo Bridge**: C360-44235
