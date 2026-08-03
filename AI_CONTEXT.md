# CareSmartz360 Design System — mandatory AI entrypoint

Every AI tool and human contributor must read this file before using or
changing variables. There is no portal fallback and no permission to guess.

## Authority

- `/Users/netsmartz/Documents/Variables` is the only variable input authority.
  It contains owner-maintained exports downloaded from Figma.
- Published delivery authority: reviewed GitHub artifacts and
  `config/variable-export-manifest.json`.
- Jira: governance, status, decisions, and evidence only. Jira never overrides
  a variable value.
- AI tools must not query Figma, infer a value, merge portals, or use a stale
  root-level token file as variable truth.
- If the local authority folder is unavailable, use the committed artifacts but
  report that local byte parity could not be checked. Never fabricate parity.

## Required portal routing

Identify the consumer portal before reading Layer 2 or later.
If the portal is unknown, stop and request it.

| Scope | Canonical repository path | Logical variables | Jira |
| --- | --- | ---: | --- |
| Shared Primitives | `shared/primitives/tokens/` | 264 | C360-43755 |
| Agency Semantics | `portals/agency/semantics/` | 251 | C360-44253 |
| Caregiver Semantics | `portals/caregiver/semantics/` | 171 | C360-44333 |
| Staff Semantics | Not registered | 0 verified | C360-3526 |

Agency owns `Color Modes` (208 variables, five modes), `Density Modes` (29),
and `General` (14). Caregiver owns `Color Theme` (134 variables, three modes),
`Density Modes` (23 variables, three modes), and `General` (14).

The word `caregiver` in an Agency scheduling token such as
`status.shift.caregiver-cancelled` describes an Agency business state. It does
not authorize an import from `portals/caregiver`.

## Four-layer dependency contract

```text
Shared Primitives
  ├── Agency Semantics → Agency Components → Agency Patterns/Templates
  ├── Caregiver Semantics → Caregiver Components → Caregiver Patterns/Templates
  └── Staff Semantics → Staff Components → Staff Patterns/Templates
```

Only Primitives are shared. Layers 2–4 are portal-owned. A portal may depend on
`shared/primitives` and its own `portals/<portal>` tree only.

## Zero-tolerance workflow

1. State the target portal.
2. Read its `portal-manifest.json` and this file.
3. Read variables only from the canonical paths above.
4. After the owner replaces a local export, run `npm run sync:variables`.
5. Run `npm run verify:variables` and `npm run validate`.
6. Treat any byte mismatch, count drift, schema error, alias cycle, placeholder,
   or cross-portal dependency as a blocking error.
7. Commit the exact exports and updated SHA-256 manifest together.
8. Record branch, commit, checksums, counts, and validation evidence in Jira.

Do not silently normalize, rename, repair, or reinterpret an exported variable.
Propose corrections to the owner; the next local export is the only valid input.

## Status boundary

The variable layer is exact and auditable. Component and Pattern/Template
delivery has separate evidence gates and must not be called complete merely
because variables pass.

Master governance: C360-3526. Executable workflow:
`docs/VARIABLE-AUTHORITY-WORKFLOW.md`.
