<!--
=============================================================================
FILE BRIEF: The universal icon standard for every CareSmartz360 portal —
which icon set, how icons are rendered, where genuine glyph geometry comes
from, and the machine checks that already exist to enforce all of it. Rules
UHR-121..129. SUPERSEDES the one-line icon rules in ECOSYSTEM-RULES §10
(line 337) and MASTER-AI-INSTRUCTIONS §3 (line 75), which it cites as sources.
Built from Office_Work/memory/icons.md + the verified Wound Management
implementation (vendor-icons.py, PROVENANCE.md, verify-build.py §5b,
verify-icons-render.mjs) + DS-FIGMA-NODE-INDEX.md.
CREATOR: Fable-WOUND-MGMT | 2026-08-24
STATUS: ASSEMBLED — Singh ratification pending
=============================================================================
-->

# Iconography — the universal icon standard

Every icon in every CareSmartz360 portal comes from one set (Google Material Symbols,
Rounded), is drawn from one genuine source (Google's own per-icon files, or the Figma
file's own asset where no symbol matches), and is rendered one way in HTML/CSS
deliverables (an inline SVG sprite — never the Google web font, which failed live).
Nothing here is a style preference: each rule below traces to a Singh decision or a
verified source, and the two hard rules (render method, never-invent-a-path) each exist
because a real build shipped the violation and was rejected.

## Source status — read this before citing

The authoritative source document is **`Office_Work/memory/icons.md`**. Its move into
this folder is **decision-sheet item D** (`00-DECISION-SHEET-PENDING.md` §D, first row)
and is **still pending Singh's GO**. Until that GO:

- **This file states the RULES in machine-checkable form.** It is the checkable layer.
- **The confirmed glyph reference map** (Scheduling-calendar names: `calendar_month`,
  `delete`, `mail`, `add`, `expand_more`, `search`, `chevron_left`/`chevron_right`,
  `notifications`/`settings`/`help`) **stays in `memory/icons.md`** ("Reference icon
  map", lines 42–54) — cite it there; do not duplicate it.
- After the move is ratified, the map merges into this file and `memory/icons.md` is
  deleted at source per item D's rule (sha-recorded backup, references redirected).

---

## UHR-121 — One icon set: Material Symbols, Rounded

- **Plain-language summary:** Every icon everywhere is a Google Material Symbol in the
  Rounded style — never a hand-drawn shape, never another icon library.
- **Assertion:** All icon glyphs in any CareSmartz360 deliverable (prototype, spec
  visual, live portal) are Google **Material Symbols, Rounded**. Hand-drawn / custom
  SVG paths and other libraries (Feather, Lucide, Heroicons, Font Awesome, etc.) are
  forbidden. The only sanctioned non-Material glyphs are the Figma-asset cases in
  UHR-128 (per Ruling B — see UHR-124).
- **How a script tests it:** (a) grep for other-library fingerprints — class/attribute
  strings `feather`, `lucide`, `heroicon`, `fa-`, `fontawesome`, and their CDN hosts —
  zero matches; (b) hand-drawn geometry is caught structurally by UHR-124's stray-path
  check; (c) every sprite `<symbol>`'s geometry matches a recorded provenance row
  (UHR-124) whose source is Google's endpoint or a named Figma asset.
- **Severity:** BLOCK
- **Source:** `memory/icons.md` GLOBAL RULE (lines 3–5: "All icons are **Google
  Material Symbols, Rounded** style. **Never** use hand-drawn / custom SVG paths or
  other icon libraries"); `MASTER-AI-INSTRUCTIONS.md` §3 line 75; `ECOSYSTEM-RULES.md`
  §10 line 337. This file supersedes those two one-liners as the normative statement.

## UHR-122 — Render method: inline SVG sprite, never the web font

- **Plain-language summary:** In HTML/CSS deliverables the icon is real SVG baked into
  the page — the Google icon *font* is banned because when it fails to load, the page
  shows the icon's name as text instead of the icon.
- **Assertion:** HTML/CSS prototypes and static deliverables render Material Symbols as
  an **inline SVG sprite** (per Singh's DECISION 2026-06-17). The web-font/ligature
  method (`<span class="mi">expand_more</span>` + a Google Fonts `<link>`) is
  deprecated and must not appear in new work. icons.md's recorded reason, verbatim:
  the font approach *"renders the literal word ("expand_more") whenever the Google
  font fails to load — which it did in a live screenshot. Inline SVG always renders."*
  The icon SET is unchanged — only the rendering method.
- **How a script tests it:** `"Material+Symbols" not in html` — no Google Fonts
  stylesheet link for the icon font (promoted from `verify-build.py` §5b, lines
  179–181; also implied by SPEC-07 UIG-075's no-CDN rule, see CONTRADICTIONS C5);
  plus no `<span class="mi">` carrying a bare ligature word as its text content.
- **Severity:** BLOCK
- **Source:** `memory/icons.md` lines 9–13 (Singh DECISION 2026-06-17) and lines 28–32
  (legacy method marked deprecated). **CONTRADICTIONS C1 + C10:** origin/main's
  `AI-TOOLS-GUIDE.md` and `Agency/CLAUDE.md` L92–95 still teach the deprecated font
  method — both rows are ✅ RULED superseded; never follow them on this point.

**WRONG** (deprecated font method — C1/C10):

```html
<!-- WRONG: icon font via CDN. When the font fails, the user reads "delete" as text. -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:..." rel="stylesheet">
<span class="mi">delete</span>
```

**CORRECT** (inline sprite — UHR-123's convention):

```html
<!-- CORRECT: glyph geometry lives in the page; nothing external can fail to load. -->
<svg class="mi" aria-hidden="true"><use href="#i-trash"></use></svg>
```

## UHR-123 — The sprite markup convention and the `.mi` class

- **Plain-language summary:** Each icon is defined once in a hidden block at the top of
  the page, then reused by reference; one shared class makes every icon size itself
  from the surrounding text and take the surrounding text colour in every colour mode.
- **Assertion:** Define each icon once as a hidden `<symbol id="i-NAME">` inside one
  `<svg style="display:none">` sprite at the top of `<body>`; reference it as
  `<svg class="mi"><use href="#i-NAME"></use></svg>`. The `.mi` class sizes the icon
  by `font-size` and sets `fill:currentColor`, so every icon follows the semantic text
  colour (`icon/*` / `text/*` tokens — SPEC-07 §C lists the `icon/` group: `brand,
  danger, disabled, inverse, primary, secondary, soft, success, warning`) in every
  colour mode. No fixed fills on glyphs.
- **How a script tests it:** promoted from `verify-build.py` §5b (lines 156–178) and
  `verify-icons-render.mjs`: (a) a hidden `<symbol id="i-*">` sprite is present;
  (b) icons are referenced via `<use href="#i-*">`; (c) every `<use>` resolves to a
  defined symbol **that carries geometry** (`path/circle/rect/polygon`); (d) in real
  Chrome, every visible `svg.mi` paints at **≥ 4px** in both dimensions (a `<use>`
  into a missing/empty symbol silently renders a 0×0 box — a static grep cannot catch
  that, so this check measures, it does not read); (e) `fill:currentColor` is present.
- **Severity:** BLOCK
- **Source:** `memory/icons.md` lines 15–26 (markup + CSS, quoted below);
  `verify-build.py` §5b; `verify-icons-render.mjs` (geometry + ≥4px paint check,
  lines 23–31).

The sprite and reference, from icons.md lines 16–20, comments added:

```html
<!-- SPRITE: the page's icon library. display:none hides it; <use> can still clone
     from it. Lives once, at the top of <body>. Each <symbol> is one glyph whose
     path came from Google's endpoint or a Figma asset (UHR-124) — never typed in. -->
<svg style="display:none">
  <!-- one glyph: id is "i-" + the build key; viewBox is whatever the genuine
       source file declares (Google's Material Symbols files use "0 -960 960 960") -->
  <symbol id="i-chevron" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></symbol>
</svg>

<!-- USAGE: an instance of the glyph. class="mi" gives it size + colour behaviour;
     aria-hidden because a decorative icon must be silent to screen readers (a
     meaningful one needs a text alternative on its interactive parent instead). -->
<svg class="mi" aria-hidden="true"><use href="#i-chevron"></use></svg>
```

The reusable class, verbatim from icons.md line 24, per-element comments added:

```css
/* .mi — every icon instance, all portals, all colour modes.
   States: none of its own; it inherits colour from whatever component state
   (default/hover/disabled/danger...) sets `color` on the parent. */
.mi {
  display: inline-block;   /* participates in text flow like a character */
  width: 1em;              /* 1em × 1em: the icon sizes itself from the parent's */
  height: 1em;             /*   font-size, so contextual type rules keep working */
  font-size: 18px;         /* icons.md's documented default; context overrides via font-size */
  fill: currentColor;      /* THE colour binding: the glyph paints with the parent's
                              `color`, i.e. whatever semantic token the component
                              binds — e.g. Figma `icon/secondary` -> var(--icon-secondary)
                              on a field chevron — so icons respond to every colour
                              mode through the semantic layer, never a fixed fill */
  flex-shrink: 0;          /* never crushed inside flex rows (buttons, chips, cells) */
  vertical-align: middle;  /* optically centres against adjacent text */
}
```

## UHR-124 — Never invent a path

- **Plain-language summary:** Nobody — human or AI — ever draws or guesses an icon's
  shape. The shape is downloaded from Google's official file for that exact icon; if
  no Google symbol matches the design, the shape comes from the Figma file's own asset.
- **Assertion:** Every glyph's geometry is either (a) downloaded from Google's official
  per-icon endpoint
  (`https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/<name>/<default|fill1>/24px.svg`,
  verified live 2026-08-21, HTTP 200) and recorded with its URL, byte count and
  sha256, or (b) where no Material Symbol matches Figma, taken from the Figma file's
  own asset (Singh Ruling B, 2026-08-21: Material Symbols Rounded first, only where
  the symbol is exactly what Figma shows; must respond to colour modes through the
  semantic layer; **"never invent a path"**). Every shipped glyph carries a
  provenance record at one of exactly three levels. From
  `Wound Management/04-Prototype/icons/PROVENANCE.md` ("three, never blurred"),
  verbatim:
  - **`figma`** — "symbol name **read from a Figma node** via `get_design_context`"
  - **`singh`** — "name is in `Office_Work/memory/icons.md`'s confirmed map"
  - **`inferred`** — "**my** name choice, mapped from the old hand-drawn stand-in"

  `inferred` is not a licence to guess a *path* — the path is always Google's; the
  flag marks that the NAME choice awaits confirmation against the portal's Figma
  Icons page.
- **How a script tests it:** zero `<path d=` outside a `<symbol>` (promoted verbatim
  from `verify-build.py` §5b, lines 162–169 — strip the sprite, then any remaining
  `<path d=` is a stray, hand-placed shape); every sprite glyph has a row in the
  provenance record (`icons/material-symbols-rounded.json` schema: `source_url`,
  `bytes`, `sha256`, `provenance`, `why`) whose sha256 matches a re-fetch.
- **Severity:** BLOCK
- **Source:** Singh Ruling B 2026-08-21, recorded in
  `Wound Management/04-Prototype/vendor-icons.py` lines 13–15; endpoint lines 20–23;
  provenance levels: vendor-icons.py lines 25–32 and the generated
  `icons/PROVENANCE.md` lines 19–30. Working implementation: `vendor-icons.py` +
  `icons/PROVENANCE.md` (63 glyphs, zero hand-drawn).

**WRONG** (what got the 2026-08-21 build rejected):

```html
<!-- WRONG: a hand-drawn "geometric stand-in" typed by an AI. 1,115 of these
     shipped across three builds; Singh rejected the build: "nothing is matching". -->
<svg viewBox="0 0 24 24"><path d="M4 4 L20 4 L20 20 L4 20 Z M8 9 h8"/></svg>
```

**CORRECT** (vendored, provenanced):

```html
<!-- CORRECT: geometry fetched by vendor-icons.py from Google's per-icon endpoint,
     recorded in PROVENANCE.md with URL + bytes + sha256, provenance level "singh"
     (name from memory/icons.md's confirmed map). Never edited by hand. -->
<symbol id="i-trash" viewBox="0 -960 960 960"><path d="…(Google's bytes, verbatim)…"/></symbol>
```

## UHR-125 — Filled vs outline is the FILL axis, never a different icon name

- **Plain-language summary:** Whether an icon is solid or outlined is decided per icon
  by Figma; you switch between the two looks with the icon's fill setting, never by
  swapping to a differently-named icon.
- **Assertion:** Filled vs outline is **per-icon, per Figma** ("Mixed by design: some
  filled, some outline… Always confirm per icon against Figma — do not assume" —
  icons.md Fill convention). It is toggled via the FILL variation axis / variant —
  dev handoff: `font-variation-settings: 'FILL' 0|1` — **"NOT by swapping to a
  different icon name"** (icons.md Dev handoff). In the sprite pipeline the same axis
  is the vendored variant (`default` = FILL 0, `fill1` = FILL 1 in
  `vendor-icons.py` / PROVENANCE.md).
- **How a script tests it:** every provenance row carries a `variant` of `default` or
  `fill1`; flag any pair of sprite keys whose Material names differ only by an
  `_outline`/`_filled`-style suffix (name-swap smell) for human review against Figma.
- **Severity:** WARN (the per-icon filled/outline *choice* needs the Figma Icons page,
  which is still an open confirmation task — icons.md "To finalize")
- **Source:** `memory/icons.md` lines 34–36 (Fill convention) and 38–40 (Dev handoff);
  `PROVENANCE.md` "FILL axis" section.

## UHR-126 — Reading Figma's icon layer names

- **Plain-language summary:** Figma labels its icons with old-style export names; strip
  the tail off the layer name and you have the real Material Symbols name.
- **Assertion:** Figma's icon layers use the legacy Material export naming (e.g.
  `error_outline_black_18dp`, `file_download_black_24dp`). **Strip `_black_NNdp` to
  get the Material Symbols name.** A raw `*_black_NNdp` string is a Figma layer
  label, never a shippable symbol name or sprite id.
- **How a script tests it:** no string matching `_black_\d+dp` appears in any shipped
  markup, sprite id, or provenance `symbol` column.
- **Severity:** WARN
- **Source:** `Wound Management/05-Specs/DS-FIGMA-NODE-INDEX.md` lines 126–135 ("Strip
  `_black_NNdp` and you have the Material Symbols name" — this raised the icon set
  from 3 Figma-confirmed names to 28).

## UHR-127 — No emoji or pictographs as icons

- **Plain-language summary:** An emoji is not an icon — it renders differently on every
  OS and ignores the design system's colours entirely.
- **Assertion:** No emoji/pictograph characters are used as icon glyphs in any
  deliverable. Icons are sprite references (UHR-123), full stop.
- **How a script tests it:** promoted verbatim from `verify-build.py` (lines 183–186):
  scan every document for characters above U+2190, excluding the box-drawing block
  U+2500–U+257F; the result set must be empty.
- **Severity:** BLOCK
- **Source:** `verify-build.py` §5b emoji check (lines 183–186); consistent with
  UHR-121's one-set rule.

## UHR-128 — File-type icons are Figma assets, not Material Symbols

- **Plain-language summary:** The little csv/PDF/Word/image file badges are the design
  system's own artwork from Figma — don't substitute look-alike Material icons.
- **Assertion:** The file-type icons (csv/txt/PDF/Excel/Word/img/audio/Video/Generic)
  are Figma assets marked **"Use svg formats"** — as are `atom icon Delete & Remove`
  (`Property 1=Remove|Bin`), `Icon / More`, `Icon / More DDM`. They are exported from
  the Figma file, carried through the same sprite (UHR-123) with provenance level
  `figma` (UHR-124), and never replaced by approximate Material Symbols.
- **How a script tests it:** provenance rows for these keys must NOT carry a
  `fonts.gstatic.com` `source_url`; their source is the Figma export. (Full
  verification is a human/Figma diff — the script catches only the wrong-source case.)
- **Severity:** WARN
- **Source:** `DS-FIGMA-NODE-INDEX.md` lines 137–141 ("Not everything is a Material
  Symbol… Ruling B covers this: where no symbol matches, use the Figma file's own
  asset, never an invented path").

## UHR-129 — An icon check counts only once it has been shown to fail

- **Plain-language summary:** A checker that has never caught a violation proves
  nothing — the first icon checker actively *required* the mistake it was named after.
- **Assertion:** Any automated check enforcing UHR-121..128 must be demonstrated to
  FAIL on a known-violating input before its PASS is trusted. Recorded precedent
  (`verify-build.py` §5b docblock, lines 143–155): checker v1 "asserted
  `class="ico"` > 20 → REQUIRED the hand-drawn SVG the rule forbids. Passed 792
  hand-drawn paths through three verification rounds"; v2 demanded the deprecated web
  font; v4 finally encoded the documented convention. "Four attempts at one check.
  The rule never moved; I just never read it."
- **How a script tests it:** the check suite ships a deliberately-violating fixture per
  rule and asserts the checker reports it.
- **Severity:** INFO
- **Source:** `verify-build.py` §5b docblock (lines 143–155).

---

## Why the two hard rules exist — one line each

- **1,115 hand-drawn "stand-in" paths shipped across three builds and Singh rejected
  the build on 2026-08-21** ("nothing is matching … icons") — hence UHR-124
  (`vendor-icons.py` lines 5–11).
- **The first checker (v1) REQUIRED the very violation it was named after** and passed
  792 hand-drawn paths through three verification rounds — hence UHR-129
  (`verify-build.py` §5b docblock).

## Per-portal / handoff notes

- **Scope of the sprite rule (UHR-122/123):** icons.md states it for "HTML/CSS
  prototypes & reviews". Its **Dev handoff** section (lines 38–40) separately
  sanctions, for live **Angular + Material M3** code, the Material Symbols Rounded
  font or `<mat-icon>` configured to the Rounded font, with FILL toggled per UHR-125.
  Whether Singh's 2026-06-17 inline-SVG decision also extends to live portal code is
  **not stated in any source** — this file encodes only what is written. Flagged for
  the registers (see report to Singh).
- **Which Figma Icons page:** per icons.md, Agency's is in file `4bh29laapcuKBTghfaRXF0`
  ("# Icons" page `10448:18621` per DS-FIGMA-NODE-INDEX); other portals have their own
  semantic-layer files. Note **CONTRADICTIONS C7** leaves that file's overall *role*
  OPEN — cite the row before relying on the file for anything beyond its Icons page.
- **Open confirmation task (all portals):** icons.md "To finalize" — read each portal's
  Figma Icons page to lock exact symbol names + per-icon FILL. Until then, 28 of the 63
  vendored Wound Management glyph *names* are provenance level `inferred`
  (PROVENANCE.md) and await confirmation; their *paths* are already genuine.

## Related registers

- **CONTRADICTIONS.md:** C1 (render method — RULED, inline SVG), C10 (Agency/CLAUDE.md
  ligature markup — RULED, same ruling), C5 (no CDN links — RULED, self-contained),
  C7 (Figma file role — OPEN, affects the Icons-page pointer only).
- **OPEN-REGISTER.md:** no O-row currently covers icons; the two icon-scoped open
  items (live-code render method; per-icon name+FILL confirmation) are proposed
  additions — see the assembly report.
- **EXCEPTIONS.md:** none apply to this file.
- **Decision sheet:** `00-DECISION-SHEET-PENDING.md` item D row 1 (icons.md move —
  pending), which gates the merge of the glyph reference map into this file.

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-24 | Assembled from memory/icons.md, MASTER-AI-INSTRUCTIONS §3, ECOSYSTEM-RULES §10, Wound Management vendor-icons.py + icons/PROVENANCE.md + verify-build.py §5b + verify-icons-render.mjs, DS-FIGMA-NODE-INDEX.md | Approved plan step 2 |
