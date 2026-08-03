# Agency portal design-system scope

This tree belongs only to Agency. It may use shared Primitives and Agency-owned
Layers 2–4; it must never depend on Caregiver or Staff artifacts.

## Verified semantic inventory

| Collection | Variables | Modes | Canonical path |
| --- | ---: | --- | --- |
| Color Modes | 208 | Light Mode (Default), Dark Theme, High Contrast, Warm Dark, HC Light | `semantics/color-modes/` |
| Density Modes | 29 | Mode 1 | `semantics/density-modes/` |
| General | 14 | Mode 1 | `semantics/general/` |
| **Logical total** | **251** |  |  |

These JSON files are exact members of the owner-maintained archives under
`/Users/netsmartz/Documents/Variables/Agency`. Their checksums are recorded in
`config/variable-export-manifest.json`.

## AI routing rule

Use this tree only when the target consumer is Agency. Read
`portal-manifest.json` first. The occurrence of a Caregiver business term in an
Agency scheduling status token does not make it a Caregiver dependency.

Do not use the legacy root `ds-tokens-*.json` files as current Agency truth.
Variable changes must enter through the local authority export and
`npm run sync:variables`; never edit canonical exports by hand.

Jira: C360-44253. Shared Primitives: C360-43755.
