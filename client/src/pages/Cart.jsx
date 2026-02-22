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

  if (!cart) return <div className="container">Loading...</div>;

  const subtotal = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  const shipping = subtotal > 999 ? 0 : 89;

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Your Cart</h2>

        <div className="cart-wrapper">
          <div className="cart-items">

            {cart.items.map((item, index) => (
              <div className="cart-item" key={index}>

                <div className="cart-image">
                  <img
                    src={item.poster?.thumbnail}
                    alt={item.poster?.name}
                  />
                </div>

                <div className="cart-info">
                  <h3>{item.poster?.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>

              </div>
            ))}

          </div>

          <div className="cart-summary card">
            <h3>Order Summary</h3>
            <p>Subtotal: ₹{subtotal}</p>
            <p>Shipping: ₹{shipping}</p>
            <h2>Total: ₹{subtotal + shipping}</h2>
            <button className="btn-primary">Proceed to Checkout</button>
          </div>

        </div>
      </div>
    </>
  );
}