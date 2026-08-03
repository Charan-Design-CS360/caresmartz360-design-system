# Layer 4 pattern and template contract

## Definitions

### Component

A reusable interface control that satisfies a specific interaction need:
Button, Field, Modal, Table, Navigation Item, or Card.

### Pattern

A reusable, evidence-backed solution to a user goal. A pattern composes
components and describes behavior across an interaction or flow.

Examples:

- Search + Filter + Results
- Create/Edit Form
- Empty/Loading/Error states
- Destructive Action Confirmation
- Caregiver Shift Lifecycle

### Template

A reusable page or screen structure with defined regions and replaceable
content. A template may contain patterns but does not define product-specific
data or a one-off workflow.

Examples:

- List Management Page
- Detail Page
- Dashboard
- Wizard/Stepper Shell
- Mobile Task Page

## Portal boundary

Patterns and Templates are portal-specific. They may use shared Primitives only
through their own portal Semantics and Components. Agency Layer 4 cannot compose
Caregiver or Staff Layers 2–4.

## Required evidence

Every Pattern or Template must record:

- stable ID, canonical name, portal, owner, and maturity;
- user goal and when to use/not use;
- verified Figma component/node key;
- component and semantic dependencies;
- states and responsive/density behavior;
- content rules;
- accessibility behavior;
- analytics or success signal;
- Jira evidence and attested Figma snapshot;
- real product-flow adoption.

## Maturity

- **Discovered:** repeated candidate identified.
- **Draft:** contract is incomplete.
- **Reviewed:** design, content, accessibility, and dependencies reviewed.
- **Pilot:** implemented in one controlled flow.
- **Stable:** validated in at least two real flows, unless an approved Jira
  exception explains why a single-flow enterprise pattern is sufficient.
- **Deprecated:** replacement and migration guidance exist.

One-off screens are not automatically Patterns or Templates.
