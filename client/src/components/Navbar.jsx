import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../assets/mudrart-logo.png";

import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

import "../styles/navbar.css";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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
          <img src={logo} alt="MudrArt Logo" />
        </Link>

        {/* CENTER MENU */}
        <div className={`nav-center ${mobileMenu ? "active" : ""}`}>

          <div className="nav-item">
            <Link to="/single-posters">Single Posters</Link>
          </div>

          <div className="nav-item dropdown">
            <span>Split Posters</span>

            <div className="dropdown-menu">
              <Link to="/split/2">2 Set</Link>
              <Link to="/split/3">3 Set</Link>
              <Link to="/split/4">4 Set</Link>
              <Link to="/split/6">6 Set</Link>
              <Link to="/split/8">8 Set</Link>
              <Link to="/split/10">10 Set</Link>
              <Link to="/split/20">20 Set</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <span>Polarized</span>

            <div className="dropdown-menu">
              <Link to="/polarized/12">12 Posters</Link>
              <Link to="/polarized/24">24 Posters</Link>
              <Link to="/polarized/36">36 Posters</Link>
              <Link to="/polarized/48">48 Posters</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <span>Collections</span>

            <div className="dropdown-menu">

              <Link to="/collection/cars">Cars</Link>
              <Link to="/collection/anime">Anime</Link>
              <Link to="/collection/cricket">Cricket</Link>
              <Link to="/collection/bollywood">Bollywood</Link>
              <Link to="/collection/movies">Movies</Link>
              <Link to="/collection/spiritual">Spiritual</Link>
              <Link to="/collection/motivational">Motivational</Link>
              <Link to="/collection/more">More</Link>

            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          <Link to="/cart" className="icon-btn">
            <FaShoppingCart />
          </Link>

          {isLoggedIn ? (
            <Link to="/account" className="icon-btn">
              <FaUser />
            </Link>
          ) : (
            <Link to="/auth" className="icon-btn">
              <FaUser />
            </Link>
          )}

          {/* MOBILE BUTTON */}
          <button
            className="menu-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

    </nav>
  );
}