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

      const res = await fetch("/api/posters");
      const data = await res.json();

      let filtered = data;

      if (type === "category") filtered = data.filter(p => p.category === category);
      if (type === "collection") filtered = data.filter(p => p.category === collection);
      if (type === "single") filtered = data.filter(p => p.productType === "single");
      if (type === "set") filtered = data.filter(p => p.productType === "set" && p.setCount == count);
      if (type === "polarized") filtered = data.filter(p => p.productType === "polarized" && p.setCount == count);

      setPosters(filtered);
      setPage(1);
      setLoading(false);
    };

    fetchData();
  }, [type, category, collection, count]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = posters.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(posters.length / ITEMS_PER_PAGE);

  return (
    <div className="pl-page">

      {/* CLEAN TITLE */}
      <div className="pl-title">
        <h1>{category || collection || `${type} Posters`}</h1>
        <p>Premium curated wall art</p>
      </div>

      <OfferSlider type={type} />

      <section className="pl-grid">
        {loading
          ? [...Array(20)].map((_, i) => <div key={i} className="pl-skeleton" />)
          : current.map(p => <PosterCard key={p._id} poster={p} />)
        }
      </section>

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
/* HERO IMAGES */

function getHeroImage(type, count) {

  if (type === "set") {
    const map = {
      2: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      3: "https://images.unsplash.com/photo-1493666438817-866a91353ca9",
      4: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      6: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      8: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      10: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      20: "https://images.unsplash.com/photo-1513694203232-719a280e022f"
    };
    return map[count] || map[4];
  }

  if (type === "polarized") {
    const map = {
      12: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      24: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      36: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      48: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde"
    };
    return map[count] || map[12];
  }

  return "";
}