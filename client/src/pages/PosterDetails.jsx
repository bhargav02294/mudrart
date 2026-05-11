import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import SEO from "../components/SEO";

export default function PosterDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [poster, setPoster] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [size, setSize] = useState("");

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH POSTER
  =============================== */

  useEffect(() => {

    const fetchPoster = async () => {

      try {

        setLoading(true);

        const res = await fetch("/api/posters");

        if (!res.ok) {

          throw new Error("Failed to fetch posters");

        }

        const data = await res.json();

        if (!Array.isArray(data)) {

          throw new Error("Invalid API response");

        }

        const foundPoster =
          data.find((p) => p._id === id);

        if (!foundPoster) {

          setLoading(false);

          return;

        }

        setPoster(foundPoster);

        /* ===============================
           DEFAULT IMAGE
        =============================== */

        setSelectedImage(

          foundPoster.thumbnail ||

          foundPoster.image1 ||

          ""

        );

        /* ===============================
           DEFAULT SIZE
        =============================== */

        const availableSizes =
          Object.keys(foundPoster.sizes || {});

        if (availableSizes.length > 0) {

          setSize(availableSizes[0]);

        }

      } catch (err) {

        console.error("POSTER FETCH ERROR:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchPoster();

  }, [id]);

  /* ===============================
     ADD TO CART
  =============================== */

  const addToCart = async () => {

    if (!size) {

      alert("Please select size");

      return;

    }

    try {

      const sessionId =

        localStorage.getItem("sessionId")

        ||

        Date.now().toString();

      localStorage.setItem(
        "sessionId",
        sessionId
      );

      await fetch("/api/cart/add", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization:
            localStorage.getItem("userToken")

              ? "Bearer " +
                localStorage.getItem("userToken")

              : ""

        },

        body: JSON.stringify({

          posterId: id,

          size,

          quantity: qty,

          sessionId

        })

      });

      alert("Added to cart");

    } catch (err) {

      console.error(err);

      alert("Failed to add cart");

    }

  };

  /* ===============================
     LOADING
  =============================== */

  if (loading) {

    return (

      <div className="container">

        Loading...

      </div>

    );

  }

  /* ===============================
     NOT FOUND
  =============================== */

  if (!poster) {

    return (

      <div className="container">

        Poster not found

      </div>

    );

  }

  /* ===============================
     GALLERY
  =============================== */

  const galleryImages = [

    poster.thumbnail,

    poster.image1,

    poster.image2,

    poster.image3,

    poster.image4

  ].filter(Boolean);

  



  /* ===============================
   SEO VALUES
=============================== */

const currentPrice =
  poster.sizes?.[size]?.discountedPrice || 0;

const seoTitle =
  `${poster.name} Poster Online in India | Mudrart`;

const seoDescription =
  poster.description ||
  `Buy ${poster.name} premium wall poster online from Mudrart. High quality aesthetic wall art for bedrooms, gaming rooms and modern interiors.`;

const seoImage =
  poster.thumbnail ||
  "https://www.mudrart.in/logo.png";

const seoUrl =
  `https://www.mudrart.in/poster/${poster._id}`;

/* ===============================
   PRODUCT SCHEMA
=============================== */

const productSchema = {

  "@context": "https://schema.org",

  "@type": "Product",

  name: poster.name,

  image: galleryImages,

  description: seoDescription,

  sku: poster._id,

  mpn: poster._id,

  brand: {

    "@type": "Brand",

    name: "Mudrart"

  },

  category:
    poster.category || "Wall Posters",

  url: seoUrl,

  offers: {

    "@type": "Offer",

    url: seoUrl,

    priceCurrency: "INR",

    price: currentPrice,

    availability:
      "https://schema.org/InStock",

    itemCondition:
      "https://schema.org/NewCondition"

  }

};

/* ===============================
   BREADCRUMB SCHEMA
=============================== */

const breadcrumbSchema = {

  "@context": "https://schema.org",

  "@type": "BreadcrumbList",

  itemListElement: [

    {

      "@type": "ListItem",

      position: 1,

      name: "Home",

      item: "https://www.mudrart.in"

    },

    {

      "@type": "ListItem",

      position: 2,

      name:
        poster.category || "Posters",

      item:
        `https://www.mudrart.in/category/${poster.category}`

    },

    {

      "@type": "ListItem",

      position: 3,

      name: poster.name,

      item: seoUrl

    }

  ]

};

/* ===============================
   COMBINED SCHEMA
=============================== */

const combinedSchema = [
  productSchema,
  breadcrumbSchema
];





  return (

    <>

      {/* ===============================
      SEO
      =============================== */}

      <SEO

  title={seoTitle}

  description={seoDescription}

  image={seoImage}

  url={seoUrl}

  schema={combinedSchema}

/>
    

      <Navbar />

      <div className="container pd-container">

        <div className="pd-layout">

          {/* ===============================
             LEFT
          =============================== */}

          <div className="pd-gallery">

            <div className="pd-main-image">

              <img

                src={selectedImage}

                alt={`${poster.name} premium wall poster`}

              />

            </div>

            <div className="pd-thumbnails">

              {galleryImages.map((img, index) => (

                <img

                  key={index}

                  src={img}

                  alt={`${poster.name} thumbnail ${index + 1}`}

                  className={
                    selectedImage === img
                      ? "active-thumb"
                      : ""
                  }

                  onClick={() =>
                    setSelectedImage(img)
                  }

                />

              ))}

            </div>

          </div>

          {/* ===============================
             RIGHT
          =============================== */}

          <div className="pd-info">

            {/* BADGE */}

            <div className="pd-badge">

              {poster.productType === "single" &&
                "Single Poster"}

              {poster.productType === "set" &&
                `Set of ${poster.setCount}`}

              {poster.productType === "polarized" &&
                `Polarized (${poster.setCount})`}

            </div>

            {/* TITLE */}

            <h1 className="pd-title">

              {poster.name}

            </h1>

            {/* PRICE */}

            <div className="pd-price-group">

              <span className="pd-discount-price">

                ₹
                {
                  poster.sizes?.[size]
                    ?.discountedPrice
                }

              </span>

              <span className="pd-display-price">

                ₹
                {
                  poster.sizes?.[size]
                    ?.displayPrice
                }

              </span>

            </div>

            {/* CART */}

            <div className="pd-actions">

              <button
                className="add-cart-btn"
                onClick={addToCart}
              >
                Add To Cart
              </button>

            </div>

            {/* DIGITAL */}

            {

              poster.productType === "single"

              &&

              poster.downloadPrice > 0

              &&

              (

                <div className="pd-digital-box">

                  <div className="pd-digital-info">

                    <span className="pd-digital-label">

                      Digital Version

                    </span>

                    <span className="pd-digital-price">

                      ₹{poster.downloadPrice}

                    </span>

                    <span className="pd-digital-note">

                      Instant access after payment

                    </span>

                  </div>

                  <button

                    className="pd-digital-btn"

                    onClick={() =>
                      navigate(
                        `/digital/${poster._id}`
                      )
                    }

                  >
                    Buy Digital

                  </button>

                </div>

              )

            }

            {/* SIZE */}

            <div className="pd-section">

              <h4>Select Size</h4>

              <div className="size-buttons">

                {

                  ["A6", "A5", "A4", "A3"]

                  .map((s) =>

                    poster.sizes?.[s]

                    ?

                    (

                      <button

                        key={s}

                        className={
                          `size-btn ${
                            size === s
                              ? "active"
                              : ""
                          }`
                        }

                        onClick={() =>
                          setSize(s)
                        }

                      >
                        {s}
                      </button>

                    )

                    :

                    null

                  )

                }

              </div>

            </div>

            {/* QUANTITY */}

            <div className="pd-section">

              <h4>Quantity</h4>

              <div className="qty-control">

                <button
                  onClick={() =>
                    setQty((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                >
                  −
                </button>

                <span>{qty}</span>

                <button
                  onClick={() =>
                    setQty((q) => q + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="pd-description">

              <h4>Description</h4>

              <p>

                {

                  poster.description

                  ||

                  "Premium quality art print."

                }

              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}