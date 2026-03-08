import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();


/* ===============================
FETCH PROFILE
=============================== */

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


/* ===============================
FETCH ORDERS
=============================== */

  const fetchOrders = async () => {

    try {

      const res = await fetch("/api/orders/my", {

        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }

      });

      const data = await res.json();

      setOrders(data);

    } catch (err) {
      console.error(err);
    }

  };

  fetchProfile();
  fetchOrders();

}, [navigate]);


if (user === null) return <div className="container">Loading...</div>;


/* ===============================
UI
=============================== */

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



{/* ===============================
ORDERS SECTION
=============================== */}

<div className="orders-section">

<h2>Your Orders</h2>

{orders.length === 0 && (
<p>No orders yet</p>
)}


{orders.map(order => (

<div key={order._id} className="order-card">

<div className="order-header">

<p><strong>Order ID:</strong> {order._id}</p>

<p><strong>Status:</strong> {order.orderStatus}</p>

<p><strong>Delivery:</strong> {order.deliveryEstimate}</p>

</div>


{order.items.map((item,i)=>(

<div key={i} className="order-item">

<img
src={item.thumbnail}
className="order-thumb"
/>

<div className="order-info">

<p className="order-name">
{item.name}
</p>

<p>Size: {item.size}</p>

<p>Quantity: {item.quantity}</p>

<p>Price: ₹{item.price}</p>

</div>

</div>

))}

</div>

))}

</div>

</div>

);

}