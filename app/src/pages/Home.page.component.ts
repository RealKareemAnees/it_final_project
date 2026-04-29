import { Component, h } from "../engine";

export class HomePage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page home-page" },
      h("h1", null, "Home"),
      h("p", null, "Welcome to the car marketplace."),
    );
  }
}
