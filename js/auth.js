/**
 * Auth Page JS
 */

function initAuth() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      forms.forEach(f => {
        f.classList.remove('active');
        if (f.id === `${target}-form`) f.classList.add('active');
      });
    });
  });

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      // Admin backdoor for testing
      const role = (username.toLowerCase() === 'admin') ? 'admin' : 'user';
      setUser(username, role);
      window.location.href = role === 'admin' ? 'admin.html' : 'profile.html';
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('signup-username').value;
      setUser(username, 'user');
      window.location.href = 'profile.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', initAuth);
