import { useState } from "react";

export default function PosterCard({ poster }) {
  const [hovered, setHovered] = useState(false);

  const price = poster?.sizes?.A5?.discountedPrice;
  const displayPrice = poster?.sizes?.A5?.displayPrice;

  return (
    <div
      className="min-w-[220px] md:min-w-[260px] cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <div className="w-full h-[300px] md:h-[360px] overflow-hidden rounded-xl bg-gray-100 relative">
        <img
          src={hovered && poster.image1 ? poster.image1 : poster.thumbnail}
          alt={poster.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* INFO */}
      <div className="mt-3">
        <h3 className="text-sm md:text-base font-medium line-clamp-1">
          {poster.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-semibold">
            ₹{price}
          </span>

          {displayPrice && (
            <span className="text-sm line-through text-gray-400">
              ₹{displayPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}