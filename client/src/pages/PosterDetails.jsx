import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar";


export default function PosterDetails() {
  const { id } = useParams();

  const [poster, setPoster] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  /* ---------------- FETCH POSTER ---------------- */
  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const res = await fetch("/api/posters");
        const data = await res.json();

        const found = data.find(p => p._id.toString() === id);

        if (!found) {
          setLoading(false);
          return;
        }

        setPoster(found);
        setSelectedImage(found.thumbnail);

        // Priority size: A6 → A5 → A4 → A3
        const priority = ["A6", "A5", "A4", "A3"];
        const available = priority.find(s => found.sizes?.[s]);

        if (available) {
          setSize(available);
        }

        setLoading(false);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPoster();
  }, [id]);

  /* ---------------- PRICE LOGIC ---------------- */
  const getCurrentPrice = () => {
    if (!poster || !size) return 0;
    return poster.sizes?.[size]?.discountedPrice || 0;
  };

  /* ---------------- CART ---------------- */
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

  /* ---------------- LOADING ---------------- */
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

          {/* -------- LEFT SIDE GALLERY -------- */}
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

          {/* -------- RIGHT SIDE INFO -------- */}
          <div className="pd-info">

            <div className="pd-badge">
              {poster.productType === "single" && "Single Poster"}
              {poster.productType === "set" && `Set of ${poster.setCount}`}
              {poster.productType === "polarized" && `Polarized (${poster.setCount})`}
            </div>

            <h1 className="pd-title">{poster.name}</h1>

            <div className="pd-price-block">
              <div className="pd-price-group">
  <span className="pd-discount-price">
    ₹{poster.sizes?.[size]?.discountedPrice}
  </span>

  <span className="pd-display-price">
    ₹{poster.sizes?.[size]?.displayPrice}
  </span>
</div>

              {poster.downloadPrice > 0 && (
  <div className="pd-digital-box">
    <div className="pd-digital-info">
      <span className="pd-digital-label">Digital Version</span>
      <span className="pd-digital-price">
        ₹{poster.finalDownloadPrice}
      </span>
      <span className="pd-digital-note">
        Instant access after payment
      </span>
    </div>

   <button
className="pd-digital-btn"
onClick={()=>navigate(`/digital/${poster._id}`)}
>
Buy Digital
</button>
  </div>
)}
            </div>

            {/* -------- SIZE SELECTION -------- */}
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

            {/* -------- QUANTITY -------- */}
            <div className="pd-section">
              <h4>Quantity</h4>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>
                  +
                </button>
              </div>
            </div>

            {/* -------- DESCRIPTION -------- */}
            <div className="pd-description">
              <h4>Description</h4>
              <p>{poster.description || "Premium quality art print."}</p>
            </div>

            {/* -------- ACTION BUTTONS -------- */}
            <div className="pd-actions">
              <button className="add-cart-btn" onClick={addToCart}>
                Add To Cart
              </button>

              
            </div>

          </div>

        </div>

      </div>
    </>
  );
}