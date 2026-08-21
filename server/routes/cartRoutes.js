const express = require("express");
const Cart = require("../models/Cart");
const Poster = require("../models/Poster");
const jwt = require("jsonwebtoken");
const { calculateCart } = require("../util/pricingEngine");

const router = express.Router();

/* ======================================================
   AUTHENTICATED USER HELPER
====================================================== */

function getAuthenticatedUser(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  if (!authHeader.startsWith("Bearer ")) {
    const error = new Error("Invalid authorization format");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Authentication token missing");
    error.statusCode = 401;
    throw error;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error("Authentication token expired or invalid");
    error.statusCode = 401;
    throw error;
  }
}


/* ======================================================
   GET / CREATE CART
====================================================== */

async function getCart(req, sessionId) {

  const user = getAuthenticatedUser(req);

  /* ===============================
     LOGGED-IN USER
  =============================== */

  if (user) {

    let cart = await Cart.findOne({
      user: user.id
    });

    if (!cart) {
      cart = new Cart({
        user: user.id,
        items: []
      });
    }

    return cart;
  }

  /* ===============================
     GUEST USER
  =============================== */

  if (!sessionId) {
    return new Cart({
      items: []
    });
  }

  let cart = await Cart.findOne({
    sessionId
  });

  if (!cart) {
    cart = new Cart({
      sessionId,
      items: []
    });
  }

  return cart;
}


/* ======================================================
   ADD
====================================================== */

router.post("/add", async (req, res) => {

  try {

    const {
      posterId,
      size,
      quantity,
      sessionId
    } = req.body;

    const poster = await Poster.findById(posterId);

    if (!poster) {
      return res.status(404).json({
        message: "Poster not found"
      });
    }

    const unitPrice =
      poster.sizes[size]?.discountedPrice;

    if (!unitPrice) {
      return res.status(400).json({
        message: "Invalid size"
      });
    }

    const cart = await getCart(
      req,
      sessionId
    );

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

    const populated =
      await cart.populate("items.poster");

    res.json(
      calculateCart(populated)
    );

  } catch (err) {

    console.error("CART ADD ERROR:", err);

    res.status(
      err.statusCode || 500
    ).json({
      message: err.message
    });
  }
});


/* ======================================================
   UPDATE QUANTITY
====================================================== */

router.put("/update", async (req, res) => {

  try {

    const {
      posterId,
      size,
      change,
      sessionId
    } = req.body;

    const cart = await getCart(
      req,
      sessionId
    );

    const item = cart.items.find(
      i =>
        i.poster.toString() === posterId &&
        i.size === size
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    item.quantity += change;

    if (item.quantity <= 0) {

      cart.items = cart.items.filter(
        i =>
          !(
            i.poster.toString() === posterId &&
            i.size === size
          )
      );

    }

    await cart.save();

    const populated =
      await cart.populate("items.poster");

    res.json(
      calculateCart(populated)
    );

  } catch (err) {

    console.error(
      "CART UPDATE ERROR:",
      err
    );

    res.status(
      err.statusCode || 500
    ).json({
      message: err.message
    });
  }
});


/* ======================================================
   REMOVE
====================================================== */

router.delete("/remove", async (req, res) => {

  try {

    const {
      posterId,
      size,
      sessionId
    } = req.body;

    const cart = await getCart(
      req,
      sessionId
    );

    cart.items = cart.items.filter(
      i =>
        !(
          i.poster.toString() === posterId &&
          i.size === size
        )
    );

    await cart.save();

    const populated =
      await cart.populate("items.poster");

    res.json(
      calculateCart(populated)
    );

  } catch (err) {

    console.error(
      "CART REMOVE ERROR:",
      err
    );

    res.status(
      err.statusCode || 500
    ).json({
      message: err.message
    });
  }
});


/* ======================================================
   GET CART
====================================================== */

router.get("/", async (req, res) => {

  try {

    const {
      sessionId
    } = req.query;

    const user =
      getAuthenticatedUser(req);

    let cart;

    /* ===============================
       LOGGED-IN USER
    =============================== */

    if (user) {

      cart = await Cart.findOne({
        user: user.id
      });

    }

    /* ===============================
       GUEST USER
    =============================== */

    else if (sessionId) {

      cart = await Cart.findOne({
        sessionId
      });

    }

    /* ===============================
       NO CART
    =============================== */

    if (!cart) {

      return res.json({
        items: [],
        subtotal: 0,
        shipping: 0,
        total: 0,
        totalFreeItems: 0,
        minimumValid: false,
        freeDistribution: []
      });

    }

    /* ===============================
       POPULATE POSTER
    =============================== */

    const populated =
      await cart.populate("items.poster");

    /*
      Remove invalid/deleted poster references.

      This prevents:
      item.poster.thumbnail
      from crashing the frontend.
    */

    populated.items =
      populated.items.filter(
        item => item.poster
      );

    await populated.save();

    /* ===============================
       CALCULATE CART
    =============================== */

    res.json(
      calculateCart(populated)
    );

  } catch (err) {

    console.error(
      "CART GET ERROR:",
      err
    );

    res.status(
      err.statusCode || 500
    ).json({
      message: err.message
    });
  }
});


module.exports = router;