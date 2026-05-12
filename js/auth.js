/**
 * Authentication Page JS
 */

function initAuth() {
  const authForm = document.getElementById("auth-form");

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("auth-username").value;
      // Simple stupid auth: just set the user in localStorage
      setUser(username);
      window.location.href = "index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", initAuth);
