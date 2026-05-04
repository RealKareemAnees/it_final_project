import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class ContactPage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "contact-page" },
      h("h1", null, "Contact Us"),
      h("p", null, "Get in touch with our team."),
    );
  }
}
