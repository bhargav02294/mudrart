const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({

  sessionId: {
    type: String,
    required: true,
    unique: true
  },

  name: String,
  mobile: String,

  addressLine1: String,
  addressLine2: String,

  area: String,
  district: String,
  state: String,
  pincode: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Address", addressSchema);