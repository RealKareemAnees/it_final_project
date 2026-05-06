/**
 * Profile Page JS
 */

// Loads the signed-in user's profile details and wishlist cards.
function renderProfile() {
  // Read the current user from shared storage.
  const user = getUser();
  if (!user) {
    // Unauthenticated visitors are redirected to the auth page.
    window.location.href = "auth.html";
    return;
  }

  // Fill in the profile header with the stored username.
  document.getElementById("profile-name").textContent = user.username;
  // Derive a one-letter avatar from the username.
  document.getElementById("profile-initials").textContent = user.username
    .charAt(0)
    .toUpperCase();
  // Format the role label for display in the profile header.
  document.getElementById("profile-role").textContent =
    user.role.charAt(0).toUpperCase() + user.role.slice(1);

  // Read the shared wishlist so the saved count and grid can stay in sync.
  const wishlist = getWishlist();
  document.getElementById("wishlist-count").textContent = wishlist.length;

  // Find the container that displays the saved car cards.
  const grid = document.getElementById("profile-wishlist-grid");
  // Filter the shared catalog down to the cars saved by this user.
  const wishlistedCars = MOCK_CARS.filter((car) =>
    wishlist.includes(String(car.localID)),
  );

  if (wishlistedCars.length === 0) {
    // Show an empty-state message when there are no saved cars yet.
    grid.innerHTML =
      '<p class="page-note">Your wishlist is empty. Start exploring!</p>';
    return;
  }

  // Render each saved car as a card with a remove action.
  grid.innerHTML = wishlistedCars
    .map(
      (car) => `
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
  `,
    )
    .join("");
}

// Removes a saved car from the wishlist and refreshes the profile view.
function removeFromProfile(e, id) {
  // Prevent the click from also triggering the parent card navigation.
  e.stopPropagation();
  // Toggle the car out of the shared wishlist state.
  toggleWishlist(id);
  // Re-render so the card disappears and the count updates.
  renderProfile();
}

// Initialize the profile page after the DOM is ready.
document.addEventListener("DOMContentLoaded", renderProfile);
