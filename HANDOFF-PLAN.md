# Track 1 / Track 2 handoff plan

Written by Claude, 2026-07-13, because Singh is low on Claude usage and needs
to hand execution to Antigravity (Track 1) and Codex (Track 2). This is the
single brief for both — read `VERIFICATION-LOG.md` in this repo for the full
audit trail behind every claim below.

---

## BLOCKER — must be decided before Track 1 can actually finish

`AI_CONTEXT.md` (Rule 3) bans module-specific token prefixes (no `--agency-`,
no `--admin-`, etc.) and wants global names instead. But the existing Agency
token system is built entirely on `--agency-*` prefixed names. **Antigravity
cannot do a real "Full Rebuild of Semantics" without this being resolved
first** — it will either have to guess, or perpetuate the same conflict this
whole audit was trying to fix.

**Singh needs to pick one, in one line, before Track 1 starts:**

- **Option A** — Go global/prefix-free (matches `AI_CONTEXT.md` as written, matches the `src/styles/2-semantics/` scaffold already drafted in this repo). Agency's existing `--agency-*` tokens get renamed/migrated.
- **Option B** — Amend `AI_CONTEXT.md` to explicitly allow portal-scoped prefixes. Keep `--agency-*`, add `--caregiver-*` etc. the same way going forward.

Tell Antigravity which option before it touches Tier 2.

---

## Track 1 — Antigravity: Full Rebuild of Primitives (Tier 1) + Semantics (Tier 2)

**Repo:** `caresmartz360-design-system` (this repo)

**Don't start from zero** — a full scaffold already exists at `src/styles/`
(built this session, uncommitted). It has:
- `1-primitives/` — colors, spacing, typography, effects. Verified live
  against Figma on 2026-07-08 (see file headers for the exact Figma link
  and node). Only gaps: Lime 400–950 (Figma pull was truncated) and shadow/
  easing values (carried over from the old repo, not re-verified).
- `2-semantics/` — light theme (verified brand colors), dark theme and
  high-contrast theme (**both are placeholder proposals, NOT verified** —
  see below), density modes (small/medium/large — also proposed, not from
  Figma), layout, a11y, status.
- `3-components/` — cards, tables, shift-cards (new, split out on request).

**What Track 1 actually needs to do:**
1. Resolve the BLOCKER above first (get Singh's answer, apply it to naming).
2. Open the **Semantic layer Figma file** in Figma desktop with Dev Mode MCP
   enabled (Figma menu → Preferences → Enable Dev Mode MCP Server):
   - Agency semantic file: `4bh29laapcuKBTghfaRXF0` — https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/--Design-System--Agency--V2.0
   - Caregiver semantic file (already has real Light/Dark/High-Contrast modes — 132 variables, use this as the reference for what real dark/high-contrast values should look like instead of my placeholders): `TSOq0ugv6zfr6gFZh5zYrP` — https://www.figma.com/design/TSOq0ugv6zfr6gFZh5zYrP/Caregiver-App?node-id=2767-61075
3. Pull real variable data (`get_variable_defs` / `get_design_context` on an
   actual component or page, not just a documentation snapshot page — that
   was the mistake in the original audit).
4. Replace every `⚠️ unverified` / `⚠️ PROPOSED` value in `src/styles/2-semantics/`
   with the real pulled value. Do not invent hex values — if something can't
   be pulled, leave it flagged rather than guessing (guessing is exactly how
   the original `#2563EB` / `#1976D2` conflict happened).
5. Regenerate `ds-tokens-latest.json` and `tailwind.config.js` from the same
   verified source so all three formats agree — or better, set up a Style
   Dictionary–style pipeline so they're generated automatically instead of
   hand-typed three times (see suggestion in `src/styles/README.md`).
6. Commit and push to `caresmartz360-design-system` main.
7. Update `VERIFICATION-LOG.md` with what was pulled and when — keep the same
   verified/proposed distinction going forward, don't drop it.

**Done when:** every token in `src/styles/1-primitives/` and
`src/styles/2-semantics/` traces to a live Figma pull with no `⚠️` markers
left, and it's pushed to `main`.

---

## Track 2 — Codex: Zero-Hex-Code Angular Dashboard (PoC for CTO pitch)

**Repo:** separate PoC repo (not this one)

**Depends on Track 1 being live** — this PoC should consume the tokens Track 1
produces, not invent its own. Don't start real styling work until Singh
confirms "Track 1 is complete, tokens are live."

**Scope:**
1. Small Angular dashboard, enough to demonstrate the design system to a CTO
   — doesn't need to be a real product page, needs to prove the token
   pipeline works end to end.
2. Every visual property (color, spacing, radius, shadow, font) must come
   from a CSS custom property defined in Track 1's output — zero hardcoded
   hex codes or raw pixel values anywhere in the PoC's styles. This is the
   actual test of whether Track 1's system holds up in a real app.
3. Include at least one instance of the `.shift-card` component (from
   `src/styles/3-components/_shift-cards.scss`) since that's the most
   domain-specific, real-world piece of this system — a generic card/button
   demo would prove less.
4. Wire up the theme + density switch (`data-theme`, `data-density`
   attributes) so the CTO demo can visibly toggle light/dark/high-contrast
   and small/medium/large live — that's the most convincing part of the
   pitch.
5. Acceptance check before calling it done: grep the PoC's stylesheets for
   any `#` hex code or raw `px` value outside of the token files themselves.
   Zero hits = zero-hex-code claim is actually true, not just asserted.

**Done when:** the dashboard renders, the theme/density switch works live,
and the hex-code grep comes back empty.

---

## Sequencing

```
Singh decides BLOCKER (Option A or B)
        ↓
Antigravity: Track 1 (primitives + semantics, verified, committed)
        ↓
Singh confirms: "Track 1 is complete. The tokens are live."
        ↓
Codex: Track 2 (PoC dashboard, consumes Track 1's tokens)
        ↓
CTO pitch
```
