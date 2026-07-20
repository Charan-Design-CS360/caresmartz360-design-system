# Repo Verification — caresmartz360-design-system vs LOCKED truth (2026-07-07)
> Verifier: Claude/Cowork. Repo commit `8f545b9` (main). Truth: locked `Primitives.CS360.V2.0.tokens.json` (SHA 78580c4…, 264 tokens, Figma DJBpjoXPMEw6bBAByIQaAy).
> Method: cloned repo read-only, diffed `ds-tokens-latest.json` ($version 2.4.7) primitives vs truth. **All numbers below verified live.**

## VERDICT: ❌ Repo primitives are FALSE + INCOMPLETE. Do not use until corrected.

### 1. Brand blue is WRONG (worst issue)
Repo `primitives.colors.blue.*` = **Tailwind default blue**, not the CareSmartz brand.
| step | repo (Tailwind) | TRUTH (brand) |
|---|---|---|
| 50  | #eff6ff | #f0f7ff |
| 500 | #3b82f6 | #2499ff |
| 600 | #2563eb | **#0077ff** |
| 700 | #1d4ed8 | #005ce6 |
| 950 | #172554 | #001f52 |
There is no `brandblue` family in the repo at all — brand identity colour is lost.

### 2. Massively incomplete — 38 color tokens vs 138 in truth
- **Entirely missing families:** neutral (12), orange, purple, pink, cyan, lime, fuchsia (11 each), opacity (4), zblack, and the **whole status-color palette (41 tokens)**.
- **Truncated families:** gray missing 950 · red missing 6 steps · green missing 5 · yellow missing 7.
- Where families DO exist (gray/red/green/yellow present steps): **values are correct** (0 genuine hex mismatches) — just cut short.

### 3. Missing non-color primitive groups
Repo primitives = colors, spacing, typography, radius, shadow.
Missing vs truth: **fonts** (weights/leading/tracking), **border-width**, **z-index**, **duration**, **shadow-color**, **status-color**.

### 4. Metadata is misleading
`$metadata.figmaFile = DJBpjoXPMEw6bBAByIQaAy` (correct file) but the values are NOT that file's export — they were hand/AI-generated with Tailwind defaults. Version scheme (2.4.7) also disagrees with the token file's own `system/version = 1.0.0`.

## Fix = replace repo primitives with the LOCKED truth (264 tokens verbatim), then rebuild semantic/component on top.
