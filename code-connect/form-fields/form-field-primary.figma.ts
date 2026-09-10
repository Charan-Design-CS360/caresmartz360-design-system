import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/form-fields/form-field-primary.figma.ts --
 * Node ID: 26938:65997
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=26938:65997",
  {
    props: {
      state: figma.enum("state", {
        "Default": "default",
        "Hover": "hover",
        "Focus": "focus",
        "Filled": "filled",
        "Disabled": "disabled",
        "Error": "error",
        "Success": "success"
      })
    },
    example: (props) => html`
      <app-form-field-primary [state]="${props.state}">
      </app-form-field-primary>
    `
  }
);
