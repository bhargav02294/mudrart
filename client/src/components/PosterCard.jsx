import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PosterCard({ poster }) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);

  const price = poster?.sizes?.A5?.discountedPrice;
  const displayPrice = poster?.sizes?.A5?.displayPrice;

  // ✅ LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setLiked(wishlist.includes(poster._id));
  }, [poster._id]);

  // ✅ TOGGLE WISHLIST
  const handleWishlist = (e) => {
    e.stopPropagation();

    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(poster._id)) {
      wishlist = wishlist.filter((id) => id !== poster._id);
      setLiked(false);
    } else {
      wishlist.push(poster._id);
      setLiked(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  // ✅ CLICK → DETAILS PAGE
  const handleClick = () => {
    navigate(`/poster/${poster._id}`);
  };

  return (
    <div className="poster-card" onClick={handleClick}>

      {/* IMAGE WRAPPER */}
      <div className="poster-image">

        {/* IMAGE 1 */}
        <img
          src={poster.thumbnail}
          className="img primary"
          alt={poster.name}
        />

        {/* IMAGE 2 (HOVER) */}
        {poster.image1 && (
          <img
            src={poster.image1}
            className="img secondary"
            alt=""
          />
        )}

        {/* ❤️ BUTTON */}
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