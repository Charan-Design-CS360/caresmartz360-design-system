<!--
=============================================================================
FILE BRIEF: Handover from the Wound Management lane (Fable) to the Design System
Agents conversation. Everything here was verified against Figma, the GitHub repo
at origin/main, and the owner's Variables export on 2026-08-24. Nothing is
inferred. The receiving lane owns the follow-through; the Wound Management lane
returns to its feature.
CREATOR: Fable-WOUND-MGMT (C360-45862) | 2026-08-24
=============================================================================
-->

# Handover — Design System Agents lane

**Singh's instruction, 2026-08-24:** *"Flag to Design system Agent in other conversation
incase github repo infromation is limited, less or does not as per the figma compeotns, so it
can match the design sys. here we will focus on wound management."*

This is that flag. Seven items, each with evidence and a recommended action. **Nothing here is
a Wound Management problem** — they are design-system-level gaps found while building it.

## The headline: GitHub cannot currently answer "what shape is this component?"

Singh's belief was that button specs are already in GitHub. Verified across **all 105 files on
`origin/main`**:

| What GitHub has | What GitHub lacks |
|---|---|
| Button **token bindings** — `docs/CARESMARTZ360-DS-REFERENCE.md` correctly maps Angular Material to `--action-primary-bg`, `--action-primary-text-neutral`, `--action-primary-hover`, `--action-primary-pressed` | **Any button geometry** — no height, padding, radius, gap, icon size |
| `src/styles/3-components/` — `_cards.scss`, `_shift-cards.scss`, `_tables.scss` | **No `_buttons.scss`. No field/input component. No chip/tag component.** |
| `components/component-mapping.json` with a `Button` entry | That file **discredits itself in its own `$metadata.warning`**: *"every figmaNodeId below (1:100, 1:200, 1:300… in clean round hundreds) looks fabricated… None of this file's node IDs have been confirmed against live Figma."* Its Button node id is `1:100`; its variants (`primary/secondary/ghost/danger/link`, sizes `sm/md/lg`) do not match the real component; and its `figmaFile` is `DJBpjoXPMEw6bBAByIQaAy` — the **Primitives** file, not the Agency DS file |

**So an AI tool sent to GitHub for a button today gets the right colours, no dimensions, and a
component registry that warns it is fabricated.** That is the gap to close.

## Item 1 — Publish the Figma component specs into GitHub (Singh's explicit ask)

> *"after freezing the compoents we must same update to github also so next time any ai tool
> will go to github so github can give enhough infromation with proper commenting so any AI
> tool can easilyuse the compeotns without geuesswork"*

**Source material already exists and is verified** — two specs written 2026-08-24 from live
Figma, with verbatim payloads saved beside them:

| Spec | Figma source | Contents |
|---|---|---|
| `Wound Management/05-Specs/components/SPEC-07b-buttons.md` (66 KB) | section `26938:66536` "AI Button component" | full anatomy, all states, the `action/{type}/*` formula, per-icon padding table, DOM structure |
| `Wound Management/05-Specs/components/SPEC-17-fields-type-1.md` (54 KB) | component set `26938:65997` `field-set-type1` | field anatomy, 7 state variants, grid geometry |
| plus 8 earlier specs | Tables/Popups/Checkbox-Radio-Toggle/Tabs/Dropdown-Upload/Tooltip/Textfield pages | see `README-SPEC-RELIABILITY.md` for what is measured vs derived |
| raw payloads | `05-Specs/components/raw-figma/`, `raw-payloads/` | verbatim, so any number is re-checkable |

**Recommended action:** the receiving lane converts these into repo-native component contracts
under `portals/agency/components/` (the folder exists on `origin/main` with only a README) —
with the per-element commenting Singh asked for — and **Opus performs the GitHub write** (Singh's
standing rule: all Jira and GitHub writes are Opus's; Fable is read-only there).

## Item 2 — Figma's own button spec REQUIRES alpha that a naive token pipeline destroys

Verbatim from the Figma section (`raw-figma/RAW-07b-button-section-26938-66536.txt`):
> *"Focus state adds: action/focus/ring (strokeWeight 2, **opacity 0.4**)"*
> *"Disabled stroke: border/transparent (**opacity 0**, strokeWeight 1)"*

Found independently the same day: the Wound Management token generator was reading only the
`hex` field of the DTCG export and **dropping `alpha` entirely** — flattening 25 translucent
tokens to opaque across the two portals. Consequences had this shipped: **every focus ring a
solid black bar, every disabled button a solid black border.** Fixed locally (override-ledger
row 24) and guarded by `verify-token-fidelity.py`, which compares generated CSS back against
the raw export and was proven to fail on the reintroduced defect while **all six pre-existing
checks passed**.

**Recommended action:** treat "preserve alpha" as a design-system-wide pipeline rule, and check
whether any other consumer (`tailwind.config.js`, `ds-tokens-*.json`, the SCSS tree) has the
same flattening. `verify-token-fidelity.py` is portable — promote it.

## Item 3 — Load-bearing geometry is NOT token-bound in Figma

| Component | Raw value | Evidence |
|---|---|---|
| Button `min-height` | **30px** standard, **24px** compact — no variable | SPEC-07b §"Container height … **RAW.** Not token-bound — DS gap" |
| Button `min-width` (icon-only) | 30px / 24px, raw | same |
| Fields type 1 grid rows | **26px / 34px**, raw | SPEC-17 §G3 |
| Fields type 1 misc | 10px gaps, 22/20/18/30/16/8px box heights, 2px label gap — all raw | SPEC-17 §G3 |

**Recommended action:** decide whether a `size/control-height` (or density) token family should
exist. Until then every consumer hardcodes 30px and no checker can validate it against a token.

## Item 4 — Figma binding rule ⑦ contradicts the no-raw-hex rule

Verbatim from the Figma spec: *"⑦ If the codebase doesn't support 3-tier variables, use hex
values but organize per project conventions."*

Our codebases **do** support variables, so ⑦ does not apply here — but an AI tool reading the
spec cold could invoke it as permission to hardcode, defeating rules ① and the repo's own bans.

**Recommended action:** scope ⑦ explicitly ("does not apply to CareSmartz360 portals") or remove it.

## Item 5 — Binding rules live in Figma ANNOTATIONS, which may be invisible to AI tools

Verbatim: *"⚠ AI Tools: Binding rules and token mappings are in component ANNOTATIONS. Read
annotations on each Button/* component set before modifying."*

**Unverified:** whether Figma annotations are returned by `get_design_context` /
`get_metadata` at all. If they are not, the spec is directing AI tools to content they cannot
read. **This needs testing, not assuming** — I did not test it.

## Item 6 — Already posted to Jira, tracking only

Posted 2026-08-24 14:40 on **C360-44027** (comment 628667): radius token naming differs between
portals (`border-radius/rounded-*` vs `radius/rounded-*`, and `rounded-sm` is **2px in Agency,
4px in Caregiver** — same name, two values), and Caregiver density is missing
`line-height/caption` + `line-height/micro` that Agency has.

## Item 7 — Drafted, awaiting Opus to post

`text/success` (the audit trail's green new-value text, mandated by C360-42760) measures
**3.30:1** on `surface/base` in Light — below AA 4.5:1 at 12px. `tags/green` is the identical
hex, so no other Agency token does better, and choosing a darker green by hand would be an
invented value. Both High Contrast gates pass (11.58:1, 5.02:1). **Soft flag** under Singh's
policy. Needs a darker `text/success` in Light — a token decision.
Registered as Q6 in `Wound Management/02-Conflicts/OPEN-QUERIES.json`.

## Also worth the receiving lane's attention

- **The local `Design-System/` folder now mirrors what should be in GitHub.** Singh consolidated
  it 2026-08-24 16:05: `Variables/`, `caresmartz360-design-system/`, `design-kit/`,
  `poc-design-system/`. Keeping that folder and `origin/main` in parity is this lane's job.
- **The repo working tree is 20 commits behind `origin/main`** on branch
  `Antigravity-AI-Figma-v2.6.0-Sync`, and **22 markdown files on `origin/main` are absent
  locally** — including all six governance contracts. Anyone reading the working tree is
  reading a stale side branch. Syncing is Antigravity's lane; Singh dispatches.
- **The owner's Variables export was NOT re-synced** after the 2026-08-20 Figma contrast fixes.
  The Jira reply claimed "synced to local exports"; the export members are still dated
  **2026-08-14 18:22** with the old failing values. Singh is re-exporting. An answer is a claim,
  not a verified state.
- **Two near-duplicate design-system repos** (`caresmartz360-design-system` and
  `poc-design-system`) share a near-identical `src/styles` tree; only the poc copy has the
  working `tools/check-token-contract.mjs`. `SYSTEM-FILE-MANIFEST.md:50` already logs this as an
  open §20 single-clone violation.
- **Universal Html Rules** (`/Users/netsmartz/Universal Html Rules/` — document level) is
  scaffolded: the 8 mandatory rules transcribed from epic C360-3526, CONTRADICTIONS (C1–C10 +
  S1–S11), OPEN register (O-1…O-18), RULE-FLAGS (F-001…F-006), EXCEPTIONS (EX-001…003), and six
  rule files in `01-universal/`. **Four of those six are written but UNVERIFIED** — their
  verifier agents died on a session limit. They must be re-verified before ratification.
  `00-DECISION-SHEET-PENDING.md` holds six items awaiting Singh.
