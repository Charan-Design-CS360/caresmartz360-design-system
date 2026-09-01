# Column Arrangement — Agency pattern contract

**Portal:** Agency · **Layer:** 4 (Pattern, filed under Components — see layer4Classification) · **Jira parent:** C360-44737
**Measured:** 2026-09-01, live Figma · **Pattern node:** `27311:46254` · **Linked atom:** `13095:43335`
**Contract version:** `1.0.0` — first measurement.
**Machine twin:** [`column-arrangement.json`](./column-arrangement.json)

---

## 1. What it is, in plain language

A side panel that lets someone decide **which columns a data table shows, and in what order.**

Singh's own words are the whole functional spec: *"in data table, user can shuffle or rearrange the
columns as per their design, so accordingly from this popup user can select the columns he want to
see in table + he can also rearrange the table columns by simply drag and drop the columns from 6
dots."* Everything below just measures how that idea is actually built in Figma.

The panel has four parts, stacked top to bottom:

| Part | What it does |
|---|---|
| **Header** | Title "Column(s)" + a close (×) button. Reused, not new. |
| **Search** | Type to filter the column list. Reused, not new. |
| **Column list** | One row per column. Check to show/hide. Drag the 6-dot handle to reorder. |
| **Footer** | Reset (left) · Cancel / Apply (right). |

**Nothing here is a new visual language.** Every piece — the header, the search bar, the row, the
group label, the buttons — is an **existing, already-published Agency component.** This contract's
real job is documenting how they're **assembled**, not inventing new parts.

---

## 2. The column list — the part that actually matters

Two kinds of row, and the difference between them is the whole point of the pattern:

| | Currently shown | Available |
|---|---|---|
| Checkbox | ✅ Checked | ☐ Unchecked |
| Drag handle | Yes — 6 dots, left of the checkbox | No |
| What it means | This column is on the table right now, **in this order** | This column exists but isn't showing |

Check a row to add its column. Uncheck to remove it. **Drag only works on checked rows** — that's
the design's own logic: an unchecked column isn't on the table, so there's no position to drag it
into yet.

**Measured instance:** 1 row on its own (unclear purpose — see §5), then a group of **12 checked,
draggable rows**, then a second group of **6 unchecked rows**. That count matters — an early look at
the screenshot alone said 11, and it took redoing the arithmetic (12 rows × 30px = 360, which is
exactly what the frame height requires) to catch the miscount. Worth remembering: **count from the
numbers, not the eye.**

---

## 3. Sizes, in one place

| | Value |
|---|---|
| Panel width | 400px (no responsive variant exists — see §5) |
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

## 4. Four real defects found while measuring this

1. **Two different Figma components share the exact same name.** The atom Singh linked (`13095:43335`)
   is the OLDER of two components both called *"ddm rows - checkboxes + drag feature."* The pattern
   actually uses a NEWER one (`27307:43097`) for the ungrouped row and the six "available" rows, and
   the linked one only for the twelve "visible" rows. Build from the atom Singh linked alone and
   you'd get half the pattern right and half missing.

2. **A property is named backwards.** On the linked atom, the toggle is called `unChecked`. Setting
   `unChecked = Yes` — the DEFAULT — actually shows the row as **checked**. `unChecked = No` shows it
   **unchecked**. Confirmed straight from the six variant names in Figma, not a guess. Don't carry
   this name into a real build; call it `checked`/`selected` instead, the right way round.

3. **No way to reorder without a mouse.** Nothing in Figma shows a keyboard alternative to the drag
   handle — no "move up/down" buttons, no documented keyboard behaviour. As designed, someone who
   can't use a mouse can't reorder columns at all. **This is the most important gap in this
   contract** — it needs a real answer before this pattern ships, not just a note.

4. **Two legacy token names, adding to the pile already found elsewhere:** the tracking token
   (`X-tracking-0`) — now spotted in an 8th place — and the Apply button's blue, which is bound to a
   legacy-prefixed name (`X-Brandblue-600`) instead of the normal brand token, despite being the exact
   same colour (`#0077ff`) used everywhere else.

Full list, including two smaller ones (icon slightly too big for its own padding, and the search
placeholder using a heavier font-weight than a normal field placeholder) is in the JSON's `defects`.

---

## 5. What Figma doesn't say — genuinely open, not guessed

- **What the two group headings mean.** Both say the placeholder text "GROUP HEADING" — nobody ever
  typed real category names. This contract assumes "currently shown" / "available", because that's
  the standard shape for this exact kind of column picker — but that's an assumption, not something
  Figma or Singh actually said.
- **What that one row above the groups is for.** No annotation anywhere. Could be a "select all", a
  column that's always shown and can't be hidden (like a checkbox or actions column), or something
  else.
- **Where a newly-checked column lands in the order.** Assumed: it's added to the end of the visible
  list and can then be dragged like anything else — again, the standard convention, not a measured
  fact.
- **Whether the list scrolls.** The measured example has 18 rows and fits without scrolling. A real
  table could easily have more columns than that, and no maximum height or scroll behaviour was ever
  specified.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-09-01 | **1.0.0** — first measurement. Built from the pattern node Singh linked (`27311:46254`) plus the atom node he linked (`13095:43335`), cross-checked against `get_design_context`'s full reference code and a rendered screenshot. Four defects found and flagged, four items left genuinely open rather than guessed. | Singh's request, 2026-09-01 |
