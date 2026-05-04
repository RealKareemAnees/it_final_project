import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import type { Car } from "../../types/car.interface";
import type { UserInfo } from "../../types/userInfo.interface";
import { apiFetch } from "../../utils/api.utils";
import { addToWishlist, removeFromWishlist } from "../../utils/auth.utils";
import { navigate } from "../../utils/routing.utils";

interface FilterOptions {
  countries: string[];
  types: string[];
  brands: string[];
  tags: string[];
}

interface BrowseProps {
  user: UserInfo | null;
}

interface BrowseFilters {
  country: string;
  type: string;
  brand: string;
  tag: string;
}

interface BrowseState {
  cars: Car[];
  loading: boolean;
  error: string | null;
  filters: BrowseFilters;
  options: FilterOptions;
}

const emptyFilters: BrowseFilters = {
  country: "",
  type: "",
  brand: "",
  tag: "",
};

const emptyOptions: FilterOptions = {
  countries: [],
  types: [],
  brands: [],
  tags: [],
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export class BrowsePage extends Component<BrowseProps, BrowseState> {
  initState(): BrowseState {
    return {
      cars: [],
      loading: true,
      error: null,
      filters: emptyFilters,
      options: emptyOptions,
    };
  }

  componentDidMount(): void {
    document.title = "Browse Cars - Bergo";
    window.addEventListener("popstate", this.handleRouteChange);
    void this.loadCars();
  }

  componentWillUnmount(): void {
    window.removeEventListener("popstate", this.handleRouteChange);
  }

  private handleRouteChange = (): void => {
    void this.loadCars();
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

  private buildOptionsFromCars(cars: Car[]): FilterOptions {
    return {
      countries: uniqueSorted(cars.map((car) => car.country).filter(Boolean)),
      types: uniqueSorted(cars.map((car) => car.type).filter(Boolean)),
      brands: uniqueSorted(cars.map((car) => car.manufacturer).filter(Boolean)),
      tags: uniqueSorted(cars.flatMap((car) => car.tags || []).filter(Boolean)),
    };
  }

  private async loadCars(): Promise<void> {
    this.setState({ loading: true, error: null });
    const filters = this.getFiltersFromUrl();

    try {
      const [all, filtered] = await Promise.all([
        apiFetch<{ cars: Car[] }>("/api/cars/all"),
        (() => {
          const params = new URLSearchParams();
          if (filters.country) params.set("country", filters.country);
          if (filters.type) params.set("type", filters.type);
          if (filters.brand) params.set("manufacturer", filters.brand);
          if (filters.tag) params.set("tag", filters.tag);
          const qs = params.toString();
          return apiFetch<{ cars: Car[] }>(
            `/api/cars/search${qs ? `?${qs}` : ""}`,
          );
        })(),
      ]);

      this.setState({
        cars: filtered.cars,
        filters,
        options: this.buildOptionsFromCars(all.cars),
        loading: false,
        error: null,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load cars.";
      this.setState({
        cars: [],
        filters,
        options: emptyOptions,
        loading: false,
        error: message,
      });
    }
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
    const normalizedActive = normalize(active);

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
              className: `filter-pill ${
                normalize(option) === normalizedActive ? "is-active" : ""
              }`,
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
    const { cars, loading, error, filters, options } = this.state;
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
          this.renderFilterGroup("Country", "country", options.countries),
          this.renderFilterGroup("Type", "type", options.types),
          this.renderFilterGroup("Brand", "brand", options.brands),
          this.renderFilterGroup("Tags", "tag", options.tags),
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
