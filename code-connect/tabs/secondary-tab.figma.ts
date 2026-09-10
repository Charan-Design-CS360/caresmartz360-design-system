import figma, { html } from "@figma/code-connect/html";

/**
 * -- file path: code-connect/tabs/secondary-tab.figma.ts --
 * Node ID: 27329:70805
 */
figma.connect(
  "https://www.figma.com/design/4bh29laapcuKBTghfaRXF0/CareSmartz360-Design-System?node-id=27329:70805",
  {
    props: {
      size: figma.enum("Size", {
        "S": "s",
        "M": "m"
      }),
      active: figma.enum("Active", {
        "Yes": "yes",
        "No": "no"
      }),
      status: figma.enum("Status", {
        "Start": "start",
        "Mid": "mid",
        "End": "end"
      }),
      state: figma.enum("State", {
        "Default": "default",
        "Hover": "hover"
      })
    },
    example: (props) => html`
      <app-secondary-tab [size]="${props.size}" [active]="${props.active}" [status]="${props.status}" [state]="${props.state}">
      </app-secondary-tab>
    `
  }
);
