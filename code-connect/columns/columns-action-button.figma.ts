import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/columns/columns-action-button.figma.ts --
 * Node ID: 10373:16081
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=10373:16081",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Active": "active",
        "Disabled": "disabled"
      })
    },
    example: (props) => html`
      <app-columns-action-button [state]="${props.state}">
      </app-columns-action-button>
    `
  }
);
