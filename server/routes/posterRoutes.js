const express = require("express");
const Poster = require("../models/Poster");
const auth = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* CREATE POSTER */
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      A4_display, A4_discount,
      A5_display, A5_discount,
      size12_display, size12_discount,
      custom_display, custom_discount,
      quantity,
      description
    } = req.body;

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "mudrart" },
        (error, result) => {
          if (error) throw error;
        }
      );
    }

    // Proper upload method
    for (const file of req.files) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "mudrart" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });

      uploadedImages.push(uploadResult.secure_url);
    }

    const poster = new Poster({
      name,
      thumbnail: uploadedImages[0],
      images: uploadedImages.slice(1),
      sizes: {
        A4: { displayPrice: A4_display, discountedPrice: A4_discount },
        A5: { displayPrice: A5_display, discountedPrice: A5_discount },
        "12x18": { displayPrice: size12_display, discountedPrice: size12_discount },
        Custom: { displayPrice: custom_display, discountedPrice: custom_discount }
      },
      quantity,
      description
    });

    await poster.save();
    res.json({ message: "Poster Created", poster });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  const posters = await Poster.find().sort({ createdAt: -1 });
  res.json(posters);
});

module.exports = router;