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

  return (

    <section className="categories">

      <div className="categories-container">

        {categories.map((cat, index) => (

          <div className="category-item" key={index}>

            <div className="category-circle">

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

    </section>

  );

}