import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(setPosters);
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Premium Wall Posters</h1>
        <p>Elevate your space with curated art prints.</p>
      </section>

      <section className="poster-grid">
        {posters.map(p => (
          <div className="poster-item" key={p._id}>
            <img src={p.thumbnail} alt="" />
            <h3>{p.name}</h3>
            <p>From ₹{p.sizes.A4.discountedPrice}</p>
            <Link to={`/poster/${p._id}`}>View</Link>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}