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
    key: "room",
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
    key: "cinema",
    image: "/categories/cinema.jpg"
  },
  {
    name: "Fan Zone",
    key: "fan",
    image: "/categories/fanzone.jpg"
  }
];

export default function CollectionGrid() {

  const navigate = useNavigate();

  return (
    <section className="collection-section">

      <h2 className="collection-title">Collections</h2>

      <div className="collection-grid">

        {collections.map((item, i) => (

          <div
            key={i}
            className="collection-card"
            onClick={() => navigate(`/collection/${item.key}`)}
          >

            <img src={item.image} alt={item.name} />

            <div className="collection-overlay" />

            <div className="collection-content">
              <h3>{item.name}</h3>
              <span>Explore →</span>
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}