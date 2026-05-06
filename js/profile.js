/**
 * Profile Page JS
 */

function renderProfile() {
  const user = getUser();
  if (!user) {
    window.location.href = 'auth.html';
    return;
  }

  document.getElementById('profile-name').textContent = user.username;
  document.getElementById('profile-initials').textContent = user.username.charAt(0).toUpperCase();
  document.getElementById('profile-role').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  const wishlist = getWishlist();
  document.getElementById('wishlist-count').textContent = wishlist.length;

  const grid = document.getElementById('profile-wishlist-grid');
  const wishlistedCars = MOCK_CARS.filter(car => wishlist.includes(String(car.localID)));

  if (wishlistedCars.length === 0) {
    grid.innerHTML = '<p class="page-note">Your wishlist is empty. Start exploring!</p>';
    return;
  }

  grid.innerHTML = wishlistedCars.map(car => `
    <article class="car-card">
        <div class="car-card__media" onclick="window.location.href='car.html?id=${car.localID}'">
            <img src="${car.images[0]}" alt="${car.name}" />
        </div>
        <div class="car-card__body">
            <h3 class="car-card__title">${car.name}</h3>
            <div class="car-card__footer">
                <span class="car-card__price">$${car.price.toLocaleString()}</span>
                <button class="car-action" onclick="removeFromProfile(event, ${car.localID})">Remove</button>
            </div>
        </div>
    </article>
  `).join('');
}

function removeFromProfile(e, id) {
  e.stopPropagation();
  toggleWishlist(id);
  renderProfile();
}

document.addEventListener('DOMContentLoaded', renderProfile);
