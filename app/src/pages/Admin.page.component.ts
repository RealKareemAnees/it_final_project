import { Component, h } from "../engine";

export class AdminPage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page admin-page" },
      h("h1", null, "Admin"),
      h("p", null, "Admin tools and dashboards (placeholder)."),
    );
  }
}
