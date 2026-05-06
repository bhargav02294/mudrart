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

const upload = multer({
  storage: multer.memoryStorage()
});

/* =====================================================
   CREATE POSTER
===================================================== */

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

      /* ================= CLOUDINARY ================= */

      const uploadToCloudinary = async (file) => {

        const result = await new Promise((resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(

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

      /* ================= IMAGES ================= */

      const thumbnail =
        req.files.thumbnail
          ? await uploadToCloudinary(
              req.files.thumbnail[0]
            )
          : "";

      const image1 =
        req.files.image1
          ? await uploadToCloudinary(
              req.files.image1[0]
            )
          : "";

      const image2 =
        req.files.image2
          ? await uploadToCloudinary(
              req.files.image2[0]
            )
          : "";

      const image3 =
        req.files.image3
          ? await uploadToCloudinary(
              req.files.image3[0]
            )
          : "";

      const image4 =
        req.files.image4
          ? await uploadToCloudinary(
              req.files.image4[0]
            )
          : "";

      const downloadableFile =
        req.files.downloadableFile
          ? await uploadToCloudinary(
              req.files.downloadableFile[0]
            )
          : "";

      /* ================= BODY ================= */

      const {
        name,
        productType,
        category,
        setCount,
        quantity,
        description
      } = req.body;

      /* ================= NORMALIZE TYPE ================= */

      const normalizedType =
        (productType || "single").toLowerCase();

      /* ================= PRICING ================= */

      let sizes = {};

      if (normalizedType === "single") {

        Object.keys(SINGLE_PRICES).forEach(size => {

          sizes[size] = {

            displayPrice:
              SINGLE_PRICES[size].display,

            discountedPrice:
              SINGLE_PRICES[size].discount

          };

        });

      }

      if (normalizedType === "set") {

        const pricing = SET_PRICES[setCount];

        if (!pricing) {

          return res.status(400).json({
            message: "Invalid set count"
          });

        }

        Object.keys(pricing).forEach(size => {

          sizes[size] = {

            displayPrice:
              pricing[size].display,

            discountedPrice:
              pricing[size].discount

          };

        });

      }

      if (normalizedType === "polarized") {

        const pricing =
          POLARIZED_PRICES[setCount];

        if (!pricing) {

          return res.status(400).json({
            message: "Invalid polarized count"
          });

        }

        Object.keys(pricing).forEach(size => {

          sizes[size] = {

            displayPrice:
              pricing[size].display,

            discountedPrice:
              pricing[size].discount

          };

        });

      }

      /* ================= DIGITAL PRICE ================= */

      let finalDownloadPrice = 19;

      if (normalizedType === "set") {
        finalDownloadPrice = 29;
      }

      if (normalizedType === "polarized") {
        finalDownloadPrice = 39;
      }

      /* ================= CREATE ================= */

      const poster = new Poster({

        name,

        category,

        productType: normalizedType,

        setCount: Number(setCount) || 1,

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

      res.json({

        success: true,

        message: "Poster created successfully",

        poster

      });

    } catch (err) {

      console.error("POSTER CREATE ERROR:", err);

      res.status(500).json({

        success: false,

        message: err.message

      });

    }

  }
);

/* =====================================================
   GET ALL POSTERS
===================================================== */

router.get("/", async (req, res) => {

  try {

    const posters = await Poster.find()
      .sort({ createdAt: -1 });

    res.json(posters);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

/* =====================================================
   GET SINGLE POSTER
===================================================== */

router.get("/:id", async (req, res) => {

  try {

    const poster = await Poster.findById(
      req.params.id
    );

    if (!poster) {

      return res.status(404).json({
        message: "Poster not found"
      });

    }

    res.json(poster);

  } catch (err) {

    console.error("GET POSTER ERROR:", err);

    res.status(500).json({
      message: err.message
    });

  }

});

/* =====================================================
   DELETE POSTER
===================================================== */

router.delete("/:id", auth, async (req, res) => {

  try {

    await Poster.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;