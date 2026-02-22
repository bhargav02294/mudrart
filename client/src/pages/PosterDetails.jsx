import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PosterDetails() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [size, setSize] = useState("A4");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setPoster(found);
      });
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

  if (!poster) return <div className="container">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="poster-detail-wrapper">

          <div className="poster-detail-image">
            <img src={poster.thumbnail} alt={poster.name} />
          </div>

          <div className="poster-detail-info">
            <h2>{poster.name}</h2>

            <p className="detail-price">
              ₹{poster?.sizes?.[size]?.discountedPrice || 0}
            </p>

            <label>Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="12x18">12x18</option>
              <option value="Custom">Custom</option>
            </select>

            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />

            <div className="delivery-info">
              <p>✔ Free Shipping Available</p>
              <p>✔ COD Available (+₹89)</p>
            </div>

            <button
              className="btn-primary detail-btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </>
  );
}