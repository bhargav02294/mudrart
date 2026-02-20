const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  displayPrice: Number,
  discountedPrice: Number
});

const posterSchema = new mongoose.Schema({
  name: { type: String, required: true },

  images: [String], // max 5

  sizes: {
    A4: sizeSchema,
    A5: sizeSchema,
    "12x18": sizeSchema
  },

  quantity: { type: Number, default: 0 },

  description: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Poster", posterSchema);