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
  { name: "image4", maxCount: 1 },
  { name: "downloadableFile", maxCount: 1 }
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

    // Upload Images
    const thumbnail = await uploadToCloudinary(req.files.thumbnail[0]);

    const image1 = req.files.image1
      ? await uploadToCloudinary(req.files.image1[0])
      : null;

    const image2 = req.files.image2
      ? await uploadToCloudinary(req.files.image2[0])
      : null;

    const image3 = req.files.image3
      ? await uploadToCloudinary(req.files.image3[0])
      : null;

    const image4 = req.files.image4
      ? await uploadToCloudinary(req.files.image4[0])
      : null;

    const downloadableFile = req.files.downloadableFile
      ? await uploadToCloudinary(req.files.downloadableFile[0])
      : null;

    const {
      name,
      productType,
      setCount,
      quantity,
      description,
      downloadPrice
    } = req.body;

    const poster = new Poster({
      name,
      productType: productType || "single",
      setCount: setCount || 1,
      thumbnail,
      image1,
      image2,
      image3,
      image4,
      downloadableFile,
      downloadPrice: downloadPrice || 0,
      quantity,
      description,
      sizes: {} // we will handle dynamic pricing later
    });

    await poster.save();

    res.json({ message: "Poster created successfully", poster });

  } catch (err) {
    console.error("POSTER CREATE ERROR:", err);
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