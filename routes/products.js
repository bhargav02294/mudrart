import express from "express";
import multer from "multer";
import path from "path";
import slugify from "slugify";
import Product from "../models/Product.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// ------- Multer local disk storage -------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});
const upload = multer({ storage });

// ------- Helpers -------
function makeSlug(title) {
  return slugify(title, { lower: true, strict: true });
}
function buildImages(files) {
  return (files || []).map((f) => ({ url: `/uploads/${f.filename}`, alt: "" }));
}

// -------------------- ADMIN ONLY --------------------

// Create product
router.post(
  "/admin/products",
  requireAuth,
  requireAdmin,
  upload.array("images", 6),
  async (req, res) => {
    try {
      const {
        title,
        description = "",
        category = "Coin",
        tags = "",
        year,
        rarity = "Common",
        attributes,
        price,
        compareAt,
        stock = 0,
        isLimited = false,
        limitedTotal = 0,
        status = "draft",
        publishedAt,
      } = req.body;

      if (!title || !price) return res.status(400).json({ message: "Title & price required" });

      const slug = makeSlug(title);
      const exists = await Product.findOne({ slug });
      if (exists) return res.status(400).json({ message: "Slug already exists (choose different title)" });

      let attrs = {};
      try {
        if (attributes) attrs = JSON.parse(attributes);
      } catch {
        // ignore
      }

      const doc = await Product.create({
        title,
        slug,
        description,
        category,
        tags: String(tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        year: year ? Number(year) : undefined,
        rarity,
        attributes: attrs,
        price: Number(price),
        compareAt: compareAt ? Number(compareAt) : undefined,
        stock: Number(stock) || 0,
        isLimited: isLimited === "true" || isLimited === true,
        limitedTotal: Number(limitedTotal) || 0,
        images: buildImages(req.files),
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      });

      res.status(201).json(doc);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Create failed" });
    }
  }
);

// Update product
router.put(
  "/admin/products/:id",
  requireAuth,
  requireAdmin,
  upload.array("images", 6),
  async (req, res) => {
    try {
      const p = await Product.findById(req.params.id);
      if (!p) return res.status(404).json({ message: "Not found" });

      const body = { ...req.body };

      // optional JSON fields
      if (body.attributes) {
        try {
          body.attributes = JSON.parse(body.attributes);
        } catch {
          delete body.attributes;
        }
      }
      // comma tags -> array
      if (body.tags) {
        body.tags = String(body.tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }

      // numbers
      ["price", "compareAt", "stock", "limitedTotal", "year"].forEach((k) => {
        if (body[k] !== undefined && body[k] !== "") body[k] = Number(body[k]);
      });
      if (body.isLimited !== undefined) {
        body.isLimited = body.isLimited === "true" || body.isLimited === true;
      }
      if (body.publishedAt) body.publishedAt = new Date(body.publishedAt);

      // images add (append)
      const newImgs = buildImages(req.files);
      if (newImgs.length) body.$push = { images: { $each: newImgs } };

      // if title updated, update slug
      if (body.title) body.slug = body.slug || slugify(body.title, { lower: true, strict: true });

      const updated = await Product.findByIdAndUpdate(req.params.id, body, {
        new: true,
      });

      res.json(updated);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Update failed" });
    }
  }
);

// Publish / Unpublish
router.patch("/admin/products/:id/publish", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status = "draft", publishedAt } = req.body || {};
    if (!["draft", "active", "archived"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: "Publish failed" });
  }
});

// Delete
router.delete("/admin/products/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const del = await Product.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

// List (Admin view with all)
router.get("/admin/products", requireAuth, requireAdmin, async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Product.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(),
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ message: "List failed" });
  }
});

// -------------------- PUBLIC (READ-ONLY) --------------------

// Public listing (only active and published)
router.get("/products", async (req, res) => {
  try {
    const {
      q = "",
      category,
      rarity,
      minPrice,
      maxPrice,
      sort = "created_desc",
      page = 1,
      limit = 12,
    } = req.query;

    const filter = { status: "active" };
    // published
    filter.$or = [{ publishedAt: { $exists: false } }, { publishedAt: { $lte: new Date() } }];

    if (q) {
      filter.$text = { $search: q };
    }
    if (category) filter.category = category;
    if (rarity) filter.rarity = rarity;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortMap = {
      created_desc: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      title_asc: { title: 1 },
      title_desc: { title: -1 },
    };
    const sortBy = sortMap[sort] || sortMap.created_desc;

    const pageN = Number(page);
    const limitN = Number(limit);
    const skip = (pageN - 1) * limitN;

    // ensure text index (once)
    await Product.collection.createIndex({ title: "text", description: "text", tags: "text" }).catch(() => {});

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortBy).skip(skip).limit(limitN).select("-__v"),
      Product.countDocuments(filter),
    ]);

    res.json({ items, total, page: pageN, pages: Math.ceil(total / limitN) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Public list failed" });
  }
});

// Public detail by slug
router.get("/products/:slug", async (req, res) => {
  try {
    const p = await Product.findOne({
      slug: req.params.slug,
      status: "active",
      $or: [{ publishedAt: { $exists: false } }, { publishedAt: { $lte: new Date() } }],
    }).select("-__v");
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch {
    res.status(500).json({ message: "Detail failed" });
  }
});

export default router;
