import { Component, h } from "../engine";

export class Footer extends Component {
  render() {
    return h(
      "footer",
      { className: "footer" },
      h(
        "div",
        { className: "footer-content" },
        h(
          "p",
          null,
          "© ",
          new Date().getFullYear(),
          " MyApp. All rights reserved.",
        ),
        h("p", null, "Built with MiniAct."),
      ),
    );
  }
}

export default Footer;
