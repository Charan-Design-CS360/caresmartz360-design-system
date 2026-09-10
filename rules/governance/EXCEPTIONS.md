<!--
=============================================================================
FILE BRIEF: Named special cases where a universal rule deliberately does not
apply. An exception is Singh-approved, evidence-backed, and SCOPED — it names
exactly where it applies and nowhere else. Anything deviating from a rule
without a row here is a violation, full stop. This file exists so Singh's
"different cases or set for those html and css rules" are first-class records
instead of silent deviations.
CREATOR: Fable-WOUND-MGMT (per Singh's approved plan) | 2026-08-24
LAST MODIFIER: Fable-WOUND-MGMT | 2026-08-24
=============================================================================
-->

# Exceptions — Singh-approved special cases

**Format:** ID · rule excepted · exact scope (selector/file/portal) · evidence · duration ·
Singh's GO-AHEAD reference. Checks in `04-checks/` read this file and carve out exactly
these scopes — nothing wider.

| ID | Rule excepted | Exact scope | Evidence / why | Duration | Singh GO-AHEAD |
|---|---|---|---|---|---|
| EX-001 | Epic Rule 8 (never surface tech-stack details in design-system deliverables) | `01-universal/css-approach.md` in THIS folder only | Singh explicitly requested "which approach need to follow to implement the css" for this folder (2026-08-24), which requires naming per-portal styling approaches. The folder is Singh's own authoring reference, not a dev-facing design-system deliverable. | Permanent unless Singh revokes | Approved plan, decision 1 + his 2026-08-24 folder instruction — **row ratification pending his word** |
| EX-002 | 12px body-copy floor (from SPEC-07 UIG-071) | `.section__attribution` (PRAPARE attribution line, OASIS forms), italic 10px | Singh's resolution 2026-08-17, recorded in SPEC-07 H-16: 12px general, exactly one exception | Permanent | SPEC-07 H-16 "RESOLVED 2026-08-17 (Singh)" |
| EX-003 | Single-family typography (Inter only, `brand.md`) | Agency `Heading/H4 Headline` legacy `SF Pro Text` | `brand.md`'s own text: "except legacy `SF Pro Text` still appearing in Agency `Heading/H4 Headline` — needs removal". This is a TEMPORARY tolerance of a known defect, not an endorsement. | **Until removed in Figma** — flag for the Design System Agents lane to schedule | Documented in brand.md; formal GO-AHEAD pending |
