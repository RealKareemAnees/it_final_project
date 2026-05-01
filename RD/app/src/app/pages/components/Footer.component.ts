import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class Footer extends Component {
  render(): VNode {
    return h(
      "footer",
      {
        style: {
          padding: "10px",
          background: "#f0f0f0",
          marginTop: "20px",
          textAlign: "center",
        },
      },
      h("p", null, `© 2026 My App. All rights reserved.`),
    );
  }
}
