import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/table/table-head.figma.ts --
 * Node ID: 26938:61726
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=26938:61726",
  {
    props: {
      sorted: figma.enum("Sorted", {
        "None": "none",
        "Ascending": "asc",
        "Descending": "desc"
      })
    },
    example: (props) => html`
      <app-table-head [sorted]="${props.sorted}">
      </app-table-head>
    `
  }
);
