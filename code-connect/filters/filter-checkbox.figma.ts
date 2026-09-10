import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/filters/filter-checkbox.figma.ts --
 * Node ID: 26938:65443
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=26938:65443",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Active": "active"
      }),
      checked: figma.boolean("Checked")
    },
    example: (props) => html`
      <app-filter-checkbox [state]="${props.state}" [checked]="${props.checked}">
      </app-filter-checkbox>
    `
  }
);
