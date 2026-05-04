import { render, h } from "./K-engine";
import { App } from "./App";

import "../styles/global.css";
import "../styles/header.css";
import "../styles/hero.css";
import "../styles/sections.css";
import "../styles/browse-countries.css";
import "../styles/contact-footer.css";
import "../styles/search-bar.css";
import "../styles/footer.css";

// stup theme
import { applyThemeFromLocalStorage } from "./utils/theme.utils";
applyThemeFromLocalStorage();

// Find or create root container
let container = document.getElementById("app");
if (!container) {
  container = document.createElement("div");
  container.id = "app";
  document.body.appendChild(container);
}

// Render the App component
render(h(App, null), container);
