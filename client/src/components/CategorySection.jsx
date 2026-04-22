import "../styles/categories.css";

const categories = [
  { name: "Entertainment", icon: "/categories/entertainment.png" },
  { name: "Superheroes", icon: "/categories/superheroes.png" },
  { name: "Sports", icon: "/categories/sports.png" },
  { name: "Anime", icon: "/categories/anime.png" },
  { name: "Aesthetic", icon: "/categories/aesthetic.png" },
  { name: "Spiritual", icon: "/categories/spiritual2.png" },
  { name: "Lifestyle", icon: "/categories/lifestyle.png" },
];

export default function CategorySection() {
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
          <div className={`category-item item-${i+1}`} key={i}>
            <div className="category-circle">
              <img src={cat.icon} alt={cat.name} />
            </div>
            <p className="category-name">{cat.name}</p>
          </div>
        ))}
      </div>

    </section>
  );
}