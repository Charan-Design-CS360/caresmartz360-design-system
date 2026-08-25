# Table — Agency component contract

**Portal:** Agency · **Layer:** 3 (Components) · **Jira parent:** C360-44737
**Measured:** 2026-08-25, live Figma · **Section:** `26955:66556` "table"
**Machine twin:** [`table.json`](./table.json) · **Copy-from code:** `Universal Html Rules/02-components/table.css` `[CS-TBL-01..03]`

---

## 1. Why this file exists

Until today **there was no table contract in this repo at all** — while the repo's only table
stylesheet (`src/styles/3-components/_tables.scss`, 33 lines) contains **zero height declarations**.

Every AI tool is told to read GitHub for component truth. So every tool that asked *"how tall is a
table row?"* got no answer. The correct numbers existed only in Figma and in the local copy-from
stylesheet — neither of which is where tools were pointed.

**That is the most likely reason a feature session could not build tables to the design system.** It
was a gap in what we published, not a mistake by whoever was building.

---

## 2. The numbers

| | Head cell | Data cell |
|---|---|---|
| Node | `26938:52865` (set `26938:61726`) | `26938:52924` (set `26938:61725`) |
| Height | **34px** — `min-height`, can grow | **30px** — `height`, **fixed, cannot grow** |
| Background | `surface/tertiary` (#f1f5f9) | `field/bg-default` (#ffffff) |
| Border | 1px `border/subtle` | 1px `field/border-default` |
| Padding | 8px sides · **0 top/bottom** *(disputed — §4)* | 8px sides · 0 top/bottom |
| Gap | 4px (`spacing/sm`) | 4px (`spacing/sm`) |
| Text | Inter **500**, 12/16 | Inter **400**, 12/16 |
| Colour | `field/value-primary` | `field/value-primary` |

**Composition** (from the sample layout `27002:78668`): one 34px header above N 30px data rows,
columns 200px wide in the sample.

**The header is NOT uppercase.** The component renders "Title" in sentence case. Rendering headers in
CAPS is wrong against the design system — the local stylesheet reached the same conclusion and
verified it three separate ways.

**Header extras**, all inside the 24px title row: a required/emergency marker (8px), a **Sort**
control (10×16, from a 4-variant set), and a help icon (16px).

---

## 3. ⚠️ Two traps to know before building

**Trap 1 — Figma prints the wrong padding numbers on the head cell.** Its generated code says `9px`
where the real token is **8**, and `1px` where the real token is **0**. The *data* cell prints the
same two tokens correctly as 8 and 0. So the same tokens print right in one component and wrong in
its sibling. **Bind the token, never the printed number.** Your local stylesheet already caught this
(it saw 9/5 at the time) — this measurement saw 9/1, so the wrong numbers aren't even stable.

**Trap 2 — every cell has a 1px border on all four sides**, and nothing in the design says how to
handle that. Built naively, a table gets **2px internal gridlines** everywhere, because adjacent
borders double up.

---

## 3b. 🔴 Two header components — possibly three — and it isn't settled which one is right

**This is the most important thing on this contract, and a strong candidate for the actual root cause.**

| Header | Node | Height | Where it's treated as authoritative |
|---|---|---|---|
| `table_head` | `26938:61726` | 34px | section `26955:66556` — what the owner pointed at, and what this contract measures |
| `Head / Tiltes for tables` | `5865:162` | 34px | the local `table.css` calls **this** one canonical |
| `X-Head old` | — | — | formally dead: Figma's own description reads *"Do not cosider this compoent"* |

Both live ones are **34px**, so this is not a size conflict — they are **separate components**.

**The telling detail:** section `26955:66556`'s own sample layout instantiates nodes named
**`Head / Tiltes for tables`** — the *other* header — not its own `table_head` set. So the section
that defines `table_head` doesn't use it in its own example.

**Why this matters:** anyone building a table has to guess which header to follow, and until today
GitHub published **neither**. That is a much more likely cause of builds not matching than any single
measurement being wrong.

**Needs your ruling, or Figma AI's:** declare one canonical header and retire or alias the other.

---

## 4. One disagreement between Figma and your local file

Everything else matches. This one doesn't:

| | Head cell vertical padding |
|---|---|
| **Figma today** | `spacing/none` = **0** |
| **Your local `table.css`** (line 115) | `spacing/sm` = **4** |

**Why it matters a little:** your local file explains the 34px as `1 + 4 + 24 + 4 + 1`. That needs the
4px padding. With Figma's current 0, the sum is 26 — so the 34 comes from `min-height` alone, not from
the box model.

**Why it matters barely at all visually:** `min-height: 34` plus vertically-centred content puts the
label in the same place either way.

**I have not picked a winner.** Figma is the design authority and I measured it today; your local file
was written earlier from SPEC-08b and may predate a Figma edit. **Needs your word, or Figma AI's.**

**Everything that does agree:** the 34/30 heights, horizontal padding 8, gap 4, 1px borders all
round, weight 500 vs 400, 12/16 type, no uppercase, and the codegen-trap conclusion.

---

## 5. Defects — 11 recorded

The three worth acting on first:

1. **The data cell has a fixed height.** `height: 30` — not `min-height`. So a data cell **cannot
   grow**; long values only truncate with an ellipsis. The head cell uses `min-height`, and so does
   every other component measured in this design system. This is the one I'd fix.
2. **No states exist at all.** One variant each (`type=Default`). No hover, selected, sorted-active,
   zebra, disabled or error anywhere — despite the header shipping an interactive Sort control and a
   help affordance. Anything built for those states today is invented.
3. **The in-Figma guidelines page is an empty shell.** It reports its own coverage as
   **"Annotations 0/2 — Incomplete"** and "No measurements added". Its Dev Mode link also points at
   `26581-38709`, which is not a table node — it's the same broken link already recorded on the Fields
   contract, now being copied into generated guidelines.

Also: two token namespaces for the same border colour (`border/subtle` vs `field/border-default`,
both #e2e8f0); the header's text bound to a **field** token; a raw `12px` duplicating the font-size
token in the cell; and `X-tracking-0` again — now a **seventh** component family, so one Figma rename
closes seven.

---

## 6. Not verified

- **`column_actions`** (`26938:61850`) and its filter/drag icons — sizes only, no tokens read.
- **The Sort control's 4 variants** (`5865:154`) — only its default rendering was seen.
- **Every interaction state** — none exist to measure.
- Whether a tooltip is intended for truncated values. The design truncates and says nothing more.
- Gridline/`border-collapse` strategy.
- Dark / High Contrast / Warm Dark / HC Light — light mode only.
- Density behaviour — note the fixed `height:30` couldn't respond to density even if tokens did.
- Contrast ratios — pairings recorded, check not run.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-25 | **1.1.0** — recorded that TWO live header components exist (`table_head` 26938:61726 vs `Head / Tiltes for tables` 5865:162, both 34px), plus a third that is formally dead; and that this section's own sample layout uses the other one. Found while syncing against the local stylesheet. |
| 2026-08-25 | 1.0.0 — first table contract in this repo. Both sets measured from section `26955:66556`, cross-checked against the local copy-from stylesheet and the owner's variable export. Created because the absence of any published table geometry was blocking feature work. | Owner instruction, 2026-08-25 |
