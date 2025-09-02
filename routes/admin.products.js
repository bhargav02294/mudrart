// routes/admin.products.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Product from "../models/Product.js";
import { body, param, validationResult } from "express-validator";
import { toSlug } from "../utils/slugify.js";

const router = Router();

// ---------- Multer (local uploads to /uploads) ----------
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // .jpg/.png/.webp
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB
});

// ---------- Helpers ----------
function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
}

// ---------- Create a product ----------
router.post(
  "/",
  upload.array("images", 6),
  body("title").isString().isLength({ min: 2 }),
  body("price").isFloat({ min: 0 }),
  async (req, res) => {
    const err = handleValidation(req, res);
    if (err) return;

    try {
      const {
        title,
        slug,
        description = "",
        category = "Painting",
        tags = "",
        year,
        rarity = "Common",
        attributes = {},
        price,
        compareAt,
        stock = 1,
        isLimited = false,
        limitedTotal = 0,
        status = "draft",
        publishedAt
      } = req.body;

      const images = (req.files || []).map((f) => ({
        url: `/uploads/${f.filename}`,
        alt: title
      }));

      const product = await Product.create({
        title,
        slug: slug ? toSlug(slug) : undefined,
        description,
        category,
        tags:
          typeof tags === "string"
            ? tags
                .split(",")
                .map((s) => s.trim().toLowerCase())
                .filter(Boolean)
            : tags,
        year: year ? Number(year) : undefined,
        rarity,
        attributes:
          typeof attributes === "string"
            ? JSON.parse(attributes || "{}")
            : attributes,
        price: Number(price),
        compareAt: compareAt ? Number(compareAt) : undefined,
        stock: Number(stock),
        isLimited: isLimited === "true" || isLimited === true,
        limitedTotal: Number(limitedTotal) || 0,
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        images,
        createdBy: req.user?.id
      });

      return res.status(201).json(product);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Create failed", error: e.message });
    }
  }
);

// ---------- Update a product ----------
router.put(
  "/:id",
  upload.array("images", 6),
  param("id").isMongoId(),
  body("title").optional().isString().isLength({ min: 2 }),
  body("price").optional().isFloat({ min: 0 }),
  async (req, res) => {
    const err = handleValidation(req, res);
    if (err) return;

    try {
      const update = { ...req.body };

      if (update.slug) update.slug = toSlug(update.slug);
      if (update.tags && typeof update.tags === "string") {
        update.tags = update.tags
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);
      }
      if (update.attributes && typeof update.attributes === "string") {
        update.attributes = JSON.parse(update.attributes || "{}");
      }
      if (update.price) update.price = Number(update.price);
      if (update.compareAt) update.compareAt = Number(update.compareAt);
      if (update.stock) update.stock = Number(update.stock);
      if ("isLimited" in update)
        update.isLimited = update.isLimited === "true" || update.isLimited === true;
      if (update.limitedTotal) update.limitedTotal = Number(update.limitedTotal);
      if (update.publishedAt) update.publishedAt = new Date(update.publishedAt);

      // Append newly uploaded images (if any)
      if (req.files?.length) {
        const newImgs = req.files.map((f) => ({
          url: `/uploads/${f.filename}`,
          alt: update.title || "Artwork"
        }));
        update.$push = { images: { $each: newImgs } };
      }

      const product = await Product.findByIdAndUpdate(req.params.id, update, {
        new: true
      });
      if (!product) return res.status(404).json({ message: "Not found" });
      return res.json(product);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Update failed", error: e.message });
    }
  }
);

// ---------- Replace all images (optional helper) ----------
router.put(
  "/:id/images",
  upload.array("images", 6),
  param("id").isMongoId(),
  async (req, res) => {
    const err = handleValidation(req, res);
    if (err) return;

    try {
      const images = (req.files || []).map((f) => ({
        url: `/uploads/${f.filename}`,
        alt: "Artwork"
      }));
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { images },
        { new: true }
      );
      if (!product) return res.status(404).json({ message: "Not found" });
      return res.json(product);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Image update failed", error: e.message });
    }
  }
);

// ---------- Publish / Unpublish ----------
router.patch("/:id/publish", param("id").isMongoId(), async (req, res) => {
  const err = handleValidation(req, res);
  if (err) return;

  try {
    const { status } = req.body; // "active" or "draft" or "archived"
    const patch = { status };
    if (status === "active" && !req.body.publishedAt) {
      patch.publishedAt = new Date();
    }
    const product = await Product.findByIdAndUpdate(req.params.id, patch, {
      new: true
    });
    if (!product) return res.status(404).json({ message: "Not found" });
    return res.json(product);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Publish failed", error: e.message });
  }
});

// ---------- Delete ----------
router.delete("/:id", param("id").isMongoId(), async (req, res) => {
  const err = handleValidation(req, res);
  if (err) return;

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Delete failed", error: e.message });
  }
});

// ---------- List (admin view with drafts) ----------
router.get("/", async (req, res) => {
  const { q = "", status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  if (q) {
    filter.$or = [
      { title: new RegExp(q, "i") },
      { description: new RegExp(q, "i") },
      { tags: { $in: [new RegExp(q, "i")] } }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({
    items,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    }
  });
});

export default router;
