// C:\Users\bharg\mudrart\server\routes\artwork.js
const express = require("express");
const router = express.Router();
const Artwork = require("../models/artwork");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

// temporary folder for multer uploads before Cloudinary
const TEMP_DIR = path.join(__dirname, "..", "temp_uploads");
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    const ts = Date.now();
    const safe = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    cb(null, `${ts}_${safe}`);
  }
});
const upload = multer({ storage });

// POST /api/artworks  -> uploads to Cloudinary
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
    { name: "videos", maxCount: 5 }
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
        coinType
      } = req.body;

      if (!req.files || !req.files.mainImage || !req.files.mainImage[0]) {
        return res.status(400).json({ error: "Main image required" });
      }

      // Upload main image
      const mainPath = req.files.mainImage[0].path;
      const mainUpload = await cloudinary.uploader.upload(mainPath, {
        folder: "mudrart/artworks"
      });

      // Upload additional images
      const addUploads = (req.files.additionalImages || []).map(f => f.path);
      const addResults = [];
      for (const p of addUploads) {
        const r = await cloudinary.uploader.upload(p, { folder: "mudrart/artworks" });
        addResults.push(r.secure_url);
      }

      // Upload videos (resource_type: video)
      const vidUploads = (req.files.videos || []).map(f => f.path);
      const vidResults = [];
      for (const p of vidUploads) {
        const r = await cloudinary.uploader.upload(p, {
          folder: "mudrart/videos",
          resource_type: "video"
        });
        vidResults.push(r.secure_url);
      }

      // Create DB document with secure URLs
      const artwork = new Artwork({
        title,
        description,
        stock: Number(stock) || 0,
        price: Number(price) || 0,
        colorFinish,
        weight: Number(weight) || undefined,
        diameter: Number(diameter) || undefined,
        material,
        coinType,
        mainImage: mainUpload.secure_url,
        additionalImages: addResults,
        videos: vidResults
      });

      await artwork.save();

      // cleanup temp files
      Object.keys(req.files || {}).forEach(key => {
        (req.files[key] || []).forEach(f => {
          try { fs.unlinkSync(f.path); } catch (e) { /* noop */ }
        });
      });

      res.json({ message: "Artwork uploaded", artwork });
    } catch (err) {
      console.error("Artwork upload error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /api/artworks -> returns DB objects (mainImage, additionalImages, videos are full secure URLs already)
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE (simple) - does not remove from Cloudinary (optional: implement public_id deletes later)
router.delete("/:id", async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
