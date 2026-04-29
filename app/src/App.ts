import { Component, h } from "./engine";
import { AppRouter } from "./routers/App.router";

interface AppState {
  currentPage: "home" | "about" | "contact" | "wishlist";
}

export class App extends Component<{}, AppState> {
  initState(): AppState {
    return { currentPage: "home" };
  }

  render() {
    return h(AppRouter, {});
  }
}
