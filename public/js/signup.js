const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 201) {
      alert("Signup successful!");
      window.location.href = "/login.html"; // redirect if needed
    } else {
      document.getElementById("error").textContent = result.message;
    }
  } catch (err) {
    document.getElementById("error").textContent = "Error connecting to server.";
  }
});
