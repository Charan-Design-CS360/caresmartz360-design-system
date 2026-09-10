import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/form-fields/field-input.figma.ts --
 * Node ID: 27062:8145
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27062:8145",
  {
    props: {
      state: figma.enum("state", {
        "Default": "default",
        "Hover": "hover",
        "Focus": "focus",
        "Filled": "filled",
        "Disabled": "disabled",
        "Error": "error"
      }),
      showToys: figma.boolean("Show Toys")
    },
    example: (props) => html`
      <app-field-input [state]="${props.state}" [showToys]="${props.showToys}">
      </app-field-input>
    `
  }
);
