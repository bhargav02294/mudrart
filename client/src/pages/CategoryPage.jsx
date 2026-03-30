import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PosterCard from "../components/PosterCard";

export default function CategoryPage() {
  const { category } = useParams();
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          p => p.category === category
        );
        setPosters(filtered);
      });
  }, [category]);

  return (
    <div className="category-page">

      <h1 className="category-heading">
        {category.toUpperCase()} Posters
      </h1>

      <div className="poster-grid">
        {posters.map(p => (
          <PosterCard key={p._id} poster={p} />
        ))}
      </div>

    </div>
  );
}