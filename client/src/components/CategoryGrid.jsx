import { useNavigate } from "react-router-dom";
import "../styles/category.css"; // ✅ IMPORTANT LINK

const categories = [
  { name: "Cars", key: "cars", image: "/categories/cars.jpg" },
  { name: "Anime", key: "anime", image: "/categories/anime.jpg" },
  { name: "Cricket", key: "cricket", image: "/categories/cricket.jpg" },
  { name: "Movies", key: "bollywood", image: "/categories/movies.jpg" },
  { name: "Motivational", key: "motivational", image: "/categories/motivational.jpg" },
  { name: "Actors", key: "actors", image: "/categories/actors.jpg" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="category-section">

      <h2 className="category-title">Collections</h2>

      <div className="category-grid">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category-card"
            onClick={() => navigate(`/category/${cat.key}`)}
          >
            <img src={cat.image} alt={cat.name} />
            <div className="overlay"></div>

            <div className="category-name">
              {cat.name}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}