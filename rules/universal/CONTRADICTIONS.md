<!--
=============================================================================
FILE BRIEF: Register of every documented contradiction between the sources the
universal rules are built from. Each row quotes BOTH values with its source.
A winner is named ONLY where Singh has already ruled; everything else is OPEN
and must never be encoded silently by any rule or check. This file exists
because the 2026-08-21 build rejection was caused by exactly this class of
problem: authoritative-looking sources disagreeing while nobody recorded it.
CREATOR: Fable-WOUND-MGMT (C360-45862), from verified explorer reports | 2026-08-24
LAST MODIFIER: Fable-WOUND-MGMT | 2026-08-24
=============================================================================
-->

# Contradictions register

**Rule for every AI tool:** a rule or check must test only UNCONTESTED invariants. Where a
row below is OPEN, neither value may be encoded — report, never fail, per SPEC-07 §G's own
discipline: *"A rule must never encode a value Singh has not settled."*

Status: ✅ RULED (winner named, by whom) · ⛔ OPEN (goes to Singh / Figma AI via Opus).

## Cross-source contradictions (origin/main vs local truth), found 2026-08-24

| ID | Topic | Value A | Value B | Status |
|---|---|---|---|---|
| C1 | **Icon rendering method** | `origin/main:docs/AI-TOOLS-GUIDE.md`: Material Symbols via the **web font** (`<span class="material-symbols-rounded">` + Google Fonts `<link>`) | `Office_Work/memory/icons.md`: **inline SVG sprite, NOT the web font** — "renders the literal word when the Google font fails to load — which it did in a live screenshot" | ✅ RULED — **Singh 2026-06-17: inline SVG.** AI-TOOLS-GUIDE documents the method that caused a verified live failure and is superseded on this point |
| C2 | **Brand blue** | AI-TOOLS-GUIDE: `--color-brand-primary // #2563EB` | `docs/CARESMARTZ360-DS-REFERENCE.md`: `#0077FF` *"(corrected 2026-07-08 — verified against live Figma… was #2563EB, which turned out to be Tailwind's stock default)"*; `memory/brand.md` agrees: `#0077FF` | ✅ RULED — **#0077FF** (origin/main corrected itself; epic Rule 3 locks Brandblue) |
| C3 | **Prefix policy** | `origin/main:README.md`: "Prefix-Free Custom Properties … strictly omitting legacy portal prefixes like `--agency-`" | `origin/main:design-tokens/agency-semantic-layer.md` is entirely `--agency-*` prefixed | ✅ RULED by README's own mandate — prefix-free; the prefixed file is a named legacy exception to purge (repo work, Opus's lane) |
| C4 | **Tailwind** | AI-TOOLS-GUIDE: "Styling \| Tailwind CSS + SCSS custom properties ONLY" | `memory/tech-stack.md`: "**NO Tailwind in AgencyWebApp** (debate-verified 2026-07-06, DEBATE-006). Tailwind remains the *intent* for Caregiver portal — unverified" ; `CGPortal/CLAUDE.md`: "Use Tailwind only" | ✅ RULED by evidence — **CSS methodology is portal-scoped, never blanket.** See `css-approach.md` |
| C5 | **CDN links vs self-contained prototypes** | AI-TOOLS-GUIDE requires a Google Fonts `<link>` in index.html | SPEC-07 UIG-075: self-contained output, no `<link rel="stylesheet">`, no CDN | ✅ RULED per SPEC-07's own H-10 resolution — inline tokens into `:root`; *"the rule that must not be traded away is that values resolve through tokens — not the file layout"* |
| C6 | **Provenance method for primitives** | `docs/VARIABLE-AUTHORITY-WORKFLOW.md`: "AI tools must not query Figma to infer or correct variable values" | `memory/primitives.md` cites "live-verified 2026-07-07 (live Figma + token export)" | ⛔ OPEN — decision-sheet item C (keep the numbers, re-ground the citation on export+manifest) |
| C7 | **Role of Figma file `4bh29laapcuKBTghfaRXF0`** | `origin/main:README.md`: Agency's current **primary** file | `memory/primitives.md`: "the OLDER V1 (audited 2026-06-08) — kept for history"; canonical primitives = `DJBpjoXPMEw6bBAByIQaAy` | ⛔ OPEN as written — both may be true for different layers (Agency semantics vs V1 primitives); needs one sentence from Singh naming each file's role |
| C8 | **Spacing grid & radius-md** | AI-TOOLS-GUIDE: "4px base grid", `--radius-md // 4px` | `origin/main:CHANGELOG.md`: "Standardized spacing to 8px base grid"; DS-REFERENCE & agency-semantic-layer: `radius-md/lg = 8px` | ⛔ OPEN — to Singh/Figma AI via Opus. Note DS-REFERENCE's own warning: Figma names spacing by literal px, Tailwind classic by step — never cross-reference the numbers |
| C9 | **`!important`** | AI-TOOLS-GUIDE: "NEVER use" | `docs/CARESMARTZ360-DS-REFERENCE.md:223` uses it once | ✅ RULED — never (SPEC-07 UIG-008 + ECOSYSTEM-RULES §10 agree); the one usage is a defect for Opus's repo lane |
| C10 | **Icon markup in Agency/CLAUDE.md** | `Agency/CLAUDE.md` L92-95: `<span class="mi">name</span>` — the ligature/web-font markup | `memory/icons.md` deprecates exactly that method (see C1) | ✅ RULED — same ruling as C1; the CLAUDE.md line is corrected in the supersession batch (step 6) |

## SPEC-07's own recorded conflicts that affect universal rules

| ID | Topic | Competing values | Status |
|---|---|---|---|
| S1 | **Breakpoint set** | Four non-identical definitions. Uncontested: design widths **1200 / 800 / 300**, tablet band **800–1199**. Contested: mobile ceiling **480 vs 799**; desktop start **1200 vs 1440** | ⛔ OPEN — flag F-001; `responsive.md` encodes only the uncontested part |
| S2 | **Token-name authority: export vs pinned commit** | Variables export = 220 Agency Color-Mode names (263 incl. all collections); pinned `fc7de14` = 208 — and cannot express the live input border (`field/border-hard`) | ✅ RULED by SPEC-07 C.4 + VARIABLE-AUTHORITY-WORKFLOW — **validate names against the export, never the pinned commit** |
| S3 | **Button radius / padding-x / gap** | radius 4 (live binding) vs 6 (`radius-md` also real); padding-x 12 vs 16; gap 8 vs 4 | ⛔ OPEN — SPEC-07 H-8; component doc carries both until ruled |
| S4 | **Button height across portals** | 30px (Agency: SPEC-07 UIG-056, AGENCY-TOKENS §D.4, Legacy prototype) vs 32px (CGPortal `--btn-min-height`) | ⛔ OPEN — may be a legitimate per-portal difference; needs Singh's word before either is called an error |
| S5 | **Header height** | 52px (two independent Agency sources) vs 56px (CGPortal `h-14`) | ⛔ OPEN — same shape as S4 |
| S6 | **Footer height & layout** | 46px right-aligned (SPEC-07 UIG-055) vs 54px space-between (Legacy prototype) — possibly two DIFFERENT footers (form footer vs page action bar) | ⛔ OPEN — the pattern doc must name both as distinct patterns or Singh merges them |
| S7 | **Tabs** | 30px joined-segment vs 44px segmented vs 34px pill — three visual models; AGENCY-TOKENS §D.7: "no tab measurements or tab tokens exist in any source" | ⛔ OPEN — in `02-components/PATTERN-GAP-LIST.md` for the Design System Agents lane |
| S8 | **Group-header height & background** | 64px (assembled, measured) vs 80px (component registry); background: 3 candidates, none confirmed | ⛔ OPEN — SPEC-07 H-18/H-4 |
| S9 | **Type 2 option gap** | 12px (measured 3×, two docs) vs 8px (a MUST rule + audit) vs 8/16 split | ⛔ OPEN — SPEC-07 H-5; both are real tokens, checkers accept either and report |
| S10 | **Density vocabulary** | `compact/default/comfortable` (poc selectors) vs `small/medium/large` (caresmartz360 repo comment over MISMATCHED selectors) vs `Default/Large/Small` (Caregiver export) | ⛔ OPEN — flag F-004 |
| S11 | **Legacy `X-*` variables in the side nav** | Five `X-*` names live in Figma bindings; near-equivalents exist in the semantic layer | ⛔ OPEN — SPEC-07 H-6: "choosing a substitute is Singh's call, not a checker's" |

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Initial register: C1–C10 + S1–S11, from the three verified explorer reports (contracts read via `git show origin/main`, SPEC-07 classification, feature-folder sweep) | Approved assembly plan, step 2 |
