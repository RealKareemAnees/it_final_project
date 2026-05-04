import { Component, h } from "../K-engine";
import type { VNode, Props } from "../K-engine/types";
import { navigate } from "../utils/routing.utils";

export class NavBar extends Component {
  render(): VNode {
    const buttonStyle = {
      background: "none",
      color: "white",
      border: "none",
      cursor: "pointer",
      padding: "5px 10px",
    };

    return h(
      "nav",
      {
        className: "navbar",
        style: {
          padding: "10px",
          background: "#333",
          color: "white",
          marginBottom: "20px",
        },
      },
      h(
        "div",
        {
          style: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
          },
        },
        h("h2", null, "Car Wiki"),
        h(
          "button",
          { onClick: () => navigate("/"), style: buttonStyle },
          "Home",
        ),
        h(
          "button",
          { onClick: () => navigate("/browse"), style: buttonStyle },
          "Browse",
        ),
        h(
          "button",
          { onClick: () => navigate("/about"), style: buttonStyle },
          "About",
        ),
        h(
          "button",
          { onClick: () => navigate("/contact"), style: buttonStyle },
          "Contact",
        ),
        h(
          "button",
          { onClick: () => navigate("/wishlist"), style: buttonStyle },
          "Wishlist",
        ),
        h(
          "button",
          { onClick: () => navigate("/profile"), style: buttonStyle },
          "Profile",
        ),
        h(
          "button",
          { onClick: () => navigate("/admin"), style: buttonStyle },
          "Admin",
        ),
        h(
          "button",
          { onClick: () => navigate("/auth"), style: buttonStyle },
          "Auth",
        ),
      ),
    );
  }
}
