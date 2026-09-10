<!--
=============================================================================
FILE BRIEF: Entry point for the Universal Html Rules folder — what this folder
is, who owns it, the authority order, and how a rule gets changed. Every AI
tool and human reads this file FIRST.
CREATOR: Fable-WOUND-MGMT (C360-45862), on Singh's approved 14-decision plan | 2026-08-24
LAST MODIFIER: Fable-WOUND-MGMT | 2026-08-24
=============================================================================
-->

# Universal Html Rules — CareSmartz360

**Owner: Charanjeet Singh (design-system owner). Every rule change needs his logged
GO-AHEAD — no AI tool may add, change, loosen, or re-rate a rule on its own authority.**

This folder is the single home for the **universal** HTML/CSS authoring rules of
CareSmartz360: how classes are named, which CSS approach each portal follows, how
iconography works, how typography works, plus the anatomy of the **basic shared
components** (buttons, table cell structure, checkbox, radio, dropdown, tags/chips…).

It sits at document level beside `/Users/netsmartz/Documents/Design-System/Variables` — deliberately
outside any feature or workspace folder — for the same reason Variables does: so every
project reads one copy instead of restating its own.

## What is universal vs local (Singh's own boundary)

> *"Variables are at global level; by using those variables components can be at local
> level, but yet some components can be at global level."*

- **Universal (here):** authoring approach + basic shared components. If a second feature
  would need the same answer, it belongs here.
- **Local (feature folder):** HTML designs and special cases for that particular feature
  only. Features never restate a universal rule — they link to it, and they file a flag
  (see `RULE-FLAGS.md`) when a rule doesn't fit.

## Authority order (Singh's ruling, 2026-08-24)

**Figma > Universal Html Rules > feature folder.**

1. **Figma** is design truth. When this folder disagrees with Figma, this folder is
   corrected — never the other way round.
2. **This folder** governs every feature and project. A feature deviating from a rule here
   needs either a Singh-approved EXCEPTION (see `EXCEPTIONS.md`) or a rule change.
3. Figma-vs-GitHub conflicts are not resolved here — they go to Figma AI on Jira
   (design-system epic C360-3526 routing).

For variable **values**, the input authority is `/Users/netsmartz/Documents/Design-System/Variables`
(owner-downloaded exports) and the delivery authority is the GitHub design-system repo —
per the epic's own authority block. This folder never states token values; it states which
tokens to bind and how.

## Who does what (Singh's ruling, 2026-08-24, verbatim)

> *"Any comment on jira or add edit jira + any changes on github will be done by Opus only.
> you Fable will only plan the things for this Jira and Github and handover to Opus."*

- **Singh** — owns and approves everything.
- **Design System Agents conversation** — operates the learning loop (flags, audits,
  making every feature follow the gates). See `HANDOFF-DESIGN-SYSTEM-AGENTS.md` (written at
  close-out).
- **Opus** — performs all Jira writes and all GitHub changes.
- **Feature sessions (e.g. Fable on Wound Management)** — consume the rules, run the
  checks, file flags. They never adjudicate.

## How a rule gets changed (the learning loop, short form)

**Flag → validate → Singh rules → fix → broadcast.**
File a row in `RULE-FLAGS.md` (anyone can). The maintainer reproduces it against evidence.
Singh rules: rule updated / named EXCEPTION / rejected. The rule file gets a version line,
the matching check in `04-checks/` is updated **and re-proven to fail on a violation**,
`CHANGELOG.md` is appended. Full procedure in the handoff doc.

**Never loosen a check to make a build pass.** Inherited verbatim from SPEC-07:
*"Without a named, dated, checkable later authority, 'the requirement changed' is loosening
with better presentation."*

## Folder map

| Path | Holds | State |
|---|---|---|
| `00-AI-MANDATORY-RULES.md` | the 8 mandatory rules from epic C360-3526, on disk at last | transcribed, awaiting Singh ratification |
| `01-universal/` | naming, CSS approach, iconography, typography, responsive, accessibility | being assembled |
| `02-components/` | basic shared components ONLY — one doc per atom, per-element comments | being assembled |
| `03-portals/` | per-portal bindings; empty portals carry a NO-CONTENT sentinel | scaffolded |
| `04-checks/` | machine checks — every rule that can be checked, is | being assembled |
| `RULE-FLAGS.md` | the learning loop's inbox | live |
| `EXCEPTIONS.md` | named special cases, evidence-backed, Singh-approved | live |
| `CHANGELOG.md` | append-only history, every entry Singh-approved | live |

## Reading rules for AI tools

1. Read this file, then `00-AI-MANDATORY-RULES.md`, then the `01-universal/` file for your
   task, then your portal's folder in `03-portals/`.
2. **A file is only authoritative if it says so.** Sentinel files marked
   `NO CONTENT YET — do not cite` are placeholders; citing one as authority is the exact
   decoy failure this ecosystem has been burned by twice (`ds-tokens-latest.json`,
   `design-tokens-export.scss`).
3. Rules here are stated with: ID · assertion · how a script tests it · severity · source —
   plus a plain-language summary, so both Singh (no code background) and developers can
   read them.
4. Anything you cannot satisfy: file a flag. Never silently deviate, never silently comply
   with what you believe is a wrong rule.
