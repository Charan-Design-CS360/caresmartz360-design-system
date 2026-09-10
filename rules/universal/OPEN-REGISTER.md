<!--
=============================================================================
FILE BRIEF: Open questions blocking specific universal-rule ratifications.
Imported from SPEC-07 §H (the live subset) + the classification pass's
UNCERTAIN list. Each row: what is asked, what it blocks, who answers. When one
is answered, the answer lands in the owning rule file with a version line and
this row is marked closed (never deleted).
CREATOR: Fable-WOUND-MGMT, from the verified SPEC-07 classification | 2026-08-24
LAST MODIFIER: Fable-WOUND-MGMT | 2026-08-24
=============================================================================
-->

# Open register — questions that block universal ratifications

None of these blocks the folder existing. Each blocks ratifying one or more specific rules.
SPEC-07 §H remains the verbatim source for H-items; this register tracks only the ones with
universal impact, in plain language.

## For Singh (highest impact first)

| ID | Question (plain) | Blocks | Source |
|---|---|---|---|
| O-1 | **Which breakpoint set is canonical?** Uncontested: 1200/800/300 design widths, tablet 800–1199. Contested: mobile ceiling 480 vs 799; desktop start 1200 vs 1440 | `responsive.md` full ratification | SPEC-07 H-11 · flag F-001 |
| O-2 | **Focus ring: which token, what width/offset?** A WCAG 2.4.7 obligation with no conforming token anywhere | `accessibility.md` focus rule | SPEC-07 H-15 · flag F-002 |
| O-3 | **Touch targets: accept 24×24 (WCAG AA met) or re-space to fit 44×44?** Measured: 16/17 stepper links and 49/52 option pairs overlap at 44px | `accessibility.md` target rule | SPEC-07 H-21 |
| O-4 | **Are containers flat (radius 0) or do group containers get radius/elevation?** Rows are settled (0); the contested surface is the group container | card/container stance in `css-approach.md` | SPEC-07 H-17 |
| O-5 | **Is the Type 1/2/3 field-row taxonomy global or forms-only?** It comes from your own DS documentation frame `21018:4932` | whether field-row rules generalise | classification UNCERTAIN-1 |
| O-6 | **Is `input-fields-type2` (34px, radius 4) a portal-global control?** It is a DS variant set, but every measurement of it is from the OASIS assembly | `02-components/fields.md` geometry | classification UNCERTAIN-2 |
| O-7 | **Required marker `*`: no size/weight token, and it uses a BORDER token as text fill** where `text/danger` exists (different colour) | field-label rule in `02-components/fields.md` | SPEC-07 H-7 |
| O-8 | **Button radius 4 vs 6, padding-x 12 vs 16, gap 8 vs 4** — each number has two sourced values | `02-components/buttons.md` | SPEC-07 H-8 · CONTRADICTIONS S3 |
| O-9 | **Mandatory group description: required for every group, or only where one exists?** | header pattern (gap-list) | SPEC-07 H-23 |
| O-10 | **Option gap 8 vs 12** — the single most contradicted number in SPEC-07's set | selection-group spacing | SPEC-07 H-5 · S9 |
| O-11 | **Five legacy `X-*` Figma variables** need re-binding or adoption — "choosing a substitute is Singh's call, not a checker's" | side-nav tokens | SPEC-07 H-6 · S11 |
| O-12 | **Stepper error state: amber (your example) or red (as built)?** Note both amber candidates already fail AA | stepper states (gap-list) | SPEC-07 H-26/H-27 |
| O-13 | **Header/table casing:** your Figma header is Title case; Aman's artifact uses literal CAPS. Which layer owns case? | `02-components/table-cell-structure.md` header row | Wound Mgmt Q-B |
| O-14 | **Per-portal control sizes:** button 30 vs 32, header 52 vs 56, footer 46 vs 54 — deliberate portal differences or drift? | S4/S5/S6 rows | folder sweep 2026-08-24 |

## For Figma AI (routed via Opus, per lane rules)

| ID | Question | Blocks | Source |
|---|---|---|---|
| ~~O-15~~ | ~~Generic coloured clinical-status tag — exists anywhere? If not, add?~~ **✅ ANSWERED 2026-08-25: YES — `Status`, node `26535:26277` (DS Agency V2.0), the explicit catch-all ("basically here we will conver all kind of statsues"). The question was right; my "nothing supplies it" answer was FALSE — I enumerated four hue'd sets on one page and read absence into the gap.** Residual gap is narrower and re-filed as **F-012**: the set ships 5 hues (green/red/yellow/neutral/purple) and clinical `Healing` is **blue** — but `--tags-blue`/`--tags-blue-bg` exist in **all five colour modes** and `build.py:498` already binds `.chip-blue`, so it is a **missing variant, not a missing colour.** | `02-components/tags-chips.md` clinical hues — **now unblocked for the 5 shipped hues** | flag ~~F-003~~ → **F-012** · Wound Mgmt Q-A (answered in place) |
| O-16 | Spacing grid 4px vs 8px; `radius-md` 4 vs 8 across origin/main docs | spacing/radius sections | CONTRADICTIONS C8 |
| O-17 | Density mode vocabulary (three variants live) | density section | flag F-004 · S10 |
| O-18 | Group-header background: three candidates on record, none confirmed (the settling `get_design_context` call timed out) | header pattern | SPEC-07 H-4 |

## Already answered — recorded so nobody re-asks

| ID | Answer | Where recorded |
|---|---|---|
| A-1 | Input border token = `field/border-hard` #94a3b8 ("follow exactly as per figma", Singh 2026-08-17) | SPEC-07 H-3 |
| A-2 | Helper-text colour binds nearest existing token → `field/value-placeholder` #64748B (Singh 2026-08-17) | SPEC-07 H-2 |
| A-3 | 12px body-copy floor with exactly one exception (`.section__attribution`) (Singh 2026-08-17) | SPEC-07 H-16 · EX-002 |
| A-4 | ">3 options ⇒ Type 2 stacked" — answered by Figma's own pattern frame, no Singh ruling needed | SPEC-07 H-22 |
| A-5 | Stepper marker = 20px (measured on the authored DS component; the 12px source was an AI-authored comment) | SPEC-07 conflict 17 |

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Initial import: 14 Singh items, 4 Figma AI items, 5 answered records | Approved assembly plan, step 2 |
