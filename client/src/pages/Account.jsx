import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="account-container">
      <h2>My Account</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile:</strong> {user.address?.mobile}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>DOB:</strong> {user.dob?.slice(0,10)}</p>

      <h3>Shipping Address</h3>
      <p>{user.address?.addressLine1}</p>
      <p>{user.address?.area}, {user.address?.district}</p>
      <p>{user.address?.state} - {user.address?.pincode}</p>

      <button onClick={() => navigate("/account/edit")}>
        Edit Profile
      </button>

      <button
  onClick={() => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  }}
  className="logout-account-btn"
>
  Logout
</button>
    </div>
  );
}