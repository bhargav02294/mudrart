import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PosterCard from "../components/PosterCard";
import "../styles/posterListing.css";

export default function PosterListingPage({ type }) {

  const { category, collection, count } = useParams();

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  /* ================= FETCH ================= */

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      try {
        const res = await fetch("/api/posters");
        const data = await res.json();

        let filtered = data;

        if (type === "category") {
          filtered = data.filter(p => p.category === category);
        }

        if (type === "collection") {
          filtered = data.filter(p => p.category === collection);
        }

        if (type === "single") {
          filtered = data.filter(p => p.productType === "single");
        }

        if (type === "set") {
          filtered = data.filter(
            p => p.productType === "set" && p.setCount == count
          );
        }

        if (type === "polarized") {
          filtered = data.filter(
            p => p.productType === "polarized" && p.setCount == count
          );
        }

        setPosters(filtered);
        setPage(1); // 🔥 FIXED
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }

      setLoading(false);

    };

    fetchData();

  }, [type, category, collection, count]);



  /* ================= PAGINATION ================= */

  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = posters.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(posters.length / ITEMS_PER_PAGE);



  /* ================= HERO ================= */

  const heroImage = getHeroImage(type);

  return (
    <div className="pl-page">

      {/* HERO */}
      <section
        className="pl-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="pl-overlay" />

        <div className="pl-hero-content">
          <h1>{category || collection || type.toUpperCase()}</h1>
          <p>Premium Posters Collection</p>

          <button
            onClick={() =>
              window.scrollTo({ top: 600, behavior: "smooth" })
            }
          >
            Explore Now
          </button>
        </div>
      </section>


      {/* OFFERS */}
      <section className="pl-offers">
        {type === "single" && <OfferCard text="Buy 5 Get 5 Free" />}
        {type === "set" && <OfferCard text="Buy 6 Get 4 Free" />}
        {type === "polarized" && <OfferCard text="Premium Deals" />}
      </section>


      {/* GRID */}
      <section className="pl-grid">

        {loading
          ? [...Array(20)].map((_, i) => (
              <div key={i} className="pl-skeleton" />
            ))
          : current.map(p => (
              <PosterCard key={p._id} poster={p} />
            ))
        }

      </section>


      {/* PAGINATION */}
      <div className="pl-pagination">

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

      </div>

    </div>
  );
}


/* HERO IMAGE */

function getHeroImage(type) {

  if (type === "single") {
    return "https://images.unsplash.com/photo-1547891654-e66ed7ebb968";
  }

  if (type === "set") {
    return "https://images.unsplash.com/photo-1519681393784-d120267933ba";
  }

  if (type === "polarized") {
    return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
  }

  return "https://images.unsplash.com/photo-1492724441997-5dc865305da7";
}

function OfferCard({ text }) {
  return <div className="offer-card">{text}</div>;
}