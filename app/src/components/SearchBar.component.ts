import { Component, h } from "../K-engine";
import type { VNode } from "../K-engine/types";
import { navigate } from "../utils/routing.utils";

interface SearchBarProps {
  variant?: "hero" | "inline" | "compact";
  title?: string;
  subtitle?: string;
  placeholder?: string;
  query?: string;
  onSearch?: (query: string) => void;
}

interface SearchBarState {
  query: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  initState(): SearchBarState {
    return { query: this.props.query || "" };
  }

  componentDidUpdate(prevProps: SearchBarProps): void {
    if (prevProps.query !== this.props.query) {
      this.setState({ query: this.props.query || "" });
    }
  }

  private handleInput = (event: InputEvent): void => {
    const value = (event.target as HTMLInputElement).value;
    this.setState({ query: value });
  };

  private handleSearch = (event: Event): void => {
    event.preventDefault();
    const query = this.state.query.trim();
    if (!query) return;
    if (this.props.onSearch) {
      this.props.onSearch(query);
      return;
    }
    navigate(`/browse?name=${encodeURIComponent(query)}`);
  };

  render(): VNode {
    const variant = this.props.variant || "hero";
    const showHeader =
      variant === "hero" || Boolean(this.props.title || this.props.subtitle);
    const title = this.props.title || "Find Your Dream Car";
    const subtitle =
      this.props.subtitle ||
      "Search by brand, model, or category to explore our collection.";
    const placeholder = this.props.placeholder || "e.g. Porsche 911 GT3 RS...";
    const wrapperTag = variant === "hero" ? "section" : "div";

    return h(
      "div",
      { "data-search-root": "" },
      h(
        wrapperTag,
        {
          className: `search-section search-section--${variant}`,
          "aria-label": "Search vehicles",
        },
        h(
          "div",
          { className: `search-inner search-inner--${variant}` },
          showHeader
            ? h(
                "div",
                { className: "search-header" },
                h("h2", null, title),
                h("p", null, subtitle),
              )
            : null,
          h(
            "form",
            {
              className: `search-form search-form--${variant}`,
              action: "/browse",
              method: "GET",
              onSubmit: this.handleSearch,
              "aria-label": "Search the catalog",
            },
            h("input", {
              type: "search",
              className: "search-input",
              placeholder,
              value: this.state.query,
              onInput: this.handleInput,
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
