import { Component, h } from "../engine";

interface MainRouterState {
  currentRoute:
    | "home"
    | "about"
    | "contact"
    | "wishlist"
    | "admin"
    | "cars"
    | "not-found";
}

export class NavBar extends Component<{ navigateTo: (path: string) => void }> {
  constructor(props: { navigateTo: (path: string) => void }) {
    super(props);
  }

  state: MainRouterState = {
    currentRoute: "home",
  };

  render() {
    return h(
      "nav",
      { className: "navbar" },
      h(
        "a",
        {
          href: "/",
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            this.props.navigateTo("/");
          },
        },
        "Home",
      ),
      h(
        "a",
        {
          href: "/about",
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            this.props.navigateTo("/about");
          },
        },
        "About",
      ),
      h(
        "a",
        {
          href: "/contact",
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            this.props.navigateTo("/contact");
          },
        },
        "Contact",
      ),
      h(
        "a",
        {
          href: "/wishlist",
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            this.props.navigateTo("/wishlist");
          },
        },
        "Wishlist",
      ),
      h(
        "a",
        {
          href: "/admin",
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            this.props.navigateTo("/admin");
          },
        },
        "Admin",
      ),
      h(
        "a",
        {
          href: "/cars",
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            this.props.navigateTo("/cars");
          },
        },
        "Cars",
      ),
    );
  }
}
