import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/dropdown-menu/ddm-drag-row.figma.ts --
 * Node ID: 13095:43335
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=13095:43335",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Dragging": "dragging"
      }),
      draggable: figma.boolean("Draggable")
    },
    example: (props) => html`
      <app-ddm-drag-row [state]="${props.state}" [draggable]="${props.draggable}">
      </app-ddm-drag-row>
    `
  }
);
