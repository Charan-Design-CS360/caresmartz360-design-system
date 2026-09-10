# Component mapping contract

## Purpose

A component mapping connects one portal's canonical Figma component to one
reviewed delivery contract. It is evidence, not a guess.

Mappings are portal-specific. Agency mappings cannot be reused for Caregiver or
Staff, even when component names are similar.

## Required record

Each mapping must contain:

- canonical component name;
- portal;
- verified 40-character Figma component key;
- verified numeric Figma node ID;
- component maturity;
- portal-semantic dependencies;
- GitHub contract path;
- Jira evidence issue;
- snapshot checksum or snapshot Git reference.

## Rejected records

Validation rejects:

- round-number placeholder node IDs such as `1:100`;
- missing or malformed component keys;
- duplicate component keys or node IDs within a portal;
- a mapping whose portal differs from its directory;
- cross-portal paths or dependencies;
- placeholder wording such as “verify” or “not yet checked”;
- Stable/Pilot portal releases without a portal mapping file.

The legacy root `components/component-mapping.json` remains readable during
migration, but it cannot satisfy release readiness.

## Amendment 2026-09-10 — componentKey PENDING state

Figma's 40-character component key is only readable via the Plugin API
(`node.key`); none of the read-only MCP tools available to this repo's AI
tools return it. A record may carry `"componentKey": null` with
`"componentKeyStatus": "PENDING Figma-AI enumeration (Plugin API node.key)"`
instead of a fabricated or guessed key. This is not the rejected "missing or
malformed component key" case — that clause targets a record silently missing
the field or carrying a bad value; a `null` + explicit PENDING status is a
documented gap, not a silent one, and blocks nothing in `npm run validate`
today (the gate warns, it does not fail, while the portal status is
`active-audit`). A record must move off PENDING before the portal reaches
`pilot`/`stable`.
