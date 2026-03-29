import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosterCard from "./PosterCard";

export default function PosterRow({
  posters = [],
  title = "",
  filterFn = () => true,
  redirect = "/"
}) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const filtered = posters.filter(filterFn);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );

    if (scrollRef.current) observer.observe(scrollRef.current);
  }, []);

  return (
    <section className="poster-section">

      <div className="poster-header">
        <h2>{title}</h2>

        <button onClick={() => navigate(redirect)}>
          Explore →
        </button>
      </div>

      <div
        ref={scrollRef}
        className={`poster-row ${visible ? "show" : ""}`}
      >
        {filtered.map((p) => (
          <PosterCard key={p._id} poster={p} />
        ))}
      </div>
    </section>
  );
}