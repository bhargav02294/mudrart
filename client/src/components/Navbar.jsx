import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/mudrart-logo.png";
import "../styles/navbar.css";

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

        <Link to="/" className="logo">
          <img src={logo} alt="MudrArt Logo" className="logo-image"/>
        </Link>

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