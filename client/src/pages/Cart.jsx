import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  const sessionId = localStorage.getItem("sessionId");
  const userToken = localStorage.getItem("userToken");

  /* ===============================
     AUTH HEADER
  =============================== */

  const getHeaders = () => {
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }

    return headers;
  };

  /* ===============================
     FETCH CART
  =============================== */

  const fetchCart = async () => {
    try {
      setError("");

      const res = await fetch(
        `/api/cart?sessionId=${encodeURIComponent(sessionId || "")}`,
        {
          headers: getHeaders()
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Cart API error:", data);

        /*
          Invalid / expired login token
        */
        if (res.status === 401) {
          localStorage.removeItem("userToken");

          setError("Your login session has expired. Please sign in again.");

          setCart({
            items: [],
            subtotal: 0,
            shipping: 0,
            total: 0,
            totalFreeItems: 0,
            minimumValid: false
          });

          return;
        }

        throw new Error(data.message || "Unable to load cart");
      }

      /*
        Make sure the API returned a valid cart object.
      */
      if (!data || !Array.isArray(data.items)) {
        console.error("Invalid cart response:", data);

        throw new Error("Invalid cart data received from server");
      }

      setCart(data);
    } catch (err) {
      console.error("FETCH CART ERROR:", err);

      setError(err.message || "Unable to load cart");

      /*
        Never allow the page to become blank.
      */
      setCart({
        items: [],
        subtotal: 0,
        shipping: 0,
        total: 0,
        totalFreeItems: 0,
        minimumValid: false
      });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ===============================
     UPDATE QTY
  =============================== */

  const updateQty = async (posterId, size, change) => {
    try {
      const res = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getHeaders()
        },
        body: JSON.stringify({
          posterId,
          size,
          change,
          sessionId
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Update cart error:", data);
        throw new Error(data.message || "Unable to update cart");
      }

      setCart(data);
    } catch (err) {
      console.error("UPDATE QTY ERROR:", err);
      setError(err.message || "Unable to update quantity");
    }
  };

  /* ===============================
     REMOVE ITEM
  =============================== */

  const removeItem = async (posterId, size) => {
    try {
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getHeaders()
        },
        body: JSON.stringify({
          posterId,
          size,
          sessionId
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Remove cart error:", data);
        throw new Error(data.message || "Unable to remove item");
      }

      setCart(data);
    } catch (err) {
      console.error("REMOVE ITEM ERROR:", err);
      setError(err.message || "Unable to remove item");
    }
  };

  /* ===============================
     LOADING
  =============================== */

  if (!cart) {
    return (
      <>
        <Navbar />

        <div className="container cart-page">
          <div className="cart-loading">
            Loading cart...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container cart-page">

        <h1>Your Cart</h1>

        {/* ERROR MESSAGE */}

        {error && (
          <div className="cart-error">
            {error}

            {error.toLowerCase().includes("session") && (
              <button
                onClick={() => navigate("/login")}
              >
                Sign In Again
              </button>
            )}
          </div>
        )}

        {/* EMPTY CART */}

        {cart.items.length === 0 && (
          <div className="empty-cart">
            Your cart is empty
          </div>
        )}

        {/* CART CONTENT */}

        {cart.items.length > 0 && (
          <div className="cart-layout">

            {/* ===============================
                CART ITEMS
            =============================== */}

            <div className="cart-items">

              {cart.items.map((item, index) => {

                /*
                  Defensive check:
                  Prevent page crash if a poster was deleted
                  from the database.
                */

                if (!item.poster) {
                  return (
                    <div
                      className="cart-item"
                      key={index}
                    >
                      <div className="cart-details">
                        <h3>Unavailable Poster</h3>

                        <p className="cart-size">
                          This poster is no longer available.
                        </p>

                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeItem(
                              item.poster?._id,
                              item.size
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    className="cart-item"
                    key={`${item.poster._id}-${item.size}`}
                  >

                    <img
                      src={item.poster.thumbnail}
                      className="cart-thumb"
                      alt={item.poster.name}
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />

                    <div className="cart-details">

                      <h3>{item.poster.name}</h3>

                      <p className="cart-size">
                        Size : {item.size}
                      </p>

                      <div className="qty-control">

                        <button
                          onClick={() =>
                            updateQty(
                              item.poster._id,
                              item.size,
                              -1
                            )
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQty(
                              item.poster._id,
                              item.size,
                              1
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <div className="cart-price">

                      <div className="price">
                        ₹{item.payablePrice}
                      </div>

                      {item.freeQty > 0 && (
                        <div className="free-tag">
                          🎁 {item.freeQty} free
                        </div>
                      )}

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeItem(
                            item.poster._id,
                            item.size
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* ===============================
                CART SUMMARY
            =============================== */}

            <div className="cart-summary">

              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cart.subtotal}</span>
              </div>

              {cart.totalFreeItems > 0 && (
                <div className="offer-box">

                  🎁 You received{" "}
                  <strong>
                    {cart.totalFreeItems}
                  </strong>{" "}
                  free posters

                  {cart.singleOffer && (
                    <p>
                      Single Offer : Buy{" "}
                      {cart.singleOffer.buy} Get{" "}
                      {cart.singleOffer.free}
                    </p>
                  )}

                  {cart.setOffer && (
                    <p>
                      Set Offer : Buy{" "}
                      {cart.setOffer.buy} Get{" "}
                      {cart.setOffer.free}
                    </p>
                  )}

                </div>
              )}

              <div className="summary-total">
                <span>Total</span>
                <span>₹{cart.total}</span>
              </div>

              {!cart.minimumValid && (
                <div className="minimum-note">
                  Minimum order ₹199 required
                </div>
              )}

              <button
                className="checkout-btn"
                disabled={!cart.minimumValid}
                onClick={() =>
                  navigate("/checkout/address")
                }
              >
                Proceed To Checkout
              </button>

              {cart.freeDistribution?.length > 0 && (
                <div className="free-items">

                  <h4>Free Posters</h4>

                  {cart.freeDistribution.map((f, i) => (
                    <p key={i}>
                      {f.freeQty} × {f.size} posters
                    </p>
                  ))}

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </>
  );
}