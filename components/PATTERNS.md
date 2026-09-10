<!--
=============================================================================
FILE BRIEF: The generic HTML patterns to COPY — the markup shape each reference
stylesheet in this folder expects. Same rule as the .css files: this is a
repository of shared code for reference, never an import. Read 00-README.md
first; it explains how a feature adopts a block and what propagates by itself.
CREATOR: Opus (Claude), Wound Management session, on Singh's 2026-08-24
         reference-repository ruling.
STATUS: ASSEMBLED — Singh ratification pending.
=============================================================================
-->

# PATTERNS — the HTML to copy

Every snippet below is the markup the matching `.css` file in this folder was
written against. Copy the snippet **and** the CSS block it names, keep the class
names and the `[ID]` comments, and change only the content.

Three rules that apply to every pattern here:

1. **Semantic element first.** A button is a `<button>`, an input is an `<input>`,
   a table is a `<table>`. The classes style what the element already means; they
   never replace it. A `<div>` with a click handler is not a button.
2. **Icons are decorative unless they carry the only label.** Every icon that sits
   beside text gets `aria-hidden="true"`. An icon that IS the label needs an
   `aria-label` on the control.
3. **No inline `style=`.** `01-universal/css-approach.md` UIG-008 is BLOCK
   severity on visual inline styles, and so is `!important`.

---

## 1. Button with a leading icon

CSS: `buttons.css` [CS-BTN-01] [CS-BTN-02] [CS-BTN-03] + a type block.

```html
<!-- The default .cs-btn is the LEADING-icon case: 8px on the icon side, 12px on
     the label side. That asymmetry is the component's defining detail — see
     buttons.css [CS-BTN-01]. type="button" is explicit so the button cannot
     accidentally submit a form. -->
<button type="button" class="cs-btn cs-btn--primary">
  <!-- 18px slot. aria-hidden because the label beside it already says "Save":
       announcing the icon too would read the action twice. -->
  <span class="cs-btn__icon" aria-hidden="true">
    <svg viewBox="0 0 18 18" width="18" height="18" focusable="false"><!-- glyph --></svg>
  </span>
  <span class="cs-btn__label">Save</span>
</button>
```

Three more shapes of the same component:

```html
<!-- TRAILING icon — the padding mirrors itself, nothing else changes. -->
<button type="button" class="cs-btn cs-btn--primary cs-btn--trailing">
  <span class="cs-btn__label">Next</span>
  <span class="cs-btn__icon" aria-hidden="true"><svg width="18" height="18"></svg></span>
</button>

<!-- LABEL ONLY, compact (24px) — the form used inside dense tables. -->
<button type="button" class="cs-btn cs-btn--no-icon cs-btn--compact cs-btn--soft">
  <span class="cs-btn__label">Browse File</span>
</button>

<!-- ICON ONLY — 30 × 30 square. The aria-label is NOT optional: Figma has no
     label node to carry one, so it is an implementation requirement the design
     cannot express (SPEC-07b §12.1). Without it the button is unnamed. -->
<button type="button" class="cs-btn cs-btn--icon-only cs-btn--destructive" aria-label="Delete wound record">
  <span class="cs-btn__icon" aria-hidden="true"><svg width="18" height="18"></svg></span>
</button>

<!-- OUTLINED — no fill at all, 1px border, label recolours. Compose the type
     modifier with --outlined; the outlined treatment is per type. -->
<button type="button" class="cs-btn cs-btn--primary cs-btn--outlined">
  <span class="cs-btn__label">Cancel</span>
</button>

<!-- DISABLED — use the real attribute, not a class. It removes the button from
     the tab order and from the accessibility tree's actionable set, which a class
     cannot do. Use aria-disabled="true" ONLY when the control must stay focusable
     so a screen-reader user can find out why it is unavailable. -->
<button type="button" class="cs-btn cs-btn--primary" disabled>
  <span class="cs-btn__label">Save</span>
</button>
```

---

## 2. Field with label and required marker

CSS: `fields.css` [CS-FLD-01] … [CS-FLD-12].

```html
<!-- The stacked field: label row (16px) + 4px gap + control (30px) = 50px.
     The <label for> / <input id> pair is what makes the label clickable and what
     names the input to a screen reader — the visual position does not do that. -->
<div class="cs-field">

  <div class="cs-field__label-row">
    <!-- The text and the required marker sit in ONE group, 2px apart, so the
         marker tracks the end of the text rather than the end of the row. -->
    <span class="cs-field__label-text">
      <label class="cs-field__label" for="wound-size">Wound size</label>
      <!-- The required marker is an 8px SVG burst, NOT a typographic asterisk:
           substituting "*" changes the metrics (SPEC-12 §4). It is decorative
           here because `required` on the input is what actually conveys the
           requirement. Whether it should ALSO be announced is OPEN-REGISTER O-7,
           so do not invent an aria pattern for it. -->
      <span class="cs-field__required" aria-hidden="true">
        <svg viewBox="0 0 5.162 5.6" focusable="false"><!-- emergency glyph --></svg>
      </span>
    </span>

    <!-- Optional help affordance. A real <button>, because it is operable.
         accessibility.md: it must NOT be role="dialog", must not trap focus, and
         must be dismissible with Escape. -->
    <button type="button" class="cs-field__help" aria-label="What counts as wound size?">
      <svg viewBox="0 0 12 12" focusable="false"><!-- help glyph --></svg>
    </button>
  </div>

  <div class="cs-field__control">
    <div class="cs-field__value">
      <input id="wound-size" type="text" placeholder="Enter value..." required>
    </div>
    <!-- Optional trailing control slot (calendar, chevron, clock…). It butts the
         right border because the control's right padding is 0. -->
    <span class="cs-field__toy" aria-hidden="true"><svg width="16" height="16"></svg></span>
  </div>
</div>
```

The error state, with its message:

```html
<!-- The state modifier goes on the BLOCK, so the control recolours and the label
     does not. aria-describedby ties the message to the input; aria-invalid says
     what the colour says, for people who cannot see the colour.
     NOTE: no type-style class is set on the message on purpose — 12px vs Figma's
     10px is an open question (fields.css [CS-FLD-12], OPEN-REGISTER A-3). Add
     .cs-type--field-value or .cs-type--body-micro at the feature and flag it. -->
<div class="cs-field cs-field--error">
  <div class="cs-field__label-row">
    <span class="cs-field__label-text">
      <label class="cs-field__label" for="wound-size-2">Wound size</label>
      <span class="cs-field__required" aria-hidden="true"><svg></svg></span>
    </span>
  </div>
  <div class="cs-field__control">
    <div class="cs-field__value">
      <input id="wound-size-2" type="text" aria-invalid="true"
             aria-describedby="wound-size-2-msg" required>
    </div>
  </div>
  <p class="cs-field__message cs-field__message--error" id="wound-size-2-msg">
    <span class="cs-field__message-icon" aria-hidden="true"><svg></svg></span>
    This field is required.
  </p>
</div>
```

And the other field component — one bordered block, 62px, no compact axis
(`fields.css` PART 2). It is **not** a size of the field above:

```html
<div class="cs-fieldset cs-fieldset--focus">
  <div class="cs-fieldset__label-row">
    <label class="cs-fieldset__label" for="fs-1">Field label</label>
  </div>
  <div class="cs-fieldset__input-row">
    <div class="cs-fieldset__value">
      <input id="fs-1" type="text" placeholder="Enter value...">
    </div>
  </div>
</div>
```

---

## 3. Table header row

CSS: `table.css` [CS-TBL-01] … [CS-TBL-07].

```html
<!-- A real <table> with <thead>/<tbody>: the row and column relationships come
     from the elements, and no ARIA can add them back afterwards. Header 34px,
     data row 30px, inline-edit row 44px — every cell owns its own 1px border, so
     the table reads as a grid, not as horizontal rules. -->
<table class="cs-table">
  <thead>
    <tr>
      <!-- Control-column header: 32px wide, 4px padding all round, centred. -->
      <th class="cs-table__head-cell cs-table__head-cell--control" scope="col">
        <span class="cs-table__icon-24">
          <input type="checkbox" class="cs-checkbox" aria-label="Select all rows">
        </span>
      </th>

      <!-- Plain header. The DEFAULT header carries NO sort icon: sorting is
           opt-in per column, not decoration on every header (SPEC-08b §3.2). -->
      <th class="cs-table__head-cell" scope="col">
        <span class="cs-table__head-inner">
          <!-- Case travels with the CONTENT string. The CSS sets
               text-transform: none and asserts nothing about wording — that
               dispute is OPEN-REGISTER O-13. -->
          <span class="cs-table__head-label">Admission date</span>
        </span>
      </th>

      <!-- Sortable + mandatory + help. ORDER MATTERS and is read off the Figma
           variant: title, MANDATORY, sort, HELP (help is always last).
           aria-sort on the <th> is what a screen reader announces; the two
           triangles are separate buttons because the DS authors them that way. -->
      <th class="cs-table__head-cell" scope="col" aria-sort="ascending">
        <span class="cs-table__head-inner">
          <span class="cs-table__head-label">Wound size</span>
          <span class="cs-table__required" aria-hidden="true"><svg></svg></span>
          <span class="cs-sort cs-sort--asc">
            <button type="button" class="cs-sort__up" aria-label="Sort Wound size descending"></button>
            <button type="button" class="cs-sort__down" aria-label="Sort Wound size ascending"></button>
          </span>
          <button type="button" class="cs-table__help" aria-label="How is wound size measured?">
            <svg></svg>
          </button>
        </span>
      </th>

      <!-- Empty header: NOT an empty cell. 32px min-width with the label still
           in the DOM at opacity 0, so column alignment survives. -->
      <th class="cs-table__head-cell cs-table__head-cell--empty" scope="col">
        <span class="cs-table__head-inner">
          <span class="cs-table__head-label">Actions</span>
        </span>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td class="cs-table__cell cs-table__cell--control">
        <span class="cs-table__icon-24">
          <input type="checkbox" class="cs-checkbox" aria-label="Select row: 12 Aug 2026">
        </span>
      </td>
      <td class="cs-table__cell">12 Aug 2026</td>
      <td class="cs-table__cell">2.4 × 1.1 cm</td>
      <!-- Link cell: centred, no underline, one variant only — the DS defines no
           hover, focus or visited treatment for it (SPEC-08a §8.2). -->
      <td class="cs-table__cell cs-table__cell--link"><a href="#">View</a></td>
    </tr>

    <!-- Inline-edit row: 44px, and the border lives on the FIELD, not the cell. -->
    <tr>
      <td class="cs-table__cell cs-table__cell--control"></td>
      <td class="cs-table__cell cs-table__cell--edit" colspan="3">
        <span class="cs-field-inline">
          <span class="cs-field-inline__value">
            <input type="text" placeholder="MM/DD/YY" aria-label="Admission date">
          </span>
        </span>
      </td>
    </tr>
  </tbody>
</table>
```

---

## 4. Tag

CSS: `tags-chips.css` [CS-TAG-01] … [CS-TAG-04].

```html
<!-- 18px tall, 4px radius — IT IS NOT A PILL — 1px border and label on the SAME
     token, background tags/neutral-bg, and the uppercase comes from the Figma
     text style itself (the one verified text-transform in the system).
     A <span>, because a tag is a label. If it is clickable it is a button, and
     that component does not exist in `badges/other`. -->
<span class="cs-tag">
  <span class="cs-tag__label">Draft</span>
</span>

<!-- With a leading icon — 4px gap, icon inherits the tag's colour token. -->
<span class="cs-tag">
  <span class="cs-tag__icon" aria-hidden="true"><svg></svg></span>
  <span class="cs-tag__label">Attachment</span>
</span>

<!-- The other three published variants. Compose the two modifiers; there are
     exactly four variants in Figma and no others. -->
<span class="cs-tag cs-tag--borderless"><span class="cs-tag__label">Subtle</span></span>
<span class="cs-tag cs-tag--disabled"><span class="cs-tag__label">Archived</span></span>
<span class="cs-tag cs-tag--disabled cs-tag--borderless"><span class="cs-tag__label">Archived</span></span>
```

⚠ **There is no coloured status tag here, and you may not make one.** `badges/other`
has no hue axis at all (SPEC-08a §5.3). A green "Healing" or red "Deteriorating"
tag needs a design-system answer first — OPEN-REGISTER **O-15 / flag F-003**. For a
plain status, use the dot treatment, which is a different component:

```html
<!-- Status = 8px dot + label on the row background. No pill, no border, no
     uppercase, and the label is Inter REGULAR 12/16 — not the tag's 10px 600.
     The dot colour is supplied by the feature via `color`, because Figma's three
     accents are raw un-tokenised styles (tags-chips.css [CS-STAT-02]). -->
<span class="cs-status">
  <span class="cs-status__dot" aria-hidden="true"></span>
  <span class="cs-status__label">Active</span>
</span>
```

---

## 5. Search field

CSS: `search-field.css` [CS-SRCH-01] … [CS-SRCH-03].

```html
<!-- 30px, no border, filled with action/soft/bg — that soft fill and the missing
     border are what distinguish a search box from a text input at a glance.
     type="search" tells the browser and assistive tech what it is. The visible
     box is the CONTAINER; the input is reset to transparent inside it. -->
<div class="cs-search">
  <span class="cs-search__icon" aria-hidden="true">
    <svg viewBox="0 0 18 18" width="18" height="18" focusable="false"><!-- search glyph --></svg>
  </span>
  <!-- aria-label, because the DS gives this component no visible label and a
       placeholder is not a label (it disappears the moment someone types). -->
  <input type="search" class="cs-search__input" placeholder="Search" aria-label="Search wounds">
</div>
```

⚠ `Nav Search` has **one** variant: no hover, no focus, no filled, no disabled and
no error treatment, and **no clear/✕ affordance**. If a design shows one, it is not
from the design system. The missing focus indicator is a real WCAG 2.4.7 obligation
the DS cannot currently satisfy — OPEN-REGISTER **O-2**.

---

## 6. Extras — the remaining generic atoms

Not on the requested list, included because the same page usually needs them and
their CSS is already in this folder.

```html
<!-- SELECT TRIGGER — 30px, radius 4px. The `:` and the value render only in the
     active state, which the modifier reveals. aria-haspopup/aria-expanded are
     the parts the CSS cannot express. -->
<button type="button" class="cs-select cs-select--active"
        aria-haspopup="listbox" aria-expanded="true">
  <span class="cs-select__label">Status</span>
  <span class="cs-select__sep">:</span>
  <span class="cs-select__value">Healing</span>
  <span class="cs-select__icon" aria-hidden="true"><svg width="18" height="18"></svg></span>
</button>

<!-- OPEN MENU. Hover is a SOLID brand-blue row with white text; the pale tint is
     active/selected — getting those two the wrong way round is the most likely
     copying error here. The panel has NO shadow: Figma's is a raw untokenised
     rgba, so it is omitted rather than hardcoded (select.css [CS-SEL-05]). -->
<ul class="cs-menu" role="listbox" aria-label="Status">
  <li class="cs-menu__item cs-menu__item--selected" role="option" aria-selected="true">
    <span class="cs-menu__label">Healing</span>
  </li>
  <li class="cs-menu__item" role="option" aria-selected="false">
    <span class="cs-menu__label">Deteriorating</span>
  </li>
</ul>

<!-- CHECKBOX / RADIO WITH A LABEL — the only Figma-sanctioned pairing: 4px gap,
     24px control. Wrapping in <label> makes the text part of the hit target. -->
<label class="cs-control-row">
  <input type="checkbox" class="cs-checkbox">
  <span class="cs-control-row__label">Include archived wounds</span>
</label>

<label class="cs-control-row">
  <input type="radio" name="dressing" class="cs-radio">
  <span class="cs-control-row__label">Foam dressing</span>
</label>

<!-- TOGGLE — ON IS GREEN, not blue. The word "Active"/"Inactive" goes OUTSIDE the
     control: the toggle carries no internal text and there is no
     toggle-with-label component in the design system (SPEC-11 §5.2). -->
<span class="cs-control-row">
  <label class="cs-toggle">
    <input type="checkbox" class="cs-toggle__input" checked>
    <span class="cs-toggle__track"><span class="cs-toggle__dot"></span></span>
  </label>
  <span class="cs-control-row__label">Active</span>
</span>
```

---

## Column Arrangement — the "Column(s)" side flyout

CSS: `column-arrangement.css` [CS-COLPANEL-01..08]. Contract:
`portals/agency/components/column-arrangement.md`. Lets a user show/hide table columns and drag to
reorder the visible ones.

**Two things this markup does that Figma's own design does not:** it puts a **max-height + scroll**
on the row list (`[CS-COLPANEL-04]` — no scroll behaviour was ever measured, so this is a judgement
call, not a copy of Figma), and it adds **keyboard Move up/down buttons** to every row
(`[CS-COLPANEL-07]` — Figma's design has no keyboard alternative to drag-and-drop, which fails
WCAG 2.1 SC 2.1.1 as designed). Both are flagged inline in the CSS; don't strip them out to match
Figma exactly.

**One naming trap already caught:** Figma's own toggle property is named backwards — its
`unChecked=Yes` variant is the one that renders CHECKED. This markup uses `--checked`, the correct
way round. Never introduce `unChecked` as a class or prop name from this pattern.

**The frozen column, ruled by Singh 2026-09-01 — not new, see `[CS-COLPANEL-06]`:** whichever column
sits FIRST under "Selected columns" becomes the table's frozen-left column on Apply — the same
`[CS-TBL-13]` rule `table.css` already implements, applied through this picker. Nothing in the markup
marks that row specially; neither does Figma.

**Group labels are Singh's ruling, not Figma's:** Figma itself still shows the placeholder text
"GROUP HEADING" on both groups. Use "Selected columns" / "Not selected columns" — don't invent other
names.

```html
<!-- The panel — attach it as a popover/flyout from wherever a "Columns" trigger
     lives (e.g. a table toolbar icon button). This markup covers the panel's
     own contents only, not the trigger or its positioning. -->
<div class="cs-colpanel" role="dialog" aria-label="Column(s)">
  <div class="cs-colpanel__header">
    <span class="cs-colpanel__header-title">Column(s)</span>
    <button type="button" class="cs-colpanel__header-close" aria-label="Close">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><!-- close glyph --></svg>
    </button>
  </div>

  <div class="cs-colpanel__search">
    <svg class="cs-colpanel__search-icon" viewBox="0 0 18 18" aria-hidden="true"><!-- search glyph --></svg>
    <input class="cs-colpanel__search-input" type="text" placeholder="Search" aria-label="Search columns">
  </div>

  <div class="cs-colpanel__list">
    <div class="cs-colpanel__group-heading">Selected columns</div>

    <!-- Checked + draggable — currently shown, in table order. This is the
         FIRST checked row, so per Singh's 2026-09-01 ruling this column will
         become the table's frozen-left column on Apply — [CS-COLPANEL-06].
         Nothing in the markup marks it specially; neither does Figma. -->
    <label class="cs-colpanel__row cs-colpanel__row--checked" draggable="true">
      <span class="cs-colpanel__row-drag" aria-hidden="true">
        <svg viewBox="0 0 18 18" width="18" height="18"><!-- drag_indicator glyph --></svg>
      </span>
      <input type="checkbox" class="cs-colpanel__row-check" checked>
      <span class="cs-colpanel__row-label">Admission Date</span>
      <span class="cs-colpanel__row-move">
        <!-- Keyboard alternative to the drag handle above — see the CSS file note. -->
        <button type="button" aria-label="Move Admission Date up">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><!-- up arrow --></svg>
        </button>
        <button type="button" aria-label="Move Admission Date down">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><!-- down arrow --></svg>
        </button>
      </span>
    </label>

    <div class="cs-colpanel__group-heading">Not selected columns</div>

    <!-- Unchecked, no drag handle — not on the table, order not meaningful yet. -->
    <label class="cs-colpanel__row">
      <input type="checkbox" class="cs-colpanel__row-check">
      <span class="cs-colpanel__row-label">Insurance Provider</span>
    </label>
  </div>

  <div class="cs-colpanel__footer">
    <div class="cs-colpanel__footer-left">
      <!-- Reset ≠ Cancel — Reset restores the table's DEFAULT columns, even
           overwriting a previously-saved customization. Cancel only discards
           this session's unsaved edits. Ruled by Singh 2026-09-01. -->
      <button type="button" class="cs-btn cs-btn--secondary">Reset</button>
    </div>
    <div class="cs-colpanel__footer-right">
      <button type="button" class="cs-btn cs-btn--secondary">Cancel</button>
      <button type="button" class="cs-btn cs-btn--primary">Apply</button>
    </div>
  </div>
</div>
```

---

## What is deliberately NOT in this file

Each of these is either feature-level by Singh's ruling, or blocked on a
design-system answer. None of them should be improvised from the patterns above.

| Pattern | Why not here |
|---|---|
| Modal / dialog | Feature-level by Singh's ruling — and `accessibility.md` records that a real modal contract (role, focus trap, return focus) **does not exist** in the DS yet |
| Page header, footer, tabs, pagination, stepper | Not in this batch. Header/footer heights are OPEN (**S5/S6/O-14**); tabs have three competing visual models (**S7**) |
| Split button | Its divider is the one hardcoded colour in the button system, and it has no focus variant (`buttons.css` header) |
| Textarea | The current tokenised atom exists only as `Table Structure=Yes`; standalone use is a cross-context borrow the DS never demonstrates (SPEC-12 Q5) |
| Upload / drop zone, file chips | Documented in SPEC-10 §8–§12 but full of raw values; not reduced to generic classes in this batch |
| Zebra-striped table | The tint is an untokenised raw rgba, and the modern table does not stripe — it uses a full cell grid |
| Tooltip | SPEC-16 exists; not assembled into this folder yet |

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Written alongside the 8 reference stylesheets; markup shapes taken from SPEC-07b §12.1, SPEC-11 §7, SPEC-12 §8, SPEC-17 §8 and SPEC-08b §8, with element semantics and ARIA from `01-universal/accessibility.md` | Singh's verbatim 2026-08-24 reference-repository ruling — **ratification pending** |
