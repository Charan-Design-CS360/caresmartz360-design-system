<!--
=============================================================================
COMPONENT CONTRACT — Fields type 1 (Agency portal)

WHAT THIS FILE IS
  The authoritative shape of the CareSmartz360 form field. This repo previously
  had 17 --field-* semantic tokens in every theme file but NO field component
  consuming them: Tier 2 was complete, Tier 3 had no consumer at all.

MARKERS — every value carries one, always:
  [MEASURED] read directly from live Figma (node id + date given)
  [DERIVED]  computed from measured values; the arithmetic is shown
  [RAW]      real value, NOT bound to any design token
  [UNVERIFIED] not read — do not build from it

CREATOR: Fable-DESIGN-SYSTEM (C360-3526) | 2026-08-24
SOURCE: component set 26938:65997 "field-set-type1"
        inside section 26955:66554 "Fields type 1"
=============================================================================
-->

# Fields type 1 — Agency component contract

Canonical Jira parent: **C360-44737**. Component Jira: **C360-44847**.

## ⚠️ Read this first: trust the variables, not the prose

Figma's *generated documentation for this component contradicts the component itself.*
Three proven cases, each settled by reading the bound variables rather than the text:

| Figma's prose claims | The file actually contains |
|---|---|
| The page prints ***"6 variants"*** and lists `warning \| default \| focus \| error \| success \| disabled` | **7 `state=` symbols** — the omitted one is `state=ai` (`27079:10664`). The variant Figma's own docs forget is a real, buildable state |
| Label typography: *"Size 12px \| **Line-height 120%** \| **Letter-spacing -0.24px**"* | Bound variables on `26938:65991` give `line-height/caption` = **16** and tracking = **0**. 120% of 12px is **14.4px, not 16px**, and `-0.24 ≠ 0`. Both cannot be true; the binding wins |
| That page's Dev Mode link points at `node-id=26581-38709` | … which is **not** the `26938-65997` the page documents |
| 4 separate frames: *"AI tools: read annotations on each component set for token bindings"* | **No annotations exist and none are readable.** Figma's own guideline card reads `Annotations 0/1 Incomplete`, body text *"No existing annotations."* |

**Where the stale `-0.24px` almost certainly came from** — worth knowing, because it makes the
prose look less arbitrary and more dangerous: the owner's Primitives export really does contain a
token `fonts/tracking/tracking-neg-024` (= −0.24). So the documentation text is not an invented
number, it is **a real token that this component does not bind.** Copying the prose would bind a
token that exists, compile without error, and render the wrong letter-spacing — the hardest class
of defect to catch by eye.

**Rule for any AI tool: read the bound variables and the node structure. Treat Figma's written
descriptions, guideline cards and inventory tables as unverified prose.** Every AI tool sent to
Figma reads exactly the wrong half by default, because the prose is what *looks* like
documentation.

## The two node IDs are parent and child, not a conflict

A previously flagged "conflict" between two node IDs was **not** one:

| Node | Type | What it is | Use it for |
|---|---|---|---|
| `26955:66554` | **section** "Fields type 1", 3874 × 7322 | The whole documentation area — component set + guideline frames + test cases | Navigation / context |
| `26938:65997` | **component set** `field-set-type1`, 780 × 348 | **THE COMPONENT.** 7 `symbol` children | Building, and for the component mapping |

[MEASURED] — `get_metadata` on `26955:66554` returns `26938:65997` as its first
child. Same pattern as buttons: `26938:66536` is the *section*, `5703:7087` is the
*set*. **A component mapping should record the component-set ID, and label both.**

## ⚠️ Trust the variables, not the prose

Figma's own generated documentation for this component is wrong in three ways:

| Figma's prose says | The file contains |
|---|---|
| *"6 variants"*, listing `warning \| default \| focus \| error \| success \| disabled` | **7 variants** — it omits `state=ai` (`27079:10664`) [MEASURED] |
| label is `line-height 120%`, `letter-spacing -0.24px` | bound variables say `line-height/caption` = **16**, tracking = **0**. 120% of 12 is 14.4, not 16 [MEASURED] |
| Dev Mode link points at `node-id=26581-38709` | The component is `26938-65997` |

`Annotations 0/1 · Incomplete` — Figma's own card. **There are no annotations to
read**, despite sibling frames instructing AI tools to read them.

## Anatomy — a 2-row grid, label ABOVE the input, inside one unbroken border

```html
<!-- ─── CONTAINER ───────────────────────────────────────────────────────────
     display: grid  ·  grid-template-rows: 26px 34px   [MEASURED, RAW]
     total height 62px  [MEASURED — all 7 symbols are exactly 360 × 62]
     padding 0          [MEASURED — Figma's own spec text: "Padding 0px all sides"]
     border  1px solid, INSIDE-aligned, colour per state
     border-radius 0    [MEASURED, TOKEN-BOUND to border-radius/rounded-none]
     width: treat as 100% of parent (the 360px is the variant's own width)
     ⚠ The label is a STATIC FULL-WIDTH ROW inside an unbroken border.
       It is NOT a floating notched label. See "Biggest implementation risk". -->
<div class="c360-f1" data-state="default">

  <!-- ─── ROW 1 · LABEL BLOCK ───────────────────────────────────────────────
       row height 26px [MEASURED, RAW] · content height 22px [MEASURED, RAW]
       → 4px of empty row below the label. The designer's documented
         "Gap 4px between top and bottom" is REAL but is grid slack,
         NOT a CSS gap property. Do not implement it as `gap`.
       padding-left 8px (spacing/md) · padding-block 0 · self-start -->
  <div class="c360-f1__label-row">
    <span class="c360-f1__label">Field label</span>
    <!-- Required marker AND help icon EXIST in the sub-component but are
         OFF in all 7 published variants. See "Required marker" below —
         this is a blocker for clinical forms, not a styling detail. -->
  </div>

  <!-- ─── ROW 2 · INPUT ─────────────────────────────────────────────────────
       row height 34px [MEASURED, RAW] · text box height 20px [MEASURED, RAW]
       padding-left 8px (spacing/md) · padding-right 0 · padding-block 0
       align-items: center -->
  <div class="c360-f1__input-row">
    <input type="text" placeholder="Enter value..." aria-label="Field label">
  </div>
</div>
```

## Geometry

| Property | Value | Figma token | Marker |
|---|---|---|---|
| layout | `grid`, single column | — | [MEASURED] |
| grid rows | **26px 34px** | *(none)* | **[MEASURED] [RAW]** |
| total height | **62px** | *(none)* | **[MEASURED]** — all 7 symbols are 62 |
| padding | **0** | `spacing/none` | **[MEASURED]** — see the promotion note |
| border | 1px solid, inside-aligned | width per theme | [MEASURED] |
| border-radius | **0** | `border-radius/rounded-none` | [MEASURED] **token-bound** |
| label row height | 22px | *(none)* | **[MEASURED] [RAW]** |
| label padding-left | 8px | `spacing/md` | [MEASURED] token-bound |
| label→marker gap | 4px | `spacing/sm` | [MEASURED] token-bound |
| input row height | 34px | *(none)* | **[MEASURED] [RAW]** |
| input text box | 20px | *(none)* | **[MEASURED] [RAW]** |
| input padding-left | 8px | `spacing/md` | [MEASURED] token-bound |
| top-row gap (doc exemplar only) | 10px | *(none)* | **[MEASURED] [RAW]** |
| transition | `background-color, border-color, color` · **150ms ease** | *(none)* | **[MEASURED]** |

### `padding: 0` — promoted from DERIVED to MEASURED, and here is why

SPEC-17 originally *derived* this, because Figma's codegen emitted a misleading
`p-[var(--spacing/none,1px)]` — a `spacing/none` token carrying a **1px fallback**.
The arithmetic ruled it out:

```
padding 0 :  1 (border) + 26 + 34 + 1 (border)  = 62  ✓ matches all 7 symbols
padding 1 :  1 + 1 + 26 + 34 + 1 + 1            = 64  ✗
width     :  360 − 358 (child width) = 2 = 1px border × 2   ✓ padding 0
```

**It is now a direct read**: Figma's own specification text states
`Padding 0px all sides`. So this is [MEASURED], not [DERIVED].
**General trap worth remembering: a Figma codegen *fallback* is not a token value.**

## The 7 states — ONE axis, all MEASURED

There is **no** `Size`, `Compact`, `Required`, `Help` or `Cell Structure` axis.

| State | Node | Background | Border | Value text |
|---|---|---|---|---|
| `default` | `26938:65991` | `field/bg-default` `#ffffff` | `field/border-default` `#e2e8f0` | `field/value-placeholder` `#64748b` |
| `focus` | `26938:65992` | `field/bg-focus` `#f0f7ff` | `field/border-focus` `#0077ff` | `field/value-primary` `#1e293b` |
| `error` | `26938:65993` | `field/bg-danger` `#fef2f2` | `field/border-danger` `#ef4444` | `field/value-primary` |
| `success` | `26938:65994` | `field/bg-success` `#f0fdf4` | `field/border-success` `#15803d` | `field/value-primary` |
| `warning` | `26938:65995` | `field/bg-warning` `#fefce8` | `field/border-warning` `#facc15` | `field/value-primary` |
| `ai` | `27079:10664` | `field/bg-ai` `#faf5ff` | `field/border-ai` `#9333ea` | `field/value-primary` |
| `disabled` | `26938:65996` | ⚠️ **NONE EMITTED** | `field/border-default` `#e2e8f0` | `field/value-disabled` `#64748b` |

Every background and border above is **token-bound**. Structure is identical across
all states — **a state change is a token swap only.**

## Typography — settled against the bound variables

```
Fields/label = Inter Medium · font-size/caption 12 · line-height/caption 16
               · font-weight/body-strong 500 · X-tracking-0 = 0     [MEASURED 26938:65991]
Fields/value = Inter Regular · font-size/caption 12 · line-height/caption 16
               · font-weight/body-base 400 · X-tracking-0 = 0       [MEASURED]
```

This **contradicts Figma's documentation text** (which claims 120% / −0.24px). The
bound variables win. `X-tracking-0` is bound in Figma but **absent from
tokens.css** — gap **G2**, the same gap the button contract reports.

## Known defects — do NOT silently "fix" these

| # | Defect | Evidence |
|---|---|---|
| D-1 | **The `disabled` variant emits no background at all.** Figma's codegen: `${isDisabled ? "" : "bg-[var(--field/bg-default,white)]"}` — the disabled branch is an **empty string**. It renders white/transparent, not grey. | [MEASURED] `26938:65996` |
| | **Do not "fix" it** by applying `#f1f5f9` or `field/bg-disabled`. That invents a look Figma does not show. It is a Figma defect and needs a design decision. |
| D-2 | **No `hover` state exists** on the axis. Building one would be an invention. | [MEASURED] |
| D-3 | **No error/helper message row exists.** The error state is a pink fill + red border only — there is nowhere to put the message. | [MEASURED] |
| D-4 | **Required marker and help icon are OFF in all 7 variants** — see below. | [MEASURED] |

### Required marker — a blocker, not a detail

The sub-component contains a required marker (8×8 glyph, `icon/danger` `#ef4444`,
in a 8×16 wrapper) and a help affordance (16×16 box, 12×12 drawn vector,
`icon/brand` `#0077ff`). **Both are switched OFF in every one of the 7 published
variants.**

> **There is currently no supported way to show a required marker on this
> component.** For a clinical form with mandatory fields, that is a hard blocker
> and needs Singh's decision — not a workaround invented at build time.

## ⚠️ Biggest implementation risk — read before choosing a UI library

**A Material `mat-form-field appearance="outline"` cannot produce this layout.**

- Material renders the label as a **floating notch that interrupts the top border**.
- Fields type 1 renders the label as a **static, full-width 22px row stacked above
  the input, inside an unbroken border**.

These are **different structures, not different skins.** No amount of token
overriding converts one into the other. Either the field is built as a custom
control, or the design is redrawn to match Material. **That is a decision to make
before any implementation diff is produced.**

Corollary: the 17 `--field-*` tokens already in every theme file are correct and
ready; what has never existed is a Tier-3 consumer with the right *structure*.

## Height: there is no size choice to make

**62px overall, 34px input row.** Not 30px, not 40px, not 50px.
SPEC-12's 30/40px pair belongs to a **different component** and does not apply here.

## Accessibility

| Item | Status |
|---|---|
| Label association | Use `<label for>` or `aria-labelledby` — the label is a real row, so this is straightforward |
| Input row 34px | ✅ Above the WCAG 2.2 SC 2.5.8 floor of 24 CSS px |
| Error state | Needs `aria-invalid="true"` + `aria-describedby` — **but see D-3: there is no message row to point at** |
| Required | `aria-required="true"` — **but see D-4: no visual marker is available** |
| Disabled | `disabled` + `aria-disabled="true"`. `readonly` is **inert on `<select>`** — emit `disabled` there instead |
| Focus | `field/border-focus` `#0077ff` + `field/bg-focus`. ⚠️ No focus *ring* is specified — [UNVERIFIED] whether a ring is intended in addition to the border change |

## NOT VERIFIED — do not build without re-reading Figma

1. Whether `field/bg-disabled` **should** apply (D-1 is a defect, but the intended
   look is unknown).
2. Focus ring / outline in addition to the border colour change.
3. Textarea / multi-line behaviour.
4. Read-only versus disabled as distinct states.
5. Required-marker vertical alignment — SPEC-17 marks its own reading provisional.
6. Tooltip content for the help affordance.
7. Dark / High Contrast / Warm Dark / HC Light values — light mode only.
8. **Icon SVG path data** — referenced via ephemeral `localhost:3845` URLs and never
   saved. Box sizes and fill tokens are verified; **path geometry is not.** Unlike
   the table specs, this component has **no archived SVGs**.
9. The other 12 variants of `Global/Atom/Fields Toys` (trailing controls).
10. Full variant matrix of `atom/text_field lables`.

## Provenance limits

- **File key is ASSERTED, not measured** — the Figma desktop MCP serves the active
  tab and never reports a file key.
- **The measurement window is Singh's active tab**, and it closed mid-session on
  2026-08-24 without warning.
- Full log: `_opus-handover-2026-08-24/MEASUREMENT-LOG.md`.

## Open token decision — gated

The grid rows (**26px / 34px**), label row (22px), text box (20px) and the 10px
top-row gap are all **[RAW]**. Under the 3-consumer promotion rule, 34px currently
has **2** consumers (this input row + the table header) — **below the threshold**,
so it stays component-local rather than becoming a global token. Any change is
gated by `Design-System/00-TOKEN-LAYER-GATE.md`.
