import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setStep(2);
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp
        })
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
      setError("Verification failed");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    setError("");

    try {
      const res = await fetch("/api/users/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      alert("OTP resent successfully");
    } catch (err) {
      setError("Resend failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {step === 1 ? (
          <>
            <h2>Create Account</h2>

            {error && <p className="auth-error">{error}</p>}

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

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

            <button onClick={handleSignup} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <h2>Email Verification</h2>

            {error && <p className="auth-error">{error}</p>}

            <input
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
            />

            <button onClick={handleVerify} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button className="secondary-btn" onClick={handleResend}>
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}