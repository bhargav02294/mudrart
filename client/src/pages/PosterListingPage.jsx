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

  const collectionMap = {
    trending: null,
    room: ["aesthetic", "cars", "anime"],
    motivational: ["motivational"],
    spiritual: ["spiritual", "divine", "devotional"],
    cinema: ["bollywood", "movie posters", "actors"],
    fan: ["anime", "cricket", "football", "superheroes"]
  };

  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoading(true);

        const res = await fetch("/api/posters");

        // 🔥 SAFETY CHECK
        if (!res.ok) {
          throw new Error("API FAILED");
        }

        const data = await res.json();

        // 🔥 SAFETY: ensure array
        if (!Array.isArray(data)) {
          setPosters([]);
          setLoading(false);
          return;
        }

        let filtered = [...data];

        /* =========================
           FILTER LOGIC (SAFE)
        ========================= */

        if (type === "category") {
          filtered = data.filter(
            p => p.category?.toLowerCase() === category?.toLowerCase()
          );
        }

        if (type === "collection") {
          const allowedCategories = collectionMap[collection];

          if (allowedCategories) {
            filtered = data.filter(p =>
              allowedCategories.includes(p.category?.toLowerCase())
            );
          }
        }

        if (type === "single") {
          filtered = data.filter(p => p.productType === "single");
        }

        if (type === "set") {
          filtered = data.filter(
            p =>
              p.productType === "set" &&
              String(p.setCount) === String(count)
          );
        }

        if (type === "polarized") {
          filtered = data.filter(
            p =>
              p.productType === "polarized" &&
              String(p.setCount) === String(count)
          );
        }

        setPosters(filtered || []);
        setPage(1);

      } catch (error) {
        console.error("POSTER LIST ERROR:", error);
        setPosters([]);
      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, [type, category, collection, count]);

  /* =========================
     PAGINATION SAFE
  ========================= */

  const safePosters = Array.isArray(posters) ? posters : [];

  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = safePosters.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(safePosters.length / ITEMS_PER_PAGE);

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="pl-page">

      <div className="pl-title">
        <h1>{category || collection || "Posters"}</h1>
        <p>Premium curated wall art</p>
      </div>

      <OfferSlider type={type} />

      <section className="pl-grid">

        {loading ? (

          [...Array(12)].map((_, i) => (
            <div key={i} className="pl-skeleton" />
          ))

        ) : current.length > 0 ? (

          current.map(p => (
            <PosterCard key={p._id} poster={p} />
          ))

        ) : (

          <div style={{ padding: "40px", textAlign: "center" }}>
            No posters found
          </div>

        )}

      </section>

      {totalPages > 1 && (
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
      )}

    </div>
  );
}