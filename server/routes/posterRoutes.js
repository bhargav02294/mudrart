const express = require("express");
const Poster = require("../models/Poster");
const auth = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const {
  SINGLE_PRICES,
  SET_PRICES,
  POLARIZED_PRICES
} = require("../util/pricingEngine");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  auth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "downloadableFile", maxCount: 1 }
  ]),
  async (req, res) => {
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

      // ------------------ Upload Images ------------------

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
  category,
  setCount,
  quantity,
  description
} = req.body;

      /* ========================
         PHYSICAL PRICING LOGIC
      ======================== */

      let sizes = {};

      if (productType === "single") {
        const pricing = SINGLE_PRICES;

        Object.keys(pricing).forEach(size => {
          sizes[size] = {
            displayPrice: pricing[size].display,
            discountedPrice: pricing[size].discount
          };
        });
      }

      if (productType === "set") {
        const pricing = SET_PRICES[setCount];

        if (!pricing) {
          return res.status(400).json({ message: "Invalid set count" });
        }

        Object.keys(pricing).forEach(size => {
          sizes[size] = {
            displayPrice: pricing[size].display,
            discountedPrice: pricing[size].discount
          };
        });
      }

      if (productType === "polarized") {
        const pricing = POLARIZED_PRICES[setCount];

        if (!pricing) {
          return res.status(400).json({ message: "Invalid polarized count" });
        }

        Object.keys(pricing).forEach(size => {
          sizes[size] = {
            displayPrice: pricing[size].display,
            discountedPrice: pricing[size].discount
          };
        });
      }

      /* ========================
         DIGITAL PRICING (HYBRID)
      ======================== */

      let finalDownloadPrice = 0;

      if (productType === "single") {
        finalDownloadPrice = 19;
      }

      if (productType === "set") {
        finalDownloadPrice = 29;
      }

      if (productType === "polarized") {
        finalDownloadPrice = 39;
      }

      /* ========================
         CREATE POSTER
      ======================== */

      const poster = new Poster({
        name,
        category,
        productType: productType || "single",
        setCount: setCount || 1,
        thumbnail,
        image1,
        image2,
        image3,
        image4,
        downloadableFile,
        downloadPrice: finalDownloadPrice,
        quantity,
        description,
        sizes
      });

      await poster.save();

      res.json({ message: "Poster created successfully", poster });

    } catch (err) {
      console.error("POSTER CREATE ERROR:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/", async (req, res) => {
  const posters = await Poster.find().sort({ createdAt: -1 });
  res.json(posters);
});

router.delete("/:id", auth, async (req, res) => {
  await Poster.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;