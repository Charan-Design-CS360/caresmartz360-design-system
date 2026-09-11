<!--
=============================================================================
PROPOSAL — control/height-* tokens: where to implement
For: Charanjeet Singh (design-system owner). Asked 2026-09-11: "suggest me
where we can implement." Evidence-backed; nothing applied until he rules.
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526)
=============================================================================
-->

# Where to implement `control/height-default` and `control/height-compact`

## The situation in one line

These two variables **already exist in Figma and are already bound to real components** — they are
just **missing from your exported collections**, so the repo cannot legally cite them and has been
writing the raw numbers `30` and `24` everywhere instead.

| | value | status in Figma | status in your export |
|---|---|---|---|
| `control/height-default` | **30** | bound, live-verified | **absent** |
| `control/height-compact` | **24** | bound, live-verified | **absent** |

Checked every collection you export — `Primitives`, Agency `Color Modes` / `Density Modes` /
`General`, Caregiver `Color Theme` / `Density Modes` / `General`. There is **no `control/*` group
in any of them**. The only `height` matches are `line-height/*`.

## Why this matters — it is not a cosmetic gap

`30` and `24` are the two most repeated raw numbers in the system. Seven separate contracts
independently flagged this same gap, and the kit writes the literals by hand:

**Contracts already flagging it:** `empty-states` · `page-header` · `column-arrangement` ·
`ddm-dropdown-menu` · `profile-side-navigation` · `table` · `button` (via empty-states' note).

**Kit CSS writing the raw literal today** (each comment says *"bare literal in Figma, no token exists"*):

| file | line | value |
|---|---|---|
| `components/css/buttons.css` | 73 | `min-height: 30px` |
| `components/css/buttons.css` | 188 | `min-height: 24px` |
| `components/css/column-arrangement.css` | 142 | `height: 30px` (pinned) |
| `components/css/column-arrangement.css` | 187, 223, 323 | `min-height: 30px` |
| `components/css/column-arrangement.css` | 117, 238 | `24px` |
| `components/css/fields.css` | 238, 380 | `height: 30px` |
| `components/css/checkbox-radio.css` | 109, 245 | `height: 24px` |

That is **12+ hard-coded declarations across 4 stylesheets** that should all move together if the
control height ever changes. Today they cannot.

---

## Recommendation

### 1. Put them in **Agency › Density Modes** — not General, not Primitives

`Density Modes` already holds exactly this family of tokens: `font-size/*`, `line-height/*`,
`spacing/*`, `letter-spacing/heading`. A control height is **density-sensitive by definition** —
"default" vs "compact" is literally density language, and if you later ship a compact density mode,
control heights must shrink with the type and spacing that already live there.

Putting them in `General` would freeze them across densities. Putting them in `Primitives` would
make them shared across portals, which breaks portal isolation — Caregiver is mobile-first and will
want different control heights.

```
Agency › Density Modes
  control/height-default  = 30   ← existing, just needs to be in the export
  control/height-compact  = 24   ← existing, just needs to be in the export
```

### 2. Consider a third: `control/height-large`

Not required, and **not proposed as a value** — I have not measured one. Flagging only because the
type scale has three steps (S/M/L) while controls currently have two. If your settings/tertiary
fields ever need a taller control, this is where it would go. **Your call whether it exists at all.**

### 3. Then bind these 12 sites

Once the token is in the export, each raw `30`/`24` becomes `var(--control-height-default)` /
`var(--control-height-compact)` — the files and lines are tabled above. That is a mechanical,
fully-verifiable change I can do in one pass with the gates proving nothing else moved.

---

## What I need from you

**One decision, two possible answers:**

- **(A) "They're real — refresh the export."** You re-export Agency (Density Modes at minimum) from
  Figma. I verify the two tokens land, then bind the 12 sites and retire the raw literals. This is
  the path I recommend — the values already exist and are already in use; the export is simply
  behind.
- **(B) "They shouldn't be tokens."** Then I record `30`/`24` as permanent RAW values with your
  ruling attached, and remove the seven "pending export" flags so nobody re-raises this every audit.

**Plus optional:** do you want `control/height-large`? (Default answer: no.)

## What I will NOT do without that ruling

Invent the values, add the tokens to the repo myself, or bind anything to a name your export does
not contain. The contracts stay honest — `30` and `24` remain marked RAW with this proposal linked —
until you rule.
