import "../styles/categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Entertainment", icon: "/categories/entertainment.png", key: "entertainment" },
  { name: "Superheroes", icon: "/categories/superheroes.png", key: "marvel_dc" },
  { name: "Sports", icon: "/categories/sports.png", key: "sports" },
  { name: "Anime", icon: "/categories/anime.png", key: "anime" },
  { name: "Aesthetic", icon: "/categories/aesthetic.png", key: "aesthetic" },
  { name: "Spiritual", icon: "/categories/spiritual2.png", key: "spiritual" },
  { name: "Lifestyle", icon: "/categories/lifestyle.png", key: "lifestyle" },
];

export default function CategorySection() {

  const navigate = useNavigate();

  const firstRow = categories.slice(0,4);
  const secondRow = categories.slice(4);

  return (

    <section className="categories">

      <div className="categories-header">
        <h2 className="categories-title">Browse by Category</h2>
        <p className="categories-subtitle">
          Explore posters across top themes and styles
        </p>
      </div>

      <div className="categories-container">

        {/* FIRST ROW */}
        <div className="categories-row row-top">
          {firstRow.map((cat,index)=>(
            <button 
              className="category-item" 
              key={index}
              onClick={() => navigate(`/category/${cat.key}`)}
            >
              <div className="category-circle">
                <img src={cat.icon} alt={cat.name} className="category-icon"/>
              </div>
              <p className="category-name">{cat.name}</p>
            </button>
          ))}
        </div>

        {/* SECOND ROW */}
        <div className="categories-row row-bottom">
          {secondRow.map((cat,index)=>(
            <button 
              className="category-item" 
              key={index}
              onClick={() => navigate(`/category/${cat.key}`)}
            >
              <div className="category-circle">
                <img src={cat.icon} alt={cat.name} className="category-icon"/>
              </div>
              <p className="category-name">{cat.name}</p>
            </button>
          ))}
        </div>

      </div>

    </section>
  );
}