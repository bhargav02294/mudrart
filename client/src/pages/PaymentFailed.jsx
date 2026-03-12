import {useNavigate} from "react-router-dom"

export default function PaymentFailed(){

const navigate = useNavigate()

return(

<div className="container payment-page">

<h1>Payment Failed ❌</h1>

<p>Your payment could not be completed.</p>

<p>Please try again.</p>

<button onClick={()=>navigate("/")}>
Return Home
</button>

</div>

)

}