const express = require("express");
const router = express.Router();
const Artwork = require("../models/artwork");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

// Temporary upload directory before Cloudinary
const upload = multer({ dest: "uploads/" });

// Helper for Cloudinary uploads
async function uploadToCloudinary(file, folder, type = "image") {
  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: type,
  });
  fs.unlinkSync(file.path); // remove temp file
  return result.secure_url;
}

// ========== ADD ARTWORK ==========
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  async (req, res) => {
    try {
      const { title, description, stock, price, colorFinish, weight, diameter, material, coinType } = req.body;

      if (!req.files || !req.files.mainImage) {
        return res.status(400).json({ error: "Main image required" });
      }

      // Upload to Cloudinary
      const mainImage = await uploadToCloudinary(req.files.mainImage[0], "mudrart/artworks", "image");

      const additionalImages = req.files.additionalImages
        ? await Promise.all(
            req.files.additionalImages.map((f) => uploadToCloudinary(f, "mudrart/artworks", "image"))
          )
        : [];

      const videos = req.files.videos
        ? await Promise.all(req.files.videos.map((f) => uploadToCloudinary(f, "mudrart/videos", "video")))
        : [];

      const artwork = new Artwork({
        title,
        description,
        stock,
        price,
        colorFinish,
        weight,
        diameter,
        material,
        coinType,
        mainImage,
        additionalImages,
        videos,
      });

      await artwork.save();
      res.json({ message: "✅ Artwork added successfully", artwork });
    } catch (err) {
      console.error("❌ Upload failed:", err);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
);

// ========== GET ARTWORKS ==========
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== DELETE ARTWORK ==========
router.delete("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: "Not found" });
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Artwork deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
