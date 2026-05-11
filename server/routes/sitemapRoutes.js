const express = require("express");

const Poster = require("../models/Poster");

const router = express.Router();

/* ======================================
SITEMAP.XML
====================================== */

router.get("/sitemap.xml", async (req, res) => {

  try {

    const posters = await Poster.find({}, "_id category");

    /* ======================================
       STATIC URLS
    ====================================== */

    const staticUrls = [

      "",

      "/posters/single",

      "/split/3",

      "/polarized/12",

      "/collection/trending",

      "/collection/room",

      "/collection/motivational",

      "/collection/spiritual",

      "/collection/cinema",

      "/collection/fan",

      "/category/anime",

      "/category/cars",

      "/category/cricket",

      "/category/football",

      "/category/motivational",

      "/category/spiritual",

      "/category/divine",

      "/category/devotional",

      "/category/bollywood",

      "/category/movie_posters",

      "/category/actors",

      "/category/aesthetic",

      "/category/gym",

      "/category/nature"

    ];

    /* ======================================
       BASE URL
    ====================================== */

    const baseUrl =
      "https://www.mudrart.in";

    /* ======================================
       STATIC XML
    ====================================== */

    const staticXml = staticUrls.map((url) => `

      <url>

        <loc>${baseUrl}${url}</loc>

        <changefreq>weekly</changefreq>

        <priority>0.9</priority>

      </url>

    `).join("");

    /* ======================================
       PRODUCT XML
    ====================================== */

    const productXml = posters.map((poster) => `

      <url>

       <loc>${baseUrl}/poster/${poster._id}</loc>

        <changefreq>weekly</changefreq>

        <priority>0.8</priority>

      </url>

    `).join("");

    /* ======================================
       FINAL XML
    ====================================== */

    const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticXml}

${productXml}

</urlset>`;

    /* ======================================
       RESPONSE
    ====================================== */

    res.header(
      "Content-Type",
      "application/xml"
    );

    res.send(xml);

  } catch (err) {

    console.error(
      "SITEMAP ERROR:",
      err
    );

    res.status(500).send("Server Error");

  }

});

module.exports = router;