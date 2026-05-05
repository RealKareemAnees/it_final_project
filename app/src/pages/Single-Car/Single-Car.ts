import { Component, h } from "../../K-engine";
import type { Car } from "../../types/car.interface";
import {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} from "../../utils/auth.utils";
import { navigate } from "../../utils/routing.utils";
import { apiFetch } from "../../utils/api.utils";

interface SingleCarState {
  car: Car | null;
  loading: boolean;
  error: string | null;
  selectedIndex: number;
  show3D: boolean;
}

export default class SingleCar extends Component<{}, SingleCarState> {
  initState(): SingleCarState {
    return {
      car: null,
      loading: true,
      error: null,
      selectedIndex: 0,
      show3D: false,
    };
  }

  componentDidMount(): void {
    const carId = window.location.pathname.split("/").pop();
    if (carId) this.fetchCar(carId);
  }

  private fetchCar(id: string): void {
    apiFetch<{ car: Car }>(`/api/cars/${id}`)
      .then((data) => this.setState({ car: data.car, loading: false }))
      .catch((err) =>
        this.setState({
          error: err.message || "Failed to load car",
          loading: false,
        }),
      );
  }

  private isWishlisted(car: Car): boolean {
    return isWishlisted(car.localID);
  }

  private toggleWishlist(car: Car): void {
    if (this.isWishlisted(car)) removeFromWishlist(car.localID);
    else addToWishlist(car.localID);
    this.forceUpdate();
  }

  render(): any {
    const { car, loading, error, selectedIndex, show3D } = this.state;

    /* ── Loading ── */
    if (loading) {
      return h(
        "div",
        { className: "page-section sc-page" },
        h(
          "div",
          { className: "sc-status-stage" },
          h("div", { className: "sc-spinner" }),
          h("p", { className: "sc-status-kicker" }, "Retrieving"),
          h("h2", { className: "sc-status-title" }, "Loading car details"),
        ),
      );
    }

    /* ── Error ── */
    if (error || !car) {
      return h(
        "div",
        { className: "page-section sc-page" },
        h(
          "div",
          { className: "sc-status-stage" },
          h("p", { className: "sc-status-kicker" }, "Not found"),
          h("h2", { className: "sc-status-title" }, "Car unavailable"),
          h(
            "p",
            { className: "sc-status-body" },
            error || "We could not load this vehicle.",
          ),
          h(
            "button",
            { className: "sc-cta-primary", onClick: () => navigate("/browse") },
            "Back to browse",
          ),
        ),
      );
    }

    /* ── Derived values ── */
    const images = (car.images || []).filter(Boolean);
    const total = images.length;
    const safeIdx = total > 0 ? ((selectedIndex % total) + total) % total : 0;
    const fallback = "/assets/images/slide-1-images/audi.avif";
    const tags = car.tags || [];
    const wishlisted = this.isWishlisted(car);
    const hasGallery = total > 1;

    const modelSrc = car.threeDfile
      ? car.threeDfile.startsWith("/")
        ? car.threeDfile
        : `/assets/3d/${car.threeDfile}`
      : null;

    const goTo = (index: number): void => {
      if (!hasGallery) return;
      this.setState({ selectedIndex: ((index % total) + total) % total });
    };

    /* ── Filmstrip ── */
    const filmstrip =
      total > 0
        ? h(
            "div",
            {
              className: "sc-strip",
              style: {
                width: `${total * 100}%`,
                transform: `translateX(-${safeIdx * (100 / total)}%)`,
              },
            },
            ...images.map((src: string, i: number) =>
              h("img", {
                key: `img-${car.localID}-${i}`,
                src,
                alt: `${car.name} view ${i + 1}`,
                className: "sc-strip-img",
              }),
            ),
          )
        : h("img", {
            src: fallback,
            alt: car.name,
            className: "sc-strip-img sc-strip-img--solo",
          });

    /* ── Stat blocks (right side of hero) ── */
    const stats = [
      { value: String(car.year), label: "Model year" },
      { value: car.type, label: "Category" },
      { value: car.country, label: "Origin" },
    ];

    return h(
      "div",
      { className: "page-section sc-page" },

      /* ════ TOPBAR ════ */
      h(
        "div",
        { className: "sc-topbar" },
        h(
          "button",
          { className: "sc-back-btn", onClick: () => navigate("/browse") },
          h("span", { className: "sc-back-arrow" }, "←"),
          "Browse",
        ),
        h(
          "div",
          { className: "sc-topbar-breadcrumb" },
          h("span", null, car.manufacturer),
          h("span", { className: "sc-topbar-sep" }, "/"),
          h("span", { className: "sc-topbar-model" }, car.name),
        ),
        /* 3D toggle in topbar if available */
        modelSrc
          ? h(
              "div",
              { className: "sc-view-toggle" },
              h(
                "button",
                {
                  className: `sc-view-btn${!show3D ? " active" : ""}`,
                  onClick: () => this.setState({ show3D: false }),
                },
                "Gallery",
              ),
              h(
                "button",
                {
                  className: `sc-view-btn${show3D ? " active" : ""}`,
                  onClick: () => this.setState({ show3D: true }),
                },
                "3D",
              ),
            )
          : h("div", null), // spacer to keep flex layout balanced
      ),

      /* ════ HERO ════ */
      h(
        "div",
        { className: "sc-hero" },

        /* ── Visual column ── */
        h(
          "div",
          { className: "sc-visual-col" },

          /* Identity above image */
          h(
            "div",
            { className: "sc-identity" },
            tags.length > 0
              ? h(
                  "div",
                  { className: "sc-tag-row" },
                  ...tags
                    .slice(0, 3)
                    .map((tag) =>
                      h("span", { className: "sc-badge", key: tag }, tag),
                    ),
                )
              : null,
            h(
              "div",
              { className: "sc-title-block" },
              h("p", { className: "sc-kicker" }, car.manufacturer),
              h("h1", { className: "sc-car-title" }, car.name),
            ),
          ),

          /* Stage */
          h(
            "div",
            { className: `sc-stage${show3D ? " sc-stage--3d" : ""}` },

            /* track */
            h("div", { className: "sc-track" }, filmstrip),

            /* 3D viewer */
            modelSrc && show3D
              ? h(
                  "div",
                  { className: "sc-3d-layer" },
                  h("model-viewer", {
                    className: "sc-model",
                    src: modelSrc,
                    alt: `${car.name} 3D model`,
                    "camera-controls": true,
                    "auto-rotate": true,
                    "shadow-intensity": "1",
                    "shadow-softness": "0.8",
                    exposure: "1.2",
                    "environment-image": "neutral",
                    "tone-mapping": "aces",
                    "camera-orbit": "45deg 75deg 4m",
                    "interaction-prompt": "auto",
                    ar: true,
                  }),
                )
              : null,

            /* Arrows */
            hasGallery
              ? h(
                  "div",
                  { className: "sc-arrows" },
                  h(
                    "button",
                    {
                      className: "sc-arrow",
                      onClick: () => goTo(safeIdx - 1),
                      "aria-label": "Previous",
                    },
                    "‹",
                  ),
                  h(
                    "button",
                    {
                      className: "sc-arrow",
                      onClick: () => goTo(safeIdx + 1),
                      "aria-label": "Next",
                    },
                    "›",
                  ),
                )
              : null,

            /* Frame counter */
            h(
              "div",
              { className: "sc-frame-counter" },
              h("span", null, `${String(safeIdx + 1).padStart(2, "0")}`),
              h("span", { className: "sc-frame-sep" }, "/"),
              h("span", null, `${String(Math.max(total, 1)).padStart(2, "0")}`),
            ),

            /* Dots */
            total > 1
              ? h(
                  "div",
                  { className: "sc-dots" },
                  ...images.map((_, i) =>
                    h("button", {
                      key: `dot-${i}`,
                      className: `sc-dot${i === safeIdx ? " active" : ""}`,
                      onClick: () => goTo(i),
                      "aria-label": `Image ${i + 1}`,
                    }),
                  ),
                )
              : null,
          ),

          /* Thumbnails */
          hasGallery
            ? h(
                "div",
                { className: "sc-thumbstrip" },
                ...images.map((src: string, i: number) =>
                  h(
                    "button",
                    {
                      key: `t-${i}`,
                      className: `sc-thumb${i === safeIdx ? " active" : ""}`,
                      onClick: () => goTo(i),
                      "aria-label": `View ${i + 1}`,
                    },
                    h("img", {
                      src,
                      alt: `${car.name} ${i + 1}`,
                      className: "sc-thumb-img",
                    }),
                  ),
                ),
              )
            : null,
        ),

        /* ── Data column ── */
        h(
          "div",
          { className: "sc-data-col" },

          /* Price */
          h(
            "div",
            { className: "sc-price-block" },
            h("span", { className: "sc-price-label" }, "Starting from"),
            h(
              "span",
              { className: "sc-price" },
              `$${car.price.toLocaleString()}`,
            ),
          ),

          /* Divider */
          h("hr", { className: "sc-rule" }),

          /* Description */
          h("p", { className: "sc-desc" }, car.description),

          /* Divider */
          h("hr", { className: "sc-rule" }),

          /* Stats */
          h(
            "div",
            { className: "sc-stats-grid" },
            ...stats.map((stat) =>
              h(
                "div",
                { className: "sc-stat", key: stat.label },
                h("span", { className: "sc-stat__value" }, stat.value),
                h("span", { className: "sc-stat__label" }, stat.label),
              ),
            ),
          ),

          /* Divider */
          h("hr", { className: "sc-rule" }),

          /* Actions */
          h(
            "div",
            { className: "sc-actions" },
            h(
              "button",
              {
                className: `sc-cta-primary${wishlisted ? " saved" : ""}`,
                onClick: () => void this.toggleWishlist(car),
              },
              wishlisted ? "Saved  ✓" : "Save to Wishlist",
            ),
            h(
              "button",
              { className: "sc-cta-ghost", onClick: () => navigate("/browse") },
              "Back to browse",
            ),
          ),
        ),
      ),

      /* ════ INSIGHTS STRIP ════ */
      h(
        "section",
        { className: "sc-insights" },
        h(
          "article",
          { className: "sc-insight" },
          h("span", { className: "sc-insight__num" }, "01"),
          h("p", { className: "sc-insight__label" }, "Design focus"),
          h(
            "p",
            { className: "sc-insight__copy" },
            "Clean body lines, balanced proportions, and a strong shoulder line keep the silhouette deliberate.",
          ),
        ),
        h(
          "article",
          { className: "sc-insight" },
          h("span", { className: "sc-insight__num" }, "02"),
          h("p", { className: "sc-insight__label" }, "Driver feel"),
          h(
            "p",
            { className: "sc-insight__copy" },
            "A composed chassis and responsive steering make the car feel settled at speed and in traffic.",
          ),
        ),
        h(
          "article",
          { className: "sc-insight" },
          h("span", { className: "sc-insight__num" }, "03"),
          h("p", { className: "sc-insight__label" }, "Ownership"),
          h(
            "p",
            { className: "sc-insight__copy" },
            "Save the car now and compare it later against other builds in your wishlist.",
          ),
        ),
      ),
    );
  }
}
