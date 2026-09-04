<!--
=============================================================================
PAIRED CONTRACT (human twin) for primary-side-navigation.json. Plain-language
spec; the .json is the machine spec; the CSS is Universal Html Rules/
02-components/primary-side-navigation.css. Measured live from Figma 2026-09-04
by Claude (DESIGN-SYSTEM lane), on Singh's request. STATUS: assembled,
Singh ratification pending.
=============================================================================
-->

# Primary Side Navigation (the blue rail)

**What it is.** The app's main navigation — the **blue rail** on the far left of every page. It moves you between the top-level areas of the product. It's the **outermost** nav layer: the grey Profile Side Navigation (per record) and the page tabs sit to its right.

---

## 1. The four parts (top to bottom)

The rail is **158px** wide, full-height, **blue** (`--sidebar-primary-bg`, #0077FF). The top block sits at the top; the copyright is **pinned to the bottom**.

1. **Logo header** — a **white** box (158×102) with the CareSmartz360 logo, a faint right+bottom hairline, clickable → home.
2. **Collapse toggle** — a 44px row with a right-aligned white icon that collapses/expands the whole rail.
3. **Nav-links** — 9 section links, each **40px** tall: a 24px icon + label, white text (Inter Medium 14).
4. **Copyright** — "©2026, Developed & Maintained By CareSmartz360" (link underlined), tiny white text, pinned at the bottom.

**Exact spacing (measured):** logo `0–102` · 8px gap · toggle `110–154` · 8px gap · nav-links `162–522` (9×40) · flexible space · copyright `826–900`. The gaps are all **8px (`--spacing-md`)**.

---

## 2. Nav-link states

| State | Look |
|---|---|
| **Default** | transparent (the blue shows through), **outline** icon, white text |
| **Selected** (current section) | **lighter-blue** (`--sidebar-ring`, #2499FF) full-width highlight, **filled** icon, white text |

Padding: `8` top/bottom, `12` left, `8` right; icon↔label gap `4`. Only one is Selected at a time.

> ⚠ **Heads-up (T3):** white 14px text on the #2499FF selected highlight is ~3:1 contrast — fine for a UI highlight, but below the 4.5:1 bar for normal text. Worth a slightly darker selected-blue if you want it to pass strictly. Your call.

---

## 3. Collapsed rail (48px)

Toggle it and the rail shrinks to **48px**: labels hide (icons only, centred), the logo shrinks to 52px, and the copyright becomes "© / 2026". Same skeleton, icon-only.

---

## 4. This is one half of the side-navigation PATTERN

Two side navs stack left-to-right on a page:
- **Primary** (this, blue) = **app** navigation — where you are in the *product*.
- **Profile** (grey, already shipped) = **record** navigation — where you are within *one client/caregiver/staff record*.

The full pattern (when to show which, how they compose, collapse behaviour) is in `patterns/side-navigation.md`.

---

## 5. Added beyond the picture (a11y)
- The rail is a real `<nav aria-label="Primary">` of links; the current one is `aria-current="page"`.
- The toggle is a real `<button aria-expanded>`.
- **Collapsed icon-only links keep an accessible name** (aria-label/tooltip) — the label is hidden.
- Figma has **no hover state** for the links (T1) — the CSS adds a subtle one; ask Figma AI to draw the official one.

---

## 6. What I did NOT change
No live Angular code touched. Spec + copy-from CSS. GitHub via branch → PR (never a direct push to `main`).
