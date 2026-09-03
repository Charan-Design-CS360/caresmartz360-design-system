<!--
=============================================================================
PAIRED CONTRACT (human twin) for tabs.json. This is the PLAIN-LANGUAGE spec;
the .json is the machine spec; the CSS is Universal Html Rules/02-components/
tabs.css. Keep all three in sync. Measured live from Figma (Design System Agency
V2.0) on 2026-09-03 by Claude (DESIGN-SYSTEM lane), on Singh's request.
STATUS: assembled, Singh ratification pending.
=============================================================================
-->

# Tabs

Two official tab styles for the whole product. Singh, 2026-09-03: both are in scope, named **Primary** (underline) and **Secondary** (segmented).

---

## 1. Primary — underline tabs

A row of text tabs for switching **top-level sections**. The current tab is marked by a brand-blue underline.

| State | Label colour | Underline |
|---|---|---|
| **Default** | grey (`text/secondary`) | grey (`field/border-default`) |
| **Hover** | dark (`text/primary`) | blue (`border/focus`) |
| **Selected** | blue (`text/brand`) | blue (`action/primary/bg`) |
| **Disabled** | muted (`action/disabled/text-neutral`) | faint (`action/disabled/bg`) — not clickable |
| **Empty** | — | a filler slot that just extends the grey underline to the end of the row |

- Text is Inter Medium 14. Each tab has 16px above, 4px below, and a 16px gap to the next.
- You added the **Disabled** state during the session (Figma node 27334:72865).

---

## 2. Secondary — segmented tabs

A compact **joined pill group** for nested tabs, sub-sections, or a single-choice filter. Segments butt together; corners round only at the **start** and **end** of the row.

| State | Look |
|---|---|
| **Inactive** | grey outline (`border/subtle`), dark text, no fill |
| **Hover** (inactive) | light-blue fill (`action/secondary/hover`), blue border (`border/brand`), blue text (`action/secondary/text`) |
| **Active** | solid blue fill (`action/primary/bg`), white text (`action/primary/text-neutral`), no border |

- Segments are 24px tall, min 40px wide, Inter Regular 12.
- Position in the row (Start / Mid / End) only controls which corners are rounded.

---

## 3. Tokens — all real, all resolvable

Every colour and size on both styles binds to a **semantic token that already exists in the repo** (checked 2026-09-03), each with its dark / high-contrast / warm variants. No raw hex, no made-up names.

**One thing to reconcile (defect T1):** the new Primary **disabled** label. In Figma its token reads the same dark grey as a normal tab (#475569), but the repo maps that token to a **lighter** grey (which looks more "disabled"). I've bound the token name (so it themes correctly), but Figma and the repo disagree on the value — worth a quick fix on the Figma side so they match. Your call which value is right.

---

## 4. Accessibility (added beyond the picture)

Both styles must be built as a proper **tablist**: the current tab marked selected and tied to its panel, disabled tabs skipped, and **arrow keys** moving between tabs (the standard tabs keyboard pattern). Focus rings stay visible. None of this is drawn in Figma but a real tab component needs it. Good news: the secondary hover-blue text is already contrast-checked at 5.30:1 (passes AA).

---

## 5. Small gaps I logged (defects, for later)

- **T3** — the secondary component says it has "badge indicator" variants (a count on a tab); those specific variants weren't in what I read. If you want badges on segmented tabs, I'll read them when needed.
- **T4** — secondary is only the small size so far; no medium/large segmented size exists yet.
- **T5** — no disabled state for the *secondary* segments, and no extra combos beyond what's above.

---

## 6. What I did NOT change

No live Angular code touched. This is the spec + the copy-from CSS. The GitHub update goes through the proper branch → PR flow (never a direct push to `main`).
