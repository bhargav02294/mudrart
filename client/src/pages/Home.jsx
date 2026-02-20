import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(data => setPosters(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Premium Wall Posters</h1>
        <p>Modern. Minimal. Artistic.</p>
      </section>

      <section className="poster-grid">
        {posters.map(p => (
          <div className="poster-item" key={p._id}>
            <img src={p.thumbnail} alt={p.name} />
            <h3>{p.name}</h3>
            <p>From ₹{p?.sizes?.A4?.discountedPrice}</p>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}