/**
 * Browse Page JS
 */

function getFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return {
    country: params.get("country") || "",
    type: params.get("type") || "",
    brand: params.get("brand") || "",
    tag: params.get("tag") || ""
  };
}

function updateUrl(key, value) {
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(key, value);
  else params.delete(key);
  const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
  window.history.pushState({}, '', newUrl);
  renderBrowse();
}

function renderFilters() {
  const container = document.getElementById('filters-container');
  const filters = getFiltersFromUrl();
  
  const options = {
    countries: [...new Set(MOCK_CARS.map(c => c.country))].sort(),
    types: [...new Set(MOCK_CARS.map(c => c.type))].sort(),
    brands: [...new Set(MOCK_CARS.map(c => c.manufacturer))].sort()
  };

  const sections = [
    { label: 'Country', key: 'country', items: options.countries },
    { label: 'Type', key: 'type', items: options.types },
    { label: 'Brand', key: 'brand', items: options.brands }
  ];

  container.innerHTML = sections.map(sec => `
    <div class="filter-group">
        <h3>${sec.label}</h3>
        <div class="filter-options">
            <button class="filter-pill ${!filters[sec.key] ? 'is-active' : ''}" onclick="updateUrl('${sec.key}', '')">All</button>
            ${sec.items.map(item => `
                <button class="filter-pill ${filters[sec.key] === item ? 'is-active' : ''}" onclick="updateUrl('${sec.key}', '${item}')">${item}</button>
            `).join('')}
        </div>
    </div>
  `).join('');
  
  // Render active chips in toolbar
  const activeContainer = document.getElementById('active-filters');
  const activeChips = Object.entries(filters).filter(([k, v]) => v);
  activeContainer.innerHTML = activeChips.map(([k, v]) => `
    <button class="filter-chip" onclick="updateUrl('${k}', '')">${v} ✕</button>
  `).join('') || '<span class="filter-empty">No filters applied</span>';
}

function renderCarGrid() {
  const grid = document.getElementById('car-grid');
  const filters = getFiltersFromUrl();
  const wishlist = getWishlist();

  const filteredCars = MOCK_CARS.filter(car => {
    if (filters.country && car.country !== filters.country) return false;
    if (filters.type && car.type !== filters.type) return false;
    if (filters.brand && car.manufacturer !== filters.brand) return false;
    if (filters.tag && !car.tags.includes(filters.tag)) return false;
    return true;
  });

  document.getElementById('results-count').textContent = `${filteredCars.length} cars`;

  grid.innerHTML = filteredCars.map(car => `
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
                ${car.tags.slice(0, 3).map(tag => `<span class="car-tag">${tag}</span>`).join('')}
            </div>
            <div class="car-card__footer">
                <span class="car-card__price">$${car.price.toLocaleString()}</span>
                <button class="car-action" onclick="toggleAndRefresh(event, ${car.localID})">
                    ${wishlist.includes(String(car.localID)) ? 'Saved ✓' : 'Wishlist'}
                </button>
            </div>
        </div>
    </article>
  `).join('') || '<p class="page-note">No cars found.</p>';
}

function toggleAndRefresh(e, id) {
  e.stopPropagation();
  toggleWishlist(id);
  renderBrowse();
}

function renderBrowse() {
  renderFilters();
  renderCarGrid();
}

document.addEventListener('DOMContentLoaded', renderBrowse);
window.onpopstate = renderBrowse;
