const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existing = await Admin.findOne({ username });
  if (existing) return res.status(400).json({ message: "Admin already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    username,
    password: hashedPassword
  });

  await admin.save();
  res.json({ message: "Admin created successfully" });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;