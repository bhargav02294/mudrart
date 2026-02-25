import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PosterDetails() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const res = await fetch("/api/posters");
        const data = await res.json();

        const found = data.find(p => p._id.toString() === id);

        if (!found) {
          setLoading(false);
          return;
        }

        setPoster(found);

        // auto select first available size
        const availableSizes = Object.keys(found.sizes || {});
        if (availableSizes.length > 0) {
          setSize(availableSizes[0]);
        }

        setLoading(false);

      } catch (err) {
        console.error(err);
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
  if (!poster) return <div className="container">Poster not found</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="pd-layout">

          <div className="pd-image">
            <img src={poster.thumbnail} alt={poster.name} />
          </div>

          <div className="pd-info">

            <h1>{poster.name}</h1>

            <p className="pd-price">
  ₹{poster.sizes?.[size]?.discountedPrice || 0}
</p>

{poster.downloadPrice > 0 && (
  <p className="pd-download">
    Digital Download: ₹{poster.downloadPrice}
  </p>
)}

            <div className="pd-section">
              <h4>Select Size</h4>
              <div className="size-buttons">
                {Object.keys(poster.sizes).map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="pd-section">
              <h4>Quantity</h4>
              <div className="qty-box">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="pd-meta">
              <p>✔ Premium Matte Finish</p>
              <p>✔ Free Shipping Above ₹999</p>
              <p>✔ COD Available</p>
            </div>

            <button className="add-btn" onClick={addToCart}>
              Add To Cart
            </button>

          </div>

        </div>
      </div>
    </>
  );
}