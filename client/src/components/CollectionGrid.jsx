import { useNavigate } from "react-router-dom";
import "../styles/collection.css";

const collections = [
  {
    key: "room",
    image: "/categories/room.jpg"
  },
  {
    key: "trending",
    image: "/categories/trending.png"
  },
  
  {
    key: "motivational",
    image: "/categories/motivation.png"
  },
  {
    key: "spiritual",
    image: "/categories/spiritual.png"
  },
  {
    key: "cinema",
    image: "/categories/cinema.jpg"
  },
  {
    key: "fan",
    image: "/categories/fanzone.png"
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

            <img
              src={item.image}
              alt="collection"
              loading="lazy"
            />

          </div>

        ))}

      </div>

    </section>
  );
}