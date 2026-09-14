<!--
=============================================================================
COMPONENT CONTRACT — Avatar family (Agency portal)
6 component sets: user avatar, entity avatar, avatar group, upload trigger,
status badges, overflow counter. 43 variants total.
SOURCE: Figma-AI specification delivered 2026-09-14 (C360-3526 comment 633902,
misrouted — future specs arrive on C360-44235). Inventory INDEPENDENTLY
VERIFIED live the same day; geometry/tokens NOT yet independently measured.
Machine contract: ./avatar.json.
CREATOR: Claude DESIGN-SYSTEM lane (C360-3526) | Bridge: C360-44235
=============================================================================
-->

# Avatar — Agency component contract (1.0.0, draft)

Section `27607:9247` "avatar" ([open](https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/?node-id=27607-9247)) · page `26581:38709`.

**Purpose:** user identity imagery across the Agency portal — profile photos with
initials fallback, entity (organisation/team) marks, stacked participant groups,
photo-upload affordance, presence/status badges, and the "+N" overflow pill.

## Verification status (read before building)

| Claim | Status |
|---|---|
| Section + 6 set node IDs | ✅ verified live 2026-09-14 (desktop MCP `get_metadata`) |
| Variant counts 24/6/3/2/5/3 | ✅ verified live 2026-09-14 — match exactly |
| componentKeys (6) | ⚠️ provided by Figma-AI, **not independently verified** (needs REST `GET /v1/files/4bh29laapcuKBTghfaRXF0/components`) |
| Descriptions & usage rules | ⚠️ Figma-AI-authored (written into Figma descriptions 2026-09-14), not re-derived |
| Geometry, spacing, token bindings | ✅ **measured live 2026-09-14 PM** (§Measured geometry below) — representative variants of all 6 sets |
| Angular selectors (`<cs-avatar-*>`) | ❌ **proposed names only** — they exist in no codebase |

## Component sets (all verified live)

| Set (Figma name, verbatim) | nodeId | Variants | Role |
|---|---|---|---|
| `avartar_user` *(sic — Figma typo)* | `5537:4593` | 24 | Circular user avatar: photo, or initials fallback |
| `avatar_entity` | `5537:4602` | 6 | Rounded-square avatar for orgs/teams/projects |
| `avatar_group` | `5537:4604` | 3 | Overlapping stack of user avatars |
| `update_image` | `10618:18947` | 2 | Camera overlay for photo upload/update |
| `Icons_avatars-status` | `23507:9111` | 5 | Bottom-right status badge overlays |
| `more_action` | `26929:50408` | 3 | "+N" overflow pill for groups |

## Variant axes

- **`avartar_user`** — Size: 24 / 28 / 40 / 70 / 100 / 120 px · Status: Default, Online,
  None · Presence: None, Edit, Add New · Edit: Yes/No · Img Type: Default (photo),
  No Image (initials). Note: the 28px size is literally named `28x` in Figma.
- **`avatar_entity`** — Size: 16 / 24 / 32 / 40 / 96 / 128 px.
- **`avatar_group`** — Size: 24 / 32 / 40 px.
- **`update_image`** — Property 1: `Frame 26x` (for 70–120px avatars), `Frame 18x` (for 24–40px).
- **`Icons_avatars-status`** — Type: Online (green dot), Matched (blue check),
  Preferred (purple star), `Attenshion Required` *(sic — Figma typo)* (yellow !),
  `Not compatible` (red block).
- **`more_action`** — Property 1: More button 24 / 32 / 40 px; **plus a second axis
  `Property 2=Default` present in Figma that the Figma-AI spec omitted.**

## Usage rules (Figma-AI-authored, from the component descriptions)

- `Img Type=Default` → user has an uploaded photo; `No Image` → initials (first
  letter of first + last name, e.g. "EW").
- `No Image` + `Presence=Add New` → camera upload icon (user may set a photo).
- `Presence=Edit` + `Img Type=Default` → photo exists, camera icon offers update.
- Status badges overlay bottom-right; pair `more_action` with `avatar_group` at
  the matching size.

## Composition

```
avatar_group
  ├── avartar_user[] (stacked)
  │     ├── photo fill OR initials text
  │     ├── Icons_avatars-status (optional)
  │     └── update_image (optional)
  └── more_action (optional "+N")
avatar_entity (standalone)
```

## Measured geometry [LIVE 2026-09-14 PM — nodes 244:217, 11867:25335, 1473:2187, 1473:2501, 23507:9111, 257:1997]

- **`avartar_user` (photo):** exact square at the variant size (24/28/40/70/100/120),
  radius `border-radius/rounded-full` (9999), image `object-cover`. Photo fills come from
  the `Avatars/Caregivers/*` image styles.
- **`avartar_user` (upload placeholder — No Image + Add New):** circular, bg
  `action/secondary/bg` (#f0f7ff), centered 20×20 Material `add_a_photo` icon (icon 20 at
  the 40px size; the 26/18 frames of `update_image` cover the large/small avatar tiers).
- **`avatar_entity`:** rounded-square, radius `border-radius/rounded` (**4px**), logo
  `object-cover` at 90% opacity over an rgba(0,0,0,0.2) scrim.
- **`avatar_group`:** 40px group = flex row with **positive `spacing/sm` (4px) gap** (no
  overlap); 24px group = **overlapping stack, −4px margin per avatar**, z-order front→back
  left→right, `more_action` last at z-1. Group height = avatar size.
- **`more_action`:** outer frame = avatar size + 4 (28/36/44). Pill: bg `action/soft/bg`
  (#f8fafc), text `action/soft/text-neutral` (#475569), radius 40, `font-family/primary`
  Inter Medium; 40px tier → `font-size/body-base` 14 / `line-height/body-base` 20 /
  `font-weight/heading-base` 500, padding 12.5×10, pill 40×40; 24px tier →
  `font-size/caption` 12 / `line-height/caption` 16 / `font-weight/body-strong` 500,
  padding 4.5×2. "+N" is a text override.
- **`Icons_avatars-status`:** container bg `surface/base` (white), **2px border
  `border/subtle` (#e2e8f0)**, circular; Online = 14px badge with `icon/success` (#22c55e)
  dot; the other four types = 18px badge with a Material SVG (check_circle, stars, error,
  do_not_disturb_on). Position: bottom-right overlay on the avatar.

## Open items (flagged, not invented)

1. **AV-01 — CLOSED 2026-09-14 PM** (measured live; see §Measured geometry). Residual: only
   representative variants measured — per-size icon scaling of `update_image` inside 70-120px
   avatars not individually verified.
1b. **AV-06 (NEW)** — the Figma description promises an **initials fallback** ("EW" on white
   with subtle border), but **no initials variant exists in the set**: all six `Img Type=No
   Image` variants render the camera-upload placeholder. Description overpromises, or a
   variant is missing — Figma-AI/Singh to reconcile.
2. **AV-02** — status colours are Figma styles, not variables (Figma-AI's own note);
   variable migration needed before token binding.
3. **AV-03** — componentKeys await independent verification (REST or Figma-AI
   re-confirmation on C360-44235).
4. **AV-04** — Figma naming out of policy: `avartar_user` typo, snake_case, and
   `Attenshion Required` predate the 2026-09-10 kebab-case rename wave — queue
   renames with Figma-AI (blocked from repo side by the Agency naming lock C360-44253 #622188 — Figma-side rename is Figma-AI's to make).
5. **AV-05** — Code Connect files from the spec were **deliberately not created**:
   Code Connect publishing is blocked on the Figma Professional plan (C360-47337),
   and the proposed `<cs-avatar-*>` selectors are unverified inventions.

## Accessibility

Avatar images need `alt` (person's name / entity name); initials mode must keep the
name available to assistive tech. Status badges must not be colour-only — pair with
an accessible label (e.g. `aria-label="Online"`). "+N" pill needs a full-count label.
