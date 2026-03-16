import "../styles/categories.css";

const categories = [
  { name: "Cricket", icon: "/categories/cricket.png" },
  { name: "Cars", icon: "/categories/cars.png" },
  { name: "Movies", icon: "/categories/movie.png" },
  { name: "Motivational", icon: "/categories/motivational.png" },
  { name: "Anime", icon: "/categories/anime.png" },
  { name: "Aesthetic", icon: "/categories/aesthetic.png" },
  { name: "Devotional", icon: "/categories/devotional.png" },
];

export default function CategorySection() {

  const firstRow = categories.slice(0,4);
  const secondRow = categories.slice(4);

  return (

    <section className="categories">

      <div className="categories-container">

        {/* FIRST ROW */}
        <div className="categories-row row-top">
          {firstRow.map((cat,index)=>(
            <div className="category-item" key={index}>
              <div className="category-circle">
                <img src={cat.icon} alt={cat.name} className="category-icon"/>
              </div>
              <p className="category-name">{cat.name}</p>
            </div>
          ))}
        </div>


        {/* SECOND ROW */}
        <div className="categories-row row-bottom">
          {secondRow.map((cat,index)=>(
            <div className="category-item" key={index}>
              <div className="category-circle">
                <img src={cat.icon} alt={cat.name} className="category-icon"/>
              </div>
              <p className="category-name">{cat.name}</p>
            </div>
          ))}
        </div>

      </div>

    </section>

  );

}