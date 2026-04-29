import { Component, h } from "../engine";

export class AboutPage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page about-page" },
      h("h1", null, "About"),
      h("p", null, "Information about this project and team."),
    );
  }
}
