import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddressSelector(){

const navigate = useNavigate();

const [address,setAddress]=useState({});
const [cart,setCart]=useState(null);

/* error messages */
const [errors,setErrors]=useState({});

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
VALIDATE ADDRESS
=========================== */

const validateAddress = () => {

let newErrors = {};

if(!address.name || address.name.trim()==="")
newErrors.name="Full name is required";

if(!address.mobile || address.mobile.trim()==="")
newErrors.mobile="Mobile number is required";
else if(address.mobile.length !== 10)
newErrors.mobile="Enter valid 10 digit mobile number";

if(!address.addressLine1 || address.addressLine1.trim()==="")
newErrors.addressLine1="Address line is required";

if(!address.area || address.area.trim()==="")
newErrors.area="Area is required";

if(!address.district || address.district.trim()==="")
newErrors.district="District is required";

if(!address.state || address.state.trim()==="")
newErrors.state="State is required";

if(!address.pincode || address.pincode.trim()==="")
newErrors.pincode="Pincode is required";
else if(address.pincode.length !== 6)
newErrors.pincode="Enter valid 6 digit pincode";

setErrors(newErrors);

return Object.keys(newErrors).length===0;

};


/* ===========================
SAVE ADDRESS
=========================== */

const saveAddress = async()=>{

if(!validateAddress()) return;

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

alert("Address saved successfully");

};


/* ===========================
PAYMENT START
=========================== */

const startPayment = async()=>{

if(!validateAddress()) return;

try{

const res = await fetch("/api/orders/create",{

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


if(!res.ok){

const err = await res.json();

alert(err.message || "Order creation failed");

return;

}


const data = await res.json();


if(!data.key){

alert("Payment configuration error");

return;

}


/* ===============================
RAZORPAY
=============================== */

const options = {

key:data.key,

amount:data.amount * 100,

currency:"INR",

name:"Mudrart",

description:"Poster Purchase",

order_id:data.razorpayOrderId,

handler:async function(response){

await fetch("/api/payment/verify",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

...response,
orderId:data.orderId

})

});

navigate("/account");

},

modal:{

ondismiss:function(){

alert("Payment cancelled");

}

}

};

const rzp = new window.Razorpay(options);

rzp.open();

}catch(err){

console.error(err);

alert("Payment failed");

}

};
/* ===========================
LOADING
=========================== */

if(!cart) return <div className="container">Loading...</div>;


/* ===========================
UI
=========================== */

return(

<>
<Navbar/>

<div className="container address-page">

<h1>Shipping Address</h1>

<div className="address-layout">

{/* ADDRESS FORM */}

<div className="address-form">

{/* NAME */}

<input
placeholder="Full Name"
className={errors.name ? "input-error":""}
value={address.name || ""}
onChange={e=>setAddress({...address,name:e.target.value})}
/>

{errors.name && <p className="error-text">{errors.name}</p>}



<input
placeholder="Mobile"
className={errors.mobile ? "input-error":""}
value={address.mobile || ""}
onChange={e=>setAddress({...address,mobile:e.target.value})}
/>

{errors.mobile && <p className="error-text">{errors.mobile}</p>}



<input
placeholder="Address Line 1"
className={errors.addressLine1 ? "input-error":""}
value={address.addressLine1 || ""}
onChange={e=>setAddress({...address,addressLine1:e.target.value})}
/>

{errors.addressLine1 && <p className="error-text">{errors.addressLine1}</p>}



<input
placeholder="Address Line 2"
value={address.addressLine2 || ""}
onChange={e=>setAddress({...address,addressLine2:e.target.value})}
/>



<input
placeholder="Area"
className={errors.area ? "input-error":""}
value={address.area || ""}
onChange={e=>setAddress({...address,area:e.target.value})}
/>

{errors.area && <p className="error-text">{errors.area}</p>}



<input
placeholder="District"
className={errors.district ? "input-error":""}
value={address.district || ""}
onChange={e=>setAddress({...address,district:e.target.value})}
/>

{errors.district && <p className="error-text">{errors.district}</p>}



<input
placeholder="State"
className={errors.state ? "input-error":""}
value={address.state || ""}
onChange={e=>setAddress({...address,state:e.target.value})}
/>

{errors.state && <p className="error-text">{errors.state}</p>}



<input
placeholder="Pincode"
className={errors.pincode ? "input-error":""}
value={address.pincode || ""}
onChange={e=>setAddress({...address,pincode:e.target.value})}
/>

{errors.pincode && <p className="error-text">{errors.pincode}</p>}


<button className="save-address-btn" onClick={saveAddress}>
Save Address
</button>

</div>


{/* ORDER SUMMARY */}

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

<button
className="payment-btn"
onClick={startPayment}
>
Proceed To Payment
</button>

</div>

</div>
</div>
</>
);

}