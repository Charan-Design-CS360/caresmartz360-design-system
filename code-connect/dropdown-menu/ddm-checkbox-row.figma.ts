import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/dropdown-menu/ddm-checkbox-row.figma.ts --
 * Node ID: 7926:11855
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=7926:11855",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Selected": "selected",
        "Disabled": "disabled"
      }),
      checked: figma.boolean("Checked")
    },
    example: (props) => html`
      <app-ddm-checkbox-row [state]="${props.state}" [checked]="${props.checked}">
      </app-ddm-checkbox-row>
    `
  }
);
