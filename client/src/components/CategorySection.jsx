import "../styles/categories.css";

const categories = [
  { name: "Entertainment", icon: "/categories/entertainment.png", key: "entertainment", color: "c1" },
  { name: "Superheroes", icon: "/categories/superheroes.png", key: "marvel_dc", color: "c2" },
  { name: "Sports", icon: "/categories/sports.png", key: "sports", color: "c3" },
  { name: "Anime", icon: "/categories/anime.png", key: "anime", color: "c4" },
  { name: "Aesthetic", icon: "/categories/aesthetic.png", key: "aesthetic", color: "c5" },
  { name: "Spiritual", icon: "/categories/spiritual2.png", key: "spiritual", color: "c6" },
  { name: "Lifestyle", icon: "/categories/lifestyle.png", key: "lifestyle", color: "c7" },
];

export default function CategorySection() {

  const firstRow = categories.slice(0,4);
  const secondRow = categories.slice(4);

  return (

    <section className="categories">

      <div className="categories-header">

        <h2 className="categories-title">
          Browse by Category
        </h2>

        <p className="categories-subtitle">
          Explore posters across top themes and styles
        </p>

      </div>

      <div className="categories-container">

        {/* FIRST ROW */}
        <div className="categories-row row-top">
          {firstRow.map((cat,index)=>(

            <div className="category-item" key={index}>

              <div className={`category-circle ${cat.color}`}>

                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="category-icon"
                />

              </div>

              <p className="category-name">{cat.name}</p>

            </div>

          ))}
        </div>

        {/* SECOND ROW */}
        <div className="categories-row row-bottom">
          {secondRow.map((cat,index)=>(

            <div className="category-item" key={index}>

              <div className={`category-circle ${cat.color}`}>

                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="category-icon"
                />

              </div>

              <p className="category-name">{cat.name}</p>

            </div>

          ))}
        </div>

      </div>

    </section>

  );

}