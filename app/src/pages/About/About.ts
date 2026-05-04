import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";

export class AboutPage extends Component {
  render(): VNode {
    return h(
      "div",
      { className: "page-section about-page" },
      h(
        "div",
        { className: "about-hero" },
        h(
          "div",
          { className: "about-intro" },
          h("span", { className: "page-eyebrow" }, "About"),
          h("h1", null, "A calmer way to explore cars"),
          h(
            "p",
            null,
            "Bergo is a curated car wiki focused on clean data, intentional layouts, and a focused browsing experience.",
          ),
          h(
            "p",
            null,
            "We remove the noise so you can discover models, compare specs, and save favorites with confidence.",
          ),
        ),
        h(
          "div",
          { className: "about-metrics" },
          h(
            "div",
            { className: "metric-card" },
            h("span", null, "Catalog"),
            h("strong", null, "120+ models"),
          ),
          h(
            "div",
            { className: "metric-card" },
            h("span", null, "Origins"),
            h("strong", null, "18 countries"),
          ),
          h(
            "div",
            { className: "metric-card" },
            h("span", null, "Updates"),
            h("strong", null, "Weekly"),
          ),
        ),
      ),
      h(
        "div",
        { className: "about-grid" },
        h(
          "div",
          { className: "about-card" },
          h("h3", null, "Focused browsing"),
          h(
            "p",
            null,
            "Every layout is designed to keep the essentials in view, from performance to pricing.",
          ),
        ),
        h(
          "div",
          { className: "about-card" },
          h("h3", null, "Curated data"),
          h(
            "p",
            null,
            "We highlight reliable specs, owner notes, and expert context for each car.",
          ),
        ),
        h(
          "div",
          { className: "about-card" },
          h("h3", null, "Designed for clarity"),
          h(
            "p",
            null,
            "Minimal styling keeps attention on what matters and makes comparisons feel effortless.",
          ),
        ),
      ),
      h(
        "div",
        { className: "about-story" },
        h("h2", null, "How we build the catalog"),
        h(
          "p",
          null,
          "Every listing is crafted to highlight the essentials: performance, origin, and design intent. We review data manually and keep the vocabulary consistent so you can compare without guesswork.",
        ),
      ),
    );
  }
}
