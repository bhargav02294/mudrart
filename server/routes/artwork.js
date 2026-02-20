const express = require("express");
const router = express.Router();
const Artwork = require("../models/artwork");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    cb(null, `${timestamp}_${cleanName}`);
  }
});
const upload = multer({ storage });

// ADD Artwork
router.post("/", upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 5 },
  { name: "videos", maxCount: 2 }
]), async (req, res) => {
  try {
    console.log("POST /api/artworks body:", req.body);
    console.log("POST /api/artworks files:", req.files);

    const { title, description, stock, price, colorFinish, weight, diameter, material, coinType } = req.body;

    if (!req.files || !req.files.mainImage)
      return res.status(400).json({ error: "Main image is required." });

    const artwork = new Artwork({
      title, description, stock, price,
      colorFinish, weight, diameter, material, coinType,
      mainImage: `/uploads/${req.files.mainImage[0].filename}`,
      additionalImages: req.files.additionalImages
        ? req.files.additionalImages.map(f => `/uploads/${f.filename}`)
        : [],
      videos: req.files.videos
        ? req.files.videos.map(f => `/uploads/${f.filename}`)
        : []
    });

    await artwork.save();
    res.json({ message: "Artwork added successfully", artwork });
  } catch (err) {
    console.error("❌ POST /api/artworks failed:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


// GET All Artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    const host = `${req.protocol}://${req.get("host")}`;

    const artworksWithUrls = artworks.map(a => ({
      ...a._doc,
      mainImage: a.mainImage ? host + a.mainImage : null,
      additionalImages: Array.isArray(a.additionalImages)
        ? a.additionalImages.map(img => host + img)
        : [],
      videos: Array.isArray(a.videos) ? a.videos.map(v => host + v) : []
    }));

    console.log("✅ GET /api/artworks success, total:", artworks.length);
    res.json(artworksWithUrls);
  } catch (err) {
    console.error("❌ GET /api/artworks failed:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


// DELETE Artwork
router.delete("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: "Artwork not found" });

    const filesToDelete = [
      artwork.mainImage,
      ...(artwork.additionalImages || []),
      ...(artwork.videos || [])
    ];

    filesToDelete.forEach(filePath => {
      try {
        const relativePath = filePath.replace(/^\/uploads\//, "");
        const fullPath = path.join(__dirname, "../uploads", relativePath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      } catch (err) {
        console.warn("Failed to delete file:", filePath, err.message);
      }
    });

    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: "Artwork deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
