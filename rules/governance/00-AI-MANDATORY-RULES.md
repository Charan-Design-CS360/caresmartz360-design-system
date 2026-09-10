<!--
=============================================================================
FILE BRIEF: The 8 mandatory AI rules of the CareSmartz360 Design System,
transcribed VERBATIM from Jira epic C360-3526 ("Step 4 — Follow These Rules
(MANDATORY)"). Until 2026-08-24 these rules existed ONLY inside Jira — no file
on disk stated them, and the design-system repo cited "Rule 3" against a
document that does not exist on origin/main. This file closes that gap.
CREATOR: Fable-WOUND-MGMT — transcription only, zero authorship | 2026-08-24
LAST MODIFIER: Fable-WOUND-MGMT | 2026-08-24
STATUS: TRANSCRIBED — awaiting Singh's ratification against the epic text
=============================================================================
-->

# The 8 Mandatory AI Rules — CareSmartz360 Design System

## Provenance (verify before trusting — this is a copy, the epic is the source)

| | |
|---|---|
| Source of truth | Jira epic **[C360-3526](https://netsmartz.atlassian.net/browse/C360-3526)** — "❇️ Design System - Caresmartz360" |
| Section | Description → **"Step 4 — Follow These Rules (MANDATORY)"** |
| Fetched | 2026-08-24, via Jira API read (read-only; this session performs no Jira writes) |
| Epic last updated | 2026-08-21 20:02 IST |
| Reporter/assignee | Charanjeet Singh CS360 (`60f9722d…`) |
| Transcription fidelity | Rule text below is **verbatim** from the epic, including capitalisation. Nothing added, softened, or reworded. |

If this file and the epic ever disagree, **the epic wins** and this file gets corrected —
then the divergence gets a row in `RULE-FLAGS.md`, because a drifted copy is a decoy.

## The rules — verbatim from the epic

| # | Rule | Why (epic's own wording) |
|---|---|---|
| 1 | **Never hardcode hex/px/font values** | Always reference semantic variables which alias primitives |
| 2 | **Never delink a variable** | Thousands of bindings depend on the alias chain — one broken link cascades everywhere |
| 3 | **Never change Brandblue** | Brand color is locked by stakeholder decision |
| 4 | **Never mix portal semantic data** | Each portal has its own semantic layer — Agency data does not belong in Caregiver files and vice versa |
| 5 | **Respect the authority boundary** | Figma is the design-authoring authority; GitHub is the operational SSoT for versioned delivery; Jira is the planning/status/audit record. A claim in one system does not prove parity in the others. |
| 6 | **Same-comment replies** | When replying to another AI's comment, reply in the SAME thread — never create a new top-level comment |
| 7 | **Check portal before writing** | Before writing semantic data to any document or file, verify you are using the correct portal's semantic ticket |
| 8 | **Never surface tech-stack/build/framework details** (Angular, Material, Tailwind, Bootstrap, npm, webpack, etc.) in design-system deliverables, dashboards, or docs shown to the design owner | Singh (design owner) hands off the approved four-layer design-system structure only — implementation stack is 100% the dev team's decision and execution. See Resolution Log below. |

*(The "Resolution Log" referenced by Rule 8 lives in the epic itself — 2026-07-27 entry.)*

## Two clarifications this transcription settles

1. **"Rule 3" ambiguity resolved.** The design-system repo's `src/styles/README.md` (on
   `origin/main`) cites *"AI_CONTEXT.md's Rule 3"* for a **No-Prefixes** rule. The epic's
   Rule 3 is **Never change Brandblue** — a different rule entirely. The No-Prefixes text
   exists only in a branch-local `AI_CONTEXT.md` §3 that `origin/main` replaced. That
   dangling citation is recorded in `01-universal/` CONTRADICTIONS and is repo-fix work for
   Opus's lane, not this folder's.
2. **Rule 8 vs this folder's `css-approach.md`.** Singh explicitly requested "which approach
   need to follow to implement the css" for this folder (2026-08-24), which necessarily
   names per-portal styling approaches. That is a Singh-requested exception to Rule 8's
   surface-scope, recorded properly in `EXCEPTIONS.md` (EX-001) rather than silently.

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Initial verbatim transcription from epic C360-3526 | Singh's approved assembly plan (decision: transcribe, ratify against fetched text) — **ratification pending** |
