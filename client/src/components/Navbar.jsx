import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <span className="logo-main">Mudr</span>
          <span className="logo-accent">Art</span>
        </Link>

        {/* NAV LINKS */}
        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/cart" className="cart-btn">
            Cart
          </Link>

          {isLoggedIn ? (
            <Link to="/account" className="account-btn">
              My Account
            </Link>
          ) : (
            <Link to="/auth" className="login-btn">
              Login
            </Link>
          )}

        </div>

      </div>

    </nav>
  );
}