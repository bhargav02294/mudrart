import { useNavigate } from "react-router-dom";
import "../styles/collection.css";

const collections = [
  { name: "Cars", key: "cars", image: "/categories/cars.jpg" },
  { name: "Anime", key: "anime", image: "/categories/anime.jpg" },
  { name: "Cricket", key: "cricket", image: "/categories/cricket.jpg" },
  { name: "Movies", key: "bollywood", image: "/categories/movies.jpg" },
  { name: "Motivational", key: "motivational", image: "/categories/motivational.jpg" },
  { name: "Actors", key: "actors", image: "/categories/actors.jpg" },
];

export default function CollectionGrid() {
  const navigate = useNavigate();

  return (
    <section className="collection-section">

      <h2 className="collection-title">Collections</h2>

      <div className="collection-grid">
        {collections.map((cat, i) => (
          <div
            key={i}
            className="collection-card"
            onClick={() => navigate(`/category/${cat.key}`)}
          >
            <img src={cat.image} alt={cat.name} />

            <div className="collection-overlay" />

            <div className="collection-name">
              {cat.name}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}