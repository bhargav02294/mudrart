import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PosterCard from "../components/PosterCard";
import "../styles/posterListing.css";
import OfferSlider from "../components/OfferSlider";

export default function PosterListingPage({ type }) {

  const { category, collection, count } = useParams();

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

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
        setPage(1);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchData();

  }, [type, category, collection, count]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = posters.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(posters.length / ITEMS_PER_PAGE);

  const showHero = type === "set" || type === "polarized";
  const heroImage = getHeroImage(type, count);

  return (
    <div className="pl-page">

      {/* HERO ONLY FOR SET & POLARIZED */}
      {showHero ? (
        <section
          className="pl-hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="pl-overlay" />

          <div className="pl-hero-content">
            <h1>{getTitle(type, count)}</h1>
            <p>{getSubtitle(type)}</p>

            <button onClick={() =>
              window.scrollTo({ top: 600, behavior: "smooth" })
            }>
              Explore
            </button>
          </div>
        </section>
      ) : (
        <div className="pl-header">
          <h1>{getTitle(type, category, collection)}</h1>
          <p>Premium Poster Collection</p>
        </div>
      )}

      <OfferSlider type={type} />

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


/* ================= HERO IMAGES ================= */

function getHeroImage(type, count) {

  if (type === "set") {
    const map = {
      2: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      3: "https://images.unsplash.com/photo-1493666438817-866a91353ca9",
      4: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      6: "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
      8: "https://images.unsplash.com/photo-1505692794403-34d4982f88aa",
      10: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      20: "https://images.unsplash.com/photo-1493666438817-866a91353ca9"
    };
    return map[count] || map[3];
  }

  if (type === "polarized") {
    const map = {
      12: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0",
      24: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      36: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      48: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    };
    return map[count] || map[12];
  }

  return "";
}


/* ================= TEXT ================= */

function getTitle(type, category, collection, count) {

  if (type === "set") return `${count} Panel Wall Set`;
  if (type === "polarized") return `${count} Polaroid Pack`;

  return category || collection || "Posters";
}

function getSubtitle(type) {
  if (type === "set") return "Curated wall compositions for modern spaces";
  if (type === "polarized") return "Compact aesthetic prints for daily inspiration";
  return "";
}