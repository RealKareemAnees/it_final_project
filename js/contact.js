/**
 * Contact Page JS
 */

// Wires the contact form submit handler and success message display.
function initContact() {
  // Get the form element that users submit and the status region that shows feedback.
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  if (form) {
    // Intercept submit so the static demo can acknowledge the message locally.
    form.addEventListener("submit", (e) => {
      // Prevent the browser from trying to post the form.
      e.preventDefault();
      // Replace the status area with a success note for the user.
      status.innerHTML =
        '<p class="page-success">Message sent. We will reply soon.</p>';
      // Clear the form fields after the simulated send completes.
      form.reset();
    });
  }
}

// Run the contact page setup after the document is ready.
document.addEventListener("DOMContentLoaded", initContact);
