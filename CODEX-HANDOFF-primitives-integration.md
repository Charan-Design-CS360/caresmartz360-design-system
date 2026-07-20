# CODEX HANDOFF — Primitives V2.0 → design-system repo
> Created 2026-07-07 by Claude/Cowork. Owner: **Codex** (repo/git/build). Read ECOSYSTEM-RULES + GIT-PUSH-RULES first.

## Objective
Clone the design-system repo and wire the **locked** V2.0 primitives tokens into it as the primitives tier. Do NOT alter token values (file is locked — ECOSYSTEM-RULES §12).

## Ground truth (concrete)
- **Repo:** `Charan-Design-CS360/caresmartz360-design-system` (personal org; Singh = Owner). `gh repo clone Charan-Design-CS360/caresmartz360-design-system`
- **Locked source tokens:** `Office_Work/design-system/primitives/Primitives.CS360.V2.0.tokens.json`
  - SHA-256: `78580c4bf607f26faad8d319c002729768f4e76aa135fa587fa855488ea63c04`
  - Figma: `DJBpjoXPMEw6bBAByIQaAy` · W3C design-tokens (single mode "Mode 1")
- **264 tokens:** colors 138, status-color 41, fonts 35, spacing 18, radius 10, z-index 6, duration 6, border 5, shadow-color 4, system 1.

## Codex tasks
1. Clone repo (report default branch; NEVER touch `main`; branch per Singh).
2. Add the locked tokens.json to the repo's tokens dir (verify SHA-256 matches — tamper check).
3. Generate the **primitives SCSS/CSS custom-property tier** from the tokens (Style-Dictionary or existing pipeline). Naming must mirror token paths (e.g. `--colors-Brandblue-600`, `--spacing-space-44`, `--fonts-leading-normal`).
4. `npm run build` verify (Node per repo `.nvmrc`; heap per ECOSYSTEM-RULES §10 — 4096 default, 8192 only if full build needs it).
5. **STOP — do NOT push.** Post §11 pre-push alert to Singh; wait for explicit yes.

## HARD CONSTRAINTS
- ❌ Do NOT edit token VALUES or "fix" the 5 known gaps — those are Singh's Figma re-export (locked).
- ❌ No `!important`, no hardcoded hex — tokens only.
- ✅ Only generate downstream artifacts FROM the locked file.

## Known gaps (Singh's Figma fix, NOT Codex's) — for context only
tracking float precision · radius-999→radius-full name · status-color/zblack + Today-Shift purity · no fixed-px line-heights · no space-2.

## Handoff back
When SCSS generated + build green → HANDOFF to Antigravity (visual QA) + notify Singh for push approval. Log in AI-ACTIVITY-LOG.
