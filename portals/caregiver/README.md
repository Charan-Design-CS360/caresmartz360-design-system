# Caregiver portal design-system scope

This tree belongs only to Caregiver Web and Mobile. It may use shared
Primitives and Caregiver-owned Layers 2–4; it must never depend on Agency or
Staff artifacts.

## Verified semantic inventory

| Collection | Variables | Modes | Canonical path |
| --- | ---: | --- | --- |
| Color Theme | 134 | Light Mode (Default), Soothing Dark, High Contrast | `semantics/color-theme/` |
| Density Modes | 23 | Default, Large, Small | `semantics/density-modes/` |
| General | 14 | Mode 1 | `semantics/general/` |
| **Logical total** | **171** |  |  |

These JSON files are exact members of the owner-maintained archives under
`/Users/netsmartz/Documents/Variables/Caregiver`. Their checksums are recorded
in `config/variable-export-manifest.json`.

## AI routing rule

Use this tree only when the target consumer is Caregiver. Read
`portal-manifest.json` first. Never substitute an Agency token with a similar
name or value.

Do not use the legacy `portals/caregiver/semantic-tokens.json` file as current
truth. Variable changes must enter through the local authority export and
`npm run sync:variables`; never edit canonical exports by hand.

Jira: C360-44333. Shared Primitives: C360-43755.
