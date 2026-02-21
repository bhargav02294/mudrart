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
        if (Array.isArray(data)) {
          setPosters(data);
        } else {
          setPosters([]);
        }
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Art That Defines Your Space</h1>
        <p>Curated premium wall posters for modern interiors.</p>
      </section>

      <section className="poster-grid">
        {posters.map((p) => (
          <Link
            to={`/poster/${p._id}`}
            className="poster-item"
            key={p._id}
          >
            <img src={p.thumbnail} alt={p.name} />
            <h3>{p.name}</h3>
            <p>
              From ₹{p?.sizes?.A4?.discountedPrice || 0}
            </p>
          </Link>
        ))}
      </section>

      <Footer />
    </>
  );
}