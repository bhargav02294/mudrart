import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cart, setCart] = useState({
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
    totalFreeItems: 0,
    minimumValid: false
  });

  const sessionId =
    localStorage.getItem("sessionId") || Date.now().toString();

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`/api/cart?sessionId=${sessionId}`);
      const data = await res.json();

      setCart({
        items: data.items || [],
        subtotal: data.subtotal || 0,
        shipping: data.shipping || 0,
        total: data.total || 0,
        totalFreeItems: data.totalFreeItems || 0,
        minimumValid: data.minimumValid || false
      });
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  const updateQty = async (item, change) => {
    try {
      const res = await fetch("/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posterId: item.poster?._id,
          size: item.size,
          change,
          sessionId
        })
      });

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const removeItem = async (item) => {
    try {
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posterId: item.poster?._id,
          size: item.size,
          sessionId
        })
      });

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="cart-container">

        <div className="cart-left">
          <h2>Your Cart</h2>

          {cart.items.length === 0 && (
            <div className="empty-cart-card">
              <h3>Your cart is empty</h3>
              <p>Add beautiful posters to start decorating.</p>
            </div>
          )}

          {cart.items.map((item, index) => (
            <div className="cart-card" key={index}>

              <img
                src={item.poster?.thumbnail}
                alt={item.poster?.name}
              />

              <div className="cart-info">
                <h3>{item.poster?.name}</h3>
                <p className="cart-size">Size: {item.size}</p>

                <div className="qty-control">
                  <button
                    onClick={() => updateQty(item, -1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQty(item, 1)}
                  >
                    +
                  </button>
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

          <div className="summary-line">
            <span>Subtotal</span>
            <span>₹{cart.subtotal}</span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span>₹{cart.shipping}</span>
          </div>

          <div className="summary-line">
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