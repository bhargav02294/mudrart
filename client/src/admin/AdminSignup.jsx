import { useState } from "react";

export default function AdminSignup() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSignup = async () => {
    const res = await fetch("/api/admin/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="admin-container">
      <h2 className="admin-header">Admin Signup</h2>
      <input placeholder="Username"
        onChange={(e)=>setForm({...form, username:e.target.value})}/>
      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form, password:e.target.value})}/>
<button className="btn-primary" onClick={handleSignup}>
    Create Account
  </button>
      </div>
  );
}