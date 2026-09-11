<!--
=============================================================================
LAYER-4 PATTERN: Page Setup — the basic page skeleton every content page uses.
Defines the grid, gutters, and how the shipped components compose, so any AI
tool reproduces the SAME structure from the repo instead of reinventing it.
Measured live from Figma demo page 27337:73093 (1440x900) on 2026-09-04, and
validated by a dimensional dry-run (AI-Ecosystem/validate-page-setup-dryrun.sh,
16/16). CREATOR: Claude (DESIGN-SYSTEM lane), Singh request. STATUS: assembled,
ratification pending (visual sign-off).
=============================================================================
-->

# Pattern — Page Setup (the basic page skeleton)

Every content page is built from the SAME skeleton. Do not reinvent it — reuse the
published components and the grid below, taken from the repo.

## 1. The grid (measured, all sums reconcile)

```
┌──────────┬───────────────────────────────────────────────────────────────┐
│ PRIMARY  │ SHELL (1392)                                                    │
│ side nav │ ┌───────────────────────────────────────────────────────────┐ │
│ (blue)   │ │ GLOBAL HEADER  (52h, full shell width)                     │ │
│  48      │ ├──────────────┬────────────────────────────────────────────┤ │
│  or 158  │ │ PROFILE nav  │ PAGE CONTENT (1152)                         │ │
│  (full   │ │ (grey) 240   │  ├ Tab Container      (50h)                 │ │
│  height) │ │              │  ├ Data Container      (Header HUG + Table) │ │
│          │ │              │  └ Page Info           (messages)           │ │
│          │ │              │                                             │ │
│          │ └──────────────┴────────────────────────────────────────────┘ │
└──────────┴───────────────────────────────────────────────────────────────┘
   full-height              header spans the shell; body splits below it
```

**Horizontal (@1440):** `primary 48 + shell 1392 = 1440`; inside the body, `profile 240 + content 1152 = 1392`.
**Vertical (@900):** `global header 52 + body 848 = 900`. Inside page content the blocks **HUG their content** — they are not fixed heights. Measured instance, the data-table demo page (`27337:73093`, live 2026-09-10): `tab 50 + data container 400 + page info 136 = 586`, where the data container is itself `page-header 110 + middle matter 290`. **Treat those as one sample, not as constraints** — a header with no filter toolbar hugs to 68, and the middle matter grows with its rows.

- **Primary side nav** is OUTERMOST and **full height** (left of everything, incl. the header). 48 collapsed / 158 expanded.
- **Global header** (52) spans the **shell** width only (right of the primary nav), above the body.
- **Body** = `[Profile side nav 240] [Page content = shell − 240]`. At 1440 that is 1152; it is **fluid** — page content = `shell_width − 240`.
- **Page content** stacks, in order: **Tab Container → Data Container → Page Info** (they butt; each owns its inset).

## 2. The gutter — 12px (`--spacing-lg`) everywhere

Every content block insets by **12px**: the first tab (x12), the page header (x12/y12), the search & filters row (x12), the table's frozen column (x12), the page-messages box (x12/y12), and the global header's left actions (x12). One page gutter token: `--spacing-lg`.
The header's two rows are **12px** apart; the table's cells follow the table contract.

## 3. What composes it (all already shipped — reuse, do not rebuild)

| Zone | Component | Contract |
|---|---|---|
| Blue rail | Primary Side Navigation | `primary-side-navigation.*` |
| Grey record nav | Profile Side Navigation | `profile-side-navigation.*` |
| Tab bar | Tabs (Primary) | `tabs.*` |
| Header block | Complete Header (12px gutter) | `page-header.*` → `completeHeader` |
| Search & filters (header row 2) | Filters (dropdown/toggle/checkbox) + Search + Apply/Reset + Columns | `filters.*`, `column-arrangement.*` |
| Table | Table (frozen-left + scrollable + frozen-right) | `table.*` |
| Global header, page-messages | (global header + page-messages atoms) | to spec separately |

## 4. The Data Container + table

- **Data Container = HUG** — it is `page-header (hug) + middle matter (hug)`. **Owner ruling, Singh 2026-09-11: the page header is HUG (auto height), never fixed.** Do not hard-code either block.
- **Header complete = HUG**, derived as `sum(visible rows + 12px row gaps) + 24` (12 top + 12 bottom padding). This is the `completeHeader` molecule (page-header.json). The two shipped shapes:
  - **with** the search & filters row → `44 + 12 + 30 + 24` = **110** (live on `27232:65833` and the data-table demo page).
  - **without** it → `44 + 24` = **68** (live on the empty-state and form-grid pattern pages).
- ⚠️ **Correction 2026-09-11:** this section previously published a fixed **98** for the complete header and a fixed `Data Container 214 = 98 + 116`. The 98 dropped the header's 12px *bottom* padding, and stating either as fixed contradicted the hug behaviour. Replaced by the formulas above; live values are 110 (with toolbar) / 68 (without).
- The **search & filters row (30)** = Nav Search (140) + Filters group [dropdown 158 · toggle 118 · checkbox 112 · Apply · Reset, 4px apart] on the left, and the **Columns** trigger pinned right. The filter pills are the `filters.*` component (Filter atom → Search & Filters row → complete header); the Columns trigger is `column-arrangement.*`.
- The table is **frozen-left + scrollable middle + frozen-right** — the shipped table rule (CS-TBL-13: first & last columns frozen, middle scrolls). Header row 34, data rows 30 (adjacent cells share their 1px border). **Sample widths on the demo page as of 2026-09-08 (live Figma):** frozen-left `table_column` **200** @ the 12px gutter · scrollable `sample-layout_table` **598** (3 × 200) · frozen-right `Table/Master Actions` **330** (History + Edit per row) = 1128 + 24 gutter = 1152. *(Measured 2026-09-04 as 115 / 953 / 60 — the Figma-AI lane re-laid the sample table between 4 and 7 Sep; the rule did not change, only the sample.)*

## 5. Guidelines for any AI tool building a page (Singh's rule: don't reinvent)

1. **Reuse the published components** in the fixed order **Primary → [Global header over (Profile → Content)]**.
2. **Widths:** primary 48/158 and profile 240 are fixed; page content is **fluid** = `shell − 240`. Never hardcode 1152.
3. **Gutter is always `--spacing-lg` (12px)** on content blocks; components own their own gutter (e.g. the complete header) — do NOT add page-level padding on top.
4. **Content order:** Tab Container → Data Container (Header complete + table) → Page Info.
5. **Table** = frozen-left + scrollable + frozen-right (CS-TBL-13); don't re-derive column freezing.
6. Take every value from the repo contracts — this pattern only defines the **composition**, not the component internals.

## 6. Validation
- Dimensional dry-run: `AI-Ecosystem/validate-page-setup-dryrun.sh` — **16/16**, all grid sums + the 12px gutter reconcile against the measured Figma.
- Visual: a full-page reproduction (real components + Material Symbols icons) rendered at 1440×900 was compared against Figma `27337:73093`. Singh confirmed the **basic page setup (grid) is correct**; component-internal fidelity (profile nav / header / table / icons) refined 2026-09-04. Final visual sign-off pending.

## Provenance
Measured 2026-09-04 from demo page 27337:73093 (get_metadata full tree + get_screenshot). Composes components measured 2026-09-03/04. All widths/gutters bind repo tokens. **Re-verified live 2026-09-08:** the Figma-AI lane had renamed the section to "Page Layout Patterns" and this page to `pattern-page-data-table`, and re-laid the sample table — grid, gutters and composition are unchanged; §4 sample widths updated. Two further pages now exist in the section (`pattern-page-empty-state` 27401:30856, `pattern-page-form-grid` 27401:31504) on the expanded 158 rail (content = 1042, confirming the fluid rule) — to be added as variants of this shell.
