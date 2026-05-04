import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class ProfilePage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "profile-page" },
      h("h1", null, "User Profile"),
      h("p", null, "View and edit your profile information."),
    );
  }
}
