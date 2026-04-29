import { Component, h } from "../engine";

export class SearchPage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page search-page" },
      h("h1", null, "Search"),
      h("p", null, "Search for cars (placeholder)."),
    );
  }
}
