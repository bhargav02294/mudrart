const mongoose = require("mongoose");

const digitalOrderSchema = new mongoose.Schema({

posterId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Poster",
required:true
},

posterName:String,

thumbnail:String,

price:Number,

buyerEmail:String,

buyerMobile:String,

downloadUrl:String,

paymentStatus:{
type:String,
default:"pending"
},

razorpayOrderId:String,
razorpayPaymentId:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("DigitalOrder",digitalOrderSchema);