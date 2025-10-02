// server/models/artwork.js
const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  colorFinish: { type: String },
  weight: { type: Number },
  diameter: { type: Number },
  material: { type: String },
  coinType: { type: String },
  mainImage: { type: String, required: true },
  additionalImages: [String],
  videos: [String]
}, { timestamps: true });

module.exports = mongoose.model("Artwork", artworkSchema);
