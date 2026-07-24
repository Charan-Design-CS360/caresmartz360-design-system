# CareSmartz360 Design System — AI Context & Guidelines

> **Target Audience:** All AI Agents (Figma AI, Antigravity, Codex, Claude, Cursor) working in this repository.

---

## 1. Core Purpose & Scope

This repository (`caresmartz360-design-system`) is the **Single Source of Truth (SSOT)** for design system tokens, variables, SCSS stylesheets, and component styles across all CareSmartz360 products.

- **Scope Restriction:** Design system tokens, SCSS architecture, and core component styles ONLY.
- **No App Code:** Application logic, page routing, and screen layouts belong in product consumer repos (`poc-design-system`, `Aegis`, `CGPortal`).

---

## 2. Portal Identification & Exclusivity Rules

| Portal | Figma File Key | Primary Collection | Repo Directory | Jira Reference |
|--------|---------------|-------------------|----------------|----------------|
| **Agency Portal** | `4bh29laapcuKBTghfaRXF0` | `Color Modes` (204 vars, 5 modes) | `portals/agency/` | [C360-44253](https://netsmartz.atlassian.net/browse/C360-44253) |
| **Caregiver Portal** | `TSOq0ugv6zfr6gFZh5zYrP` | `Color Theme` (171 vars, 3 modes) | `portals/caregiver/` | [C360-44333](https://netsmartz.atlassian.net/browse/C360-44333) |
| **Staff Portal** | *In Progress* | *In Progress* | `portals/staff/` | [C360-3526](https://netsmartz.atlassian.net/browse/C360-3526) |
| **Client Portal** | *In Progress* | *In Progress* | `portals/client/` | [C360-3526](https://netsmartz.atlassian.net/browse/C360-3526) |

### Identification Guide:
- If Figma collection name is `"Color Modes"` → You are in **Agency Portal**.
- If Figma collection name is `"Color Theme"` → You are in **Caregiver Portal**.

---

## 3. Mandatory AI Rules

| # | Rule | Requirement |
|---|------|-------------|
| 1 | **Prefix-Free Tokens** | Use `--surface-base`, `--text-primary` dialect. NEVER use `--agency-` or `--caregiver-` prefixes in CSS custom properties. |
| 2 | **3-Tier Architecture** | Tier 1 (Primitives) → Tier 2 (Semantic) → Tier 3 (Components). Components must ONLY reference Tier 2 variables. |
| 3 | **Portal Isolation** | Keep portal semantic tokens strictly inside their designated `portals/<name>/` directories. |
| 4 | **No Direct Hex in Tier 2** | Semantic tokens MUST alias primitive variables (e.g. `var(--neutral-800)`), never hardcoded hex codes outside documented exception modes. |
| 5 | **Jira Audit Footers (§23)** | Every Jira comment added or updated by an AI tool MUST include the mandatory Section 23 audit log footer. |
| 6 | **Figma Query Hub** | If Figma context or node verification is required, query or log to the Figma Query Hub ticket ([C360-44222](https://netsmartz.atlassian.net/browse/C360-44222)). |
| 7 | **Source Hierarchy** | Data priority: GitHub Repo (`main`) > Figma Live Variables > Jira Tickets. |

---

## 4. Query Hub Instructions ([C360-44222](https://netsmartz.atlassian.net/browse/C360-44222))

When an AI tool needs clarification or data from Figma that connectors/plugins cannot deliver, post a structured query on Jira issue **C360-44222**:

```markdown
### ❓ Figma Query — [Tool Name] — [Topic]
* **Target Portal:** [Agency / Caregiver / Shared]
* **Figma File / Node:** [URL or Node ID]
* **Query:** [Detailed description of information needed]
* **Blocking Status:** [YES / NO]

---
Modified or Created by [Tool Name] on [ISO Timestamp]
related to [File Name]
Purpose [Short statement]
```

---

## 5. Key References

- **Master Epic:** [C360-3526](https://netsmartz.atlassian.net/browse/C360-3526)
- **Shared Primitives:** [C360-43755](https://netsmartz.atlassian.net/browse/C360-43755)
- **Figma Query Hub:** [C360-44222](https://netsmartz.atlassian.net/browse/C360-44222)
- **Figma AI Bridge Ticket:** [C360-44235](https://netsmartz.atlassian.net/browse/C360-44235)
- **Guardrails:** [GUARDRAILS.md](file:///Users/netsmartz/Documents/GitHub/caresmartz360-design-system/GUARDRAILS.md)
