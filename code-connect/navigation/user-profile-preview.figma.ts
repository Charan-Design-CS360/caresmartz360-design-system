import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/navigation/user-profile-preview.figma.ts --
 * Node ID: 27337:74189
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27337:74189",
  {
    props: {
      style: figma.enum("Style", {
        "Default": "default",
        "Compact": "compact"
      })
    },
    example: (props) => html`
      <app-user-profile-preview [style]="${props.style}">
      </app-user-profile-preview>
    `
  }
);
