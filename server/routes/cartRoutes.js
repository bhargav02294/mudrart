const express = require("express");
const Cart = require("../models/Cart");
const Poster = require("../models/Poster");
const jwt = require("jsonwebtoken");

const {
  SINGLE_PRICES,
  SET_PRICES,
  calculateCart
} = require("../util/pricingEngine");

const router = express.Router();

/* ADD TO CART */
router.post("/add", async (req, res) => {
  try {
    const { posterId, size, quantity, sessionId, type, setCount } = req.body;

    const poster = await Poster.findById(posterId);
    if (!poster) return res.status(404).json({ message: "Poster not found" });

    let unitPrice = 0;

    if (type === "single") {
      unitPrice = SINGLE_PRICES[size];
    }

    if (type === "set") {
      unitPrice = SET_PRICES[setCount][size];
    }

    if (!unitPrice)
      return res.status(400).json({ message: "Invalid size or set" });

    let cart;

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      cart = await Cart.findOne({ user: decoded.id });

      if (!cart) cart = new Cart({ user: decoded.id, items: [] });
    } else {
      cart = await Cart.findOne({ sessionId });
      if (!cart) cart = new Cart({ sessionId, items: [] });
    }

    const existingItem = cart.items.find(item =>
      item.poster.toString() === posterId &&
      item.size === size &&
      item.type === type &&
      item.setCount === setCount
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        poster: posterId,
        size,
        quantity,
        type,
        setCount,
        unitPrice
      });
    }

    await cart.save();

    const populatedCart = await cart.populate("items.poster");

    res.json(calculateCart(populatedCart));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET CART */
router.get("/", async (req, res) => {
  try {
    const { sessionId } = req.query;

    let cart;

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      cart = await Cart.findOne({ user: decoded.id }).populate("items.poster");
    } else {
      cart = await Cart.findOne({ sessionId }).populate("items.poster");
    }

    if (!cart) return res.json({ items: [] });

    res.json(calculateCart(cart));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;