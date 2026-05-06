/**
 * Admin Dashboard JS
 */

const MOCK_USERS = [
  { id: 1, name: "kareem", email: "kareem@example.com", role: "admin" },
  { id: 2, name: "john_doe", email: "john@gmail.com", role: "user" },
  { id: 3, name: "jane_smith", email: "jane@outlook.com", role: "user" },
];

const MOCK_FEEDBACK = [
  { id: 1, user: "john_doe", subject: "Great site!", date: "2024-05-01" },
  {
    id: 2,
    user: "jane_smith",
    subject: "Add more Porche models",
    date: "2024-05-02",
  },
];

// Guards the dashboard, wires the tab UI, and renders the data lists.
function initAdmin() {
  // Read the current signed-in user from shared storage.
  const user = getUser();
  // Non-admin users are redirected away from the dashboard.
  if (!user || user.role !== "admin") {
    window.location.href = "index.html";
    return;
  }

  // Update cars count
  // Surface the total number of cars in the summary tile.
  document.getElementById("cars-count").textContent = MOCK_CARS.length;

  // Tabs
  // Collect the navigation tabs and the content panels they control.
  const tabs = document.querySelectorAll(".admin-tab-btn");
  const panels = document.querySelectorAll(".admin-panel");

  tabs.forEach((tab) => {
    // Clicking a tab changes the visible admin panel.
    tab.addEventListener("click", () => {
      // The data-target attribute decides which panel should become active.
      const target = tab.dataset.target;
      // Clear the active state from every tab before activating the clicked one.
      tabs.forEach((t) => t.classList.remove("is-active"));
      // Mark the clicked tab as active.
      tab.classList.add("is-active");

      // Hide all panels, then reveal the one whose id matches the selected target.
      panels.forEach((p) => {
        p.classList.remove("active");
        if (p.id === `admin-${target}-panel`) p.classList.add("active");
      });
    });
  });

  renderAdminLists();
}

// Renders the cars, users, and feedback lists inside the dashboard panels.
function renderAdminLists() {
  // Cars
  // Locate the cars list container where the markup will be injected.
  const carsList = document.getElementById("admin-cars-list");
  // Convert each car object into a dashboard row with edit and delete controls.
  carsList.innerHTML = MOCK_CARS.map(
    (car) => `
    <div class="admin-item">
        <div class="admin-item-info">
            <strong>${car.name}</strong>
            <span>${car.manufacturer} · ${car.year}</span>
        </div>
        <div class="admin-item-actions">
            <button class="ghost-button" onclick="openEditModal(${car.localID})">Edit</button>
            <button class="ghost-button" onclick="alert('Delete logic not in static demo')">Delete</button>
        </div>
    </div>
  `,
  ).join("");

  // Users
  // Locate the users list container and render the mock accounts.
  const usersList = document.getElementById("admin-users-list");
  usersList.innerHTML = MOCK_USERS.map(
    (u) => `
    <div class="admin-item">
        <div class="admin-item-info">
            <strong>${u.name}</strong>
            <span>${u.email}</span>
        </div>
        <div class="admin-item-actions">
            <span class="admin-badge">${u.role}</span>
        </div>
    </div>
  `,
  ).join("");

  // Feedback
  // Locate the feedback list container and render the review messages.
  const feedbackList = document.getElementById("admin-feedback-list");
  feedbackList.innerHTML = MOCK_FEEDBACK.map(
    (f) => `
    <div class="admin-item">
        <div class="admin-item-info">
            <strong>${f.subject}</strong>
            <span>From ${f.user} on ${f.date}</span>
        </div>
        <div class="admin-item-actions">
            <button class="ghost-button" onclick="alert('Viewing feedback...')">View</button>
        </div>
    </div>
  `,
  ).join("");
}

// Finds a car by id and pushes its values into the edit modal inputs.
function openEditModal(carId) {
  // Search the shared car array for the requested record.
  const car = MOCK_CARS.find((c) => c.localID === carId);
  if (!car) return;

  // Populate the hidden id field so the submit handler knows which car to update.
  document.getElementById("edit-car-id").value = car.localID;
  // Copy the current car values into the edit form.
  document.getElementById("edit-car-name").value = car.name;
  document.getElementById("edit-car-manufacturer").value = car.manufacturer;
  document.getElementById("edit-car-year").value = car.year;
  document.getElementById("edit-car-price").value = car.price;

  // Show the modal by switching its display style to a flex overlay.
  document.getElementById("edit-car-modal").style.display = "flex";
}

// Hides the edit modal overlay.
function closeEditModal() {
  // Return the modal to a non-visible state.
  document.getElementById("edit-car-modal").style.display = "none";
}

// Handle save actions from the edit-car form when the modal is submitted.
document
  .getElementById("edit-car-form")
  ?.addEventListener("submit", function (e) {
    // Stop the browser from posting the form to a server.
    e.preventDefault();

    // Read each input value from the form so the car record can be updated.
    const id = parseInt(document.getElementById("edit-car-id").value, 10);
    const name = document.getElementById("edit-car-name").value;
    const manufacturer = document.getElementById("edit-car-manufacturer").value;
    const year = parseInt(document.getElementById("edit-car-year").value, 10);
    const price = parseInt(document.getElementById("edit-car-price").value, 10);

    // Find the existing car record in the shared array.
    const carIndex = MOCK_CARS.findIndex((c) => c.localID === id);
    if (carIndex !== -1) {
      // Replace the selected record while preserving its other properties.
      MOCK_CARS[carIndex] = {
        ...MOCK_CARS[carIndex],
        name,
        manufacturer,
        year,
        price,
      };
      // Persist the edited catalog in localStorage so the changes survive reloads.
      localStorage.setItem("cars", JSON.stringify(MOCK_CARS));
      // Re-render the dashboard lists so the updated values appear immediately.
      renderAdminLists();
      // Close the modal after a successful save.
      closeEditModal();
    }
  });

// Initialize the dashboard after the document finishes loading.
document.addEventListener("DOMContentLoaded", initAdmin);
