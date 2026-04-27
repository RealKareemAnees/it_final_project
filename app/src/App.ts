import { Component, h } from "./engine";

interface AppState {
  currentPage: "home" | "about" | "contact" | "wishlist";
}

export class App extends Component<{}, AppState> {
  initState(): AppState {
    return { currentPage: "home" };
  }

  render() {
    const { currentPage } = this.state;

    return h(
      "div",
      { className: "app-container" },
      h("nav", { className: "navbar" }),
    );
  }
}
