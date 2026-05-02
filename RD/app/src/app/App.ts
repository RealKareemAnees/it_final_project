import { Component, h } from "./K-engine";
import type { VNode } from "./K-engine/types";
import { NavBar } from "./components/Navbar.component";
import { Footer } from "./components/Footer.component";
import { HomePage } from "./pages/home/Home.page.component";
import { AuthPage } from "./pages/Auth/Auth";
import { AboutPage } from "./pages/About/About";
import { getCurrentRoute } from "./utils/Router";

interface AppState {
  currentRoute: string;
  params?: Record<string, string>;
}

export class App extends Component<{}, AppState> {
  initState(): AppState {
    return getCurrentRoute();
  }

  componentDidMount(): void {
    window.addEventListener("popstate", this.handleRouteChange);
  }

  componentWillUnmount(): void {
    window.removeEventListener("popstate", this.handleRouteChange);
  }

  handleRouteChange = (): void => {
    this.setState(getCurrentRoute());
  };

  render(): VNode {
    const { currentRoute, params } = this.state;

    let pageContent: VNode;

    switch (currentRoute) {
      case "home":
      case "":
        pageContent = h(HomePage, null);
        break;
      case "about":
        pageContent = h(AboutPage, null);
        break;
      case "auth":
        pageContent = h(AuthPage, null);
        break;
      default:
        pageContent = h(
          "div",
          { className: "not-found-page" },
          h("h1", null, "404 - Page Not Found"),
          h("p", null, `Route "${currentRoute}" does not exist.`),
        );
    }

    return h(
      "div",
      { id: "app-container", style: { fontFamily: "Arial, sans-serif" } },
      h(NavBar, null),
      h("main", { style: { padding: "20px", minHeight: "70vh" } }, pageContent),
      h(Footer, null),
    );
  }
}
