import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import type { Car } from "../../types/car.interface";
import type { UserInfo } from "../../types/userInfo.interface";
import { apiFetch } from "../../utils/api.utils";
import { addToWishlist, removeFromWishlist } from "../../utils/auth.utils";
import { navigate } from "../../utils/routing.utils";
import { getCarById } from "../../data/cars.data";

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
      const fallback = getCarById(Number(id));
      if (fallback) {
        this.setState({ car: fallback, loading: false, selectedIndex: 0 });
        return;
      }
      const message =
        error instanceof Error ? error.message : "Failed to load car.";
      this.setState({ error: message, loading: false });
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

  render(): VNode {
    const { car, loading, error, selectedIndex } = this.state;

    if (loading) {
      return h("div", { className: "page-section" }, "Loading car...");
    }

    if (error || !car) {
      return h(
        "div",
        { className: "page-section" },
        h("h2", null, "Car not found"),
        h("p", null, error || "We could not load this car."),
      );
    }

    const activeImage = car.images?.[selectedIndex] || car.images?.[0];

    return h(
      "div",
      { className: "page-section single-car-page" },
      h(
        "div",
        { className: "single-car-hero" },
        h(
          "div",
          { className: "single-car-gallery" },
          h(
            "div",
            { className: "single-car-main" },
            h("img", {
              src: activeImage || "/assets/images/slide-1-images/audi.avif",
              alt: car.name,
            }),
            h(
              "div",
              { className: "single-car-overlay" },
              h("span", { className: "detail-tag" }, car.type),
              h(
                "div",
                { className: "single-car-actions" },
                h(
                  "button",
                  {
                    className: "primary-button",
                    onClick: () => void this.toggleWishlist(car),
                  },
                  this.isWishlisted(car)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist",
                ),
                h(
                  "button",
                  {
                    className: "secondary-button",
                    onClick: () => navigate("/browse"),
                  },
                  "Back to Browse",
                ),
              ),
            ),
          ),
          h(
            "div",
            { className: "single-car-thumbs" },
            (car.images || []).map((image, index) =>
              h("button", {
                className: `thumb ${index === selectedIndex ? "active" : ""}`,
                key: `${car.localID}-${index}`,
                onClick: () => this.setState({ selectedIndex: index }),
                style: { backgroundImage: `url('${image}')` },
              }),
            ),
          ),
        ),
        h(
          "div",
          { className: "single-car-details" },
          h("h1", null, car.name),
          h(
            "p",
            { className: "detail-sub" },
            `${car.manufacturer} · ${car.year} · ${car.country}`,
          ),
          h(
            "div",
            { className: "detail-price" },
            h("span", null, "From"),
            h("strong", null, `$${car.price.toLocaleString()}`),
          ),
          h(
            "div",
            { className: "detail-grid" },
            h("div", null, h("span", "Type"), h("strong", car.type)),
            h("div", null, h("span", "Year"), h("strong", String(car.year))),
            h("div", null, h("span", "Country"), h("strong", car.country)),
            h("div", null, h("span", "Brand"), h("strong", car.manufacturer)),
          ),
          h(
            "div",
            { className: "detail-tags" },
            car.tags.map((tag) =>
              h("span", { className: "car-tag", key: tag }, tag),
            ),
          ),
          h("p", { className: "detail-description" }, car.description),
        ),
      ),
      h(
        "section",
        { className: "single-car-specs" },
        h(
          "div",
          { className: "spec-card" },
          h("h3", null, "Design focus"),
          h(
            "p",
            null,
            "Every surface is tuned for speed and stability while preserving a distinctive silhouette.",
          ),
        ),
        h(
          "div",
          { className: "spec-card" },
          h("h3", null, "Driver feel"),
          h(
            "p",
            null,
            "Calibrated steering and a balanced chassis keep this car composed on long drives.",
          ),
        ),
        h(
          "div",
          { className: "spec-card" },
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
