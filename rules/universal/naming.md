<!--
=============================================================================
FILE BRIEF: Class, custom-property, and Figma frame NAMING — the universal
rules for what things are called. Assembled from SPEC-07 §G.5/§B.9/§C.2,
ECOSYSTEM-RULES §10, and MASTER-AI-INSTRUCTIONS §3 (this file is slated to
SUPERSEDE the naming lines in those last two ONCE SINGH RATIFIES IT — until
then they stand, and they remain cited as sources). Contested
items carry their decision-sheet / register IDs and are never encoded as
settled. Live-code evidence was re-verified against the actual files on
2026-08-24 — every file:line below was opened, not remembered.
CREATOR: Fable-WOUND-MGMT | 2026-08-24
STATUS: ASSEMBLED — Singh ratification pending
=============================================================================
-->

# Naming — classes, custom properties, Figma frames

Every UI element gets **one predictable name**, written the same way everywhere: lowercase
words joined by hyphens (kebab-case), with `__` marking a part *inside* a component and
`--` marking a *variant of* a component — never a part. Custom properties are the Figma
variable name with slashes turned into hyphens, nothing invented, no portal prefixes.
When names are predictable, a designer can find a component in code without reading the
code, a script can police the codebase, and five teams stop inventing five names for the
same breadcrumb (see the cautionary note at the end — that is not hypothetical).

Once Singh ratifies it, this file supersedes the naming lines of `ECOSYSTEM-RULES.md`
§10 (L332–346) and `MASTER-AI-INSTRUCTIONS.md` §3 (L71–76); until that GO-AHEAD is
logged, those lines stand and remain cited as sources below.

---

## The rules

### UIG-069 — component classes follow the BEM-ish kebab pattern

- **Plain language:** a class name is lowercase words joined by hyphens, optionally
  followed by one `__part` and/or one `--variant` — e.g. `.field-row`,
  `.field-row__label`, `.field-row--disabled`.
- **Assertion:** component classes match
  `/^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$/`
  (regex verbatim from SPEC-07 §G.5, UIG-069 row).
- **How a script tests it:** collect every class token from `class="…"` attributes and
  every class selector in authored stylesheets; skip utility classes in Tailwind portals
  (see per-portal notes) and third-party/framework classes; test each remaining component
  class against the regex; report every non-match with file and line.
- **Severity:** INFO → BLOCK pending decision-sheet A
  (`00-DECISION-SHEET-PENDING.md` §A: re-rate to BLOCK for all NEW work).
- **Source:** SPEC-07 §G.5 L880 (`[J98]` C5 "NAMING CONVENTION").

### UIG-070 — kebab-case only; no camelCase, no snake_case

- **Plain language:** never `pageHeader`, never `page_header` — always `page-header`.
  Applies to component class names and frame names alike.
- **Assertion:** no camelCase and no snake_case in component class names.
- **How a script tests it:** flag any component class containing an uppercase letter
  `[A-Z]`, or a single underscore that is not part of the `__` element separator;
  report with file and line.
- **Severity:** INFO → BLOCK pending decision-sheet A
  (`00-DECISION-SHEET-PENDING.md` §A).
- **Source:** SPEC-07 §G.5 L881 (`[FG]` Naming Conventions).

### UHR-101 — the composed rule: one component class per element; `--` is reserved for modifiers — *pending ratification (decision-sheet B)*

- **Plain language:** every UI element carries exactly **one** reusable kebab-case
  component class (e.g. `.cs-checkbox`); parts inside it extend with `__element`,
  variants with `--modifier` — and `--` means *variant*, never *part*. A
  `--container` or `--dropdown` suffix is a part, so it is a misuse even though the
  regex accepts it.
- **Assertion:** (a) each element has exactly one component base class (utility classes
  in Tailwind portals and style-free JS hooks per UHR-104 do not count); (b) any
  `base--suffix` class denotes a state/variant of `base`, and `base` also exists and is
  used on its own; a `base--suffix` whose base class never appears alone is `--` used as
  an element separator and fails.
- **How a script tests it:** (a) per element, count classes that match the UIG-069
  component pattern and are defined in authored CSS — must be 1 (+ optional `--modifier`
  classes of that same base); (b) for every class containing `--`, check the stylesheet
  and markup for standalone use of its base segment; report orphaned bases with file and
  line. Semantics ("is this suffix truly a variant?") stays a human review item — the
  script catches the orphaned-base signature, the reviewer catches the rest.
- **Severity:** pending ratification — decision-sheet B proposes it as a normative rule;
  until Singh's GO it is report-only.
- **Source:** composed from ECOSYSTEM-RULES §10 L336 ("One reusable component class per
  UI element (e.g., `.cs-checkbox`, `.ds-filter`, `.shift`)") + SPEC-07 UIG-069/070 +
  `00-DECISION-SHEET-PENDING.md` §B.
- **Evidence that the `--` reservation matters** (verified in live code 2026-08-24):
  the Agency portal ships `--` as an *element* separator — it passes the UIG-069 regex
  while inverting its meaning:
  - `.pagination--container` — `Agency/AgencyWebApp/src/styles.scss:495` and `:2112`
  - `.page-size--dropdown` —
    `Agency/AgencyWebApp/src/app/shared-components/table-paginator/table-paginator.component.html:13`,
    `.../table-paginator.component.scss:96`,
    `.../paychex-integration/paychex/paychex.component.scss:371`
  - Same pattern throughout `Agency/AgencyWebApp/src/app/app.component.scss`:
    `.cs360--container` (:22), `.cs360-content--container` (:203),
    `.breadcrumb--container` (:283), `.modal-flyout--container` (:458)
  - By contrast CGPortal's paginator is compliant: `.pagination-btn` —
    `CGPortal/src/app/shared/components/cs-pagination/cs-pagination.component.scss:5`.

**WRONG vs CORRECT (UIG-069/070 + UHR-101):**

```html
<!-- WRONG: "--container" is a PART of the pagination component, not a variant.
     "--" is reserved for modifiers — this passes the regex but inverts its meaning.
     (Real shipped example: Agency/AgencyWebApp/src/styles.scss:495) -->
<div class="pagination--container">
  <select class="pageSizeDropdown"></select>   <!-- WRONG: camelCase (UIG-070) -->
</div>

<!-- CORRECT: one component base class; parts use "__"; variants use "--" -->
<div class="pagination">                        <!-- component base: the paginator -->
  <select class="pagination__page-size"></select> <!-- element: page-size control INSIDE pagination -->
  <button class="pagination__btn pagination__btn--active"></button>
                                                <!-- element + a true modifier (active state) -->
</div>
```

### UHR-102 — Figma frame naming: kebab-case + the named frame conventions

- **Plain language:** frames in Figma are named in kebab-case, using the fixed names
  Singh's design-system documentation already assigns to the core patterns.
- **Assertion:** frame names follow SPEC-07 §B.9's Naming conventions, quoted verbatim
  (`[FG]`, SPEC-07 L456):
  > "• Field row frame: "field-base_bed" or "field-row" • Selection group: "field-row"
  > with vertical inner layout • Signature/upload: "clinician-sig" or context-specific
  > name • Structure wrapper: "field-base-structure" • Use kebab-case for all frame names"
- **How a script tests it:** lint frame names in the Variables/metadata export for
  uppercase letters, spaces, and underscores; check pattern frames carry the reserved
  names above; report deviations.
- **Severity:** INFO (proposed — matches SPEC-07's INFO rating of the same `[FG]` Naming
  Conventions source in UIG-070; Singh ratification pending).
- **Source:** SPEC-07 §B.9 L454–456, verbatim.
- **⚠️ Internal tension in the source, reported not adjudicated:** the same verbatim
  bullet list both reserves the name `field-base_bed` (an underscore) and demands
  "kebab-case for all frame names". A checker must whitelist the reserved legacy names
  exactly as written and never generalise the underscore. Flagged for the register —
  see the report accompanying this file's assembly; not yet a CONTRADICTIONS row.

### UHR-103 — CSS custom property naming: Figma `group/name` → `--group-name`, prefix-free

- **Plain language:** a token's CSS name is its Figma name with `/` turned into `-` —
  Figma `field/border-default` becomes `var(--field-border-default)` — and never carries
  a portal prefix like `--agency-`.
- **Assertion:** every `--token` defined in `:root` (or `[data-theme]`) maps, by the
  slash→hyphen transform, to a real variable name in the owner-downloaded export
  (`/Users/netsmartz/Documents/Design-System/Variables`); no legacy portal prefixes.
  The source states it as (SPEC-07 §C.2 rule 4, L498–501, verbatim): Agency
  `group/name` → `--group-name` (`field/border-default` → `--field-border-default`;
  `spacing/lg` → `--spacing-lg`; `border-radius/rounded` → `--border-radius-rounded`) —
  used in CSS as `var(--field-border-default)` etc.
- **How a script tests it:** for each defined `--token`, re-slash the name at the group
  boundary and look it up in the Variables export — no match = invented token, fail
  (SPEC-07 §C.2 rules 2+4); additionally reject any `--agency-*` (or other
  portal-prefixed) name per the C3 ruling.
- **Severity:** BLOCK — an unmapped name is an invented token, which SPEC-07 already
  rates BLOCK (UIG-005 row, §G.1 L797, "Every `--token` in `:root` maps to a real
  Agency name"; §C.2 rule 2. UIG-006, L798, is the adjacent namespace rule — also BLOCK).
- **Source:** SPEC-07 §C.2 rule 4 (L498–501) · CONTRADICTIONS **C3** (ruled: prefix-free;
  the `--agency-*` file is a named legacy exception being purged in the repo lane).

**WRONG vs CORRECT (UHR-103):**

```css
:root {
  /* WRONG: portal prefix (C3 ruling) + name that exists in no Figma export */
  --agency-input-border: var(--field-border-hard);

  /* CORRECT: Figma `field/border-hard` → hyphenated, prefix-free.
     (Token choice for input borders itself: Singh ruling A-1, OPEN-REGISTER.) */
  --field-border-hard: /* value comes from the Variables export, never typed here */;
}

.field-row__input {
  /* the input element of a field row; binds its border to the ruled token (A-1);
     state variants (focus/error) bind their own tokens — see 02-components/fields.md */
  border-color: var(--field-border-hard);
}
```

### UIG-006 — token namespace whitelist (mechanism universal, list per portal)

- **Plain language:** the first word of a custom property must come from the portal's
  approved namespace list — you cannot invent a new family of tokens.
- **Assertion:** reject any `--` name whose first segment is not in the portal's token
  namespace whitelist. The Agency list is feature-set — see SPEC-07 UIG-006 (§G.1 L798)
  and §C.3 for the 20 approved first segments and the full 263-name namespace. The
  UNIVERSAL rule is the mechanism: *a whitelist derived from the portal's Variables
  export exists, and everything outside it fails.*
- **How a script tests it:** split each `--token` on its first `-` group boundary; look
  the first segment up in the portal's whitelist (generated from the Variables export,
  never hand-maintained); report non-members.
- **Severity:** BLOCK (as rated in SPEC-07).
- **Source:** SPEC-07 §G.1 L798 (UIG-006) · §C.3.

### UHR-104 — behavioural/JS hook classes are separate and style-free

- **Plain language:** a class that JavaScript grabs onto is never the same class that
  carries styling — so a designer can rename or restyle without breaking behaviour, and
  a developer can rewire behaviour without touching visuals.
- **Assertion:** no class is both (a) referenced from TS/JS (querySelector, classList,
  Angular host bindings) and (b) a styled selector in authored CSS. Hook classes carry
  zero style declarations.
- **How a script tests it:** build set A = class names referenced in `.ts`/`.js` string
  literals used for DOM selection/toggling; set B = class selectors in authored
  stylesheets; report the intersection with both locations.
- **Severity:** WARN (proposed — ratification pending; ECOSYSTEM-RULES §10 states the
  rule without a severity scale).
- **Source:** ECOSYSTEM-RULES §10 L336 ("Keep behavioural/JS hook classes separate and
  style-free").
- **Note:** no hook-prefix convention (such as `js-*`) is on record anywhere in the
  sources. Do not invent one; if a prefix is wanted, it goes to Singh as a decision item.

---

## Cautionary note — five names for one component

Observed in the 2026-08-24 sweep, all verified at file+line: the SAME breadcrumb pattern
currently ships under five different class names across the codebase —

| Name | Where (verified) |
|---|---|
| `.breadcrumb--container` | `Agency/AgencyWebApp/src/app/app.component.html:221` / `.scss:283` |
| `.breadcrumbs` | `Agency/AgencyWebApp/src/app/shared-components/client-documents/client-documents.component.html:134` (also caregiver-documents:229, cs-move-folder:18) |
| `.topbar-breadcrumb` | `aegis/command-center/mockups/billing-trace.html:142` / `:900` |
| `.crumb` | `LegacyAssessment/04-Prototypes/LEGACY-ASSESSMENT-AI-FLOW-v1.html:156` / `:674` |
| `.breadcrumb` | `Agency/schedule-calendar-figma-aligned.html:1685` |

This is the cost of having no ratified naming rule: five teams, five names, zero reuse,
and any style fix has to be made five times. It is exactly what UHR-101 exists to stop.
Which single name wins is a Singh decision (component doc lane), not a checker's.

---

## Per-portal notes

- **Tailwind portals (CGPortal, per the C4 ruling — CSS methodology is portal-scoped,
  never blanket):** the naming rules govern *component* classes only. Tailwind utility
  classes (`flex`, `gap-sp-2`, `h-[32px]`, `text-th-sm`, …) are a different layer and are
  exempt from the UIG-069 regex; the component classes that exist alongside them are not
  (compliant example: `.pagination-btn`,
  `CGPortal/src/app/shared/components/cs-pagination/cs-pagination.component.scss:5`).
- **Agency portal (SCSS):** every authored class is a component class and all rules
  apply. The `--`-as-element pattern listed under UHR-101 is Agency's known debt; fixing
  it is repo-lane work (Opus), not a checker's call.
- **Prefixes on classes:** ECOSYSTEM-RULES §10's own examples carry team prefixes
  (`.cs-checkbox`, `.ds-filter`). The C3 prefix-free ruling applies to **custom
  properties**, not classes — class prefixes like `cs-` are permitted by the regex and
  currently unregulated.

---

## Related registers

- `01-universal/CONTRADICTIONS.md` — **C3** (prefix-free custom properties, ruled),
  **C4** (CSS methodology is portal-scoped, ruled)
- `01-universal/OPEN-REGISTER.md` — **A-1** (input border token, cited in the UHR-103
  example)
- `00-DECISION-SHEET-PENDING.md` — **item A** (UIG-069/070 severity re-rate),
  **item B** (UHR-101 composed rule ratification)
- `EXCEPTIONS.md` — no naming exceptions on record (EX-001..003 concern other rules)
- `RULE-FLAGS.md` — file a flag if a rule here cannot be satisfied; never silently deviate

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Assembled from SPEC-07 §G.5 (UIG-069/070), §B.9 L454–456, §C.2 rule 4, §G.1 UIG-006; ECOSYSTEM-RULES §10 L332–346; MASTER-AI-INSTRUCTIONS §3; 00-DECISION-SHEET-PENDING items A+B; live-code sweep verified at file+line | approved plan step 2 |
