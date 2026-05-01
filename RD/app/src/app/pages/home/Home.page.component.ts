import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class HomePage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "home-page" },
      h("h1", null, "Welcome to Home"),
      h("p", null, "This is the home page of your application."),
    );
  }
}
