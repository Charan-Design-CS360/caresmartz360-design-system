import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/form-fields/field-header-tertiary.figma.ts --
 * Node ID: 27290:41702
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27290:41702",
  {
    props: {
      size: figma.enum("Size", {
        "Small": "small",
        "Medium": "medium",
        "Large": "large"
      }),
      showLabel: figma.boolean("Show Label"),
      showDescription: figma.boolean("Show Description"),
      showIcon: figma.boolean("Show Icon"),
      showAction: figma.boolean("Show Action")
    },
    example: (props) => html`
      <app-field-header-tertiary [size]="${props.size}" [showLabel]="${props.showLabel}" [showDescription]="${props.showDescription}">
      </app-field-header-tertiary>
    `
  }
);
