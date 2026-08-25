<!--
=============================================================================
COMPONENT CONTRACT — Button (Agency portal)

WHAT THIS FILE IS
  The single authoritative answer to "what shape is a CareSmartz360 button?"
  Written because this repo previously carried button COLOUR bindings but no
  geometry at all, and its components/component-mapping.json admits in its own
  $metadata.warning that its node IDs "look fabricated".

HOW TO READ IT — every value carries one of these markers, always:
  [MEASURED]  read directly from live Figma. Node id + date given.
  [DERIVED]   computed from measured values. The arithmetic is shown.
  [RAW]       real value, but NOT bound to any design token in Figma.
  [UNVERIFIED] not read. Do not build from it without re-reading Figma.
  A DERIVED value is never presented as MEASURED. If a marker is missing,
  treat the value as UNVERIFIED and re-read Figma.

CREATOR: Fable-DESIGN-SYSTEM (C360-3526) | 2026-08-24
SOURCE: Figma section 26938:66536 "AI Button component"
        File key: ASSERTED as 4bh29laapcuKBTghfaRXF0 — see "Provenance limits".
=============================================================================
-->

# Button — Agency component contract

Canonical Jira parent: **C360-44737**. Component Jira: **C360-44256**.

## ⚠️ Read this first: trust the variables, not the prose

Figma's *descriptions, guideline cards and inventory tables for this component are
demonstrably wrong.* Three proven cases:

| Figma's prose claims | The file actually contains |
|---|---|
| `Button/Primary`: *"48 variants covering size (S/M/L), state (default/hover/active/disabled/**loading**)"* | **No `Size` axis and no `loading` state.** Across all 392 symbols, `Size=` occurs **0 times**; the only "loading" occurrence is inside that description. Real axes: `State`, `Icon`, `Compact`, `Outline`, `Type` |
| `Button/AI`: *"Uses action/ai/\* semantic tokens"* | Binds exactly **one** of the eight — `action/ai/text-neutral` |
| 4 separate frames: *"AI Tools: read component annotations for binding rules"* | **No annotations exist and none are readable.** Figma's own card reads `Annotations 0/1 Incomplete` |

**Rule for any AI tool: read the bound variables and the node structure. Treat
Figma's written descriptions as unverified prose.** Every AI tool sent to Figma
reads exactly the wrong half by default, because the prose is what *looks* like
documentation.

## Anatomy — one anatomy for all 8 types

Verified at set level across **8 of 8** component sets: every set binds the
identical geometry and typography tokens. Only the colour namespace differs.

```html
<!-- ─── CONTAINER ───────────────────────────────────────────────────────────
     flex · align-items:center · justify-content:center
     min-height  [MEASURED 30px, RAW — no token. THE design-system gap]
     min-width   [MEASURED 80px icon+label / 60px label-only, RAW]
     padding     [MEASURED, TOKEN-BOUND] 8px icon side / 12px label side / 0 block
     gap         [MEASURED, TOKEN-BOUND] 4px
     radius      [MEASURED, TOKEN-BOUND] 4px
     Height is set by min-height ONLY. Vertical padding is spacing/none = 0,
     so height can never emerge from padding. See "Why min-height". -->
<button class="cs-btn cs-btn--primary" type="button">

  <!-- ─── ICON (optional) ───────────────────────────────────────────────────
       18 × 18 [MEASURED, RAW — no icon-size token]
       Wrapper AND glyph are both size-[18px].
       Decorative: aria-hidden. An icon-only button needs an accessible name.
       ⚠ The glyph resolves to component 16729:23413, described as
         "Icon set for view-mode switches (list/grid/calendar) in field
          listing pages" — a semantically wrong source set. Defect D4. -->
  <span class="cs-btn__icon" aria-hidden="true"><svg><!-- 18×18 --></svg></span>

  <!-- ─── LABEL ─────────────────────────────────────────────────────────────
       Inter · 12px · line-height 16px · weight 500 · letter-spacing 0
       [MEASURED, ALL TOKEN-BOUND]  white-space: nowrap  text-align: center
       Label colour and icon colour are ONE token — never set separately. -->
  <span class="cs-btn__label">Save</span>
</button>
```

## Geometry — the complete table

Read from `5703:7088` (Primary · Default · Leading · Compact=No · Outline=No),
2026-08-24, live Figma.

| Property | Value | Figma token | CSS custom property | Marker |
|---|---|---|---|---|
| `min-height`, standard | **30px** | *(none)* | — | **[MEASURED] [RAW]** |
| `min-height`, compact | **24px** | *(none)* | — | **[MEASURED] [RAW]** |
| `min-width`, icon + label | 80px | *(none)* | — | **[MEASURED] [RAW]** |
| `min-width`, label only | 60px | *(none)* | — | **[MEASURED] [RAW]** |
| `min-width`, icon only | = `min-height` (square) | *(none)* | — | **[MEASURED] [RAW]** |
| `padding-block` | **0** | `spacing/none` | `var(--spacing-none)` | [MEASURED] token-bound |
| `padding`, icon side | 8px | `spacing/md` | `var(--spacing-md)` | [MEASURED] token-bound |
| `padding`, label side | 12px | `spacing/lg` | `var(--spacing-lg)` | [MEASURED] token-bound |
| `padding`, icon-only | 4px both | `spacing/sm` | `var(--spacing-sm)` | [MEASURED] token-bound |
| `gap`, icon ↔ label | 4px | `spacing/sm` | `var(--spacing-sm)` | [MEASURED] token-bound |
| `gap`, label only | 0 | `spacing/none` | `var(--spacing-none)` | [MEASURED] token-bound |
| `border-radius` | 4px | `border-radius/rounded` | `var(--border-radius-rounded)` | [MEASURED] token-bound |
| icon box | 18 × 18 | *(none)* | — | **[MEASURED] [RAW]** |
| `font-family` | Inter | `font-family/primary` | `var(--font-family-primary)` | [MEASURED] token-bound |
| `font-size` | 12px | `font-size/caption` | `var(--font-size-caption)` | [MEASURED] token-bound |
| `line-height` | 16px | `line-height/caption` | `var(--line-height-caption)` | [MEASURED] token-bound |
| `font-weight` | 500 | `font-weight/body-strong` | `var(--font-weight-body-strong)` | [MEASURED] token-bound |
| `letter-spacing` | 0 | `fonts/tracking/X-tracking-0` | ⚠️ **absent from tokens.css** | [MEASURED] gap G2 |

### The padding mirror — 8px on the icon side, 12px on the label side

| Icon config | min-width | padding-left | padding-right | gap |
|---|---|---|---|---|
| **Leading** | 80px | 8px `spacing/md` | 12px `spacing/lg` | 4px `spacing/sm` |
| **Trailing** | 80px | 12px `spacing/lg` | 8px `spacing/md` | 4px `spacing/sm` |
| **Only** | 30 / 24px | 4px `spacing/sm` | 4px `spacing/sm` | n/a |
| **None** | 60px | 12px `spacing/lg` | 12px `spacing/lg` | 0 `spacing/none` |

**[DERIVED — arithmetic shown, and it reproduces the measured positions exactly.]**
In compact `5703:7158` the icon sits at `x=11`, the label at `x=33` (width 32),
inside an 80px symbol:

```
content     = 18 (icon) + 4 (gap) + 32 (label)   = 54
padding     = 8 (left) + 12 (right)              = 20
content+pad = 74 < min-width 80 → slack 6, centred → 3px per side
icon x      = 8 + 3                              = 11  ✓ matches measured
label x     = 8 + 3 + 18 + 4                     = 33  ✓ matches measured
right edge  = 80 − (33 + 32) = 15 = 12 + 3       ✓ matches measured
```

## Why `min-height` and never a fixed `height`

| Reason | Evidence |
|---|---|
| Figma itself emits the `min-` form | `min-h-[30px]` on `5703:7088` [MEASURED] |
| Every type uses `min-height` **except Split** | Split uses fixed `height` and therefore cannot grow — **defect F-008** |
| W3C recommends it for target sizing | [Technique C42](https://www.w3.org/WAI/WCAG22/Techniques/css/C42) |
| Fixed units clip text when users enlarge type | [Technique C28](https://www.w3.org/WAI/WCAG22/Techniques/css/C28) |

**Height cannot emerge from padding here.** `padding-block` is `spacing/none`, and
`spacing/none` is **0 in every density mode** (verified across Caregiver's Default /
Large / Small). So `min-height` is doing all the work — which is exactly why it is
the value that most needs a token.

## Compact changes exactly ONE thing

`get_variable_defs` on standard `5703:7088` and compact `5703:7158` returns
**byte-identical** output. Same `spacing/sm 4`, `md 8`, `none 0`, `lg 12`, same
`border-radius/rounded 4`, same typography, same colours, **same 18×18 icon**.

**The only difference is the raw `min-height`: 30 → 24.** [MEASURED]

Implication: `Compact` is a **per-instance** choice, not a global density mode —
compact and standard buttons appear on the same screen. Do not model it as a mode.

## Colour formula — `action/{type}/{role}`

```
Filled   (Outline=No):   background → action/{type}/bg
                         label + icon → action/{type}/text-neutral   (ONE token, both)
Outlined (Outline=Yes):  no fill; border → action/{type}/outlined
                         label + icon → action/{type}/text-hard      (ONE token, both)
Focus adds:              action/focus/ring    (strokeWeight 2, opacity 0.4)
Disabled uses:           action/disabled/bg + action/disabled/text-neutral
Disabled stroke:         border/transparent   (opacity 0, strokeWeight 1)
```

⚠️ **Alpha is load-bearing.** `action/focus/ring` = `#00000066` (40%) and
`border/transparent` = `#00000000` (0%). A token pipeline that reads only the `hex`
field and drops `alpha` renders **every focus ring a solid black bar and every
disabled border a solid black line.** Emit `rgba()` whenever `alpha < 1`.

⚠️ **`Button/label` and `Button/AI` style names are Figma text styles, and the
Figma doc cards print `action/{type}/text`. That token name is wrong for 7 of 8
types** — the real names are `…/text-neutral` (filled) and `…/text-hard` (outlined).

## Per-type token scope — MEASURED at set level, 2026-08-24

`∅` = **measured absence** (the set does not bind it), not an assumption.

| Type | Set node | `bg` | `hover` | `pressed` | label (filled) | label (outlined) | `outlined` | `bg-soft` |
|---|---|---|---|---|---|---|---|---|
| Primary | `5703:7087` | `#0077ff` | `#005ce6` | `#0045b3` | `text-neutral` | `text-hard` | `#0077ff` | ∅ |
| Secondary | `27098:1282` | `#f0f7ff` | `#e0f0ff` | `#badeff` | **`text`** `#005ce6` | — | ⚠️ `#00000000` | ∅ |
| Ghost | `5703:7709` | ∅ (transparent) | `#f1f5f9` | `#e2e8f0` | `text-hard` `#005ce6` | n/a | ∅ | ∅ |
| Soft | `5703:8495` | `#f8fafc` | `#f1f5f9` | `#e2e8f0` | `text-neutral` `#475569` | — | `#e2e8f0` | ∅ |
| Warning | `26781:44955` | `#eab308` | `#ca8a04` | `#a16207` | `text-neutral` `#713f12` | **no `text-hard`** | ⚠️ `#713f12` | `#fef9c3` |
| Destructive | `5703:7501` | `#b91c1c` | ⚠️ `#dc2626` | ⚠️ `#b91c1c` | `text-neutral` `#ffffff` | `text-hard` `#dc2626` | `#dc2626` | `#fef2f2` |
| Success | `10356:17309` | `#16a34a` | ⚠️ **∅ ABSENT** | `#166534` | `text-neutral` `#ffffff` | `text-hard` `#16a34a` | `#16a34a` | `#dcfce7` |
| Split | `26767:45640` | via `action/primary/bg` | via `action/primary/hover` | ∅ | `action/primary/text-neutral` | — | `action/primary/outlined` | ∅ |
| **AI** | `27116:1359` | ⚠️ **raw gradient, see D7** | — | — | `action/ai/text-neutral` | — | — | — |

Shared by every type: `action/focus/ring` `#00000066`, `action/disabled/bg`
`#f1f5f9`, `action/disabled/text-neutral` `#475569`, `border/transparent`
`#00000000`.

**Naming exception you must code around:** Secondary alone uses
`action/secondary/text`. Every other type uses `…/text-neutral` / `…/text-hard`.
**A generic "build the token name from the type name" helper WILL break on
Secondary.**

## Variant axes — MEASURED across all 392 symbols

| Axis | Values | Notes |
|---|---|---|
| `State` | Default · Hover · Active · Focus · Disabled | **No `loading` state exists** |
| `Icon` | Leading · Trailing · Only · None | AI set offers only Leading and Only |
| `Compact` | No · Yes | **196 of 392 symbols are `Compact=Yes` — a strict ×2** |
| `Outline` | No · Yes | Ghost has no outline column |
| `Type` | a **derived label**, not an axis | See below |

**`Type` is not orthogonal.** It records which treatment a variant received:
`Primary` for plain, `NA` for disabled, `Outlined` for bordered.
**Do not model `type` and `state` as independent enums** — a disabled button has no
type, and an outlined button's type *is* "outlined".

Set totals per SPEC-07b §5.2 sum to **360**; the live dump holds **392** symbols.
The 32-symbol gap is unexplained — the newly found AI set accounts for 20 of it.
**[UNVERIFIED]** — do not rely on any total.

## Known defects — do NOT silently "fix" these

Each is measured. Fixing one locally would invent a look Figma does not show.

| # | Defect | Evidence |
|---|---|---|
| D-A | **Success has no `hover` token.** | `action/success/hover` absent from the set's bound variables [MEASURED] |
| D-B | **Destructive `pressed` is invisible** — `#b91c1c`, *identical* to its `bg` | [MEASURED] |
| D-C | **Destructive `hover` goes the wrong way** — `#dc2626` is *lighter* than `bg` | [MEASURED] |
| D-D | **`action/secondary/outlined` is `#00000000`** — an "outlined" token that is fully transparent | [MEASURED] |
| D-E | **Split uses fixed `height: 30px`**, so it cannot grow; and its divider is a raw `rgba(255,255,255,0.3)` — the one genuinely hardcoded colour | SPEC-07b §6 |
| D-F | **The AI button's fill is a raw two-stop gradient** — `linear-gradient(to right, #7c3aed, #2563eb)`, two hardcoded hex values. Violates "never hardcode hex". `action/ai/bg` exists but is unused | [MEASURED] `27116:1155` |
| D-G | **A `<button>` nested inside the AI button** — component `Button / AI suggestion` sits inside the 18×18 icon slot. Invalid HTML, keyboard/AT hazard | [MEASURED] |
| D-H | **The icon set is semantically wrong** — sourced from a list/grid/calendar view-switcher set | [MEASURED] |

## Accessibility

| Item | Status |
|---|---|
| Target size, standard 30 × 30 | ✅ **Passes WCAG 2.2 SC 2.5.8 (AA)** — floor is 24 × 24 CSS px |
| Target size, compact 24 × 24 | ✅ Passes AA **exactly at the floor** — no margin |
| SC 2.5.5 (AAA, 44 × 44) | ❌ Fails at both sizes |
| Icon-only buttons | **MUST** carry `aria-label`; the glyph is `aria-hidden` |
| Focus visible | `action/focus/ring`, 2px, 40% opacity. ⚠️ **Whether the ring is inside or outside the box is [UNVERIFIED] and it changes layout** — a 2px outside ring grows 30px to 34px |
| Disabled | `disabled` attribute, not colour alone |

## NOT VERIFIED — do not build these without re-reading Figma

1. **Focus-ring stroke alignment** — inside vs outside. **Changes layout.**
2. **`Type=Soft` CSS** for Warning / Destructive / Success (`26882:17447`,
   `26879:9525`, `26882:17369`). Existence verified; CSS never pulled.
3. **The 20 `Type=AI` variants** beyond the Default·Leading one read here.
4. **Per-state reads for non-Primary types.** Set-level binding IS measured (table
   above), but *which state maps to which token* was read variant-by-variant for
   **Primary only**. SPEC-07b's own warning: the single non-Primary state that was
   checked (Success hover) **broke the inferred pattern**.
5. **Dark / High Contrast / Warm Dark / HC Light** values — light `:root` only.
6. **Behaviour** — transition timing, keyboard interaction, loading. Not covered.
7. **Split's internal padding** and its `Outline=Yes` composition.
8. Split's set also binds `field/value-inverse` — a *field* token inside a button.
   Unexplained.

## Provenance limits — stated, not hidden

- **The Figma file key cannot be proven from tool output.** The desktop MCP serves
  whatever tab is *active* and never reports a file key. `4bh29laapcuKBTghfaRXF0`
  is **asserted**, from the repo's own Agency mapping — not measured.
- **The measurement window is Singh's active tab.** It closed mid-session on
  2026-08-24 (`5703:7088` succeeded, then failed minutes later after a tab switch).
- **Two archived dumps of section `26938:66536` disagree** on 11 node heights and
  differ by 43 nodes (18:04 vs 18:23 the same evening). Values here come from the
  **live read**, not either dump, except where noted.
- Full log: `_opus-handover-2026-08-24/MEASUREMENT-LOG.md`.

## Open token decision — gated

`min-height` / `min-width` are **[RAW]** — no token exists. A proposal for four
`number` tokens in the **Density Modes** collection
(`control/min-height`, `control/min-height-compact`, `control/min-width`,
`control/min-width-label`) is **awaiting Singh's GO** under
`Design-System/00-TOKEN-LAYER-GATE.md`. **Until then, this contract records 30px as
a measured, unbound design-system gap — it does not authorise hardcoding it.**
