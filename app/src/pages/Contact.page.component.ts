import { Component, h } from "../engine";

export class ContactPage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page contact-page" },
      h("h1", null, "Contact"),
      h("p", null, "Contact us at contact@example.com (placeholder)."),
    );
  }
}
