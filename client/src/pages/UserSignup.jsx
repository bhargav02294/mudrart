import { useState } from "react";

export default function UserSignup() {
  const [form, setForm] = useState({});
  const [step, setStep] = useState(1);

  const handleSignup = async () => {
    await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setStep(2);
  };

  const handleVerify = async () => {
    const res = await fetch("/api/users/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp: form.otp })
    });

    const data = await res.json();
    localStorage.setItem("userToken", data.token);
    window.location.href = "/";
  };

  return (
    <div className="auth-container">
      {step === 1 ? (
        <>
          <h2>Create Account</h2>
          <input placeholder="Name"
            onChange={e=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Email"
            onChange={e=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password"
            onChange={e=>setForm({...form,password:e.target.value})}/>
          <button onClick={handleSignup}>Send OTP</button>
        </>
      ) : (
        <>
          <h2>Verify OTP</h2>
          <input placeholder="Enter OTP"
            onChange={e=>setForm({...form,otp:e.target.value})}/>
          <button onClick={handleVerify}>Verify</button>
        </>
      )}
    </div>
  );
}