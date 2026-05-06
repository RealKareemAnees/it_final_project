/**
 * Contact Page JS
 */

function initContact() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.innerHTML = '<p class="page-success">Message sent. We will reply soon.</p>';
      form.reset();
    });
  }
}

document.addEventListener('DOMContentLoaded', initContact);
