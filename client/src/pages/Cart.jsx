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

  const totalQty = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  const applyOffer = (qty) => {
    if (qty >= 10) return 20;
    if (qty >= 6) return 4;
    if (qty >= 2) return 1;
    return 0;
  };

  const freeItems = applyOffer(totalQty);

  const subtotal = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  const shipping = subtotal > 999 ? 0 : 89;

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h2>Your Cart</h2>

       {cart.items.map((item, index) => (
  <div key={index}>
<h3>{item.poster?.name}</h3>
            <p>Size: {item.size}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        ))}

        <h3>Subtotal: ₹{subtotal}</h3>
        <p>Free Items Applied: {freeItems}</p>
        <p>Shipping: ₹{shipping}</p>
        <h2>Total: ₹{subtotal + shipping}</h2>
      </div>
    </>
  );
}