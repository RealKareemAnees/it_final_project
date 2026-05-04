import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class BrowsePage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "browse-page" },
      h("h1", null, "Browse Cars"),
      h("p", null, "Explore our collection of cars."),
    );
  }
}
