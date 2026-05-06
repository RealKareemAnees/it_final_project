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
    position: "center 55%",
  },
  {
    image: resolveAssetUrl("public/images/slide-1-images/audi.avif"),
    quote: "Performance meets elegance<br>in every curve",
    position: "center 55%",
  },
  {
    image: resolveAssetUrl("public/images/slide-1-images/porsche.jpg"),
    quote: "Precision engineering<br>for the elite",
    position: "center 55%",
  },
];

let currentSlideIndex = 0;

// Applies a slideshow frame to the hero, optionally without animation.
function applySlide(index, options = {}) {
  // Read the page elements that display the hero image and counters.
  const appContainer = document.querySelector(".app-container");
  const headline = document.querySelector(".hero-headline");
  const currentSlideSpan = document.querySelector(".current-slide");
  const totalSlideSpan = document.querySelector(".total-slides");

  if (!appContainer || !headline || !currentSlideSpan) return;

  // Pull the target slide data from the slideshow list.
  const slide = HOME_SLIDES[index];
  // Build the CSS background value that layers a gradient over the image.
  const newBg = `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%), url('${slide.image}')`;

  // Update the visible slide counter.
  currentSlideSpan.textContent = String(index + 1).padStart(2, "0");
  if (totalSlideSpan) {
    // Update the total count so the counter pair stays complete.
    totalSlideSpan.textContent = String(HOME_SLIDES.length).padStart(2, "0");
  }

  if (options.instant) {
    // Apply the slide immediately during initial page setup.
    appContainer.style.setProperty("--hero-image", newBg);
    appContainer.style.setProperty("--hero-position", slide.position);
    headline.innerHTML = slide.quote;
    headline.classList.remove("fade-out", "fade-in");
    return;
  }

  // Use fading classes to animate the transition between slides.
  appContainer.classList.add("is-fading");
  headline.classList.remove("fade-in");
  headline.classList.add("fade-out");

  // Delay the content swap so the fade-out has time to play.
  setTimeout(() => {
    appContainer.style.setProperty("--hero-image", newBg);
    appContainer.style.setProperty("--hero-position", slide.position);
    headline.innerHTML = slide.quote;
    headline.classList.remove("fade-out");
    headline.classList.add("fade-in");
    appContainer.classList.remove("is-fading");
  }, 250);
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
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Allow arrow keys to change slides for keyboard users.
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  // Show the initial slide immediately on page load.
  applySlide(currentSlideIndex, { instant: true });
}

// Run the home page initialization when the DOM is available.
document.addEventListener("DOMContentLoaded", initHome);
