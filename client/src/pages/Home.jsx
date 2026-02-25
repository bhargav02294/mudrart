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

  const single = posters.filter(p => p.productType === "single");
  const sets = posters.filter(p => p.productType === "set");
  const polarized = posters.filter(p => p.productType === "polarized");

  const getDisplayPrice = (poster) => {
    if (!poster?.sizes) return 0;

    if (poster.sizes.A6) {
      return poster.sizes.A6.discountedPrice;
    }

    if (poster.sizes.A5) {
      return poster.sizes.A5.discountedPrice;
    }

    const firstSize = Object.keys(poster.sizes)[0];
    return poster.sizes[firstSize]?.discountedPrice || 0;
  };

  const CategorySection = ({ title, data }) => {
    if (data.length === 0) return null;

    return (
      <section className="category-section">
        <h2 className="category-heading">{title}</h2>

        <div className="shop-grid">
          {data.map((p) => (
            <Link
              to={`/poster/${p._id}`}
              className="shop-card"
              key={p._id}
            >
              <div className="shop-image">
                <img src={p.thumbnail} alt={p.name} />
              </div>

              <div className="shop-body">

                <div className="shop-type">
                  {p.productType === "single" && "Single"}
                  {p.productType === "set" && `Set of ${p.setCount}`}
                  {p.productType === "polarized" && `Polarized (${p.setCount})`}
                </div>

                <h3>{p.name}</h3>

                <div className="price-block">
                  <span className="main-price">
                    ₹{getDisplayPrice(p)}
                  </span>

                  {p.downloadPrice > 0 && (
                    <span className="download-price">
                      Download ₹{p.downloadPrice}
                    </span>
                  )}
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />

      <section className="hero-section">
        <div className="hero-content">
          <h1>Art That Defines Your Space</h1>
          <p>Premium curated posters for modern interiors.</p>
        </div>
      </section>

      <div className="container">

        <CategorySection title="Single Posters" data={single} />
        <CategorySection title="Poster Sets" data={sets} />
        <CategorySection title="Polarized Collection" data={polarized} />

      </div>

      <Footer />
    </>
  );
}