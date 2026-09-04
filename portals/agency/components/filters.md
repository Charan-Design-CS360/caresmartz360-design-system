# Filters — Agency component contract

**Portal:** Agency · **Layer:** 3 (Component) · **Jira parent:** C360-44737
**Measured:** 2026-09-04, live Figma · **Section node:** `27356:74769` "filters compoents"
**Contract version:** `1.0.0` — first measurement.
**Machine twin:** [`filters.json`](./filters.json)

---

## 0. Purpose — why this exists

A row of compact filter controls that sit in a table's **Search & Filters** bar and let someone
narrow the rows below without a developer changing anything. Each atom names **one** filter and
carries the control that fits that filter's value:

- **Filter_dropdown** — pick one value from many (shows the chosen value inline).
- **Filter_Toggle** — an on/off filter.
- **Filter_checkbox** — an include/exclude filter.

They do not filter on their own. The row's **Apply** button commits them; **Reset** clears them.

---

## 1. What it is, in plain language

Three sibling controls that look almost identical — a small 30px-tall pill with a **label** on the
left and a **control** on the right (a chevron, a switch, or a checkbox). They share **one**
container spec and **one** colour model; the only real differences are which control they carry and
whether they show the value.

| | Filter_dropdown | Filter_Toggle | Filter_checkbox |
|---|---|---|---|
| Control | chevron (expand_more) | toggle switch | square checkbox |
| Control size | 18×18 | 30×16 | 24×24 |
| Shows its value? | **Yes** — appends " : [Value]" | No | No |
| Default width | 106 | 118 | 112 |

---

## 2. The three states — the whole point of the component

Every atom has three published states. Moving between them swaps **only the background and border**
(and, for the dropdown alone, adds the value text):

| State | Means | Background | Border |
|---|---|---|---|
| **Default** | no value applied — resting | white (`field/bg-default`) | grey (`field/border-default`) |
| **Active** | a value **is** applied | blue-tint (`field/bg-focus`) | **blue** (`field/border-focus`) |
| **Hover** | pointer over an applied filter | blue-tint (`field/bg-focus`) | **grey** (`field/border-default`) |

Read that carefully: **Active and Hover use the same blue-tint fill** — the *border* is the only
difference (blue when active, grey on hover). That is why the hover state reads as "greyer" even
though its fill is the same blue tint.

---

## 3. The finding worth reading — the control does not reflect the value

Verified straight from the Active variants' bound tokens (2026-09-04):

- **Filter_Toggle Active** still binds `action/toggle/bg-default` (the **OFF** grey track) — the
  switch does **not** turn on.
- **Filter_checkbox Active** still binds a white box with a grey border and **no** check fill — the
  box stays **unchecked**.

So on a toggle or checkbox filter, the *only* signal that a value is applied is the container going
blue. The switch stays off; the box stays empty. Only the **dropdown** actually shows its value
(as text). **This is an open UX question for you, not a settled rule** — see §7 q1. It is recorded
exactly as measured; nothing was "corrected."

---

## 4. Sizes and spacing, in one place

Identical across all three atoms and all states:

| | Value | Token |
|---|---|---|
| Height | 30px | — |
| Corner radius | 4px | `border-radius/rounded` |
| Left / right padding | 8px | `spacing/md` |
| Gap label → control | 4px | `spacing/sm` |
| Label type | Inter 12 / 16, weight 400 | `font-size/caption` · `line-height/caption` |
| Label colour | #1e293b | `field/value-primary` |

Each atom's width is just `8 + label + 4 + control + 8`, and it reconciles exactly:
`8+68+4+18+8 = 106` (dropdown), `…+30+8 = 118` (toggle), `…+24+8 = 112` (checkbox).

---

## 5. The connection — how filters plug into the header

This is the linkage you asked me to detect. The atom is the leaf; it composes **upward twice**:

```
Filter atom  →  Search & Filters row  →  Complete Header  →  Page Setup
```

**Search & Filters row** (`27232:65760`, 1388×30) — a space-between bar:

- **Left group (672):** Nav Search (140) · **8px** · Filters group (524) = `dropdown 158 · toggle 118 · checkbox 112 · Apply · Reset`, every child **4px** apart.
- **Right group (704):** the **Column(s)** button (100), pinned right — the trigger from
  [`column-arrangement.json`](./column-arrangement.json) v2.1.0. (No view-switchers exist in this
  row; an earlier page-header note guessed "view switchers" — measurement shows only Columns.)

**Complete Header** (`27232:65833`, 1388×110) — stacks the page-header bar (44) over this Search &
Filters row (30), with the **12px gutter** all around and between the rows. See
[`page-header.md`](./page-header.md) §complete header. So the filter you define here is the same
filter that appears in the second row of every page's header.

---

## 6. How it behaves — every action and its effect

| Do this | What happens |
|---|---|
| Pick a value in a **dropdown** filter | Goes Active (blue), label becomes "Filter_Name : [Value]". Table unchanged yet. |
| Turn on a **toggle** / tick a **checkbox** filter | Goes Active (blue). The control glyph does **not** visibly change (§3). Table unchanged yet. |
| Hover an applied filter | Fill stays blue-tint; border goes grey. |
| Press **Apply** | Commits every engaged filter to the table. **Nothing filters until this is pressed.** |
| Press **Reset** | Clears all filters back to Default. |

**Apply** (Button/Primary) and **Reset** (Button/Soft) live in the row, not in the atom. The atom
only holds its own value; the row commits it.

---

## 7. Open questions for you (one at a time when you're ready)

1. **Should the control show the value?** On toggle and checkbox filters, when a value is applied
   the switch stays **off** and the box stays **unchecked** — only the container turns blue. Is that
   intended, or should the toggle switch on / the checkbox check? (Finding F-FILTER-01.)
2. **Hover with no value.** Only "hover an *applied* filter" is drawn. Is there a hover state for a
   filter that has no value yet?
3. **Real names.** The three are placeholders (Filter_Name). What real filters and value types map
   to dropdown / toggle / checkbox in the product? (BA/product, not design-system.)

---

## 8. Known defects

- The row layer is misspelled **"Search & Filetrs"** (`27232:65760`) — a search for "Filters"
  misses it. (Same typo already logged on page-header.)
- `fonts/tracking/X-tracking-0` is bound but the export's real name is `fonts/tracking/tracking-0` —
  the systematic Figma-side X- prefix drift, recorded not corrected.
- The checkbox box is **square** (`border-radius/rounded-none`, 0) while its parent atom is rounded
  (4px). Confirm the square checkbox is deliberate.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-09-04 | 1.0.0 — first measurement of the three filter atoms, their three states, the per-state colour model, and the connection up through the Search & Filters row into the complete header. Closes the "Search & Filters interior geometry" gap that page-header.json listed as notVerified. | Singh's request, 2026-09-04 |
