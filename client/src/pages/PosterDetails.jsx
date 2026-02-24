import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PosterDetails() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [size, setSize] = useState("A4");
  const [qty, setQty] = useState(1);
  const [type, setType] = useState("single");
  const [setCount, setSetCount] = useState(2);

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
        sessionId,
        type,
        setCount
      })
    });

    const data = await res.json();

    if (!data.minimumValid) {
      alert("Minimum purchase ₹199 required.");
    } else {
      alert("Added to cart successfully.");
    }
  };

  if (!poster) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>{poster.name}</h2>

        <select onChange={(e) => setType(e.target.value)}>
          <option value="single">Single Poster</option>
          <option value="set">Poster Set</option>
        </select>

        {type === "set" && (
          <select onChange={(e) => setSetCount(Number(e.target.value))}>
            <option value="2">2 Set</option>
            <option value="3">3 Set</option>
            <option value="4">4 Set</option>
            <option value="6">6 Set</option>
            <option value="8">8 Set</option>
            <option value="9">9 Set</option>
            <option value="10">10 Set</option>
            <option value="20">20 Set</option>
          </select>
        )}

        <select onChange={(e) => setSize(e.target.value)}>
          <option value="A5">A5</option>
          <option value="A4">A4</option>
          <option value="12x18">12x18</option>
        </select>

        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <button onClick={addToCart}>Add To Cart</button>
      </div>
    </>
  );
}