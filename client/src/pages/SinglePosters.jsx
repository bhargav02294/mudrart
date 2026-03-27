import { useEffect, useState } from "react";
import PosterCard from "../components/PosterCard";

export default function SinglePosters() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then((res) => res.json())
      .then((data) => {
        const singles = data.filter(
          (p) => p.productType === "single"
        );
        setPosters(singles);
      });
  }, []);

  return (
    <div className="px-6 md:px-12 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-10">
        Single Posters
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {posters.map((poster) => (
          <PosterCard key={poster._id} poster={poster} />
        ))}
      </div>

    </div>
  );
}