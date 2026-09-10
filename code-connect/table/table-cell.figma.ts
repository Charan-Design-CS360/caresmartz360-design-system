import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/table/table-cell.figma.ts --
 * Node ID: 26938:61725
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=26938:61725",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Selected": "selected"
      })
    },
    example: (props) => html`
      <app-table-cell [state]="${props.state}">
      </app-table-cell>
    `
  }
);
