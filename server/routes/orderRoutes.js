const express = require("express");
const jwt = require("jsonwebtoken");

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const razorpay = require("../config/razorpay");

const { calculateCart } = require("../util/pricingEngine");

const router = express.Router();

/* =========================================
CREATE ORDER
========================================= */

router.post("/create", async (req, res) => {
  try {

    const { sessionId, address } = req.body;

    let userId = null;

    /* =========================
       AUTH USER
    ========================== */

    if (req.headers.authorization) {

      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      userId = decoded.id;
    }

    /* =========================
       GET CART
    ========================== */

    let cart;

    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else {
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(400).json({
        message: "Cart empty"
      });
    }

    /* =========================
       POPULATE POSTERS
    ========================== */

    const populatedCart = await cart.populate("items.poster");

    if (!populatedCart.items || populatedCart.items.length === 0) {
      return res.status(400).json({
        message: "Cart items missing"
      });
    }

    /* =========================
       CALCULATE CART
    ========================== */

    const calculated = calculateCart(populatedCart);

    if (!calculated || !calculated.items) {
      return res.status(500).json({
        message: "Cart calculation failed"
      });
    }

    /* =========================
       CREATE ORDER ITEMS
    ========================== */

    const orderItems = calculated.items.map(item => {

      if (!item.poster) {
        throw new Error("Poster missing in cart item");
      }

      return {

        posterId: item.poster._id,
        name: item.poster.name,
        size: item.size,
        quantity: item.payableQty,
        price: item.unitPrice,
        thumbnail: item.poster.thumbnail

      };

    });

    /* =========================
       VALIDATE ADDRESS
    ========================== */

    if (
      !address ||
      !address.name ||
      !address.mobile ||
      !address.addressLine1 ||
      !address.area ||
      !address.district ||
      !address.state ||
      !address.pincode
    ) {

      return res.status(400).json({
        message: "Complete address required"
      });

    }

    /* =========================
       CREATE ORDER
    ========================== */

    const order = new Order({

      user: userId,
      sessionId,

      items: orderItems,

      total: calculated.total,

      address,

      paymentStatus: "pending",

      orderStatus: "Processing",

      deliveryEstimate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      )

    });

    await order.save();

    /* =========================
       CREATE RAZORPAY ORDER
    ========================== */

    if (!process.env.RAZORPAY_KEY_ID) {
      throw new Error("Razorpay key missing in environment");
    }

    const razorpayOrder = await razorpay.orders.create({

      amount: calculated.total * 100,
      currency: "INR",
      receipt: order._id.toString()

    });

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    /* =========================
       SEND RESPONSE
    ========================== */

    res.json({

      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: calculated.total,
      key: process.env.RAZORPAY_KEY_ID

    });

  } catch (err) {

    console.error("ORDER CREATE ERROR:", err);

    res.status(500).json({
      message: err.message
    });

  }
});


/* =========================================
GET USER ORDERS
========================================= */

router.get("/my", async (req, res) => {

  try {

    if (!req.headers.authorization) {
      return res.json([]);
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const orders = await Order.find({
      user: decoded.id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    console.error("FETCH ORDERS ERROR:", err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;