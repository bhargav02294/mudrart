import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("userToken", data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </div>
  );
}