import { Component, h } from "../engine";

export class NotFoundPage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page notfound-page" },
      h("h1", null, "Page Not Found"),
      h("p", null, "The page you requested does not exist."),
    );
  }
}
