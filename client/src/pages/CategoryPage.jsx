import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PosterCard from "../components/PosterCard";
import "../styles/category.css";

export default function CategoryPage() {

  const { category } = useParams();
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(data => {

        const filtered = data.filter(
          (p) =>
            p.category?.toLowerCase() ===
            category?.toLowerCase()
        );

        setPosters(filtered);
      })
      .catch(err => console.error(err));

  }, [category]);

  return (
    <div className="category-page">

      <h1 className="category-heading">
        {category?.toUpperCase()} Posters
      </h1>

      <div className="poster-grid">
        {posters.length > 0 ? (
          posters.map(p => (
            <PosterCard key={p._id} poster={p} />
          ))
        ) : (
          <p>No posters found</p>
        )}
      </div>

    </div>
  );
}