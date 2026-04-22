import "../styles/categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Entertainment", icon: "/categories/entertainment.png", slug: "entertainment" },
  { name: "Superheroes", icon: "/categories/superheroes.png", slug: "superheroes" },
  { name: "Sports", icon: "/categories/sports.png", slug: "sports" },
  { name: "Anime", icon: "/categories/anime.png", slug: "anime" },
  { name: "Aesthetic", icon: "/categories/aesthetic.png", slug: "aesthetic" },
  { name: "Spiritual", icon: "/categories/spiritual2.png", slug: "spiritual" },
  { name: "Lifestyle", icon: "/categories/lifestyle.png", slug: "lifestyle" },
];

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <div className="categories-header">
        <h2 className="categories-title">Browse by Category</h2>
        <p className="categories-subtitle">
          Explore posters across top themes and styles
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((cat, i) => (
          <button
            key={i}
            className="category-item"
            onClick={() => navigate(`/category/${cat.slug}`)}
          >
            <div className="category-circle">
              <img src={cat.icon} alt={cat.name} />
            </div>
            <p className="category-name">{cat.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
}