/* ── HEADER & MOBILE MENU ──────────────────────────────────────────── */

export function initHeader() {
  const header = document.querySelector(".header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  // Header scroll behavior
  function updateHeaderOnScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  // Mobile menu toggle
  function closeMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove("active");
    if (mobileMenuBtn) {
      const spans = mobileMenuBtn.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  }

  if (mobileMenuBtn && mobileNav) {
    // Toggle menu on hamburger click
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle("active");

      const spans = mobileMenuBtn.querySelectorAll("span");
      if (mobileNav.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Close menu when clicking on nav links
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }
}
