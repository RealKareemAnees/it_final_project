/**
 * Wishlist Page JS
 */

function renderWishlist() {
  const container = document.getElementById("wishlist-grid");
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="page-note">
        <p>Your wishlist is empty.</p>
        <a href="browse.html" class="primary-button" style="display: inline-block; margin-top: 20px;">Browse Cars</a>
      </div>
    `;
    return;
  }

  const savedCars = MOCK_CARS.filter((car) =>
    wishlist.includes(String(car.localID)),
  );

  container.innerHTML = savedCars
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

function removeFromWishlist(e, id) {
  e.stopPropagation();
  toggleWishlist(id);
  renderWishlist();
}

document.addEventListener("DOMContentLoaded", renderWishlist);
