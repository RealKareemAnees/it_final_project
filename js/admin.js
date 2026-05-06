/**
 * Admin Dashboard JS
 */

const MOCK_USERS = [
  { id: 1, name: 'kareem', email: 'kareem@example.com', role: 'admin' },
  { id: 2, name: 'john_doe', email: 'john@gmail.com', role: 'user' },
  { id: 3, name: 'jane_smith', email: 'jane@outlook.com', role: 'user' }
];

const MOCK_FEEDBACK = [
  { id: 1, user: 'john_doe', subject: 'Great site!', date: '2024-05-01' },
  { id: 2, user: 'jane_smith', subject: 'Add more Porche models', date: '2024-05-02' }
];

function initAdmin() {
  const user = getUser();
  if (!user || user.role !== 'admin') {
    window.location.href = 'index.html';
    return;
  }

  // Tabs
  const tabs = document.querySelectorAll('.admin-tab-btn');
  const panels = document.querySelectorAll('.admin-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `admin-${target}-panel`) p.classList.add('active');
      });
    });
  });

  renderAdminLists();
}

function renderAdminLists() {
  // Cars
  const carsList = document.getElementById('admin-cars-list');
  carsList.innerHTML = MOCK_CARS.map(car => `
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
  `).join('');

  // Users
  const usersList = document.getElementById('admin-users-list');
  usersList.innerHTML = MOCK_USERS.map(u => `
    <div class="admin-item">
        <div class="admin-item-info">
            <strong>${u.name}</strong>
            <span>${u.email}</span>
        </div>
        <div class="admin-item-actions">
            <span class="admin-badge">${u.role}</span>
        </div>
    </div>
  `).join('');

  // Feedback
  const feedbackList = document.getElementById('admin-feedback-list');
  feedbackList.innerHTML = MOCK_FEEDBACK.map(f => `
    <div class="admin-item">
        <div class="admin-item-info">
            <strong>${f.subject}</strong>
            <span>From ${f.user} on ${f.date}</span>
        </div>
        <div class="admin-item-actions">
            <button class="ghost-button" onclick="alert('Viewing feedback...')">View</button>
        </div>
    </div>
  `).join('');
}

function openEditModal(carId) {
  const car = MOCK_CARS.find(c => c.localID === carId);
  if (!car) return;

  document.getElementById('edit-car-id').value = car.localID;
  document.getElementById('edit-car-name').value = car.name;
  document.getElementById('edit-car-manufacturer').value = car.manufacturer;
  document.getElementById('edit-car-year').value = car.year;
  document.getElementById('edit-car-price').value = car.price;

  document.getElementById('edit-car-modal').style.display = 'flex';
}

function closeEditModal() {
  document.getElementById('edit-car-modal').style.display = 'none';
}

document.getElementById('edit-car-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById('edit-car-id').value, 10);
  const name = document.getElementById('edit-car-name').value;
  const manufacturer = document.getElementById('edit-car-manufacturer').value;
  const year = parseInt(document.getElementById('edit-car-year').value, 10);
  const price = parseInt(document.getElementById('edit-car-price').value, 10);

  const carIndex = MOCK_CARS.findIndex(c => c.localID === id);
  if (carIndex !== -1) {
    MOCK_CARS[carIndex] = {
      ...MOCK_CARS[carIndex],
      name,
      manufacturer,
      year,
      price
    };
    localStorage.setItem('cars', JSON.stringify(MOCK_CARS));
    renderAdminLists();
    closeEditModal();
  }
});

document.addEventListener('DOMContentLoaded', initAdmin);
