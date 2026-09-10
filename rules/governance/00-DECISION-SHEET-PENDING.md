<!--
=============================================================================
FILE BRIEF: Decisions ONLY SINGH can make, gathered in one page per
ECOSYSTEM-RULES §19.2 (each needs its own logged GO-AHEAD; a general "proceed"
does not count). NOTHING in this sheet is ratified yet. The migration batch
(moving memory/ files) does not run until section D has his word per file.
CREATOR: Fable-WOUND-MGMT | 2026-08-24
STATUS: ⏳ ALL ITEMS PENDING
=============================================================================
-->

# Decision sheet — needs Singh's GO-AHEAD, item by item

Reply per item: **GO** / **NO** / your change. Layman summaries first, detail after.

## A. Class-naming rules become blocking

Your own rulebook (SPEC-07) has the class-naming rules you asked for — but rated **INFO**
(report-only, weakest level). Proposal: for all NEW work they become **BLOCK** (build fails):

- **UIG-069** — class names follow the BEM-ish kebab pattern (regex already written)
- **UIG-070** — kebab-case only; no camelCase, no snake_case

**[ ] GO / NO: ______**

## B. The composed class-naming rule

Two of your documents state naming differently and they FIT TOGETHER rather than conflict.
Proposal — one composed rule in `01-universal/naming.md`:

> One reusable kebab-case component class per UI element (e.g. `.cs-checkbox`) —
> `__element` and `--modifier` extensions allowed; `--` is reserved for modifiers only
> (one live portal misuses it as an element separator).

**[ ] GO / NO: ______**

## C. Re-grounding `primitives.md` provenance

Its numbers are right, but it cites "live-verified in Figma" — a method your own
VARIABLE-AUTHORITY-WORKFLOW now prohibits (values come from your Variables exports, never
live Figma queries). Proposal: keep every number, replace the provenance line with the
export + manifest reference.

**[ ] GO / NO: ______**

## D. The memory/ move table — one GO/NO per row

Rule: anything moved is **deleted at source** (one sha-recorded rollback copy in
`_BACKUPS/` with a SUPERSEDED banner). All references across Documents get redirected
(with hard exclusions: `Agency/memory/` — a separate portal-local tree with its own
`icons.md` — plus append-only logs and archives). Product knowledge STAYS in memory/.

| File | Recommendation | Why | GO/NO |
|---|---|---|---|
| `icons.md` | **MOVE** → `01-universal/iconography.md` | Pure universal rule — your 2026-06-17 inline-SVG decision | [ ] |
| `brand.md` | **MOVE** → feeds `01-universal/typography.md` + brand section | Universal type/brand rules. Note: MASTER-AI-INSTRUCTIONS files it as "Product memory" — your call overrides | [ ] |
| `components-checkbox.md` | **MOVE** → feeds `02-components/checkbox.md` | Component spec, "ALL portals" by its own title | [ ] |
| `components-filter-pill.md` | **MOVE** → feeds `02-components/` filter/chips docs | Same | [ ] |
| `decisions/cross-portal-decisions.md` | **MOVE** → folder root decisions record | Cross-portal by name | [ ] |
| `tech-stack.md` | **STAY** — css-approach.md cites its CSS facts | Mostly dev/repo knowledge (branches, repos); only the CSS-approach lines are rules | [ ] |
| `primitives.md` + `primitives_audit.md` | **STAY together** (with item C's re-ground) | Design-system variable knowledge — governed by Variables/ + repo, not by Html Rules | [ ] |
| `decisions/setup-architecture.md` | **STAY + superseded-note** | Its text ("brand/glossary live once in root memory/") becomes false after the moves — the note prevents a decoy | [ ] |
| `glossary.md`, `product.md`, `user-profiles.md`, `github.md`, `jira-profiling-structure.md`, `C360-45362-*.md`, `people/`, `external/` | **STAY — untouched** | Product knowledge, not rules | [ ] |

## E. Ratify the 8-rules transcription

`00-AI-MANDATORY-RULES.md` now holds your 8 mandatory rules, copied word-for-word from
epic C360-3526 (fetched 2026-08-24; epic last updated 2026-08-21 20:02). Please skim it
once against the epic — after your GO it becomes citable.

**[ ] GO / NO: ______**

## F. Ratify EX-001 (the one exception created today)

Epic Rule 8 says tech-stack details never appear in design-system deliverables. Your
css-approach request requires naming per-portal styling approaches in THIS folder. EX-001
scopes that exception to exactly one file. 

**[ ] GO / NO: ______**
