import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PosterCard({ poster }) {
  const navigate = useNavigate();
  const [size, setSize] = useState("A4");
  const [loading, setLoading] = useState(false);

  // 🔥 Cloudinary optimization
  const getImg = (url) =>
    url?.replace("/upload/", "/upload/f_auto,q_auto,w_600/");

  // ✅ PRICE LOGIC (FIXED)
  const price = poster?.sizes?.[size]?.discountedPrice;
  const displayPrice = poster?.sizes?.[size]?.displayPrice;

  // 🔥 ADD TO CART
  const addToCart = async (e) => {
    e.stopPropagation();
    setLoading(true);

    const sessionId =
      localStorage.getItem("sessionId") || Date.now().toString();

    localStorage.setItem("sessionId", sessionId);

    await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userToken")
          ? "Bearer " + localStorage.getItem("userToken")
          : "",
      },
      body: JSON.stringify({
        posterId: poster._id,
        size,
        quantity: 1,
        sessionId,
        type: poster.productType,
        setCount: poster.setCount || 1,
      }),
    });

    setLoading(false);
    window.dispatchEvent(new Event("cartUpdated")); // 🔥 update cart globally
  };

  return (
    <div
      className="poster-card"
      onClick={() => navigate(`/poster/${poster._id}`)}
    >
      {/* IMAGE */}
      <div className="poster-image">

        <img
          src={getImg(poster.thumbnail)}
          className="img primary"
          loading="lazy"
        />

        {poster.image1 && (
          <img
            src={getImg(poster.image1)}
            className="img secondary"
            loading="lazy"
          />
        )}

        <span className="sale-badge">Sale</span>

      </div>

      {/* INFO */}
      <div className="poster-info">

        <h3>{poster.name}</h3>

        <div className="poster-price">
          <span className="price">₹{price}</span>
          {displayPrice && (
            <span className="old-price">₹{displayPrice}</span>
          )}
        </div>

        {/* SIZE SELECT */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          {Object.keys(poster.sizes || {}).map((s) => (
            <option key={s} value={s}>
              {s} - ₹{poster.sizes[s].discountedPrice}
            </option>
          ))}
        </select>

        {/* BUTTON */}
        <button
          className="add-btn"
          onClick={addToCart}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to cart"}
        </button>

      </div>
    </div>
  );
}