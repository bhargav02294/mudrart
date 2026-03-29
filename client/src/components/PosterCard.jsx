import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PosterCard({ poster }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // ✅ FAST IMAGE (Cloudinary optimization)
  const getImg = (url) =>
    url?.replace("/upload/", "/upload/f_auto,q_auto,w_500/");

  const price =
  poster?.sizes?.A5?.discountedPrice ||
  poster?.sizes?.A4?.discountedPrice ||
  poster?.sizes?.A3?.discountedPrice;

const displayPrice =
  poster?.sizes?.A5?.displayPrice ||
  poster?.sizes?.A4?.displayPrice ||
  poster?.sizes?.A3?.displayPrice;

  useEffect(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(wishlist.includes(poster._id));
  }, [poster._id]);

  const toggleLike = async (e) => {
  e.stopPropagation();

  const sessionId =
    localStorage.getItem("sessionId") || Date.now().toString();

  localStorage.setItem("sessionId", sessionId);

  const size = "A5"; // default size for quick add

  await fetch("/api/cart/add", {
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
      quantity: 1,
      sessionId
    })
  });

  setLiked(true);
  

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  return (
    <div
      className="poster-card flat"
      onClick={() => navigate(`/poster/${poster._id}`)}
    >
      <div className="poster-image">

        <img
          src={getImg(poster.thumbnail)}
          className="img primary"
          loading="lazy"
          decoding="async"
        />

        {poster.image1 && (
          <img
            src={getImg(poster.image1)}
            className="img secondary"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* ❤️ */}
        <button
          className={`wishlist-btn ${liked ? "active" : ""}`}
          onClick={toggleLike}
        >
          ♥
        </button>

        {/* 🔥 POLARIZED LABEL */}
        {poster.productType === "polarized" && (
          <div className="poster-badge">
            {poster.setCount} Posters Set
          </div>
        )}
      </div>

      <div className="poster-info">
        <h3>{poster.name}</h3>

        <div className="poster-price">
          <span className="price">₹{price}</span>
          {displayPrice && (
            <span className="old-price">₹{displayPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}