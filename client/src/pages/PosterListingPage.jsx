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

  /* 🔥 COLLECTION CATEGORY MAPPING */

  const collectionMap = {

    trending: null, // show all

    room: ["aesthetic", "cars", "anime"],

    motivational: ["motivational"],

    spiritual: ["spiritual", "divine", "devotional"],

    cinema: ["bollywood", "movie posters", "actors"],

    fan: ["anime", "cricket", "football", "superheroes"]

  };

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      const res = await fetch("/api/posters");
      const data = await res.json();

      let filtered = data;

      if (type === "category") {
        filtered = data.filter(p => p.category === category);
      }

      if (type === "collection") {

        const allowedCategories = collectionMap[collection];

        if (!allowedCategories) {
          filtered = data;
        } else {
          filtered = data.filter(p =>
            allowedCategories.includes(p.category?.toLowerCase())
          );
        }

      }

      if (type === "single") {
        filtered = data.filter(p => p.productType === "single");
      }

      if (type === "set") {
        filtered = data.filter(p => p.productType === "set" && p.setCount == count);
      }

      if (type === "polarized") {
        filtered = data.filter(p => p.productType === "polarized" && p.setCount == count);
      }

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

      <div className="pl-title">
        <h1>{category || collection || "Posters"}</h1>
        <p>Premium curated wall art</p>
      </div>

      <OfferSlider type={type} />

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