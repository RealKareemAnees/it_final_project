import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import type { Car } from "../../types/car.interface";
import type { UserInfo } from "../../types/userInfo.interface";
import { apiFetch } from "../../utils/api.utils";
import { addToWishlist, removeFromWishlist } from "../../utils/auth.utils";
import { navigate } from "../../utils/routing.utils";

interface SingleCarProps {
  user: UserInfo | null;
}

interface SingleCarState {
  car: Car | null;
  loading: boolean;
  error: string | null;
  selectedIndex: number;
}

export class SingleCarPage extends Component<SingleCarProps, SingleCarState> {
  initState(): SingleCarState {
    return { car: null, loading: true, error: null, selectedIndex: 0 };
  }

  componentDidMount(): void {
    document.title = "Car Details - Bergo";
    void this.loadCar();
  }

  private async loadCar(): Promise<void> {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const id = segments[1];
    if (!id) {
      this.setState({ loading: false, error: "Car not found." });
      return;
    }

    try {
      const data = await apiFetch<{ car: Car }>(`/api/cars/${id}`);
      this.setState({ car: data.car, loading: false, selectedIndex: 0 });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load car.";
      this.setState({ error: message, loading: false });
    }
  }

  private isWishlisted(car: Car): boolean {
    return (this.props.user?.wishList || []).includes(String(car.localID));
  }

  private async toggleWishlist(car: Car): Promise<void> {
    if (!this.props.user?.username) {
      navigate("/auth");
      return;
    }
    if (this.isWishlisted(car)) {
      await removeFromWishlist(car.localID);
    } else {
      await addToWishlist(car.localID);
    }
  }

  render(): VNode {
    const { car, loading, error, selectedIndex } = this.state;

    if (loading) {
      return h(
        "div",
        { className: "page-section sc-state-view" },
        h("div", { className: "sc-spinner" }),
        h("p", { className: "sc-state-text" }, "Loading car details…"),
      );
    }

    if (error || !car) {
      return h(
        "div",
        { className: "page-section sc-state-view" },
        h("h2", { className: "sc-state-heading" }, "Car not found"),
        h(
          "p",
          { className: "sc-state-text" },
          error || "We could not load this car.",
        ),
        h(
          "button",
          { className: "sc-btn-primary", onClick: () => navigate("/browse") },
          "← Back to Browse",
        ),
      );
    }

    const images = (car.images || []).filter(Boolean);
    const total = images.length;
    const safeIndex = total > 0 ? ((selectedIndex % total) + total) % total : 0;
    const fallback = "/assets/images/slide-1-images/audi.avif";
    const tags = car.tags || [];
    const wishlisted = this.isWishlisted(car);

    const goTo = (index: number): void => {
      if (total < 2) return;
      this.setState({
        selectedIndex: ((index % total) + total) % total,
      });
    };

    // ── Filmstrip: all images side-by-side, translated via CSS
    // Strip width = total * 100%; each image takes 1/total of strip = 100% of track
    // translateX(-safeIndex * 100/total %) shifts exactly one track-width per step
    const filmstrip =
      total > 0
        ? h(
            "div",
            {
              className: "sc-strip",
              style: {
                width: `${total * 100}%`,
                transform: `translateX(-${safeIndex * (100 / total)}%)`,
              },
            },
            ...images.map((src, i) =>
              h("img", {
                key: `img-${car.localID}-${i}`,
                src,
                alt: `${car.name} – view ${i + 1}`,
                className: "sc-strip-img",
              }),
            ),
          )
        : h("img", {
            src: fallback,
            alt: car.name,
            className: "sc-strip-img sc-strip-img--solo",
          });

    const dots =
      total > 1
        ? h(
            "div",
            { className: "sc-dots" },
            ...images.map((_, i) =>
              h("button", {
                key: `dot-${i}`,
                className: `sc-dot${i === safeIndex ? " active" : ""}`,
                onClick: () => goTo(i),
                "aria-label": `Image ${i + 1}`,
              }),
            ),
          )
        : null;

    const thumbs =
      total > 1
        ? h(
            "div",
            { className: "sc-thumbs" },
            ...images.map((src, i) =>
              h("button", {
                key: `thumb-${car.localID}-${i}`,
                className: `sc-thumb${i === safeIndex ? " active" : ""}`,
                onClick: () => goTo(i),
                "aria-label": `View image ${i + 1}`,
                style: { backgroundImage: `url('${src}')` },
              }),
            ),
          )
        : null;

    return h(
      "div",
      { className: "page-section single-car-page" },

      // ── Hero ─────────────────────────────────────────────────
      h(
        "div",
        { className: "sc-hero" },

        // Gallery
        h(
          "div",
          { className: "sc-gallery-panel" },
          h(
            "div",
            { className: "sc-gallery-stage" },

            // Track (clips the strip)
            h("div", { className: "sc-track" }, filmstrip),

            // Type badge
            h(
              "div",
              { className: "sc-badge-wrap" },
              h("span", { className: "sc-type-badge" }, car.type),
            ),

            // Prev / Next arrows
            total > 1
              ? h(
                  "div",
                  { className: "sc-arrows" },
                  h(
                    "button",
                    {
                      className: "sc-arrow",
                      onClick: () => goTo(safeIndex - 1),
                      "aria-label": "Previous image",
                    },
                    h("span", { className: "sc-arrow-icon" }, "‹"),
                  ),
                  h(
                    "button",
                    {
                      className: "sc-arrow",
                      onClick: () => goTo(safeIndex + 1),
                      "aria-label": "Next image",
                    },
                    h("span", { className: "sc-arrow-icon" }, "›"),
                  ),
                )
              : null,

            // Dot indicators
            dots,
          ),

          // Thumbnails
          thumbs,
        ),

        // Details
        h(
          "div",
          { className: "sc-details" },

          // Header
          h(
            "div",
            { className: "sc-details-head" },
            h("p", { className: "sc-manufacturer" }, car.manufacturer),
            h("h1", { className: "sc-car-name" }, car.name),
            h(
              "p",
              { className: "sc-car-meta" },
              `${car.year} · ${car.country}`,
            ),
          ),

          // Price
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

          h("hr", { className: "sc-rule" }),

          // Spec grid
          h(
            "div",
            { className: "sc-specs-grid" },
            h(
              "div",
              { className: "sc-spec" },
              h("span", { className: "sc-spec-label" }, "Type"),
              h("span", { className: "sc-spec-value" }, car.type),
            ),
            h(
              "div",
              { className: "sc-spec" },
              h("span", { className: "sc-spec-label" }, "Year"),
              h("span", { className: "sc-spec-value" }, String(car.year)),
            ),
            h(
              "div",
              { className: "sc-spec" },
              h("span", { className: "sc-spec-label" }, "Origin"),
              h("span", { className: "sc-spec-value" }, car.country),
            ),
            h(
              "div",
              { className: "sc-spec" },
              h("span", { className: "sc-spec-label" }, "Brand"),
              h("span", { className: "sc-spec-value" }, car.manufacturer),
            ),
          ),

          // Tags
          tags.length > 0
            ? h(
                "div",
                { className: "sc-tags" },
                ...tags.map((tag) =>
                  h("span", { className: "sc-tag", key: tag }, tag),
                ),
              )
            : null,

          // Description
          h("p", { className: "sc-description" }, car.description),

          // CTA row
          h(
            "div",
            { className: "sc-actions" },
            h(
              "button",
              {
                className: `sc-btn-primary${wishlisted ? " sc-btn-primary--saved" : ""}`,
                onClick: () => void this.toggleWishlist(car),
              },
              wishlisted ? "Saved to Wishlist ✓" : "Add to Wishlist",
            ),
            h(
              "button",
              {
                className: "sc-btn-ghost",
                onClick: () => navigate("/browse"),
              },
              "← Back to Browse",
            ),
          ),
        ),
      ),

      // ── Feature cards ─────────────────────────────────────────
      h(
        "section",
        { className: "sc-features" },
        h(
          "div",
          { className: "sc-feat-card" },
          h("div", { className: "sc-feat-icon" }, "◈"),
          h("h3", null, "Design Focus"),
          h(
            "p",
            null,
            "Every surface is tuned for speed and stability while preserving a distinctive silhouette.",
          ),
        ),
        h(
          "div",
          { className: "sc-feat-card" },
          h("div", { className: "sc-feat-icon" }, "◎"),
          h("h3", null, "Driver Feel"),
          h(
            "p",
            null,
            "Calibrated steering and a balanced chassis keep this car composed on long drives.",
          ),
        ),
        h(
          "div",
          { className: "sc-feat-card" },
          h("div", { className: "sc-feat-icon" }, "◻"),
          h("h3", null, "Ownership"),
          h(
            "p",
            null,
            "Save this car to your wishlist and compare it with similar builds later.",
          ),
        ),
      ),
    );
  }
}
