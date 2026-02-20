const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: String,
  username: String,
  fullname: String,
  mobile: String,
  email: String,
  password: String,
  wishlist: [
    {
      artworkId: String,
      title: String,
      price: Number,
      image: String,
    },
  ],
  cart: [
    {
      artworkId: String,
      title: String,
      price: Number,
      image: String,
      qty: Number,
    },
  ]
});

module.exports = mongoose.model("User", userSchema);
