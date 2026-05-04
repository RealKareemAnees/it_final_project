import { Component, h } from "../K-engine";
import type { VNode } from "../K-engine/types";
import { navigate } from "../utils/routing.utils";

export class Footer extends Component {
  render(): VNode {
    const footerLinkStyle = {
      color: "#666",
      textDecoration: "none",
      cursor: "pointer",
      margin: "0 15px",
      fontSize: "14px",
    };

    return h(
      "footer",
      {
        style: {
          padding: "20px",
          background: "#f0f0f0",
          marginTop: "20px",
          borderTop: "1px solid #ddd",
        },
      },
      h(
        "div",
        { style: { textAlign: "center", marginBottom: "15px" } },
        h(
          "a",
          {
            onClick: () => navigate("/"),
            style: { ...footerLinkStyle, cursor: "pointer" },
          },
          "Home",
        ),
        h(
          "a",
          {
            onClick: () => navigate("/browse"),
            style: { ...footerLinkStyle, cursor: "pointer" },
          },
          "Browse",
        ),
        h(
          "a",
          {
            onClick: () => navigate("/about"),
            style: { ...footerLinkStyle, cursor: "pointer" },
          },
          "About",
        ),
        h(
          "a",
          {
            onClick: () => navigate("/contact"),
            style: { ...footerLinkStyle, cursor: "pointer" },
          },
          "Contact",
        ),
      ),
      h(
        "p",
        {
          style: {
            textAlign: "center",
            margin: "10px 0",
            color: "#666",
            fontSize: "14px",
          },
        },
        `© 2026 Car Wiki. All rights reserved.`,
      ),
    );
  }
}
