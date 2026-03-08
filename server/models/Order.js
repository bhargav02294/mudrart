const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

posterId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Poster"
},

name:String,

size:String,

quantity:Number,

price:Number,

thumbnail:String

},{_id:false});


const addressSchema = new mongoose.Schema({

name:String,
mobile:String,

addressLine1:String,
addressLine2:String,

area:String,
district:String,
state:String,
pincode:String

},{_id:false});


const orderSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
default:null
},

sessionId:String,

items:[orderItemSchema],

total:Number,

paymentStatus:{
type:String,
enum:["pending","paid"],
default:"pending"
},

orderStatus:{
type:String,
enum:["processing","shipped","delivered"],
default:"processing"
},

deliveryEstimate:{
type:String,
default:"7 - 10 Days"
},

address:addressSchema,

razorpayOrderId:String,
razorpayPaymentId:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Order",orderSchema);