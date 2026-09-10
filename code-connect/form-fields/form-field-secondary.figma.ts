import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/form-fields/form-field-secondary.figma.ts --
 * Node ID: 27062:7663
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27062:7663",
  {
    props: {
      state: figma.enum("state", {
        "Default": "default",
        "Hover": "hover",
        "Focus": "focus",
        "Filled": "filled",
        "Disabled": "disabled",
        "Error": "error"
      })
    },
    example: (props) => html`
      <app-form-field-secondary [state]="${props.state}">
      </app-form-field-secondary>
    `
  }
);
