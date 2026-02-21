const express = require("express");
const User = require("../models/User");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* GET PROFILE */
router.get("/", userAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-otp -otpExpires");
  res.json(user);
});

/* UPDATE PROFILE */
router.put("/", userAuth, async (req, res) => {
  const updates = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true }
  );

  res.json(user);
});

module.exports = router;