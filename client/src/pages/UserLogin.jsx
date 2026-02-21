import { useState } from "react";

export default function UserLogin() {
  const [form, setForm] = useState({});

  const handleLogin = async () => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    localStorage.setItem("userToken", data.token);
    window.location.href = "/";
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}