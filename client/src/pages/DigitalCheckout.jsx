import {useState,useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"

export default function DigitalCheckout(){

const {id} = useParams()

const navigate = useNavigate()

const [poster,setPoster] = useState(null)

const [email,setEmail] = useState("")
const [mobile,setMobile] = useState("")

useEffect(()=>{

const fetchPoster = async()=>{

const res = await fetch("/api/posters")

const data = await res.json()

const found = data.find(p=>p._id===id)

setPoster(found)

}

fetchPoster()

},[id])


const startPayment = async()=>{

if(!email || !mobile){
alert("Enter email and mobile")
return
}

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


const options = {

key:data.key,

amount:data.amount*100,

currency:"INR",

name:"Mudrart",

description:"Digital Poster",

order_id:data.razorpayOrderId,

handler:async function(response){

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

navigate("/account")

}

}

const rzp = new window.Razorpay(options)

rzp.open()

}


if(!poster) return <div>Loading...</div>


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