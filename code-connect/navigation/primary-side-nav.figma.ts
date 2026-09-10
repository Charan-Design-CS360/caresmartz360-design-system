import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/navigation/primary-side-nav.figma.ts --
 * Node ID: 27337:73592
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27337:73592",
  {
    props: {
      state: figma.enum("State", {
        "Expanded": "expanded",
        "Collapsed": "collapsed"
      })
    },
    example: (props) => html`
      <app-primary-side-nav [state]="${props.state}">
      </app-primary-side-nav>
    `
  }
);
