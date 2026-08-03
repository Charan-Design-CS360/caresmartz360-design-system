# Shared Primitives

This is the only layer shared by every CareSmartz360 portal.

The currently delivered primitive token file remains at
`primitives/Primitives.CS360.V2.0.tokens.json` during topology migration.
Moving it into this directory requires a parity-preserving migration and
consumer migration notes.

Portal Semantics may alias these values. Portal Components, Patterns, and
Templates must consume their own portal Semantics rather than referencing raw
values directly.
