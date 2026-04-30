/* ── MAIN INITIALIZATION ───────────────────────────────────────────── */

import { initCarousel } from "./carousel.js";
import { initHeader } from "./header.js";

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCarousel();
});
