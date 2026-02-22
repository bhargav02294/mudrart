const express = require("express");
const User = require("../models/User");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.get("/", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-otp -otpExpires");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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