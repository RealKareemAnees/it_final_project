import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import type { UserInfo } from "../../types/userInfo.interface";
import type { Car } from "../../types/car.interface";
import { apiFetch } from "../../utils/api.utils";
import { navigate } from "../../utils/routing.utils";
import { removeFromWishlist } from "../../utils/auth.utils";

interface ProfileProps {
  user: UserInfo | null;
}

interface ProfileState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

export class ProfilePage extends Component<ProfileProps, ProfileState> {
  initState(): ProfileState {
    return { cars: [], loading: true, error: null };
  }

  componentDidMount(): void {
    document.title = "Profile - Bergo";
    void this.loadWishlist();
  }

  private async loadWishlist(): Promise<void> {
    try {
      const data = await apiFetch<{ cars: Car[] }>("/api/cars/all");
      const wishList = this.props.user?.wishList || [];
      const filtered = data.cars.filter((car) =>
        wishList.includes(String(car.localID)),
      );
      this.setState({ cars: filtered, loading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load wishlist.";
      this.setState({
        cars: [],
        error: message,
        loading: false,
      });
    }
  }

  private async handleRemove(car: Car): Promise<void> {
    await removeFromWishlist(car.localID);
    await this.loadWishlist();
  }

  render(): VNode {
    const { user } = this.props;
    const { cars, loading, error } = this.state;

    if (!user?.username) {
      return h(
        "div",
        { className: "page-section" },
        h("p", null, "Please log in to view your profile."),
      );
    }

    return h(
      "div",
      { className: "page-section profile-page" },
      h(
        "div",
        { className: "profile-hero" },
        h(
          "div",
          { className: "profile-intro" },
          h("span", { className: "page-eyebrow" }, "Profile"),
          h("h1", null, user.username),
          h("p", null, user.role === "admin" ? "Administrator" : "Member"),
        ),
        h(
          "div",
          { className: "profile-stats" },
          h(
            "div",
            { className: "stat-card" },
            h("span", null, "Wishlist"),
            h("strong", null, String(cars.length)),
          ),
          h(
            "div",
            { className: "stat-card" },
            h("span", null, "Theme"),
            h("strong", null, user.theme || "light"),
          ),
        ),
      ),
      h(
        "section",
        { className: "profile-panel" },
        h("h2", null, "Account"),
        h(
          "div",
          { className: "profile-details" },
          h(
            "div",
            { className: "detail-row" },
            h("span", null, "Role"),
            h("strong", null, user.role),
          ),
          h(
            "div",
            { className: "detail-row" },
            h("span", null, "Theme"),
            h("strong", null, user.theme),
          ),
          h(
            "div",
            { className: "detail-row" },
            h("span", null, "Saved cars"),
            h("strong", null, String(cars.length)),
          ),
        ),
      ),
      h(
        "section",
        { className: "profile-section" },
        h(
          "div",
          { className: "section-header" },
          h("h2", null, "Wishlist"),
          h("p", null, "Cars you have saved for later."),
        ),
        loading
          ? h("p", { className: "page-note" }, "Loading wishlist...")
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
                h(
                  "div",
                  { className: "car-card__tags" },
                  car.tags
                    .slice(0, 3)
                    .map((tag) =>
                      h("span", { className: "car-tag", key: tag }, tag),
                    ),
                ),
                h(
                  "button",
                  {
                    className: "car-action",
                    onClick: () => void this.handleRemove(car),
                  },
                  "Remove",
                ),
              ),
            ),
          ),
        ),
        !loading && !cars.length
          ? h("p", { className: "page-note" }, "No cars saved yet.")
          : null,
      ),
    );
  }
}
