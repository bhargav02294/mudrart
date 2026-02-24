import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const BASE_URL = "http://localhost:5000"; // change in production

export default function PosterDetails() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("A4");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const res = await fetch("/api/posters");
        const data = await res.json();

        if (!Array.isArray(data)) {
          setLoading(false);
          return;
        }

        const found = data.find(p => p._id === id);

        if (!found) {
          setLoading(false);
          return;
        }

        setPoster(found);
        setLoading(false);

      } catch (err) {
        console.error("Poster fetch error:", err);
        setLoading(false);
      }
    };

    fetchPoster();
  }, [id]);

  const addToCart = async () => {
    const sessionId =
      localStorage.getItem("sessionId") || Date.now().toString();
    localStorage.setItem("sessionId", sessionId);

    await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userToken")
          ? "Bearer " + localStorage.getItem("userToken")
          : ""
      },
      body: JSON.stringify({
        posterId: id,
        size,
        quantity: qty,
        sessionId
      })
    });

    alert("Added to cart");
  };

  if (loading) return <div className="container">Loading...</div>;

  if (!poster)
    return <div className="container">Poster not found.</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="poster-detail-layout">

          <div className="poster-image-section">
            <img
              src={`${BASE_URL}${poster.thumbnail}`}
              alt={poster.name}
              onError={(e) => {
                e.target.src = "/placeholder.jpg";
              }}
            />
          </div>

          <div className="poster-info-section">
            <h1>{poster.name}</h1>

            <p className="poster-price">
              ₹{poster?.sizes?.[size]?.discountedPrice || 0}
            </p>

            <div className="field-group">
              <label>Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {Object.keys(poster.sizes).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>Quantity</label>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="poster-delivery">
              <p>✔ Free Shipping Above ₹999</p>
              <p>✔ COD Available (+₹89)</p>
            </div>

            <button
              className="btn-primary full-btn"
              onClick={addToCart}
            >
              Add To Cart
            </button>

          </div>
        </div>
      </div>
    </>
  );
}