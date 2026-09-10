import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/page/page-heading.figma.ts --
 * Node ID: 14160:189662
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=14160:189662",
  {
    props: {
      size: figma.enum("Size", {
        "Small": "small",
        "Medium": "medium",
        "Large": "large",
        "Extra Large": "xl"
      }),
      showDescription: figma.boolean("Show Description#14160:0")
    },
    example: (props) => html`
      <app-page-heading [size]="${props.size}" [showDescription]="${props.showDescription}">
      </app-page-heading>
    `
  }
);
