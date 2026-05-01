import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class AboutPage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "about-page" },
      h("h1", null, "About Us"),
      h("p", null, "Learn more about our application and team."),
    );
  }
}
