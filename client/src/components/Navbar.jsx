import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

import logo from "../assets/mudrart-logo.png";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const location = useLocation();


  /* ======================================================
     LOGIN CHECK
  ====================================================== */

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [location]);


  /* ======================================================
     SCROLL EFFECT
  ====================================================== */

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);


  /* ======================================================
     BODY SCROLL LOCK
  ====================================================== */

  useEffect(() => {

    if (mobileMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };

  }, [mobileMenu]);


  /* ======================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ====================================================== */

  useEffect(() => {

    setMobileMenu(false);
    setOpenDropdown(null);

  }, [location.pathname]);


  /* ======================================================
     CLOSE MENU + DROPDOWN
     WHEN A MOBILE LINK IS CLICKED
  ====================================================== */

  const handleMobileLinkClick = () => {

    setMobileMenu(false);
    setOpenDropdown(null);

  };


  /* ======================================================
     DROPDOWN TOGGLE
  ====================================================== */

  const toggleDropdown = (name) => {

    setOpenDropdown((current) =>
      current === name ? null : name
    );

  };


  return (

    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      <div className="navbar-container">


        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          className="logo"
          onClick={handleMobileLinkClick}
        >

          <img
            src={logo}
            alt="MudrArt Logo"
            className="logo-image"
          />

        </Link>


        {/* ==================================================
            CENTER MENU
        ================================================== */}

        <div
          className={`center-menu ${mobileMenu ? "active" : ""}`}
        >


          {/* ==================================================
              SINGLE POSTERS
          ================================================== */}

          <Link
            to="/posters/single"
            className="menu-item"
            onClick={handleMobileLinkClick}
          >
            Single Posters
          </Link>


          {/* ==================================================
              CATEGORIES
          ================================================== */}

          <div
            className="menu-item dropdown"

            onMouseEnter={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown("categories");
              }
            }}

            onMouseLeave={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown(null);
              }
            }}
          >

            <span
              className="menu-label"

              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("categories");
              }}
            >
              Categories

              <IoChevronDown
                className={`arrow ${
                  openDropdown === "categories"
                    ? "rotate"
                    : ""
                }`}
              />

            </span>


            <div
              className={`dropdown-menu mega-menu ${
                openDropdown === "categories"
                  ? "show"
                  : ""
              }`}
            >

              {/* Entertainment */}

              <div className="mega-col">

                <h4>Entertainment</h4>

                <Link
                  to="/category/bollywood"
                  onClick={handleMobileLinkClick}
                >
                  Bollywood
                </Link>

                <Link
                  to="/category/actors"
                  onClick={handleMobileLinkClick}
                >
                  Actors
                </Link>

                <Link
                  to="/category/movie_posters"
                  onClick={handleMobileLinkClick}
                >
                  Movie Posters
                </Link>

                <Link
                  to="/category/pop_culture"
                  onClick={handleMobileLinkClick}
                >
                  Pop Culture
                </Link>

              </div>


              {/* Superheroes */}

              <div className="mega-col">

                <h4>Superheroes</h4>

                <Link
                  to="/category/marvel_dc"
                  onClick={handleMobileLinkClick}
                >
                  Marvel & DC
                </Link>

              </div>


              {/* Sports */}

              <div className="mega-col">

                <h4>Sports</h4>

                <Link
                  to="/category/sports"
                  onClick={handleMobileLinkClick}
                >
                  Sports
                </Link>

                <Link
                  to="/category/football"
                  onClick={handleMobileLinkClick}
                >
                  Football
                </Link>

                <Link
                  to="/category/cricket"
                  onClick={handleMobileLinkClick}
                >
                  Cricket
                </Link>

              </div>


              {/* Lifestyle */}

              <div className="mega-col">

                <h4>Lifestyle</h4>

                <Link
                  to="/category/cars"
                  onClick={handleMobileLinkClick}
                >
                  Cars
                </Link>

                <Link
                  to="/category/gym"
                  onClick={handleMobileLinkClick}
                >
                  Gym
                </Link>

              </div>


              {/* Aesthetic */}

              <div className="mega-col">

                <h4>Aesthetic</h4>

                <Link
                  to="/category/aesthetic"
                  onClick={handleMobileLinkClick}
                >
                  Aesthetic
                </Link>

                <Link
                  to="/category/aesthetic_texts"
                  onClick={handleMobileLinkClick}
                >
                  Aesthetic Texts
                </Link>

                <Link
                  to="/category/motivational"
                  onClick={handleMobileLinkClick}
                >
                  Motivational
                </Link>

              </div>


              {/* Spiritual */}

              <div className="mega-col">

                <h4>Spiritual</h4>

                <Link
                  to="/category/spiritual"
                  onClick={handleMobileLinkClick}
                >
                  Spiritual
                </Link>

                <Link
                  to="/category/divine"
                  onClick={handleMobileLinkClick}
                >
                  Divine
                </Link>

                <Link
                  to="/category/devotional"
                  onClick={handleMobileLinkClick}
                >
                  Devotional
                </Link>

              </div>


              {/* Nature & Icons */}

              <div className="mega-col">

                <h4>Nature & Icons</h4>

                <Link
                  to="/category/nature"
                  onClick={handleMobileLinkClick}
                >
                  Nature
                </Link>

                <Link
                  to="/category/anime"
                  onClick={handleMobileLinkClick}
                >
                  Anime
                </Link>

                <Link
                  to="/category/legends"
                  onClick={handleMobileLinkClick}
                >
                  Legends
                </Link>

                <Link
                  to="/category/icons"
                  onClick={handleMobileLinkClick}
                >
                  Icons
                </Link>

              </div>

            </div>

          </div>


          {/* ==================================================
              SPLIT POSTERS
          ================================================== */}

          <div
            className="menu-item dropdown"

            onMouseEnter={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown("split");
              }
            }}

            onMouseLeave={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown(null);
              }
            }}
          >

            <span
              className="menu-label"

              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("split");
              }}
            >
              Split Posters

              <IoChevronDown
                className={`arrow ${
                  openDropdown === "split"
                    ? "rotate"
                    : ""
                }`}
              />

            </span>


            <div
              className={`dropdown-menu ${
                openDropdown === "split"
                  ? "show"
                  : ""
              }`}
            >

              <Link
                to="/split/2"
                onClick={handleMobileLinkClick}
              >
                2 Set
              </Link>

              <Link
                to="/split/3"
                onClick={handleMobileLinkClick}
              >
                3 Set
              </Link>

              <Link
                to="/split/4"
                onClick={handleMobileLinkClick}
              >
                4 Set
              </Link>

              <Link
                to="/split/6"
                onClick={handleMobileLinkClick}
              >
                6 Set
              </Link>

              <Link
                to="/split/8"
                onClick={handleMobileLinkClick}
              >
                8 Set
              </Link>

              <Link
                to="/split/10"
                onClick={handleMobileLinkClick}
              >
                10 Set
              </Link>

              <Link
                to="/split/20"
                onClick={handleMobileLinkClick}
              >
                20 Set
              </Link>

            </div>

          </div>


          {/* ==================================================
              POLAROIDS
          ================================================== */}

          <div
            className="menu-item dropdown"

            onMouseEnter={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown("polarized");
              }
            }}

            onMouseLeave={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown(null);
              }
            }}
          >

            <span
              className="menu-label"

              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("polarized");
              }}
            >
              Polaroids

              <IoChevronDown
                className={`arrow ${
                  openDropdown === "polarized"
                    ? "rotate"
                    : ""
                }`}
              />

            </span>


            <div
              className={`dropdown-menu ${
                openDropdown === "polarized"
                  ? "show"
                  : ""
              }`}
            >

              <Link
                to="/polarized/12"
                onClick={handleMobileLinkClick}
              >
                12 Posters
              </Link>

              <Link
                to="/polarized/24"
                onClick={handleMobileLinkClick}
              >
                24 Posters
              </Link>

              <Link
                to="/polarized/36"
                onClick={handleMobileLinkClick}
              >
                36 Posters
              </Link>

              <Link
                to="/polarized/48"
                onClick={handleMobileLinkClick}
              >
                48 Posters
              </Link>

            </div>

          </div>


          {/* ==================================================
              COLLECTIONS
          ================================================== */}

          <div
            className="menu-item dropdown"

            onMouseEnter={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown("collection");
              }
            }}

            onMouseLeave={() => {
              if (window.innerWidth > 900) {
                setOpenDropdown(null);
              }
            }}
          >

            <span
              className="menu-label"

              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown("collection");
              }}
            >
              Collections

              <IoChevronDown
                className={`arrow ${
                  openDropdown === "collection"
                    ? "rotate"
                    : ""
                }`}
              />

            </span>


            <div
              className={`dropdown-menu ${
                openDropdown === "collection"
                  ? "show"
                  : ""
              }`}
            >

              <Link
                to="/collection/cars"
                onClick={handleMobileLinkClick}
              >
                Cars
              </Link>

              <Link
                to="/collection/anime"
                onClick={handleMobileLinkClick}
              >
                Anime
              </Link>

              <Link
                to="/collection/cricket"
                onClick={handleMobileLinkClick}
              >
                Cricket
              </Link>

              <Link
                to="/collection/bollywood"
                onClick={handleMobileLinkClick}
              >
                Bollywood
              </Link>

              <Link
                to="/collection/movies"
                onClick={handleMobileLinkClick}
              >
                Movies
              </Link>

              <Link
                to="/collection/spiritual"
                onClick={handleMobileLinkClick}
              >
                Spiritual
              </Link>

              <Link
                to="/collection/motivational"
                onClick={handleMobileLinkClick}
              >
                Motivational
              </Link>

              <Link
                to="/collection/more"
                onClick={handleMobileLinkClick}
              >
                More
              </Link>

            </div>

          </div>

        </div>


        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <div className="nav-right">

          <Link
            to="/cart"
            className="icon-btn"
          >
            <FaShoppingCart />
          </Link>


          {isLoggedIn ? (

            <Link
              to="/account"
              className="icon-btn"
            >
              <FaUser />
            </Link>

          ) : (

            <Link
              to="/auth"
              className="icon-btn"
            >
              <FaUser />
            </Link>

          )}


          <button
            className="menu-toggle"
            onClick={() => {

              setMobileMenu((current) => !current);

              setOpenDropdown(null);

            }}
            aria-label="Toggle menu"
          >

            {mobileMenu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

          </button>

        </div>

      </div>

    </nav>

  );
}