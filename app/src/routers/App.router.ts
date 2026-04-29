import { NavBar } from "../components/NavBar.component";
import { Component, h } from "../engine";

interface AppRouterState {
  currentRoute:
    | "home"
    | "about"
    | "contact"
    | "wishlist"
    | "admin"
    | "cars"
    | "not-found";
}

export class AppRouter extends Component<{}, AppRouterState> {
  constructor() {
    super({});
  }

  state: AppRouterState = {
    currentRoute: "home",
  };

  initState() {
    return getCurrentRoute();
  }

  componentDidMount(): void {
    window.addEventListener("popstate", this.handlePopState);
  }

  componentWillUnmount(): void {
    window.removeEventListener("popstate", this.handlePopState);
  }

  handlePopState = (): void => {
    this.setState(getCurrentRoute());
  };

  navigateTo = (path: string): void => {
    window.history.pushState({}, "", path);
    this.setState(getCurrentRoute());
  };

  render() {
    const currentRoute = this.state.currentRoute;

    return h(
      "div",
      { id: "app-container" },
      h(NavBar, { navigateTo: this.navigateTo }),
      currentRoute === "home" && h("h1", null, "Home Page"),
      currentRoute === "about" && h("h1", null, "About Page"),
      currentRoute === "contact" && h("h1", null, "Contact Page"),
      currentRoute === "wishlist" && h("h1", null, "Wishlist Page"),
      currentRoute === "admin" && h("h1", null, "Admin Page"),
      currentRoute === "cars" && h("h1", null, "Cars Page"),
      currentRoute === "not-found" && h("h1", null, "Page Not Found"),
    );
  }
}

function getCurrentRoute(): AppRouterState {
  const path = window.location.pathname;

  switch (path) {
    case "/":
      return { currentRoute: "home" };
    case "/about":
      return { currentRoute: "about" };
    case "/contact":
      return { currentRoute: "contact" };
    case "/wishlist":
      return { currentRoute: "wishlist" };
    case "/admin":
      return { currentRoute: "admin" };
    case "/cars":
      return { currentRoute: "cars" };
    default:
      return { currentRoute: "not-found" };
  }
}
