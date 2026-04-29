import { NavBar } from "../components/NavBar.component";
import { Component, h } from "../engine";

import { HomePage } from "../pages/Home.page.component";
import { AboutPage } from "../pages/About.page.component";
import { ContactPage } from "../pages/Contact.page.component";
import { WishlistPage } from "../pages/Wishlist.page.component";
import { AdminPage } from "../pages/Admin.page.component";
import { SingleCarPage } from "../pages/SingleCar.page.component";
import { SearchPage } from "../pages/Search.page.component";
import { ProfilePage } from "../pages/Profile.page.component";
import { AuthPage } from "../pages/Auth.page.Component";
import { NotFoundPage } from "../pages/NotFound.page.component";

interface AppRouterState {
  currentRoute:
    | "home"
    | "about"
    | "contact"
    | "wishlist"
    | "admin"
    | "cars"
    | "single-car"
    | "search"
    | "profile"
    | "auth"
    | "not-found";
  params?: { id?: string };
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
    const { currentRoute, params } = this.state;

    return h(
      "div",
      { id: "app-container" },
      h(NavBar, { navigateTo: this.navigateTo }),
      currentRoute === "home" && h(HomePage, null),
      currentRoute === "about" && h(AboutPage, null),
      currentRoute === "contact" && h(ContactPage, null),
      currentRoute === "wishlist" && h(WishlistPage, null),
      currentRoute === "admin" && h(AdminPage, null),
      currentRoute === "cars" && h(SingleCarPage, null),
      currentRoute === "single-car" && h(SingleCarPage, { id: params?.id }),
      currentRoute === "search" && h(SearchPage, null),
      currentRoute === "profile" && h(ProfilePage, null),
      currentRoute === "auth" && h(AuthPage, null),
      currentRoute === "not-found" && h(NotFoundPage, null),
    );
  }
}

function getCurrentRoute(): AppRouterState {
  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean);

  if (path === "/" || path === "") return { currentRoute: "home" };
  if (path === "/about") return { currentRoute: "about" };
  if (path === "/contact") return { currentRoute: "contact" };
  if (path === "/wishlist") return { currentRoute: "wishlist" };
  if (path === "/admin") return { currentRoute: "admin" };
  if (path === "/cars") return { currentRoute: "cars" };
  if (segments[0] === "cars" && segments[1])
    return { currentRoute: "single-car", params: { id: segments[1] } };
  if (path === "/search") return { currentRoute: "search" };
  if (path === "/profile") return { currentRoute: "profile" };
  if (path === "/auth") return { currentRoute: "auth" };

  return { currentRoute: "not-found" };
}
