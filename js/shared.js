/**
 * Shared Mock Data and Utilities for CarWiki Static Refactor
 */

const MOCK_CARS = [
  {
    name: "Mercedes-Benz C-Class",
    type: "Luxury",
    manufacturer: "Mercedes-Benz",
    year: 2024,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&auto=format&fit=crop&q=60",
    ],
    description:
      "The 2024 Mercedes-Benz C-Class represents the pinnacle of what a compact luxury sedan can achieve...",
    country: "Germany",
    tags: ["luxury sedan", "Mercedes-Benz", "premium", "turbocharged"],
    price: 55000,
    localID: 4,
    threeDfile: "mercedes-benz_c-class_2020.glb",
  },
  {
    name: "Ford Mustang",
    type: "Sports",
    manufacturer: "Ford",
    year: 2023,
    images: [
      "https://media.gettyimages.com/id/459388679/photo/roush-ford-mustang-2010.jpg?s=612x612&w=0&k=20&c=VZlYEd_nsmke950CHkYKldTS0X2bCJ3kHhaUlKpNSPc=",
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=600&auto=format&fit=crop&q=60",
    ],
    description:
      "The Ford Mustang is more than a car — it is an American cultural icon...",
    country: "USA",
    tags: ["sports car", "muscle car", "V8", "American"],
    price: 45000,
    localID: 5,
    threeDfile: "ford_mustang_roush_2019_-_stage_3.glb",
  },
  {
    name: "Chevrolet Camaro",
    type: "Sports",
    manufacturer: "Chevrolet",
    year: 2023,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562911791-472321d62247?w=600&auto=format&fit=crop&q=60",
    ],
    description:
      "The Chevrolet Camaro has been locked in the definitive American muscle car rivalry...",
    country: "USA",
    tags: ["muscle car", "sports car", "V8", "American"],
    price: 43000,
    localID: 6,
    threeDfile: "chevrolet_camaro_2020.glb",
  },
  {
    name: "Audi RS7",
    type: "Luxury",
    manufacturer: "Audi",
    year: 2023,
    images: ["public/images/slide-1-images/audi.avif"],
    description:
      "The Audi RS7 combines the sleek lines of a four-door coupe with the heart of a supercar.",
    country: "Germany",
    tags: ["luxury", "performance", "quattro"],
    price: 118000,
    localID: 7,
  },
  {
    name: "Aston Martin Vantage",
    type: "Sports",
    manufacturer: "Aston Martin",
    year: 2023,
    images: ["public/images/slide-1-images/aston-martin.jpg"],
    description:
      "The Aston Martin Vantage is a raw and instinctive sports car that offers an unforgettable driving experience.",
    country: "UK",
    tags: ["sports", "british", "luxury"],
    price: 145000,
    localID: 8,
  },
];

// --- Utilities ---

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function setUser(username, role = "user") {
  const user = {
    username,
    role,
    theme: localStorage.getItem("theme") || "light",
    wishList: getWishlist(),
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function getWishlist() {
  const user = getUser();
  if (user) return user.wishList || [];
  const list = localStorage.getItem("wishlist");
  return list ? JSON.parse(list) : [];
}

function toggleWishlist(carId) {
  let list = getWishlist();
  const idStr = String(carId);
  if (list.includes(idStr)) {
    list = list.filter((id) => id !== idStr);
  } else {
    list.push(idStr);
  }

  const user = getUser();
  if (user) {
    user.wishList = list;
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("wishlist", JSON.stringify(list));
  }
  return list;
}

// --- UI Logic ---

function initSharedUI() {
  // Theme Toggle
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.documentElement.classList.add("darktheme");
    document.body.classList.add("darktheme");
  }

  const themeBtn = document.querySelector(".theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("darktheme");
      document.body.classList.toggle("darktheme");
      const newTheme = isDark ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      const user = getUser();
      if (user) {
        user.theme = newTheme;
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  }

  // Header Scroll
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    });
  }

  // Mobile Menu
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const active = mobileNav.classList.toggle("active");
      document.body.classList.toggle("nav-drawer-open", active);

      // Burger animation
      const spans = menuBtn.querySelectorAll("span");
      if (active) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // Navbar Dynamic Links (User vs Guest)
  const user = getUser();
  const navActions = document.querySelector(".header-right .nav-actions");
  const mobileActionsContainer = document.querySelector(".mobile-nav");

  if (navActions) {
    if (user) {
      navActions.innerHTML = `
        <a href="profile.html" class="nav-link">Profile</a>
        ${user.role === "admin" ? '<a href="admin.html" class="nav-link">Dashboard</a>' : ""}
        <button class="nav-link nav-button" onclick="logout()">Logout</button>
      `;
    } else {
      navActions.innerHTML = `
        <a href="auth.html" class="nav-link">Login</a>
        <a href="auth.html" class="nav-link">Signup</a>
      `;
    }
  }

  if (mobileActionsContainer) {
    // Find the last links in mobile nav to replace/update
    // For simplicity, let's just re-render the bottom part or handle it if we want it perfect
  }

  // Footer Year
  const yearEl = document.querySelector("[data-footer-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", initSharedUI);
