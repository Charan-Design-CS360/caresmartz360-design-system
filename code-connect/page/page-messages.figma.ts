import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/page/page-messages.figma.ts --
 * Node ID: 11315:24274
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=11315:24274",
  {
    props: {
      type: figma.enum("Type", {
        "Info": "info",
        "Success": "success",
        "Warning": "warning",
        "Error": "error",
        "Neutral": "neutral"
      }),
      dismissible: figma.boolean("Dismissible")
    },
    example: (props) => html`
      <app-page-messages [type]="${props.type}" [dismissible]="${props.dismissible}">
      </app-page-messages>
    `
  }
);
