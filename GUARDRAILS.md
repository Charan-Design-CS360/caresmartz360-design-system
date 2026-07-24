# CareSmartz360 Design System — Repository Guardrails

> **Purpose:** Strict scope boundaries and contribution rules for any AI tool (Figma AI, Antigravity, Codex, Claude, Cursor) or human developer working in this repository.

---

## 1. Scope Restriction Statement

This repository is **EXCLUSIVELY** for Design System assets:
- Tier 1 Primitives (`primitives/`)
- Tier 2 Portal Semantic Layers (`portals/agency/`, `portals/caregiver/`)
- Tier 3 Design System Components (`src/styles/3-components/`)
- Global Token Manifests (`ds-tokens-latest.json`, `semantic-tokens.scss`)
- Design System Documentation (`README.md`, `AI_CONTEXT.md`, `CHANGELOG.md`, `portals/*/README.md`)

⚠️ **PROHIBITED CONTENT:** Application-level code, screen mockups, Figma frame node ID maps, portal-specific app logic, database schemas, or API endpoints. App code belongs in product repositories (e.g. `poc-design-system`, `Aegis`, `CGPortal`).

---

## 2. Allowed vs Prohibited Content

| Content Category | Status | Target Location |
|------------------|--------|-----------------|
| Shared Primitives | ✅ ALLOWED | `primitives/` |
| Agency Semantic Tokens | ✅ ALLOWED | `portals/agency/` or root `semantic-tokens.scss` |
| Caregiver Semantic Tokens | ✅ ALLOWED | `portals/caregiver/` |
| Staff / Client Semantic Layers | ✅ ALLOWED (future) | `portals/staff/`, `portals/client/` |
| Component SCSS Styles | ✅ ALLOWED | `src/styles/3-components/` |
| Token Build Scripts | ✅ ALLOWED | `scripts/` or `tools/` |
| App Page Layouts / Views | ❌ PROHIBITED | Product Repos |
| Product Screen Designs / Frames | ❌ PROHIBITED | Figma Desktop / Product Repos |
| One-Time Debug / Handoff Docs | ❌ PROHIBITED | Temporary Jira Attachments |

---

## 3. Portal Exclusivity Rules

1. **Agency Portal** uses variable collection name `"Color Modes"` (`4bh29laapcuKBTghfaRXF0`). Its semantic definitions live under `portals/agency/`.
2. **Caregiver Portal** uses variable collection name `"Color Theme"` (`TSOq0ugv6zfr6gFZh5zYrP`). Its semantic definitions live under `portals/caregiver/`.
3. **NEVER CROSS-APPLY**: Never mix Agency tokens into Caregiver assets, or vice versa.
4. **Shared Foundation**: Both portals inherit from common Tier 1 Primitives (`C360-43755`).

---

## 4. AI Tool Checklist Before Making Changes

- [ ] Verify you are targeting the correct portal (`portals/agency` vs `portals/caregiver`)
- [ ] Ensure token names use prefix-free convention (e.g., `--surface-base`, NOT `--agency-surface-base`)
- [ ] Verify DTCG JSON validity before committing
- [ ] Post/update progress in the Figma Query Hub ([C360-44222](https://netsmartz.atlassian.net/browse/C360-44222)) if architectural clarification is needed
- [ ] Append the mandatory Section 23 audit log footer to any Jira comment created/edited
