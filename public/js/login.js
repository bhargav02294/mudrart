document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to index.html
      window.location.href = "/index.html";
    } else {
      document.getElementById('message').textContent = data.message || 'Login failed';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('message').textContent = 'Something went wrong. Try again.';
  }
});
