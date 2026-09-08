# AI Agent Context & Directives

## 1. Problem Statement
Caresmartz360 is migrating away from legacy, monolithic UI development. Historically, UI updates caused regression bugs because styles were tightly coupled to business logic and lacked a unified design system.

## 2. Our Ecosystem Solution
We are adopting a strict, enterprise-grade **3-Tier Design Token Architecture** driven by Figma.
*   **Tier 1 (Primitives):** Base values (Colors, Spacing). No contextual meaning.
*   **Tier 2 (Semantics):** Contextual intent (Backgrounds, Borders). Maps to Tier 1.
*   **Tier 3 (Components):** UI elements mapped entirely to Tier 2 variables.

## 3. Strict Architectural Rules for ALL AI Agents
*   **NO PREFIXES:** Do not use module-specific prefixes (e.g., NO `--stg-color`, NO `--admin-bg`). Use global semantic naming (e.g., `--color-bg-primary`).
*   **NO HARDCODED VALUES:** Hex codes and raw pixel values are strictly forbidden outside of the Tier 1 Primitives layer.
*   **SEPARATION OF CONCERNS:** Do not modify Angular `.ts` logic to achieve UI styling. Rely entirely on SCSS CSS Custom Properties (`var(--...)`).

## 4. Repository Role
*   **If Design System Repo:** This repo acts as the Single Source of Truth (SSOT) for all tokens. Output must be raw SCSS/JSON variables.
*   **If UI/App Repo:** This repo consumes the SSOT tokens. Components must only use Tier 2 Semantic variables.

## 5. Relevant Links
*   [Figma Master File](https://www.figma.com/design/DJBpjoXPMEw6bBAByIQaAy/--Primitives--CS360--V2.0) — confirmed live 2026-07-08
*   [Jira Epic - Design System CS360](https://netsmartz.atlassian.net/browse/C360-3526) — status: **On Hold** as of 2026-07-13

## 6. Architecture Status
*   **Resolved:** The conflict between Rule 3 (No Prefixes) and the `--agency-*` prefix system has been resolved. All portal-specific prefixes (like `--agency-`) have been stripped from semantic tokens in favor of a prefix-free global naming convention (`--action-primary-bg`, etc.) with theme switching, fully complying with Rule 3.

## 7. Mandatory Discovery Order Before Building Any Component

**PROPOSED 2026-08-27 — drafted by an AI session working the CareSmartz360
Legacy Assessment project, staged for Singh's review, not yet confirmed as
policy.** Root cause: a consuming-app session spent several hours
reverse-engineering component structure (padding, gaps, radius) from
individual Figma *instances* in a feature file, getting some values wrong,
before discovering this repo and the dedicated Design System Figma file
existed and had the exact spec all along — despite both being reachable the
entire time via the `caresmartz-design` skill family. Full incident:
`Office_Work/LegacyAssessment/PROJECT-HISTORY.md`, 2026-08-27 entries.

Before any AI agent defines CSS, structure, spacing, or tokens for a
CareSmartz360 component, in this order:

1.  **Check the relevant `caresmartz-design` skill first** (e.g.
    `agency-portal`, `portal-context`) for the portal's semantic-layer Figma
    file, module files, and known-issues list.
2.  **Check this repo** — `component-mapping.json` for an existing component
    entry, and the versioned token exports — before writing any new token or
    class.
3.  **Check the Design System Figma file's guideline pages** (e.g. "Form
    Fields Guidelines," "Text field/Headers") for an authored spec. These
    pages are written explicitly for AI-tool consumption — exact padding,
    gaps, heights, and a 3-tier token mapping, not just a visual reference.
4.  **Only if no canonical spec exists at any of the above** — reverse-engineer
    from a live Figma instance (`get_design_context` on a real usage in a
    feature file), and flag the gap so step 2 or 3 can be filled in for next
    time, rather than leaving every future agent to re-derive the same thing.

Skipping straight to step 4 is the failure mode this rule exists to prevent.

## 8. Persona & Portal Alignment (Canonical Living Benchmark)

All components, tokens, and templates designed in this system must align with the **13 Canonical CareSmartz360 Personas** documented in `docs/PERSONA-DESIGN-REQUIREMENTS.md` and `Office_Work/memory/DEEP-PRODUCT-AND-PERSONA-FORENSICS.md` (Living Rulebook Rule 4.3):

1. **Target Persona Grounding:** Before creating or modifying a component, determine the intended persona tier (e.g., Agency Staff, Direct Caregiver, Senior Client, Payer).
2. **Density Token Enforcement:** Apply CSS custom properties for density (`--table-row-height`, `--form-field-height`, `--spacing-component-gap`) corresponding to the persona profile (`compact`, `comfortable`, or `spacious`).
3. **Accessibility Mandates:** Senior Client interfaces must strictly satisfy WCAG AAA (7:1 contrast ratio) and 48px minimum touch targets. High-contrast clinical badges must adhere to Rule 2.2 (`2px #FFFF00` outline on dark backgrounds).
4. **PHI Masking Compliance:** UIs rendering patient or staff identities must support `displayNameOption` configuration to protect PHI across portals.

## 9. AI Implementation Retrospective & Common Pitfalls

All AI tools and human developers must review `docs/AI-FIGMA-DESIGN-SYSTEM-RETROSPECTIVE.md` before generating or modifying component markup and SCSS. It documents the verified mistakes made during PoC implementation (including creation action green button rule [DS-HDR-ACT-01], table 4-sided borders [DS-TBL-01], and edge-to-edge container rhythm [DS-LAY-01]), provides the canonical Figma node directory, and outlines the action-intent matrix to prevent recurring errors across the team.
