import { Link } from "react-router-dom";

import "../styles/categories.css";

const categories = [

  {
    name: "Entertainment",
    icon: "/categories/entertainment.png",
    key: "entertainment"
  },

  {
    name: "Superheroes",
    icon: "/categories/superheroes.png",
    key: "superheroes"
  },

  {
    name: "Sports",
    icon: "/categories/sports.png",
    key: "sports"
  },

  {
    name: "Anime",
    icon: "/categories/anime.png",
    key: "animeworld"
  },

  {
    name: "Aesthetic",
    icon: "/categories/aesthetic.png",
    key: "aestheticworld"
  },

  {
    name: "Spiritual",
    icon: "/categories/spiritual2.png",
    key: "spiritualworld"
  },

  {
    name: "Lifestyle",
    icon: "/categories/lifestyle.png",
    key: "lifestyle"
  }

];

export default function CategorySection() {

  const firstRow = categories.slice(0, 4);

  const secondRow = categories.slice(4);

  return (

    <section className="categories">

      <div className="categories-header">

        <h2 className="categories-title">
          Browse by Category
        </h2>

        <p className="categories-subtitle">
          Explore premium wall posters across top themes and aesthetics
        </p>

      </div>

      <div className="categories-container">

        <div className="categories-row row-top">

          {firstRow.map((cat, index) => (

            <Link
              key={index}
              to={`/collection/${cat.key}`}
              className="category-item"
            >

              <div className="category-circle">

                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="category-icon"
                />

              </div>

              <p className="category-name">
                {cat.name}
              </p>

            </Link>

          ))}

        </div>

        <div className="categories-row row-bottom">

          {secondRow.map((cat, index) => (

            <Link
              key={index}
              to={`/collection/${cat.key}`}
              className="category-item"
            >

              <div className="category-circle">

                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="category-icon"
                />

              </div>

              <p className="category-name">
                {cat.name}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </section>

  );

}