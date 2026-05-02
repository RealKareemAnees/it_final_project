import { Component, type Props } from "../engine";
import { h } from "../engine";

export class HomePage extends Component {
  initState(): Props {
    return {};
  }

  render() {
    return h(
      "div",
      { className: "home-page" },
      h("h1", null, "Welcome to MiniAct!"),
      h(
        "p",
        null,
        "This is a simple React-like framework built with vanilla TypeScript.",
      ),
      h(
        "p",
        null,
        "Explore the Counter and Todo List tabs to see MiniAct in action!",
      ),
    );
  }
}
