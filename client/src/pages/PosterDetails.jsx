import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";


import PosterCard from "../components/PosterCard";

import SEO from "../components/SEO";

export default function PosterDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [poster, setPoster] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [size, setSize] = useState("");

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(true);

  const [allPosters, setAllPosters] = useState([]);

  const [recommended, setRecommended] = useState([]);





  /* ===============================
OFFERS
=============================== */

const SINGLE_OFFERS = [
  { buy: 10, free: 15 },
  { buy: 6, free: 9 },
  { buy: 5, free: 5 },
  { buy: 4, free: 3 },
  { buy: 3, free: 2 }
];

const SET_OFFERS = [
  { buy: 5, free: 10 },
  { buy: 4, free: 6 },
  { buy: 3, free: 2 },
  { buy: 2, free: 1 }
];



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
        
        setAllPosters(data);

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
RECOMMENDED PRODUCTS
=============================== */

useEffect(() => {

  if (!poster || allPosters.length === 0) return;

  const currentCategory =
    poster.category?.toLowerCase();

  let similar = [];

  let crossSell = [];

  /* =================================
  SINGLE POSTERS
  ================================= */

  if (poster.productType === "single") {

    similar = allPosters.filter((p) =>

      p._id !== poster._id &&

      p.productType === "single" &&

      p.category?.toLowerCase() === currentCategory

    );

    crossSell = allPosters.filter((p) =>

      p._id !== poster._id &&

      (
        p.productType === "set" ||
        p.productType === "polarized"
      ) &&

      p.category?.toLowerCase() === currentCategory

    );

  }

  /* =================================
  SET POSTERS
  ================================= */

  else if (poster.productType === "set") {

    similar = allPosters.filter((p) =>

      p._id !== poster._id &&

      p.productType === "set" &&

      p.category?.toLowerCase() === currentCategory

    );

    crossSell = allPosters.filter((p) =>

      p._id !== poster._id &&

      p.productType === "single" &&

      p.category?.toLowerCase() === currentCategory

    );

  }

  /* =================================
  POLAROID
  ================================= */

  else if (poster.productType === "polarized") {

    similar = allPosters.filter((p) =>

      p._id !== poster._id &&

      p.productType === "polarized" &&

      p.category?.toLowerCase() === currentCategory

    );

    crossSell = allPosters.filter((p) =>

      p._id !== poster._id &&

      p.productType === "single" &&

      p.category?.toLowerCase() === currentCategory

    );

  }

  /* =================================
  FINAL COMBINED
  ================================= */

  const finalProducts = [

    ...similar.slice(0, 5),

    ...crossSell.slice(0, 5)

  ];

  setRecommended(finalProducts);

}, [poster, allPosters]);
  




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

              <div
  className="pd-image-wrapper"

  onContextMenu={(e) => e.preventDefault()}

  onDragStart={(e) => e.preventDefault()}
>

  {/* WATERMARK ONLY ON SECOND IMAGE OF SINGLE POSTERS */}

  {

    poster.productType === "single"

    &&

    selectedImage === poster.image1

    &&

    (

      <div className="pd-watermark">

        <span>
          MudrArt
        </span>

      </div>

    )

  }

  <img

    src={selectedImage}

    alt={`${poster.name} premium wall poster`}

    draggable="false"

    loading="eager"

    className="protected-image"

  />
  





</div>




            </div>



  {/* =================================
RECOMMENDED
================================= */}

{

  recommended.length > 0 && (

    <section className="pd-recommended">

      <div className="pd-recommended-header">

        <h2>
          Recommended For You
        </h2>

        <p>
          Similar premium posters curated for your aesthetic
        </p>

      </div>

      {/* ROW 1 */}

      <div className="pd-recommended-row">

        {

          recommended
            .slice(0, 5)
            .map((item) => (

              <PosterCard
                key={item._id}
                poster={item}
              />

            ))

        }

      </div>

      {/* ROW 2 */}

      <div className="pd-recommended-row">

        {

          recommended
            .slice(5, 10)
            .map((item) => (

              <PosterCard
                key={item._id}
                poster={item}
              />

            ))

        }

      </div>

    </section>

  )

}

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

  draggable="false"

  onContextMenu={(e) =>
    e.preventDefault()
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


            {/* ===============================
OFFERS
=============================== */}

<div className="pd-offers-wrapper">

  <div className="pd-offers-header">

    🔥 Special Combo Offers

  </div>

  <div className="pd-offers-grid">

    {

      (
        poster.productType === "single"

        ? SINGLE_OFFERS

        : SET_OFFERS

      ).map((offer, index) => (

        <div
          key={index}
          className={`pd-offer-card ${
            index === 0
              ? "best-offer"
              : ""
          }`}
        >

          {

            index === 0 && (

              <div className="pd-best-badge">

                BEST VALUE

              </div>

            )

          }

          <h3>

            Buy {offer.buy}

            <span>
              {" "}→{" "}
            </span>

            Get {offer.free} Free

          </h3>

          <p className="offer-free">

            +{offer.free} FREE posters

          </p>

          <p className="offer-total">

            Total{" "}

            <strong>
              {offer.buy + offer.free}
            </strong>

            {" "}posters

          </p>

        </div>

      ))

    }

  </div>

  <div className="pd-offer-note">

    ✅ Offers apply automatically at checkout

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