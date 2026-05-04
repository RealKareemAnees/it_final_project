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
            h("span", { className: "footer-logo" }, "Bergo"),
            h(
              "p",
              { className: "footer-tagline" },
              "Premium vehicles, curated for the discerning driver.",
            ),
          ),
          h(
            "nav",
            { className: "footer-nav", "aria-label": "Footer navigation" },
            h(
              "div",
              { className: "footer-col" },
              h("h4", null, "Explore"),
              h("a", { href: "#" }, "Vehicles"),
              h("a", { href: "#" }, "Energy"),
              h("a", { href: "#" }, "Charging"),
              h("a", { href: "#" }, "Discover"),
            ),
            h(
              "div",
              { className: "footer-col" },
              h("h4", null, "Company"),
              h("a", { href: "#" }, "About"),
              h("a", { href: "#" }, "Careers"),
              h("a", { href: "#" }, "Press"),
              h("a", { href: "#" }, "Contact"),
            ),
            h(
              "div",
              { className: "footer-col" },
              h("h4", null, "Legal"),
              h("a", { href: "#" }, "Privacy"),
              h("a", { href: "#" }, "Terms"),
              h("a", { href: "#" }, "Cookies"),
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
            " Bergo. All rights reserved.",
          ),
          h(
            "div",
            { className: "footer-socials" },
            h(
              "a",
              {
                href: "#",
                "aria-label": "Instagram",
                className: "social-link",
              },
              h(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                },
                h("rect", {
                  x: "2",
                  y: "2",
                  width: "20",
                  height: "20",
                  rx: "5",
                  ry: "5",
                }),
                h("circle", { cx: "12", cy: "12", r: "4" }),
                h("circle", {
                  cx: "17.5",
                  cy: "6.5",
                  r: "0.8",
                  fill: "currentColor",
                  stroke: "none",
                }),
              ),
            ),
            h(
              "a",
              {
                href: "#",
                "aria-label": "X / Twitter",
                className: "social-link",
              },
              h(
                "svg",
                { viewBox: "0 0 24 24", fill: "currentColor" },
                h("path", {
                  d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                }),
              ),
            ),
            h(
              "a",
              { href: "#", "aria-label": "YouTube", className: "social-link" },
              h(
                "svg",
                { viewBox: "0 0 24 24", fill: "currentColor" },
                h("path", {
                  d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                }),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
