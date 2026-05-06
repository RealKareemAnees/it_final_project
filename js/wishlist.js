/**
 * Wishlist Page JS
 */

// Reads the saved wishlist and renders the corresponding car cards.
function renderWishlist() {
  // Pull the current saved car IDs from shared storage.
  const wishlist = getWishlist();
  // Locate the grid container that will hold the wishlist cards.
  const grid = document.getElementById("wishlist-grid");

  // Reduce the full catalog down to only the wishlisted vehicles.
  const wishlistedCars = MOCK_CARS.filter((car) =>
    wishlist.includes(String(car.localID)),
  );

  if (wishlistedCars.length === 0) {
    // Render an empty state when the wishlist has no cars.
    grid.innerHTML = `
      <div class="page-empty-state">
          <p>No cars in your wishlist yet.</p>
          <a href="browse.html" class="primary-button">Start Browsing</a>
      </div>
    `;
    return;
  }

  // Render each saved car and attach a remove action.
  grid.innerHTML = wishlistedCars
    .map(
      (car) => `
    <article class="car-card">
        <div class="car-card__media" onclick="window.location.href='car.html?id=${car.localID}'">
            <img src="${car.images[0]}" alt="${car.name}" />
            <span class="car-card__badge">${car.type}</span>
        </div>
        <div class="car-card__body">
            <div class="car-card__meta">
                <span>${car.manufacturer}</span>
                <span>${car.year}</span>
            </div>
            <h3 class="car-card__title">${car.name}</h3>
            <div class="car-card__footer">
                <span class="car-card__price">$${car.price.toLocaleString()}</span>
                <button class="car-action" onclick="removeFromWishlist(event, ${car.localID})">Remove</button>
            </div>
        </div>
    </article>
  `,
    )
    .join("");
}

// Removes a car from the wishlist and refreshes the page state.
function removeFromWishlist(e, id) {
  // Prevent the click from bubbling up to the clickable card area.
  e.stopPropagation();
  // Toggle the car out of the saved wishlist list.
  toggleWishlist(id);
  // Redraw the wishlist so the removed item disappears immediately.
  renderWishlist();
}

// Render the wishlist once the page DOM is available.
document.addEventListener("DOMContentLoaded", renderWishlist);
