import { useState } from "react";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    alert("Logged in");
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Username"
        onChange={(e)=>setForm({...form, username:e.target.value})}/>
      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}