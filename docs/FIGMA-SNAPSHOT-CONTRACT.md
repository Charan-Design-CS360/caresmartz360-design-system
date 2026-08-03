# Figma snapshot and attestation contract

## Purpose

This contract applies to visual, component, and pattern evidence. Variable
values are governed separately by `docs/VARIABLE-AUTHORITY-WORKFLOW.md`: the
owner-maintained local exports are their only input authority, and AI tools do
not query Figma for variable truth.

For non-variable design evidence, an approved snapshot provides a durable,
machine-readable record without pretending that an old export is live truth.

An approved snapshot is evidence of Figma state at one specific time. It is not
proof of current Figma state after that time.

## Required flow

1. Figma AI exports one portal at a time.
2. The export records the portal, file/library identity, collections, modes,
   variables, component keys, timestamp, and checksums.
3. Figma AI attests the snapshot and links the relevant Jira issue.
4. The snapshot is committed under `snapshots/<portal>/`.
5. GitHub validation checks identity, structure, checksums, portal ownership,
   and freshness.
6. The parity job compares the attested inventory with delivered GitHub
   artifacts.
7. Jira links the snapshot path, Git SHA, validation result, and reviewer
   decision.

## Offline AI rule

When live Figma access is unavailable, an AI tool must state:

- the snapshot portal;
- the Figma export timestamp;
- the snapshot age;
- the Git commit containing it;
- whether validation passed;
- that live Figma was not reached.

It must label an expired snapshot as stale and must not invent changes made
after the recorded timestamp.

## Freshness

Snapshots are structurally valid regardless of age, so historical evidence
remains readable. Release readiness is stricter:

- a portal in `pilot` or `stable` must have an attested snapshot;
- its age must not exceed the portal manifest's `maxAgeDays`;
- its Figma file key must match the portal manifest;
- its checksums must be SHA-256 values;
- its attestation must identify Figma AI and a Jira evidence issue.

Use `npm run validate:figma-snapshots` for structural validation and
`npm run release:check` for required/fresh evidence.
