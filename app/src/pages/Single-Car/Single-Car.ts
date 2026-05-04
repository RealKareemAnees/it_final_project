import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class SingleCarPage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "single-car-page" },
      h("h1", null, "Car Details"),
      h("p", null, "View detailed information about this car."),
    );
  }
}
