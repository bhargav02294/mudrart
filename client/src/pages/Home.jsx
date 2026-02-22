import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(data => {
        setPosters(Array.isArray(data) ? data : []);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero-section">
        <div className="hero-content">
          <h1>Art That Defines Your Space</h1>
          <p>Curated premium wall posters for modern interiors.</p>
        </div>
      </section>

      <div className="container">
        <div className="poster-grid">
          {posters.map((p) => (
            <Link
              to={`/poster/${p._id}`}
              className="poster-card"
              key={p._id}
            >
              <div className="poster-image-wrapper">
                <img src={p.thumbnail} alt={p.name} />
              </div>

              <div className="poster-card-body">
                <h3>{p.name}</h3>
                <p className="poster-price">
                  From ₹{p?.sizes?.A4?.discountedPrice || 0}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}