const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../util/sendMail");

const router = express.Router();

/* ================= SEND OTP ================= */
router.post("/send-otp", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendMail(
      email,
      "MudrArt Login OTP",
      `<h2>Your OTP: ${otp}</h2>
       <p>Valid for 10 minutes.</p>`
    );

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= VERIFY OTP ================= */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;