import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosterCard from "./PosterCard";

export default function SinglePosterRow({ posters = [] }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ FILTER ONLY SINGLE POSTERS
  const singlePosters = posters.filter(
    (p) => p.productType === "single"
  );

  // ✅ SCROLL ANIMATION
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (scrollRef.current) observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="single-section">

      {/* HEADER */}
      <div className="single-header">
        <h2>Single Posters</h2>

        <button onClick={() => navigate("/posters/single")}>
          See More →
        </button>
      </div>

      {/* SCROLL ROW */}
      <div
        ref={scrollRef}
        className={`single-row ${
          isVisible ? "show" : ""
        }`}
      >
        {singlePosters.length > 0 ? (
          singlePosters.map((poster) => (
            <PosterCard key={poster._id} poster={poster} />
          ))
        ) : (
          <p className="empty-text">No posters found</p>
        )}
      </div>
    </section>
  );
}