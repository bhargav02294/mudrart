import { useState } from "react";

export default function PosterCard({ poster }) {
  const [hovered, setHovered] = useState(false);

  const price = poster?.sizes?.A5?.discountedPrice;
  const displayPrice = poster?.sizes?.A5?.displayPrice;

  return (
    <div
      className="poster-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <div className="poster-image">
        <img
          src={hovered && poster.image1 ? poster.image1 : poster.thumbnail}
          alt={poster.name}
        />
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