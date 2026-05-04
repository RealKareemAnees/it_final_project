import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import type { Car } from "../../types/car.interface";
import type { UserInfo } from "../../types/userInfo.interface";
import { addToWishlist, removeFromWishlist } from "../../utils/auth.utils";
import { navigate } from "../../utils/routing.utils";
import {
  filterCars,
  filterOptions,
  type BrowseFilters,
} from "../../data/cars.data";

interface BrowseProps {
  user: UserInfo | null;
}

interface BrowseState {
  cars: Car[];
  loading: boolean;
  error: string | null;
  filters: BrowseFilters;
}

const emptyFilters: BrowseFilters = {
  country: "",
  type: "",
  brand: "",
  tag: "",
};

export class BrowsePage extends Component<BrowseProps, BrowseState> {
  initState(): BrowseState {
    return { cars: [], loading: true, error: null, filters: emptyFilters };
  }

  componentDidMount(): void {
    document.title = "Browse Cars - Bergo";
    window.addEventListener("popstate", this.handleRouteChange);
    this.loadCars();
  }

  componentWillUnmount(): void {
    window.removeEventListener("popstate", this.handleRouteChange);
  }

  private handleRouteChange = (): void => {
    this.loadCars();
  };

  private getFiltersFromUrl(): BrowseFilters {
    const params = new URLSearchParams(window.location.search);
    return {
      country: params.get("country")?.trim() || "",
      type: params.get("type")?.trim() || "",
      brand: params.get("brand")?.trim() || "",
      tag: params.get("tag")?.trim() || "",
    };
  }

  private loadCars(): void {
    const filters = this.getFiltersFromUrl();
    const cars = filterCars(filters);
    this.setState({ cars, filters, loading: false, error: null });
  }

  private isWishlisted(car: Car): boolean {
    const wishList = this.props.user?.wishList || [];
    return wishList.includes(String(car.localID));
  }

  private async toggleWishlist(car: Car): Promise<void> {
    if (!this.props.user?.username) {
      navigate("/auth");
      return;
    }

    if (this.isWishlisted(car)) {
      await removeFromWishlist(car.localID);
      return;
    }

    await addToWishlist(car.localID);
  }

  private applyFilter(key: keyof BrowseFilters, value: string): void {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const queryString = params.toString();
    navigate(`/browse${queryString ? `?${queryString}` : ""}`);
  }

  private toggleFilter(key: keyof BrowseFilters, value: string): void {
    const current = this.state.filters[key];
    this.applyFilter(key, current === value ? "" : value);
  }

  private clearFilters = (): void => {
    navigate("/browse");
  };

  private renderFilterGroup(
    label: string,
    key: keyof BrowseFilters,
    options: string[],
  ): VNode {
    const active = this.state.filters[key];

    return h(
      "div",
      { className: "filter-group" },
      h("h3", null, label),
      h(
        "div",
        { className: "filter-options" },
        h(
          "button",
          {
            className: `filter-pill ${!active ? "is-active" : ""}`,
            onClick: () => this.applyFilter(key, ""),
          },
          "All",
        ),
        options.map((option) =>
          h(
            "button",
            {
              className: `filter-pill ${active === option ? "is-active" : ""}`,
              key: `${label}-${option}`,
              onClick: () => this.toggleFilter(key, option),
            },
            option,
          ),
        ),
      ),
    );
  }

  private renderTags(tags: string[]): VNode {
    return h(
      "div",
      { className: "car-card__tags" },
      tags
        .slice(0, 3)
        .map((tag) => h("span", { className: "car-tag", key: tag }, tag)),
    );
  }

  render(): VNode {
    const { cars, loading, error, filters } = this.state;
    const activeFilters = [
      filters.country
        ? { key: "country" as const, label: `Country: ${filters.country}` }
        : null,
      filters.type ? { key: "type" as const, label: `Type: ${filters.type}` } : null,
      filters.brand
        ? { key: "brand" as const, label: `Brand: ${filters.brand}` }
        : null,
      filters.tag ? { key: "tag" as const, label: `Tag: ${filters.tag}` } : null,
    ].filter(Boolean) as Array<{ key: keyof BrowseFilters; label: string }>;

    return h(
      "div",
      { className: "page-section browse-page" },
      h(
        "div",
        { className: "page-header" },
        h("span", { className: "page-eyebrow" }, "Browse"),
        h("h1", null, "Browse Cars"),
        h(
          "p",
          null,
          "Explore the catalog with curated filters and hand picked models.",
        ),
      ),
      h(
        "div",
        { className: "browse-layout" },
        h(
          "aside",
          { className: "browse-filters" },
          h(
            "div",
            { className: "filter-header" },
            h("h2", null, "Refine"),
            h(
              "button",
              {
                className: "ghost-button filter-clear",
                onClick: this.clearFilters,
              },
              "Clear all",
            ),
          ),
          this.renderFilterGroup("Country", "country", filterOptions.countries),
          this.renderFilterGroup("Type", "type", filterOptions.types),
          this.renderFilterGroup("Brand", "brand", filterOptions.brands),
          this.renderFilterGroup("Tags", "tag", filterOptions.tags),
        ),
        h(
          "section",
          { className: "browse-results" },
          h(
            "div",
            { className: "browse-toolbar" },
            h("div", { className: "results-count" }, `${cars.length} cars`),
            activeFilters.length
              ? h(
                  "div",
                  { className: "active-filters" },
                  activeFilters.map((filter) =>
                    h(
                      "button",
                      {
                        className: "filter-chip",
                        key: filter.label,
                        onClick: () => this.applyFilter(filter.key, ""),
                      },
                      filter.label,
                    ),
                  ),
                )
              : h("span", { className: "filter-empty" }, "No filters applied"),
          ),
          loading
            ? h("p", { className: "page-note" }, "Loading cars...")
            : null,
          error ? h("p", { className: "page-error" }, error) : null,
          h(
            "div",
            { className: "car-grid car-grid--dense" },
            cars.map((car) =>
              h(
                "article",
                { className: "car-card", key: car.localID },
                h(
                  "button",
                  {
                    className: "car-card__media",
                    onClick: () => navigate(`/cars/${car.localID}`),
                  },
                  h("img", {
                    src:
                      car.images?.[0] ||
                      "/assets/images/slide-1-images/audi.avif",
                    alt: car.name,
                    loading: "lazy",
                  }),
                  h("span", { className: "car-card__badge" }, car.type),
                ),
                h(
                  "div",
                  { className: "car-card__body" },
                  h(
                    "div",
                    { className: "car-card__meta" },
                    h("span", null, car.manufacturer),
                    h("span", null, String(car.year)),
                  ),
                  h("h3", { className: "car-card__title" }, car.name),
                  h(
                    "p",
                    { className: "car-card__subtitle" },
                    `${car.country} · ${car.type}`,
                  ),
                  this.renderTags(car.tags),
                  h(
                    "div",
                    { className: "car-card__footer" },
                    h(
                      "span",
                      { className: "car-card__price" },
                      `$${car.price.toLocaleString()}`,
                    ),
                    h(
                      "button",
                      {
                        className: "car-action",
                        onClick: () => void this.toggleWishlist(car),
                      },
                      this.isWishlisted(car) ? "Remove" : "Wishlist",
                    ),
                  ),
                ),
              ),
            ),
          ),
          !loading && !cars.length
            ? h("p", { className: "page-note" }, "No cars found.")
            : null,
        ),
      ),
    );
  }
}
