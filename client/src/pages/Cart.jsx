import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const BASE_URL = "http://localhost:5000";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    const sessionId = localStorage.getItem("sessionId");

    const res = await fetch(`/api/cart?sessionId=${sessionId}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
          ? "Bearer " + localStorage.getItem("userToken")
          : ""
      }
    });

    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (item, change) => {
    const sessionId = localStorage.getItem("sessionId");

    await fetch("/api/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        posterId: item.poster._id,
        size: item.size,
        change,
        sessionId
      })
    });

    fetchCart();
  };

  const removeItem = async (item) => {
    const sessionId = localStorage.getItem("sessionId");

    await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        posterId: item.poster._id,
        size: item.size,
        sessionId
      })
    });

    fetchCart();
  };

  if (!cart) return <div className="container">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">

          <div className="cart-items">

            {cart.items.length === 0 && <p>Cart is empty.</p>}

            {cart.items.map((item, index) => (
              <div className="cart-item" key={index}>

                <img
                  src={`${BASE_URL}${item.poster?.thumbnail}`}
                  alt={item.poster?.name}
                />

                <div className="cart-details">
                  <h3>{item.poster?.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Price: ₹{item.unitPrice}</p>

                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item, 1)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item)}
                  >
                    Remove
                  </button>
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