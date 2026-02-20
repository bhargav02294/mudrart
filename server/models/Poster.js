const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  displayPrice: Number,
  discountedPrice: Number
});

const posterSchema = new mongoose.Schema({
  name: { type: String, required: true },

  thumbnail: String, // first image

  images: [String], // other 4 images

  sizes: {
    A4: sizeSchema,
    A5: sizeSchema,
    "12x18": sizeSchema,
    Custom: sizeSchema
  },

  quantity: Number,
  description: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Poster", posterSchema);