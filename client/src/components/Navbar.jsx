import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

import logo from "../assets/mudrart-logo.png";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  /* LOGIN CHECK */

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [location]);


  /* SCROLL EFFECT */

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);


  return (

    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      <div className="navbar-container">


        {/* LOGO */}

        <Link to="/" className="logo">

          <img
            src={logo}
            alt="MudrArt Logo"
            className="logo-image"
          />

        </Link>


        {/* CENTER MENU */}

        <div className={`center-menu ${mobileMenu ? "active" : ""}`}>

          <Link to="/single-posters" className="menu-item">
            Single Posters
          </Link>


          {/* SPLIT POSTERS */}

          <div className="menu-item dropdown">

            <span className="menu-label">
              Split Posters <IoChevronDown className="arrow"/>
            </span>

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

            <span className="menu-label">
              Polarized <IoChevronDown className="arrow"/>
            </span>

            <div className="dropdown-menu">

              <Link to="/polarized/12">12 Posters</Link>
              <Link to="/polarized/24">24 Posters</Link>
              <Link to="/polarized/36">36 Posters</Link>
              <Link to="/polarized/48">48 Posters</Link>

            </div>

          </div>


          {/* COLLECTIONS */}

          <div className="menu-item dropdown">

            <span className="menu-label">
              Collections <IoChevronDown className="arrow"/>
            </span>

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


          {/* MOBILE MENU */}

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