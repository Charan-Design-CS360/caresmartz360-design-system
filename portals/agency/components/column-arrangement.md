# Column Arrangement — Agency pattern contract

**Portal:** Agency · **Layer:** 4 (Pattern, filed under Components — see layer4Classification) · **Jira parent:** C360-44737
**Measured:** 2026-09-01, live Figma · **Ruled:** 2026-09-01, Singh · **Pattern node:** `27311:46254` · **Linked atom:** `13095:43335`
**Contract version:** `2.0.0` — full behaviour spec added after Singh's ruling. Supersedes `1.0.0`.
**Machine twin:** [`column-arrangement.json`](./column-arrangement.json)

---

## 0. Purpose — why this exists

Lets someone decide **which columns a table shows, and in what order** — without a developer
changing code. Two real problems it solves:

- A table that ships every possible column becomes unreadable on a real screen. This lets each
  person keep only the columns they actually use.
- A table's column order is normally whatever the person who built it chose. This lets the person
  *using* the table choose their own order — including which single column stays pinned in view
  while the rest scrolls.

---

## 1. What it is, in plain language

A side panel with four parts, stacked top to bottom:

| Part | What it does |
|---|---|
| **Header** | Title "Column(s)" + a close (×) button. Reused, not new. |
| **Search** | Type to filter the column list. Reused, not new. |
| **Column list** | One row per column, in two groups: **Selected** and **Not selected**. |
| **Footer** | Reset (left) · Cancel / Apply (right). |

Every visible part is an **existing, already-published Agency component** — the header, the search
bar, the row, the group label, the buttons. This contract's job is documenting how they're
**assembled and how they behave**, not inventing new parts.

---

## 2. How it behaves — every action, and its effect

This section exists because Singh asked for it directly: *"Make sure with every component you have
complete behavioural and action related information and how it works."*

| Do this | What happens |
|---|---|
| **Type in Search** | Filters both groups to columns whose name matches. Doesn't change any checkbox. |
| **Check a row** | Column moves into **Selected columns**, added to the **bottom** of the current order. |
| **Uncheck a row** | Column moves into **Not selected columns**. It disappears from the table on Apply, and stops being draggable — order means nothing for a hidden column. |
| **Drag a Selected row** | Changes that column's left-to-right position in the table. Only Selected rows are draggable. |
| **Press Apply** | Commits everything — which columns show, and their order — to the real table. **Nothing changes on the table until this is pressed.** |
| **Press Cancel** or **×** | Throws away whatever was changed in this session. Table untouched. |
| **Press Reset** | Goes further than Cancel — restores the table's **default** column set and order, even undoing a customization that was saved earlier. |

---

## 3. The frozen column — not a new idea, an existing rule applied here

**Whichever column sits FIRST in "Selected columns" becomes the table's frozen column** — pinned to
the left edge while the rest of the table scrolls. Singh, 2026-09-01: *"The first selected column on
top will be always the freezed column in the table."*

**This is not new.** Your table system already has this rule — `[CS-TBL-13]` in
`Universal Html Rules/02-components/table.css`, which you ruled on 2026-08-26: *"in every table, the
first and last column must always be freezed."* It's already built and tested in Wound Management.
**This picker is simply how someone CHOOSES which column that is** — drag any column to the top of
the Selected list, and it becomes the frozen one.

One honest gap: **nothing in the picker currently shows which row is the frozen one.** The first row
looks exactly like every other checked row — no lock icon, no highlight. Worth knowing: Figma already
has an unused "Pin" icon sitting in the file that could mark it. Not built into anything yet — just
flagging that the piece exists if you want to add that cue later.

---

## 4. The column list — measured detail

Two kinds of row, and the difference between them is the whole point of the pattern:

| | Selected | Not selected |
|---|---|---|
| Checkbox | ✅ Checked | ☐ Unchecked |
| Drag handle | Yes — 6 dots, left of the checkbox | No |
| What it means | This column is on the table right now, **in this order** | This column exists but isn't showing |

**Measured instance:** a group of **12 checked, draggable rows**, then a second group of **6
unchecked rows** — 18 columns total. That count matters — an early look at the screenshot alone said
11, and it took redoing the arithmetic (12 rows × 30px = 360, which is exactly what the frame height
requires) to catch the miscount. Worth remembering: **count from the numbers, not the eye.**

There used to be a stray, ungrouped checkbox row sitting above both groups. Singh, 2026-09-01: *"The
top checkbox alongside the header is the one was by mistake, Removed now."* Re-verified live the same
day — it's now switched off in the Figma file (hidden, not deleted). Don't build it, and don't
re-open what it might have meant.

---

## 5. Sizes, in one place

| | Value |
|---|---|
| Panel width | 400px (no responsive variant exists — see §7) |
| Header height | 52px |
| Search height | 30px, fixed |
| Row height | 30px minimum |
| Group heading height | 30px minimum |
| Footer height | 54px |
| Gap between the four sections | 8px |
| Panel's own left/right inset | 12px |

Add it up: `52 + 30 + list + 54` plus three 8px gaps `= 168px of chrome, plus 30px per row`. The demo
frame was drawn at 900px tall with the content only reaching 790px — **that extra 110px is empty
canvas margin in Figma, not part of the component.** Don't build a 900px panel.

---

## 6. Defects found — two resolved, three still open

1. **RESOLVED.** ~~A code-vs-render mismatch on a stray top row.~~ That row was a Figma mistake —
   Singh removed it on 2026-09-01, confirmed live: it's now hidden in the file, not deleted.

2. **Still open — two Figma components share one name.** The atom Singh originally linked
   (`13095:43335`) is the OLDER of two components both called *"ddm rows - checkboxes + drag
   feature."* The pattern still uses the NEWER one (`27307:43097`) for the six "Not selected" rows.
   Build from the linked atom alone and you'd be missing half the pattern.

3. **Still open — a property is named backwards.** On the linked atom, `unChecked = Yes` — the
   DEFAULT — actually shows the row as **checked**. Confirmed straight from the six variant names.

4. **Still open — two legacy token names**, the tracking token (now spotted in an **8th** place) and
   the Apply button's blue, bound to a legacy-prefixed name instead of the normal brand token.

5. **New, minor — a third unused row hiding in the file.** A leftover instance sits switched off in
   the middle of the Selected group. No visual effect, just untidy — the same kind of leftover that
   caused defect 1 before it was cleaned up.

Full list, all four smaller items included, is in the JSON's `defects`.

---

## 7. What's still genuinely open

- **No keyboard way to reorder.** Dragging is the only way to reorder columns — there's no
  documented alternative for someone who can't use a mouse. This is the single biggest gap in the
  contract, not a minor one.
- **Real category names for the groups.** Figma itself still shows the placeholder text "GROUP
  HEADING" on both — the labels "Selected columns" / "Not selected columns" used throughout this doc
  are your ruling, not something typed into Figma yet.
- **Whether the panel's own list scrolls.** 18 rows fit today with no scrollbar. A real table could
  have far more columns than that — the copy-from CSS adds a scroll cap as a judgement call, since
  Figma never specified one.
- **Whether the 400px panel width is fixed or should respond to screen size.** No variant for that
  exists in Figma.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-09-01 | **2.0.0** — Singh ruled on all four open questions from 1.0.0 and asked for complete behaviour documentation on every component going forward. Added a full behaviour table (§2), connected the frozen-column rule to the existing `[CS-TBL-13]` table contract rather than treating it as new (§3), removed the stray top row he confirmed was a Figma mistake, and closed 2 of the original 4 defects. | Singh's ruling, 2026-09-01 |
| 2026-09-01 | 1.0.0 — first measurement. Built from the pattern node Singh linked (`27311:46254`) plus the atom node he linked (`13095:43335`). | Singh's request, 2026-09-01 |
