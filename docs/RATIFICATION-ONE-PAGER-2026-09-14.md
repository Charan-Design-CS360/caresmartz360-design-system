# The rulebook waiting for your approval — one page, plain words

**For:** Singh · **From:** Claude (DESIGN-SYSTEM lane) · 2026-09-14
**What you'd be approving:** 7 rule documents in `rules/` that every AI already follows in
practice, but which have carried a "Singh ratification pending" stamp for 3+ weeks.

## What each file says (one line each)

1. **naming.md** — every element gets ONE kebab-case component class; `__part` for insides,
   `--variant` for versions; your `.cs-` prefix ruling (UIG-084) is now reflected.
2. **css-approach.md** — how CSS is written everywhere: tokens only (no hard-coded colors),
   your 80+ UIG rulings collected in one place (this file already IS your rulings).
3. **typography.md** — the font rules: one family, the fixed size/line-height pairs.
4. **iconography.md** — icons are inline SVG (your Jun-17 ruling), sized 20/24, never the
   Google web font.
5. **accessibility.md** — color is never the only signal, focus must be visible, labels on
   every control.
6. **responsive.md** — how layouts shrink: wrap + minimum widths, four breakpoints.
7. **00-AI-MANDATORY-RULES.md** — the 8 ground rules every AI must obey (verify live, never
   fabricate, portal isolation, gate before merge…).

## Why your approval matters

Right now each file says "pending" — so any AI (or person) can treat a rule as optional.
Your one word makes them binding. Nothing in these files is new: they were assembled from
your own past rulings, the epic's rules, and verified live-code evidence.

## What I recommend

Reply **"ratify the rulebook"** and I will stamp all 7 files ratified (date + your name),
remove the pending banners, and broadcast it. If you want to read any file first, say which
number and I'll give you a plain-words summary of just that one.

**Known leftovers (don't block ratification, tracked separately):** 2 open contradictions
(C7 file-roles, C8 spacing grid — need one sentence from you each, I'll ask one at a time),
and the "68 test recipes with no shipped checks" gap (the new strict CI + link gate started
closing it; more gates come as separate proposals).
