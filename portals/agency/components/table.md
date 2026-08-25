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
| Height | **34px** — a minimum, can grow | **30px** — a **minimum**, grows with content *(ruled)* |
| Background | `surface/tertiary` (#f1f5f9) | `field/bg-default` (#ffffff) |
| Border | 1px `border/subtle` | 1px `field/border-default` |
| Padding | **8px sides · 0 top/bottom** *(ruled)* | **8px sides · 0 top/bottom** *(ruled)* |
| Gap | 4px (`spacing/sm`) | 4px (`spacing/sm`) |
| Text | Inter **500**, 12/16 | Inter **400**, 12/16 |
| Colour | `field/value-primary` | `field/value-primary` |

**Composition** (from the sample layout `27002:78668`): one 34px header above N data rows of 30px
*or taller*, columns 200px wide in the sample.

**A long value grows the whole row, not one cell.** Ruled 2026-08-25. In a real `<table>` you get
this for free — `height` on a cell is treated as a minimum and sibling cells stretch to the tallest.
If you build the table out of `div`s, the row needs `align-items: stretch`. Never give one cell its
own independent height.

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

## 3b. ✅ Which header is canonical — settled

**Build from `table_head` — set `26938:61726`, variant `26938:52865`.**

Ruled by the design-system owner on 2026-08-25. He linked that exact node and said it *"include all
actions what it needed to show and hide example, Sorting, Information etc."*

| Component | Node | Status |
|---|---|---|
| `table_head` | `26938:61726` / `26938:52865` | ✅ **CANONICAL — build from this** |
| `Head / Tiltes for tables` | `5865:162` | ⛔ **Retired** — an alias of the above. The local `table.css` used to call this one canonical; it has been corrected. |
| `X-Head old` | — | ⛔ **Dead.** Figma's own description reads, verbatim: "Do not cosider this compoent". |

Nothing about the geometry changed — both headers measured 34px, so this was a **provenance** fix,
not a visual one. That is also why the mismatch survived so long unnoticed.

**One loose end, on the Figma side only:** the section's own sample layout (`27002:78668`) still
places the *retired* header, so the section that defines the canonical one doesn't use it in its own
example. Raised to Figma AI. It is a cleanup task — **not** a reason to re-open the ruling.

---

## 4. ✅ Figma vs your local file — now in agreement

There was one open disagreement. Your ruling on 2026-08-25 closed it, and applying it turned up two
more problems that were never disagreements at all — just gaps.

**The table below is about the copy-from kit** (`Universal Html Rules/02-components/table.css`) — the
file a developer pastes into a project. The repo's own stylesheet
(`src/styles/3-components/_tables.scss`) is a **separate file** and was rewritten the same day; see §4c.

**Your ruling:** *"8px left right, 0 top bottom and with hug height properties with minimum height of
30px."* Figma was right; the local file was wrong.

| What | Was | Now |
|---|---|---|
| Head cell top/bottom padding | local file had `spacing/sm` (4) | `spacing/none` (**0**) — matches Figma |
| Data cell left/right padding | **missing entirely** in the local file | `spacing/md` (**8**) |
| Data cell `white-space` | `nowrap` — which silently blocked all row growth | wraps, so a long value can raise the row |
| The 34px explanation | "`1 + 4 + 24 + 4 + 1`" | 34 is a **floor** over 26px of content, not a sum |

**The `nowrap` was the real bug.** Your row-growth rule couldn't have worked with it in place — the
text could never wrap, so nothing could ever get taller, whatever the height keyword said.

**The header still says `nowrap`, deliberately.** Your ruling was about the data cell, so I didn't
widen it to headers without your word. Column titles staying on one line looks intentional. Say if
you want headers wrapping too.

**Everything else agreed all along:** the 34/30 heights, horizontal padding 8, gap 4, 1px borders all
round, weight 500 vs 400, 12/16 type, no uppercase, and the codegen-trap conclusion.

---

## 4c. The repo's own stylesheet — rewritten the same day

`src/styles/3-components/_tables.scss` is not the same file as the copy-from kit. It is what anyone
using this repo's compiled CSS actually gets, and it **contradicted you on almost everything**.

It was written **2026-07-14, six weeks before this table was ever measured**, during a token-extraction
pass — so it was never based on the Figma component at all. It had **no row heights whatsoever**, the
4px vertical padding you overruled, a zebra-striping rule you ruled out, `border-bottom` only instead
of borders on four sides, and 14px body text instead of 12px caption.

Since every AI tool is told to read this repo for component truth, **this is the most likely reason a
feature session could not build a table to the design system.**

**The one change you will actually see:** cells used to have a bottom border only, so a table drew
horizontal rules and *no vertical gridlines*. Every cell now has a full 1px box, so tables gain
vertical gridlines and an outer border — which is what the design draws.

Scope is deliberately narrow: head cell and data cell only. Header internals — the 24px row holding
the sort control, required marker and help icon — are **not** in it, because they can't live on a
`<th>` without breaking table layout and this repo ships no markup to attach them to.

---

## 4b. States — one ruled out, two waiting on you

| State | Status |
|---|---|
| **Zebra striping** | ⛔ **Ruled out.** *"Zebra we are not following."* A decision, not a gap — don't log it as missing again. |
| **Cell hover** | ⏳ **Waiting on you.** You asked for it to follow the field states, then the semantic layer. Neither has one to follow: Fields has no hover variant, and the Agency semantic layer's only `*hover` tokens are for buttons, brand and links — nothing for a field or table surface. Your call: *"if hover is not available then raise this point again tomorrow."* |
| **Selected / sorted-active** | ⏳ **Waiting on you.** Neither exists in Figma. Worth noting the header already ships a working 4-variant Sort control with no active state wired to it. |
| Disabled / error | Genuinely unaddressed. |

No unruled state is published here. Building one in code would be an invention.

---

## 5. Defects — 12 recorded, 2 now resolved

The three worth acting on first:

1. ✅ **RESOLVED — the data cell's fixed height.** Figma binds `height: 30` with ellipsis truncation,
   so a cell could not grow. Your ruling of 2026-08-25 makes 30 a **minimum** with row-level growth.
   This contract now follows the ruling; **Figma still shows the old fixed height** and is queued to
   be updated, so don't "correct" this back from a fresh measurement. For reference, the head cell
   already used `min-height`, and so does
   every other component measured in this design system. This is the one I'd fix.
2. **No states exist in Figma.** One variant each (`type=Default`) — see §4b for which of these you
   have now ruled on. Nothing for hover, selected, sorted-active,
   disabled or error anywhere — despite the header shipping an interactive Sort control and a
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
- Density behaviour. Worth re-checking now: the old fixed `height:30` couldn't have responded to
  density even if the tokens did; a minimum height can.
- Whether the **head** cell should wrap too. Your ruling covered the data cell only.
- Whether a wrapped multi-line value needs a line cap or a tooltip. The ruling said the row grows;
  it didn't say how far.
- Contrast ratios — pairings recorded, check not run.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-25 | **2.1.0** — recorded that TWO stylesheets implement this contract, and rewrote the repo's own `src/styles/3-components/_tables.scss` against it (it predated the measurement by six weeks and had no row heights at all). Also recorded four **namespace divergences** that were previously papered over, including a dead `--border-radius-*` variable family that is live on Button and Empty States and produces square corners where 4px and 12px were intended. | Owner instruction, 2026-08-25 |
| 2026-08-25 | **2.0.0** — four owner rulings applied. `table_head` `26938:61726` declared **canonical** and `Head / Tiltes for tables` `5865:162` retired. Padding ruled **8px sides / 0 top-bottom on both cells**. The data cell's 30px becomes a **minimum**, with growth at **row** level, and its `nowrap` removed. **Zebra striping ruled out.** Cell hover and selected/sorted-active deferred — nothing exists at the semantic layer to follow. Three of these put this contract **ahead of live Figma**; five Figma-side changes raised. | **Owner ruling, 2026-08-25** |
| 2026-08-25 | **1.1.0** — recorded that TWO live header components exist (`table_head` 26938:61726 vs `Head / Tiltes for tables` 5865:162, both 34px), plus a third that is formally dead; and that this section's own sample layout uses the other one. Found while syncing against the local stylesheet. |
| 2026-08-25 | 1.0.0 — first table contract in this repo. Both sets measured from section `26955:66556`, cross-checked against the local copy-from stylesheet and the owner's variable export. Created because the absence of any published table geometry was blocking feature work. | Owner instruction, 2026-08-25 |
