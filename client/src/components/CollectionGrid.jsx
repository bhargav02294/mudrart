import { Link } from "react-router-dom";
import "../styles/collection.css";

const collections = [

  {
    key: "room",
    image: "/categories/room.jpg",
    title: "Room Decor Posters"
  },

  {
    key: "trending",
    image: "/categories/trending.png",
    title: "Trending Posters"
  },

  {
    key: "motivational",
    image: "/categories/motivation.png",
    title: "Motivational Posters"
  },

  {
    key: "spiritual",
    image: "/categories/spiritual.png",
    title: "Spiritual Collection"
  },

  {
    key: "cinema",
    image: "/categories/cinema.jpg",
    title: "Cinema Posters"
  },

  {
    key: "fan",
    image: "/categories/fanzone.png",
    title: "Fan Zone Posters"
  }

];

export default function CollectionGrid() {

  return (

    <section className="collection-section">

      <h2 className="collection-title">
        Explore Poster Collections
      </h2>

      <div className="collection-grid">

        {collections.map((item, i) => (

          <Link
            key={i}

            to={`/collection/${item.key}`}

            className="collection-card"

            aria-label={item.title}

            title={item.title}
          >

            <img
              src={item.image}

              alt={item.title}

              loading="lazy"
            />

          </Link>

        ))}

      </div>

    </section>

  );

}