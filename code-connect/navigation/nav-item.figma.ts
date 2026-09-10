import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/navigation/nav-item.figma.ts --
 * Node ID: 5847:7801
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=5847:7801",
  {
    props: {
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover",
        "Disabled": "disabled"
      }),
      active: figma.boolean("Active"),
      showIcon: figma.boolean("Show Icon")
    },
    example: (props) => html`
      <app-nav-item [state]="${props.state}" [active]="${props.active}" [showIcon]="${props.showIcon}">
      </app-nav-item>
    `
  }
);
