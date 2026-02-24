const express = require("express");
const Cart = require("../models/Cart");
const Poster = require("../models/Poster");
const jwt = require("jsonwebtoken");
const { calculateCart } = require("../util/pricingEngine");

const router = express.Router();

/* Helper: get cart */
async function getCart(req, sessionId) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let cart = await Cart.findOne({ user: decoded.id });
    if (!cart) cart = new Cart({ user: decoded.id, items: [] });
    return cart;
  } else {
    let cart = await Cart.findOne({ sessionId });
    if (!cart) cart = new Cart({ sessionId, items: [] });
    return cart;
  }
}

/* ADD */
router.post("/add", async (req, res) => {
  try {
    const { posterId, size, quantity, sessionId } = req.body;

    const poster = await Poster.findById(posterId);
    if (!poster) return res.status(404).json({ message: "Poster not found" });

    const unitPrice = poster.sizes[size]?.discountedPrice;
    if (!unitPrice)
      return res.status(400).json({ message: "Invalid size" });

    const cart = await getCart(req, sessionId);

    const existing = cart.items.find(
      i =>
        i.poster.toString() === posterId &&
        i.size === size
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        poster: posterId,
        size,
        quantity,
        type: "single",
        setCount: 1,
        unitPrice
      });
    }

    await cart.save();
    const populated = await cart.populate("items.poster");
    res.json(calculateCart(populated));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE QUANTITY */
router.put("/update", async (req, res) => {
  try {
    const { posterId, size, change, sessionId } = req.body;

    const cart = await getCart(req, sessionId);

    const item = cart.items.find(
      i =>
        i.poster.toString() === posterId &&
        i.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += change;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        i =>
          !(i.poster.toString() === posterId && i.size === size)
      );
    }

    await cart.save();
    const populated = await cart.populate("items.poster");
    res.json(calculateCart(populated));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* REMOVE */
router.delete("/remove", async (req, res) => {
  try {
    const { posterId, size, sessionId } = req.body;

    const cart = await getCart(req, sessionId);

    cart.items = cart.items.filter(
      i =>
        !(i.poster.toString() === posterId && i.size === size)
    );

    await cart.save();
    const populated = await cart.populate("items.poster");
    res.json(calculateCart(populated));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET */
router.get("/", async (req, res) => {
  try {
    const { sessionId } = req.query;

    let cart;

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      cart = await Cart.findOne({ user: decoded.id });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) return res.json({
      items: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      totalFreeItems: 0,
      minimumValid: false
    });

    const populated = await cart.populate("items.poster");
    res.json(calculateCart(populated));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;