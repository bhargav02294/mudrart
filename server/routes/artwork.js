const express = require("express");
const router = express.Router();
const Artwork = require("../models/artwork");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

// temporary folder for uploaded files before sending to Cloudinary
const upload = multer({ dest: "uploads/" });

// Helper to upload files to Cloudinary
async function uploadToCloudinary(filePath, folder, resourceType = "image") {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: resourceType,
  });
  fs.unlinkSync(filePath); // delete local temp file
  return result.secure_url;
}

// ✅ Add Artwork
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        description,
        stock,
        price,
        colorFinish,
        weight,
        diameter,
        material,
        coinType,
      } = req.body;

      if (!req.files || !req.files.mainImage) {
        return res.status(400).json({ error: "Main image is required." });
      }

      // Upload main image to Cloudinary
      const mainImageUrl = await uploadToCloudinary(
        req.files.mainImage[0].path,
        "mudrart/artworks",
        "image"
      );

      // Upload additional images if present
      const additionalImages = req.files.additionalImages
        ? await Promise.all(
            req.files.additionalImages.map((file) =>
              uploadToCloudinary(file.path, "mudrart/artworks", "image")
            )
          )
        : [];

      // Upload videos if present
      const videos = req.files.videos
        ? await Promise.all(
            req.files.videos.map((file) =>
              uploadToCloudinary(file.path, "mudrart/videos", "video")
            )
          )
        : [];

      // Save to MongoDB
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
        mainImage: mainImageUrl,
        additionalImages,
        videos,
      });

      await artwork.save();
      res.json({ message: "✅ Artwork added successfully!", artwork });
    } catch (err) {
      console.error("❌ Artwork upload error:", err);
      res
        .status(500)
        .json({ error: "Server error", details: err.message || err.toString() });
    }
  }
);

// ✅ Get All Artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Artwork (and delete from Cloudinary)
router.delete("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: "Artwork not found" });

    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Artwork deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
