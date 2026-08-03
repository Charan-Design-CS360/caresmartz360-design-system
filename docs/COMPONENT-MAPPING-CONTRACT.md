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
