# High Contrast Theme — Handoff to Figma AI

**Status: IN PROGRESS — Figma AI has generated the theme from this draft and corrected 5 mapping mistakes.** Still pending Singh's contrast testing inside Figma before it's marked verified/published.

### Corrections Figma AI made to this draft (2026-07-16) — applied below
1. `Brandblue-400` → `Brandblue-400` everywhere it was used for brand/link accents (bright blue needed for AAA contrast on black).
2. `neutral-950` → `neutral-950` (the closest actual pure-black primitive in the real ramp).
3. `yellow-400` / `green-400` → `yellow-400` / `green-400` (matched by intent to the real primitive ramp).
4. `action-toggle-icon-partial` corrected to black — this draft had wrongly grouped it with the white-background toggle elements, which would have made the icon invisible.
5. `popover-secondary-foreground` corrected to black — this draft listed white text, which would have been invisible against the popover's white/inverted background.

**Note:** correction #3 means `action-warning-hover`/`action-success-hover` now match the same shade as their `-pressed` states — worth a visual check in Figma to confirm hover and pressed still read as distinct.

## How to use this document
1. Paste this document into Figma AI inside the design system file that already contains the **Primitives** variable collection (Tier 1) and the **Semantics** variable collection (Tier 2), with existing **Light** and **Dark** modes.
2. Ask Figma AI to create a third mode, **High Contrast**, on the same Semantics collection.
3. For every row below, bind the semantic variable to the named primitive variable (not a hardcoded hex) — this keeps the "change one primitive, everything updates" architecture intact.
4. Test contrast ratios inside Figma once bound. Target WCAG AAA (7:1) for text/background pairs where possible.
5. Once Singh is satisfied, mark this theme verified and it can be published for all teams/portals to consume.

## Design intent
- Pure black/white surfaces — no subtle or tinted grays.
- Text and icons are full-strength (no dimmed "secondary" tone) — High Contrast mode exists specifically to remove ambiguity for low-vision users.
- Borders are always visible; nothing relies on a "subtle" border in this mode.
- Focus rings and status colors never rely on color alone — pair with icons/labels in the UI itself (a component-level note, not a token-level one).
- Shadows/elevation are flattened to `none` — separation comes from borders, not shadows, in this mode.
- Primitive references below use the naming already established in code (`--neutral-0`, `--neutral-950`, `--Brandblue-400`, etc.). If Figma's primitive variable names differ slightly (e.g. `Neutral/0` vs `neutral-0`), Figma AI should match by value/intent, not exact string.

## Semantic tokens by group

### Surface
| Token | Primitive reference | Purpose |
|---|---|---|
| `surface-base` / `bg-surface-primary` | `neutral-950` | Page/app background |
| `surface-transparent` / `bg-surface-overlay` | `opacity-0` / `overlay-opacity-80` | Overlays, scrims |
| `surface-secondary` / `bg-surface-secondary` | `neutral-950` | Secondary panel background |
| `surface-tertiary` / `bg-surface-tertiary` | `neutral-950` | Tertiary panel background |
| `surface-brand` / `bg-surface-inverse` | `neutral-0` | Inverted/brand-forward surface |
| `surface-brand-hover` | `neutral-100` | Hover state of brand surface |
| `surface-brand-pressed` | `neutral-200` | Pressed state of brand surface |
| `surface-danger` / `surface-warning` / `surface-success` | `neutral-0` | Full-strength status surfaces |
| `surface-danger-subtle` / `surface-warning-subtle` / `surface-success-subtle` | `neutral-950` | Status surface backgrounds (kept black, no tinting) |
| `surface-disabled` | `neutral-800` | Disabled surface |

### Text
| Token | Primitive reference | Purpose |
|---|---|---|
| `text-primary` | `neutral-0` | Primary body text |
| `text-secondary` | `neutral-0` | Intentionally same as primary — no low-contrast secondary text in HC mode |
| `text-tertiary` | `neutral-100` | Least-emphasized text, still high contrast |
| `text-disabled` | `neutral-400` | Disabled text |
| `text-inverse` | `neutral-950` | Text on light/inverted surfaces |
| `text-brand` / `text-links` | `Brandblue-400` | Brand/link text — lightened from standard blue for AAA contrast on black |
| `text-danger` | `red-300` | Error text |
| `text-warning` | `yellow-400` | Warning text |
| `text-success` | `green-400` | Success text |

### Icon
| Token | Primitive reference | Purpose |
|---|---|---|
| `icon-primary` | `neutral-0` | Default icon color |
| `icon-secondary` | `neutral-100` | Secondary icon color |
| `icon-soft` | `neutral-0` | Soft/muted icon (still full strength in HC) |
| `icon-inverse` | `neutral-950` | Icon on light surfaces |
| `icon-brand` | `Brandblue-400` | Brand icon |
| `icon-disabled` | `neutral-500` | Disabled icon |
| `icon-danger` / `icon-warning` / `icon-success` | `red-300` / `yellow-400` / `green-400` | Status icons |

### Border
| Token | Primitive reference | Purpose |
|---|---|---|
| `border-brand` | `Brandblue-400` | Brand-colored border |
| `border-strong` / `border-medium` / `border-subtle` / `border-default` | `neutral-0` | All border weights collapse to full-strength in HC — nothing is allowed to be "subtle" |
| `border-transparent` | `opacity-0` | Transparent border (layout spacer only) |
| `border-focus` | `yellow-400` | Focus ring — yellow reads reliably against both black and white, same principle OS-level HC modes use |
| `border-danger` / `border-warning` / `border-success` | `red-300` / `yellow-400` / `green-400` | Status borders |

### Actions — Primary / Secondary / Soft / Ghost / Success / Warning / Destructive / Disabled / Focus / Toggle
| Token | Primitive reference | Purpose |
|---|---|---|
| `action-primary-bg` | `neutral-0` | Primary button background (inverted — white on black) |
| `action-primary-hover` | `Brandblue-400` | Primary button hover |
| `action-primary-pressed` | `blue-400` | Primary button pressed |
| `action-primary-text-neutral` | `neutral-950` | Text on primary button |
| `action-primary-text-hard` | `Brandblue-400` | Text-only "hard" primary variant |
| `action-primary-border` / `action-primary-outlined` | `neutral-0` | Primary button border |
| `action-secondary-bg` | `neutral-950` | Secondary button background |
| `action-secondary-hover` | `neutral-900` | Secondary button hover |
| `action-secondary-pressed` | `neutral-800` | Secondary button pressed |
| `action-secondary-text` | `neutral-0` | Secondary button text |
| `action-secondary-border` / `action-secondary-outlined` | `neutral-0` | Secondary button border |
| `action-soft-bg` / `action-ghost-bg` | `neutral-950` | Soft/ghost button background |
| `action-soft-hover` / `action-ghost-hover` | `neutral-900` | Soft/ghost hover |
| `action-soft-pressed` / `action-ghost-pressed` | `neutral-800` | Soft/ghost pressed |
| `action-soft-text-neutral` | `neutral-0` | Soft button text |
| `action-ghost-text-hard` | `Brandblue-400` | Ghost button text (brand variant) |
| `action-ghost-border` | `opacity-0` | Ghost button has no visible border by design |
| `action-success-bg` / `action-warning-bg` / `action-destructive-bg` | `neutral-0` | Status action backgrounds |
| `action-success-hover` / `action-warning-hover` / `action-destructive-hover` | `green-400` / `yellow-400` / `red-300` | Status action hover |
| `action-success-pressed` / `action-warning-pressed` / `action-destructive-pressed` | `green-400` / `yellow-400` / `red-400` | Status action pressed |
| `action-*-text-neutral` (success/warning/destructive) | `neutral-950` | Text on status action buttons |
| `action-*-text-hard` (success/destructive) | `green-400` / `red-300` | Text-only status variants |
| `action-*-border` / `action-*-outlined` (success/warning/destructive) | `neutral-0` | Status action borders |
| `action-disabled-bg` | `neutral-700` | Disabled action background |
| `action-disabled-text-neutral` | `neutral-400` | Disabled action text |
| `action-disabled-border` | `opacity-0` | Disabled action border |
| `action-focus-ring` | `yellow-400` | Focus ring color, all actions |
| `action-focus-ring-offset` | `surface-base` | Focus ring offset background |
| `action-toggle-bg-default` | `neutral-700` | Toggle off state background |
| `action-toggle-icon-default` | `neutral-300` | Toggle off state icon |
| `action-toggle-bg-hover` | `blue-900` | Toggle hover background |
| `action-toggle-icon-hover` | `Brandblue-400` | Toggle hover icon |
| `action-toggle-bg-active` / `action-toggle-bg-partial` | `neutral-0` | Toggle on/partial background |
| `action-toggle-icon-active` / `action-toggle-icon-partial` | `neutral-950` | Toggle on/partial icon (corrected — was wrongly grouped with white-bg elements) |
| `action-toggle-icon-disabled` | `neutral-600` | Toggle disabled icon |
| `action-toggle-border` | `neutral-0` | Toggle border |
| `action-toggle-focus-ring` | `yellow-400` | Toggle focus ring |

### Sidebar
| Token | Primitive reference | Purpose |
|---|---|---|
| `sidebar-primary-bg` / `sidebar-secondary-bg` | `neutral-950` | Sidebar backgrounds |
| `sidebar-primary-foreground` / `sidebar-secondary-foreground` | `neutral-0` | Sidebar text/icon color |
| `sidebar-accent-bg` | `neutral-900` | Active/accent row background |
| `sidebar-accent-foreground` | `neutral-0` | Active row text |
| `sidebar-border` | `neutral-0` | Sidebar divider |
| `sidebar-ring` | `yellow-400` | Sidebar focus ring |
| `sidebar-text` / `sidebar-text-active` | `neutral-0` | Nav item text |
| `sidebar-icon` / `sidebar-icon-active` | `neutral-0` | Nav item icon |

### Tags
| Token | Primitive reference | Purpose |
|---|---|---|
| `tags-neutral` / `tags-red` / `tags-yellow` / `tags-green` / `tags-blue` / `tags-purple` | `neutral-0` | Tag text — all colors collapse to full white text in HC mode |
| `tags-*-bg` (all colors) | `neutral-950` | Tag background — all collapse to black; color is only conveyed by an accompanying label, never by hue alone |
| `tags-disabled` | `neutral-400` | Disabled tag text |

### Tooltip / Popover
| Token | Primitive reference | Purpose |
|---|---|---|
| `tooltip-bg` / `popover-secondary-bg`(inverse variant) | `neutral-0` | Tooltip/popover background (inverted) |
| `tooltip-text` / `popover-secondary-foreground` | `neutral-950` | Tooltip/popover text (corrected — draft had white-on-white, invisible) |

### Elevation
| Token | Value | Purpose |
|---|---|---|
| `elevation-none` / `elevation-xs` / `elevation-sm` / `elevation-md` / `elevation-lg` / `elevation-xl` | `none` | All shadows flattened — HC mode uses borders, not shadows, for separation |

### Chart
| Token | Primitive reference | Purpose |
|---|---|---|
| `chart-1` … `chart-5` | `neutral-0` → `neutral-400` (stepped) | Chart series colors — stepped grayscale rather than hue-based, since some HC users also have reduced color perception |

### Status — Shift / Meeting / Task
| Token pattern | Primitive reference | Purpose |
|---|---|---|
| `status-shift-open/confirmed/scheduled/approved` (+ `-bg`) | `neutral-0` on `neutral-950` | Active/positive shift states |
| `status-shift-no-show/caregiver-cancelled/client-cancelled/unapproved/unpublished` (+ `-bg`) | `neutral-400` on `neutral-950` | Inactive/negative shift states — dimmed but still legible |
| `status-meeting-scheduled/approved/cancelled` (+ `-bg`) | `neutral-0` on `neutral-950` | Meeting states |
| `status-task-completed/deferred/in-progress` (+ `-bg`) | `neutral-0` on `neutral-950` | Task states |
| `status-task-not-started` (+ `-bg`) | `neutral-400` on `neutral-950` | Not-started task state |

## System-level fallback
Also respect the OS-level `prefers-contrast: more` media query as a fallback for users who enable high contrast at the system level without using this app's in-app theme switcher.

## What Singh should check before marking this verified
- Real contrast ratios inside Figma (this draft assumes AAA but hasn't been measured against actual rendered pairs).
- Whether status colors (red/yellow/green/blue at the `-300` step) are distinguishable enough from each other at a glance for users with reduced color perception — consider whether icons/labels are mandatory pairings in the component spec, not just a token-level nice-to-have.
- Whether `chart-1`…`chart-5`'s grayscale-only approach is acceptable, or whether a hybrid (grayscale + pattern/texture) is wanted for HC charts specifically.

---
*Generated from the current codebase draft (`poc-design-system`'s `_theme-high-contrast.scss`, the more structurally complete of two existing drafts) on 2026-07-15. Not yet pulled from or verified against a live Figma High Contrast frame — that verification is this document's entire purpose.*

---

## HC Light Mode (Added v2.6.0)

### Overview
HC Light is the 5th theme mode — high contrast on a **light** background. Designed for users who need maximum readability without dark backgrounds.

### Design Principles
- **White backgrounds** (`neutral-0`) — clean, glare-free base
- **Black text** (`neutral-950`) — maximum contrast against white
- **Darkened brand colors** — Brandblue-900 (#003180) instead of Brandblue-600
- **Yellow focus indicators** — same as HC dark for consistency (`yellow-400`)

### Key Mappings

| Token | HC Light Value | Alias | Rationale |
|-------|---------------|-------|-----------|
| surface/base | #ffffff | neutral-0 | White base |
| text/primary | #020617 | neutral-950 | Near-black text |
| text/brand | #003180 | Brandblue-900 | Darkened brand for contrast on white |
| action/primary/bg | #020617 | neutral-950 | High contrast primary button |
| action/primary/text-neutral | #ffffff | neutral-0 | White text on dark button |
| border/focus | #003180 | Brandblue-900 | Darkened focus ring |
| sidebar/primary-bg | #f1f5f9 | neutral-100 | Light sidebar |

### CSS Implementation

```css
:root[data-theme="hc-light"] {
  /* All 204 tokens with HC Light values */
  --surface-base: #ffffff;
  --text-primary: #020617;
  --text-brand: #003180;
  /* ... */
}
```

### Figma Mode Details

* **Mode name**: `HC Light`
* **Mode ID**: `26629:0`
* **Collection**: Color Theme (`VariableCollectionId:25445:12641`)
* **Total variables**: 204 (same set as all other modes)
