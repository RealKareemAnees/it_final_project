import { Component, h } from "../K-engine";
import type { VNode } from "../K-engine/types";

export class SearchBar extends Component {
  render(): VNode {
    return h(
      "div",
      { "data-search-root": "" },
      h(
        "section",
        { className: "search-section", "aria-label": "Search vehicles" },
        h(
          "div",
          { className: "search-inner" },
          h(
            "div",
            { className: "search-header" },
            h("h2", null, "Find Your Dream Car"),
            h(
              "p",
              null,
              "Search by brand, model, or category to explore our collection.",
            ),
          ),
          h(
            "form",
            { className: "search-form", action: "#", method: "GET" },
            h("input", {
              type: "search",
              className: "search-input",
              placeholder: "e.g. Porsche 911 GT3 RS...",
              required: true,
            }),
            h(
              "button",
              {
                type: "submit",
                className: "search-button",
                "aria-label": "Search",
              },
              h(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                h("circle", { cx: "11", cy: "11", r: "8" }),
                h("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
