# AI Tools Guide — CareSmartz360 Design System

This guide provides AI assistants and developers with structured context for working with the CareSmartz360 design system.

## Repository Structure

```
caresmartz360-design-system/
├── README.md                          # Project overview
├── CHANGELOG.md                       # Version history
├── AI-TOOLS-GUIDE.md                  # This file
├── CARESMARTZ360-DS-REFERENCE.md      # Full AI handoff reference
├── ds-tokens-latest.json              # Latest token export (symlink to current)
├── ds-tokens-v2.3.0.json             # Versioned token export
├── tailwind.config.js                 # Tailwind CSS v4 configuration
├── components/
│   └── component-mapping.json         # Component → Figma node ID map
└── .github/
    └── workflows/
        └── version-bump.yml           # Auto version bump workflow
```

## Token Architecture

The design system uses a 3-tier token architecture:

### Tier 1: Primitives
Raw values — never used directly in components.
- `colors/*` — Full color ramps (50–950)
- `spacing/*` — 4px base grid values
- `typography/*` — Font families, sizes, weights, line heights
- `radius/*` — Border radius scale
- `shadow/*` — Box shadow definitions
- `opacity/*` — Opacity scale
- `z-index/*` — Z-index scale

### Tier 2: Semantic Tokens
Meaning-based aliases mapped to primitives.
- `brand/*` — Primary brand colors
- `neutral/*` — Grays for text, borders, backgrounds
- `status/*` — Success, warning, error, info states
- `surface/*` — Background surface colors
- `text/*` — Text color roles
- `border/*` — Border color roles

### Tier 3: Component Tokens
Component-scoped tokens for specific UI elements.
- Pattern: `{component}.{property}.{state}`
- Example: `button.primary.background.default`

## How to Use with AI Assistants

### For Code Generation
When asking AI to generate components, reference:
1. `ds-tokens-latest.json` for current token values
2. `tailwind.config.js` for utility class mappings
3. `components/component-mapping.json` for Figma component specs

### For Design Review
1. Use `CARESMARTZ360-DS-REFERENCE.md` for full component specifications
2. Reference Figma node IDs in `component-mapping.json` for visual context

### Prompt Templates

**Component Generation:**
```
Using the CareSmartz360 design system tokens in ds-tokens-latest.json,
create a [component name] component with these specifications: [specs]
Use Tailwind CSS classes from tailwind.config.js where possible.
```

**Token Lookup:**
```
What is the hex value for [token name] in the CareSmartz360 design system?
Reference: ds-tokens-latest.json > semantic > [category]
```

## Figma Integration

- **Figma File:** `$-Primitives (CS360) V2.0`
- **File ID:** `DJBpjoXPMEw6bBAByIQaAy`
- **Variable Collections:** CS-Primitives, CS-Semantic, CS-Component

## Contact

Design System maintained by the CareSmartz360 UX team.
Repository: `Charanjeetsingh360/caresmartz360-design-system`
