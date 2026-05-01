import { render, h } from "./K-engine";
import { App } from "./App";

// Find or create root container
let container = document.getElementById("app");
if (!container) {
  container = document.createElement("div");
  container.id = "app";
  document.body.appendChild(container);
}

// Render the App component
render(h(App, null), container);
