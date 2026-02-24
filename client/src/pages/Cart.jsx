import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const BASE_URL = "http://localhost:5000";

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

  if (!cart) return <div className="container">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">

          <div className="cart-items">

            {cart.items.map((item, index) => (
              <div className="cart-item" key={index}>

                <img
                  src={`${BASE_URL}${item.poster?.thumbnail}`}
                  alt={item.poster?.name}
                />

                <div className="cart-details">
                  <h3>{item.poster?.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.unitPrice}</p>
                </div>

              </div>
            ))}

          </div>

          <div className="cart-summary">

            <h3>Order Summary</h3>

            <p>Subtotal: ₹{cart.subtotal}</p>
            <p>Shipping: ₹{cart.shipping}</p>
            <p>Free Items: {cart.totalFreeItems}</p>

            {!cart.minimumValid && (
              <p className="min-warning">
                Minimum order value ₹199 required.
              </p>
            )}

            <h2>Total: ₹{cart.total}</h2>

            <button
              className="btn-primary full-btn"
              disabled={!cart.minimumValid}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      </div>
    </>
  );
}