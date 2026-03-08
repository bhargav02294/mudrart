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

if(!cart) return res.status(400).json({message:"Cart empty"});

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


const order = new Order({

user:userId,
sessionId,

items:orderItems,

total:calculated.total,

address

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

module.exports = router;