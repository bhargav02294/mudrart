const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  displayPrice: Number,
  discountedPrice: Number
});

const posterSchema = new mongoose.Schema({
  name: { type: String, required: true },

  thumbnail: { type: String, required: true },
  image1: String,
  image2: String,
  image3: String,
  image4: String,

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