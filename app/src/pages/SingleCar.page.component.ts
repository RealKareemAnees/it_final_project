import { Component, h } from "../engine";

export class SingleCarPage extends Component<any, any> {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    const id = this.props?.id;
    return h(
      "main",
      { className: "page single-car-page" },
      h("h1", null, id ? `Car ${id}` : "Cars"),
      id
        ? h("div", null, h("p", null, `Details for car ${id} (placeholder).`))
        : h("div", null, h("p", null, "Cars listing (placeholder).")),
    );
  }
}
