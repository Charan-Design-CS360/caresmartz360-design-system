import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/filters/filter-dropdown.figma.ts --
 * Node ID: 26360:67677
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=26360:67677",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Active": "active"
      }),
      filled: figma.boolean("Filled")
    },
    example: (props) => html`
      <app-filter-dropdown [state]="${props.state}" [filled]="${props.filled}">
      </app-filter-dropdown>
    `
  }
);
