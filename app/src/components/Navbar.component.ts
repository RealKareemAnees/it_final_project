import { Component, h } from "../K-engine";
import type { VNode, Props } from "../K-engine/types";
import { navigate } from "../utils/routing.utils";

export class NavBar extends Component {
  render(): VNode {
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
        { style: { display: "flex", gap: "20px" } },
        h("h2", null, "My App"),
        h(
          "button",
          {
            onClick: () => navigate("/"),
            style: {
              background: "none",
              color: "white",
              border: "none",
              cursor: "pointer",
            },
          },
          "Home",
        ),
        h(
          "button",
          {
            onClick: () => navigate("/about"),
            style: {
              background: "none",
              color: "white",
              border: "none",
              cursor: "pointer",
            },
          },
          "About",
        ),
        h(
          "button",
          {
            onClick: () => navigate("/auth"),
            style: {
              background: "none",
              color: "white",
              border: "none",
              cursor: "pointer",
            },
          },
          "Auth",
        ),
      ),
    );
  }
}
