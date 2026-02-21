const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = new User({
    name,
    email,
    password: hashed,
    otp,
    otpExpires: Date.now() + 10 * 60 * 1000
  });

  await user.save();

  await sendMail(
    email,
    "MudrArt OTP Verification",
    `<h2>Your OTP: ${otp}</h2><p>Valid for 10 minutes.</p>`
  );

  res.json({ message: "OTP sent to email" });
});

/* VERIFY OTP */
router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(400).json({ message: "Verify email first" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token });
});

module.exports = router;