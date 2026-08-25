# Empty States — Agency component contract

**Portal:** Agency · **Layer:** 3 (Components) · **Jira parent:** C360-44737
**Measured:** 2026-08-25, live Figma · **Section:** `27218:64329` "empty states"
**Machine twin:** [`empty-states.json`](./empty-states.json) — every value there carries a provenance marker.

---

## Read this first

Two token names that these components bind **do not exist in the owner's variable export**, which is
the input authority for all values:

| Bound in live Figma | In the 2026-08-24 export? | What the export has instead |
|---|---|---|
| `control/height-default` = 30 | **No** — there is no `control/*` group at all | nothing |
| `fonts/tracking/X-tracking-0` | **No** | `fonts/tracking/tracking-0` (no `X-` prefix) |

29 of the 31 variable names these components use match the export exactly. These are the two that
don't. Every value they would have covered is published **RAW** below — deliberately, rather than
citing a token the authority cannot back.

`X-` prefixed names are marked legacy by our own convention and are meant to be replaced on contact.
`control/height-default` is more interesting: if an export refresh confirms it, then the button
`min-height` gap recorded in the Button contract is a **binding** problem (the token exists, nothing
is bound to it) rather than a **missing-token** problem — which is a materially different fix.

---

## What this is, in plain language

Two separate families of "there's nothing here yet" designs.

**Inline empty states** — 8 versions. Four situations × two backgrounds (grey or white):

| Situation | Shows | Heading |
|---|---|---|
| **No Records** | heading + one line of text | "No Record(s) Found." |
| **Search** | yellow warning icon + heading + text | "No Record(s) Found." |
| **Good News** | dark info icon + heading + text | "All Good! No new information" |
| **First Time** | heading + two buttons + text | "No Record(s) Added." |

These drop into an empty table, a blank calendar, a section with no data yet.

**Popup empty states** — 3 versions. These are modal dialogs that appear when the user must fill
something in before continuing. Per Figma's own note they are **non-dismissible** — they stay until
the user presses a button.

| Type | Buttons |
|---|---|
| **Primary** | one blue "Add files" |
| **Primary + default** | blue "Add New" + outlined "Learn How" |
| **Link** | one ghost "Learn how" |

Both families are centred, 24px padding, 12px corner radius, Inter throughout — 18px medium heading
over 14px regular body.

---

## The three real differences between the two families

Not errors — measured, deliberate-looking differences worth knowing:

| | Inline | Popup |
|---|---|---|
| Space between elements | 24px | **16px** |
| Heading colour | `text/secondary` (grey) | **`text/primary` (near-black)** |
| Main button colour | **green** (`action/success/bg`) | **blue** (`action/primary/bg`) |
| Backgrounds offered | grey and white | white only |
| Shadow | none | soft two-layer elevation |

**The one worth your decision:** the same button, with the same label "Add New", is **green** in the
inline family and **blue** in the popup family. Both are drawn that way on purpose as far as the file
shows. Which one is right is a design call, not something this contract settles.

---

## What is measured, and what is unbound

Bound to real tokens (safe to build on): all spacing (24/16/12/8/0), both corner radii (12/4), both
backgrounds, all three text colours, both icon colours, every type size and weight, and the button
padding.

**Not bound to anything** — real values with no token behind them:

- Container `max-width` 800px and `min-width` 100px (both families share these numbers, with no token)
- Button `min-height` 30px and `min-width` 60px — see the note above about `control/height-default`
- Icon box 48px, glyph 46px, icon padding 4px
- Two fixed button widths: 100px inline, 84px on the popup ghost button
- The body text's letter-spacing

**Derived, not designed:** the heading's 552px width is simply 600 − (24 × 2). It falls out of the
frame width and must never be reproduced as a fixed number.

---

## Defects found

Nine, in rough order of how much they'd hurt:

1. **The grey Search variant's heading bypasses the token layer completely.** Node `10682:19314`
   renders it as three text spans that hardcode `#475569`, `18px`, `24px` and `-0.24px` directly. Its
   white twin (`12428:28274`) binds all four through tokens correctly. Anyone copying the grey variant
   inherits raw hex. This is the one I'd fix first.
2. **Icon geometry doesn't close.** A 48px box with 4px padding leaves 40px — the glyph is 46px, so it
   overflows its own padding by 6px. On both icon-bearing states.
3. **Namespace mix on the green button.** Background is `action/success/bg`, label is
   `action/primary/text-neutral`. Both are white so nothing looks wrong, but the naming rule says a
   filled success button should use `action/success/text-neutral`. Anything generating token names
   from the pattern will get this one wrong.
4. **Green vs blue for the same button** (above).
5. **Fixed widths alongside min-width** — 100px and 84px. A longer translation or enlarged text can clip.
6. **Icon padding of 4px is raw** even though `spacing/sm` = 4 exists in the export.
7. **The popup shadow is described twice, differently, in one payload.** The effect metadata says
   blur radius 6 spread −2 and blur radius 15 spread −3; the generated CSS approximates them as 3px
   and 7.5px with no spread. The effect metadata is authoritative — don't copy the approximation.
8. **Both shadow colours have alpha below 1** (5% and 10% black). Any pipeline reading only the hex
   and dropping alpha turns a soft elevation into two hard black bars.
9. **The copy is placeholder text from a different product.** All 8 inline variants carry the identical
   string "Create a new file or import from your existing tools to start collaborating with your team."
   The popups mention downloading a "repertory" (likely "repository"), pull requests, and code review.
   That's developer-tool filler, not home-care wording — content rather than design, but it ships as-is
   unless someone replaces it.

---

## Accessibility

- **Non-dismissible modals need a ruling.** Figma says the popup family stays until the user acts. A
  dialog with no way out is a real barrier and needs an explicit decision on whether Escape or a close
  control must exist. **Raised, not resolved.**
- **Colour is not doing the work alone** — each icon is paired with a heading that states the same
  thing in words. Passes on inspection of the measured structure.
- **Heading semantics are an implementation choice.** Figma applies a text *style* called Heading/h4;
  it does not record whether this should be a real heading in the accessibility tree, or at what level.
- **No contrast ratios were computed.** The token pairings are all recorded so they can be checked —
  but the check has not been run, and this contract does not claim it passes.

---

## Not verified

Stated plainly so nothing here reads as more certain than it is:

- The Figma **file key was not measured** — the MCP server never reports one. It is asserted from
  `portal-manifest.json` and the URL supplied with the request, and needs confirming.
- **Only default light mode was read.** Dark, High Contrast, Warm Dark and HC Light were not measured.
  The tokens exist in all five modes; no mode-specific value was checked.
- **No density mode was tested.** The unbound values above would not respond to one.
- **Reflow between 100px and 800px was never observed** — only the 600px and 530px frame widths.
- **Container interactive states** were not measured; the empty-state sets don't define them.
- Of the 6 icons in set `12428:28265`, only `warning` and `info` were traced to a consuming variant.
  `check_circle`, `Congratulation`, `lightbulb` and `In Progress` were not resolved to Material Symbols
  names.
- **Whether any product screen actually uses any of these 11 variants was not checked.**

---

## Version history

| Date | Change | Authority |
|---|---|---|
| 2026-08-25 | Initial contract. 11 variants measured live (8 inline + 3 popup) from section `27218:64329`, at the design owner's direct request. | Owner instruction, 2026-08-25 |
