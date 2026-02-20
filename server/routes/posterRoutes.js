const express = require("express");
const Poster = require("../models/Poster");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

/* STORAGE */
const storage = multer.diskStorage({
  destination: "server/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { files: 5 }
});

/* CREATE POSTER */
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      A4_display,
      A4_discount,
      A5_display,
      A5_discount,
      size12_display,
      size12_discount,
      quantity,
      description
    } = req.body;

    const imageFiles = req.files.map(file => file.filename);

    const poster = new Poster({
      name,
      images: imageFiles,
      sizes: {
        A4: {
          displayPrice: A4_display,
          discountedPrice: A4_discount
        },
        A5: {
          displayPrice: A5_display,
          discountedPrice: A5_discount
        },
        "12x18": {
          displayPrice: size12_display,
          discountedPrice: size12_discount
        }
      },
      quantity,
      description
    });

    await poster.save();
    res.json({ message: "Poster created", poster });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET ALL POSTERS (ADMIN + PUBLIC) */
router.get("/", async (req, res) => {
  const posters = await Poster.find().sort({ createdAt: -1 });
  res.json(posters);
});

/* DELETE */
router.delete("/:id", auth, async (req, res) => {
  await Poster.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;