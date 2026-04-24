import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PosterDetails() {

  const { id } = useParams();

  const [poster, setPoster] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= FETCH ================= */

  useEffect(() => {

  const fetchData = async () => {

    try {
      setLoading(true);

      const res = await fetch("/api/posters");

      if (!res.ok) {
        throw new Error("API failed");
      }

      const data = await res.json();

      // 🔥 SAFETY CHECK
      if (!Array.isArray(data)) {
        console.error("Invalid API response:", data);
        setPosters([]);
        setLoading(false);
        return;
      }

      let filtered = data;

      if (type === "category") {
        filtered = data.filter(
          p => p.category?.toLowerCase() === category?.toLowerCase()
        );
      }

      if (type === "collection") {

        const allowedCategories = collectionMap[collection];

        if (!allowedCategories) {
          filtered = data;
        } else {
          filtered = data.filter(p =>
            allowedCategories.includes(p.category?.toLowerCase())
          );
        }

      }

      if (type === "single") {
        filtered = data.filter(p => p.productType === "single");
      }

      if (type === "set") {
        filtered = data.filter(
          p => p.productType === "set" && String(p.setCount) === String(count)
        );
      }

      if (type === "polarized") {
        filtered = data.filter(
          p => p.productType === "polarized" && String(p.setCount) === String(count)
        );
      }

      setPosters(filtered);
      setPage(1);

    } catch (err) {
      console.error("FETCH ERROR:", err);
      setPosters([]);
    } finally {
      setLoading(false);
    }

  };

  fetchData();

}, [type, category, collection, count]);

  /* ================= CART ================= */

  const addToCart = async () => {

    if (!size) return alert("Please select a size");

    const sessionId =
      localStorage.getItem("sessionId") || Date.now().toString();

    localStorage.setItem("sessionId", sessionId);

    await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userToken")
          ? "Bearer " + localStorage.getItem("userToken")
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

  };

  /* ================= LOADING ================= */

  if (loading) return <div className="container">Loading...</div>;
  if (!poster) return <div className="container">Poster not found</div>;

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

          {/* LEFT */}
          <div className="pd-gallery">

            <div className="pd-main-image">
              <img src={selectedImage} alt={poster.name} />
            </div>

            <div className="pd-thumbnails">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className={selectedImage === img ? "active-thumb" : ""}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

          </div>


          {/* RIGHT */}
          <div className="pd-info">

            <div className="pd-badge">
              {poster.productType === "single" && "Single Poster"}
              {poster.productType === "set" && `Set of ${poster.setCount}`}
              {poster.productType === "polarized" && `Polarized (${poster.setCount})`}
            </div>

            <h1 className="pd-title">{poster.name}</h1>

            {/* PRICE */}
            <div className="pd-price-group">
              <span className="pd-discount-price">
                ₹{poster.sizes?.[size]?.discountedPrice}
              </span>

              <span className="pd-display-price">
                ₹{poster.sizes?.[size]?.displayPrice}
              </span>
            </div>

            {/* ADD TO CART (TOP POSITION) */}
            <div className="pd-actions">
              <button className="add-cart-btn" onClick={addToCart}>
                Add To Cart
              </button>
            </div>

            {/* DIGITAL ONLY FOR SINGLE */}
            {poster.productType === "single" && poster.downloadPrice > 0 && (

              <div className="pd-digital-box">

                <div className="pd-digital-info">
                  <span className="pd-digital-label">Digital Version</span>
                  <span className="pd-digital-price">
                    ₹{poster.downloadPrice}
                  </span>
                  <span className="pd-digital-note">
                    Instant access after payment
                  </span>
                </div>

                <button
                  className="pd-digital-btn"
                  onClick={() => navigate(`/digital/${poster._id}`)}
                >
                  Buy Digital
                </button>

              </div>
            )}

            {/* SIZE */}
            <div className="pd-section">
              <h4>Select Size</h4>
              <div className="size-buttons">
                {["A6", "A5", "A4", "A3"].map(s =>
                  poster.sizes?.[s] ? (
                    <button
                      key={s}
                      className={`size-btn ${size === s ? "active" : ""}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ) : null
                )}
              </div>
            </div>

            {/* QTY */}
            <div className="pd-section">
              <h4>Quantity</h4>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="pd-description">
              <h4>Description</h4>
              <p>{poster.description || "Premium quality art print."}</p>
            </div>

            {/* DISCLAIMER */}
            <div className="pd-disclaimer">
              This digital poster is offered for personal use. We do not own the copyright
              to the original artwork, which remains with the respective rights holders.
              Copyright owners or artists who wish to request removal may contact us at
              <span> your-email@mudrart.in</span>. We respect intellectual property and will respond promptly.
            </div>

          </div>

        </div>

      </div>
    </>
  );
}