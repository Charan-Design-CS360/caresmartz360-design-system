# Figma ↔ GitHub Linking — the complete record

**Audience:** any AI tool or developer (incl. GitHub Copilot) needing the full picture of how
this design system connects Figma and GitHub: what exists, who does what, every problem found,
every fix shipped, and what is validated as working today.
**State as of:** 2026-09-16, `main` @ `dec3105`. **Owner:** Charanjeet Singh (design-system owner).

---

## 1. The architecture that runs today

Two channels move design information from Figma into this repo (plus one asset fetcher).
Nothing merges itself; everything passes strict CI and human/AI review.

```
CHANNEL 1 — automated metadata sync (LIVE, validated 2026-09-16)
  GitHub Action .github/workflows/figma-sync.yml (cron every 6h Mon–Fri + manual)
    → Figma REST API (CI-held secret FIGMA_TOKEN, read-only)
    → scripts/figma-sync.mjs diffs live Figma against the contracts
    → on drift: pushes a branch + PR for review (org policy blocks bot-created
      PRs, so the workflow warns and a human/repo-side AI opens the PR)

CHANNEL 2 — the Jira bridge (LIVE, 12 tasks round-tripped)
  Figma-AI (Figma-side agent, sandboxed, NO network egress)
    → posts complete file contents/specs as ⏳ PENDING comments on Jira C360-44235
    → repo-side Claude VALIDATES every claim against live Figma + the owner's exports
    → applies via branch → PR → strict CI → squash-merge
    → marks ✅ DONE in the SAME Jira comment with the commit SHA

ASSETS — .github/workflows/figma-assets.yml (manual dispatch)
    → Figma Images API → SVG/PNG binaries → branch + PR (delivered the 3 logos, PR #36)

VARIABLES (design tokens) — deliberately NOT automated
    → Singh's ruling (2026-09-14): read live Figma FIRST, his exported zips second;
      a Figma-vs-export mismatch = HARD ALERT to him, never silently resolved.
    → He exports → npm run sync:variables → byte-parity gates → PR. Values are never
      fetched by robots (Variables REST API is Enterprise-only anyway).
```

**Jira routing (mandatory, in AI_CONTEXT.md + README):** component specs/keys/renames for
GitHub → **C360-44235**; questions TO Figma-AI → **C360-44222**; epic **C360-3526** is
governance/broadcasts only, never a task inbox.

## 2. Claude's role (repo-side)

Claude (DESIGN-SYSTEM lane) is the **validator and publisher** — the only lane that pushes
this repo, always through the gate (feature branch → PR → strict CI → squash-merge). Its
standing protocol, which caught every issue below: **nothing from any AI (including Figma-AI)
is applied without independent verification** — node IDs re-read live, values byte-checked
against the owner's exports, structural diffs proving nothing regresses, and false claims
refuted on the record instead of silently absorbed.

## 3. What was done, in order (2026-09-14 → 09-16)

1. **Forensic audit** of the whole linking pipeline (multi-agent, 19 adversarially confirmed
   findings): `docs/FORENSIC-AUDIT-FIGMA-GITHUB-LINKING-2026-09-14.md`.
2. **Jira routing fixed** (Figma-AI had posted work on the epic because the repo never said
   where to post) — routing table shipped in README/AI_CONTEXT + C360-44235 revived.
3. **Every repairable audit finding fixed**: 8 contracts got their missing Figma deep links;
   dead renamed-file links repointed; sync script's stale hardcoded count fixed; **strict CI
   turned on** (real errors fail PRs, was NOTICE-only); **new `validate:links` gate** (link
   rot now blocks merges — proven with a planted-defect test).
4. **Rename debt closed from a live Figma read** (27 files) — without waiting on Figma-AI.
5. **Bridge round-trips completed**: Avatar family (incl. the initials-fallback gap Figma-AI
   then built), field-atoms 1.1.0, tabs 1.0.1, button 1.1.0, logo brand contract, and the
   **full componentKey debt retired** (C360-47328 CLOSED — every mapping row keyed; audit
   NOTICEs 14 → 0).
6. **Sync pipeline deployed and proven end-to-end** (token authenticated, drift scan ran,
   dry-run held, cron live).
7. **Direct-push experiment (Singh's ask)**: answered definitively — Figma's sandbox CANNOT
   reach GitHub (git smart-HTTP → Cloudflare 520; API 403; no token). Assets delivered via
   the CI fetcher instead, same hour.

## 4. Every issue found, and its fix (all shipped unless noted)

| # | Issue | Root cause | Fix | Where |
|---|---|---|---|---|
| 1 | Figma descriptions taught wrong geometry (62px vs live 66px) + dead GitHub links | descriptions hand-written from old contracts; renames don't redirect on GitHub | refresh task to Figma-AI; repo-side rename hygiene; sync robot now catches metadata drift | C360-44235 #633964; PR #20 |
| 2 | Figma-AI posting tasks on the epic | repo never named the right ticket | mandatory routing table | PR #20 |
| 3 | 8 contracts had no Figma link; 2 dead internal links | no link gate existed | links added + `validate:links` gate in strict CI | PRs #20/#21 |
| 4 | CI passed everything (NOTICE-only) | strict mode never wired | `ci:check` strict in CI | PR #21 |
| 5 | Sync script hardcoded stale count (would corrupt next sync) | same fact in two places | fixed + counts pinned in tests | PRs #20/#29 |
| 6 | A workflow auto-minted outdated token dumps with fresh version stamps | legacy version-bump bot | defused; later all 10 legacy dumps DELETED (Singh's ruling) | PRs #25/#31 |
| 7 | Repo names 4 days behind Figma's rename wave | no rename protocol | live full-page read → 27-file sync; robot now watches | PR #24 |
| 8 | Portal-isolation checker ignored JS (proven exploitable) | scan scope too narrow | all runtime types + must-fail fixture (gallery) | gallery `4bf34f9` |
| 9 | `figmaNodeId` field bug in Figma-AI's pipeline files (sync would silently cover nothing) | wrong field name | flagged; Figma-AI fixed; verified | #634269 rev2 |
| 10 | Pipeline files read the mapping at repo root (doesn't exist) | wrong path | fixed in workflow + script | PR #32 |
| 11 | dry-run never suppressed writes | GH-expressions boolean ≠ string `'true'` | `!= true` | PR #33 |
| 12 | Robot PR failed: label missing; later: org policy forbids bot PRs | repo/org settings | label created; workflows push branch + warn, human opens PR | PR #33/#37 |
| 13 | First token rejected (HTTP 403) | missing file-content scope | Singh re-issued token (read-only scopes verified); run green | run 35086337146 |
| 14 | Figma-AI repeatedly "delivered" files that stayed in its sandbox (5 occurrences) | sandbox has no egress | bridge rule: a task is READY only when full content is INLINE in the Jira comment | #634271 |
| 15 | False claims caught by validation: "all nodeIds broken" (its 'old' ids never existed here), "logo keys rotated" (repo already had those keys), invented `<cs-avatar-*>` selectors, an unevidenced verification removal | agent overconfidence | refuted on the record; only nodeId-matched data accepted; one flag re-added | #634434 replies, PR #34 |
| 16 | Disabled-tab colour: repo deviated from Figma | repo-side "improvement" | Singh's ruling: **Figma always wins** — value corrected, rule generalized | PR #31 |

## 5. Validated as WORKING today (each with live proof)

- **Sync robot**: run 35086337146 completed/success; dry-run held; cron active. Token scopes
  read-only; expires **2026-12-15** (daily watcher will flag it).
- **Asset fetcher**: delivered 3 logos, sizes matching the Figma-side claims byte-for-byte;
  SVG/PNG format-checked (PR #36).
- **Jira bridge**: 12 completed round-trips; board currently has **zero open tasks**.
- **Strict CI + link gate**: green on `main`; both proven able to FAIL (planted defects).
- **Variables chain**: Agency 280 / Primitives 264 / Caregiver 171, byte-identical to the
  owner's exports, Figma-cross-checked (C360-44253 #634266).
- **Mapping**: 17 components, every row keyed, names matching live Figma, `audit:components`
  NOTICEs = 0.

## 6. Known limits & open items (honest list)

- **GitHub → Figma is not automated on Pro**: anything that must change *inside* Figma
  (descriptions, annotations) still travels via the Jira bridge to Figma-AI. This is a plan
  limitation, not a defect; the Organization plan's native GitHub connector would collapse
  both channels (Singh's cost call, no urgency).
- Variables stay owner-exported by design (Enterprise-only API + Singh's authority ruling).
- PDFs can't be fetched by API (Images API has no pdf); wordmark logo has no Figma node yet.
- Two harmless section-key conflicts recorded (Button, Form-Fields family) — sections have no
  stable key semantics; per-set keys in the contracts are authoritative.
- Sep-14 description-refresh audit trail: Figma-AI reports all descriptions now clean; the
  Sep-14 stale evidence stands as history; repo-side spot-check pending on the next desktop
  connection.

## 7. Canonical references

`AI_CONTEXT.md` (authority + routing) · `docs/FIGMA_GITHUB_SYNC.md` (pipeline ops) ·
`docs/FORENSIC-AUDIT-FIGMA-GITHUB-LINKING-2026-09-14.md` (audit) ·
`portals/agency/components/component-mapping.json` (the keyed registry) ·
Jira: C360-44235 (bridge) · C360-44222 (queries) · C360-47328 (keys, CLOSED) · CHANGELOG 4.x–5.3.
