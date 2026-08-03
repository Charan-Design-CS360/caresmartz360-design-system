# CareSmartz360 Design System — repository guardrails

## Non-negotiable boundaries

1. The architecture is Primitives → Portal Semantics → Components →
   Patterns/Templates.
2. Only `shared/primitives` is shared.
3. Agency, Caregiver, Staff, and future portals own separate Layers 2–4.
4. A portal must never import, alias, copy, or fall back to another portal.
5. `/Users/netsmartz/Documents/Variables` is the only variable input authority.
6. GitHub publishes reviewed exact copies; Jira records evidence and status.
7. No AI tool may guess, synthesize, rename, or silently repair variable data.

## Canonical locations

| Artifact | Location |
| --- | --- |
| Shared primitive exports | `shared/primitives/tokens/` |
| Agency semantic exports | `portals/agency/semantics/` |
| Caregiver semantic exports | `portals/caregiver/semantics/` |
| Portal manifests | `portals/<portal>/portal-manifest.json` |
| Variable provenance | `config/variable-export-manifest.json` |

Root-level legacy JSON/SCSS files remain migration inputs only. They are not
authoritative and must not be selected when a canonical portal export exists.

## Required checks

- `npm run verify:variables`: byte parity with the current owner exports.
- `npm run validate:portal-manifests`: registered ownership and paths.
- `npm run validate:portal-isolation`: no cross-portal dependencies.
- `npm run audit:tokens`: DTCG leaves, counts, placeholders, and cycles.
- `npm run validate`: complete non-release audit and automated tests.
- `npm run release:check`: strict four-layer release evidence.

Any failure blocks publication or release. Do not bypass a gate or weaken it to
accept current data.

## Scope

Allowed: four-layer design-system assets, schemas, validators, documentation,
and provenance. Product business logic, routes, APIs, databases, and one-off
application screens belong in consumer repositories.
