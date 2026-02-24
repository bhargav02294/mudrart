import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");

    fetch(`/api/cart?sessionId=${sessionId}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
          ? "Bearer " + localStorage.getItem("userToken")
          : ""
      }
    })
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  if (!cart) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Your Cart</h2>

        {cart.items.map((item, index) => (
          <div key={index}>
            <h3>{item.poster?.name}</h3>
            <p>Type: {item.type}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.unitPrice}</p>
          </div>
        ))}

        <hr />

        <p>Subtotal: ₹{cart.subtotal}</p>
        <p>Shipping: ₹{cart.shipping}</p>
        <p>Free Items: {cart.totalFreeItems}</p>

        {!cart.minimumValid && (
          <p style={{ color: "red" }}>
            Minimum order value ₹199 required.
          </p>
        )}

        <h2>Total: ₹{cart.total}</h2>

        <button disabled={!cart.minimumValid}>
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}