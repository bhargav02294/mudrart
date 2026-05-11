import { Link } from "react-router-dom";

import "../styles/categories.css";

/* ======================================
CATEGORIES
====================================== */

const categories = [

  {
    name: "Entertainment",
    icon: "/categories/entertainment.png",
    key: "entertainment"
  },

  {
    name: "Superheroes",
    icon: "/categories/superheroes.png",
    key: "marvel_dc"
  },

  {
    name: "Sports",
    icon: "/categories/sports.png",
    key: "sports"
  },

  {
    name: "Anime",
    icon: "/categories/anime.png",
    key: "anime"
  },

  {
    name: "Aesthetic",
    icon: "/categories/aesthetic.png",
    key: "aesthetic"
  },

  {
    name: "Spiritual",
    icon: "/categories/spiritual2.png",
    key: "spiritual"
  },

  {
    name: "Lifestyle",
    icon: "/categories/lifestyle.png",
    key: "lifestyle"
  }

];

/* ======================================
COMPONENT
====================================== */

export default function CategorySection() {

  const firstRow = categories.slice(0, 4);

  const secondRow = categories.slice(4);

  return (

    <section className="categories">

      {/* HEADER */}

      <div className="categories-header">

        <h2 className="categories-title">
          Browse by Category
        </h2>

        <p className="categories-subtitle">
          Explore premium wall posters across top themes and aesthetics
        </p>

      </div>

      {/* GRID */}

      <div className="categories-container">

        {/* FIRST ROW */}

        <div className="categories-row row-top">

          {firstRow.map((cat, index) => (

            <Link
              key={index}

              to={`/category/${cat.key}`}

              className="category-item"

              aria-label={cat.name}

              title={cat.name}
            >

              <div className="category-circle">

                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="category-icon"
                  loading="lazy"
                />

              </div>

              <p className="category-name">
                {cat.name}
              </p>

            </Link>

          ))}

        </div>

        {/* SECOND ROW */}

        <div className="categories-row row-bottom">

          {secondRow.map((cat, index) => (

            <Link
              key={index}

              to={`/category/${cat.key}`}

              className="category-item"

              aria-label={cat.name}

              title={cat.name}
            >

              <div className="category-circle">

                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="category-icon"
                  loading="lazy"
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