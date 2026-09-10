import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/filters/filter-toggle.figma.ts --
 * Node ID: 26938:65213
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=26938:65213",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Active": "active"
      }),
      active: figma.boolean("Active")
    },
    example: (props) => html`
      <app-filter-toggle [state]="${props.state}" [active]="${props.active}">
      </app-filter-toggle>
    `
  }
);
