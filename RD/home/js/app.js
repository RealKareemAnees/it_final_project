/* ── MAIN INITIALIZATION ───────────────────────────────────────────── */

import { initCarousel } from "./carousel.js";
import { initHeader } from "../components/header/header.js";
import { initSearchBar } from "../components/search-bar/search-bar.js";
import { initFooter } from "../components/footer/footer.js";

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.allSettled([initHeader(), initSearchBar(), initFooter()]);
  initCarousel();
});
