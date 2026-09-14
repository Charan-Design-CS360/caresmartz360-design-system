# CareSmartz360 Design System — mandatory AI entrypoint

Every AI tool and human contributor must read this file before using or
changing variables. There is no portal fallback and no permission to guess.

## Authority (Singh's ruling, 2026-09-14 — supersedes the 2026-08-03 order)

Variable values are defined in Figma and exported by the owner. The reading
order for any AI tool or contributor is:

1. **Live Figma first** — Figma is where the owner defines every variable, so
   it is always the latest. Read it when it is available (MCP/Dev Mode).
2. **Owner-maintained export folder second** — the fallback when Figma is not
   reachable. Path via `DS_VARIABLE_SOURCE_DIR` (default: the owner's local
   `Design-System/Variables`). Never hard-code a machine path.
3. **If both are available and DISAGREE → HARD ALERT to the owner. Never pick
   a side silently.** The fix is always the same: the owner re-exports the
   latest variables from Figma, then `sync:variables` republishes. Record the
   alert (what differs, where seen) in Jira.

Unchanged rules:

- Published delivery authority: reviewed GitHub artifacts and
  `config/variable-export-manifest.json` — the repo is what the team consumes,
  and it must stay synced with the exports (gates enforce byte parity).
- Jira: governance, status, decisions, and evidence only. Jira never overrides
  a variable value.
- AI tools must never *infer or fabricate* a value, merge portals, or use a
  stale root-level token file as variable truth.
- If neither Figma nor the local authority folder is available, use the
  committed artifacts but report that parity could not be checked. Never
  fabricate parity.

## Where the rules live — for tools that do not read code files

Every rule, guideline, measurement and mapping in this repository is defined in
**plain-readable files only**: `.md` (human contracts, guidelines, patterns,
this file) and `.json` (machine contracts, mappings, token artifacts). You can
learn everything by reading those two file types.

Code files (`.py`, `.mjs`, `.js`, shell scripts — here and in the companion
`Universal Html Rules` / gallery folders) **never define a rule**. They only
*re-check* rules that are already written in an `.md`/`.json` file. If a script
contains a number or a name, its source of truth is the contract file the
script's header names. A tool that cannot read or run code files loses **no
information** — skip them and read:

1. This file, then `GUARDRAILS.md` and `README.md` — the standing rules.
2. `portals/<portal>/components/*.md` + `*.json` — every component contract
   (start at `portals/agency/components/component-mapping.json`, the registry).
3. `portals/<portal>/patterns/*.md` — page-level patterns.
4. `docs/*.md` — governance contracts and the DS reference.
5. `CHANGELOG.md` — what changed, when, and why.

## Required portal routing

Identify the consumer portal before reading Layer 2 or later.
If the portal is unknown, stop and request it.

| Scope | Canonical repository path | Logical variables | Jira |
| --- | --- | ---: | --- |
| Shared Primitives | `shared/primitives/tokens/` | 264 | C360-43755 |
| Agency Semantics | `portals/agency/semantics/` | 270 | C360-44253 |
| Caregiver Semantics | `portals/caregiver/semantics/` | 171 | C360-44333 |
| Staff Semantics | Not registered | 0 verified | C360-3526 |

Agency owns `Color Modes` (223 variables, five modes), `Density Modes` (31),
and `General` (16). Caregiver owns `Color Theme` (134 variables, three modes),
`Density Modes` (23 variables, three modes), and `General` (14).

The word `caregiver` in an Agency scheduling token such as
`status.shift.caregiver-cancelled` describes an Agency business state. It does
not authorize an import from `portals/caregiver`.

## Four-layer dependency contract

```text
Shared Primitives
  ├── Agency Semantics → Agency Components → Agency Patterns/Templates
  ├── Caregiver Semantics → Caregiver Components → Caregiver Patterns/Templates
  └── Staff Semantics → Staff Components → Staff Patterns/Templates
```

Only Primitives are shared. Layers 2–4 are portal-owned. A portal may depend on
`shared/primitives` and its own `portals/<portal>` tree only.

## Zero-tolerance workflow

1. State the target portal.
2. Read its `portal-manifest.json` and this file.
3. Read variables only from the canonical paths above.
4. After the owner replaces a local export, run `npm run sync:variables`.
5. Run `npm run verify:variables` and `npm run validate`.
6. Treat any byte mismatch, count drift, schema error, alias cycle, placeholder,
   or cross-portal dependency as a blocking error.
7. Commit the exact exports and updated SHA-256 manifest together.
8. Record branch, commit, checksums, counts, and validation evidence in Jira.

Do not silently normalize, rename, repair, or reinterpret an exported variable.
Propose corrections to the owner; the next local export is the only valid input.

## Status boundary

The variable layer is exact and auditable. Component and Pattern/Template
delivery has separate evidence gates and must not be called complete merely
because variables pass.

Master governance: C360-3526. Executable workflow:
`docs/VARIABLE-AUTHORITY-WORKFLOW.md`.

## Jira routing — where each AI comments (MANDATORY)

The epic C360-3526 is a governance/broadcast record, **not a task inbox. Never
post component specs, update tasks, or work requests on the epic.** Route by
purpose:

| You are | You want to | Comment on |
|---|---|---|
| Figma-AI (or any Figma-side tool) | deliver component info/specs/keys/renames for GitHub upload | **C360-44235** — the Figma↔GitHub bridge. Post as a `⏳ PENDING` task per that ticket's rules; the repo-side AI applies it and marks `✅ DONE` in the SAME comment. |
| Repo-side AI (Claude/Codex/Antigravity) | ask Figma-AI a question (node ids, keys, verification) | **C360-44222** — Figma Queries & AI Synchronization Hub. |
| Any AI | report variable-export sync/verification evidence | the portal audit ticket named in this file's collection table (C360-44253 Agency, C360-44333 Caregiver). |
| Any AI | component-contract work already tied to a ticket | that component's own `jiraIssue` from `component-mapping.json`. |

C360-44235's variable-authority block retired it **for variable values only**
(the owner's local exports are the sole variable input). It remains the live
channel for component information, descriptions, keys, and rename notices.
