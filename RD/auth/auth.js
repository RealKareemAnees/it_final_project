document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));
      // Add active class to clicked tab
      tab.classList.add("active");

      // Hide all forms
      forms.forEach((form) => form.classList.remove("active"));

      // Show corresponding form
      const target = tab.getAttribute("data-target");
      document.getElementById(`${target}-form`).classList.add("active");
    });
  });

  // Optional form submission handlers for UI simulation
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add auth logic here
    console.log("Login submitted");
  });

  const signupForm = document.getElementById("signup-form");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add auth logic here
    console.log("Signup submitted");
  });
});
