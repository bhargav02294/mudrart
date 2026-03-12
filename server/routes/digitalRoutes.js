const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const Poster = require("../models/Poster");
const DigitalOrder = require("../models/DigitalOrder");

const sendMail = require("../util/sendMail");

const router = express.Router();

const razorpay = new Razorpay({
key_id:process.env.RAZORPAY_KEY_ID,
key_secret:process.env.RAZORPAY_KEY_SECRET
});


/* ============================
CREATE DIGITAL ORDER
============================ */

router.post("/create",async(req,res)=>{

try{

const {posterId,email,mobile} = req.body;

const poster = await Poster.findById(posterId);

if(!poster) return res.status(404).json({message:"Poster not found"});


const price = poster.downloadPrice;

/* create secure token */

const token = crypto.randomBytes(32).toString("hex");


const order = new DigitalOrder({

posterId:poster._id,

posterName:poster.name,

thumbnail:poster.thumbnail,

price,

buyerEmail:email,

buyerMobile:mobile,

downloadUrl:poster.downloadableFile,

downloadToken:token

});

await order.save();


const razorpayOrder = await razorpay.orders.create({

amount:price * 100,

currency:"INR",

receipt:order._id.toString()

});


order.razorpayOrderId = razorpayOrder.id;

await order.save();


res.json({

orderId:order._id,

razorpayOrderId:razorpayOrder.id,

amount:price,

key:process.env.RAZORPAY_KEY_ID

});

}catch(err){

res.status(500).json({message:err.message});

}

});


/* ============================
VERIFY DIGITAL PAYMENT
============================ */

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


const order = await DigitalOrder.findById(orderId);

order.paymentStatus="paid";

order.razorpayPaymentId = razorpay_payment_id;

await order.save();


/* secure download link */

const downloadLink = `${process.env.BASE_URL}/api/download/${order.downloadToken}`;


/* ============================
SEND EMAIL WITH SECURE LINK
============================ */

await sendMail(

order.buyerEmail,

"Your Mudrart Digital Poster",

`
<h2>Thank you for your purchase</h2>

<p>Your download is ready.</p>

<p>
<a href="${downloadLink}" style="padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">
Download Poster
</a>
</p>

<p>Poster: ${order.posterName}</p>

<p>This download link is secure.</p>

`

);


res.json({success:true});

});



/* ============================
GET DIGITAL ORDERS
============================ */

router.get("/my", async (req,res)=>{

try{

const { email } = req.query;

if(!email){
return res.status(400).json({message:"Email required"});
}

const orders = await DigitalOrder.find({
buyerEmail:email,
paymentStatus:"paid"
}).sort({createdAt:-1});

res.json(orders);

}catch(err){

res.status(500).json({message:err.message});

}

});

module.exports = router;