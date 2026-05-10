/**
 * Authentication Page JS
 */

function initAuth() {
  const tabs = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      forms.forEach((f) => {
        if (f.id === `${target}-form`) {
          f.classList.add("active");
        } else {
          f.classList.remove("active");
        }
      });
    });
  });

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value;
      // Simple stupid auth: just set the user in localStorage
      setUser(username);
      window.location.href = "index.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("signup-username").value;
      // Simple stupid auth: just set the user in localStorage
      setUser(username);
      window.location.href = "index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", initAuth);
