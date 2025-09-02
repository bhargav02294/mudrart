const express = require("express");
const router = express.Router();

// Example admin route
router.get("/", (req, res) => {
    res.json({ message: "Admin API working" });
});

module.exports = router;
