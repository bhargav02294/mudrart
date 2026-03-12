import {useNavigate} from "react-router-dom"

export default function PaymentSuccess(){

const navigate = useNavigate()

return(

<div className="container payment-page">

<h1>Payment Successful 🎉</h1>

<p>Your order has been successfully placed.</p>

<button onClick={()=>navigate("/account")}>
Go To My Account
</button>

</div>

)

}