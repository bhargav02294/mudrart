import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(data => setPosters(data));
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Art That Defines Your Space</h1>
        <p>Curated premium wall posters for modern interiors.</p>
      </section>

      <section className="poster-grid">
        {posters.map(p => (
          <div className="poster-item" key={p._id}>
            import { Link } from "react-router-dom";

<Link to={`/poster/${p._id}`}>
  <img src={p.thumbnail} alt={p.name} />
  <h3>{p.name}</h3>
  <p>From ₹{p?.sizes?.A4?.discountedPrice}</p>
</Link>
          </div>
        ))}

      </section>


      <Footer />
    </>
  );
}