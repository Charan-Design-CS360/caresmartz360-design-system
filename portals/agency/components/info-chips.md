<!--
=============================================================================
COMPONENT CONTRACT — Info Chips / Page Messages (Agency portal)
9-variant "page messages" set: 6 full-width message bars + 3 setting chips.
Measured LIVE 2026-09-10 — the last Figma section with zero GitHub presence.
Machine contract: ./info-chips.json.
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Jira: C360-47326
=============================================================================
-->

# Info Chips / Page Messages — Agency component contract

Jira: **C360-47326** · set `11315:24274` ([open](https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/?node-id=11315-24274)) ·
section `27255:69606` · guidelines `27382:20942`.

**Purpose:** page-level message bars (info, tooltip, confirmation, warning, error, change) and
compact related-settings chips. Bars appear in the page-info region of content pages
(pattern-page-data-table instances one at 800×112).

## Message bars (6) — shared anatomy [MEASURED on 81:32]

800 wide (treat as 100% of content area) · padding **8** (`spacing/md`) · icon 20×20 left ·
content at x36: title (12px on a 20px line, `text/primary`) → description (Body/small 12/16,
`text/secondary`) → action link (`text/brand` #0077FF) · radius **8** (`border-radius/rounded-lg`) ·
optional close 20×20 (ships hidden).

| Type | node | h | surface |
|---|---|---|---|
| Information / Tool Tip | `81:32` | **112** | `surface/secondary` #f8fafc |
| Tooltip | `16164:376356` | 96 | `surface/warning-subtle` #fefce8 |
| Confirmation | `1679:155` | 96 | `surface/success-subtle` #f0fdf4 |
| Warning | `1679:232` | 96 | `surface/warning-subtle` #fefce8 |
| Alert/Error | `1679:193` | 96 | `surface/danger-subtle` #fef2f2 |
| Change | `1679:250` | 96 | **⚠ NOT token-bound (F-016)** — renders light purple |

## Setting chips (3) — 36h, surface/secondary, radius 8, icon 20 + `text/brand` title

Setting Panel `11311:24212` (156w) · Variant8 `12356:28043` (156w — **undocumented duplicate,
cleanup candidate**) · Setting Panel V2 `11315:24273` (333w, adds a "View Settings" action).

## Open items (flagged, not invented)

1. **F-016** — the Change bar's purple surface binds no variable; needs your call (new
   `surface/ai-subtle`, reuse `field/bg-ai`, or a designed value).
2. Tooltip and Warning share the same yellow — icon is the only distinction; confirm intended.
3. "Variant8" naming + duplication — queue with Figma-AI.
4. 96h bars' inner rows, per-variant surface bindings, non-Light modes: not individually measured.

## Accessibility

Colour is never the only signal (icon + title on every bar). Error/Warning: `role=alert`;
Information/Confirmation: `role=status`. Action label must be a real focusable link. The Change
variant can't be contrast-certified until F-016 is resolved.
