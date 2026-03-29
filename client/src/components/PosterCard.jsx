import { useState } from "react";

export default function PosterCard({ poster }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const price = poster?.sizes?.A5?.discountedPrice;
  const displayPrice = poster?.sizes?.A5?.displayPrice;

  const handleWishlist = (e) => {
    e.stopPropagation();
    setLiked(!liked);

    // 👉 later connect to cart / wishlist API
    console.log("Added to wishlist:", poster._id);
  };

  return (
    <div
      className="poster-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <div className="poster-image">

        {/* HOVER OVERLAY GRADIENT */}
        <div className="poster-overlay" />

        {/* IMAGE */}
        <img
          src={hovered && poster.image1 ? poster.image1 : poster.thumbnail}
          alt={poster.name}
        />

        {/* ❤️ WISHLIST BUTTON */}
        <button
          className={`wishlist-btn ${liked ? "active" : ""}`}
          onClick={handleWishlist}
        >
          ♥
        </button>
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
      </div>
    </div>
  );
}