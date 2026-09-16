# Figma ↔ GitHub Sync Pipeline

Assembled repo-side 2026-09-16 from Figma-AI's T11 package (C360-44235 #634269 rev2 /
#634396 / #634270). Approved by Singh 2026-09-16 ("Approve the sync pipeline"); secret
`FIGMA_TOKEN` added by Singh the same day.

## Figma-GitHub Sync Pipeline

### Channel Routing
| Data Type | Channel | Method |
|---|---|---|
| Component keys, names, descriptions | Channel 1 (REST) | GitHub Action cron |
| Published styles | Channel 1 (REST) | GitHub Action cron |
| Node geometry | Channel 1 (REST) | GitHub Action cron |
| Variable values | Channel 2 (Plugin API) | Figma AI → Jira → repo AI |
| Token bindings | Channel 2 (Plugin API) | Figma AI → Jira → repo AI |
| Cross-component refs | Channel 2 (Plugin API) | Figma AI → Jira → repo AI |

### For AI Tools
- **Figma file key:** `4bh29laapcuKBTghfaRXF0`
- **Jira bridge issue:** C360-44235
- **Sync state file:** `.figma-sync-state.json`
- **Component mapping field:** `nodeId` (NOT `figmaNodeId`)
- **Workflow dispatch:** `gh workflow run figma-sync.yml`
- **Sync docs:** `docs/FIGMA_GITHUB_SYNC.md`

## Setup state

- Secret `FIGMA_TOKEN` (read-only Figma PAT): **added by Singh 2026-09-16**. Rotate via
  GitHub → Settings → Secrets and variables → Actions.
- File key: `4bh29laapcuKBTghfaRXF0` (public identifier, hardcoded default; a repo
  variable `FIGMA_FILE_KEY` overrides it if ever needed).
- `.figma-sync-state.json` is COMMITTED so scheduled runs skip no-change polls without
  duplicate PRs.

## Repo-side fixes applied on landing (2026-09-16)

- Mapping path: `portals/agency/components/component-mapping.json` (Figma-AI's files read
  it at repo root, where no mapping exists) — fixed in both workflow and script.
- Field name `nodeId` (the original `figmaNodeId` bug) — fixed by Figma-AI in rev2, verified.
- Secret name `FIGMA_TOKEN` — rev2 already matches what Singh created, verified live.

## Guardrails

- Auto-PRs never merge themselves and must pass the strict CI (`ci:check` incl. `validate:links`).
- Metadata only: variable VALUES stay owner-export-only (2026-09-14 authority ruling); the
  mapping's `componentKey: null` + `componentKeyStatus` convention is respected.

## Troubleshooting

- Fails at metadata fetch → token missing/expired: rotate `FIGMA_TOKEN`.
- No PRs for days → compare `.figma-sync-state.json` lastModified with Figma; run a manual
  `workflow_dispatch` with dry-run=true to print the diff without committing.
- A sync PR fails CI → the drift touched something the gates protect: investigate, don't force.
