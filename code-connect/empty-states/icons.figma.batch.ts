import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/empty-states/icons.figma.batch.ts --
 * Node ID: 12428:28265
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=12428:28265",
  {
    props: {
      icon: figma.enum("Icon", {
        "Calendar": "calendar",
        "Document": "document",
        "Folder": "folder",
        "User": "user",
        "Chart": "chart",
        "Settings": "settings"
      })
    },
    example: (props) => html`
      <app-empty-state-icon [name]="${props.icon}">
      </app-empty-state-icon>
    `
  }
);
