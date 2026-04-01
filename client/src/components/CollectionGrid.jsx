import { useNavigate } from "react-router-dom";
import "../styles/collection.css";

const collections = [
  {
    name: "Trending Now",
    key: "trending",
    image: "/categories/trending.jpg"
  },
  {
    name: "Best for Your Room",
    key: "aesthetic",
    image: "/categories/room.jpg"
  },
  {
    name: "Hustle & Motivation",
    key: "motivational",
    image: "/categories/motivation.jpg"
  },
  {
    name: "Peace & Spirituality",
    key: "spiritual",
    image: "/categories/spiritual.jpg"
  },
  {
    name: "Cinema & Pop World",
    key: "bollywood",
    image: "/categories/cinema.jpg"
  },
  {
    name: "Fan Zone",
    key: "anime",
    image: "/categories/fanzone.jpg"
  }
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