import { Component, h } from "../engine";

export class WishlistPage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page wishlist-page" },
      h("h1", null, "Wishlist"),
      h("p", null, "Your saved cars will appear here (placeholder)."),
    );
  }
}
