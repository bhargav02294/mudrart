import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/posterDetails.css";

export default function PosterDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  /* ================= STATES ================= */

  const [poster, setPoster] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [size, setSize] = useState("");

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ================= FETCH POSTER ================= */

  useEffect(() => {

    const fetchPoster = async () => {

      try {

        setLoading(true);

        setError("");

        const res = await fetch(`/api/posters/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch poster");
        }

        const data = await res.json();

        console.log("POSTER DATA:", data);

        setPoster(data);

        /* DEFAULT IMAGE */

        const firstImage =
          data.thumbnail ||
          data.image1 ||
          data.image2 ||
          data.image3 ||
          data.image4 ||
          "";

        setSelectedImage(firstImage);

        /* DEFAULT SIZE */

        if (data.sizes) {

          const availableSizes = Object.keys(data.sizes);

          if (availableSizes.length > 0) {
            setSize(availableSizes[0]);
          }

        }

      } catch (err) {

        console.error("FETCH ERROR:", err);

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchPoster();

  }, [id]);

  /* ================= ADD TO CART ================= */

  const addToCart = async () => {

    try {

      if (!size) {
        return alert("Please select a size");
      }

      const sessionId =
        localStorage.getItem("sessionId") ||
        Date.now().toString();

      localStorage.setItem("sessionId", sessionId);

      const res = await fetch("/api/cart/add", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: localStorage.getItem("userToken")
            ? "Bearer " + localStorage.getItem("userToken")
            : ""
        },

        body: JSON.stringify({
          posterId: poster._id,
          size,
          quantity: qty,
          sessionId
        })
      });

      const data = await res.json();

      console.log("CART RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }

      alert("Added to cart");

    } catch (err) {

      console.error(err);

      alert(err.message);

    }

  };

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <>
        <Navbar />
        <div className="container">
          <h2>Loading...</h2>
        </div>
      </>
    );

  }

  /* ================= ERROR ================= */

  if (error) {

    return (
      <>
        <Navbar />
        <div className="container">
          <h2>{error}</h2>
        </div>
      </>
    );

  }

  /* ================= NOT FOUND ================= */

  if (!poster) {

    return (
      <>
        <Navbar />
        <div className="container">
          <h2>Poster not found</h2>
        </div>
      </>
    );

  }

  /* ================= GALLERY ================= */

  const galleryImages = [

    poster.thumbnail,

    poster.image1,

    poster.image2,

    poster.image3,

    poster.image4

  ].filter(Boolean);

  return (

    <>
      <Navbar />

      <div className="container pd-container">

        <div className="pd-layout">

          {/* ================= LEFT ================= */}

          <div className="pd-gallery">

            {/* MAIN IMAGE */}

            <div className="pd-main-image">

              <img
                src={selectedImage || poster.thumbnail}
                alt={poster.name}
              />

            </div>

            {/* THUMBNAILS */}

            {galleryImages.length > 1 && (

              <div className="pd-thumbnails">

                {galleryImages.map((img, index) => (

                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    className={
                      selectedImage === img
                        ? "active-thumb"
                        : ""
                    }
                    onClick={() => setSelectedImage(img)}
                  />

                ))}

              </div>

            )}

          </div>

          {/* ================= RIGHT ================= */}

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

                ₹{
                  poster.sizes?.[size]?.discountedPrice ||
                  0
                }

              </span>

              <span className="pd-display-price">

                ₹{
                  poster.sizes?.[size]?.displayPrice ||
                  0
                }

              </span>

            </div>

            {/* SIZE */}

            <div className="pd-section">

              <h4>Select Size</h4>

              <div className="size-buttons">

                {["A6", "A5", "A4", "A3"].map((s) => (

                  poster.sizes?.[s] ? (

                    <button
                      key={s}
                      className={
                        `size-btn ${
                          size === s ? "active" : ""
                        }`
                      }
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>

                  ) : null

                ))}

              </div>

            </div>

            {/* QUANTITY */}

            <div className="pd-section">

              <h4>Quantity</h4>

              <div className="qty-control">

                <button
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
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

            {/* ADD TO CART */}

            <div className="pd-actions">

              <button
                className="add-cart-btn"
                onClick={addToCart}
              >
                Add To Cart
              </button>

            </div>

            {/* DIGITAL */}

            {poster.productType === "single" &&
              poster.downloadPrice > 0 && (

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
                    navigate(`/digital/${poster._id}`)
                  }
                >
                  Buy Digital
                </button>

              </div>

            )}

            {/* DESCRIPTION */}

            <div className="pd-description">

              <h4>Description</h4>

              <p>
                {poster.description ||
                  "Premium quality art print."}
              </p>

            </div>

            {/* DISCLAIMER */}

            <div className="pd-disclaimer">

              This digital poster is offered for
              personal use.

              We do not own the copyright
              to the original artwork.

              Copyright owners may request
              removal by contacting us at

              <span> support@mudrart.in</span>

            </div>

          </div>

        </div>

      </div>

    </>
  );

}