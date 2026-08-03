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

- Figma and Figma AI describe what is defined in Figma.
- GitHub contains reviewed, versioned, consumable delivery artifacts.
- Jira records ownership, decisions, status, and links to evidence.
- Automated parity checks must prove that an approved Figma snapshot and the
  corresponding GitHub release agree.

When live Figma access is unavailable, consumers may use only the latest
attested snapshot committed to GitHub. They must report its timestamp and must
not claim that it represents unverified live Figma state.

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
