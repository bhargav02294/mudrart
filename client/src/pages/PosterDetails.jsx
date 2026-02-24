import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const BASE_URL = "http://localhost:5000"; // change in production

export default function PosterDetails() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [size, setSize] = useState("A4");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`/api/posters/${id}`)
      .then(res => res.json())
      .then(data => setPoster(data));
  }, [id]);

  const addToCart = async () => {
    const sessionId =
      localStorage.getItem("sessionId") || Date.now().toString();
    localStorage.setItem("sessionId", sessionId);

    const res = await fetch("/api/cart/add", {
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

    const data = await res.json();

    if (!data.minimumValid) {
      alert("Minimum purchase ₹199 required.");
    } else {
      alert("Added to cart.");
    }
  };

  if (!poster) return <div className="container">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="poster-detail-layout">

          <div className="poster-image-section">
            <img
              src={`${BASE_URL}${poster.thumbnail}`}
              alt={poster.name}
            />
          </div>

          <div className="poster-info-section">

            <h1>{poster.name}</h1>

            <p className="poster-type">
              {poster.type === "set"
                ? `${poster.setCount} Poster Set`
                : "Single Poster"}
            </p>

            <p className="poster-price">
              ₹{poster?.sizes?.[size]?.discountedPrice}
            </p>

            <div className="field-group">
              <label>Select Size</label>
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
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
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