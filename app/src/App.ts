import { Component, h } from "./K-engine";
import type { VNode } from "./K-engine/types";
import { NavBar } from "./components/Navbar.component";
import { Footer } from "./components/Footer.component";
import { HomePage } from "./pages/home/Home.page.component.ts";
import { AuthPage } from "./pages/Auth/Auth";
import { AboutPage } from "./pages/About/About";
import { BrowsePage } from "./pages/Browse/Browse";
import { ContactPage } from "./pages/Contact/Contact";
import { AdminPage } from "./pages/Admin/Admin";
import { ProfilePage } from "./pages/Profile/Profile";
import { SingleCarPage } from "./pages/Single-Car/Single-Car";
import { WishlistPage } from "./pages/Wishlist/Wishlist";
import { getCurrentRoute } from "./utils/routing.utils";
import type { UserInfo } from "./types/userInfo.interface";
import { getUSerinfoFromLocalStorage } from "./utils/localStorage.util";
import { onAuthChange } from "./utils/auth.utils";

interface AppState {
  currentRoute: string;
  params?: Record<string, string>;
  user: UserInfo | null;
}

export class App extends Component<{}, AppState> {
  private unsubscribeAuth?: () => void;

  initState(): AppState {
    return { ...getCurrentRoute(), user: getUSerinfoFromLocalStorage() };
  }

  componentDidMount(): void {
    window.addEventListener("popstate", this.handleRouteChange);
    this.unsubscribeAuth = onAuthChange((user) => {
      this.setState({ user: user || getUSerinfoFromLocalStorage() });
    });
    this.checkGuards();
  }

  componentDidUpdate(_prevProps: {}, prevState: AppState): void {
    if (
      prevState.currentRoute !== this.state.currentRoute ||
      prevState.user !== this.state.user
    ) {
      this.checkGuards();
    }
  }

  checkGuards(): void {
    const { currentRoute, user } = this.state;
    if (currentRoute === "profile" && !user?.username) {
      window.history.replaceState({}, "", "/auth");
      window.dispatchEvent(new Event("popstate"));
    } else if (currentRoute === "admin" && user?.role !== "admin") {
      window.history.replaceState({}, "", "/");
      window.dispatchEvent(new Event("popstate"));
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener("popstate", this.handleRouteChange);
    this.unsubscribeAuth?.();
  }

  handleRouteChange = (): void => {
    this.setState(getCurrentRoute());
  };

  render(): VNode {
    const { currentRoute, user } = this.state;

    if (
      (currentRoute === "profile" && !user?.username) ||
      (currentRoute === "admin" && user?.role !== "admin")
    ) {
      return h("div", { className: "page-shell" });
    }

    let pageContent: VNode;

    switch (currentRoute) {
      case "home":
      case "":
        pageContent = h(HomePage, { user });
        break;
      case "about":
        pageContent = h(AboutPage, null);
        break;
      case "auth":
        pageContent = h(AuthPage, { user });
        break;
      case "browse":
        pageContent = h(BrowsePage, { user });
        break;
      case "contact":
        pageContent = h(ContactPage, null);
        break;
      case "admin":
        pageContent = h(AdminPage, { user });
        break;
      case "profile":
        pageContent = h(ProfilePage, { user });
        break;
      case "single-car":
        pageContent = h(SingleCarPage, { user });
        break;
      case "wishlist":
        pageContent = h(WishlistPage, { user });
        break;
      default:
        pageContent = h(
          "div",
          { className: "not-found-page" },
          h("h1", null, "404 - Page Not Found"),
          h("p", null, `Route "${currentRoute}" does not exist.`),
        );
    }

    const isStandalone =
      currentRoute === "home" || currentRoute === "" || currentRoute === "auth";

    if (isStandalone) {
      return h("div", { id: "app-container" }, pageContent);
    }

    return h(
      "div",
      { id: "app-container" },
      h(NavBar, { user, isInner: true }),
      h("main", { className: "page-shell" }, pageContent),
      h(Footer, null),
    );
  }
}
