import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/navigation/user-profile-card.figma.ts --
 * Node ID: 27325:69934
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27325:69934",
  {
    props: {
      style: figma.enum("Style", {
        "Default": "default",
        "Compact": "compact"
      })
    },
    example: (props) => html`
      <app-user-profile-card [style]="${props.style}">
      </app-user-profile-card>
    `
  }
);
