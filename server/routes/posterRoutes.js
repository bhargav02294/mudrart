const express = require("express");
const Poster = require("../models/Poster");
const auth = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", auth, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 }
]), async (req, res) => {
  try {
    const uploadToCloudinary = async (file) => {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "mudrart" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });
      return result.secure_url;
    };

    const thumbnail = await uploadToCloudinary(req.files.thumbnail[0]);

    const image1 = req.files.image1 ? await uploadToCloudinary(req.files.image1[0]) : null;
    const image2 = req.files.image2 ? await uploadToCloudinary(req.files.image2[0]) : null;
    const image3 = req.files.image3 ? await uploadToCloudinary(req.files.image3[0]) : null;
    const image4 = req.files.image4 ? await uploadToCloudinary(req.files.image4[0]) : null;

    const {
      name,
      A4_display, A4_discount,
      A5_display, A5_discount,
      size12_display, size12_discount,
      custom_display, custom_discount,
      quantity,
      description
    } = req.body;

    const poster = new Poster({
      name,
      thumbnail,
      image1,
      image2,
      image3,
      image4,
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
    res.json({ message: "Poster created", poster });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const posters = await Poster.find().sort({ createdAt: -1 });
  res.json(posters);
});

router.delete("/:id", auth, async (req, res) => {
  await Poster.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;