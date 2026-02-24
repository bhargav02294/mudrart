const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  displayPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true }
}, { _id: false });

const posterSchema = new mongoose.Schema({

  name: { type: String, required: true },

  productType: {
    type: String,
    enum: ["single", "set", "polarized"],
    required: true
  },

  setCount: {
    type: Number,
    default: 1
  },

  thumbnail: { type: String, required: true },
  image1: String,
  image2: String,
  image3: String,
  image4: String,

  downloadableFile: String,   // digital file
  downloadPrice: {
    type: Number,
    default: 0
  },

  sizes: {
    A6: sizeSchema,
    A5: sizeSchema,
    A4: sizeSchema,
    A3: sizeSchema
  },

  quantity: { type: Number, required: true },
  description: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Poster", posterSchema);