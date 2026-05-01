import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class AuthPage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "auth-page" },
      h("h1", null, "Authentication"),
      h("p", null, "Sign in to your account here."),
    );
  }
}
