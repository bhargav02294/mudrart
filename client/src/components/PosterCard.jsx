import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PosterCard({ poster }) {

  const navigate = useNavigate();

  const defaultSize = getDefaultSize(poster);
  const [size, setSize] = useState(defaultSize);
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const isPolaroid = poster.productType === "polarized";

  const getImg = (url) =>
    url?.replace("/upload/", "/upload/f_auto,q_auto,w_600/");

  const price = poster?.sizes?.[size]?.discountedPrice;
  const displayPrice = poster?.sizes?.[size]?.displayPrice;

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

    window.dispatchEvent(new Event("cartUpdated"));

    setLoading(false);

    // ✅ SHOW MESSAGE
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 3000);
  };

  return (
    <>
      {/* ✅ SIMPLE MESSAGE */}
      {showMsg && (
        <div className="top-msg">Added to cart</div>
      )}

      <div
        className="poster-card"
        onClick={() => navigate(`/poster/${poster._id}`)}
      >

        {/* IMAGE */}
        <div className="poster-image">

          <img
            src={getImg(poster.thumbnail)}
            className="img primary"
          />

          {poster.image1 && (
            <img
              src={getImg(poster.image1)}
              className="img secondary"
            />
          )}

        </div>

        {/* INFO */}
        <div className="poster-info">

          <h3 className="poster-title">{poster.name}</h3>

          <div className="poster-price">
            <span className="price">₹{price}</span>
            {displayPrice && <span className="old-price">₹{displayPrice}</span>}
          </div>

          {!isPolaroid ? (
            <div className="poster-actions">

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

              <button
                className="cart-btn"
                onClick={addToCart}
              >
                🛒
              </button>

            </div>
          ) : (
            <button
              className="cart-full-btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          )}

        </div>

      </div>
    </>
  );
}

function getDefaultSize(poster) {
  if (poster.sizes?.A6) return "A6";
  if (poster.sizes?.A5) return "A5";
  return Object.keys(poster.sizes || {})[0];
}