/**
 * Auth Page JS
 */

// Sets up the login/signup tab switcher and form submission handlers.
function initAuth() {
  // Collect the tab buttons that switch between login and signup panels.
  const tabs = document.querySelectorAll(".auth-tab");
  // Collect the form containers that are shown or hidden by the tabs.
  const forms = document.querySelectorAll(".auth-form");

  tabs.forEach((tab) => {
    // Attach a click listener to each tab so the active view changes on demand.
    tab.addEventListener("click", () => {
      // Read the panel key stored in the tab's data-target attribute.
      const target = tab.dataset.target;

      // Remove the active class from every tab before activating the clicked one.
      tabs.forEach((t) => t.classList.remove("active"));
      // Mark the clicked tab as active so the UI reflects the selection.
      tab.classList.add("active");

      // Hide every form, then reveal the one that matches the selected tab.
      forms.forEach((f) => {
        f.classList.remove("active");
        if (f.id === `${target}-form`) f.classList.add("active");
      });
    });
  });

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    // Intercept the login submit event so the demo can store a session locally.
    loginForm.addEventListener("submit", (e) => {
      // Prevent a full page reload because this is a static demo flow.
      e.preventDefault();
      // Read the username field and use it to decide whether to grant admin access.
      const username = document.getElementById("login-username").value;
      // Admin backdoor for testing
      // Convert the username to a role so the app can redirect appropriately.
      const role = username.toLowerCase() === "admin" ? "admin" : "user";
      // Persist the user object in localStorage using the shared helper.
      setUser(username, role);
      // Navigate to the correct landing page after authentication completes.
      window.location.href = role === "admin" ? "admin.html" : "profile.html";
    });
  }

  if (signupForm) {
    // Intercept the signup flow and create a standard user profile locally.
    signupForm.addEventListener("submit", (e) => {
      // Prevent the browser from submitting the form to a server endpoint.
      e.preventDefault();
      // Read the chosen username from the signup form.
      const username = document.getElementById("signup-username").value;
      // Save the new user as a normal member and keep their session active.
      setUser(username, "user");
      // Send the new account to the profile page.
      window.location.href = "profile.html";
    });
  }
}

// Wait until the DOM exists before binding form and tab behavior.
document.addEventListener("DOMContentLoaded", initAuth);
