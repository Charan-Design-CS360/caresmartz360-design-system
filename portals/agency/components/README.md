# Agency Components

Agency-only component contracts and delivery artifacts.

Canonical Jira parent: C360-44737.

## Published contracts

Each contract is a pair: a human-readable `.md` and a machine-readable `.json` twin validated
against [`../../../schemas/component-contract.schema.json`](../../../schemas/component-contract.schema.json).

| Component | Contract | Figma section | Measured |
|---|---|---|---|
| Empty States (8 inline + 3 popup variants) | [`empty-states.md`](./empty-states.md) · [`empty-states.json`](./empty-states.json) | `27218:64329` | 2026-08-25 |
| Page Header (4 sizes) — **partial, v0.1.0** | [`page-header.md`](./page-header.md) · [`page-header.json`](./page-header.json) | `27232:63236` | 2026-08-25 |

## How to read a contract

Every published value carries a provenance marker, so a derived value can never be mistaken for a
measured one:

- **MEASURED** — read directly from live Figma; the node id is given.
- **DERIVED** — computed from measured values; the arithmetic is shown in the `.md`.
- **RAW** — a real value that is bound to **no** token present in the owner's variable export. A RAW
  value is a recorded design-system gap, **not** permission to hardcode it.
- **UNVERIFIED** — not read. Do not build from it.

A contract whose version is below `1.0.0` is **incomplete by disclosure** — its `readThisFirst`
says exactly which part is unread and why. Do not build from an incomplete contract without reading
that note first.

Each contract also carries a `notVerified` list and a `readThisFirst` note. Read both before
building — `readThisFirst` records any way the component's own Figma documentation contradicts the
file itself, and Figma prose has been wrong before.
