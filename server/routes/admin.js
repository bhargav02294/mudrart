const express = require("express");
const router = express.Router();
const Admin = require("../models/admin"); // ✅ Correct path now

// Admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ success: true, message: "Login successful", admin: { username: admin.username } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

module.exports = router;
