import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class WishlistPage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "wishlist-page" },
      h("h1", null, "My Wishlist"),
      h("p", null, "Your saved favorite cars."),
    );
  }
}
