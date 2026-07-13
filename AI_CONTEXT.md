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
*   [Figma Master File] (Insert Link)
*   [Jira Epic - UI Architecture Standardization] (Insert Link)
