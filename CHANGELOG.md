# Changelog

All notable changes to the CareSmartz360 Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.0.0] — 2026-09-11 — control-height tokens LANDED and BOUND

The owner re-exported. Option A is complete: the two most-repeated raw numbers in the system
(**30** and **24**) are now real tokens, and every genuine control-height site binds them.

### Added — the export brought 19 new variables, not 2
Agency now matches Figma exactly (**General 16 · Color Modes 223 · Density Modes 31**):
- `control/height-default` = **30** → aliases `size/size-30`
- `control/height-compact` = **24** → aliases `size/size-24`
- `size/size-30`, `size/size-24` (Agency **General** — the alias targets)
- `popover/primary-bg`, `popover/primary-foreground`, `surface/overlay-soft` (× all 5 colour modes)

**agencySemantics 263 → 270**, recomputed from the published files; `AI_CONTEXT.md` and the routing
test updated to match. Nothing removed.

### Changed — 15 raw literals replaced by tokens
`buttons.css` (30 + 24), `fields.css` (30), `column-arrangement.css` (30) in the kit; the four
matching gallery stylesheets plus `search-field.css` (height/min/max) and `select.css`;
`button.json` `geometry.minHeight` and the `button.md` table row.

Both token layers now define them — `src/styles/2-semantics/_density.scss` and the gallery's
generated token file — **density-scoped on purpose**, so a future compact density re-values them in
one place.

### The 8 excluded traps — deliberately still raw
`buttons.css:161,191` are **`min-width`** (widths, not heights); `fields.css` `.cs-field__toy` is a
30px **icon box**; `table.css:426,427` and `_tables.scss:100,101` are **table cells**, not
interactive controls; `skeleton.css:49` is a **placeholder**. `spacing/3xl` is also 24 — a blind
find-and-replace would have broken all of these. Each was classified, then re-checked by an
independent pass instructed to reject.

### Corrected — an earlier warning of mine was wrong
I had said Primitives needed re-exporting because the aliases pointed at a missing `size/*` group.
Wrong: `size/size-30` and `size/size-24` live in **Agency General**, which the owner's export
included. **No Primitives re-export was needed.**

### Resolved
`button.json`'s `openTokenDecision` is closed — Figma's names (`control/height-*`, aliased) win over
its older `control/min-height` raw-number proposal. Six contracts that independently flagged "absent
from the export" are annotated resolved. Still open and untouched: `control/min-width` (80) and
`control/min-width-label` (60) remain RAW — never exported, owner's call.

---

## [3.7.0] — 2026-09-11 (shareable-repo pass)

Prepared the repo to be handed to other team members. One of the checks found a gate that had been
silently not doing its job.

### Fixed — `verify:variables` was running blind
`scripts/verify-owner-variable-exports.mjs` still defaulted to `…/Documents/Variables`, the path
**abandoned in the 2026-08-24 move**. The sync script was corrected on 2026-09-09; the verify script
never was. Consequence: the gate fell back to `verificationMode: "manifest-only"` — checking the
committed token files against **their own recorded hashes** (circular) instead of against the owner's
real exports. **Drift between Figma exports and the published repo could not have been caught by the
gate.** It now runs in `authority-and-manifest` mode.

**Result of the first real run:** all **15 token artifacts are byte-identical** across export → repo →
manifest. **No token drift** — the published tokens were correct all along; the gate simply wasn't
proving it. Six `.zip` **archive** hashes differed (zip wrappers are not byte-reproducible — re-saving
identical content yields different bytes); those were recomputed from the real files. Content hashes
were untouched.

### Fixed — stale + duplicated authority paths
- `config/variable-export-manifest.json` recorded the **old** `sourceFolder`; corrected.
- `sync-owner-variable-exports.mjs` carried a **second** hard-coded path literal that could drift from
  the first; it now records the resolved `sourceRoot`.

### Changed — repo is portable for other contributors
The repo is **public**, and 16 files told every reader that the variable authority lives at a path on
one person's laptop — meaningless to anyone else. Twelve documentation files now reference the
**`DS_VARIABLE_SOURCE_DIR`** environment variable instead (the scripts already supported it). The
scripts keep a working local default so nothing breaks; CHANGELOG history is left intact as the record.

### Verified for sharing
Deterministic scan for credential patterns across `origin/main`: **no keys, tokens, `.env` files or
private keys**. Two scanner hits were false positives — `"token":` matches are design tokens
(`spacing/md`), and `sk-` matched inside `--status-ta`**`sk-`**`completed`.

---

## [3.6.2] — 2026-09-11 (control-height binding, prepared)

Singh approved **Option A** and asked for the details to be double-checked against the locally saved
exports first. Both done; **nothing bound yet** — the binding is blocked on the export refresh only.

### Verified (the double-check he asked for)
Re-scanned **all 7 export collections**, every JSON inside every zip, for any token name containing
`control` / `height` / `size` / `dimension` / `track`: **41 matches, none of them `control/*`.** The
Agency exports are still dated **24 Aug 2026** — no refresh has landed. `control/height-default = 30`
re-confirmed **live in Figma** the same day. So the values are real and the export is simply behind.

### Added
- `docs/PLAN-control-height-binding.md` — the full binding plan: **17 confirmed sites** across kit CSS,
  gallery CSS and the Button contract, each classified and then **adversarially re-verified** by an
  independent pass instructed to reject. Ships with an explicit **exclusion list of 8 sites** that a
  blind find-and-replace would have broken — two of them are `min-width` (widths, not heights), one is
  a 30px icon box, four are table cells, one is a skeleton placeholder. `spacing/3xl` is also 24, which
  is exactly why this was verified rather than scripted.
- `Design-System/00-EXPORT-INSTRUCTION-control-height-tokens.md` — the 2-minute export step, written so
  it lands right the first time (which collection, exact file path, what I do next).

### Raised for the owner
- **Naming conflict:** Figma has `control/height-default` / `control/height-compact`; `button.json`'s
  `openTokenDecision` proposes `control/min-height` / `control/min-height-compact` for the same two
  values. Recommendation: **keep Figma's names** (already bound to live components) and retire the
  contract's competing proposal. Corroboration worth noting — `button.json` independently concluded
  these belong in the **Density Modes collection, scope WIDTH_HEIGHT**, matching the recommendation
  reached from the opposite direction.
- **Two more candidate tokens** in that same proposal — `control/min-width` = 80 and
  `control/min-width-label` = 60 — **not verified live in Figma**; flagged so they can ride along in
  the same export if Singh wants them, instead of a second round trip.
- **Cross-portal warning** (OPEN-REGISTER O-14 / CONTRADICTIONS S4): Agency's button is 30px while
  CGPortal's `--btn-min-height` is 32px, still unresolved. These bindings are **Agency-only**; a
  Caregiver copy must not silently inherit 30.

---

## [3.6.1] — 2026-09-11 (owner rulings)

Two items that were flagged-not-guessed yesterday came back with owner rulings.

### Changed — page header is HUG, not a fixed height (Singh, 2026-09-11)
`page-setup.md` published a fixed **98px** complete header and a fixed `Data Container 214 = 98 + 116`.
Both are retired. The 98 had dropped the header's 12px **bottom** padding, and stating any of it as
fixed contradicted the component's actual behaviour. Now published as the rule the owner gave:

- **Page header = HUG**, derived as `sum(visible rows + 12px row gaps) + 24` (12 top + 12 bottom).
  - with the search & filters row → `44 + 12 + 30 + 24` = **110**
  - without it → `44 + 24` = **68**
- **Data Container = HUG** (`page-header + middle matter`). The demo page's `tab 50 + data 400 +
  page-info 136 = 586` is now published as a **measured sample, not a constraint**.
- Ruling recorded in `page-header.json` (→ **1.3.0**), `page-layout-patterns.json/.md` and
  `page-setup.md`, so it binds rather than living in prose.

### Added — proposal for the missing control-height tokens
`docs/PROPOSAL-control-height-tokens.md`. `control/height-default` (30) and `control/height-compact`
(24) are bound in Figma but exist in **no** exported collection — verified across all 7 collections.
Seven contracts flag the gap independently and the kit hard-codes the literals in 12+ places across
4 stylesheets. Recommendation: they belong in **Agency › Density Modes** (which already holds the
density-sensitive font/line-height/spacing family), and the fix is an export refresh, not a new
value. **No token added and nothing bound — awaiting Singh's ruling.**

---

## [3.6.0] — 2026-09-11

Owner-flagged naming correction — and the real defect hiding behind it.

### Fixed — the repo was shipping the WRONG primary-field height
`field-type-1.json` was marked "superseded" on 2026-09-10 but **never received the corrected
numbers**, so the repo's only machine-readable geometry for the view-mode field stayed at the
2026-08-24 value of **62px** while the live Figma component is **66px** (header row 26 → 30).
There was no live contract for `form-field-primary` at all — the correct measurement existed only
in CHANGELOG prose and the local gallery. Anything built from the repo was 4px short.
**`form-field-primary.json` is now a live 2.0.0 contract** with the measured 66px, all 7 state
token bindings, and the two defects Figma has since resolved (required/help icons now exist via the
real `field-header-primary`; `field/bg-disabled` now bound). Independently corroborated by
Antigravity's V4b live re-measurement the same day.

### Changed — contract names now match Figma
The "Fields type 1 / 2 / 3" vocabulary was legacy repo naming that never followed Figma's rename:

| was | now | Figma node |
|---|---|---|
| `field-type-1.*` | `form-field-primary.*` | `26938:65997` |
| `field-type-2.*` | `form-field-secondary.*` | `27062:7663` |
| `field-type-3.*` | `form-field-tertiary.*` | `27395:30147` |

Every cross-reference updated: both mapping registries, the family index, the components README,
DS-REFERENCE, the patterns, and the local gallery registry. The superseded 62px measurement is kept
for provenance at `form-field-primary-2026-08-24-historical.md` behind a do-not-build banner.

---

## [3.5.1] — 2026-09-10 (self-audit pass)

A 5-dimension consistency audit (node-ids · arithmetic/markers · token names · patterns-vs-shell ·
governance docs) ran across the whole repo, every finding adversarially re-derived before being
trusted (one dimension's verification pass ran out of budget mid-run — its raw findings are listed
below without a second confirmation, marked accordingly). 15 confirmed defects; fixed the safe
ones, flagged the two that need a decision rather than guessing one.

### Fixed
- **Dead CSS variables in 4 contracts:** `tabs.json`, `profile-side-navigation.json`,
  `column-arrangement.json` referenced `--rounded` / `--rounded-full`, which do not exist in the
  shipped kit — the kit was renamed to `--border-radius-rounded*` during KIT-01 (2026-09-02) and
  these contracts were never updated. Corrected to the real names, verified against
  `Universal Html Rules/02-components/*.css` and the generated token layer.
- **table.json's own divergence note was inverted** — it claimed `--border-radius-rounded-none`
  was undefined and `--rounded`/`--rounded-xl` were correct; it was the other way round (stale
  since before KIT-01). Corrected with the live evidence.
- **Wrong variable-authority path in 3 files:** `AI_CONTEXT.md`, `GUARDRAILS.md`, `README.md` all
  pointed at `/Users/netsmartz/Documents/Variables`, which has not existed since the 2026-08-24
  move to `/Users/netsmartz/Documents/Design-System/Variables`. Any tool trusting the stated
  authority path literally could not have found the exports. Fixed in all three.
- **Root index missing Button entirely** (published, in the portal mapping, contract exists) —
  added. Also added the previously-unmapped `27232:65797` ("pageheader component") node and noted
  the page-header naming split (root said "page-header", every contract says "complete header").
- **Column trigger variant count wrong** in the root index (said 4, contract says Figma reports
  6) — corrected with a note.
- **field-input / "Field Atoms (shared)" node-id collision** — the portal mapping's Field Atoms
  row used field-input's own node id (27062:8145) as if it represented the whole 4-atom family;
  the family has no single container node. Added `atomNodeIds` listing all four so the row
  resolves correctly instead of silently hiding 3 of the 4 atoms.
- **Portal mapping's own entry/null counts were wrong** (said 15/13, file actually has 16/14) —
  corrected in the file's `$note` and in this CHANGELOG's own 3.5.0 entry above.
- **`COMPONENT-MAPPING-CONTRACT.md` contradicted the registry it governs** — it required every
  record to carry a verified component key and rejected `null`/placeholder values outright, with
  no provision for the Plugin-API-only limitation this session hit. Added an explicit amendment
  permitting a documented PENDING state pre-pilot.
- **Version drift:** README (`v3.0.0`) and DS-REFERENCE (`3.0.0`) both lagged the actual latest
  release; both bumped to track this file.

### Flagged, not guessed (need a decision, not a fix)
- **`portals/agency/patterns/page-setup.md`'s page-header height (98) contradicts the
  contract-measured 110** (`page-header.json`, `page-layout-patterns.json` both say 110 for the
  same node) — the 98 looks like a dropped 12px bottom-padding term, but page-setup.md's own
  header says it is "ratification pending (visual sign-off)" and the error cascades into its Data
  Container/content-stack sums. Rewriting cascading arithmetic without Singh's sign-off risks
  compounding the error — needs a live re-check, not a silent patch.
- **`control/height-default` and `control/height-compact`** are bound in 3 contracts
  (column-arrangement.json, profile-side-navigation.json, page-header.json) but exist in **no**
  export, no generated token file, anywhere — not a naming mismatch, the token itself appears
  fabricated or the export is missing it. Needs Singh/Figma-AI to confirm which.
- Arithmetic-markers dimension's raw findings (contract internal math + marker discipline) did
  not get a second adversarial pass — the verify agents ran out of session budget. Nothing from
  that batch was applied; treat it as reported-not-confirmed until re-run.

---

## [3.5.0] — 2026-09-10 (evening)

Five Figma-AI tickets executed in their stated order (C360-47325 + 47326 → 47328 → 47327 → 47329), plus the C360-47183 afternoon comments synced. **Every Figma claim was validated live before it entered a contract** — the afternoon Figma-side changes are real (typography 10/14→12/16 on all field messages, new `comments` type, header-tertiary min 200/max 400, form-section-header rebuilt at 64px); three claims failed validation and are recorded as corrections (a "light blue" section-header fill that is actually `surface/tertiary`; the comments variant's copy-pasted Figma description; the purple Change info-chip surface being un-bound — new defect **F-016**).

### Added
- **field-type-2 1.0.0** (`.json/.md`) — SECONDARY edit-mode field: 360×56/76, header-secondary 186×26, all 6 variant nodes (C360-47325).
- **field-type-3 1.0.0** — TERTIARY settings field measured POST-restructure: molecule 1036×**112** (header column 400×88, **min 200 / max 400 live-verified**; input column at gap 12), header set S/M/L = 400×**82/88/92** with row arithmetic, left-stack reference `27507:56751` (400×112, field-comment 92×20 on `text/links`), **form-section-header rebuilt 80→64** around a Size=M header instance on `surface/tertiary`. WRAP flag + field_info/input minima recorded as ASSERTED (#633283) pending a constraint read.
- **field-atoms 1.0.0** — field-label, field-header-primary, field-input, and the 6-type **field-message** (all 20h, caption 12/16 — the same-day Figma change; `type=comments` `27507:56752` 93w, icon 16, `text/links → colors/Brandblue-600` verified vs export).
- **info-chips 1.0.0** (C360-47326) — the 9-variant `page messages` set (`11315:24274`), measured live: 6 message bars (800w, padding 8, icon 20, radius 8, subtle-surface tokens) + 3 setting chips (36h). Defects: **F-016** Change-variant surface un-bound; "Variant8" duplicate naming.

### Changed
- **form-fields → 2.0.0 (family INDEX)** — detail moved into the four member contracts; index keeps hierarchy, the export-verified token chain, and the drift log. field-type-1 banner now routes to all four.
- **Portal `component-mapping.json` 2 → 16 entries** (C360-47328; corrected from an earlier 15/13 miscount the same day — self-audit caught it) — every nodeId grounded (contract-measured or existence-probed live). `componentKey` for 14 entries is **null/PENDING**: Figma's 40-hex component keys are Plugin-API-only — enumeration requested from Figma-AI; no keys were invented.
- **Root `components/component-mapping.json` regenerated as 3.0.0** (C360-47327) — the self-declared round-number IDs and wrong file key replaced by a grounded 10-section index (28 sets/components + 3 patterns + guideline frames), provenance noted per section. It indexes; the portal files stay authoritative.
- **Guideline frames wired in** (C360-47329) — `figmaGuidelinesFrame` added to 9 existing contracts + a Guidelines section in each `.md` (all 11 frame ids existence-probed live). **DS-REFERENCE → 3.0.0**: token manifest ref corrected to `ds-tokens-v2.6.4.json` (v2.5.0 never existed), `semantic.text.primary` fixed (was "gray.00 / Disabled text"; is `neutral.800 #1E293B` / Primary text).

### Corrections vs the Figma-AI comments (validated, not assumed)
- form-section-header fill/stroke are `surface/tertiary` #f1f5f9 + `field/border-default` #e2e8f0 — not "light blue / darker blue" (#633282).
- `field-message type=comments` carries a copy-pasted description (repeats the AI-variant text) — Figma-side prose bug, flagged.
- The morning contract's Body/micro 10/14 message typography was correct *when measured* and stale by evening — the drift log records both states with timestamps.

---

## [3.4.0] — 2026-09-10

Q1 tickets **C360-47183** (Form Fields) and **C360-47184** (Page Layout Patterns) delivered — measured live from Figma on 2026-09-10, reconciled against the owner exports, published at the portal-scoped authority paths.

### Added
- **Form Fields family contract 1.0.0** — `portals/agency/components/form-fields.json` / `.md`: all 10 components (field-label · field-header-primary/secondary/tertiary · field-input · field-message · form-section-header · form-field-primary/secondary/tertiary) with measured geometry, per-state token bindings and behavior spec. Key measurements: form-field-primary 360×**66** (rows 30+34, 7 states incl. `ai`); secondary 56/**76** with message row; tertiary 1036×104 horizontal; field-input 34 base / 30 embedded, radius 4, editable border `field/border-hard`; field-message 20h (18h AI).
- **Page Layout Patterns 1.0.0 (Layer 4, draft)** — `portals/agency/patterns/page-layout-patterns.json` / `.md`: the shared shell + 3 Middle-Matter variants (`data-table` 27337:73093 · `empty-state` 27401:30856 · `form-grid` 27401:31504). Measured deltas the ticket diagram missed: pattern 1 runs the **collapsed 48px** nav (patterns 2–3 expanded 158) and page-header is **110 with** filter toolbar vs **68 without**. First entries under `LAYER-4-PATTERN-TEMPLATE-CONTRACT.md` (reference section added there).

### Changed
- **field-type-1 → 1.1.0, SUPERSEDED** by form-fields.json — Figma renamed `field-set-type1` → `form-field-primary` and restructured it (62→**66**, real header component with required/help/AI icons, `field/bg-disabled` now bound — three v1.0.0 defects resolved by drift). File kept as the 2026-08-24 historical measurement.
- `docs/CARESMARTZ360-DS-REFERENCE.md` — Form Field section now points at the portal contract and marks the mat-form-field snippet as a legacy sketch (structural incompatibility stands).

### Second pass (same day) — ticket comments #633267/#633270 incorporated
- **field-message → 6 variants**: new `type=comments` (`27507:56752`, 80×18) — existence + size **re-verified live**; internals (chat icon, gray text) and the AI/comments 80px min-widths recorded as **ASSERTED** pending a live read.
- **field-header-tertiary**: min-width 200 / max-width 400 / FILL / HUG recorded as **ASSERTED** (#633270) with an explicit reconcile flag (at-rest width measured 560 the same morning); tertiary left column documented as the extensible 4px stack (title → description → AI → error → comments-extended, ref frame `27507:56751` asserted).
- The Figma tab closed mid-verification — every unread value is marked, none invented.

### Corrections vs the source tickets (recorded per §"verify, don't trust")
- C360-47183's token table names `gray/200|600|900` primitives — **no `gray/*` exists in any Agency export**; real aliases are `colors/neutral-200|500|800|0` (verified byte-for-byte against `Variables/Agency/Color Modes.zip`).
- The ticket-promised `docs/FORM-FIELDS-SYSTEM.md` (268 lines) and `components/form-field-mapping.json` (214 lines) exist nowhere; this release is the reconciled replacement. The legacy root `components/component-mapping.json` (self-declared fabricated node IDs) stays untouched — the portal contract is the authoritative mapping.

---

## [3.3.1] — 2026-09-09

Component-fidelity corrections from a 7-auditor kit↔contract↔live-Figma audit (18 confirmed defects), all re-verified live with the Agency file open. The copy-from kit (`Universal Html Rules/02-components`, local) was fixed the same day; this entry records the contract-side corrections and the kit changes for the ecosystem.

### Changed
- **Primary Side Navigation → 1.2.0** — collapsed rail corrected: the logo **slot stays 48×102** with a 48×52 white surface top-aligned inside it (slot `27337:73617`, surface `27337:73618`); 1.0.0 recorded the surface as the slot, which lifted the toggle and every icon 50px. Label-only (Icon=No) links measured **36px** (Icon=Yes stays 40). **T4 resolved:** the icon↔section mapping is enumerated in the icon set's variant names (`10883:20899`): Dashboard=grid_view · Client=verified_user · Caregiver=people_alt · Scheduling=pending_actions · Accounting=calculate · Training=model_training · Report=assignment · AI Dashboard=psychology · Other=assignment_ind. Open ruling: the set's assets are Material ICONS while the kit loads Material Symbols.

### Kit (local copy-from CSS — not in this repo; recorded here as the durable broadcast)
- **F-014 fixed:** 21 undefined shorthand custom properties renamed to canonical export tokens; 17 of them (all radius, no fallback) had every rounded corner rendering **square**.
- **Tabs:** `text-decoration: none` (labels rendered with a UA link underline under the intended 2px baseline) + the row now owns its 12px page gutter (page-setup §2).
- **Fields:** editable input border corrected to `field/border-hard` #94A3B8 (live `27062:8093`); `form-field-primary` grew 62 → **66px** (header row 30, live `26938:65991`).
- **Status:** new `.cs-tag` hue modifiers (green/red/yellow/purple) matching the live `Status` component `26535:26277` — 18px uppercase pill, **no dot**; the old `Status/info` dot treatment is marked **LEGACY**. Clinical "Healing" (blue) still has no variant — F-012 stays open.
- **Primary nav:** collapsed logo slot fix (above) + `.cs-pnav__link--label-only` (36px) + new `[CS-COLPANEL-09] .cs-coltrigger` — the "Column(s)" opener is a field-style control, not a Button (`--action-secondary-outlined` is deliberately transparent).

### Notice
- Table rendering: `table.css` is scoped to **real `<table>` elements** (its own §203 warning). Two audit claims against it were my reproduction's div markup, not kit defects — corrected on my side, kit untouched.

---

## [3.3.0] — 2026-09-08

Agency and Caregiver semantic tokens synchronized to the owner's variable exports. The published repo had been behind since 2026-08-24 (Agency) and was 2 values behind the 2026-09-08 Caregiver re-export.

### Added
- **Agency Color Modes: 208 → 220 tokens per mode**, all five modes. 12 new token paths × 5 = 60 definitions: `action/ai/{bg,bg-soft,border,hover,outlined,pressed,text-hard,text-neutral}`, `field/bg-ai`, `field/border-ai`, `field/border-hard`, `status/shift/text`. Agency logical total 251 → 263.

### Changed
- **43 existing token-mode values** brought to the exports: Agency Light 3, Dark Theme 12, High Contrast 25, HC Light 1, Warm Dark 0; **Caregiver High Contrast 2** — `popover/primary-foreground` → `colors/neutral-900` and `popover/secondary-foreground` → `colors/neutral-0`, the Figma-side fixes for a white-on-white and a dark-on-dark popover (Jira C360-44333 #628192, 2026-08-20), which reached the export only in the 2026-09-08 re-export.
- All six token files are **byte-identical** to their owner-export members — copied, never transformed. No token path was deleted.
- `config/variable-export-manifest.json` — six artifacts' `sha256` + `tokenDefinitions` recomputed, Caregiver + Primitives `sourceArchiveSha256` refreshed, `logicalTotals.agencySemantics` 251 → 263.
- `scripts/sync-owner-variable-exports.mjs` — the hard-coded authority path `/Users/netsmartz/Documents/Variables` (absent since the 2026-08-24 move) corrected to `/Users/netsmartz/Documents/Design-System/Variables`; hard-coded total 251 → 263.
- `README.md` — Agency counts 251/208 → 263/220.

### Verified
- All six repo gates pass. `verify:variables` initially **failed** on the stale manifest hashes — caught by the gate, fixed by recomputing from the files, not by editing the expectation.
- Independent re-diff (`Design-System/alignment-2026-09-08/ds_diff_v2.py`) against the exports: **every** local↔GitHub row MATCH; primitives 264/264.

---

## [3.2.1] — 2026-09-08

Live re-verification of measured Figma nodes (the Figma-AI lane had edited them without notice). Contract corrections only.

### Changed
- **Primary Side Navigation → 1.1.0** — adds the link **Hover** state now present in Figma (3 variants `27364:6859 / 27364:7900 / 27364:7908`, bound to `surface/brand-hover`); nav-link variants 6 → 9; defect T1 resolved. **New defect T7:** that token contrasts with the rail text only in Light (5.72:1) and fails Dark / High Contrast / HC Light / Warm Dark (1.0–1.7:1; HC Light icon 1.00:1 = invisible) — proposed a new `sidebar/primary-hover` token (an add, permitted under the naming lock). T3 extended with all-mode figures (HC selected = 1.92:1).
- **Page Setup pattern §4** — the demo page's sample table was re-laid in Figma (115 / 953 / 60 → 200 / 598 / 330; same 1128); grid, gutters and the CS-TBL-13 rule are unchanged. The section is now "Page Layout Patterns" and holds two further pages (`pattern-page-empty-state` 27401:30856, `pattern-page-form-grid` 27401:31504) to be added as variants of this shell.

### Notice
- Figma-side edits to measured nodes (renames, re-layouts, new variants) currently reach no session. Re-verify a contract's nodes live before building from it; report drift through the normal gate.

---

## [3.2.0] — 2026-09-04

Component & pattern contract layer for the **Agency** portal. Every component below
consumes semantic tokens only (no `--p-*` primitives, no hardcoded hex) and holds in
light / dark / high-contrast. This is the shared source other AI tools must build from —
do not reinvent these structures.

### Added — components (Layer 3)
- **Profile Side Navigation** (`portals/agency/components/profile-side-navigation.*`) — the grey record-nav rail: top actions (48h), profile card (70px avatar + camera badge, name/timezone, full-width **View Notes**, 5 contact rows at 18px icons), then the nav list (30px rows, 8px inset). **v1.1.0** adds the card **click model** (Singh, 2026-09-04): *expanded* → every action is individually clickable; *collapsed* → only the avatar shows and the **whole rail** is one tap target that expands the card.
- **Primary Side Navigation** (`primary-side-navigation.*`) — the blue rail, **48 collapsed / 158 expanded**, full height (outermost, left of the header): white logo header (52h), toggle, nav icons (40h; first selected uses `--sidebar-ring`), copyright. Includes a focus-ring WCAG fix (`:focus-visible` → `--sidebar-text`, not `--sidebar-ring`) and selected-icon token wiring (`--sidebar-icon-active`).
- **Tabs** (`tabs.*`) — **Primary** (underline) + **Secondary** (segmented).

### Added — patterns (Layer 4)
- **Side Navigation pattern** (`patterns/side-navigation.md`) — how Primary (blue) and Profile (grey) rails compose and when each is used.
- **Page Setup pattern** (`patterns/page-setup.md`) — the **basic page skeleton** every content page reuses: grid `Primary 48/158 + Shell 1392` → `Global header 52` over `[Profile 240 | Content = shell−240]`, content stack `Tabs → Data container → Page info`, **12px (`--spacing-lg`) gutter** on every content block. Grid reconciles 16/16 by dry-run. **Status: assembled, visual sign-off pending.**

### Changed — header structure (gutter ruling)
- **Page Header** (`page-header.*`) — **v1.1.0**: new **`completeHeader`** molecule that owns a self-contained **12px (`--spacing-lg`) gutter on all four sides** (header left/right margin ruling, Figma node `27232:65833`). The header *atom* stays 0-padding; pages must **not** add page-level padding on top of the complete header.

### Changed — column setting
- **Column Arrangement** (`column-arrangement.*`) — **v2.1.0**: adds the **"Column(s)" trigger button** (field-style, 30px, 4 states: default / hover / active-selected / disabled) that opens the column-setting panel and stays highlighted while it is open. Full behaviour spec (search / check / drag / Apply / Cancel / Reset); frozen column = first row in "Selected", tied to the existing table rule **CS-TBL-13**.
- **Table** (`table.*`) — **v3.0.0**: column-width bands ruled, density settled, **frozen-left + scrollable + frozen-right** structure (CS-TBL-13: first & last columns frozen).

### Verified
- Component CSS token-purity: `validate-design-components-dryrun.sh` — 9 components, semantic tokens only, 0 primitives / 0 hardcoded hex.
- Page-setup grid + 12px gutter: `validate-page-setup-dryrun.sh` — 16/16 sums reconcile against measured Figma.

---

## [3.1.0] — 2026-07-27

### Added
- **Warm Dark theme** (`_theme-warm-dark.scss`): 204 tokens, 180 using direct hex (warm palette), 24 aliased to primitives. ON HOLD for full aliasing.
- **HC Light theme** (`_theme-hc-light.scss`): 204 tokens, all aliased to primitives. WCAG AAA light background high contrast.
- **Typography primitives**: `--line-height-14`, `--line-height-16`, `--line-height-32`, `--line-height-40`, `--line-height-44` added to `_typography.scss`.

### Changed
- **`_theme-light.scss`**: Synced from 187 → 204 tokens. Added `field/bg-success`, `field/border-success`, `field/bg-warning`, `field/border-warning`, `text/links-hover`, `text/links-visited`, `surface/overlay`, `surface/scrim`, `surface/skeleton`, `surface/skeleton-active`, `border/focus`, `action/focus/*`, `action/toggle/*`, `elevation/sm-xl`, `chart/6-10`.
- **`_theme-dark.scss`**: Synced from 185 → 204 tokens. Same missing tokens added.
- **`_theme-high-contrast.scss`**: Synced from 185 → 204 tokens. Same missing tokens added.
- **`_density.scss`**: Fixed `line-height/heading-2` value (28→32px), added missing `line-height/display` (44px), `line-height/caption` (16px), `line-height/micro` (14px), `letter-spacing/heading` (-0.24px).
- **`tailwind.config.js`**: Updated from 128 → 204 token bindings (100% coverage). Version bumped to 2.6.2.
- **`styles.scss`**: Enabled high-contrast import, added warm-dark and hc-light imports.
- **`AI_CONTEXT.md`**: Agency Portal updated to 247 vars across 3 collections.
- **`src/styles/README.md`**: Updated verification statuses, added all 5 theme modes, removed obsolete `VERIFICATION-LOG.md` reference.

### Fixed
- All 5 theme files now have exactly 204 CSS custom properties each (1,020 total declarations).
- Tailwind CSS utilities now cover 100% of design system tokens.
- Typography/density tokens now match Figma Density Modes collection exactly.

---

## [3.0.0] — 2026-07-24

### Added
- **Multi-Portal Support**: Restructured repository architecture to support multi-portal semantic isolation (`portals/agency/`, `portals/caregiver/`).
- **Caregiver Portal Semantic Tokens (`portals/caregiver/semantic-tokens.json`)**: Complete 171 variables across 3 collections (Color Theme 134, Density Modes 23, General 14) extracted directly from Figma file `TSOq0ugv6zfr6gFZh5zYrP`.
- **Caregiver Portal Documentation (`portals/caregiver/README.md`)**: Complete token group breakdown, 3-mode color theme guide, density scale documentation, and known issues.
- **Agency Portal Documentation (`portals/agency/README.md`)**: Agency-exclusive semantic layer reference (204 variables across 5 modes).
- **Repository Guardrails (`GUARDRAILS.md`)**: Enforced scope boundaries, allowed vs prohibited repo content rules, and portal isolation guidelines.
- **Figma Query Hub Integration**: Integrated direct cross-reference to Jira C360-44222 for complex AI Figma queries.

### Changed
- **`README.md`**: Updated with multi-portal architecture overview, portal registry table, 3-tier rules, and portal comparison matrix.
- **`AI_CONTEXT.md`**: Updated with strict portal exclusivity rules, 7 mandatory AI rules, query hub instructions, and data source priorities.

### Removed
- **Obsolete Files (10)**: Deleted legacy handoff docs (`CODEX-HANDOFF-primitives-integration.md`, `HANDOFF-PLAN.md`, `HIGH-CONTRAST-FIGMA-HANDOFF.md`, `REPO-VERIFICATION-2026-07-07.md`, `VERIFICATION-LOG.md`) and outdated version snapshots (`ds-tokens-v2.4.4.json`, `ds-tokens-v2.4.5.json`, `ds-tokens-v2.4.6.json`, `ds-tokens-v2.4.7.json`, `ds-tokens-v2.4.9.json`).

## [2.6.2] — 2026-07-24

### Added
- Agency Density Modes documentation (29 variables: font-size, line-height, spacing, letter-spacing).
- Agency General collection documentation (14 variables: border-radius, font-weight, font-family).
- Warm Dark mode HOLD status documentation (180/204 raw hex values pending warm primitive palette).

### Changed
- **Portal Registry**: Agency total updated from 204 → 247 across 3 collections (Color Modes 204 × 5 modes, Density Modes 29 × 1 mode, General 14 × 1 mode).
- **`portals/agency/README.md`**: Expanded to cover all 3 collections and 247 total variables.

---

## [2.6.0] — 2026-07-20

### Added
- **HC Light mode** — 5th theme mode (white bg, black text, darkened brand colors) for users who need high contrast on light backgrounds
- **20 new semantic tokens:**
  - `surface/overlay`, `surface/scrim` — modal/dialog overlays
  - `border/focus` — dedicated focus ring color (yellow in HC modes)
  - `field/bg-success`, `field/border-success`, `field/bg-warning`, `field/border-warning` — field validation states
  - `text/links-hover`, `text/links-visited` — link interaction states
  - `surface/skeleton`, `surface/skeleton-active` — loading skeleton animations
  - `action/focus/ring`, `action/focus/ring-offset` — focus ring system
  - `action/toggle/*` (11 tokens) — checkbox/switch/radio toggle states
  - `elevation/sm`, `elevation/md`, `elevation/lg`, `elevation/xl` — MD3 tonal elevation scale
  - `chart/6` through `chart/10` — extended chart palette (purple, orange, cyan, forest, light blue)

### Changed
- **Light mode remappings (6):**
  - `action/primary/bg`: Brandblue-500 → Brandblue-600 (better contrast)
  - `action/primary/hover`: Brandblue-600 → Brandblue-700
  - `action/primary/pressed`: Brandblue-700 → Brandblue-800
  - `action/primary/text-hard`: Brandblue-500 → Brandblue-600
  - `action/ghost/text-hard`: Brandblue-600 → Brandblue-800
  - `text/tertiary`: neutral-400 → neutral-500 (WCAG AA fix)
- **Dark mode remappings (16):** Full dark mode audit — button labels, border scale, surface tiers, status backgrounds all corrected to proper Figma primitive aliases
- **Naming cleanup (13 renames):** `action/Toggle/*` → `action/toggle/*` (lowercase), `tool-tip/*` → `tooltip/*`

### Fixed
- Button label contrast in Dark mode — `action/primary/text-neutral` now resolves to neutral-950 (#020617) instead of neutral-0
- `border/subtle` Dark mode — neutral-400 → neutral-500 for better visibility
- `action/disabled/text-neutral` HC mode — neutral-300 → neutral-200 for WCAG compliance
- All status background tokens Dark mode — corrected from wrong -900 to proper -950 primitives

### Verified
- 204 COLOR variables × 5 modes = 1,020 values
- 840 alias references, 0 broken
- Visual QA passed on 7 component pages
- WCAG AA contrast verified for all text/bg pairs

---

## [2.5.0] - 2026-06-30 -- CORRECTED

### **MAJOR CORRECTION:** Angular Material M3 reinstated as primary component library

- **Stack:** Angular 19 + **Angular Material M3 (PRIMARY)** + Tailwind CSS v4 + SCSS
- Added `material-theme-overrides.scss` with complete Material M3 theming
- Updated all documentation to reflect Material M3 priority
- Updated documentation to reflect Material M3 theming approach (--mdc-* CSS custom properties)

---

## [2.4.0] - 2026-06-30

### Breaking Changes
- **Stack Migration**: Removed React, shadcn/ui, and Angular Material dependencies
- **Framework**: Angular 19 standalone components ONLY
- **Styling**: Tailwind CSS + SCSS custom properties only — no CSS-in-JS, no inline styles
- **Icons**: Migrated to Google Material Symbols Rounded (`<span class="material-symbols-rounded">`)
- **Content globs** updated from `{html,ts,jsx,tsx}` to `{html,ts,scss}`

### Added
- Angular 19 standalone component architecture documentation
- SCSS token variable system (`var(--color-*)` custom properties)
- Google Material Symbols Rounded icon library integration
- WCAG AA touch target enforcement (`minHeight.touch: 40px`, `minHeight.touch-lg: 48px`)
- `semantic.icon` token group with `library`, `sizeDefault`, `sizeSm`, `sizeLg`
- `ds-tokens-v2.4.0.json` versioned snapshot
- Shadow token set (sm, md, lg, xl, none) in primitives
- `snapshotOf` metadata field in versioned token files
- Stack metadata field in all token files

### Changed
- `tailwind.config.js`: content paths now target `.scss` instead of `.jsx/.tsx`
- `tailwind.config.js`: removed React/JSX component glob patterns
- All documentation updated to reflect Angular 19 + Tailwind CSS + SCSS stack
- `ds-tokens-latest.json` version bumped to `2.4.0`
- Tailwind `fontFamily` now uses Inter (sans) and JetBrains Mono (mono)
- README badges updated to reflect v2.4.0

### Removed
- React component references from all documentation
- shadcn/ui component references
- Angular Material component references
- PrimeNG references
- CSS-in-JS patterns from guidelines
- JSX/TSX content glob from tailwind.config.js

### Fixed
- Touch target minimum sizes now explicitly enforced via Tailwind `minHeight`/`minWidth`
- Semantic token references consistently use SCSS `var(--color-*)` pattern

---

## [2.3.0] - 2025-01-01

### Added
- Full primitive token set: colors, spacing, typography, radius, shadow, opacity, z-index
- Semantic token layer mapped to primitives (brand, neutral, status, surface, text, border)
- Component-level token mapping for 40+ components
- Tailwind CSS v4 configuration with full token integration
- AI handoff reference documentation
- GitHub Actions workflow for automated version bumping
- Component mapping JSON with Figma node IDs
- Export pipeline documentation

### Changed
- Migrated from scattered color variables to structured primitive/semantic architecture
- Updated typography scale to 13-step fluid system
- Standardized spacing to 8px base grid

### Fixed
- ADA compliance gaps in status colors (WCAG AA 4.5:1 contrast ratios)
- Inconsistent border-radius values across components

---

## [2.0.0] - 2024-06-01

### Added
- Initial design system structure
- Basic color primitives
- Component library foundations

---

## [1.0.0] - 2024-01-01

### Added
- Initial Figma file setup
- Brand color palette
- Typography foundations
