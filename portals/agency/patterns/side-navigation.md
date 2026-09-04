<!--
=============================================================================
LAYER-4 PATTERN: Side Navigation — how the two side-nav components compose on a
page. Ties the app-level Primary Side Navigation (blue) to the record-level
Profile Side Navigation (grey). Guidelines so any AI tool reuses the same
structure instead of reinventing. CREATOR: Claude (DESIGN-SYSTEM lane),
Singh request 2026-09-04. STATUS: assembled, ratification pending.
=============================================================================
-->

# Pattern — Side Navigation

The product has **two** side-navigation layers that stack **left → right**. They are different components with different jobs; do not merge or reinvent them.

| | **Primary** (app) | **Profile** (record) |
|---|---|---|
| Component | `primary-side-navigation` | `profile-side-navigation` |
| Colour | **Blue** rail (`--sidebar-primary-bg`) | **Grey** panel (`--sidebar-secondary-bg`) |
| Width | 158 expanded / 48 collapsed | 240 expanded / 50 collapsed |
| Job | where you are in the **product** (dashboard, clients, scheduling, billing…) | where you are within **one record** (Main Details, Schedule, Billing…) |
| Shows | logo · collapse toggle · section links · copyright | top actions · profile card · section links |
| Present on | **every** page | pages that open a specific record |

## How they compose on a page

```
┌────────┬──────────────┬───────────────────────────────┐
│Primary │ Profile side │  page content                 │
│ blue   │  nav (grey)  │  (global header + tabs + …)   │
│ 158/48 │  240/50      │                               │
└────────┴──────────────┴───────────────────────────────┘
  app nav    record nav        page-setup pattern
```

- **Primary** is outermost (far left), always present.
- **Profile** appears **only** when a record is open, immediately to the right of Primary.
- The **page content** (global header + tabs + data) fills the rest — see the page-setup pattern.
- On a non-record page (e.g. a dashboard or a listing), only **Primary** shows; the content starts right after it.

## Collapse behaviour
- **Primary** collapses via its **toggle** (158 ↔ 48), labels → icons.
- **Profile** collapses to a **50px avatar rail**, re-opens on tap.
- The two collapse **independently** — collapsing one does not collapse the other.

## Shared rules
- Both use the **sidebar/** token family, but different members: Primary = `--sidebar-primary-bg` (blue) + inverse text/icons; Profile = `--sidebar-secondary-bg` (grey) + normal text/icons. **Never** cross them.
- The **current** item in either nav is marked `aria-current="page"` and gets the component's selected treatment (Primary: #2499FF highlight; Profile: grey-blue).
- Both are real `<nav>` landmarks with distinct `aria-label`s ("Primary", and the record's name).
- Section links in both are real links; icons are decorative when a label is present, and carry the accessible name when the rail is collapsed to icons.

## Guidelines for any AI tool building a page
1. Reuse the **published components** — do not hand-roll a side nav.
2. Order is fixed: **Primary → Profile → content**.
3. Use the components' **own** widths/gutters; do not add page-level margins around them.
4. Take the spec from the repo (`primary-side-navigation.*`, `profile-side-navigation.*`) — no reinvention.

## Provenance
Primary measured 2026-09-04 (structure 27337:73592); Profile measured 2026-09-03 (27325:70008). Both token sets verified resolvable in the repo semantic layer.
