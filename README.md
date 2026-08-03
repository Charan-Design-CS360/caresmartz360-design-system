# CareSmartz360 Design System (v3.0.0)

Reviewed, versioned delivery source for the CareSmartz360 design system. Its
variable input authority is the owner-maintained export folder
`/Users/netsmartz/Documents/Variables`; exact copies and checksums are published
here for Angular, React Native, and other consumers.

---

## 🏛️ Portal Registry

| Portal | Scope | Figma Collection | Total Vars | Status | Directory | Jira |
|--------|-------|------------------|------------|--------|-----------|------|
| **Agency Portal** | Web App | `Color Modes`, `Density Modes`, `General` | 251 vars across 3 collections (Color Modes 208 × 5 modes, Density Modes 29 × 1 mode, General 14 × 1 mode) | Active audit | `portals/agency/` | [C360-44253](https://netsmartz.atlassian.net/browse/C360-44253) |
| **Caregiver Portal** | Web + Mobile | `Color Theme` | 171 vars (3 modes) | ✅ Active (v3.0) | `portals/caregiver/` | [C360-44333](https://netsmartz.atlassian.net/browse/C360-44333) |
| **Staff Portal** | Web App | *TBD* | *In Progress* | 🟡 Planned | `portals/staff/` | [C360-3526](https://netsmartz.atlassian.net/browse/C360-3526) |
| **Client Portal** | Mobile App | *TBD* | *In Progress* | 🟡 Planned | `portals/client/` | [C360-3526](https://netsmartz.atlassian.net/browse/C360-3526) |

---

## 📐 Four-layer architecture

```
Layer 1: Primitives                → Shared global scale (colors, fonts, radius, shadow)
                                        ↓
Layer 2: Portal Semantics         → Portal-scoped semantic meaning (surface, text, action)
                                        ↓
Layer 3: Components               → Portal-scoped component contracts
                                        ↓
Layer 4: Patterns/Templates       → Portal-scoped reusable workflows and layouts
```

### Mandatory Architecture Rules:
1. **Components reference Tier 2 ONLY**: Tier 3 component styles must bind to Tier 2 semantic variables (e.g. `var(--surface-base)`), NEVER directly to Tier 1 primitives.
2. **Prefix-Free Custom Properties**: All CSS variables use clean naming (e.g. `--text-primary`), strictly omitting legacy portal prefixes like `--agency-`.
3. **Portal Exclusivity**: Keep portal semantic layers strictly separated under `portals/`.

---

## 📊 Portal Comparison Matrix

| Feature / Property | Agency Portal | Caregiver Portal |
|--------------------|---------------|------------------|
| Primary Figma File | `4bh29laapcuKBTghfaRXF0` | `TSOq0ugv6zfr6gFZh5zYrP` |
| Primary Collection | `Color Modes` | `Color Theme` |
| Total Variables | 251 | 171 |
| Theme Modes | 5 (Light, Dark, High Contrast, Warm Dark, HC Light) | 3 (Light Mode, Soothing Dark, High Contrast) |
| Density Modes | 1 (Default) | 3 (Default, Large, Small) |
| Chart Tokens | Yes (10 series) | No |
| Elevation Scale | Yes (6 MD3 levels) | No |
| Attention Action | No | Yes (5 tokens) |

---

## 📁 Repository Directory Structure

```
caresmartz360-design-system/
├── README.md                      # Main multi-portal documentation
├── AI_CONTEXT.md                  # Mandatory zero-tolerance AI routing
├── GUARDRAILS.md                  # Repository scope boundaries & contribution rules
├── config/variable-export-manifest.json # Exact archive/artifact hashes
├── shared/primitives/tokens/      # Canonical shared Primitives export
├── portals/                       # Portal-owned Layers 2–4
│   ├── agency/
│   │   ├── portal-manifest.json
│   │   └── semantics/             # Canonical Agency exports
│   └── caregiver/
│       ├── portal-manifest.json
│       └── semantics/             # Canonical Caregiver exports
├── scripts/                       # Sync, parity, isolation, release gates
└── legacy root JSON/SCSS          # Migration inputs, never variable authority
```

---

## 💬 Figma Query Hub Integration

For queries requiring complex Figma context, page hierarchy verification, or architecture alignment beyond MCP capabilities, log to the **Figma Query Hub**:

🔗 **Jira Ticket:** [C360-44222 — Figma Queries & AI Synchronization Hub](https://netsmartz.atlassian.net/browse/C360-44222)

---

## 🛡️ Repository Guardrails

This repository contains **design system assets ONLY**.
- ❌ NO application-level view code or business logic
- ❌ NO unverified ad-hoc tokens outside Figma variable exports
- ❌ NO cross-pollination of portal-specific semantic tokens

See [GUARDRAILS.md](GUARDRAILS.md) for full compliance guidelines.

---

## 🔗 Key References

- **Design System Epic:** [C360-3526](https://netsmartz.atlassian.net/browse/C360-3526)
- **Figma AI Bridge Ticket:** [C360-44235](https://netsmartz.atlassian.net/browse/C360-44235)
- **Color Audit Ticket:** [C360-44027](https://netsmartz.atlassian.net/browse/C360-44027)
- **Figma Master File (Agency):** [CareSmartz360 V2](https://www.figma.com/design/4bh29laapcuKBTghfaRXF0)
- **Figma Master File (Caregiver):** [CareSmartz360 V2 — Caregiver](https://www.figma.com/design/TSOq0ugv6zfr6gFZh5zYrP)
