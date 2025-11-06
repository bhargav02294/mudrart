const express = require("express");
const router = express.Router();
const Artwork = require("../models/artwork");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

// Multer temp upload (Cloudinary will store permanently)
const upload = multer({ dest: "uploads/" });

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
      const mainUpload = await cloudinary.uploader.upload(
        req.files.mainImage[0].path,
        { folder: "mudrart/artworks", resource_type: "image" }
      );

      // Upload additional images
      const additionalUploads = req.files.additionalImages
        ? await Promise.all(
            req.files.additionalImages.map((f) =>
              cloudinary.uploader.upload(f.path, {
                folder: "mudrart/artworks",
                resource_type: "image",
              })
            )
          )
        : [];

      // Upload videos
      const videoUploads = req.files.videos
        ? await Promise.all(
            req.files.videos.map((f) =>
              cloudinary.uploader.upload(f.path, {
                folder: "mudrart/videos",
                resource_type: "video",
              })
            )
          )
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
        mainImage: mainUpload.secure_url,
        additionalImages: additionalUploads.map((a) => a.secure_url),
        videos: videoUploads.map((v) => v.secure_url),
      });

      await artwork.save();

      // cleanup temp files
      Object.values(req.files).flat().forEach((file) => fs.unlinkSync(file.path));

      res.json({ message: "✅ Artwork added successfully!", artwork });
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
);

// ✅ Get all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete artwork (also delete from Cloudinary)
router.delete("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: "Artwork not found" });

    // optional: extract public_ids to delete from Cloudinary
    const extractPublicId = (url) => {
      const match = url.match(/\/([^/]+)\.[a-z]+$/i);
      return match ? match[1] : null;
    };

    const allFiles = [
      artwork.mainImage,
      ...(artwork.additionalImages || []),
      ...(artwork.videos || []),
    ];

    for (const url of allFiles) {
      const publicId = extractPublicId(url);
      if (publicId)
        await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
    }

    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Artwork and media deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
