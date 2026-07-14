# Verification Log — CareSmartz360 Design System

Running record of confirmed facts, open conflicts, and decisions for the token/semantic-layer cleanup. Acting as the interim tracker in place of Jira (not yet connected in this environment — see note below).

---

## 2026-07-07

### Confirmed
- **Primitives Figma file is `DJBpjoXPMEw6bBAByIQaAy`** ("$-Primitives (CS360) V2.0"). Confirmed by Singh via live Figma link (node `89:2`, variable set `8-2`). This matches the file ID already recorded in `CARESMARTZ360-DS-REFERENCE.md` and the `ds-tokens-latest.json` metadata — one of the three-way file-identity conflicts from the initial audit is now resolved.

### RESOLVED — 2026-07-07, second pass (live Figma pull)

Dev Mode MCP Server is now enabled and working. Pulled live data from the "🤖 AI Design System Reference" page inside `DJBpjoXPMEw6bBAByIQaAy` (node `89:2`) — a documentation canvas that lists all 264 primitive variables as readable text (1 collection, "Mode 1" only — primitives are not themed; theming lives at the semantic layer, same pattern as Caregiver).

**Verdict on the primary blue conflict: `#0077FF` is correct.**
- Real primitive: `colors/Brandblue-600 → #0077FF`
- Matches the Claude skill `agency-portal.md` value (`action/primary/bg` = `#0077ff`) exactly.
- `#2563EB` (`CARESMARTZ360-DS-REFERENCE.md`) does not appear anywhere in the real Brandblue ramp — it's Tailwind's stock blue-600 default, not a CareSmartz360 color. **Confirmed wrong.**
- `#1976D2` (`agency-semantic-layer.md`) does not appear anywhere in the real ramp either — it's Material Design's stock blue. **Confirmed wrong.**
- Full verified Brandblue ramp: 50 `#F0F7FF` · 100 `#E0F0FF` · 200 `#BADEFF` · 300 `#8ACCFF` · 400 `#57B5FF` · 500 `#2499FF` · 600 `#0077FF` · 700 `#005CE6` · 800 `#0045B3` · 900 `#003180` · 950 `#001F52`.

**Action:** retire `#2563EB` and `#1976D2` everywhere in the GitHub repo. Re-point all "brand primary" references to `#0077FF` (`Brandblue-600`).

**Second finding — spacing scale also disagrees.** Real Figma primitives name spacing tokens by their own pixel value (`space-4` = 4px, `space-8` = 8px, `space-16` = 16px, etc. — the number in the name IS the value). `CARESMARTZ360-DS-REFERENCE.md` describes an index-based scale instead (`primitives.spacing.4` = 16px, i.e. the "4" is a step number, not a pixel value). These are two different systems, not just a naming variance — needs reconciling the same way as the color values.

**Caveat on trust level:** this reference page is a manually generated snapshot, not a live query — its own footer says "Run this plugin again to regenerate the reference page with the latest token and component data." It's far more trustworthy than the hand-typed GitHub docs (it was clearly exported from real Figma variables), but it can still drift if Singh doesn't re-run that plugin after future variable changes. Treat it as "verified as of the last time the plugin was run," not "always live."

**Not yet checked:** `get_variable_defs` (which reads variables actually bound to a component's fill/text/spacing properties) returned empty on this node — expected, since this page is text labels, not a real component using the tokens. To verify the *semantic* layer (how components consume these primitives), we need to point these tools at an actual live component frame (e.g. a real button in the Agency semantic file), not this reference page.

### Still open
1. Naming convention split: dot-notation (GitHub docs) vs. slash-notation (Figma native, Claude skill files) — resolve in favor of slash-notation, since that's the real source format.
2. **Two incompatible naming conventions in use**: dot-notation (`brand.primary`, `--agency-brand-primary`) in the GitHub repo docs vs. slash-notation (`action/primary/bg`, `surface/base`) in the Claude skill files. Figma's native variable naming uses slash-notation — that's the format any live pull will return.
3. **Stale artifact**: `components/component-mapping.json` still references `"shadcnComponent": "Button"` even though shadcn was explicitly banned starting v2.4.0.

### Bug found in the caresmartz-design skill plugin
- The `portal-context` skill lists file `4bh29laapcuKBTghfaRXF0` as "Primitives (Shared — All Portals)." But the `agency-portal` skill (same plugin) correctly labels that same file ID as the **Agency semantic layer**, not primitives. Internal contradiction. Claude can't edit skill files directly in this session — needs a manual fix via Settings > Capabilities, or flag to whoever maintains the plugin.

### Blocked
- ~~Figma Dev Mode MCP Server not enabled~~ — RESOLVED 2026-07-07. Singh enabled it and restarted; live pulls now working.
- **Jira is not connected** in this environment — authorization has to happen through Claude's connector settings, which requires an interactive login and can't be completed from inside this automated session (no OAuth codes/tokens can be exchanged here). Until Singh authorizes it in Settings, this file is the source of truth for decisions/issues.

### Next actions
1. Update `CARESMARTZ360-DS-REFERENCE.md`, `agency-semantic-layer.md`, `ds-tokens-latest.json`, and `tailwind.config.js` to replace `#2563EB` / `#1976D2` with the verified `#0077FF`.
2. Reconcile the spacing-scale mismatch (index-based vs. pixel-named) the same way.
3. Standardize all repo docs on slash-notation naming (matches the live Figma source) instead of dot-notation.
4. Correct the `portal-context` skill's primitives/semantic file mix-up (needs Settings > Capabilities, since Claude can't edit skill files directly).
5. Point `get_variable_defs`/`get_design_context` at a real live component (not the reference page) to verify the semantic layer — how components actually consume these primitives.
6. Independently verify the Caregiver semantic layer against live Figma too (currently reported clean — 437 aliases, 0 hardcoded — but not yet checked this session).
7. Once Jira is authorized: migrate this log's open items into it.

---

## 2026-07-13 — third pass (fixes applied + repo drift discovered)

### Fixes applied (uncommitted — see "needs a decision" below)
- `ds-tokens-latest.json`: primitive `blue` ramp corrected to the verified Brandblue values (50–950). Semantic tokens reference these primitives by alias, so they inherited the fix automatically. Bumped to `$version: 2.4.8`.
- `tailwind.config.js`: `brand.primary/secondary/hover/active`, `status.info`, `text.brand`, `border.focus`, and the primitive `blue` scale corrected. Spacing scale left untouched — see "flagged, not fixed" below.
- `docs/CARESMARTZ360-DS-REFERENCE.md`: primitives example, semantic token table, and spacing section annotated with verified values and a clarifying note.
- `design-tokens/agency-styles.scss` and `agency-semantic-layer.md`: light-mode `--agency-brand-primary/-hover/-active`, `--agency-status-info`, and `--agency-interactive-*` corrected to verified values. **Dark-mode values were left untouched and marked ⚠️ unverified** — the Figma primitives collection only has one mode, so dark-mode brand shades need an independent semantic-layer pull before trusting them.

### Flagged, not fixed (needs a human decision, not a silent edit)
1. **Spacing scale naming mismatch** — documented with clarifying notes in both `tailwind.config.js` and `docs/CARESMARTZ360-DS-REFERENCE.md`, but the actual Tailwind spacing keys were **not** renamed/remapped. Reason: `tailwind.config.js` is a real build config — if it's wired into the live app, renumbering these keys would silently change real rendered spacing everywhere `p-4`/`gap-4`/etc. are used. That's a developer decision, not something to change unilaterally.
2. **New architecture conflict found**: a file `AI_CONTEXT.md` was added to the repo (commit `80eb59b`, not by this session) stating a strict rule: **no module-specific token prefixes** (explicitly calls out `--admin-bg` style prefixes as banned, global semantic naming only). This directly conflicts with the existing `--agency-*` prefixed token system used throughout `agency-styles.scss` and `agency-semantic-layer.md` — and, by the same logic, would apply to any future `--caregiver-*`, `--client-*`, `--staff-*` prefixes too. **This needs a real decision**: either amend `AI_CONTEXT.md` to allow portal-scoped prefixes, or plan a rename of the entire Agency token layer to prefix-free global names with theme switching instead. Not touched in this pass.
3. **`components/component-mapping.json` has 13 stale `shadcnComponent` references** (Button, Input, Badge, Card, Dialog, Select, Checkbox, Switch, Alert, Avatar, Tooltip, Tabs, Breadcrumb) — worse than first found (only 1 was spotted in the initial audit). shadcn has been banned since v2.4.0. Not touched this pass — flagging for a decision on whether to strip the field entirely or repoint it to the real component library (Angular Material M3, per `AI_CONTEXT.md`/v2.5.0).
4. **`AI_CONTEXT.md` has two unfilled placeholder links**: `[Figma Master File]` and `[Jira Epic - UI Architecture Standardization]` both say "(Insert Link)". The real Figma file is confirmed (`DJBpjoXPMEw6bBAByIQaAy`) — worth filling in. The Jira epic link is unknown; may be the parent of `C360-43755`.

### Repo drift noticed
Since the last pass, this repo picked up commits not made by this session: `CARESMARTZ360-DS-REFERENCE.md` and `AI-TOOLS-GUIDE.md` were moved into `docs/`, old `ds-tokens-vX.json` snapshots were pruned and re-bumped up to `v2.4.7` (looks like the `.github/workflows/version-bump.yml` automation firing on pushes), and `AI_CONTEXT.md` was added. Worth knowing someone (or an automation) is actively touching this repo in parallel — there's a real risk of collision if uncommitted local changes here aren't committed before the next external push.

### Jira
Connected: `netsmartz.atlassian.net`. Existing sub-task `C360-43755` ("Primitives," under project `C360` / CareSmartz360 V2, status Open, no description) matches this exact workstream — treating it as the tracking issue rather than creating a duplicate.

### Still open (unchanged from last pass unless noted)
- Naming convention split (dot-notation vs. Figma-native slash-notation) — not resolved.
- `portal-context` skill's primitives/semantic file mix-up — not fixed (needs Settings > Capabilities).
- Semantic-layer verification via a real live component (not the reference page) — not done.
- Caregiver semantic layer — not independently re-verified against live Figma.
- Client and Staff portal semantic layers — not started.
- **New**: local changes in this repo (`ds-tokens-latest.json`, `tailwind.config.js`, `docs/CARESMARTZ360-DS-REFERENCE.md`, `design-tokens/agency-styles.scss`, `design-tokens/agency-semantic-layer.md`) are uncommitted. Need a decision on whether to commit/push now or hold for review.

---

## 2026-07-13 — fourth pass (git handoff + more cleanup)

### Git commit status: BLOCKED, handed off
Attempted to commit the fixes from the third pass. Hit a stale/active `.git/index.lock` that Claude doesn't have permission to remove (this repo folder is a live mount of Singh's actual Mac filesystem, so this is most likely another local tool — GitHub Desktop, VS Code, another terminal — holding the repo open). **Singh has assigned the commit to Antigravity** to complete on his machine. The following are still sitting as uncommitted working-tree changes, waiting for that commit:
- `ds-tokens-latest.json`, `tailwind.config.js`, `docs/CARESMARTZ360-DS-REFERENCE.md`, `design-tokens/agency-styles.scss`, `design-tokens/agency-semantic-layer.md` (brand blue fix, from the third pass)
- `components/component-mapping.json` (shadcn cleanup, this pass — see below)
- `AI_CONTEXT.md` (placeholder links filled + conflict flagged, this pass — see below)
- `VERIFICATION-LOG.md` itself (new, untracked)

### Found while proceeding on other pending items
- **Jira epic status**: `C360-43755` ("Primitives")'s parent is `C360-3526` ("Design System CS360") — status **On Hold**. The whole design system initiative is officially on hold in Jira, which may explain the drift and inconsistency found across this repo.
- **`component-mapping.json`'s `figmaNodeId` values look fabricated.** Every entry uses a suspiciously clean round-hundred sequence (`1:100`, `1:200`, `1:300`... up to `1:1500`) — real Figma node IDs are never this uniform. None of these have been confirmed against live Figma. This means the whole file's core purpose — mapping components to real Figma nodes — is unverified, not just the `shadcnComponent` field.

### Fixed this pass
- `components/component-mapping.json`: removed all 13 `shadcnComponent` fields (shadcn has been banned since v2.4.0) and replaced with an explicit `componentLibrary` placeholder marked "not yet checked" rather than guessing a real Angular Material mapping. Added a `$metadata.warning` flagging the fabricated-node-ID suspicion for whoever does the real regeneration pass.
- `AI_CONTEXT.md`: filled in both placeholder links — Figma Master File (confirmed `DJBpjoXPMEw6bBAByIQaAy`) and Jira Epic (`C360-3526`, noting its On Hold status). Added an explicit "Open Conflict" section documenting the Rule 3 (no-prefixes) vs. `--agency-*` conflict directly in the file itself, rather than only in this log, so anyone reading `AI_CONTEXT.md` sees it.

### Not done — still needs Singh or a developer
- Committing/pushing any of this (handed to Antigravity).
- Deciding the `AI_CONTEXT.md` prefix-ban vs. Agency token conflict (documented, not resolved).
- Regenerating `component-mapping.json` with real Figma node IDs (requires opening the actual component library file in Figma desktop).
- Everything else listed as still open in the third-pass entry above (semantic-layer live verification, Caregiver re-check, Client/Staff portals, spacing scale, `portal-context` skill bug).

---

## 2026-07-13 — fifth pass (3-tier SCSS scaffold built)

Built `src/styles/` implementing the 3-tier architecture from `AI_CONTEXT.md` — prefix-free, portal-agnostic (deliberately sidesteps the Rule 3 vs. `--agency-*` conflict rather than resolving it; that decision in task #8 is still open).

Added: light/dark/high-contrast themes, small/medium/large density modes, a dedicated `_shift-cards.scss` component, and Figma source links on every primitives/semantics file. Full per-file verification status (what's confirmed vs. proposed placeholder) is in `src/styles/README.md` — short version: primitives and light-theme brand colors are verified; dark theme, high-contrast theme, density scale factors, and all Tier 3 component structure are new proposals that haven't touched Figma yet.

Also logged a set of architecture suggestions in that README (token pipeline/Style Dictionary to stop hand-syncing SCSS/JSON/Tailwind, icon tokens, states layer, RTL logical properties, contrast CI, living style guide, print styles, motion semantic tokens).

This is new, uncommitted work — same handoff situation as the third/fourth pass (Antigravity handling commits).

---
*Maintained collaboratively with Claude. Update this file after every verification pass; migrate to Jira once that connector is authorized.*

## 2026-07-14 — sixth pass (Antigravity: Track 1 Semantics Rebuild)

### Executed Track 1
- **Figma Extraction bypass**: The local Dev Mode MCP was unable to extract from Figma directly due to multiple selection constraints. Singh utilized Figma AI to extract the full Semantic and Component information from node `26473-23721` (file `4bh29laapcuKBTghfaRXF0`).
- **Option A (Prefix-Free) implemented**: Stripped all module-specific prefixes (like `--agency-`) from semantic tokens per `AI_CONTEXT.md` Rule 3, resolving the blocker.
- **Replaced Proposed Placeholders**: `_theme-light.scss`, `_theme-dark.scss`, and `_density.scss` have been fully rebuilt using the 230 real extracted Figma variables, completely removing the `⚠️ PROPOSED` values.
- **Updated Primitives**: Added `--space-2`, `--opacity-0` to the primitives files (`_spacing.scss`, `_colors.scss`) to accommodate the semantic extraction requirements. Fixed the density variables mapping to align with correct primitive names.
