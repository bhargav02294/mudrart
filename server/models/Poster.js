const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Poster", posterSchema);