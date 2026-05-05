import { Component, h } from "../K-engine";
import type { VNode } from "../K-engine/types";

export class Footer extends Component {
  componentDidMount(): void {
    const yearElement = document.querySelector("[data-footer-year]");
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  render(): VNode {
    return h(
      "footer",
      { className: "site-footer", "aria-label": "Site footer" },
      h(
        "div",
        { className: "footer-inner" },
        h(
          "div",
          { className: "footer-top" },
          h(
            "div",
            { className: "footer-brand" },
            h("span", { className: "footer-logo" }, "CarWiki"),
            h(
              "p",
              { className: "footer-tagline" },
              "Comprehensive automotive knowledge base for enthusiasts and researchers.",
            ),
          ),
          h(
            "nav",
            { className: "footer-nav", "aria-label": "Footer navigation" },
            h(
              "div",
              { className: "footer-col" },
              h("h4", null, "Navigation"),
              h("a", { href: "/" }, "Home"),
              h("a", { href: "/browse" }, "Browse Cars"),
              h("a", { href: "/about" }, "About"),
              h("a", { href: "/contact" }, "Contact"),
            ),
            h(
              "div",
              { className: "footer-col" },
              h("h4", null, "Account"),
              h("a", { href: "/profile" }, "My Profile"),
              h("a", { href: "/wishlist" }, "Wishlist"),
            ),
          ),
        ),
        h(
          "div",
          { className: "footer-bottom" },
          h(
            "span",
            { className: "footer-copy" },
            "© ",
            h("span", { "data-footer-year": "" }),
            " CarWiki. All rights reserved.",
          ),
        ),
      ),
    );
  }
}
