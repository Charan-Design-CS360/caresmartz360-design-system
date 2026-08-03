# CareSmartz360 enterprise design-system architecture

## Contract

The repository is the reviewed, versioned delivery source for the entire
CareSmartz360 design system.

```text
Shared Primitives
  ├── Agency Semantics → Agency Components → Agency Patterns/Templates
  ├── Caregiver Semantics → Caregiver Components → Caregiver Patterns/Templates
  └── Staff Semantics → Staff Components → Staff Patterns/Templates
```

Only Primitives are shared. A portal's Semantics, Components, Patterns, and
Templates must not reference another portal.

## Authority and evidence

- Owner-maintained exports in `/Users/netsmartz/Documents/Variables` are the
  only input authority for primitive and semantic variable values.
- Figma evidence remains applicable to visual designs, components, and patterns;
  AI tools do not query it for variable truth.
- GitHub contains reviewed, versioned, consumable delivery artifacts.
- Jira records ownership, decisions, status, and links to evidence.
- Automated byte-parity checks must prove that the local variable exports and
  corresponding GitHub artifacts agree.

Consumers use the reviewed GitHub variable artifacts and their SHA-256 manifest.
Visual/component/pattern claims still require the applicable snapshot evidence.

## Portal manifest

Each portal owns a `portal-manifest.json`. The manifest declares:

- the portal identity and Figma source;
- the portal's Jira records;
- which repository paths it owns;
- the only permitted cross-scope dependency: shared Primitives;
- maturity and evidence requirements for Layers 2–4.

CI will use these manifests to reject cross-portal imports and incomplete
release evidence.

## Migration status

This commit establishes the target topology only. Existing root-level and
`src/styles` artifacts remain in place until a separately reviewed migration
maps each artifact to a portal, proves parity, and publishes migration notes.
