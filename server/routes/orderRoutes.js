const express = require("express");
const jwt = require("jsonwebtoken");

const Cart = require("../models/Cart");
const Order = require("../models/Order");

const razorpay = require("../config/razorpay");

const {calculateCart} = require("../util/pricingEngine");

const router = express.Router();


router.post("/create",async(req,res)=>{

try{

const {sessionId,address} = req.body;

let userId=null;

if(req.headers.authorization){

const token = req.headers.authorization.split(" ")[1];

const decoded = jwt.verify(token,process.env.JWT_SECRET);

userId = decoded.id;

}

let cart;

if(userId){

cart = await Cart.findOne({user:userId});

}else{

cart = await Cart.findOne({sessionId});

}

if(!cart){
return res.status(400).json({message:"Cart empty"});
}

const populated = await cart.populate("items.poster");

const calculated = calculateCart(populated);

const orderItems = calculated.items.map(item=>({

posterId:item.poster._id,
name:item.poster.name,
size:item.size,
quantity:item.payableQty,
price:item.unitPrice,
thumbnail:item.poster.thumbnail

}));

if(
!address.name ||
!address.mobile ||
!address.addressLine1 ||
!address.area ||
!address.district ||
!address.state ||
!address.pincode
){
return res.status(400).json({message:"Complete address required"});
}

const order = new Order({

user:userId,
sessionId,

items:orderItems,

total:calculated.total,

address,

paymentStatus:"pending",

orderStatus:"Processing",

deliveryEstimate:new Date(
Date.now() + 7 * 24 * 60 * 60 * 1000
)

});

await order.save();


const razorpayOrder = await razorpay.orders.create({

amount:calculated.total * 100,
currency:"INR",
receipt:order._id.toString()

});

order.razorpayOrderId = razorpayOrder.id;

await order.save();


res.json({

orderId:order._id,
razorpayOrderId:razorpayOrder.id,
amount:calculated.total,
key:process.env.RAZORPAY_KEY_ID

});

}catch(err){

res.status(500).json({message:err.message});

}

});




router.get("/my", async (req, res) => {

try{

if(!req.headers.authorization){
return res.json([]);
}

const token = req.headers.authorization.split(" ")[1];

const decoded = jwt.verify(token,process.env.JWT_SECRET);

const orders = await Order.find({

user:decoded.id

})
.sort({createdAt:-1});

res.json(orders);

}catch(err){

console.error("Fetch orders error:",err);

res.status(500).json({message:"Server error"});

}

});



module.exports = router;