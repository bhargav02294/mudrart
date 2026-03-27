import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosterCard from "./PosterCard";

export default function SinglePosterRow({ posters = [] }) {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const singlePosters = posters.filter(
    (p) => p.productType === "single"
  );

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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const mouseLeave = () => (isDown = false);
    const mouseUp = () => (isDown = false);

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", mouseDown);
    container.addEventListener("mouseleave", mouseLeave);
    container.addEventListener("mouseup", mouseUp);
    container.addEventListener("mousemove", mouseMove);

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      container.removeEventListener("mouseleave", mouseLeave);
      container.removeEventListener("mouseup", mouseUp);
      container.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <section className="px-6 md:px-12 py-16">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Single Posters
        </h2>

        <button
          onClick={() => navigate("/posters/single")}
          className="text-sm border px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
        >
          See More →
        </button>
      </div>

      <div
        ref={scrollRef}
        className={`flex gap-6 overflow-x-auto scrollbar-hide transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {singlePosters.map((poster) => (
          <PosterCard key={poster._id} poster={poster} />
        ))}
      </div>
    </section>
  );
}