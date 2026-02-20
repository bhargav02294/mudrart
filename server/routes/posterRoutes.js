const express = require("express");
const Poster = require("../models/Poster");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "server/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE
router.post("/", auth, upload.single("image"), async (req, res) => {
  const { title, description, price } = req.body;

  const poster = new Poster({
    title,
    description,
    price,
    image: req.file.filename
  });

  await poster.save();
  res.json(poster);
});

// GET ALL (Public)
router.get("/", async (req, res) => {
  const posters = await Poster.find().sort({ createdAt: -1 });
  res.json(posters);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Poster.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;