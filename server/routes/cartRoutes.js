const express = require("express");
const Cart = require("../models/Cart");
const Poster = require("../models/Poster");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* ADD TO CART */
router.post("/add", async (req, res) => {
  const { posterId, size, quantity, sessionId } = req.body;

  const poster = await Poster.findById(posterId);
  if (!poster) return res.status(404).json({ message: "Poster not found" });

  const price = poster.sizes[size].discountedPrice;

  let cart;

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    cart = await Cart.findOne({ user: decoded.id });
    if (!cart) cart = new Cart({ user: decoded.id, items: [] });
  } else {
    cart = await Cart.findOne({ sessionId });
    if (!cart) cart = new Cart({ sessionId, items: [] });
  }

  const existingItem = cart.items.find(
    item => item.poster.toString() === posterId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ poster: posterId, size, quantity, price });
  }

  await cart.save();
  res.json(cart);
});

/* GET CART */
router.get("/", async (req, res) => {
  const { sessionId } = req.query;

  let cart;

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    cart = await Cart.findOne({ user: decoded.id }).populate("items.poster");
  } else {
    cart = await Cart.findOne({ sessionId }).populate("items.poster");
  }

  res.json(cart || { items: [] });
});

module.exports = router;