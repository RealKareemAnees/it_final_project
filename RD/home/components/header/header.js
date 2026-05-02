/* ── HEADER & MOBILE MENU ──────────────────────────────────────────── */

async function loadFragment(fragmentPath) {
  const response = await fetch(fragmentPath);
  if (!response.ok) {
    throw new Error(`Unable to load fragment: ${fragmentPath}`);
  }

  return response.text();
}

export async function initHeader() {
  const headerRoot = document.querySelector("[data-header-root]");
  if (!headerRoot) {
    return;
  }

  try {
    headerRoot.innerHTML = await loadFragment(
      new URL("./header.html", import.meta.url),
    );
  } catch {
    return;
  }

  const header = headerRoot.querySelector(".header");
  const mobileMenuBtn = headerRoot.querySelector(".mobile-menu-btn");
  const mobileNav = headerRoot.querySelector(".mobile-nav");

  if (!header || !mobileMenuBtn || !mobileNav) {
    return;
  }

  function updateHeaderOnScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function syncMenuIcon(isActive) {
    const spans = mobileMenuBtn.querySelectorAll("span");
    if (spans.length < 3) {
      return;
    }

    if (isActive) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      return;
    }

    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }

  function closeMenu() {
    mobileNav.classList.remove("active");
    syncMenuIcon(false);
  }

  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  mobileMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    mobileNav.classList.toggle("active");
    syncMenuIcon(mobileNav.classList.contains("active"));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !mobileNav.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      closeMenu();
    }
  });
}
