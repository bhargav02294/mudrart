const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mainImage: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  colorFinish: { type: String, required: true },
  weight: { type: Number, required: true },
  diameter: { type: Number, required: true },
  material: { type: String, required: true },
  coinType: { type: String, required: true },
  additionalImages: [String],
  videos: [String]
}, { timestamps: true });

module.exports = mongoose.model("Artwork", artworkSchema);
