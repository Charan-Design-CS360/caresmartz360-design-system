# Page Header — Agency component contract

**Portal:** Agency · **Layer:** 3 (Components) · **Jira parent:** C360-44737
**Measured:** 2026-08-25, live Figma · **Section:** `27232:63236` "page headers"
**Contract version:** `0.1.0` — **incomplete on purpose. Read §1 before using this.**
**Machine twin:** [`page-header.json`](./page-header.json)

---

## 1. ⛔ Do not build from this yet

The one Figma call that returns **padding, gap, and which text size each variant uses** —
`get_design_context` — failed **four times** on 2026-08-25: one transport drop, two 300-second
timeouts, then another drop. `get_metadata`, `get_variable_defs` and `get_screenshot` all answered
instantly in the same window, so the failure is specific to that one call.

So this contract has:

- ✅ **Outer dimensions, the full token vocabulary, node ids, composition, and 7 defects** — measured.
- ❌ **All interior geometry** — unread, and marked `UNVERIFIED`.

**Nothing was back-calculated.** Several different type pairings produce the same frame height, and
the clearest proof that guessing would fail: **L and XL are both 44px tall, yet XL's title is visibly
larger than L's.** That is unresolvable from heights alone.

One working `get_design_context` call per variant finishes this and takes it to `1.0.0`.

---

## 2. What this is, in plain language

The base component is simple: a **title with a smaller, lighter sub-heading underneath**, in four
sizes.

| Size | Node | Height |
|---|---|---|
| S | `14160:189673` | 32px |
| M | `14160:189692` | 40px |
| L | `14160:189722` | 44px |
| XL | `26077:19290` | 44px |

But the section contains **three larger assemblies** built from it:

| Form | Node | What it adds |
|---|---|---|
| **pageheader component** | `27232:65797` | the header **plus a row of 6 action buttons** on the right — 5 blue icon buttons and a green "+" |
| **Search & Filetrs** | `27232:65760` | a filter bar: search box, "Filter_Name : [Value]" dropdown, a toggle, a checkbox, Apply, Reset, and "Column(s)" |
| **complete header** | `27232:65833` | both of the above **stacked** — the full page-top region |

That last one matters for how this gets filed — see §5.

---

## 3. The 7 defects — 4 of them are token-naming errors with a known correct name

Verified against the owner's 2026-08-24 export: **39 of 43 bound token names match.** The four that
don't are all real, and three have an obvious fix:

| # | Bound in Figma | Problem | Correct name in the export |
|---|---|---|---|
| 1 | `font-family/font-family/primary-font` | **Doubled path segment** — malformed. Exists nowhere in the authority | `font-family/primary` |
| 2 | `fonts/tracking/X-tracking-neg-024` | Legacy `X-` prefix | `fonts/tracking/tracking-neg-024` |
| 3 | `fonts/tracking/X-tracking-0` | Legacy `X-` prefix | `fonts/tracking/tracking-0` |
| 4 | `control/height-default` = 30 | No `control/*` group exists in the export at all | *(none — possible new token)* |

Plus three more:

5. **`Fields/Title 12M` uses a raw unitless line-height of `1.2`** instead of a line-height token. It
   is the **only** text style on these frames that doesn't bind one — so a completeness check would
   flag it alone. It also carries defect #1.
6. **The layer name "Search & Filetrs" is misspelled** (`27232:65760`). Anyone searching the Figma
   file for "Filters" will not find this node.
7. **`action/toggle/border` is fully transparent** (`#00000000`, alpha 0). Any pipeline that reads
   only the hex and drops alpha paints a solid black border around every toggle in the filter bar.

**On #3 specifically:** `X-tracking-0` is now confirmed in a **fourth** component family (Button,
Empty States, page header, complete header). That makes it systematic Figma-side naming, not
per-component drift — one fix, not four.

**On #4:** this is the **second independent sighting** of `control/height-default`. The empty-state
buttons bind it too. If an export refresh confirms it exists, then the long-standing button
`min-height` gap is a **binding** problem (the token exists, nothing points at it) rather than a
**missing-token** problem — a much smaller fix, and a different answer to the open control-token
question.

---

## 4. Accessibility — raised, not resolved

- **The 6 action buttons are icon-only and have no accessible names recorded.** Icon-only controls
  need them, and the design doesn't specify any. This needs deciding before implementation.
- **Target size couldn't be checked** — that needs the geometry from §1.
- **Heading level is undecided.** Figma applies a text *style* called Heading/h4–h6; it does not say
  whether the title should be a real heading element, or at what level. A page header is the most
  likely home for the page's `h1`.
- **No contrast ratios were computed.** The pairings are recorded so they can be checked; the check
  was not run, and nothing here claims it passes.

---

## 5. Where this belongs — one open decision

The design owner asked for these to go into the **pattern** library. Measurement supports splitting
it, and this is worth his ruling rather than my assumption:

- **The 4-size header is a component.** Title + sub-heading, four sizes, no composition. Filed here.
- **"complete header" genuinely is a Layer-4 Pattern.** It composes a header, an action row, and a
  filter bar into a page-level region — which matches this repo's own definition of a Pattern
  (*"composes components and describes behavior across an interaction or flow"*).

**But the Pattern cannot be filed yet, for a concrete reason:**
`schemas/layer-4-index.schema.json` requires `figmaKey` to match `^[a-f0-9]{40}$` — a 40-character
Figma **component key**. The MCP tools return **node ids** (`27232:65833`), never component keys. So
a valid Layer-4 entry cannot be authored from measurement alone, and inventing a 40-character hex
string is exactly the fabricated-provenance failure this repo has already been burned by twice.

**Recommendation:** keep the 4-size header here as a component; register "complete header" as an
Agency Pattern under C360-45159 once a real component key is available — or once the owner rules that
node ids are acceptable and the schema is amended to allow them.

---

## 6. Also not verified

- The `old=Yes` variants. Every variant here is `old=No`, which means a deprecated set exists
  elsewhere in the file. Never read. Consistent with the separate finding that a legacy `X-Head old`
  header is formally deprecated — that set should be located and either documented or retired.
- The 6 action glyphs, unresolved to Material Symbols names.
- The filter bar's interior geometry and per-control tokens.
- Whether the sub-heading is optional or always present.
- Dark / High Contrast / Warm Dark / HC Light — light mode only.
- Density-mode behaviour.
- Whether any product screen uses any of these header forms today.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-25 | Initial **partial** contract (0.1.0). Structure, tokens, composition and 7 defects measured from section `27232:63236`. Interior geometry blocked on `get_design_context`. Published incomplete, and labelled as such, at the design owner's explicit request to get the headers into the repo. | Owner instruction, 2026-08-25 |
