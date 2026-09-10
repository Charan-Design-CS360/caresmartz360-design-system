import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/tabs/primary-tab.figma.ts --
 * Node ID: 5775:8556
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=5775:8556",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Selected": "selected",
        "Disabled": "disabled",
        "Empty": "empty"
      })
    },
    example: (props) => html`
      <app-primary-tab [state]="${props.state}">
      </app-primary-tab>
    `
  }
);
