import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

/* LOGO */
import logo from "../assets/mudrart-logo.png";

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

        {/* ================= LOGO ================= */}
        <Link to="/" className="logo">

          <img
            src={logo}
            alt="MudrArt Logo"
            className="logo-image"
          />

        </Link>


        {/* ================= CENTER MENU ================= */}

        <div className={`center-menu ${mobileMenu ? "active" : ""}`}>

          {/* SINGLE POSTERS */}
          <Link to="/single-posters" className="menu-item">
            Single Posters
          </Link>


          {/* SPLIT POSTERS */}
          <div className="menu-item dropdown">

            Split Posters

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


          {/* POLARIZED */}
          <div className="menu-item dropdown">

            Polarized

            <div className="dropdown-menu">

              <Link to="/polarized/12">12 Posters</Link>
              <Link to="/polarized/24">24 Posters</Link>
              <Link to="/polarized/36">36 Posters</Link>
              <Link to="/polarized/48">48 Posters</Link>

            </div>

          </div>


          {/* COLLECTION */}
          <div className="menu-item dropdown">

            Collections

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



        {/* ================= RIGHT ICONS ================= */}

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


          {/* MOBILE MENU BUTTON */}

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