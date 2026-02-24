import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const sessionId =
    localStorage.getItem("sessionId") || Date.now().toString();

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await fetch(`/api/cart?sessionId=${sessionId}`);
    const data = await res.json();
    setCart(data);
  };

  const updateQty = async (item, change) => {
    const res = await fetch("/api/cart/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        posterId: item.poster._id,
        size: item.size,
        change,
        sessionId
      })
    });

    const data = await res.json();
    setCart(data);
  };

  const removeItem = async (item) => {
    const res = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        posterId: item.poster._id,
        size: item.size,
        sessionId
      })
    });

    const data = await res.json();
    setCart(data);
  };

  if (!cart) return <div className="container">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="cart-container">

        <div className="cart-left">
          <h2>Your Cart</h2>

          {cart.items.length === 0 && (
            <div className="empty-cart">
              Your cart is empty.
            </div>
          )}

          {cart.items.map((item, index) => (
            <div className="cart-card" key={index}>

              <img
                src={item.poster.thumbnail}
                alt={item.poster.name}
              />

              <div className="cart-card-info">
                <h3>{item.poster.name}</h3>
                <p className="size-label">Size: {item.size}</p>

                <div className="qty-wrapper">
                  <button onClick={() => updateQty(item, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item, 1)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item)}
                >
                  Remove
                </button>
              </div>

              <div className="cart-price">
                ₹{item.unitPrice * item.quantity}
              </div>

            </div>
          ))}
        </div>

        <div className="cart-right">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cart.subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{cart.shipping}</span>
          </div>

          <div className="summary-row">
            <span>Free Items</span>
            <span>{cart.totalFreeItems}</span>
          </div>

          {!cart.minimumValid && (
            <div className="min-alert">
              Minimum order value ₹199 required
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <span>₹{cart.total}</span>
          </div>

          <button
            className="checkout-btn"
            disabled={!cart.minimumValid}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </>
  );
}