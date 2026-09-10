<!--
=============================================================================
FILE BRIEF: Universal accessibility rules for all CareSmartz360 HTML/CSS —
labels, errors, keyboard, ARIA integrity, touch targets, semantic structure —
plus Singh's recorded contrast policy stated as THE gate. Every rule is
machine-checkable AND readable by a designer. Rules keep their SPEC-07 UIG-xxx
ids where they derive from it; genuinely new universal rules are UHR-151..158.
Contested values are never encoded — they test the uncontested invariant and
cite the CONTRADICTIONS/OPEN-REGISTER row. This file SUPERSEDES the overlapping
lines of ECOSYSTEM-RULES §10 and MASTER-AI-INSTRUCTIONS §3 (cited as sources).
CREATOR: Fable-WOUND-MGMT | 2026-08-24
STATUS: ASSEMBLED — Singh ratification pending
=============================================================================
-->

# Accessibility — universal rules and Singh's contrast policy

**Plain language:** this file says what every CareSmartz360 page must do so that anyone —
keyboard users, screen-reader users, low-vision users — can actually use it. The heart of it
is Singh's contrast policy: in the **High Contrast themes**, contrast failures **block the
build**; in every other theme they are **yellow flags sent to the design system**, never
build blockers. Around that sit the label, error, keyboard, ARIA and touch-target rules from
SPEC-07 §E/§G.4 and the checks already proven in the OASIS and Wound Management verifiers.
Where a value is still contested (see the register ids cited per rule), the rule tests only
what is uncontested and reports the rest.

**Authority note:** for error/validation ARIA specifics (required markers, hard/soft tiers,
the ARIA reference contract), **SPEC-06 is the authority** — SPEC-07 §E says so verbatim.
This file cross-references it, never restates it. Overlapping lines in
`Office_Work/ECOSYSTEM-RULES.md` §10 ("No hardcoded values", "Theme + density modes must
override cleanly") and `Office_Work/MASTER-AI-INSTRUCTIONS.md` §3 ("no hardcoded values —
tokens from Figma variables only") are **superseded by this file** on accessibility points
and cited below as sources.

---

## 1. Singh's contrast policy — THE gate

### UHR-151 — Where contrast failures block, and where they flag

- **Plain language:** contrast is checked everywhere, but it only stops a build in the High
  Contrast themes. Everywhere else a shortfall is reported upward to the design system.
- **Assertion:** every governed foreground/background token pair is measured in every theme
  mode. A pair below its WCAG floor in a **High Contrast** mode is a build-blocking failure.
  The same shortfall in any non-HC mode is a soft flag routed to the design system — it is
  recorded, never hidden, and never blocks.
- **Recorded policy, quoted verbatim** from
  `Office_Work/Wound Management/04-Prototype/verify-contrast.py` (docblock, lines 5–6):

  > POLICY (Singh, 2026-08-19): WCAG AA/AAA is a HARD GATE in the High Contrast themes only.
  > Light / Dark / Warm Dark shortfalls are SOFT YELLOW FLAGS to the design system, not blockers.

- **How a script tests it:** iterate the portal's theme-mode blocks in the generated
  tokens file; compute the ratio per governed pair per mode; exit non-zero **only** when a
  hard-gate (HC) cell fails; print soft flags in a separate, clearly-labelled section
  (working reference implementation: `verify-contrast.py`, exit-1-on-hard-gate logic).
- **Severity:** BLOCK in HC themes · WARN (soft yellow flag) in all other themes.
- **Source:** `verify-contrast.py` docblock (Singh policy 2026-08-19) · hard/soft split
  implemented lines 63–91 of the same file.

### UHR-152 — The numeric floors

- **Plain language:** normal-size text needs 4.5:1 against its background; big text needs
  3.0:1; and no text of any size is ever allowed below 3.0:1 — a bigger font cannot rescue
  a pair under that floor.
- **Assertion:**
  - **Normal text:** contrast ≥ **4.5:1** (WCAG AA).
  - **Large text** (≥ **18.66px bold** or ≥ **24px regular**): contrast ≥ **3.0:1**.
  - **Absolute floor:** no text tier, at any size, may sit below **3.0:1**. A pair between
    3.0 and 4.5 may be cleared by moving the text into the large class **via a density
    mode**; a pair below 3.0 cannot be cleared by size at all.
  - **Size class comes from density modes, never ad-hoc enlargement.** Fonts are not bumped
    per-element to pass a contrast check; the density system governs size (mode *names* are
    contested — S10 / O-17 — so no vocabulary is encoded here).
- **How a script tests it:** classify each governed text token by computed px and weight
  (large iff ≥24px regular or ≥18.66px bold), apply 4.5 / 3.0 accordingly, and mark any
  ratio < 3.0 as unfixable-by-size. Reference: `verify-contrast.py` lines 58–61 (class
  comment + `normal_aa, large_aa = 4.5, 3.0`) and lines 87–90 ("Larger font CANNOT fix
  this: … below WCAG's 3.0:1 floor for text" / "cleared by a larger density mode").
- **Severity:** gated by UHR-151 — BLOCK in HC themes, WARN elsewhere.
- **Source:** `verify-contrast.py` lines 58–61, 87–90 · density-mode governance:
  ECOSYSTEM-RULES §10 ("Theme + density modes must override cleanly") and Singh's reference
  to a larger-density mode as the clearing mechanism, recorded in
  `Office_Work/Wound Management/02-Conflicts/jira-drafts/DRAFT-C360-44027-hc-contrast-defect.md`
  ("Singh referred to a Comfortable density mode with larger fonts, which is what clears
  failure 2" — the mode's existence in Agency is itself open, same file).

### UHR-153 — Contrast is computed from actual token values, never hand-typed

- **Plain language:** a contrast report only counts if the numbers came out of the real
  token file the page uses — never from values someone re-typed into the checker.
- **Assertion:** every contrast check parses the foreground and background from the
  generated `:root` / theme-mode token declarations of the artefact under test and resolves
  the `var()` chain. A report built on hand-copied hex values is void.
- **How a script tests it:** the checker's only colour inputs are the parsed token blocks
  (`verify-contrast.py` line 3: "reads the GENERATED tokens.css, never hand-typed values";
  `verify-v4-a11y.mjs` check A7: "computed from the ACTUAL :root token values"). A missing
  token is itself a reported failure ("MISSING TOKEN"), never silently defaulted.
- **Severity:** BLOCK (an unverifiable contrast report is treated as no report).
- **Source:** `Office_Work/Wound Management/04-Prototype/verify-contrast.py` line 3 ·
  `Office_Work/AssessmentForms/04-Prototypes/verify-v4-a11y.mjs` A7 (lines 263–317).

---

## 2. Labels, errors and required state (SPEC-07 §G.4 — ids kept)

### UIG-040 — Every input has a visible label

- **Plain language:** every field shows its name on screen. A placeholder, a hidden
  screen-reader label, or an `aria-label` alone does not count — sighted users need the
  label too.
- **Assertion:** each `<input>`/`<select>`/`<textarea>` is associated with a `<label for>`
  or wrapping `<label>` whose text is **rendered** (not `sr-only`, not only
  `placeholder`/`aria-label`).
- **How a script tests it:** SPEC-07 §G.4 UIG-040 as written. The shipped automated floor
  is `verify-v4-a11y.mjs` **A1** (label coverage) — note A1 additionally accepts
  `aria-label`/`aria-labelledby`, so **passing A1 does not prove UIG-040**; a visible-text
  assertion must be layered on top (see "Conflicts found", report to caller).
- **Severity:** BLOCK.
- **Source:** SPEC-07 §E.1 bullet 1 (verbatim: "All form fields must have visible labels —
  never placeholder-only") → §G.4 UIG-040 · checker: `verify-v4-a11y.mjs` A1.

**WRONG** — placeholder does the labelling:

```html
<!-- WRONG: the field's name lives only in the placeholder; it vanishes on input -->
<input type="text" placeholder="Physician name">
```

**CORRECT** — rendered label, programmatically associated:

```html
<!-- CORRECT: visible label text, tied to the control by for/id -->
<label for="physician-name">Physician name</label>
<input type="text" id="physician-name">
```

### UIG-041 — The error message replaces the helper text, in the same slot

- **Plain language:** when a field goes wrong, the error takes the helper text's place —
  the two are never shown stacked together.
- **Assertion:** in error state the helper node is absent/`display:none` and the error node
  occupies its slot; both must never be visible together.
- **How a script tests it:** per §G.4 UIG-041 — trigger error state, assert the helper is
  not rendered and the error occupies the same layout slot.
- **Severity:** BLOCK.
- **Source:** SPEC-07 §E.1 bullet 2 → §G.4 UIG-041 · consistent with SPEC-02 §3, SPEC-06 §2.

### UIG-042 — Error colour is a semantic token

- **Plain language:** error red comes from the design system's error tokens, never a
  typed-in colour.
- **Assertion:** error text and error border resolve to the semantic tokens — Figma
  `text/danger` → `var(--text-danger)`, Figma `field/border-danger` →
  `var(--field-border-danger)` — never a literal.
- **How a script tests it:** resolve the computed error text/border through the `var()`
  chain to those token names; any raw colour literal on an error affordance fails.
- **Severity:** BLOCK.
- **Source:** SPEC-07 §E.1 bullet 2 ("semantic error color") → §G.4 UIG-042 · supersedes the
  generic "no hardcoded values" lines of ECOSYSTEM-RULES §10 / MASTER-AI-INSTRUCTIONS §3 on
  this point.

```css
/* CORRECT — error message text: binds the semantic danger text token
   (Figma text/danger); shown only in error state, in the helper's slot (UIG-041) */
.f-msg--error {
  color: var(--text-danger);              /* token, never a literal */
}
/* CORRECT — invalid input border: binds the semantic danger border token
   (Figma field/border-danger); applied while aria-invalid="true" (UHR-158) */
.input-field[aria-invalid="true"] {
  border-color: var(--field-border-danger);
}
```

### UIG-043 — Required fields show the `*` marker

- **Plain language:** anything mandatory is marked with a `*` next to its label.
- **Assertion:** every control carrying `required`/`aria-required` has a sibling `*`
  indicator.
- **How a script tests it:** per §G.4 UIG-043 — for each required control, assert a sibling
  marker node exists.
- **Severity:** BLOCK.
- **Note:** the marker's **size/weight/colour tokens are contested** — O-7 (it currently
  fills text with a *border* token). This rule tests **presence only**; the styling
  parameters stay with O-7 and, where feature-measured, SPEC-07 §G.2 (feature-set).
- **Source:** SPEC-07 §E.1 bullet 3 → §G.4 UIG-043 · O-7 for the styling question.

### UIG-044 — Info icons and alerts never block flow

- **Plain language:** a help icon may explain, but it must never trap the user — no modal,
  no stolen focus, always dismissible with Escape.
- **Assertion:** help affordances are not `role="dialog"`, create no focus trap, and are
  dismissible by `Escape`.
- **How a script tests it:** per §G.4 UIG-044 — assert no dialog role on help affordances,
  focus remains reachable outside them, and an Escape keydown dismisses.
- **Severity:** BLOCK.
- **Note:** a *real* modal dialog contract (role, focus-trap, return-focus) does not exist
  yet anywhere — SPEC-07 H-24 records that gap; the ARIA goes on only when the behaviour
  does.
- **Source:** SPEC-07 §E.1 bullet 4 → §G.4 UIG-044 · H-24 for the dialog-contract gap.

### UIG-047 — DOM order is tab order; Enter/Space activate

- **Plain language:** tabbing moves through the page in the order things appear, and
  toggles respond to both Enter and Space.
- **Assertion / test, quoted verbatim from SPEC-07 §G.4:** "every control reachable by
  `Tab` in DOM order; toggles fire on `Enter`/`Space`".
- **Severity:** BLOCK.
- **Source:** SPEC-07 §E.3 (Pattern Record a11y template) → §G.4 UIG-047.

### UIG-048 — Dynamic counts and status changes are announced

- **Plain language:** when the page updates a count or status by itself ("3 results",
  "2 errors"), screen readers must hear it without the user hunting for it.
- **Assertion:** any live count / validation summary sits in an `aria-live` region.
- **How a script tests it:** per §G.4 UIG-048 — every dynamically-updated count/status node
  is inside (or is) an element with `aria-live` (the shipped wiring uses
  `aria-live="polite"` on the footer status line — `verify-v4-a11y.mjs` A4, wiring point 5).
- **Severity:** WARN.
- **Source:** SPEC-07 §E.3 → §G.4 UIG-048 · `verify-v4-a11y.mjs` A4.

---

## 3. Touch targets

### UHR-154 — 24×24 is the floor; 44×44 is the reported target; the visual box never grows

- **Plain language:** every clickable thing must offer at least a 24×24px hit area — that
  is the binding WCAG level, and today's components meet it. The bigger 44×44 target is
  Singh's open choice (O-3): we measure and report it, we don't fail on it. And whichever
  way that lands, the *visible* size of a control never grows to fake a bigger hit area —
  padding or an invisible pseudo-element does that job.
- **Assertion:**
  - Every interactive element's hit box (including padding / `::after` extensions) is
    ≥ **24×24 CSS px** — the binding **WCAG 2.5.8 AA** minimum. Evidence it is currently
    met: the native checkbox/radio box measures 24×24 (SPEC-07 H-21, measured live
    2026-08-17).
  - **44×44** (WCAG 2.5.5 AAA-level / [FG]-preference target, SPEC-07 UIG-045/UIG-046) is
    **reported, not enforced**: H-21 measured that meeting it with today's Figma-approved
    spacing overlaps adjacent controls (16/17 stepper links, 49/52 option pairs). Whether
    to accept 24 or re-space for 44 is **O-3 — Singh's open call**; neither outcome is
    encoded.
  - **Mechanism (uncontested):** where a hit area is enlarged, it is enlarged by padding or
    an invisible pseudo-element — the visual box does not grow (SPEC-07 UIG-046's
    mechanism; its specific pixel heights are feature-set/contested — see SPEC-07 §G.4 and
    S4 — and are not restated here).
- **How a script tests it:** `getBoundingClientRect` (plus pseudo-element extent) on every
  interactive element → fail below 24×24; separately report the count meeting/failing
  44×44 and any adjacent-target overlaps a 44px box would create (H-21's measurement
  method).
- **Severity:** BLOCK below 24×24 · INFO for the 44×44 report (pending O-3).
- **Source:** SPEC-07 H-21 (2.5.8 AA = 24×24, measured overlap data, options (a)/(b) for
  Singh) · O-3 · UIG-045/UIG-046 for the 44 target and the never-grow mechanism ·
  SPEC-03 §4 ("pad the row rather than the label").

**WRONG** — growing the control to reach a target size:

```css
/* WRONG: inflates the visible button to chase a hit-target number;
   visual geometry is design-system-owned and must not change for this */
.btn { min-height: 44px; }
```

**CORRECT** — invisible hit-area extension, visual box untouched:

```css
/* CORRECT — button keeps its designed visual box; only the hit area extends */
.btn {
  position: relative;                     /* anchor for the hit-area extension */
}
/* CORRECT — invisible hit-area extension: enlarges what a finger can hit,
   adds no visible pixels; extent is feature-set pending O-3 */
.btn::after {
  content: "";
  position: absolute;
  inset: calc(-1 * var(--spacing-md));    /* token-bound extension, no raw px */
}
```

---

## 4. ARIA integrity — promoted machine checks (from `verify-v4-a11y.mjs`)

These four were proven as running checks on the OASIS V4 prototype and are promoted here as
universal rules. The checker file is the reference implementation for each.

### UHR-155 — Every ARIA id-reference resolves

- **Plain language:** if the markup says "described by X", an element with id X must
  actually exist — a dangling reference is a lie to the screen reader.
- **Assertion:** every token in every `aria-describedby`, `aria-labelledby` and
  `aria-controls` attribute resolves to an existing `id` in the document.
- **How a script tests it:** collect all DOM ids, split each reference attribute on
  whitespace, assert every token is in the id set (`verify-v4-a11y.mjs` **A5**).
- **Severity:** BLOCK.
- **Source:** `verify-v4-a11y.mjs` A5 (lines 241–250) · SPEC-06 §13 (the ARIA reference
  contract) — cross-referenced, not restated.

### UHR-156 — Heading hierarchy never skips a level downward

- **Plain language:** headings step down one level at a time (h2 then h3, never h2 straight
  to h4), so the document outline reads sanely.
- **Assertion:** in document order, no heading's level exceeds its predecessor's by more
  than one. Presence of an `<h1>` is reported (WARN when absent), not blocked — ownership
  of who assigns levels is an open obligation (§6).
- **How a script tests it:** sequence all `<h1>`–`<h6>` levels; flag every
  `h(n)→h(n+2 or more)` transition; count h1s (`verify-v4-a11y.mjs` **A6**/**A6b**).
- **Severity:** BLOCK for downward skips · WARN for missing h1.
- **Source:** `verify-v4-a11y.mjs` A6/A6b (lines 252–261).

### UHR-157 — No nameless `role="group"`

- **Plain language:** a group either has a real name a screen reader can speak, or no group
  role at all. A role with no name announces an anonymous boundary — worse than nothing.
- **Assertion:** every options/grouping container is EITHER (a) a **named group** —
  `role="group"` with a resolving accessible name (every `aria-labelledby` token exists, or
  a non-empty `aria-label`) — OR (b) a **plain role-less container** whose controls are each
  individually labelled. The **only** group-level failure is `role="group"` without a
  resolving name (a WCAG 4.1.2 / 1.3.1 naming failure).
- **How a script tests it:** `verify-v4-a11y.mjs` **A2** — categorise each container as
  named-group / plain-labelled / nameless-group / plain-unlabelled; fail on the last two
  (plain-unlabelled is counted here for visibility but is a label defect under UIG-040/A1).
- **Severity:** BLOCK.
- **Source:** `verify-v4-a11y.mjs` A2 (rule corrected 2026-08-14 per an accepted Opus-lane
  challenge; contract written into SPEC-06 §13 rules 2 and 4).

**WRONG** — a role with nothing to announce:

```html
<!-- WRONG: role="group" with no accessible name — announces an anonymous
     boundary to a screen reader for no benefit -->
<div class="options-container" role="group">…</div>
```

**CORRECT** — either shape passes:

```html
<!-- CORRECT (a): named group — the role has a name that resolves -->
<div class="options-container" role="group" aria-labelledby="eth-label">…</div>

<!-- CORRECT (b): plain container, no role; every control inside is
     individually labelled (per UIG-040) -->
<div class="options-container">…</div>
```

### UHR-158 — `aria-invalid` is wired to `role="alert"` / `role="status"`

- **Plain language:** when validation fails, the field itself says "I'm invalid", the flag
  is removed the moment it's fixed, and the message is spoken — urgently for hard errors,
  politely for soft ones.
- **Assertion:** the validation engine sets `aria-invalid="true"` on a failing control and
  removes the attribute when it clears; hard (submit-tier) messages are exposed with
  `role="alert"`, soft messages with `role="status"`, per SPEC-06 §2/§3 (SPEC-06 owns the
  error-tier semantics — cross-referenced, not restated).
- **How a script tests it:** `verify-v4-a11y.mjs` **A4** — assert the engine source contains
  the set/remove `aria-invalid` calls and the alert-vs-status role assignment, and the
  markup carries the `aria-live` status line (5 wiring points).
- **Severity:** BLOCK.
- **Source:** `verify-v4-a11y.mjs` A4 (lines 228–239) · SPEC-06 §2/§3.

---

## 5. Semantic structure

### UIG-064 — Stepper/nav steps are real buttons or links inside `<nav><ol>`

- **Plain language:** navigation steps are genuine buttons or links inside a real numbered
  list in a nav landmark — not styled divs, so keyboards and screen readers get them free.
- **Assertion:** each step is a real `<button>`/`<a>` inside `<nav><ol>`.
- **How a script tests it:** per SPEC-07 §G.5 UIG-064 — for each step node, assert tag is
  `button` or `a` and ancestry includes `nav > ol`.
- **Severity:** BLOCK.
- **Source:** SPEC-07 §G.5 UIG-064 (F-4; SPEC-03 §4).

**WRONG** — divs playing at being a stepper:

```html
<!-- WRONG: click-only divs — invisible to keyboard and assistive tech -->
<div class="stepper">
  <div class="step" onclick="go(1)">Patient details</div>
</div>
```

**CORRECT** — landmark, list, real controls:

```html
<!-- CORRECT: nav landmark > ordered list > real button per step;
     aria-current on the active step is an open obligation (see §6) -->
<nav aria-label="Assessment sections">
  <ol class="stepper">
    <li><button type="button" class="step">Patient details</button></li>
  </ol>
</nav>
```

---

## 6. The gap list — explicit unowned obligations (from SPEC-07 §E.4)

These are real WCAG obligations that **no guideline frame or ticket covers**. They are
listed so they cannot be silently forgotten. None is a normative rule here — each is either
blocked on an open register row or has no owner yet.

| Obligation | WCAG | State of the record | Register id |
|---|---|---|---|
| **Focus ring** — visible focus indicator on every interactive element | 2.4.7 | **No conforming token exists.** SPEC-07 H-15: `action/focus/ring`, `action/focus/ring-offset`, `action/toggle/focus-ring` exist in the export but no measured node binds any, `action/focus/ring` resolves to `#000000` in Light Mode (quoted evidence), and [J98]'s stated focus style is a raw `rgba` its own token rule forbids. No rule can be written until Singh names the token, width and offset. | **O-2** |
| **`aria-current="step"`** on the active stepper step | 4.1.2 | Absent from all guideline frames; governed today by SPEC-03 §3–§4 per SPEC-07 §E.4. No universal rule and **no open-register row yet** — reported to the register owner. | — (unregistered) |
| **Never colour alone** — state/status must survive with hue removed | 1.4.1 | Governed by SPEC-03 §3–§4 / SPEC-06 §13 per §E.4. **Satisfied in practice by status LABELS carrying the meaning:** the Wound Mgmt HC finding (DRAFT-C360-44027-hc-contrast-defect.md) records that in both HC modes all four `tags/*-bg` tokens collapse to a single surface, "so hue moves into the text — our design keeps the text label carrying the meaning, so nothing depends on colour alone (WCAG 1.4.1)". A design whose meaning dies when tag backgrounds collapse fails this. No open-register row yet. | — (unregistered) |
| **Contrast pairs per component** — each component doc must declare its governed fg/bg token pairs | 1.4.3 | Today only two feature checkers carry pair lists (`verify-v4-a11y.mjs` PAIRS for the OASIS prototype; `verify-contrast.py` for wound chips). No universal pair registry, no owner. UHR-151/152/153 define how pairs are judged once declared. | — (unregistered) |
| **Heading hierarchy ownership** — which layer assigns heading levels | 1.3.1 | The skip check exists (UHR-156), but no layer owns level assignment; `verify-v4-a11y.mjs` A6b found the V4 prototype has **no `<h1>`** (outline starts at h2 — flagged for the Opus lane). | — (unregistered) |

---

## Per-portal notes

- **Theme-mode sets are portal-specific and never mixed** (C360-3526 Rule 4, as recorded in
  `verify-contrast.py`'s portal table): **Agency** = Light, Dark, High Contrast, Warm Dark,
  HC Light — the two HC modes are the hard-gate modes; **Caregiver** = Light, Soothing
  Dark, High Contrast — HC is the hard-gate mode. UHR-151's gate follows each portal's own
  mode set; a value or approach proven in one portal transfers as an *approach*, never as a
  cross-applied token (same file, cross-portal note).
- **Known open HC defect (Agency):** one Agency HC tag cell is below AA and is Jira-drafted
  as a token-level fix — see `DRAFT-C360-44027-hc-contrast-defect.md`. Under UHR-151 that
  is a hard-gate item; it is the design system's to fix at token level, not a page-side
  override (same ownership stance as `verify-v4-a11y.mjs`'s `owner=design-system-token`
  tagging).

## Related registers

- **Open questions:** O-2 (focus ring) · O-3 (touch-target 24 vs 44) · O-7 (required-marker
  styling) · O-17 (density vocabulary) — `01-universal/OPEN-REGISTER.md`
- **Contradictions:** S4 (button height, why control heights are not restated here) · S10
  (density mode names) — `01-universal/CONTRADICTIONS.md`
- **Exceptions:** EX-002 (the one 10px body-copy exception — type floor context) —
  `EXCEPTIONS.md`
- **Authority cross-references:** SPEC-06 (error/validation ARIA contract) · SPEC-07 §E,
  §G.4, §G.5, H-15/H-21/H-24 · SPEC-03 §3–§4 (stepper/focus, governed there)

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Assembled from SPEC-07 §E/§G.4/§G.5/§H (UIG-040..044, 047, 048, 064; H-15/H-21/H-24), verify-contrast.py (Singh contrast policy 2026-08-19 + floors), verify-v4-a11y.mjs (A1, A2, A4, A5, A6, A7 promoted as UHR-153/155/156/157/158), DRAFT-C360-44027 (HC finding, per-portal modes), ECOSYSTEM-RULES §10 + MASTER-AI-INSTRUCTIONS §3 (superseded on overlap). New ids UHR-151..158; UHR-159 unused. | approved plan step 2 |
