import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/navigation/copyright-bottom.figma.ts --
 * Node ID: 22906:5650
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=22906:5650",
  {
    props: {
      type: figma.enum("Type", {
        "Standard": "standard",
        "Minimal": "minimal"
      })
    },
    example: (props) => html`
      <app-copyright-bottom [type]="${props.type}">
      </app-copyright-bottom>
    `
  }
);
