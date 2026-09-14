# Forensic audit — Figma ↔ GitHub component linking, descriptions & pipeline

**Requested by:** Singh, 2026-09-14 ("check forensically… how we can improve the Figma to
GitHub component linking and description so all components and UI kit behave the same, in an
agentically automated way; Jira's role included").
**Method:** 4-dimension multi-agent audit over the clean clone @ `8473736` (link integrity,
pipeline gaps, guidelines quality, naming consistency), every finding adversarially
re-verified against the actual files; plus live Figma reads (form-field-primary description,
page-headers guidelines, avatar section) and live GitHub/Jira checks the same day.
**Verification note:** 19 findings are adversarially CONFIRMED. The guidelines-quality
verifier pass was cut short by a usage-credit outage — those findings (§4) are evidence-backed
by the finder but **not independently re-verified**; treat each as "check before acting".

---

## 1. The core problem, proven

Figma descriptions and GitHub contracts are **two hand-maintained copies with no sync
mechanism** — and they diverged within 24 hours of being written.

Live read of `form-field-primary` (26938:65997) on 2026-09-14 — its description (mass-written
2026-09-10) teaches, today:

- `grid-template-rows: 26px 34px (total 62px)` → the live contract is **30 + 34 = 66px**
  (the exact defect Singh flagged and we fixed on 2026-09-11).
- "disabled → bg: NONE (defect D-1)" → resolved; `field/bg-disabled` is bound.
- "GitHub Contract: portals/agency/components/**field-type-1.md**" + the Documentation link →
  **HTTP 404 verified** — the file was renamed to `form-field-primary.md` on 2026-09-11 and
  GitHub does not redirect renamed paths.

All 28 descriptions written 2026-09-10 predate the 2026-09-11 rename, so every form-field
description link is dead, and any AI or developer reading Figma today learns wrong geometry.

## 2. Confirmed findings (adversarially verified)

### Link integrity
| # | Finding | Severity |
|---|---|---|
| L1 | 6 old paths (`field-type-1/2/3.md/.json`) 404 on GitHub; nothing (stub/alias/tombstone) protects any old URL | HIGH |
| L2 | 6 of 16 contracts had **no Figma link at all** (button, column-arrangement, form-fields, form-field-primary/secondary/tertiary) + both pattern contracts — the flagship field family dead-ended in both directions | HIGH → **fixed today** |
| L3 | 9 of 10 linked contracts link only the *guidelines frame*, not the component node itself (only info-chips linked its real set) | MEDIUM |
| L4 | The historical form-field file still hyperlinked the two dead field-type paths | MEDIUM → **fixed today** |
| L5 | All 16+18 contractPaths in both mappings resolve on disk — no missing files | (clean) |

### Pipeline gaps (what is automated vs. silent)
| # | Finding | Severity |
|---|---|---|
| P1 | `sync-owner-variable-exports.mjs` hardcoded `agencySemantics: 263` — the next sync run would regress the manifest to 263 and break the test suite (the manifest says 270) | HIGH → **fixed today** |
| P2 | CI never runs the strict gates: `validate` downgrades real defects to NOTICE and exits 0 (14 null componentKeys + duplicate-key notices pass green); `release:check` is run by no workflow | HIGH |
| P3 | **No mechanism reads or checks Figma descriptions** — description↔contract drift (§1) is structurally undetectable today | HIGH |
| P4 | Gallery catalog is untracked in git (no history, no CI, loss risk) — local-only is Singh's ruling, but unversioned is a separate risk | HIGH |
| P5 | No export-freshness check (verify:variables checks byte parity only; snapshot maxAgeDays policy is vacuous — `snapshots/` doesn't exist) | MEDIUM |
| P6 | Byte-parity vs the owner's real exports runs only manually on this Mac; CI runs manifest-only mode (self-consistent — a hand-edited file + rehashed manifest would pass) | MEDIUM |

### Naming (the 2026-09-10 Figma rename wave, repo still on old names)
| # | Finding | Severity |
|---|---|---|
| N1 | Root `components/component-mapping.json`: 11 load-bearing name fields no longer match live Figma (`info chips`, `Inline Dropdown Patterns`, `Page Layout Patterns`, `table`, …) | HIGH |
| N2 | `filters.*` (13+7 old-name lines), `table.*` (15+7 — build instructions point at `table_head`/`table_cell` which no longer exist), `info-chips.*` (0 adoption of "Alerts & Messages"), "Primary Sidebar" appears nowhere (8 files still say Page Layout Patterns) | HIGH |
| N3 | DDM/Column-Arrangement contracts + kit CSS provenance headers + `components/00-README-COMPONENTS.md` carry old names (node ids still valid) | MEDIUM |

**Blocked on Figma-AI:** the authoritative 22-component/10-section rename list + 14
componentKeys were requested on C360-44222 on 2026-09-11 and are still unanswered (3 days).
Doing the renames from our own partial observations risks a second drift — this stays blocked
until the list arrives (now re-routed via C360-44235; see §5).

## 3. The Jira routing failure (found and fixed today)

Singh's designed pipeline: Figma-AI can't push to GitHub → it parks component info as Jira
comments → Claude uploads to the repo. **C360-44235** is that bridge (its own rules define the
`⏳ PENDING` → `✅ DONE`-in-same-comment lifecycle). It failed because:

1. The repo's README/AI_CONTEXT named the **epic** prominently and gave no routing rule → on
   2026-09-14 Figma-AI posted its Avatar family spec on the epic (C360-3526 #633902).
2. C360-44235's own description was stamped "Legacy… superseded" by the Aug-03 variable-authority
   block, making the right channel look retired.

**Fixed:** canonical routing table added to `AI_CONTEXT.md` (+ README pointer); C360-44235's
description now says: retired for variable *values* only, LIVE for component information;
routing-correction comment posted on the epic (#633907). The Avatar spec itself was validated
live (all node ids + variant counts match; componentKeys unverifiable from here; Angular
selectors fabricated) and uploaded as `portals/agency/components/avatar.md/.json` + mapping
entries — the bridge pipeline working end-to-end, with validation in the middle.

## 4. Guidelines-quality findings (evidence-backed, NOT independently re-verified)

- **Schema vs blessed reality:** `component-contract`/mapping schema still rejects
  `componentKey: null` and the `componentKeyStatus` field the mapping contract amendment
  blesses; the gate emits "invalid/duplicate componentKey" noise for the documented PENDING state.
- **Zero shipped enforcement:** contracts are never validated against
  `schemas/component-contract.schema.json`; the 68 "How a script tests it" clauses in
  rules/universal have no shipped checks; the attested-snapshot drift detector has never run
  (no snapshots exist).
- **Contradictions:** `naming.md` ("cs- prefix unregulated") vs `css-approach.md` UIG-084
  (Singh ruling: `.cs-` required); UIG-083 (read variables live from Figma) vs the
  variable-authority rule (never read variables from Figma); `docs/AI-TOOLS-GUIDE.md` still
  teaches content the CONTRADICTIONS register ruled wrong.
- **Hand-duplicated facts already diverged:** component inventory in 4 places (contract $meta,
  README table, gallery registry, artifact); token counts restated in
  `rules/portals/agency/STATUS.md` (251) vs manifest (270); gallery CSS lacks the
  `.cs-btn--ai` block the repo's buttons.css has.
- **Governance decay:** the whole migrated rulebook is "Singh ratification pending" for 3+
  weeks with no aging/escalation; rules/governance still mandates a folder architecture
  (01-universal/…04-checks/) that doesn't exist in this repo.

## 5. Improvement proposal — make it agentic instead of hand-maintained

**Principle (proven again today): a rule that depends on every tool choosing to obey is a
wish. Facts must live in ONE place; everything else is generated or gate-checked.**

1. **Contracts are the single source; Figma descriptions become generated output.**
   On every contract merge, repo-side AI generates a description block from the contract
   (geometry, states, tokens, GitHub link) stamped `contract-name@version · commit <sha>`, and
   posts it as a `⏳ PENDING` task on C360-44235; Figma-AI applies it verbatim and marks DONE.
   The stamp makes staleness machine-detectable (description sha ≠ main sha → stale).
   *This directly prevents §1 recurring.*
2. **Link by node-id, never by name; both directions.** Every contract now carries its Figma
   deep link (done today). Figma descriptions should link GitHub through a stable path —
   either the mapping index (never renamed) or with a repo rule: any contract rename ships a
   redirect stub at the old path in the same PR.
3. **New gate: `validate:links`** — checks every contract has a well-formed Figma link with
   the right file key, every internal relative link resolves, and mapping ↔ contract ↔
   gallery-registry names/ids agree. Wire into `npm run validate` + CI. *Catches L1–L4, N1–N3
   classes automatically.*
4. **Schema + strictness fixes:** amend the schema to accept `componentKey: null` +
   `componentKeyStatus` (matching the ratified amendment); validate contract JSONs against the
   schema in CI; run `release:check` (strict) in CI so real defects fail instead of NOTICE-ing.
5. **Rename protocol (Jira role):** Figma-side renames are Figma-AI's to announce — as a
   PENDING task on C360-44235 (routing now fixed) listing old→new per node-id. Repo-side, the
   close-out step is a mechanical old-name sweep (grep) before the task is marked DONE.
6. **Jira SLA:** asks to Figma-AI now sit unanswered for days (C360-44222, 3 days). Every
   PENDING bridge task should carry an "owed by" date; a weekly board-vs-reality sweep (the
   pending Jira-rule proposal #3, still awaiting the best-practice research Singh asked for)
   would surface silent tasks. The routing fix removes the "couldn't find the ticket" excuse.
7. **Gallery:** keep local per Singh's ruling, but put it under version control (its own git
   repo or a private branch) — untracked = one disk failure from gone (P4).
8. **Contradiction rulings for Singh (one at a time, per his one-by-one rule):** cs- prefix
   (naming.md vs UIG-084), UIG-083 vs variable authority, AI-TOOLS-GUIDE retirement, rulebook
   ratification.

**Fixed in this PR:** routing (README/AI_CONTEXT/44235), Avatar family upload, sync-script 263→270,
8 contracts given Figma deep links, historical dead links, form-field-secondary/tertiary H1s,
README stale counts.
**Queued for Figma-AI via C360-44235:** 28-description refresh (66px, resolved defects, new
URLs), rename list, 14 componentKeys, Avatar naming cleanup (avartar_user typo etc.).
**Awaiting Singh:** proposals 3/4/7 (new gates + gallery versioning), the §4 contradiction
rulings, and the Jira rule-change research he conditioned approval on.
