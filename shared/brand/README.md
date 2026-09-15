# CareSmartz360 Brand Assets

Brand identity assets shared across all portals (Agency, Caregiver, Staff, Client).

## Logo Variants

| Variant | File | Usage | Min Width |
|---|---|---|---|
| `logo-full` | Full monogram + wordmark + tagline | Hero, login, print | 200px |
| `logo-full-compact` | Compact for navigation | Nav bar, sidebar | 120px |
| `logo-monogram` | Standalone three-figure icon | Favicon, app icon | 24px |
| `logo-wordmark` | Text-only "CareSmartz360" | Breadcrumb, footer | 100px |

## Brand Colors

### Monogram
- Pink: #F386A1 · Magenta accent: #E33D8A
- Green: #83C994 · Sky Blue: #4FC6E0
- Teal accent: #00A4C4

### Wordmark
- Brand Blue: #1C83C6 · Dark Gray: #232323 · Medium Gray: #808285

## Architecture

**PROPOSED (not yet ruled):** Figma-AI proposes treating brand identity as "Layer 0" above
primitives. The four-layer architecture is Singh-governed — this stays a proposal until he
rules; for now `shared/brand/` is simply the shared brand-asset area (like `shared/primitives`).

See `logo.json` for the machine-readable contract with clearspace, minimum-size, background, and misuse rules.
## Status (repo-side verification, 2026-09-15)

- All 3 Figma nodes existence-verified live; componentKeys and artwork hex values are
  Figma-AI-provided and not yet independently verified (see `logo.json` → `$meta.verification`).
- **Asset binaries are NOT committed yet** — the svg/png/pdf paths in `logo.json` are declared
  targets; export from Figma and commit them to make the paths real.
- `logo-wordmark` has no Figma node yet (Figma-AI follow-up).
- ⚠️ The wordmark blue **#1C83C6 is logo artwork**, not the UI Brandblue token **#0077FF**
  (locked by ruling). Never swap one for the other.
