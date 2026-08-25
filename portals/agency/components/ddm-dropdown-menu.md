# DDM (Dropdown Menu) — Agency component contract

**Portal:** Agency · **Layer:** 3 (Components) · **Jira:** C360-44737 · **Source request:** C360-40765
**Measured:** 2026-08-25, live Figma · **Section:** `27245:67562` "Inline Dropdwon Patterns"
**Machine twin:** [`ddm-dropdown-menu.json`](./ddm-dropdown-menu.json)

Created in response to Figma AI's audit on **C360-40765**, which ended: *"the complete DDM component
documentation needs to be added to the `caresmartz360-design-system` GitHub repo. Figma AI sandbox
blocks GitHub API access, so this must be done manually."*

---

## 1. Two things about that request, before the content

**The suggested path was wrong.** Figma AI proposed `components/ddm/README.md`. That root-level
`components/` folder is the **legacy unscoped** location — the repo's own audit script reports it as
carrying 15 placeholder node IDs and as *"cannot satisfy portal release readiness."* Putting Agency
DDM there would also break portal isolation (epic Rule 4), since Caregiver and Staff would inherit an
Agency-owned path. Filed here instead, matching the four contracts already published.

**Its headline recommendation is misdiagnosed.** Detail in §3 — this is the important part.

---

## 2. What DDM is

Dropdown menus, built in three layers — which is exactly how Figma AI described it, and that part is
confirmed:

**Row atoms** (the repeating line inside a menu)

| Row type | Node | Variants | Renders at |
|---|---|---|---|
| Checkbox (multi-select) | `7926:11855` | 5 | 30px |
| Checkbox + drag handle (reorderable) | `13095:43335` | 6 | 30px |
| Radio (single-select) | `7926:11856` | 4 | **32px** |

**Single pieces:** `Dropdown Heading primary` (`1678:633`, 125×30) · `drag_indicator_black_18dp`
(`10391:14128`, 18×18)

**Assembled menus:** grouped w/ search (`1728:1`, 360×940) · side-by-side (`10296:16501`, 500×240) ·
radio w/ footer buttons (`11961:30613`, 260×330)

---

## 3. The row-height finding — corrected

**Figma AI said:** *"Row height inconsistency — checkbox 30px, radio 32px. Recommended: standardize
to a single row height (30px)."*

**What's actually true:** **both rows declare `min-height: 30px`.** Neither sets a fixed height. The
32px is a *result*, not a setting:

| | control | vertical padding | total | renders at |
|---|---|---|---|---|
| Checkbox row | 24px | `spacing/xs` = **2px** | 24+2+2 = 28 → under the 30 floor | **30px** |
| Radio row | 24px | `spacing/sm` = **4px** | 24+4+4 = **32** → over the floor | **32px** |

**So the cause is one padding token, not a height.** Setting a height wouldn't fix it — it would
break the min-height mechanism that makes rows grow for long labels. **The real fix is to change the
radio row's vertical padding from `spacing/sm` to `spacing/xs`**, or decide the difference is
deliberate.

**Also wrong in the audit:** it says group headings are 32px. Figma's own metadata says
`Dropdown Heading primary` is **30px**.

---

## 4. A worse inconsistency the audit missed

**Selected state behaves differently between the two row types:**

- **Checkbox row selected** → background turns `field/bg-focus` (pale blue) **and** the label turns
  `field/value-link` (blue).
- **Radio row selected** → **neither changes.** Background stays default, label stays dark.

To a user, that's far more visible than a 2px height difference: pick a checkbox option and the row
lights up; pick a radio option and nothing does. Worth a ruling on which is correct.

Minor sibling: the checkbox row has a `max-height` of 36px; the radio row has none.

---

## 5. Everything else found

**Confirmed from the audit** (their observations that held up): both typos are real — the section is
`Inline **Dropdwon** Patterns` and the component is `atom/radio / Dropdown **sleections**`;
the checkbox row really does use four independent booleans for three mutually exclusive states;
the radio row really does encode selection twice; naming conventions really are inconsistent across
the five components; and no variant carries a description.

**New:**
- The **`3/3` count label is a raw `#334a65`** with no token. **That same unbound colour also appears
  in the page-header timezone chip** — two independent sightings, so it's a candidate for a real
  token rather than a one-off.
- **`X-tracking-0` again** — sixth component family. One Figma rename fixes all six.
- **`min-height: 30`** on both rows equals `control/height-default`, which is bound elsewhere in
  Figma but missing from your export. If that token is confirmed, both rows could bind it instead of
  a raw 30.
- The **drag-row set already uses the cleaner `State` enum** shape the other two lack — so the better
  convention exists in your file already and could be the model, rather than inventing one.

---

## 6. Held, not applied — renames are frozen

Figma AI's recommendations 2 and 4 (collapse booleans to a `State` enum; rename components to
`DDM/Row/Checkbox` etc.) are **both renames**, and your standing rule is that names don't change
repeatedly. **Nothing was renamed.** They're recorded as awaiting your ruling.

The two typo fixes (rec 1) are the least contentious — they correct errors rather than change a
convention.

---

## 7. Not verified — read this before building a full menu

- **The three assembled menus are node-id-and-size only.** No internal padding, item spacing,
  search-bar or footer geometry, elevation, or scroll behaviour was measured. The 940px height of the
  grouped menu implies a scrolling container, but **no max-height or scroll rule was read.**
- **The drag-feature row set** — structure and height only, no token bindings.
- **Active and Hover states** for either row — only Default and Selected were read.
- The Nesting variant's indent amount.
- The radio control's inner circle (delivered as a flattened SVG).
- Keyboard interaction and focus behaviour.
- Contrast ratios, including that raw `#334a65`.
- Dark / High Contrast / Warm Dark / HC Light — light mode only.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-25 | 1.0.0 — row atoms measured (checkbox + radio in full), section structure and all 11 node ids recorded, Figma AI's audit corrected in four places, renames held pending owner ruling. | C360-40765 + owner instruction 2026-08-25 |
