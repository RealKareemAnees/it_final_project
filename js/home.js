/**
 * Home Page specific JS (Carousel)
 */

const HOME_SLIDES = [
  {
    image: "public/images/slide-1-images/aston-martin.jpg",
    quote: "Discover premium cars<br>in our comprehensive wiki",
    position: "center 55%",
  },
  {
    image: "public/images/slide-1-images/audi.avif",
    quote: "Performance meets elegance<br>in every curve",
    position: "center 55%",
  },
  {
    image: "public/images/slide-1-images/porsche.jpg",
    quote: "Precision engineering<br>for the elite",
    position: "center 55%",
  },
];

let currentSlideIndex = 0;

function applySlide(index, options = {}) {
  const appContainer = document.querySelector(".app-container");
  const headline = document.querySelector(".hero-headline");
  const currentSlideSpan = document.querySelector(".current-slide");
  const totalSlideSpan = document.querySelector(".total-slides");

  if (!appContainer || !headline || !currentSlideSpan) return;

  const slide = HOME_SLIDES[index];
  const newBg = `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%), url('${slide.image}')`;

  currentSlideSpan.textContent = String(index + 1).padStart(2, "0");
  if (totalSlideSpan) {
    totalSlideSpan.textContent = String(HOME_SLIDES.length).padStart(2, "0");
  }

  if (options.instant) {
    appContainer.style.setProperty("--hero-image", newBg);
    appContainer.style.setProperty("--hero-position", slide.position);
    headline.innerHTML = slide.quote;
    headline.classList.remove("fade-out", "fade-in");
    return;
  }

  appContainer.classList.add("is-fading");
  headline.classList.remove("fade-in");
  headline.classList.add("fade-out");

  setTimeout(() => {
    appContainer.style.setProperty("--hero-image", newBg);
    appContainer.style.setProperty("--hero-position", slide.position);
    headline.innerHTML = slide.quote;
    headline.classList.remove("fade-out");
    headline.classList.add("fade-in");
    appContainer.classList.remove("is-fading");
  }, 250);
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % HOME_SLIDES.length;
  applySlide(currentSlideIndex);
}

function prevSlide() {
  currentSlideIndex =
    (currentSlideIndex - 1 + HOME_SLIDES.length) % HOME_SLIDES.length;
  applySlide(currentSlideIndex);
}

function initHome() {
  const nextBtn = document.querySelector(".nav-btn.next");
  const prevBtn = document.querySelector(".nav-btn.prev");

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  applySlide(currentSlideIndex, { instant: true });
}

document.addEventListener("DOMContentLoaded", initHome);
