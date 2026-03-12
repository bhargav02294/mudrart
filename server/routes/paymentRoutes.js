const express = require("express");
const crypto = require("crypto");

const Order = require("../models/Order");

const router = express.Router();

/* ======================================
VERIFY PHYSICAL POSTER PAYMENT
====================================== */

router.post("/verify", async (req,res)=>{

try{

const{

razorpay_order_id,
razorpay_payment_id,
razorpay_signature,
orderId

} = req.body;


/* ===============================
VERIFY SIGNATURE
=============================== */

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expected = crypto
.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
.update(body)
.digest("hex");


if(expected !== razorpay_signature){

return res.status(400).json({
success:false,
message:"Payment verification failed"
});

}


/* ===============================
UPDATE ORDER
=============================== */

const order = await Order.findById(orderId);

if(!order){

return res.status(404).json({
success:false,
message:"Order not found"
});

}

order.paymentStatus = "paid";

order.razorpayPaymentId = razorpay_payment_id;

await order.save();


res.json({

success:true,
message:"Payment verified"

});

}catch(err){

console.error("Payment verify error:",err);

res.status(500).json({

success:false,
message:"Server error"

});

}

});

module.exports = router;