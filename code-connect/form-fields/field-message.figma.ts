import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/form-fields/field-message.figma.ts --
 * Node ID: 11116:25116
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=11116:25116",
  {
    props: {
      type: figma.enum("type", {
        "Default": "default",
        "Error": "error",
        "Success": "success",
        "Warning": "warning",
        "Info": "info",
        "Comments": "comments"
      })
    },
    example: (props) => html`
      <app-field-message [type]="${props.type}">
      </app-field-message>
    `
  }
);
