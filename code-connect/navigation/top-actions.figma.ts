import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/navigation/top-actions.figma.ts --
 * Node ID: 27325:70122
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27325:70122",
  {
    props: {
      type: figma.enum("Type", {
        "Default": "default",
        "Alternative": "alternative"
      })
    },
    example: (props) => html`
      <app-top-actions [type]="${props.type}">
      </app-top-actions>
    `
  }
);
