<!--
=============================================================================
FILE BRIEF: Entry point for 02-components — what this folder IS (a copy-from
reference repository, NOT an import), how a feature adopts a class from it, how
changes propagate, and which spec every file came from. Read this before
copying a single line out of the .css files beside it.
CREATOR: Opus (Claude), Wound Management session, built to Singh's verbatim
         2026-08-24 architecture ruling (quoted below).
STATUS: ASSEMBLED — Singh ratification pending.
=============================================================================
-->

# 02-components — the shared code repository

**This folder is a REPOSITORY OF SHARED CODE FOR REFERENCE. Features COPY from
it. Nothing here is imported, linked, bundled or compiled.**

That is Singh's ruling, 2026-08-24, verbatim:

> *"wound management feature must have its complete css and html at its own folder
> but it must knows from where it should take reference like what pattern and what
> approach we are using to define the classes and html code design style. the
> document level design system where generic rules and html patterns are written
> those are just to tell all feature that you can copy general classes and html
> code for general patterns from here. that will act as repository ONLY of shared
> code for references."*

> *"For generic and atomic level things like action buttons, checkboxes, radio,
> cell structure and pattern, Header, type styles all those must be generic
> classes for complete caresmartz360… But make sure the feature special things
> like modals or special cases must be at feature level folder. example wound care
> folder with modal and section components."*

## What lives here, and what does not

| | |
|---|---|
| **Here (generic, atomic, every feature)** | action buttons · fields / inputs · select & dropdown menu · checkbox, radio, toggle · tags & chips · search field · table cell structure and header · type styles |
| **Feature folder (single-use)** | that feature's modals, its sections, its diagrams and placeholders, its one-off layouts. Example: the Add Wound modal and the wound-care sections belong to Wound Management, not here |

The test is Singh's own: **if a second feature would need the same answer, it
belongs here.** A modal that exists once does not.

## How a feature adopts a class — the five steps

1. **Read this file, then the block you want.** Every rule block in every `.css`
   file carries a header comment with an `[ID]`, what the element is, the tokens it
   binds, its states, and the spec section it came from. If the comment does not
   make sense to you, do not copy the block — ask.
2. **Copy the block, comment and all, into the feature's own stylesheet.** Keep
   the `[ID]` line. That single line is what lets the drift check match your copy
   back to this reference; deleting it makes your copy invisible to the check.
3. **Keep the class names exactly as written.** The whole point is that
   `.cs-btn--primary` means the same thing in every feature. If you rename it, you
   have made a sixth breadcrumb (see `01-universal/naming.md`, "five names for one
   component" — that is a real, verified problem in this codebase, not a warning).
4. **Do not edit the values.** Colours, spacing and radii come from `var(--token)`
   and are the token layer's business. Structural numbers came from a spec and are
   the design system's business. If a value is wrong for your screen, that is a
   flag (`RULE-FLAGS.md`), not an edit.
5. **Record the adoption.** Note in the feature's own docs which `[ID]`s it copied
   and at which date, so the drift check has something to compare and so the next
   person knows where the CSS came from.

**Never `@import` or `<link>` these files.** They are not a build artefact, they
carry no `:root` token definitions (except one masked SVG glyph in
`checkbox-radio.css`), and they are not versioned as a package.

## How a change reaches every feature

Singh's requirement was: *"must be highly reusable so if i will make changes in
single place must reflect all places."* Copying satisfies that in two different
ways depending on what changed, and it is worth being precise about which:

**Colour, spacing, radius, font size, line-height, weight → propagates by
itself.** Every one of those binds `var(--token)`. The copied class in the feature
resolves the same custom property as the reference, so a change in the token layer
(the owner-downloaded Variables export → the generated token file) lands in every
feature at once with no edit anywhere. That is the reason rule 1 of this folder is
*no raw values in components* — a hardcoded value is a value that can never
propagate.

**Structure → propagates by NOTICE, not by magic.** If a button's `min-height`
changes from 30px to 32px, the reference file is edited once, and the **drift
check** then compares every feature's copy against the reference, goes RED, and
names the feature, the `[ID]` and the property that no longer matches. One edit at
the source; every feature is forced to notice. Nothing rots silently, and no
feature is silently overwritten either — which matters, because a feature may hold
a Singh-approved EXCEPTION.

> ⚠ **The drift check does not exist yet.** `04-checks/` is empty as of
> 2026-08-24. Until it is written and *proven to fail on a real violation*,
> structural propagation is a manual review, not an enforced guarantee. Saying
> otherwise would be claiming a safety net that is not there. Writing it is the
> Design System Agents lane's work; the `[ID]` anchors and the per-block "tokens
> bound" lines in these files exist to make it cheap to write.

## File → spec source

Every number in every file traces to one of these. Nothing was invented; where a
spec was silent, the gap is named in the file and listed below.

| File | Figma component(s) | Spec source | Adversarially verified? |
|---|---|---|---|
| `buttons.css` | `Button/Primary` 5703:7087 + Secondary 27098:1282, Ghost 5703:7709, Soft 5703:8495, Warning 26781:44955, Destructive 5703:7501, Success 10356:17309 (8 sets, 360 variants) | **SPEC-07b** §3, §3.1, §3.2, §4, §5.1–§5.4, §10 | **No** — SPEC-07b post-dates the verification pass |
| `fields.css` part 1 | `2023/ New-Text field` 14345:224740 · `atom/text_field lables` 10495:19313 · `Genric Fields new 2025` 14465:221801 · `Field / Alerts` 11116:25116 | **SPEC-12** §3, §4, §5, §7 | Yes (one of the 8) |
| `fields.css` part 2 | `field-set-type1` 26938:65997 (7 state variants, no compact axis) | **SPEC-17** §4, §5, §6a–§6e, §7 | **No** — SPEC-17 post-dates the pass |
| `select.css` | `Filter_dropdown` 26360:67677 · `Dropdown/Menu / simple` 14593:268077 · `atom/DDM` 20163:6103 | **SPEC-10** §4, §5c, §6a, §6b | Yes |
| `checkbox-radio.css` | checkbox 5699:8332 · radio 13149:52616 · toggle 26942:4537 · pairing 16025:366400 | **SPEC-11** §3, §4, §5, §6, §7, §8 | Yes — and the verifier FIXED a real defect in it (the toggle-off knob colour) |
| `tags-chips.css` | `badges/other` 14357:226258 · `Status/info` 10313:14623 | **SPEC-08a** §5.1–§5.3, §6.2 | Yes — the tag claim is marked **CONFIRMED**, and the status dot was RESTORED by the verifier |
| `search-field.css` | `Nav Search` 10290:15285 | **SPEC-10** §6d | Yes |
| `table.css` | `Head / Tiltes for tables` 5865:162 · `Head` 26264:29115 · sort 5865:154 · cells 23313:411056 / 411058 / 23374:62819 · link atom 1957:2762 | **SPEC-08b** §3–§7 · **SPEC-08a** §4, §8 | Yes — the verifier found the deprecated header and corrected the 34-vs-30 row height |
| `type-styles.css` | the five named Figma text styles + `Button/label` + `Body/micro` | `01-universal/typography.md` UHR-131/132/133/134 · SPEC-08a §7 · SPEC-08b §5 · SPEC-12 §7 · SPEC-07b §4 | Yes for the five named styles |

Specs live in
`Office_Work/Wound Management/05-Specs/components/`. Read
`README-SPEC-RELIABILITY.md` there before trusting any number — its own headline is
that **a detailed spec is not a verified spec**, and it names exactly which parts
of which spec were re-proven.

## Class naming, and the one decision this folder had to make

Names follow `01-universal/naming.md`: kebab-case (UIG-070), one reusable component
class per element with `__element` for parts and `--modifier` for variants, and
`--` meaning *variant* and never *part* (UHR-101).

**The prefix `cs-` was chosen for every class in this folder.** Reasons, so the
choice can be argued with: `ECOSYSTEM-RULES` §10's own example of a reusable
component class is `.cs-checkbox`; SPEC-11 and SPEC-07b — the two specs whose CSS
this folder leans on most — already use `cs-`; and `naming.md` records that class
prefixes are permitted by the regex and currently unregulated. Alternatives in
live use are `c360-` (SPEC-08b, SPEC-12, SPEC-17, the Wound prototype) and `ds-`
(SPEC-10, `ECOSYSTEM-RULES`). **This is a naming decision, not a design decision,
and it is pending Singh's ratification.** If he prefers `c360-`, it is a
find-and-replace in this folder plus a row in `CHANGELOG.md` — nothing else moves.

Two smaller translations, declared so a reader diffing against the specs is not
confused:

- The specs' state classes `.is-active` / `.is-partial` / `.is-indeterminate` are
  written here as `--active` / `--partial` / `--indeterminate`, because UHR-101
  reserves `--` for exactly that (its own CORRECT example is
  `pagination__btn--active`, "a true modifier (active state)") and UHR-104 keeps
  JS-hook classes style-free.
- `SPEC-08b`'s element selectors (`.c360-table th`) are written here as classes
  (`.cs-table__head-cell`), so that a `<div role="table">` layout can use the same
  reference as a real `<table>`.

## Every bare literal in this folder, in one place

These are values Figma has **no token for**. Each is also marked at its point of
use, with its spec section. Rule 1 of this folder ("no raw values") is about
values that *could* be tokens; these could not be, and each one is a real
design-system gap.

| Value | What it is | Files | Spec |
|---|---|---|---|
| 30px / 24px | button min-height, standard / compact | buttons | SPEC-07b §3, §10.1 |
| 80 / 60 / 30 / 24px | button min-width by icon configuration | buttons | SPEC-07b §3.1 |
| 18px | icon box (button, select chevron, search glyph) | buttons, select, search-field | SPEC-07b §3 · SPEC-10 §4, §6d |
| 1px / 1.5px / 2px | border and ring widths (Figma strokeWeight) | all | per file |
| 30px / 40px | field control height, Compact=Yes / No | fields | SPEC-12 §3 |
| 16px / 22px | field label row, Cell-Structure=No / Yes | fields | SPEC-12 §4 · SPEC-17 §6a |
| 26 / 34 / 62px | Fields-type-1 label row, input row, total | fields | SPEC-17 §4, §6d |
| 20px | inner value line box | fields, table | SPEC-12 §3 · SPEC-08b §6.B |
| 8 × 8 / 8 × 16px, inner 5.162 × 5.6 | required marker | fields, table | SPEC-12 §4 · SPEC-17 §6b |
| 16px box / 12px glyph | help affordance | fields, table, checkbox-radio | SPEC-17 §6c · SPEC-12 §4 |
| 30 × 30px + 10px padding, 16px glyph | field trailing-control slot | fields | SPEC-12 §3 · SPEC-17 §6e |
| 30px (locked) | select trigger and search-field height | select, search-field | SPEC-10 §4, §6d |
| 30px | menu-item min-height | select | SPEC-10 §6b |
| 2px | select trigger → panel gap | select | SPEC-10 §6a |
| 1.2 (unitless) | menu-item line-height | select | SPEC-10 §6b |
| 24 / 14 / 10 × 8 / 10 / 6px, radius 4px | checkbox and radio anatomy | checkbox-radio | SPEC-11 §3.1, §4.1 |
| 30 × 16 / 24 × 12 / 12 / 8 / 2px, travel 14 / 12, radius 9999px | toggle anatomy, both sizes | checkbox-radio | SPEC-11 §5.1 |
| 18px | tag height (fixed, with min-height) | tags-chips | SPEC-08a §5.2 |
| 8px | status dot | tags-chips | SPEC-08a §6.2 |
| 34px | table header min-height (= 1+4+24+4+1) | table | SPEC-08b §3, §3.1 |
| 24px | table header title row | table | SPEC-08b §3 |
| 30px | table data row and control cell — **the row of record** | table | SPEC-08b §6.B |
| 44px | table inline-edit row | table | SPEC-08b §6.B |
| 32px | control-column header width, empty-header min-width | table | SPEC-08b §3.2, §7.1 |
| 10 × 16 / 10 × 7 / 9px / radius 2px | sort affordance | table | SPEC-08b §4.2 |
| 24px | control-cell glyph box | table | SPEC-08b §7.3 |

Two near-literals, both declared at the point of use rather than hidden:

- `letter-spacing: var(--fonts-tracking-x-tracking-0, 0px)` everywhere. The token
  name is **absent from the generated token export** (verified again 2026-08-24 —
  the export contains no token whose name includes "tracking"), while the verified
  specs bind it. Its value is 0, so the fallback renders identically; the missing
  name is a token-export gap, recorded in `typography.md` UHR-134.
- `fields.css` [CS-FLD-05] binds `spacing/xs` (2px) where Figma has a raw 2px gap.
  Same value, and it avoids a literal — but it IS a substitution, and a reviewer
  is invited to reject it.

## Design-system gaps found while building this folder

Report, don't hide. None of these was worked around by inventing a value.

1. **Elevation has no token.** The dropdown panel's shadow is a raw two-layer
   `rgba(9,30,66,0.16)` + `rgba(66,82,110,0.44)` (SPEC-10 §6a). `select.css`
   therefore ships the panel with **no shadow** — it will read flat. Needs an
   elevation token before any floating surface can be built from this folder.
2. **The status accents have no variables.** `Status/info`'s three dot colours are
   Figma *styles* (`Special/Success Accent`, `Special/Warning Accent`,
   `Special/Danger Accent`), not variables, and they are a brighter set than the
   semantic success/warning/danger tokens. `tags-chips.css` leaves the dot on
   `currentColor` rather than typing them or silently remapping them.
3. **No generic coloured status tag exists.** `badges/other` has no hue axis at
   all. Already open as **O-15 / flag F-003**; restated here because it is the
   single most likely reason a feature will be tempted to hand-colour a tag.
4. **The link colour is unbound in Figma.** The link atom carries a raw `#0077FF`
   and `get_variable_defs` returns no colour for it (SPEC-08a §8.1).
   `table.css` binds `text/brand`; `field/value-link` is the other candidate. Figma
   needs to bind one.
5. **The search glyph has no colour token** in the transcription (SPEC-10 §6d
   gives a size only), so `search-field.css` leaves it on `currentColor`.
6. **`--action-focus-ring-offset` is broken in the token export** — it emits the
   literal string `{surface.base}`, an unresolved reference. Nothing in this folder
   binds it. (Verified by direct read of the generated Agency token file,
   2026-08-24.)
7. **Button geometry is untokenised throughout** — height, width floors and the
   18px icon box are all raw (SPEC-07b §10.1). This is the largest single block of
   literals in the folder.
8. **The checkbox's 4px radius is not tokenised**, although
   `border-radius/rounded` is exactly 4px (SPEC-11 §3.1).

## Open questions this folder must NOT answer on its own

Encoded nowhere in these files. If a copied block seems to need one of these
resolved, that is a `RULE-FLAGS.md` row, not a local decision.

| Register ID | Question | Where it bites |
|---|---|---|
| **S4 / O-14** | button height 30 (Agency) vs 32 (CGPortal) — deliberate or drift? | `buttons.css` encodes 30 and says so |
| **O-2** | focus ring: no conforming token exists, so no universal rule can be written | every file except `buttons.css`, which has a real bound focus variant |
| **O-13** | table header casing: Figma is Title case, a ticket artefact uses CAPS — which layer owns *wording*? | `table.css` asserts the TREATMENT (no transform) only |
| **O-15 / F-003** | is there a coloured clinical-status tag anywhere; if not, add one? | `tags-chips.css` |
| **O-17 / S10** | which density vocabulary wins (compact/default/comfortable vs small/medium/large vs Default/Large/Small)? | `fields.css` names its modifier `--compact-no` after the Figma axis rather than pick one |
| **A-3 / H-16** | the 12px body-copy floor vs Figma's 10px `Body/micro` field message | `type-styles.css` [CS-TYP-08] and `fields.css` [CS-FLD-12] both refuse to choose |
| **SPEC-12 Q2** | error field radius: both error variants are `Table Structure=Yes` (radius 0); no rounded error variant exists | `fields.css` [CS-FLD-09] leaves the radius alone |
| **SPEC-12 Q3** | field label colour: `text/secondary` or `text/primary`? | `fields.css` binds what its source node binds and says which |
| **SPEC-07b Q1–Q5, Q9** | Secondary's existence, Destructive's inverted hover, Success's missing hover, Secondary's transparent outline, disabled-label contrast, Success's wrapping label | each named in the relevant `buttons.css` block |
| **SPEC-17 Q1** | Fields-type-1 disabled paints no background although the token exists | `fields.css` [CS-FS-06] reproduces Figma and keeps the fix commented out |
| **SPEC-08b Q1** | sort ascending lights the BOTTOM arrow — authoring slip or intent? | `table.css` [CS-TBL-06] reproduces Figma exactly |
| **SPEC-10 Q1** | the legacy dropdown families' raw alpha fills and their two disagreements | `select.css` leaves both families out |

## Housekeeping notes for whoever maintains this folder

- The registers already reference **`02-components/table-cell-structure.md`**,
  **`02-components/tags-chips.md`** and **`02-components/PATTERN-GAP-LIST.md`**
  (see `OPEN-REGISTER.md` O-13/O-15 and `CONTRADICTIONS.md` S7). Those companion
  **`.md`** docs do not exist yet; this batch delivered the **`.css`** reference
  plus `PATTERNS.md`. Either the register rows get repointed or the docs get
  written — naming the mismatch rather than quietly renaming anything.
- `00-README.md` at folder root lists `02-components/` as "being assembled" and
  says "one doc per atom, per-element comments". This batch delivers one **file**
  per atom with per-block comments; the intent matches, the wording will want a
  line in `CHANGELOG.md` once Singh ratifies.
- Adding a component here is not a solo act: it needs a spec section to cite for
  every number, a `[ID]` on every block, an entry in the file→spec table above,
  and its literals added to the ledger.

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Folder assembled: 8 reference `.css` files + `PATTERNS.md` + this README, from SPEC-07b, SPEC-08a, SPEC-08b, SPEC-10, SPEC-11, SPEC-12, SPEC-17 and `01-universal/` naming + typography rules. Token names verified present in the generated Agency token export by direct read. | Singh's verbatim 2026-08-24 reference-repository ruling — **ratification pending** |
