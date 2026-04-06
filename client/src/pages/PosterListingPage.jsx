import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/posterListing.css";

export default function PosterListingPage({ type }) {

  const { category, collection, count } = useParams();

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================= */

  useEffect(() => {

    const fetchPosters = async () => {

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
      setLoading(false);

    };

    fetchPosters();

  }, [type, category, collection, count]);



  /* =========================
     PAGINATION (4x5 GRID)
  ========================= */

  const ITEMS_PER_PAGE = 20;

  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = posters.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(posters.length / ITEMS_PER_PAGE);



  return (
    <div className="pl-container">

      {/* ================= HERO ================= */}

      <section className="pl-hero">

        <h1>
          {category || collection || type.toUpperCase()}
        </h1>

        <p>Explore premium posters curated for your space</p>

        <button
          onClick={() =>
            window.scrollTo({ top: 500, behavior: "smooth" })
          }
        >
          Explore Now
        </button>

      </section>


      {/* ================= OFFERS ================= */}

      <section className="pl-offers">

        {type === "single" && <OfferCard text="Buy 5 Get 5 Free" />}
        {type === "set" && <OfferCard text="Buy 3 Sets Get 2 Free" />}
        {type === "polarized" && <OfferCard text="Premium Polarized Offers" />}

      </section>


      {/* ================= GRID ================= */}

      <section className="pl-grid">

        {loading
          ? [...Array(20)].map((_, i) => (
              <div key={i} className="pl-skeleton" />
            ))
          : currentItems.map(p => (
              <PosterCard key={p._id} poster={p} />
            ))
        }

      </section>


      {/* ================= PAGINATION ================= */}

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



/* ================= CARD ================= */

function PosterCard({ poster }) {

  const size = poster.sizes?.A4 || Object.values(poster.sizes)[0];

  return (
    <div className="pl-card">

      <div className="pl-img">

        <img src={poster.thumbnail} className="img-main" />

        {poster.image1 && (
          <img src={poster.image1} className="img-hover" />
        )}

      </div>

      <h3>{poster.name}</h3>

      <div className="price">

        <span className="old">₹{size.displayPrice}</span>
        <span className="new">₹{size.discountedPrice}</span>

      </div>

      <button>Add to Cart</button>

    </div>
  );
}



/* ================= OFFER ================= */

function OfferCard({ text }) {
  return <div className="offer-card">{text}</div>;
}