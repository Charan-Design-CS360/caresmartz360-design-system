import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/navigation/nav-links.figma.ts --
 * Node ID: 10441:17045
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=10441:17045",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Selected": "selected"
      }),
      iconOnly: figma.boolean("Icon Only")
    },
    example: (props) => html`
      <app-nav-links [state]="${props.state}" [iconOnly]="${props.iconOnly}">
      </app-nav-links>
    `
  }
);
