import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  const sessionId = localStorage.getItem("sessionId");
  const userToken = localStorage.getItem("userToken");


  /* =====================================================
     AUTH HEADERS
  ===================================================== */

  const getHeaders = () => {

    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }

    return headers;

  };


  /* =====================================================
     FETCH CART
  ===================================================== */

  const fetchCart = async () => {

    try {

      setError("");

      const res = await fetch(
        `/api/cart?sessionId=${encodeURIComponent(
          sessionId || ""
        )}`,
        {
          headers: getHeaders()
        }
      );


      const data = await res.json();


      if (!res.ok) {

        console.error("Cart API error:", data);


        if (res.status === 401) {

          localStorage.removeItem("userToken");

          setError(
            "Your login session has expired. Please sign in again."
          );


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


        throw new Error(
          data.message || "Unable to load cart"
        );

      }


      if (!data || !Array.isArray(data.items)) {

        throw new Error(
          "Invalid cart data received from server"
        );

      }


      setCart(data);

    } catch (err) {

      console.error("FETCH CART ERROR:", err);

      setError(
        err.message || "Unable to load cart"
      );


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


  /* =====================================================
     UPDATE QUANTITY
  ===================================================== */

  const updateQty = async (
    posterId,
    size,
    change
  ) => {

    try {

      const res = await fetch(
        "/api/cart/update",
        {
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
        }
      );


      const data = await res.json();


      if (!res.ok) {

        throw new Error(
          data.message ||
          "Unable to update quantity"
        );

      }


      setCart(data);

    } catch (err) {

      console.error(
        "UPDATE QTY ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to update quantity"
      );

    }

  };


  /* =====================================================
     REMOVE ITEM
  ===================================================== */

  const removeItem = async (
    posterId,
    size
  ) => {

    try {

      const res = await fetch(
        "/api/cart/remove",
        {
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
        }
      );


      const data = await res.json();


      if (!res.ok) {

        throw new Error(
          data.message ||
          "Unable to remove item"
        );

      }


      setCart(data);

    } catch (err) {

      console.error(
        "REMOVE ITEM ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to remove item"
      );

    }

  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (!cart) {

    return (

      <>
        <Navbar />

        <main className="cart-page">

          <div className="cart-loading-card">

            <div className="cart-loading-spinner" />

            <h2>
              Loading your cart
            </h2>

            <p>
              Just a moment...
            </p>

          </div>

        </main>

      </>

    );

  }


  return (

    <>

      <Navbar />


      <main className="cart-page">


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="cart-header">

          <div>

            <span className="cart-eyebrow">
              SHOPPING BAG
            </span>

            <h1>
              Your Cart
            </h1>

            <p>
              Review your selected posters before checkout.
            </p>

          </div>


          {cart.items.length > 0 && (

            <span className="cart-item-count">

              {cart.items.length}
              {cart.items.length === 1
                ? " item"
                : " items"
              }

            </span>

          )}

        </section>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="cart-error">

            <div>

              <strong>
                Something needs your attention
              </strong>

              <p>
                {error}
              </p>

            </div>


            {error
              .toLowerCase()
              .includes("session") && (

              <button
                onClick={() => navigate("/auth")}
              >
                Sign In Again
              </button>

            )}

          </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {cart.items.length === 0 ? (

          <section className="cart-empty-state">

            <div className="cart-empty-icon">
              🛒
            </div>

            <span className="cart-empty-label">
              YOUR BAG IS EMPTY
            </span>

            <h2>
              Nothing here yet
            </h2>

            <p>
              Discover posters that make your space
              feel like yours.
            </p>

            <button
              className="cart-shop-btn"
              onClick={() =>
                navigate("/posters/single")
              }
            >
              Explore Posters
            </button>

          </section>

        ) : (

          <section className="cart-layout">


            {/* =================================================
                CART ITEMS
            ================================================= */}

            <div className="cart-items-column">

              <div className="cart-items-heading">

                <h2>
                  Selected Posters
                </h2>

                <span>
                  {cart.items.length} selected
                </span>

              </div>


              <div className="cart-items">

                {cart.items.map(
                  (item, index) => {

                    if (!item.poster) {

                      return (

                        <article
                          className="cart-item"
                          key={index}
                        >

                          <div className="cart-unavailable">

                            <span>
                              Unavailable Poster
                            </span>

                            <p>
                              This poster is no longer
                              available.
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

                        </article>

                      );

                    }


                    return (

                      <article
                        className="cart-item"
                        key={`${item.poster._id}-${item.size}`}
                      >


                        {/* IMAGE */}

                        <div className="cart-item-image-wrap">

                          <img
                            src={item.poster.thumbnail}
                            className="cart-thumb"
                            alt={item.poster.name}
                            onError={(e) => {
                              e.currentTarget.style.visibility =
                                "hidden";
                            }}
                          />

                        </div>


                        {/* DETAILS */}

                        <div className="cart-details">

                          <span className="cart-product-label">
                            POSTER
                          </span>

                          <h3>
                            {item.poster.name}
                          </h3>

                          <p className="cart-size">
                            Size: {item.size}
                          </p>


                          <div className="qty-control">

                            <button
                              aria-label="Decrease quantity"
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

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              aria-label="Increase quantity"
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


                        {/* PRICE */}

                        <div className="cart-price">

                          <div>

                            <span className="cart-price-label">
                              PRICE
                            </span>

                            <div className="price">
                              ₹{item.payablePrice}
                            </div>

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

                      </article>

                    );

                  }
                )}

              </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <aside className="cart-summary">


              <div className="summary-heading">

                <span>
                  ORDER SUMMARY
                </span>

                <h2>
                  Your Order
                </h2>

              </div>


              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{cart.subtotal}
                </strong>

              </div>


              {cart.totalFreeItems > 0 && (

                <div className="offer-box">

                  <div className="offer-icon">
                    🎁
                  </div>

                  <div>

                    <strong>
                      {cart.totalFreeItems} free posters
                    </strong>

                    <p>
                      Your current order qualifies
                      for free posters.
                    </p>


                    {cart.singleOffer && (

                      <small>
                        Single Offer · Buy{" "}
                        {cart.singleOffer.buy}
                        {" "}Get{" "}
                        {cart.singleOffer.free}
                      </small>

                    )}


                    {cart.setOffer && (

                      <small>
                        Set Offer · Buy{" "}
                        {cart.setOffer.buy}
                        {" "}Get{" "}
                        {cart.setOffer.free}
                      </small>

                    )}

                  </div>

                </div>

              )}


              <div className="summary-divider" />


              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{cart.total}
                </strong>

              </div>


              {!cart.minimumValid && (

                <div className="minimum-note">

                  Minimum order value is ₹199

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
                <span>
                  →
                </span>
              </button>


              {cart.freeDistribution?.length > 0 && (

                <div className="free-items">

                  <h4>
                    Your Free Posters
                  </h4>

                  {cart.freeDistribution.map(
                    (f, i) => (

                      <div
                        key={i}
                        className="free-item-row"
                      >

                        <span>
                          {f.size} posters
                        </span>

                        <strong>
                          × {f.freeQty}
                        </strong>

                      </div>

                    )
                  )}

                </div>

              )}


              <div className="cart-secure-note">

                <span>
                  ✓
                </span>

                Secure checkout & protected payment

              </div>


            </aside>


          </section>

        )}

      </main>

    </>

  );

}