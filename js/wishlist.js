/**
 * Wishlist Page JS
 */

function renderWishlist() {
  const wishlist = getWishlist();
  const grid = document.getElementById('wishlist-grid');
  
  const wishlistedCars = MOCK_CARS.filter(car => wishlist.includes(String(car.localID)));

  if (wishlistedCars.length === 0) {
    grid.innerHTML = `
      <div class="page-empty-state">
          <p>No cars in your wishlist yet.</p>
          <a href="browse.html" class="primary-button">Start Browsing</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = wishlistedCars.map(car => `
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
  `).join('');
}

function removeFromWishlist(e, id) {
  e.stopPropagation();
  toggleWishlist(id);
  renderWishlist();
}

document.addEventListener('DOMContentLoaded', renderWishlist);
