import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class AdminPage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "admin-page" },
      h("h1", null, "Admin Dashboard"),
      h("p", null, "Manage your application from here."),
    );
  }
}
