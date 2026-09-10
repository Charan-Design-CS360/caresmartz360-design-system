import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/empty-states/empty-states.figma.ts --
 * Node ID: 11380:24914
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=11380:24914",
  {
    props: {
      state: figma.enum("State", {
        "No Data": "no-data",
        "No Results": "no-results",
        "Error": "error",
        "Permission": "permission"
      }),
      background: figma.enum("Background", {
        "White": "white",
        "Grey": "grey"
      }),
      showIcon: figma.boolean("Show Icon"),
      showTitle: figma.boolean("Show Title"),
      showAction: figma.boolean("Show Action")
    },
    example: (props) => html`
      <app-empty-states [state]="${props.state}" [background]="${props.background}">
      </app-empty-states>
    `
  }
);
