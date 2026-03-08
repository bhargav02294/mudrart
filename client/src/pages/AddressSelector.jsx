import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AddressSelector(){

const [address,setAddress]=useState({});
const [cart,setCart]=useState(null);

const sessionId = localStorage.getItem("sessionId");

/* ===========================
FETCH ADDRESS
=========================== */

const fetchAddress = async()=>{

const res = await fetch(`/api/address?sessionId=${sessionId}`,{
headers:{
Authorization:localStorage.getItem("userToken")
? "Bearer "+localStorage.getItem("userToken")
: ""
}
});

const data = await res.json();

setAddress(data);

};

/* ===========================
FETCH CART
=========================== */

const fetchCart = async()=>{

const res = await fetch(`/api/cart?sessionId=${sessionId}`,{
headers:{
Authorization:localStorage.getItem("userToken")
? "Bearer "+localStorage.getItem("userToken")
: ""
}
});

const data = await res.json();

setCart(data);

};

useEffect(()=>{

fetchAddress();
fetchCart();

},[]);


/* ===========================
SAVE ADDRESS
=========================== */

const saveAddress = async()=>{

await fetch("/api/address",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:localStorage.getItem("userToken")
? "Bearer "+localStorage.getItem("userToken")
: ""
},

body:JSON.stringify({
sessionId,
address
})

});

alert("Address Saved");

};


/* ===========================
LOADING
=========================== */

if(!cart) return <div className="container">Loading...</div>;


return(

<>

<Navbar/>

<div className="container address-page">

<h1>Shipping Address</h1>

<div className="address-layout">

{/* ADDRESS FORM */}

<div className="address-form">

<input
placeholder="Full Name"
value={address.name || ""}
onChange={e=>setAddress({...address,name:e.target.value})}
/>

<input
placeholder="Mobile"
value={address.mobile || ""}
onChange={e=>setAddress({...address,mobile:e.target.value})}
/>

<input
placeholder="Address Line 1"
value={address.addressLine1 || ""}
onChange={e=>setAddress({...address,addressLine1:e.target.value})}
/>

<input
placeholder="Address Line 2"
value={address.addressLine2 || ""}
onChange={e=>setAddress({...address,addressLine2:e.target.value})}
/>

<input
placeholder="Area"
value={address.area || ""}
onChange={e=>setAddress({...address,area:e.target.value})}
/>

<input
placeholder="District"
value={address.district || ""}
onChange={e=>setAddress({...address,district:e.target.value})}
/>

<input
placeholder="State"
value={address.state || ""}
onChange={e=>setAddress({...address,state:e.target.value})}
/>

<input
placeholder="Pincode"
value={address.pincode || ""}
onChange={e=>setAddress({...address,pincode:e.target.value})}
/>

<button className="save-address-btn" onClick={saveAddress}>
Save Address
</button>

</div>


{/* CART SUMMARY */}

<div className="checkout-summary">

<h3>Order Summary</h3>

{cart.items.map((item,i)=>(

<div className="checkout-item" key={i}>

<img src={item.poster.thumbnail}/>

<div>

<p>{item.poster.name}</p>

<p>Size : {item.size}</p>

<p>Qty : {item.quantity}</p>

</div>

<div>

₹{item.payablePrice}
</div>


{item.freeQty>0 && (
<p className="free-label">
🎁 {item.freeQty} Free
</p>
)}
</div>

))}


<div className="summary-row">
<span>Subtotal</span>
<span>₹{cart.subtotal}</span>
</div>


{cart.totalFreeItems>0 && (

<div className="offer-box">

🎁 {cart.totalFreeItems} Free Posters

</div>

)}

<div className="summary-total">

Total ₹{cart.total}

</div>

<button className="payment-btn">

Proceed To Payment

</button>

</div>

</div>

</div>

</>

);

}