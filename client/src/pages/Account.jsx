import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [digitalOrders, setDigitalOrders] = useState([]);

  const navigate = useNavigate();


  /* =====================================================
     FETCH PROFILE
  ===================================================== */

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await fetch("/api/profile", {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("userToken")
          }
        });


        if (!res.ok) {

          localStorage.removeItem("userToken");

          navigate("/auth");

          return;

        }


        const data = await res.json();

        setUser(data);


        fetchOrders();

        fetchDigitalOrders(data.email);


      } catch (err) {

        console.error("PROFILE ERROR:", err);

        localStorage.removeItem("userToken");

        navigate("/auth");

      }

    };


    fetchProfile();

  }, [navigate]);


  /* =====================================================
     PHYSICAL ORDERS
  ===================================================== */

  const fetchOrders = async () => {

    try {

      const res = await fetch("/api/orders/my", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("userToken")
        }
      });


      const data = await res.json();

      setOrders(data);

    } catch (err) {

      console.error("ORDERS ERROR:", err);

    }

  };


  /* =====================================================
     DIGITAL ORDERS
  ===================================================== */

  const fetchDigitalOrders = async (email) => {

    try {

      const res = await fetch(
        `/api/digital/my?email=${encodeURIComponent(email)}`
      );


      const data = await res.json();

      setDigitalOrders(data);

    } catch (err) {

      console.error("DIGITAL ORDERS ERROR:", err);

    }

  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (user === null) {

    return (
      <div className="account-page account-loading-page">

        <div className="account-loading-card">

          <div className="account-loading-spinner" />

          <p>
            Loading your account...
          </p>

        </div>

      </div>
    );

  }


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {

    localStorage.removeItem("userToken");

    window.location.href = "/";

  };


  /* =====================================================
     UI
  ===================================================== */

  return (

    <main className="account-page">


      {/* =================================================
          PROFILE HERO
      ================================================= */}

      <section className="account-profile-card">

        <div className="account-profile-top">

          <div className="account-avatar">

            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "M"
            }

          </div>


          <div className="account-profile-heading">

            <span className="account-eyebrow">
              MY ACCOUNT
            </span>

            <h1>
              Welcome, {user.name || "there"}
            </h1>

            <p>
              Manage your profile, addresses and orders.
            </p>

          </div>

        </div>


        <div className="account-profile-actions">

          <button
            className="account-edit-btn"
            onClick={() => navigate("/account/edit")}
          >
            Edit Profile
          </button>


          <button
            className="account-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </section>


      {/* =================================================
          PROFILE INFORMATION
      ================================================= */}

      <section className="account-section">

        <div className="account-section-heading">

          <div>

            <span className="account-section-label">
              PROFILE
            </span>

            <h2>
              Personal Information
            </h2>

          </div>

        </div>


        <div className="profile-info-grid">


          <div className="profile-info-card">

            <span className="profile-info-label">
              Full Name
            </span>

            <strong>
              {user.name || "Not provided"}
            </strong>

          </div>


          <div className="profile-info-card">

            <span className="profile-info-label">
              Email Address
            </span>

            <strong>
              {user.email || "Not provided"}
            </strong>

          </div>


          <div className="profile-info-card">

            <span className="profile-info-label">
              Mobile Number
            </span>

            <strong>
              {user.address?.mobile || "Not provided"}
            </strong>

          </div>


          <div className="profile-info-card">

            <span className="profile-info-label">
              Gender
            </span>

            <strong>
              {user.gender || "Not provided"}
            </strong>

          </div>


          <div className="profile-info-card">

            <span className="profile-info-label">
              Date of Birth
            </span>

            <strong>
              {user.dob
                ? user.dob.slice(0, 10)
                : "Not provided"
              }
            </strong>

          </div>


        </div>

      </section>


      {/* =================================================
          SHIPPING ADDRESS
      ================================================= */}

      <section className="account-section">

        <div className="account-section-heading">

          <div>

            <span className="account-section-label">
              DELIVERY
            </span>

            <h2>
              Shipping Address
            </h2>

          </div>

        </div>


        <div className="address-card">

          <div className="address-card-mark">
            ADDRESS
          </div>


          <div className="address-content">

            <p className="address-line-primary">
              {user.address?.addressLine1 ||
                "Address not provided"
              }
            </p>


            <p>
              {user.address?.area || ""}
              {user.address?.area &&
              user.address?.district
                ? ", "
                : ""}
              {user.address?.district || ""}
            </p>


            <p>
              {user.address?.state || ""}
              {user.address?.state &&
              user.address?.pincode
                ? " - "
                : ""}
              {user.address?.pincode || ""}
            </p>

          </div>


          {user.address?.mobile && (

            <div className="address-mobile">

              Mobile: {user.address.mobile}

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          PHYSICAL ORDERS
      ================================================= */}

      <section className="account-section orders-section">

        <div className="account-section-heading">

          <div>

            <span className="account-section-label">
              ORDER HISTORY
            </span>

            <h2>
              Physical Orders
            </h2>

          </div>


          <span className="order-count">
            {orders.length}
            {orders.length === 1
              ? " order"
              : " orders"
            }
          </span>

        </div>


        {orders.length === 0 ? (

          <div className="account-empty-state">

            <div className="empty-icon">
              —
            </div>

            <h3>
              No physical orders yet
            </h3>

            <p>
              Your poster orders will appear here after
              you complete a purchase.
            </p>

            <button
              onClick={() => navigate("/posters/single")}
            >
              Start Shopping
            </button>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <article
                key={order._id}
                className="account-order-card"
              >


                {/* ORDER HEADER */}

                <div className="account-order-header">

                  <div>

                    <span className="account-order-label">
                      ORDER ID
                    </span>

                    <strong className="account-order-id">
                      {order._id}
                    </strong>

                  </div>


                  <div className="order-status-wrap">

                    <span className="account-order-label">
                      STATUS
                    </span>

                    <span className="order-status">
                      {order.orderStatus || "Processing"}
                    </span>

                  </div>


                  <div className="order-delivery">

                    <span className="account-order-label">
                      EXPECTED DELIVERY
                    </span>

                    <strong>
                      {order.deliveryEstimate
                        ? new Date(
                            order.deliveryEstimate
                          ).toDateString()
                        : "7–10 days"
                      }
                    </strong>

                  </div>

                </div>


                {/* ORDER PRODUCTS */}

                <div className="account-order-products">

                  {order.items?.map((item, i) => (

                    <div
                      key={i}
                      className="account-order-product"
                    >

                      <img
                        src={item.thumbnail}
                        className="account-order-thumb"
                        alt={item.name}
                      />


                      <div className="account-order-product-info">

                        <h3>
                          {item.name}
                        </h3>

                        <div className="order-product-meta">

                          <span>
                            Size: {item.size}
                          </span>

                          <span>
                            Qty: {item.quantity}
                          </span>

                          <span>
                            ₹{item.price}
                          </span>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =================================================
          DIGITAL ORDERS
      ================================================= */}

      <section className="account-section orders-section">

        <div className="account-section-heading">

          <div>

            <span className="account-section-label">
              DIGITAL PURCHASES
            </span>

            <h2>
              Digital Downloads
            </h2>

          </div>


          <span className="order-count">
            {digitalOrders.length}
            {digitalOrders.length === 1
              ? " purchase"
              : " purchases"
            }
          </span>

        </div>


        {digitalOrders.length === 0 ? (

          <div className="account-empty-state">

            <div className="empty-icon">
              —
            </div>

            <h3>
              No digital purchases yet
            </h3>

            <p>
              Your digital poster purchases and downloads
              will appear here.
            </p>

          </div>

        ) : (

          <div className="orders-list">

            {digitalOrders.map((order) => (

              <article
                key={order._id}
                className="account-order-card digital-order-card"
              >

                <div className="account-order-header">

                  <div>

                    <span className="account-order-label">
                      ORDER ID
                    </span>

                    <strong className="account-order-id">
                      {order._id}
                    </strong>

                  </div>


                  <div className="order-status-wrap">

                    <span className="account-order-label">
                      PAYMENT
                    </span>

                    <span className="order-status">
                      {order.paymentStatus}
                    </span>

                  </div>

                </div>


                <div className="account-order-products">

                  <div className="account-order-product">

                    <img
                      src={order.thumbnail}
                      className="account-order-thumb"
                      alt={order.posterName}
                    />


                    <div className="account-order-product-info">

                      <h3>
                        {order.posterName}
                      </h3>


                      <div className="order-product-meta">

                        <span>
                          ₹{order.price}
                        </span>

                      </div>


                      <a
                        href={`/api/download/${order.downloadToken}`}
                        target="_blank"
                        rel="noreferrer"
                        className="download-btn"
                      >
                        Download File
                      </a>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


    </main>

  );

}