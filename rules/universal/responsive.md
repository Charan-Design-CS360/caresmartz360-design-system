<!--
=============================================================================
FILE BRIEF: The universal responsive mechanism (wrap + min-width) and its four
explicit bans; the ratio-not-pixel testing invariant; the no-horizontal-scroll
and clipped-content rules; the breakpoint stance (only the uncontested part is
normative — S1/O-1); portal-chrome shell behaviours marked as such; and the
touch-target hit-box mechanism pending O-3. Derived rules keep their SPEC-07
UIG-xxx ids; genuinely new universal rules use UHR-141..143.
This file SUPERSEDES the overlapping lines of ECOSYSTEM-RULES.md §10 and
MASTER-AI-INSTRUCTIONS.md §3 for responsive/HTML-CSS layout topics.
CREATOR: Fable-WOUND-MGMT | 2026-08-24
STATUS: ASSEMBLED — Singh ratification pending
=============================================================================
-->

# Responsive — the mechanism and its bans

**Plain language:** a form or page never "switches layout" when the screen gets narrow.
Columns are flexible boxes that sit side by side while there is room and wrap onto the next
line when there is not. That wrapping — driven by `flex-wrap: wrap` plus a `min-width` on
each column — IS the responsive system. Everything below either enforces that mechanism or
bans the things people reach for instead (direction switches, CSS Grid, fixed widths,
media-query re-layouts). Checks test **ratios, gaps and behaviours — never pixel widths**,
because the same design exists at more than one authored width and the pixels differ while
the design does not.

Rule format: **ID · Plain-language summary · Assertion · How a script tests it · Severity ·
Source.** Severity: **BLOCK** = conformance failure · **WARN** = flag for Singh · **INFO** =
report only. Per CONTRADICTIONS.md discipline, no rule here encodes a value marked OPEN.

---

## 1. The mechanism (normative core)

SPEC-07 §D.3 calls this **"the most emphatic rule Singh states"**. Verbatim, `[J98]` §10
(SPEC-07 line 613):

> "**IMPORTANT:** The responsive mechanism is `flex-wrap: wrap` with `min-width: 250px` on
> both children. This causes automatic stacking. Do NOT use `flex-direction: column` or
> media-query-based stacking for field layout."

And `[J98]` C5 GOAL 2, verbatim (SPEC-07 lines 617–621):

> "• Do NOT use `flex-direction: column` at any breakpoint to stack fields
> • Do NOT use CSS Grid with `grid-template-columns` for field rows
> • Do NOT hardcode widths like `width: 500px` — use `flex: 1` + `min-width`
> • Media queries are ONLY for hiding/showing tier-level panels (sidenav, DDM), NOT for
> changing field layout
> • The `flex-wrap: wrap` + `min-width` pattern handles ALL responsive field stacking
> automatically"

**The `250px` in the quote is a feature-set parameter** (OASIS Type 1 label column; the
actions column threshold is 240px) — the universal rule is the mechanism; the thresholds
belong to the feature (see SPEC-07 §G.2 UIG-015).

### UIG-033 — Columns stack VIA WRAP; `flex-direction` stays `row`

- **Plain-language summary:** on a narrow screen the two halves of a field row end up one
  above the other because they *wrapped*, not because anyone rotated the row vertical.
- **Assertion:** at the narrowest test width the label block sits above the control block
  (`labels.bottom <= actions.top`) **while** the row container still computes
  `flex-wrap: wrap` **and** `flex-direction: row`.
- **How a script tests it:** at the mobile test width:
  `getComputedStyle(inner).flexWrap === 'wrap' && getComputedStyle(inner).flexDirection === 'row'`
  and `labels.getBoundingClientRect().bottom <= actions.getBoundingClientRect().top`.
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.3 UIG-033 (line 835); §D.3 `[J98]` §10 + C5 (lines 611–621).

```css
/* WRONG — stacking by rotating the row at a breakpoint (banned twice over:
   the direction switch AND the media query touching field layout) */
@media (max-width: 799px) {
  .field-row__inner {            /* the Type 1 row's inner frame */
    flex-direction: column;     /* BANNED: stacking must come from wrap */
  }
}
```

```css
/* CORRECT — stacking is emergent; no media query involved */
.field-row__inner {              /* Type 1 row inner frame: holds label column + actions column */
  display: flex;                 /* flex row at EVERY width */
  flex-wrap: wrap;               /* THE responsive mechanism — wrap does the stacking */
  gap: var(--spacing-lg);        /* column gap — binds Figma `spacing/lg`; feature-verified 12px, SPEC-07 UIG-017 */
}
.field-row__labels,              /* label column: field label + helper text; no inputs allowed here (UIG-022) */
.field-row__actions {            /* actions column: the control(s) and companions */
  flex: 1;                       /* both columns grow equally — the 50/50 ratio (UIG-011) */
  min-width: 250px;              /* FEATURE-SET threshold (OASIS Type 1; actions column uses 240px) —
                                    see SPEC-07 §G.2 UIG-015; substitute the owning feature's value.
                                    The MECHANISM (flex + wrap + min-width) is the universal part. */
}
```

### UIG-013 — Field rows are flex + wrap, never CSS Grid

- **Plain-language summary:** field rows are built with flexbox that wraps; CSS Grid is not
  used for them.
- **Assertion:** the field-row inner container computes `display: flex` with
  `flex-wrap: wrap`; it never computes `display: grid`, and no `grid-template-columns` is
  declared for a field row.
- **How a script tests it:** `getComputedStyle(inner).display === 'flex' &&
  getComputedStyle(inner).flexWrap === 'wrap'`; grep the stylesheet for
  `grid-template-columns` scoped to field-row selectors → 0 matches.
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.2 UIG-013 (line 810); `[J98]` C5 GOAL 2 (line 618);
  `[J21]` MUST #4 (line 623).

### UIG-014 — Columns flex; no hardcoded widths

- **Plain-language summary:** a column is never given a fixed pixel width; it grows and
  shrinks, and its floor is a `min-width`.
- **Assertion:** both field-row columns compute `flex-grow: 1`; no rule targeting them
  declares a fixed `width` in px.
- **How a script tests it:** `getComputedStyle(col).flexGrow === '1'` for both columns;
  static scan of their rules for `width:\s*\d+px` → 0 matches (a `max-width` cap such as
  `max-width: 100%` is allowed — SPEC-07 §D.4 requires fixed *input* widths to be capped
  so they cannot overflow a wrapped column, noting the cap value itself is inferred, H-13).
- **Severity:** BLOCK
- **Source:** SPEC-07 UIG-014 (line 811); `[J21]` MUST NOT #3 (line 624); §D.4 (lines
  636–642).

```css
/* WRONG — fixed width forces horizontal overflow below ~840px */
.field-row__labels {
  width: 404px;                  /* BANNED: 404 is a measured artifact width, not a rule */
}
```

```css
/* CORRECT — flex + min-width; see the UIG-033 CORRECT block above for the full row */
.field-row__labels {             /* label column of the Type 1 row */
  flex: 1;                       /* flexes with its sibling — ratio, not pixels */
  min-width: 250px;              /* FEATURE-SET, see SPEC-07 §G.2 UIG-015 */
}
```

### UIG-034 — No `@media` block changes FIELD layout

- **Plain-language summary:** media queries may hide or show big page panels (sidenav,
  DDM); they may never rearrange the fields themselves.
- **Assertion:** no `@media` block contains `flex-direction`, `grid-template-columns`, or
  `display: grid` targeting a field row or its columns. Media queries are only for
  tier-level panels.
- **How a script tests it:** parse every `@media` block; for each declaration inside,
  reject if the property is one of the three above **and** the selector matches a field-row
  pattern.
- **Severity:** BLOCK
- **Source:** SPEC-07 UIG-034 (line 836); `[J98]` C5 GOAL 2 (line 620).

---

## 2. The testing invariant

### UHR-141 — Checks test ratios and gaps, never pixel widths

- **Plain-language summary:** the same component is authored at more than one width in
  Figma, so any check that asserts a pixel width will pass on one true source and fail on the
  other; checks must assert the *relationship* instead.
- **Assertion:** a conformance check for a flexing element asserts ratios (e.g. equal
  split, ±2px), gaps, wrap behaviour, or token bindings — never a fixed pixel width for
  that element. A check that hardcodes such a width is itself non-conformant and must be
  rejected at review.
- **How a script tests it:** meta-check on `04-checks/` sources: any assertion of the form
  `offsetWidth === <px literal>` against a `flex-grow: 1` element is flagged; the allowed
  forms are difference/ratio assertions (`Math.abs(a.offsetWidth - b.offsetWidth) <= 2`)
  and gap/threshold assertions.
- **Severity:** BLOCK (for the check being authored)
- **Source:** SPEC-07 §B intro, verbatim (line 72): *"**→ The testable invariant is the
  ratio and the gap, never the pixel width.**"* — the 1036-vs-844 lesson: the `field-base`
  component is 1036px fixed while the assembled `web` frame row is 844px; both are "equal
  50/50" (derived columns 500px vs 404px), only the pixel figure differs by which node you
  read (SPEC-07 lines 60–72, rule UIG-011, H-1). NEW id: no prior numbered rule states
  this as a discipline for check authors.

---

## 3. No horizontal scrolling; clipped content

### UIG-035 — No horizontal scroll at any test width

- **Plain-language summary:** the page never grows a sideways scrollbar; anything
  genuinely wider than the screen (a wide table, a code block) scrolls *inside its own
  box*, not by stretching the page.
- **Assertion:** at every test width, `document.documentElement.scrollWidth <=
  clientWidth`; no element's bounding box extends past the viewport's right edge. Wide
  content is wrapped in its own `overflow-x: auto` container so the page body itself never
  scrolls horizontally.
- **How a script tests it:** at 1440 / 1200 / 800 / 480 / 320 (SPEC-07 §D.4 line 645 —
  test widths, not canonized breakpoints; see UIG-039):
  `documentElement.scrollWidth <= clientWidth + 1`, and walk all elements for
  `getBoundingClientRect().right > clientWidth` outside an `overflow-x: auto|scroll`
  ancestor.
- **Severity:** BLOCK
- **Source:** SPEC-07 UIG-035 (line 837); §D.4 (lines 629–645); `[FG]` Core Principles:
  *"must follow the highly responsive design which can easily fit from web to mobile"*.
  Note per §D.4: option labels are `white-space: nowrap` per `[J98]` C4 and no source says
  what gives way on a 300px viewport → SPEC-07 H-14; this rule reports such an overflow,
  it does not prescribe the fix.

```css
/* WRONG — a wide table stretches the page and the whole body scrolls sideways */
.results-table { min-width: 900px; }   /* nothing contains it — page-level overflow */
```

```css
/* CORRECT — the wide thing scrolls inside its own container */
.table-scroll {                  /* dedicated scroll container wrapping ONE wide element */
  overflow-x: auto;              /* content wider than the viewport stays REACHABLE (see UHR-142) */
  max-width: 100%;               /* container itself never exceeds the content column */
}
```

### UHR-142 — Clipped-by-hidden is a defect; reachable-by-scroll is fine

- **Plain-language summary:** content that pokes out of a scrollable box is fine — you can
  scroll to it. Content that pokes out of an `overflow: hidden` box is invisible and
  unreachable — that is the defect a width check must catch.
- **Assertion:** no rendered element extends past the right edge of its nearest
  clipping ancestor (`overflow-x: hidden|clip`) by more than 2px. An element whose nearest
  overflow ancestor is `auto`/`scroll` is reachable and passes.
- **How a script tests it:** for each element, walk up to the nearest ancestor whose
  `overflow-x` is not `visible`: `auto|scroll` → pass; `hidden|clip` → compare rects and
  fail if `element.right - clipper.right > 2`. Skip zero-size and `position: fixed`
  elements.
- **Severity:** BLOCK
- **Source:** promoted from the Wound Mgmt visual checker,
  `Office_Work/Wound Management/04-Prototype/capture-visual.mjs` lines 206–210, verbatim:
  *"The precise rule, learned from a false-positive pass that flagged 50 legitimate cases:
  ancestor overflow-x auto|scroll -> content is REACHABLE by scrolling. Not a defect.
  ancestor overflow hidden -> content is CLIPPED and unreachable. THAT is the defect.
  The real bug was the second kind: the modal card had overflow:hidden, so its right-hand
  panel was clipped away entirely — present in the DOM, invisible on screen."*
  NEW id: this distinction exists in no SPEC-07 numbered rule.

---

## 4. Breakpoints — only the uncontested part is normative

**⛔ Do not invent a fifth breakpoint set.** Four non-identical definitions are already on
record (SPEC-07 §D.1, lines 578–588). Adding another is how the register got four.

**Normative (uncontested, per CONTRADICTIONS S1 / OPEN-REGISTER O-1):** the three *design*
widths are **1200 / 800 / 300** (Figma ground truth `[FM]`: `web` 1200 × 4673, `ipad`
800 × 5306, `mobile` 300 × 7994 — SPEC-07 lines 590–591), and the tablet band is
**800–1199**.

**OPEN (encode neither):** mobile ceiling **480 vs 799**; desktop start **1200 vs 1440**
→ S1 / O-1 / SPEC-07 H-11, flag F-001.

### UIG-039 — Breakpoint values: report which recorded set a build uses

- **Plain-language summary:** a check confirms the build's media queries use the agreed
  1200/800 pair, and *reports* — never fails on — which of the two contested variants it
  picked for the mobile ceiling and desktop start.
- **Assertion:** media queries use `1200`/`1199` and `800` boundaries; any `1440` or `480`
  boundary is flagged as contested and reported, not failed. Any boundary value outside
  the recorded sets is a failure (see UHR-143).
- **How a script tests it:** extract every `@media` min/max width; assert the 1200/1199
  and 800/799 boundaries exist where tier panels change; classify 480 and 1440 as
  "contested — reported"; classify anything else as "unrecorded — BLOCK per UHR-143".
- **Severity:** WARN (report), per SPEC-07's own approach
- **Source:** SPEC-07 UIG-039 (line 841); §D.1 (lines 578–595); S1; O-1.

### UHR-143 — A build declares its breakpoint set; unrecorded boundaries are banned

- **Plain-language summary:** until Singh rules on the contested pairs, a build may use
  either recorded variant — but it must say which, and it may not introduce a boundary no
  source ever recorded.
- **Assertion:** every `@media` width boundary in a build is drawn from the recorded sets
  in SPEC-07 §D.1 (1200/1199, 800/799, 480, 1440, 320/300 test floor); the build's
  docs/check output states which contested variant is in use; any other boundary value is
  a conformance failure.
- **How a script tests it:** set-membership test on extracted boundary values; emit a
  one-line declaration (`mobile-ceiling=799, desktop-start=1200`) into the check report.
- **Severity:** BLOCK (for unrecorded boundaries); the declaration itself is INFO output
- **Source:** consequence of CONTRADICTIONS.md's own standing rule (*"Where a row below is
  OPEN, neither value may be encoded — report, never fail"*) applied to S1/O-1; SPEC-07 §G
  conflict discipline (line 787: *"A rule must never encode a value Singh has not
  settled"*). NEW id: no prior rule bans novel boundaries.

---

## 5. Portal-chrome shell behaviours (marked; not universal field rules)

These govern the app shell around the content, not field layout. Their pixel values are
feature/portal-set — cited, not restated as universal:

- **Desktop/tablet shell geometry** — DDM panel widths, content-area widths, collapsed
  sidenav width, global nav height: SPEC-07 §G.3 UIG-030/031/036/037 (lines 832–839),
  feature-set values. Note the global-nav/header height is additionally contested **across
  portals** (52 vs 56 — CONTRADICTIONS S5, OPEN-REGISTER O-14): universal checks must not
  encode either.
- **UIG-038 — Tablet sidenav visibility: report, don't fail.** The collapsed sidenav's
  visibility in the 800–1199 band is contested inside `[J98]` itself (SPEC-07 §D.2 line
  601 → H-12). A check *reports* visibility at 800; it fails neither state. Severity:
  WARN. Source: SPEC-07 UIG-038 (line 840), H-12.
- **Mobile DDM behaviour** is ruled for the OASIS feature (horizontal stepper strip,
  Singh MoM item 10, 2026-08-18 — SPEC-07 UIG-032, line 834) — feature-level precedent,
  not yet ratified as universal shell behaviour; adopt per-feature until Singh generalises
  it.

---

## 6. Touch-target interplay (mechanism only, pending O-3)

### UIG-046 — Hit box grows via out-of-flow pseudo-element; visual box never grows

- **Plain-language summary:** to make a small control easy to tap, enlarge its invisible
  tap area — never the control itself. The control must look exactly as designed.
- **Assertion:** at widths ≤ 1199px, where an interactive element's visual box is smaller
  than the required touch target, the hit box is extended via an out-of-flow
  `::after` pseudo-element (or padding that does not change the visual box), and the
  element's rendered visual size is unchanged from its ruled geometry. **The target-size
  threshold itself is OPEN** — O-3 asks whether 24×24 (WCAG AA met) is accepted or layouts
  re-space to fit 44×44; measured overlaps (16/17 stepper links, 49/52 option pairs at
  44px) are on record. Until O-3 resolves, checks verify the *mechanism* and *report*
  measured hit-box sizes; they do not fail on the threshold.
- **How a script tests it:** for each interactive element at tablet/mobile widths: visual
  `offsetHeight`/`offsetWidth` equals the ruled component geometry (unchanged across
  widths), and the effective hit box (element + pseudo-element/padding) is measured and
  reported against the pending threshold.
- **Severity:** BLOCK for growing the visual box to chase a target size; WARN (report) on
  the threshold itself pending O-3
- **Source:** SPEC-07 UIG-046 (line 853); §E.2 (lines 682–687): `[J98]` C2 row 14 —
  *"Button min-height: 44px"* is WRONG, *"Button height: 30px (use ::after pseudo-element
  for 44px touch target if needed)"* is CORRECT (the 30px is the Agency value and is
  itself S4-contested cross-portal); SPEC-03 §4 (*"pad the row rather than the label"*);
  O-3 / SPEC-07 H-21.

```css
/* CORRECT — the mechanism, threshold left symbolic pending O-3 */
.footer-btn {                    /* footer action button: bg binds `action/primary/bg`,
                                    text binds `action/primary/text-neutral` (SPEC-07 UIG-057);
                                    visual height stays the portal's ruled value (S4 — do not grow it) */
  position: relative;            /* anchor for the out-of-flow hit-box extension */
}
.footer-btn::after {             /* invisible tap-area extension — out of flow, paints nothing */
  content: "";
  position: absolute;            /* removed from layout: neighbours don't move, visuals unchanged */
  inset: -7px 0;                 /* EXAMPLE offsets only — sized so the hit box reaches the
                                    target O-3 settles on; the number is NOT ratified here */
}
```

---

## Supersession

For responsive/layout topics this file supersedes, and is sourced from:
- `Office_Work/ECOSYSTEM-RULES.md` §10 "CSS & CODE STANDING RULES" (line 332 ff.) — its
  "No hardcoded values" bullet is generalised here as UIG-014/UIG-002-adjacent mechanism
  rules.
- `Office_Work/MASTER-AI-INSTRUCTIONS.md` §3 "ARCHITECTURE" (lines 71–75) — "no hardcoded
  values — tokens from Figma variables only".

## Related registers

- **CONTRADICTIONS.md:** S1 (breakpoint set — governs §4), S4/S5 (per-portal control/header
  heights — why §5 and §6 avoid pixel values), C8 (spacing grid — why example gaps bind
  tokens, not numbers).
- **OPEN-REGISTER.md:** O-1 (blocks full ratification of §4), O-3 (blocks the touch-target
  threshold in §6), O-14 (per-portal sizes).
- **EXCEPTIONS.md:** no exception currently registered against any rule in this file.
- **SPEC-07:** §B intro (ratio lesson), §D.1–D.4, §G.3, §E.2, H-11/H-12/H-13/H-14/H-21.

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Assembled from SPEC-07 §B intro + §D + §G.3 + §E.2/G.4 (UIG-045/046), Wound Mgmt `capture-visual.mjs` L206–210, ECOSYSTEM-RULES §10, MASTER-AI-INSTRUCTIONS §3, CONTRADICTIONS S1/S4/S5, OPEN-REGISTER O-1/O-3/O-14 | approved plan step 2 |
