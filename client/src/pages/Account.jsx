import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {

const [user,setUser] = useState(null)

const [orders,setOrders] = useState([])

const [digitalOrders,setDigitalOrders] = useState([])

const navigate = useNavigate()



/* ===============================
FETCH PROFILE
=============================== */

useEffect(()=>{

const fetchProfile = async()=>{

try{

const res = await fetch("/api/profile",{

headers:{
Authorization:"Bearer "+localStorage.getItem("userToken")
}

})

if(!res.ok){

localStorage.removeItem("userToken")
navigate("/auth")
return

}

const data = await res.json()

setUser(data)

/* fetch orders after user loaded */

fetchOrders()

fetchDigitalOrders(data.email)

}catch(err){

localStorage.removeItem("userToken")
navigate("/auth")

}

}



const fetchOrders = async()=>{

try{

const res = await fetch("/api/orders/my",{

headers:{
Authorization:"Bearer "+localStorage.getItem("userToken")
}

})

const data = await res.json()

setOrders(data)

}catch(err){
console.error(err)
}

}



const fetchDigitalOrders = async(email)=>{

try{

const res = await fetch(`/api/digital/my?email=${email}`)

const data = await res.json()

setDigitalOrders(data)

}catch(err){
console.error(err)
}

}



fetchProfile()

},[navigate])



if(user===null) return <div className="container">Loading...</div>



/* ===============================
UI
=============================== */

return(

<div className="container">


{/* PROFILE */}

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

<button onClick={()=>navigate("/account/edit")}>
Edit Profile
</button>

<button
onClick={()=>{
localStorage.removeItem("userToken")
window.location.href="/"
}}
className="logout-account-btn"
>
Logout
</button>

</div>



{/* PHYSICAL ORDERS */}

<div className="orders-section">

<h2>Physical Orders</h2>

{orders.length===0 && (
<p>No physical orders yet</p>
)}

{orders.map(order=>(

<div key={order._id} className="order-card">

<div className="order-header">

<p><strong>Order ID:</strong> {order._id}</p>

<p><strong>Status:</strong> {order.orderStatus || "Processing"}</p>

<p><strong>Delivery:</strong> {
order.deliveryEstimate
? new Date(order.deliveryEstimate).toDateString()
: "7-10 days"
}</p>

</div>

{order.items?.map((item,i)=>(

<div key={i} className="order-item">

<img
src={item.thumbnail}
className="order-thumb"
/>

<div className="order-info">

<p className="order-name">{item.name}</p>

<p>Size: {item.size}</p>

<p>Quantity: {item.quantity}</p>

<p>Price: ₹{item.price}</p>

</div>

</div>

))}

</div>

))}

</div>



{/* DIGITAL ORDERS */}

<div className="orders-section">

<h2>Digital Downloads</h2>

{digitalOrders.length===0 && (
<p>No digital purchases yet</p>
)}

{digitalOrders.map(order=>(

<div key={order._id} className="order-card">

<div className="order-header">

<p><strong>Order ID:</strong> {order._id}</p>

<p><strong>Status:</strong> {order.paymentStatus}</p>

</div>

<div className="order-item">

<img
src={order.thumbnail}
className="order-thumb"
/>

<div className="order-info">

<p className="order-name">
{order.posterName}
</p>

<p>Price: ₹{order.price}</p>

<a
href={`/api/download/${order.downloadToken}`}
target="_blank"
rel="noreferrer"
className="download-btn"
>
Download File
</a>

</div>

</div>

</div>

))}

</div>

</div>

)

}