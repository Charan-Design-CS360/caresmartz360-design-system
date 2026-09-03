<!--
=============================================================================
PAIRED CONTRACT (human twin) for profile-side-navigation.json.
This file is the PLAIN-LANGUAGE spec; the .json is the machine spec; the CSS is
Universal Html Rules/02-components/profile-side-navigation.css. Keep all three
in sync. Measured live from Figma (Design System Agency V2.0) on 2026-09-03 by
Claude (DESIGN-SYSTEM lane), on Singh's request. STATUS: assembled, Singh
ratification pending.
=============================================================================
-->

# Profile Side Navigation

**What it is.** The left sidebar of a record. It shows **who** the record is and lets you move between **that record's sections**. One component, reused for every record type (Client, Caregiver, Staff…), so the experience is identical everywhere. It can **collapse** to a thin avatar-only rail and open again on a tap.

Singh, 2026-09-03: *"we need to make a consistent global component for same so everywhere in the system we will use the same approach."*

---

## 1. The three parts (top to bottom)

The whole thing is a **240px** panel on one continuous light-grey fill (`sidebar/secondary-bg`, #F8FAFC). No border — the line you see is just where the grey meets the white content area.

**1) Top actions** — a 48px bar of icon buttons.
- Can be **a single action or several** (Singh's rule). The example shows **back** (←, a filled circle) on the left and **search users** on the right.
- Icons are 24px Material Symbols Rounded, dark (`icon/primary`). 12px padding, 4px gap.

**2) User profile card** — who the record is.
- **Avatar** 70px round photo, with a small **camera badge** bottom-right to change the photo (light-blue badge, `action/secondary/bg`).
- **Name** "lastname, firstname" — Inter Medium 16 (`text/primary`).
- **Timezone** — Inter Regular 12, grey (`text/secondary`).
- **View Notes** — full-width blue primary button (`action/primary/bg`), opens the person's notes.
- **Contact rows** (each = 18px grey icon + value, 8px apart):
  | Row | Icon | Colour | Tappable? |
  |---|---|---|---|
  | Address | location_on | blue (`text/links`) | yes → map |
  | Email | alternate_email | blue (`text/links`) | yes → mail |
  | Phone | call | blue (`text/brand`) | yes → call |
  | Date of birth | cake | grey (`text/secondary`) | no |
  | Office | local_police | grey (`text/secondary`) | no |

**3) Section nav** — where you can go inside this record.
- A **flat list** of Nav Items (e.g. for a Client: Main Details, Schedule, Clinical Evaluation, Billing…). Each item opens that whole section.
- Items are 30px tall, 2px apart, 8px inset.

---

## 2. The three nav-item looks (states)

| State | Background | Text |
|---|---|---|
| **Default** | grey `action/soft/bg` (#F8FAFC) | dark `text/primary` |
| **Hover** | light-blue `action/ghost/hover` (#F1F5F9) | blue `action/ghost/text-hard` |
| **Active** (current section) | grey-blue `action/ghost/pressed` (#E2E8F0) | blue `action/ghost/text-hard` |

Only **one** item is Active at a time — it's the section you're currently looking at.

> ⚠ **Heads-up (defect D4):** Hover and Active use the **same blue text** and only differ by background (#F1F5F9 vs #E2E8F0 — two close greys). On some screens a hovered item can look like the current one. Worth considering a stronger "current" cue (a left accent bar, say) — none exists in Figma today. Your call.

---

## 3. Collapse (ruled in scope)

Singh, 2026-09-03: *"The profile entire side section is collapsible … and on tapping on anywhere on the side bar it will open again."*

- **Expanded** = the full 240px panel.
- **Collapsed** = a **50px rail showing only the avatar** (40px, centred). Top actions, card body and nav list are hidden.
- **Tapping anywhere on the rail re-opens it.**
- (The solid blue bar to the far left in the example screens is the app's **main** nav rail — separate from this component.)

---

## 4. Grouping — supported, kept for later

Singh, 2026-09-03: *"the list also supported separator and header, that is for future — if case will come I will apply."*

So the list is a **flat list for now**, but two pieces are specced and ready for when you group sections:
- **Nav Header** — a tiny UPPERCASE label (Inter Semi Bold 10, grey `text/tertiary`).
- **Nav Divider** — a thin 2px line (`sidebar/border`).

(There's also a bigger "Nav Project" row in the file — it exists but I haven't measured it yet; I'll read it when you actually need grouping. Defect D7.)

---

## 5. Tokens — all real, all resolvable

Every colour, size and spacing above binds to a **semantic token that already exists in the repo** (checked 2026-09-03 against the live token files). Nothing is a raw hex, nothing is a made-up name, and I did **not** swap any value for a look-alike — e.g. the sidebar fill and a nav-item's default fill are the *same* #F8FAFC but they stay as their own tokens (`sidebar/secondary-bg` vs `action/soft/bg`). All bring their own dark / high-contrast / warm-dark variants, so the sidebar themes correctly.

---

## 6. Accessibility (added beyond the picture)

Figma draws the look, not the behaviour. The build must add:
1. **Nav = real links** inside a labelled `<nav>`; the current one marked `aria-current="page"` (that's what turns it Active).
2. **Collapsed rail must be keyboard-openable** — "tap anywhere" has to be a real focusable button, not a bare div, or keyboard users can't expand it.
3. **Contact rows** are real links (map / mailto / tel); the icons are decorative.
4. **Focus rings** stay visible on everything clickable.
Good news: the blue nav text (`action/ghost/text-hard` → blue-700) is already contrast-checked at 5.72:1 (passes AA).

---

## 7. Open questions for you (one at a time when you're ready)

1. **Whole card clickable?** In Figma the entire profile card is one link to the notes flow — but it also contains a View Notes button and three separate contact links inside it. Should the *whole card* be clickable, or just the name/photo + the explicit buttons/links? (Defect D2.)
2. **Single-action top bar** — when there's only one action, should it sit left (like back) or somewhere else? (Defect D3.)
3. **Active vs hover** — do you want a stronger "current section" cue given how close the two greys are? (Defect D4.)

---

## 8. What I did NOT change

Nothing was pushed to GitHub and no live Angular code was touched. This is the spec + the copy-from CSS. The GitHub update goes through the proper branch → PR flow (never a direct push to `main`) — say the word and I'll hand Codex the exact files, or open the PR for your approval.
