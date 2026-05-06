import {useState,useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"
import "../styles/digital.css";


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


return (

<>
  <Navbar />

  <div className="digital-page">

    <div className="container">

      <div className="digital-wrapper">

        {/* LEFT */}

        <div className="digital-left">

          <div className="digital-image-box">

            <img
              src={poster.thumbnail}
              className="digital-thumb"
              alt={poster.name}
            />

          </div>

        </div>

        {/* RIGHT */}

        <div className="digital-right">

          <span className="digital-badge">
            Instant Download
          </span>

          <h1 className="digital-title">
            {poster.name}
          </h1>

          <p className="digital-description">
            Premium high quality digital poster.
            Instant access after successful payment.
          </p>

          <div className="digital-price-box">

            <span className="price-label">
              Price
            </span>

            <div className="digital-price">
              ₹{poster.downloadPrice}
            </div>

          </div>

          {/* FORM */}

          <div className="digital-form">

            <div className="input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"

                value={email}

                onChange={(e)=>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter mobile number"

                value={mobile}

                onChange={(e)=>
                  setMobile(e.target.value)
                }
              />

            </div>

            <button
              className="digital-btn"
              onClick={startPayment}
            >
              Buy Digital Download
            </button>

          </div>

          {/* FEATURES */}

          <div className="digital-features">

            <div className="feature-item">
              ⚡ Instant Download Access
            </div>

            <div className="feature-item">
              🔒 Secure Razorpay Payment
            </div>

            <div className="feature-item">
              📩 Download Link via Email
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</>

)

}