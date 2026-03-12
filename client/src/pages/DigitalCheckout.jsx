import {useState,useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"

export default function DigitalCheckout(){

const {id} = useParams()

const navigate = useNavigate()

const [poster,setPoster] = useState(null)

const [email,setEmail] = useState("")
const [mobile,setMobile] = useState("")


/* ===============================
FETCH POSTER
=============================== */

useEffect(()=>{

const fetchPoster = async()=>{

try{

const res = await fetch("/api/posters")

const data = await res.json()

const found = data.find(p=>p._id===id)

setPoster(found)

}catch(err){

console.error(err)

}

}

fetchPoster()

},[id])



/* ===============================
START PAYMENT
=============================== */

const startPayment = async()=>{

if(!email || !mobile){

alert("Please enter email and mobile")

return

}

try{

const res = await fetch("/api/digital/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

posterId:id,
email,
mobile

})

})

const data = await res.json()


/* ===============================
RAZORPAY OPTIONS
=============================== */

const options = {

key:data.key,

amount:data.amount*100,

currency:"INR",

name:"Mudrart",

description:"Digital Poster",

order_id:data.razorpayOrderId,


handler:async function(response){

/* SUCCESS PAYMENT */

await fetch("/api/digital/verify",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

...response,
orderId:data.orderId

})

})

navigate("/payment-success")

},


modal:{

ondismiss:function(){

navigate("/payment-failed")

}

}


}


/* ===============================
OPEN RAZORPAY
=============================== */

const rzp = new window.Razorpay(options)

rzp.open()

}catch(err){

console.error(err)

navigate("/payment-failed")

}

}



if(!poster) return <div className="container">Loading...</div>



return(

<>

<Navbar/>

<div className="container">

<h2>Digital Download</h2>

<div className="digital-checkout">

<img src={poster.thumbnail} className="digital-thumb"/>

<h3>{poster.name}</h3>

<p>Price ₹{poster.downloadPrice}</p>

<input
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>

<input
placeholder="Mobile"
value={mobile}
onChange={e=>setMobile(e.target.value)}
/>

<button onClick={startPayment}>
Buy Digital Download
</button>

</div>

</div>

</>

)

}