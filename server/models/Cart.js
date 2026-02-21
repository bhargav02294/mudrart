const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poster"
  },
  size: String,
  quantity: Number,
  price: Number
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  sessionId: {
    type: String,
    default: null
  },
  items: [cartItemSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Cart", cartSchema);