const USER_API = 'https://6825aa4f0f0188d7e72ddec4.mockapi.io/suppliers/user';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const mobile = document.getElementById('mobile').value;

      const res = await fetch(USER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, mobile })
      });

      if (res.ok) {
        alert('Registered successfully!');
        window.location.href = 'login.html';
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      const res = await fetch(USER_API);
      const users = await res.json();
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = username === 'admin' ? 'admin.html' : 'index.html';
      } else {
        alert('Invalid credentials');
      }
    });
  }
});