<!--
=============================================================================
FILE BRIEF: THE universal statement of how CSS is implemented in every
CareSmartz360 portal, prototype and deliverable. Token-binding core (from
SPEC-07 §G.1, original UIG ids kept), layer discipline (epic C360-3526),
resolution/isolation guards promoted from the Wound Management verify suite
(new UHR ids), delivery form, the settled half of the container stance, and
the per-portal methodology table (EX-001 scope). This file SUPERSEDES the CSS
bullets of ECOSYSTEM-RULES §10 (L332-336) and MASTER-AI-INSTRUCTIONS §3
(L73-74) — both remain cited as sources. Contested values are NOT encoded
here; they live in CONTRADICTIONS.md / OPEN-REGISTER.md by ID.
CREATOR: Fable-WOUND-MGMT | 2026-08-24
STATUS: ASSEMBLED — Singh ratification pending
=============================================================================
-->

# CSS approach — how CSS is implemented everywhere

**Plain language:** every colour, size, font and space in our CSS comes from a named design
token, never typed in as a raw number. The token names come from Singh's Figma variables
export; each portal has its own semantic token layer and its own styling methodology, but the
token discipline itself never changes. A checker can verify all of this mechanically — every
rule below says exactly how. Where a value is still contested, the rule tests only what is
settled and points at the open register instead of guessing.

**Supersession:** this file is now the normative home for the CSS standing rules previously
stated in `Office_Work/ECOSYSTEM-RULES.md` §10 ("CSS & CODE STANDING RULES", L332-336: no
`!important`, no hardcoded values, one reusable class per element) and
`Office_Work/MASTER-AI-INSTRUCTIONS.md` §3 (L73-74: 4-layer system; "no `!important`, no
hardcoded values — tokens from Figma variables only"). Those lines remain true and are cited
below as sources; when detail differs, this file governs.

**Naming convention (normative, all rules below):** Figma token `group/name` is written in
CSS as `var(--group-name)` — e.g. Figma `field/border-default` → `var(--field-border-default)`,
Figma `action/primary/bg` → `var(--action-primary-bg)`, Figma `spacing/lg` →
`var(--spacing-lg)`. Source: SPEC-07 §C.2 rule 4 (the convention already used by SPEC-01..06
and the pinned `04-Design-System/tokens.css`). Raw hex values appear in this file only inside
quoted evidence — never as a value to use.

> **Feature-parameter warning (applies to the whole file):** SPEC-07 §G.2's concrete numbers
> (row heights, min-widths, paddings…) are **feature-set parameters** of the OASIS assembly,
> not universal constants. This file states MECHANISMS; where a number is needed it is marked
> "feature-set, see SPEC-07 §G.2".

---

## 1. Token-binding core (SPEC-07 §G.1 — original UIG ids kept)

### UIG-001 — no raw colour outside `:root`
- **Plain language:** a colour typed as a hex code or rgb() anywhere except the token block is a defect.
- **Assertion:** no raw colour literal exists outside `:root` (or `[data-theme]`) declaration blocks.
- **How a script tests it:** strip `:root{…}` / `[data-theme]{…}` blocks from every `<style>`; then `/#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i` must find **0** matches.
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.1 UIG-001 (L793); `[J98]` C5 "zero raw rgb() values outside :root"; ECOSYSTEM-RULES §10 L335 (superseded here).

### UIG-002 — no raw length outside `:root`
- **Plain language:** spacing, radius and type sizes are tokens, never typed-in pixel numbers.
- **Assertion:** no raw length literal outside `:root` for spacing / radius / font-size / line-height properties.
- **How a script tests it:** in the same stripped CSS, for `padding|margin|gap|row-gap|column-gap|border-radius|font-size|line-height|border-width` declarations, the value must match `/^var\(--[a-z0-9-]+\)|calc\(|0$|auto|inherit|100%|min\(|max\(|clamp\(/`.
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.1 UIG-002 (L794); `[J98]` C5 "zero raw px outside :root".

### UIG-003 — no raw `font-weight`
- **Plain language:** write the weight's token name, not the number 500.
- **Assertion:** no raw `font-weight` numeral outside `:root`.
- **How a script tests it:** `font-weight:\s*(\d{3})` in stripped CSS → 0 matches.
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.1 UIG-003 (L795); `[J98]` C5 example — `font-weight: var(--font-weight-medium)` NOT `500`.

**WRONG vs CORRECT (covers UIG-001/002/003):**

```css
/* ── WRONG — quoted evidence of the failure pattern, all three rules fail ── */
.f-input {                      /* text input control                        */
  border: 1px solid #94a3b8;    /* raw hex outside :root  → UIG-001 BLOCK    */
  padding: 12px;                /* raw px                 → UIG-002 BLOCK    */
  font-weight: 500;             /* raw weight numeral     → UIG-003 BLOCK    */
}
```

```css
/* ── CORRECT ── */
.f-input {                                          /* text input control; default state    */
  /* border colour binds Figma field/border-default */
  border: 1px solid var(--field-border-default);
  /* inner padding binds Figma spacing/lg (feature-set value, see SPEC-07 §G.2) */
  padding: var(--spacing-lg);
  /* weight binds Figma font-weight/body-strong */
  font-weight: var(--font-weight-body-strong);
}
```

### UIG-004 — `font-family` via token
- **Plain language:** the typeface is a token too.
- **Assertion:** no raw `font-family` outside `:root`.
- **How a script tests it:** every `font-family:` value outside `:root` must be `var(--font-family-primary)` (Figma `font-family/primary`).
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.1 UIG-004 (L796); `[FG]` `font-family/primary` binding.

### UIG-005 — every token maps to the portal's export
- **Plain language:** a `--token` name we made up, however plausible, is a defect — names are checked against Singh's Figma variables export.
- **Assertion:** every `--token` defined in `:root` maps to a real token name in the portal's variables export.
- **How a script tests it:** parse each `--x-y-z` back to `x/y-z` candidates; each must appear in the export's name list (for Agency: the 263-name list, SPEC-07 §C.3). Report the unmatched set.
- **Severity:** BLOCK
- **Authority note:** names validate against the **variables export, never the pinned commit** — the pinned `fc7de14` is missing 12 exported names including `field/border-hard`, the very token the live Figma binds to the input border. See **CONTRADICTIONS S2** (RULED) and SPEC-07 §C.4 (TC-1). The export lives in the owner's export folder, located via `DS_VARIABLE_SOURCE_DIR` (Singh's recorded canonical location, 2026-08-03).
- **Source:** SPEC-07 §G.1 UIG-005 (L797); SPEC-07 §C.2 rule 2; §C.4 recommendation (L570-572).

### UIG-006 — namespace whitelist
- **Plain language:** new token families cannot be invented at the keyboard; only known first segments exist.
- **Assertion:** no invented token namespace.
- **How a script tests it:** reject any `--` name whose first segment is not one of: `action, border, border-radius, chart, elevation, field, font-family, font-size, font-weight, icon, letter-spacing, line-height, popover, sidebar, spacing, status, surface, tags, text, tooltip`.
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.1 UIG-006 (L798), from §C.3 (which also lists notably-absent families a checker must reject: `card/*`, `stepper/*`, `table/*`, `nav/*`…).

### UIG-007 — no primitives-only names in a semantic layer
- **Plain language:** the raw palette layer is upstream plumbing; page CSS never names it.
- **Assertion:** no semantic layer binds a Primitives-only name.
- **How a script tests it:** reject `--colors-*`, `--radius-radius-*`, `--fonts-*`, `--spacing-space-*`, `--shadow-color-*`, `--z-index-*`, `--duration-*`.
- **Severity:** WARN
- **Source:** SPEC-07 §G.1 UIG-007 (L799); §C.3 "exist **only in Primitives** — semantic layers must not bind to them directly" (L553-554). See also UHR-111 below for the layer rule itself.

### UIG-008 — no `!important`, no visual inline styles
- **Plain language:** never force a style with `!important` and never paint an element through its `style=""` attribute — both break theming and reuse.
- **Assertion:** zero `!important`; no inline `style=` attribute carries a colour/spacing/font value.
- **How a script tests it:** `/!important/` → 0 matches; every `style="…"` attribute must contain no colour/spacing/font properties.
- **Severity:** WARN (SPEC-07's checker tier). The invariant itself is RULED absolute — **CONTRADICTIONS C9**: "never (SPEC-07 UIG-008 + ECOSYSTEM-RULES §10 agree)". The WARN tier is an escalation level, not a tolerance.
- **Source:** SPEC-07 §G.1 UIG-008 (L800); ECOSYSTEM-RULES §10 L334 (superseded here); MASTER-AI-INSTRUCTIONS §3 L74 (superseded here); CONTRADICTIONS C9.

**WRONG vs CORRECT:**

```html
<!-- WRONG — visual value smuggled through the attribute; fails UIG-008 -->
<div class="wound-note" style="margin-top:8px;color:red">…</div>
```

```css
/* CORRECT — the same intent as a styled class                              */
.wound-note {                        /* clinician note block; default state */
  margin-top: var(--spacing-md);     /* binds Figma spacing/md              */
  color: var(--text-danger);         /* binds Figma text/danger             */
}
```

### UIG-009 — bind the DESIGNATED token, not merely *a* token
- **Plain language:** using any real token is not enough — each property has a specific token assigned to it in the governing component spec.
- **Assertion:** each property binds to **its** designated token per the governing component anatomy (for OASIS: SPEC-07 §B). SPEC-07 §C.2 rule 3, verbatim: *"A property must bind to the token named in Section B for that property — not merely to *some* token. Binding a row border to `--field-border-hard` passes rule 1 and 2 but fails rule 3."*
- **How a script tests it:** table-driven — `getComputedStyle` the element, resolve the `var()` chain, compare the resolved token name against the component spec's designated token per property.
- **Severity:** BLOCK
- **Source:** SPEC-07 §G.1 UIG-009 (L801); §C.2 rule 3 (L496-497).

**WRONG vs CORRECT:**

```css
/* WRONG — real token, wrong slot: an input border painted with a text token */
.f-input {                                 /* text input control             */
  border-color: var(--text-primary);       /* passes UIG-001/005, fails 009  */
}
```

```css
/* CORRECT — the token the component spec designates for this property       */
.f-input {                                 /* text input control; default    */
  /* input border binds Figma field/border-hard (designated per SPEC-07 §B.1,
     Singh ruling recorded as OPEN-REGISTER A-1)                              */
  border-color: var(--field-border-hard);
}
```

### UIG-068 — a repeated visual set becomes a shared class
- **Plain language:** if the same look appears twice, it gets one named class — never two copies of the styles.
- **Assertion:** no visual property set is repeated ≥2× via inline styles (or duplicated rules) instead of a shared class. Singh's sourced line, `[J98]` C5 (quoted in SPEC-07 §C.2 rule 5): *"If a pattern appears more than once, it MUST be a shared CSS class — not duplicated inline styles."*
- **How a script tests it:** detect any visual property set repeated ≥2× outside a class rule.
- **Severity:** WARN
- **Source:** SPEC-07 §G.5 UIG-068 (L879), from `[J98]` C5 GOAL 4; ECOSYSTEM-RULES §10 L336 "one reusable component class per UI element" (superseded here).

**WRONG vs CORRECT:**

```css
/* WRONG — the same badge look pasted into two selectors                     */
.status-a { padding: var(--spacing-sm); background: var(--tags-blue-bg); }
.status-b { padding: var(--spacing-sm); background: var(--tags-blue-bg); }
```

```css
/* CORRECT — one shared class carries the pattern                            */
.tag {                                /* status badge, shared base; default  */
  padding: var(--spacing-sm);         /* binds Figma spacing/sm              */
  background: var(--tags-blue-bg);    /* binds Figma tags/blue-bg            */
}
```

---

## 2. Layer discipline

### UHR-111 — components consume semantics only, never primitives
- **Plain language:** the four layers are Primitives → Semantics → Components → Patterns; anything you build talks to its own portal's semantic layer, and only the semantic layer talks to primitives.
- **Assertion:** component/pattern/template CSS never references a primitive token or a raw value directly; it binds portal semantic tokens, which alias primitives. Epic C360-3526 Rule 1 (verbatim, per `00-AI-MANDATORY-RULES.md`): *"Never hardcode hex/px/font values — Always reference semantic variables which alias primitives."* Design-system repo, `origin/main:shared/primitives/README.md` L10-12: *"Portal Semantics may alias these values. Portal Components, Patterns, and Templates must consume their own portal Semantics rather than referencing raw values directly."*
- **How a script tests it:** reject any `var(--p-*)` (or other primitive-namespace reference, per UIG-007's list) in component CSS — as implemented in `Office_Work/Wound Management/04-Prototype/verify-build.py` §5b3 ("no --p-* primitive consumed directly … components must use the semantic layer").
- **Severity:** BLOCK
- **Source:** epic C360-3526 Rule 1 (transcribed in `00-AI-MANDATORY-RULES.md`); `caresmartz360-design-system` `origin/main:shared/primitives/README.md` L10-12; verify-build.py §5b3 (L222-229); MASTER-AI-INSTRUCTIONS §3 L73 (4-layer statement, superseded here).

---

## 3. Resolution and isolation guards (promoted from the Wound Management verify suite)

### UHR-114 — every `var()` reference must resolve
- **Plain language:** a token you reference but never define does not error — the browser just quietly drops the style, and the control ships unstyled.
- **Assertion:** every `var(--x)` referenced in a document or stylesheet is defined in that document's token block (or an explicitly loaded token file). From `verify-tokens-resolve.py` (L5-7), verbatim: *"the 2026-08-19 build-v4.py collision produced three dangling var() references and an unstyled control. Nothing errored — CSS silently drops an unresolved custom property. This is the tripwire for that whole failure class."*
- **How a script tests it:** collect every `var(--name)` used; every name must appear as a `--name:` declaration; exit non-zero on any dangling reference — as implemented in `Office_Work/Wound Management/04-Prototype/verify-tokens-resolve.py`.
- **Severity:** BLOCK
- **Source:** verify-tokens-resolve.py (docstring L2-10; failure message L62 "used but never declared -> renders unstyled, silently").

**WRONG vs CORRECT:**

```css
/* WRONG — --surface-card is never declared anywhere; the browser drops the
   declaration silently and the panel renders with no background at all      */
.panel { background: var(--surface-card); }
```

```css
/* CORRECT — reference a token the :root block actually declares             */
.panel {                              /* raised content panel; default state */
  background: var(--surface-base);    /* binds Figma surface/base            */
}
```

### UHR-115 — no cross-portal token names
- **Plain language:** Agency CSS never names a Caregiver token, and vice versa — each portal's semantic layer is a separate sealed vocabulary.
- **Assertion:** a document declared for one portal contains no token name that exists only in another portal's semantic layer. Epic C360-3526 Rule 4 (verbatim, per `00-AI-MANDATORY-RULES.md`): *"Never mix portal semantic data — Each portal has its own semantic layer — Agency data does not belong in Caregiver files and vice versa."*
- **How a script tests it:** maintain a per-portal list of tokens exclusive to each other portal; scan the document for any of them; exit non-zero on a leak — as implemented in `verify-tokens-resolve.py` (docstring L3: "no other portal's token may appear") and `verify-build.py` §6 ("Portal isolation (C360-3526 Rule 4)"). Caution from the implementation (L18-20): a shared family name (both portals ship `--sidebar-*`) is NOT a discriminator — only genuinely exclusive names are.
- **Severity:** BLOCK
- **Source:** epic C360-3526 Rule 4 (transcribed in `00-AI-MANDATORY-RULES.md`); verify-tokens-resolve.py L3, L10, L15-20; verify-build.py §6 (L254-257); `03-portals/caregiver/STATUS.md` L15 (Caregiver is "totally separate entity from Agency — never mix").

### UHR-112 — `--surface-overlay` is a BACKDROP, never a card/menu surface
- **Plain language:** the overlay token is the dark dimming veil behind a modal — using it as the modal's own background paints the modal near-black.
- **Assertion:** no raised surface (modal, menu, drawer, card, popover panel) uses `var(--surface-overlay)` (Figma `surface/overlay`) as its background; raised surfaces use `var(--surface-base)` (Figma `surface/base`). From `verify-build.py` §5c (L245-247), verbatim: *"surface/overlay resolves to #020617 in ALL FIVE Agency modes. Using it as a modal/menu/drawer background made every one of them near-black in Light mode, from v1 onward, unseen because only 1 of 17 captured states was ever reviewed. Raised surfaces use surface/base."*
- **How a script tests it:** `re.findall(r"background:var\(--surface-overlay\)")` over each document → 0 matches; failure message: "must be --surface-base; overlay is the scrim colour".
- **Severity:** BLOCK
- **Source:** verify-build.py §5c (L244-252).

**WRONG vs CORRECT:**

```css
/* WRONG — the five-near-black-modals bug, verbatim failure class of §5c     */
.modal { background: var(--surface-overlay); }
```

```css
/* CORRECT — surface roles used as designed                                  */
.modal-backdrop {                       /* dimming veil BEHIND the dialog    */
  background: var(--surface-overlay);   /* binds Figma surface/overlay —
                                           this is its only legitimate role  */
}
.modal {                                /* the dialog itself; raised surface */
  background: var(--surface-base);      /* binds Figma surface/base          */
}
```

### UHR-113 — every class used in markup has a rule in the stylesheet
- **Plain language:** a class name in the HTML with no matching CSS rule means a whole style block silently never reached the page.
- **Assertion:** every authored class referenced in `class="…"` has at least one rule in the document's stylesheet; JS-only hook/state classes are permitted via an explicit allow-list. Why this exists, from `verify-build.py` §5b4 (L189-197), verbatim: *"ADDED 2026-08-21 after a SILENT failure. A `CSS += \"\"\"…\"\"\"` block was appended after `if __name__ == \"__main__\": main()`, so it executed AFTER the HTML had already been written. The build printed success, exit code 0, every other check stayed green — and the body-diagram placeholder shipped completely unstyled. It was only caught by LOOKING at a screenshot."* An orphan class is the observable symptom of the whole "silent-success-on-stale-input" family.
- **How a script tests it:** parse defined classes from `<style>` (comments stripped so a class named in a comment does not count as defined); parse used classes from `class` attributes; `used − defined − ALLOW` must be empty.
- **Severity:** BLOCK
- **Source:** verify-build.py §5b4 (L188-220).

**WRONG vs CORRECT:**

```html
<!-- WRONG — .body-diagram has no rule anywhere; it ships unstyled, exit 0 -->
<div class="body-diagram">…</div>
```

```html
<!-- CORRECT — the class used in markup… -->
<div class="body-diagram">…</div>
```
```css
/* …has a rule in the same document's stylesheet                             */
.body-diagram {                       /* anatomical placeholder figure       */
  background: var(--surface-secondary);  /* binds Figma surface/secondary    */
}
```

---

## 4. Delivery form — prototypes inline the token block

### UIG-075 — self-contained output, tokens inlined into `:root`
- **Plain language:** a prototype is one file that works with no internet — the token definitions are pasted into its own `:root`, not linked from elsewhere.
- **Assertion:** prototype/deliverable HTML contains no `<link rel="stylesheet">` and no CDN script; the portal token block is inlined into the file's `:root`. This is the recorded resolution of **CONTRADICTIONS C5** (SPEC-07 §C.2 conflict note → H-10), verbatim: *"Both can be satisfied by inlining the token block into `:root` of the single file. **The rule that must not be traded away is that values resolve through tokens** — not the file layout."*
- **How a script tests it:** scan for `<link rel="stylesheet">` and external `<script src>` → 0 matches; then run UIG-005/UHR-114 against the inlined `:root`.
- **Severity:** WARN (SPEC-07's tier, held at WARN precisely because H-10 concerns file layout, not token discipline).
- **Source:** SPEC-07 §G.5 UIG-075 (L886); SPEC-07 §C.2 conflict note (L506-510); SPEC-07 H-10 (L913); CONTRADICTIONS C5 (RULED). Repo code (Angular SCSS builds) legitimately uses external token files — this rule is about the single-file prototype delivery form.

---

## 5. Container radius / elevation — only the settled half

### UHR-117 — field rows are flat; the group-container question stays OPEN
- **Plain language:** form rows have square corners and no shadow — that much is settled. Whether the larger group containers around them get rounding or elevation is an open question nobody may pre-answer.
- **Assertion (settled half only):** field rows render with `border-radius: 0` — bound as `var(--border-radius-rounded-none)` (Figma `border-radius/rounded-none`) — and no `box-shadow`. The group-container half (radius/elevation on the 17-data-group-style containers) is **OPEN-REGISTER O-4** (SPEC-07 H-17): a checker REPORTS what containers do and never fails either way, per the register's own discipline ("a rule must never encode a value Singh has not settled").
- **How a script tests it:** field rows: computed `border-radius` = `0px` via the token above, `box-shadow: none` (mechanism per SPEC-07 UIG-019/UIG-052). Group containers: report radius/elevation values found; no pass/fail.
- **Severity:** BLOCK for the row half · INFO (report-only) for the container half until O-4 closes.
- **Source:** OPEN-REGISTER O-4 ("Rows are settled (0); the contested surface is the group container"); SPEC-07 H-17 (L920); SPEC-07 UIG-019 (L816), UIG-052 (L863, WARN pending H-17).

---

## 6. Per-portal methodology (EX-001 scope)

> **Scope note:** naming implementation stacks in a design-system document is normally
> forbidden by epic C360-3526 Rule 8. This section exists under **EXCEPTIONS EX-001** —
> Singh's own 2026-08-24 request for this folder, scoped to this file only. Do not copy this
> table into any dev-facing design-system deliverable.

### UHR-116 — CSS methodology is portal-scoped; the invariants are not
- **Plain language:** each portal writes its styles with different machinery, but the token discipline is identical everywhere. Never apply one portal's methodology to another.
- **Assertion:** the methodology below is binding per portal (**CONTRADICTIONS C4**, RULED: "CSS methodology is portal-scoped, never blanket"); the universal invariants hold in all of them.

| Portal | Methodology | Source (verbatim where quoted) |
|---|---|---|
| **AgencyWebApp** (Angular 19.2) | **SCSS + CSS custom-property tokens. NO Tailwind.** | `Office_Work/memory/tech-stack.md` L15: "Styling: SCSS + CSS custom-property tokens. ⚠️ **NO Tailwind in AgencyWebApp** (debate-verified 2026-07-06, DEBATE-006)" |
| **CGPortal** (Caregiver web) | **Tailwind-only.** | `Office_Work/CGPortal/CLAUDE.md` L16: *"**Use Tailwind only** for styling — no static CSS code unless there's no Tailwind alternative"* |
| **caregiver-mobile-app** (React Native) | **`ScaledSheet` from react-native-size-matters, `@ms` suffixes.** | `Office_Work/caregiver-mobile-app/.github/copilot-instructions.md` L124: "All styles use `ScaledSheet.create` from `react-native-size-matters` with `@ms` (moderateScale) suffixes"; L270: "always use `ScaledSheet` with `@ms` suffixes for dimensions" |

- **Universal invariants that hold in all three methodologies:** tokens only / no raw hardcoded values (epic Rule 1; UIG-001..004); no `!important` (UIG-008 / C9); no visual inline styles (UIG-008); values resolve through the portal's own semantic layer (UHR-111, UHR-115). In Tailwind these bind via token-backed utilities/config (e.g. `bg-[var(--surface-base)]`, tech-stack.md "Design-to-Code Pipeline"); in React Native via the token/theme layer feeding `ScaledSheet` values.
- **How a script tests it:** per repo — AgencyWebApp: reject `tailwind` imports/classes; CGPortal: reject authored static CSS files without a recorded no-alternative justification; mobile: reject `StyleSheet.create` where `ScaledSheet.create` is the convention (copilot-instructions L270). The invariant checks are UIG-001..008 run against whatever CSS the methodology emits.
- **Severity:** BLOCK
- **Source:** CONTRADICTIONS C4 (RULED); DEBATE-006 via tech-stack.md L15; CGPortal/CLAUDE.md L15-16; caregiver-mobile-app copilot-instructions L16/L122-131/L270; EXCEPTIONS EX-001.

**Per-portal open items:** portal control-size differences (button 30 vs 32, header 52 vs 56, footer 46 vs 54) are **CONTRADICTIONS S4/S5/S6 · OPEN-REGISTER O-14** — deliberate difference vs drift is Singh's call; no rule here encodes either number.

---

## Related registers

- **CONTRADICTIONS.md:** C4 (methodology portal-scoped — resolved into §6), C5 (inline tokens — §4), C9 (`!important` — UIG-008), S2 (export vs pinned commit — UIG-005), S4/S5/S6 (per-portal sizes, OPEN).
- **OPEN-REGISTER.md:** O-4 (group-container radius/elevation — UHR-117 encodes only the settled half), O-14 (per-portal sizes), A-1 (`field/border-hard` ruling quoted in UIG-009's example).
- **EXCEPTIONS.md:** EX-001 (this file's per-portal methodology section vs epic Rule 8).
- **00-AI-MANDATORY-RULES.md:** epic C360-3526 Rules 1 and 4, transcribed verbatim (UHR-111, UHR-115).

## [UIG-076] A shorthand placed after a longhand SILENTLY ERASES IT

**Never leave a shorthand downstream of the longhand you are relying on.** `border`, `font`,
`background`, `margin`, `padding`, `flex`, `grid`, `inset` and `transition` each reset *every*
longhand they cover — including ones you declared deliberately three lines earlier. The
stylesheet still *reads* correct; the browser paints something else.

**Why this rule exists.** This single mistake caused **four separate incidents in one day**
(2026-08-26) on the Agency Wound Management build:

| What was declared | What came after it | What shipped |
|---|---|---|
| the ruled chip type | `font: inherit` | the ruled type erased on **36 of 44** chips |
| `border-width: 0` on the header cell | `border: 1px solid …` | the border never went away |
| the same fix again, on a second table | the same shorthand | same result, same day |
| `border: 1px solid …` restored | a leftover `border: 0` | the restore did nothing |

Every one looked right in the file and wrong on screen. Two of them were recorded in a decision
log as "fixed" while the defect was still live, because nobody re-measured.

**How to comply**
- Set the SHORTHAND itself when you want to change what it covers. Do not add a longhand above it.
- If a longhand must win, delete the shorthand — do not out-order it.
- **Prove it by measuring the rendered value**, never by reading the declaration. `getComputedStyle`
  on the real element is the only evidence that counts. A comment saying "border removed" is a
  claim, not a result.

---

## [UIG-077] A universal rule must be applied to EVERY instance, not to the one that was reported

When a rule is written as universal, wiring it into the single component that happened to be
failing is **not** an implementation of it. The rule then exists on paper while the other
instances go on reproducing the defect it was written to prevent — and the next report reads as
a new bug rather than the same one.

**Why this rule exists.** `[CS-TBL-13]`'s "the last column fills" clause was written into the
shared table rules on 2026-08-26 and applied to **one table of three**, because that was the one
measuring a dead gap that morning. Hours later the wound list produced exactly the gap the clause
forbids. The same shape recurred across the same build: truncation handling applied to 2 tables
of 3, the dialog role to 1 of 8 dialogs, a focus ring to 1 field, an enlarged hit area to the
checkbox only.

**How to comply**
- Before closing a rule-driven fix, **enumerate every element the rule covers** and check each.
  For a table rule that means all tables; for a dialog rule, all dialogs; for a field rule, all
  fields — in **both** build targets.
- Say the count out loud in the decision record: "applied to 3 of 3 tables", not "applied".
- If a rule genuinely should NOT reach some instance, record *why* — an unexplained exception is
  indistinguishable from an oversight six weeks later.

---

## [UIG-078] Write the lesson in the RULEBOOK, not in the file where you learned it

A rule discovered while fixing one component belongs here, where the next build can copy it. A
long explanatory comment inside a generator teaches nobody but its own author.

**Why this rule exists.** The shorthand trap above cost four incidents in a single day and was
documented, thoroughly and repeatedly, **inside `build.py`** — and appeared **zero times** in
these universal rules. Any other portal was free to walk into it. Rules [UIG-076] and [UIG-077]
exist because a forensic audit had to go looking for what the code already knew.

**How to comply** — when a fix teaches you something reusable, add it here *first*, then
reference it from the code. The code comment should say *which* rule it satisfies, not restate it.

---

## [UIG-079] Dropdowns prompt with **"Please Select"** — and drop the prompt once something is chosen

**Authority:** Singh's ruling, 2026-08-27.

> "instead of -Select placeholder- use **'Please Select'** everywhere in the system. Make this a
> universal rule. This must be for Input field where drop down selection is implemented (**not the
> text input**). If the default value is selected then we do not need to show the 'Please Select'."

**Two rules, and the second is the one that gets missed.**

**1 — One wording, everywhere.** Every `<select>` awaiting a choice prompts with exactly
`Please Select`. Not `-Select-`, not `Select Location`, not `Choose…`. Bind it to a single
constant so a project cannot drift into a second spelling — the Wound Management build was
carrying **two** wordings before this rule existed.

**2 — A chosen value removes the prompt entirely.** The empty option is not merely left
unselected, it is **not rendered**. A placeholder is a *prompt to choose*; once a value is
selected there is nothing left to prompt, and leaving the empty option in place hands the user a
way to un-answer a question back to blank. On a clinical form that is a **data-loss path**, not a
convenience.

**Text inputs are explicitly out of scope.** Their placeholder is a *format hint* —
`e.g. 2cm at 3 o'clock`, `Additional notes…` — which is a different job and keeps its own words.
Never replace a format hint with `Please Select`.

**How to comply**
- One constant, referenced by every select builder. Never a literal at the call site.
- Apply rule 2 in **every** builder that emits options. In the Wound Management build the main
  builder honoured it while a second builder emitting grouped `<optgroup>` options did not, so two
  rendered selects still prompted over a value they already held — the partial-application failure
  [UIG-077] exists for.
- Verify by **rendering**: count selects that hold a value and assert none of them carries an
  empty first option. A grep over source cannot see which builder produced which select.

---

## [UIG-080] Every date field carries an explicit, visible format hint

> **SUPERSEDED IN WOUND MANAGEMENT, 2026-09-01.** Singh reversed his own ruling below directly
> ("Why we are showing MM/DD/YYYY as bottom of the field. This does not required" — artifact
> comment thread 774c3734), and the hint was removed from that build. This rule is left
> standing for OTHER products that may already have adopted it — rescinding it design-system-
> wide is not a call to make from one product's reversal. Flagged to the design-system lane as
> an open question: was this a Wound-Management-specific call, or should the rule itself change?
> If you are implementing this rule fresh elsewhere, confirm current intent with Singh first.

**Authority:** Aman Sharma, C360-45862 comment 630069 (2026-08-27): "Add clear date format
placeholders (e.g., MM/DD/YYYY) to all date fields." Singh, same day: "this must be a
product-level wide change, make it a universal rule and implement everywhere in the system. No
guesswork here."

**Why a real hint, not the browser's placeholder.** A native `<input type="date">` does not
accept a custom placeholder for its date segments — the ghost text a reader sees (`dd/mm/yyyy`,
`mm/dd/yyyy`, …) comes from the **browser's own locale**, not from anything the page declares.
Measured on this build before the fix: zero `placeholder` attributes anywhere, and the ghost text
still varied — which is exactly the inconsistency Aman is asking to remove. Only an
**explicit, rendered hint** can guarantee the same format reads the same way for every user,
in every browser, regardless of OS locale.

**The format is `MM/DD/YYYY`**, stated once here so no build re-derives it, and it applies
everywhere a date is entered — never per-field discretion.

**Placement.** This is not the error/helper hint governed by UIG-022 (that lives in the label
column, and answers a validation or business question). A format cue answers *"what do I type
here"* and belongs **beside the control it describes**, the same way a `.unit` suffix ("in
centimetres") sits next to its own field. Render it directly under the date input, on the
existing caption ramp (`--font-size-caption` / `--line-height-caption`, `--text-secondary`) —
the same type used for every other supporting text on a field, not a new size.

**How to comply**
- Bind the hint into the date control's own builder, not into each call site. A hint that has to
  be remembered per field is a hint that will eventually be missing on one of them.
- One wording, one format, everywhere — `MM/DD/YYYY`.
- Verify by **rendering**, not by grepping the source: count every visible date input and assert
  each one has the hint text present and visible.

---

## [UIG-081] A literal "closing SCRIPT tag" substring is dangerous ANYWHERE inside a `<script>` block — including in comments

**Never write the literal four characters `<` `/` `s` `c` `r` `i` `p` `t` in sequence inside
JavaScript that will be emitted inside an HTML `<script>` element** — not in a string literal,
not in a template, and **not in a comment**. The browser's HTML parser looks for that exact byte
sequence to know when a script block ends, and it does this **before** any JavaScript is
tokenised or executed. It does not know about JS string escaping, and it does not know a `//`
comment is "not code" — it is scanning raw bytes for one closing tag, full stop.

**Why this rule exists.** This build already carried the lesson once — `build-artifact.py`'s
audit-export strings — and paid for it a second time on 2026-08-27 in a completely different
location: a new feature embedded a data string that happened to contain a real `<script>…`
closing sequence, corrupting the surrounding inline script and leaving the entire app dead with
no console error pointing at the cause (`window.__wm` simply never existed). Then, while writing
the **comment explaining that exact danger**, the closing-tag text was spelled out literally
inside the `//` comment itself — and reproduced the identical failure, in the very sentence
warning against it.

**How to comply**
- If you must refer to the tag in a comment or in generated output, break it up — `SCRIPT
  element`, `close-script`, or a comment like this one that never spells the four characters
  together in order.
- Never assume "it's just a comment" or "it's inside a string, it'll be escaped" protects you —
  neither does, because the HTML parser runs before either matters.
- If a data string legitimately needs to carry a script tag (e.g. building a downloadable HTML
  document as a string), verify by **counting the literal substring** in the final rendered
  output, not by reasoning about it — `grep -c` for the closing-tag text and confirm the count
  matches only the REAL script boundaries you intended.

---

## [UIG-082] One date format across the product — **MM/DD/YYYY** — from ONE configurable source

**Authority:** Singh, 2026-09-01: *"for all date formats Must follow the date format MM/DD/YYYY
(this can be managable from office settigns or admin settings) but we will sue this format here.
make thsi gloabl universal rule."*

**The rule has two halves, and both are binding.**

1. **Every date a user reads or types renders as `MM/DD/YYYY`** — tables, detail views, form
   inputs, hints, audit trails, exported files, validation messages. No surface gets its own
   format, and no surface may inherit the *reader's* locale.
2. **The format is a SETTING, not a literal.** In the product it comes from Office/Admin
   settings. So an implementation must resolve it from **one** source and format through **one**
   helper — never `toLocaleDateString()` at a call site, never a hand-built `d/m/y` string, never
   a per-component choice. `MM/DD/YYYY` is today's *value*; a build that hardcodes it in twenty
   places cannot honour the setting when it changes, which is the same defect as a token typed
   as a hex.

**THE TRAP, AND IT IS A REAL BROWSER CONSTRAINT — MEASURED, NOT ASSUMED.**

A native `<input type="date">` **cannot be made to display `MM/DD/YYYY`.** Its rendering follows
the *browser/OS locale* of whoever is looking, and nothing in the page overrides it:

- Measured 2026-09-01 on the Wound Management build: browser locale `en-GB`, a stored value of
  `2026-08-17` rendered to the user as **`17/08/2026`** — while every display date on the same
  screen read `08/02/2026`. **Two formats, one screen, same product.**
- `lang="en-US"` on the input **and** on `<html>` was applied and screenshotted: **no change.**
  The `lang` attribute does not control date-input formatting. Do not ship it as a fix.
- The element's `.value` is *always* ISO `yyyy-mm-dd` regardless of what is painted. So reading
  `.value` is safe; **what the user sees is not under the page's control.**

**Therefore, to satisfy this rule a date field cannot be a bare native date input.** Either use a
text input the product formats itself (with its own picker), or accept that the format follows the
reader's locale and the rule is not met. There is no third option, and any claim that a native
input has been "set to MM/DD/YYYY" is false — verify by *looking at the painted field in a
non-US locale*, never by reading the value back.

**How to comply**
- One formatter, one parser, one source for the pattern. Everything else calls them.
- Store and transport dates as ISO `yyyy-mm-dd`; format only at the moment of display.
- **Test in a non-US browser locale.** In `en-US` every one of these bugs is invisible, because
  the locale default happens to match the required format — a build verified only in `en-US`
  proves nothing about this rule.
- A two-digit day and a two-digit month are both **zero-padded**: `08/02/2026`, never `8/2/2026`.

**Related:** [UIG-080] (the visible format hint) was removed from Wound Management on
2026-09-01 at Singh's instruction. That removal took away the *cue*; this rule addresses the
*format itself*. They are different concerns — do not treat this rule as reinstating that hint.

---

## [UIG-083] Resolve a border variable by the COMPONENT'S TYPE — and verify the variable + value in Figma every time

**Singh's ruling, 2026-09-02.** At the semantic layer the *same border name* can exist under
several sections (a `field` border, a `button`/`action` border, a general `border/*` border,
a `tags/*` border…). Picking one by eye — or asking the owner "bordered or not?" — is exactly
how a component ends up with the wrong border. There is a deterministic rule, and it is keyed on
**what the component is**, not on which token you saw first:

| The component is a… | Use the border from… |
|---|---|
| **Button** | the **button / `action/{type}` border** variable |
| **Field** (input, search box, select, textarea, date field) | the **field border** variable |
| **Anything else** (card, popup, panel, drawer, divider, chip) | the **`border/*` section** variable |

**Then verify — always.** Do not assume the token name from the table above. Read the node's
**actually-bound variable and its value from the live Figma file** (`get_variable_defs` on the
node) before you write a line of CSS. The table tells you *which family* to expect; Figma tells
you the *exact variable and value*, and the two must agree — if they don't, that divergence is a
finding to raise, not something to silently "correct".

**If the Figma file you need is not the active tab, STOP and alert the owner** to open it and keep
it active, then read it. Never fill the gap with a guess. (Owner instruction, verbatim: *"IF the
figma file is not open then give me alert to open and stay active on figma file from where you
need to cross check."*)

**Worked example (the ruling's origin).** The Wound Management search box. The wrong move was
asking "bordered-white or borderless-grey?". The right move: it is a **field**, so it takes the
field border — and node `56800:78229` in the 2023-Client file binds `field/bg-default` `#ffffff`
+ `border/subtle` `#e2e8f0`. Read, not asked. (Note the search binds `border/subtle` rather than a
`field/border-*` token — a candidate DS-lane discrepancy to raise, per the "must agree" clause.)

**Why this is a rulebook entry and not a one-off:** it removes an entire class of "which token?"
guesses across every component and portal, and it makes Figma — not the owner's memory or mine —
the tie-breaker. Applies system-wide (EX-001 scope: the *selection + verify* discipline is an
invariant; the specific token names are portal-scoped).

---

## [UIG-084] Component class names follow the design-system BEM naming — `.cs-<block>`, `--modifier`, `__element`

**Singh's ruling, 2026-09-02.** Every reusable UI component is expressed in code with the design
system's own class names, in BEM form:

- **Block:** `.cs-<component>` — `.cs-btn`, `.cs-search`, `.cs-field`, `.cs-colpanel`, …
- **Modifier:** `.cs-<block>--<variant>` — `.cs-btn--primary`, `.cs-btn--icon-only`, …
- **Element:** `.cs-<block>__<part>` — `.cs-btn__icon`, `.cs-btn__label`, …

Do **not** invent a parallel name (`.btn`, `.btn-circle`, …) for something the design system
already names. A prototype that re-types the classes reads as a *different* system even when the
geometry matches — which is the confusion this rule removes.

**These are CLASS / COMPONENT names, NOT variable names.** The token/variable layer
(`--action-primary-bg`, `--spacing-md`, …) is untouched by this rule and keeps its own naming —
renaming a component class never renames a variable. (Answered directly for Singh, 2026-09-02.)

**Apply it backwards and forwards:** migrate existing components to the `.cs-*` names, and start
every new component with them, so the naming is one global standard, not a per-feature choice.

**Tell the Figma side too:** the Figma AI / design-system lane names each component and its parts
the same way, so a component's Figma name, its written contract, and its shipped class all agree.
Coin a new component name → flag it to that lane (Figma Queries).

**Migration status:** the Universal `02-components/buttons.css` reference already uses `.cs-btn`;
the **Wound Management prototype was migrated 2026-09-02** (`.btn`/`.btn-primary`/`.btn-circle`/… →
`.cs-btn`/`.cs-btn--primary`/`.cs-btn--circle`/…) across `build.py` and all six verifiers, gate
green (E2E drove every button). JS variables named `btn` and unrelated classes (`px-ov-btn`,
`icon-btn`, `ph-colbtn`, `cs-skeleton--btn`) were deliberately left untouched.

---

## [UIG-085] Every artifact carries the black "artifact widget" bar

**Singh's ruling, 2026-09-02.** Every design-showcase artifact opens with a widget bar that tells
the viewer WHAT the artifact is and lets them switch how it renders — and it is deliberately BLACK
so no one mistakes it for part of the product design ("just for design showcase widget prospective").

Layout:
- **Left:** the artifact NAME + a one-line DESCRIPTION.
- **Right:** an **Overview** button (opens the project overview / status page), a **Density** switch,
  and a **Colour mode** switch.

Painted from its OWN widget tokens — `--artifact-widget-bg` (near-black), `--artifact-widget-fg`,
`--artifact-widget-muted`, `--artifact-widget-border` — **NOT** design / semantic tokens, precisely
so it reads as artifact chrome, not the design. Never paint it with product surface / text tokens.

**Global standard:** this bar belongs on EVERY artifact. Promote the widget tokens and the bar to the
design-system GitHub repo so all artifacts share one source (flagged to the DS lane). The density
switch is the standard control even where a portal ships one density — Agency ships only Default
today, so it shows that single option and gains more when the DS ships them.

**Verification:** an Antigravity dry-run proves it — `Wound Management/06-Verification/DRYRUN-artifact-widget.md`.

---

## [UIG-086] Page gutter — 12px on the content rows, containers run full-width

**Singh's ruling, 2026-09-03, forensically measured from the Figma `page_content` frame (56606:154515)
"corrected from a margin/padding perspective."** The page gutter is NOT a single padding on an outer
container — it is a **12px (spacing/lg) inset applied to the content ROWS**, while the section
containers run **full-width**.

- **Full-width containers (no left/right padding of their own):** page_content, the tab strip
  (Tab Container), the header block (Header complete), the table region (Middle Matter), page-info.
- **12px content inset (spacing/lg) on the rows inside them:** the tabs (first tab left 12, last
  tab right 12), the page header (L12/R12), the Search & Filters bar (L12/R12), the table (frozen
  column left 12, Actions column right 12), page messages (left 12), page info.
- **Header block vertical rhythm:** 12 top · 44 header · **12 gap** · 30 filter row · **12 bottom**
  — UPDATED 2026-09-04 (page-header contract **v1.1.0** `completeHeader`, origin/main `188eac2`,
  Singh ruling): the complete-header MOLECULE now **owns** its gutter — a uniform 12px (spacing/lg)
  padding on ALL FOUR sides (block = 110), 12px row gap, surface/base background, self-contained.
  Pages must NOT add their own left/right padding around it — double-padding is a defect. The
  page-header ATOM inside stays 0-padding. (The original 2026-09-03 shape was ... 0 bottom.)

Consequence: the tab-strip underline and any section background span **edge to edge**, while their
content aligns at the 12px gutter. Forensic method: derive each layer's inset from the Figma layer
tree (child offset from each parent edge) rather than trusting a single container's `padding`.

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-09-04 | **[UIG-086] header rhythm updated** — the complete-header molecule owns a uniform 12px gutter on all four sides (12/44/12/30/**12**, block 110), 12px row gap, surface/base bg, self-contained; pages must not double-pad it. Per page-header contract v1.1.0 `completeHeader` (origin/main 188eac2). | Singh ruling, 2026-09-04 |
| 2026-09-03 | **[UIG-086]** added — page gutter is a 12px (spacing/lg) inset on the CONTENT ROWS (tabs, header, search, table edges, messages, page-info); section/tab containers run full-width; header rhythm 12/44/12/30/0. Forensically measured from Figma page_content 56606:154515. | Singh chat ruling, 2026-09-03 |
| 2026-09-02 | **[UIG-085]** added — every artifact carries the black artifact-widget bar (name/desc left; Overview / Density / Colour right; widget tokens, not design tokens); global standard, promote to GitHub; Antigravity dry-run defined. | Singh chat ruling, 2026-09-02 |
| 2026-09-02 | **[UIG-084]** added — component class names follow design-system BEM (`.cs-<block>` / `--modifier` / `__element`); classes are component names, not variables; migrate existing names and tell the Figma lane. | Singh chat ruling, 2026-09-02 |
| 2026-09-02 | **[UIG-083]** added — resolve a border variable by component type (button / field / other), and always verify the variable + value in the live Figma file; alert the owner if the needed file is not the active tab. | Singh chat ruling, 2026-09-02 |
| 2026-08-24 | Assembled from SPEC-07 §C.2/§C.3/§C.4/§G.1/§G.5/H-10/H-17, epic C360-3526 Rules 1+4 (via 00-AI-MANDATORY-RULES.md), `caresmartz360-design-system` origin/main:shared/primitives/README.md, Wound Management verify suite (verify-build.py §5b3/§5b4/§5c/§6, verify-tokens-resolve.py), ECOSYSTEM-RULES §10 (superseded), MASTER-AI-INSTRUCTIONS §3 (superseded), memory/tech-stack.md, CGPortal/CLAUDE.md, caregiver-mobile-app copilot-instructions | Approved plan step 2 |
