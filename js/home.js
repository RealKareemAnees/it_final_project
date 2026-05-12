/**
 * Home Page specific JS (Carousel)
 */

// Resolves an asset path relative to the current page URL.
const resolveAssetUrl = (relativePath) =>
  new URL(relativePath, window.location.href).href;

// Defines the hero slideshow content that powers the landing page banner.
const HOME_SLIDES = [
  {
    image: resolveAssetUrl("public/images/slide-1-images/aston-martin.jpg"),
    quote: "Discover premium cars<br>in our comprehensive wiki",
  },
  {
    image: resolveAssetUrl("public/images/slide-1-images/porsche.jpg"),
    quote: "Precision engineering<br>for the elite",
  },
  {
    image: resolveAssetUrl("public/images/slide-1-images/audi.avif"),
    quote: "Performance meets elegance<br>in every curve",
  },
];

let currentSlideIndex = 0;

// Applies a slideshow frame to the hero, optionally without animation.
function applySlide(index) {
  const slide = HOME_SLIDES[index];

  const container = document.querySelector(".app-container");

  const headline = document.querySelector(".hero-headline");

  const currentSlide = document.querySelector(".current-slide");

  container.style.setProperty("--hero-image", `url('${slide.image}')`);

  headline.innerHTML = slide.quote;

  currentSlide.textContent = index + 1;
}

// Advances the slideshow to the next frame.
function nextSlide() {
  // Wrap around to the first slide when reaching the end.
  currentSlideIndex = (currentSlideIndex + 1) % HOME_SLIDES.length;
  applySlide(currentSlideIndex);
}

// Moves the slideshow to the previous frame.
function prevSlide() {
  // Wrap around to the final slide when moving backward from the first.
  currentSlideIndex =
    (currentSlideIndex - 1 + HOME_SLIDES.length) % HOME_SLIDES.length;
  applySlide(currentSlideIndex);
}

// Binds carousel controls and keyboard shortcuts once the page is ready.
function initHome() {
  // Capture the previous and next buttons from the home page controls.
  const nextBtn = document.querySelector(".nav-btn.next");
  const prevBtn = document.querySelector(".nav-btn.prev");

  // Attach button handlers if the controls are present.
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Show the initial slide immediately on page load.
  applySlide(currentSlideIndex);
}

// Run the home page initialization when the DOM is available.
document.addEventListener("DOMContentLoaded", initHome);
