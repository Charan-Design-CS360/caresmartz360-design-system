# Page Header — Agency component contract

**Portal:** Agency · **Layer:** 3 (Components) · **Jira parent:** C360-44737
**Measured:** 2026-08-25, live Figma · **Section:** `27232:63236` · **Set:** `14160:189662`
**Contract version:** `1.0.0` — complete. Supersedes the `0.1.0` partial published earlier the same day.
**Machine twin:** [`page-header.json`](./page-header.json)

---

## 1. What it is, in plain language

A title with an optional smaller line of text under it, in four sizes. Simple on the surface —
but the four sizes are **not** the same component scaled up. Each one uses a different text style,
and **each size offers a different set of optional extras.**

| Size | Height | Title | Description | Optional extras available |
|---|---|---|---|---|
| **S** | 32px | Label/small — 10px | 10px | *description only* |
| **M** | 40px | Heading/h6 — 14px | 12px | + left icons, right icons, help |
| **L** | 44px | Heading/h5 — 16px | 12px | + all of the above **+ timezone chip** |
| **XL** | 44px | Heading/h4 — 18px | 12px | + all of the above **+ timezone chip** |

**Why L and XL are both 44px tall** — this was the puzzle that blocked the earlier draft: both titles
sit on a **24px line**, so both boxes are the same height. Only the letters differ (16px vs 18px).
Heights are never set anywhere; they *emerge* from line-height + a 4px gap, because the container has
**zero padding**. **So never set a height on this component** — set the type and let it size itself.

**Size S is the odd one out** in three ways: its title is a *label* style rather than a heading, it's
the only size with no letter-spacing adjustment, and it's the only one whose description is 10px
instead of 12px.

---

## 2. The one thing to build from

Everything below is measured. The container is identical at all four sizes:

- `display: flex`, `flex-direction: column`, `align-items: flex-start`
- **gap `spacing/sm` (4px)** — title to description
- **padding `spacing/none` (0)** — the component adds no padding of its own
- Title colour `text/primary`, description colour `text/secondary` — same at every size

Only three things change with size: **the title's type style**, **the title-row gap**, and **which
extras exist**.

---

## 3. Twelve defects

The first six are new to this measurement. Ordered by how much they'd hurt.

1. **An element literally named `missing` ships in the component.** 16×30, empty, inside the
   left-icon group — on all three sizes that have that group (M, L, XL). Either a placeholder nobody
   filled or a broken instance. It should not be in a published component.
2. **The timezone chip uses no tokens at all** — background `rgba(51,74,101,0.05)`, text `#334a65`,
   radius 4, padding 4/2, gap 4, height 20. Eight values, zero tokens, and **neither colour exists in
   the Agency palette.** It's the least compliant thing in the component.
3. **The timezone chip's line-height is a bare `1.4`** instead of a token — the same mistake already
   recorded for the `Fields/Title 12M` style.
4. **The title-row gap is inconsistent and off-scale.** M uses 6px, L and XL use 8px. **6 isn't on
   the spacing scale at all** (0/4/8/12/16…), so it can't be bound to a token even in principle.
5. **Same value, one bound and one not:** the left-icon gap is a raw `16`, while the right-icon gap
   binds `spacing/xl` — also 16 — in the same row of the same component.
6. **The help icon's asset is named `help_black_18dp` but renders at 16px.** The name misstates its
   own size.
7. **`font-family/font-family/primary-font`** — a malformed token name with a doubled segment. The
   export has exactly one: **`font-family/primary`**.
8. **`fonts/tracking/X-tracking-0`** — legacy `X-` name, should be **`fonts/tracking/tracking-0`**.
   Now seen in **five** component families, so it's one systematic Figma rename, not five fixes.
9. **`fonts/tracking/X-tracking-neg-024`** → should be **`fonts/tracking/tracking-neg-024`**.
10. **`control/height-default` = 30** is bound but no `control/*` group exists in the export.
    **Second sighting** — the empty-state buttons bind it too.
11. **`Search & Filetrs` is misspelled** — searching Figma for "Filters" won't find that node.
12. **Figma's own description is incomplete.** It lists the optional extras but never says S has
    *none* of them, or that the timezone chip is missing from M. A tool trusting the prose would
    build the wrong API.

---

## 4. Accessibility — four items raised, none resolved

- **Every icon is icon-only with no accessible name recorded** — `arrow_circle_left`, `expand_more`,
  `expand_more` **rotated 180°**, `cached`, and help. The rotated one especially needs a *different*
  name from the unrotated one; they look and mean different things.
- **Target sizes are under the 24px minimum** — interactive icons are 20×20, help is 16×16. The
  16px spacing between left icons may or may not satisfy the spacing exception. Needs a ruling, and
  it pairs with the existing 18px-chip target-size flag.
- **Size S renders both title and description at 10px** — below the 12px body-copy floor this design
  system records, which has exactly one approved exception. S may need its own exception or a rethink.
- **No contrast ratios were computed.** The timezone chip is the most likely to fail and the least
  likely to have been reviewed, since neither of its colours is a token.

---

## 5. Where this belongs

**The 4-size header is a component** — filed here. ✅

**"complete header" (`27232:65833`) is genuinely a Layer-4 Pattern** — it composes this header, a
6-button action row, and the search/filter bar into a page-level region, which matches this repo's own
definition of a Pattern.

**Still blocked, but less than before.** The Layer-4 index needs a 40-character Figma *component* key
and the tools used here return only node ids. **However** — `component-mapping.json` in this very
folder carries real 40-hex keys for Button and Fields, so such keys clearly *are* obtainable by some
method. That method isn't documented and wasn't available to this session. Once it's known, registering
"complete header" under C360-45159 is straightforward.

---

## 6. Not verified

- The `old=Yes` deprecated variants — proven to exist by the variant axis, never read.
- The 6 action glyphs on the composed header, unresolved to Material Symbols names.
- The search/filter bar's interior geometry.
- What the `missing` element was supposed to be.
- Dark / High Contrast / Warm Dark / HC Light — light mode only. Every colour here binds a
  five-mode token **except** the timezone chip, which binds none.
- Density behaviour. Padding is 0 at every size so density can't change it, but the type tokens
  weren't tested under a non-default density.
- Contrast ratios.
- Whether any product screen uses any of these forms today.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-25 | **1.0.0 — complete.** All four variants measured via `get_design_context` after the Figma stall cleared. Type mapping per size resolved; all four heights independently reconciled by arithmetic; five optional-element props and six new defects recorded. | Owner instruction, 2026-08-25 |
| 2026-08-25 | 0.1.0 — partial. Structure and tokens only; interior geometry unread after `get_design_context` failed four times. | Owner instruction, 2026-08-25 |
