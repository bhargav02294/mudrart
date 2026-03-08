const express = require("express");
const crypto = require("crypto");

const Order = require("../models/Order");

const router = express.Router();


router.post("/verify",async(req,res)=>{

const{

razorpay_order_id,
razorpay_payment_id,
razorpay_signature,
orderId

}=req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expected = crypto
.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
.update(body)
.digest("hex");


if(expected !== razorpay_signature){

return res.status(400).json({message:"Payment verification failed"});

}


const order = await Order.findById(orderId);

order.paymentStatus="paid";
order.razorpayPaymentId = razorpay_payment_id;

await order.save();


res.json({success:true});

});

module.exports = router;