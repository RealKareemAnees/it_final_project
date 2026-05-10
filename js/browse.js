/**
 * Browse Page JS
 */

// Reads the active filter values from the current URL query string.
function getFiltersFromUrl() {
  // Parse the query parameters so the browse page can restore its filtered state.
  const params = new URLSearchParams(window.location.search);
  return {
    country: params.get("country") || "",
    type: params.get("type") || "",
    brand: params.get("brand") || "",
    tag: params.get("tag") || "",
  };
}

// Updates one filter key in the URL and then redraws the page state.
function updateUrl(key, value) {
  // Start with the current query string and change only the selected filter.
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(key, value);
  else params.delete(key);
  // Push the updated query string without a full page reload.
  const newUrl =
    window.location.pathname +
    (params.toString() ? "?" + params.toString() : "");
  window.history.pushState({}, "", newUrl);
  // Re-render the filters and car list to match the updated URL state.
  renderBrowse();
}

// Builds the filter sidebar and active filter chips.
function renderFilters() {
  // Find the filter container that receives the generated markup.
  const container = document.getElementById("filters-container");
  // Read the current filter values so the UI can highlight them.
  const filters = getFiltersFromUrl();

  // Build distinct filter option lists from the loaded catalog.
  const options = {
    countries: [...new Set(MOCK_CARS.map((c) => c.country))].sort(),
    types: [...new Set(MOCK_CARS.map((c) => c.type))].sort(),
    brands: [...new Set(MOCK_CARS.map((c) => c.manufacturer))].sort(),
  };

  // Define the sections that will appear in the sidebar.
  const sections = [
    { label: "Country", key: "country", items: options.countries },
    { label: "Type", key: "type", items: options.types },
    { label: "Brand", key: "brand", items: options.brands },
  ];

  // Render the filter groups and their pill buttons.
  container.innerHTML = sections
    .map(
      (sec) => `
    <div class="filter-group">
        <h3>${sec.label}</h3>
        <div class="filter-options">
            <button class="filter-pill ${!filters[sec.key] ? "is-active" : ""}" onclick="updateUrl('${sec.key}', '')">All</button>
            ${sec.items
              .map(
                (item) => `
                <button class="filter-pill ${filters[sec.key] === item ? "is-active" : ""}" onclick="updateUrl('${sec.key}', '${item}')">${item}</button>
            `,
              )
              .join("")}
        </div>
    </div>
  `,
    )
    .join("");

  // Render active chips in toolbar
  // Show the active filters in a compact toolbar representation.
  const activeContainer = document.getElementById("active-filters");
  // Keep only filters that currently have a value.
  const activeChips = Object.entries(filters).filter(([k, v]) => v);
  activeContainer.innerHTML =
    activeChips
      .map(
        ([k, v]) => `
    <button class="filter-chip" onclick="updateUrl('${k}', '')">${v} ✕</button>
  `,
      )
      .join("") || '<span class="filter-empty">No filters applied</span>';
}

// Filters the car catalog and renders the matching cards into the grid.
function renderCarGrid() {
  // Find the grid container that holds the cards.
  const grid = document.getElementById("car-grid");
  const filters = getFiltersFromUrl();
  const wishlist = getWishlist();

  // Apply each filter against the shared catalog.
  const filteredCars = MOCK_CARS.filter((car) => {
    if (filters.country && car.country !== filters.country) return false;
    if (filters.type && car.type !== filters.type) return false;
    if (filters.brand && car.manufacturer !== filters.brand) return false;
    if (filters.tag && !car.tags.includes(filters.tag)) return false;
    return true;
  });

  // Update the result count text so the user sees how many cars matched.
  document.getElementById("results-count").textContent =
    `${filteredCars.length} cars`;

  // Render each matching car as a product card.
  grid.innerHTML =
    filteredCars
      .map(
        (car) => `
    <article class="car-card">
        <button class="car-card__media" onclick="window.location.href='car.html?id=${car.localID}'">
            <img src="${car.images[0]}" alt="${car.name}" loading="lazy" />
            <span class="car-card__badge">${car.type}</span>
        </button>
        <div class="car-card__body">
            <div class="car-card__meta">
                <span>${car.manufacturer}</span>
                <span>${car.year}</span>
            </div>
            <h3 class="car-card__title">${car.name}</h3>
            <p class="car-card__subtitle">${car.country} · ${car.type}</p>
            <div class="car-card__tags">
                ${car.tags
                  .slice(0, 3)
                  .map((tag) => `<span class="car-tag">${tag}</span>`)
                  .join("")}
            </div>
            <div class="car-card__footer">
                <span class="car-card__price">$${car.price.toLocaleString()}</span>
                <button class="car-action" onclick="toggleAndRefresh(event, ${car.localID})">
                    ${wishlist.includes(String(car.localID)) ? "Saved ✓" : "Wishlist"}
                </button>
            </div>
        </div>
    </article>
  `,
      )
      .join("") || '<p class="page-note">No cars found.</p>';
}

// Handles wishlist clicks, stops card navigation, and refreshes the view.
function toggleAndRefresh(e, id) {
  // Prevent the button click from bubbling to the parent card link.
  e.stopPropagation();
  // Toggle the item in the saved list using the shared helper.
  toggleWishlist(id);
  // Redraw the page so the button state updates immediately.
  renderBrowse();
}



// Rebuilds the browse page from the current URL and data state.
function renderBrowse() {
  // Render the sidebar first so the controls match the URL.
  renderFilters();
  // Render the main results grid after the filter state is known.
  renderCarGrid();
}

// Initialize the browse page once the DOM is available.
document.addEventListener("DOMContentLoaded", renderBrowse);
// Re-render when the user navigates browser history so URL filters stay in sync.
window.onpopstate = renderBrowse;
