const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poster"
  },

  type: {
    type: String,
    enum: ["single", "set"],
    required: true
  },

  size: String, // A5, A4, 12x18

  setCount: {
    type: Number,
    default: 1 // 1 = single poster, 2 = 2-set, 3 = 3-set, etc.
  },

  quantity: {
    type: Number,
    required: true
  },

  unitPrice: {
    type: Number,
    required: true
  }

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