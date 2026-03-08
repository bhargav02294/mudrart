import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      });

      if (!res.ok) {
        localStorage.removeItem("userToken");
        navigate("/auth");
        return;
      }

      const data = await res.json();
      setUser(data);

    } catch (err) {
      localStorage.removeItem("userToken");
      navigate("/auth");
    }
  };

  fetchProfile();
}, [navigate]);

if (user === null) return <div>Loading...</div>;
  return (

    <div className="container">
  <div className="card account-container">
   
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
</div>  );
}

router.get("/my", async(req,res)=>{
const token=req.headers.authorization.split(" ")[1];
const decoded=jwt.verify(token,process.env.JWT_SECRET);

const orders = await Order.find({user:decoded.id})
.sort({createdAt:-1});

res.json(orders);
});

