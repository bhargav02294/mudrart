import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
export default function Cart() {

  const [cart, setCart] = useState(null);
  const sessionId = localStorage.getItem("sessionId");

  /* ===============================
     FETCH CART
  =============================== */

  const fetchCart = async () => {

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

  /* ===============================
     UPDATE QTY
  =============================== */

  const updateQty = async (posterId, size, change) => {

    await fetch("/api/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userToken")
          ? "Bearer " + localStorage.getItem("userToken")
          : ""
      },
      body: JSON.stringify({
        posterId,
        size,
        change,
        sessionId
      })
    });

    fetchCart();
  };

  /* ===============================
     REMOVE ITEM
  =============================== */

  const removeItem = async (posterId, size) => {

    await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userToken")
          ? "Bearer " + localStorage.getItem("userToken")
          : ""
      },
      body: JSON.stringify({
        posterId,
        size,
        sessionId
      })
    });

    fetchCart();
  };

  if (!cart) return <div className="container">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="container cart-page">

        <h1>Your Cart</h1>

        {cart.items.length === 0 && (
          <div className="empty-cart">
            Your cart is empty
          </div>
        )}

        <div className="cart-layout">

          {/* CART ITEMS */}
          <div className="cart-items">

            {cart.items.map((item, index) => (

              <div className="cart-item" key={index}>

                <img
                  src={item.poster.thumbnail}
                  className="cart-thumb"
                />

                <div className="cart-details">

                  <h3>{item.poster.name}</h3>

                  <p className="cart-size">
                    Size : {item.size}
                  </p>

                  <div className="qty-control">

                    <button
                      onClick={() =>
                        updateQty(item.poster._id, item.size, -1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQty(item.poster._id, item.size, 1)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cart-price">

                  <div className="price">
                    ₹{item.unitPrice * item.quantity}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.poster._id, item.size)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* CART SUMMARY */}

          <div className="cart-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cart.subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {cart.shipping === 0 ? "FREE" : `₹${cart.shipping}`}
              </span>
            </div>

            {cart.totalFreeItems > 0 && (
              <div className="offer-box">

                🎁 You received <strong>{cart.totalFreeItems}</strong> free posters

                {cart.singleOffer && (
                  <p>
                    Single Offer : Buy {cart.singleOffer.buy} Get {cart.singleOffer.free}
                  </p>
                )}

                {cart.setOffer && (
                  <p>
                    Set Offer : Buy {cart.setOffer.buy} Get {cart.setOffer.free}
                  </p>
                )}

              </div>
            )}

            <div className="summary-total">
              Total : ₹{cart.total}
            </div>

            {!cart.minimumValid && (
              <div className="minimum-note">
                Minimum order ₹199 required
              </div>
            )}

            <button
              className="checkout-btn"
              disabled={!cart.minimumValid}
            >
              Proceed To Checkout
            </button>

            <button
              className="checkout-btn"
              disabled={!cart.minimumValid}
              onClick={()=>navigate("/checkout/address")}
              >
              Proceed To Checkout
              </button>

            {cart.freeDistribution?.length > 0 && (

              <div className="free-items">

              <h4>Free Posters</h4>

              {cart.freeDistribution.map((f,i)=>(
              <p key={i}>
              {f.freeQty} × {f.size} posters
              </p>
              ))}

              </div>

              )}

          </div>

        </div>

      </div>
    </>
  );
}