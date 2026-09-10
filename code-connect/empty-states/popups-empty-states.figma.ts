import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/empty-states/popups-empty-states.figma.ts --
 * Node ID: 5775:5916
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=5775:5916",
  {
    props: {
      type: figma.enum("Type", {
        "Info": "info",
        "Warning": "warning",
        "Confirmation": "confirmation"
      })
    },
    example: (props) => html`
      <app-popup-empty-state [type]="${props.type}">
      </app-popup-empty-state>
    `
  }
);
