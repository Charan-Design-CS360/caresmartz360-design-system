import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/dropdown-menu/ddm-radio-row.figma.ts --
 * Node ID: 7926:11856
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=7926:11856",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Selected": "selected",
        "Disabled": "disabled"
      }),
      selected: figma.boolean("Selected")
    },
    example: (props) => html`
      <app-ddm-radio-row [state]="${props.state}" [selected]="${props.selected}">
      </app-ddm-radio-row>
    `
  }
);
