# CareSmartz360 — 3-Tier SCSS Architecture

This folder implements the 3-tier structure defined in `AI_CONTEXT.md` (Primitives → Semantics → Components), as a portal-agnostic, prefix-free token system per that file's Rule 3.

## How to use theme + density

Two independent attributes on `<html>` or `<body>`, so any combination works:

```html
<body data-theme="dark" data-density="small">
```

- `data-theme`: `light` (default) · `dark` · `high-contrast` · `warm-dark` · `hc-light`
- `data-density`: `small` · `medium` (default) · `large`

## Verification status at a glance

| File | Status |
|---|---|
| `1-primitives/_colors.scss` | Verified against live Figma (2026-07-08), except Lime 400–950 and the shift-status hexes |
| `1-primitives/_spacing.scss` | Verified |
| `1-primitives/_typography.scss` | Verified, except mono font family and tracking units |
| `1-primitives/_effects.scss` | Z-index and duration verified; shadow and easing carried over from existing repo files, unverified |
| `2-semantics/_theme-light.scss` | Verified against Figma v2.6.0 (2026-07-20) |
| `2-semantics/_theme-dark.scss` | Verified against Figma v2.6.0 (2026-07-20) |
| `2-semantics/_theme-high-contrast.scss` | Verified against Figma v2.6.0 (2026-07-20) |
| `2-semantics/_theme-warm-dark.scss` | Added v2.6.2 — ON HOLD for 180/204 raw hex aliasing |
| `2-semantics/_theme-hc-light.scss` | Added v2.6.2 — Verified against Figma |
| `2-semantics/_density.scss` | Verified against Figma Density Modes collection (29 vars) |
| `2-semantics/_status.scss` | Shift-status colors carried over from the caresmartz-design skill, not re-verified this session |
| `3-components/*` | Structure verified, specific component frames not yet audited |

## Suggestions — what else this system is missing

A few things worth adding as this matures, roughly in priority order:

**Stop hand-syncing three formats.** Right now the same values are typed out separately in this SCSS tree, in `ds-tokens-latest.json`, and in `tailwind.config.js` — which is exactly how the `#2563EB` vs `#1976D2` vs `#0077FF` conflict happened in the first place. A token pipeline tool (Style Dictionary is the standard choice) that generates all three outputs from one source would make that class of bug structurally impossible instead of something to catch in review.

**Icon tokens as their own tier-2 file.** Size scale and library name are semantic decisions (`--icon-size-sm/md/lg`, `--icon-library: material-symbols-rounded`), not primitives or components — they don't have a home yet.

**A states/interactions layer.** Hover, focus, active, disabled, and loading are currently hand-repeated per component. A shared `_states.scss` with mixins (or at minimum documented conventions) would keep new components consistent without copy-paste.

**Logical properties for RTL readiness.** Nothing here uses `margin-inline-start` style logical properties yet — worth adopting now if there's any chance of RTL language support later, since retrofitting it is much more painful than starting with it.

**Contrast testing in CI.** Given how much of this conversation was about unverified color values, an automated contrast check (there are CLI tools that read CSS custom properties and flag WCAG failures) would catch the next round of drift before it ships, not months later.

**A living style guide / token documentation site.** Even a simple static page that reads this SCSS and renders swatches, type scale, and component previews would make "is this documented?" a yes for designers who don't want to open a text editor — directly relevant given Singh's own zero-code-background constraint.

**Print styles.** The old `agency-styles.scss` had a `@media print` block that force-reset to light theme — worth carrying that convention forward here rather than losing it.

**Motion/animation semantic tokens**, not just raw durations — e.g. `--transition-hover`, `--transition-modal-enter`, mapping specific interaction types to a duration + easing pair, the way `--focus-ring` already composes multiple primitives into one semantic unit.
