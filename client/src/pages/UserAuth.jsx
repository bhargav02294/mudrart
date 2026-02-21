import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    setError("");

    const res = await fetch("/api/users/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setStep(2);
  };

  const verifyOtp = async () => {
    setError("");

    const res = await fetch("/api/users/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("userToken", data.token);
    navigate("/account");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {step === 1 ? (
          <>
            <h2>Login / Signup</h2>

            {error && <p className="auth-error">{error}</p>}

            <input
              placeholder="Full Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2>Enter OTP</h2>

            {error && <p className="auth-error">{error}</p>}

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={sendOtp}>Resend OTP</button>

            <button onClick={verifyOtp}>
              Verify & Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}