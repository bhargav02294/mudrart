const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  mobile: String,
  addressLine1: String,
  addressLine2: String,
  area: String,
  district: String,
  state: String,
  pincode: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },

  gender: String,
  dob: Date,

  address: addressSchema,

  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);