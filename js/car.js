/**
 * Single Car Page JS
 */

let currentCar = null;
let currentImageIndex = 0;
let is3DView = false;

function renderCarDetail() {
  const container = document.getElementById('car-detail-container');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  currentCar = MOCK_CARS.find(c => c.localID == id);
  
  if (!currentCar) {
    container.innerHTML = `
      <div class="page-section sc-page">
          <div class="sc-status-stage">
              <p class="sc-status-kicker">Not found</p>
              <h2 class="sc-status-title">Car unavailable</h2>
              <p class="sc-status-body">We could not load this vehicle.</p>
              <button class="sc-cta-primary" onclick="window.location.href='browse.html'">Back to browse</button>
          </div>
      </div>
    `;
    return;
  }

  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(String(currentCar.localID));

  container.innerHTML = `
    <div class="page-section sc-page">
        <div class="sc-topbar">
            <button class="sc-back-btn" onclick="window.location.href='browse.html'">
                <span class="sc-back-arrow">←</span> Browse
            </button>
            <div class="sc-topbar-breadcrumb">
                <span>${currentCar.manufacturer}</span>
                <span class="sc-topbar-sep">/</span>
                <span class="sc-topbar-model">${currentCar.name}</span>
            </div>
            ${currentCar.threeDfile ? `
            <div class="sc-view-toggle">
                <button class="sc-view-btn ${!is3DView ? 'active' : ''}" onclick="setView(false)">Gallery</button>
                <button class="sc-view-btn ${is3DView ? 'active' : ''}" onclick="setView(true)">3D</button>
            </div>
            ` : '<div></div>'}
        </div>

        <div class="sc-hero">
            <div class="sc-visual-col">
                <div class="sc-identity">
                    <div class="sc-tag-row">
                        ${currentCar.tags.slice(0, 3).map(tag => `<span class="sc-badge">${tag}</span>`).join('')}
                    </div>
                    <div class="sc-title-block">
                        <p class="sc-kicker">${currentCar.manufacturer}</p>
                        <h1 class="sc-car-title">${currentCar.name}</h1>
                    </div>
                </div>

                <div class="sc-stage ${is3DView ? 'sc-stage--3d' : ''}">
                    <div class="sc-track">
                        <div class="sc-strip" style="transform: translateX(-${currentImageIndex * 100}%); width: ${currentCar.images.length * 100}%">
                            ${currentCar.images.map(img => `<img src="${img}" class="sc-strip-img" />`).join('')}
                        </div>
                    </div>
                    
                    ${currentCar.threeDfile ? `
                    <div class="sc-3d-layer" style="display: ${is3DView ? 'block' : 'none'}">
                        <model-viewer class="sc-model" src="assets/3d/${currentCar.threeDfile}" camera-controls auto-rotate></model-viewer>
                    </div>
                    ` : ''}

                    <div class="sc-arrows">
                        <button class="sc-arrow" onclick="changeImage(-1)">‹</button>
                        <button class="sc-arrow" onclick="changeImage(1)">›</button>
                    </div>

                    <div class="sc-frame-counter">
                        <span>${String(currentImageIndex + 1).padStart(2, '0')}</span>
                        <span class="sc-frame-sep">/</span>
                        <span>${String(currentCar.images.length).padStart(2, '0')}</span>
                    </div>

                    <div class="sc-dots">
                        ${currentCar.images.map((_, i) => `
                            <button class="sc-dot ${i === currentImageIndex ? 'active' : ''}" onclick="goToImage(${i})"></button>
                        `).join('')}
                    </div>
                </div>

                <div class="sc-thumbstrip">
                    ${currentCar.images.map((img, i) => `
                        <button class="sc-thumb ${i === currentImageIndex ? 'active' : ''}" onclick="goToImage(${i})">
                            <img src="${img}" class="sc-thumb-img" />
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="sc-data-col">
                <div class="sc-price-block">
                    <span class="sc-price-label">Starting from</span>
                    <span class="sc-price">$${currentCar.price.toLocaleString()}</span>
                </div>
                <hr class="sc-rule" />
                <p class="sc-desc">${currentCar.description}</p>
                <hr class="sc-rule" />
                <div class="sc-stats-grid">
                    <div class="sc-stat">
                        <span class="sc-stat__value">${currentCar.year}</span>
                        <span class="sc-stat__label">Model year</span>
                    </div>
                    <div class="sc-stat">
                        <span class="sc-stat__value">${currentCar.type}</span>
                        <span class="sc-stat__label">Category</span>
                    </div>
                    <div class="sc-stat">
                        <span class="sc-stat__value">${currentCar.country}</span>
                        <span class="sc-stat__label">Origin</span>
                    </div>
                </div>
                <hr class="sc-rule" />
                <div class="sc-actions">
                    <button class="sc-cta-primary ${isWishlisted ? 'saved' : ''}" onclick="toggleWishAndRender()">
                        ${isWishlisted ? 'Saved ✓' : 'Save to Wishlist'}
                    </button>
                    <button class="sc-cta-ghost" onclick="window.location.href='browse.html'">Back to browse</button>
                </div>
            </div>
        </div>

        <section class="sc-insights">
            <article class="sc-insight">
                <span class="sc-insight__num">01</span>
                <p class="sc-insight__label">Design focus</p>
                <p class="sc-insight__copy">Clean body lines, balanced proportions, and a strong shoulder line keep the silhouette deliberate.</p>
            </article>
            <article class="sc-insight">
                <span class="sc-insight__num">02</span>
                <p class="sc-insight__label">Driver feel</p>
                <p class="sc-insight__copy">A composed chassis and responsive steering make the car feel settled at speed and in traffic.</p>
            </article>
            <article class="sc-insight">
                <span class="sc-insight__num">03</span>
                <p class="sc-insight__label">Ownership</p>
                <p class="sc-insight__copy">Save the car now and compare it later against other builds in your wishlist.</p>
            </article>
        </section>
    </div>
  `;
}

function setView(is3D) {
  is3DView = is3D;
  renderCarDetail();
}

function changeImage(dir) {
  currentImageIndex = (currentImageIndex + dir + currentCar.images.length) % currentCar.images.length;
  renderCarDetail();
}

function goToImage(index) {
  currentImageIndex = index;
  renderCarDetail();
}

function toggleWishAndRender() {
  toggleWishlist(currentCar.localID);
  renderCarDetail();
}

document.addEventListener('DOMContentLoaded', renderCarDetail);
