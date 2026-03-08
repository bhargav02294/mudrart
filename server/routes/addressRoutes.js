const express = require("express");
const jwt = require("jsonwebtoken");

const Address = require("../models/Address");
const User = require("../models/User");

const router = express.Router();

/* ===============================
   GET ADDRESS
=============================== */

router.get("/", async (req, res) => {

  try {

    const { sessionId } = req.query;

    /* logged user */

    if (req.headers.authorization) {

      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      return res.json(user.address || {});
    }

    /* guest user */

    const address = await Address.findOne({ sessionId });

    res.json(address || {});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});


/* ===============================
   SAVE / UPDATE ADDRESS
=============================== */

router.post("/", async (req, res) => {

  try {

    const { sessionId, address } = req.body;

    /* logged user */

    if (req.headers.authorization) {

      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      user.address = address;

      await user.save();

      return res.json(user.address);
    }

    /* guest */

    let addr = await Address.findOne({ sessionId });

    if (!addr) {

      addr = new Address({
        sessionId,
        ...address
      });

    } else {

      Object.assign(addr, address);

    }

    await addr.save();

    res.json(addr);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

module.exports = router;