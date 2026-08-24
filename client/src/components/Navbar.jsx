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


  /* LOGIN CHECK */

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [location]);


  /* SCROLL EFFECT */

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);


  /* MOBILE MENU BODY SCROLL */

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


  /* CLOSE MOBILE MENU */

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setOpenDropdown(null);
  };


  /* DROPDOWN TOGGLE */

  const toggleDropdown = (name) => {

    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }

  };


  return (

    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      <div className="navbar-container">


        {/* LOGO */}

        <Link
          to="/"
          className="logo"
          onClick={closeMobileMenu}
        >

          <img
            src={logo}
            alt="MudrArt Logo"
            className="logo-image"
          />

        </Link>


        {/* CENTER MENU */}

        <div className={`center-menu ${mobileMenu ? "active" : ""}`}>

          <Link
            to="/posters/single"
            className="menu-item"
            onClick={closeMobileMenu}
          >
            Single Posters
          </Link>


          {/* CATEGORIES */}

          <div
            className="menu-item dropdown"
            onMouseEnter={() => setOpenDropdown("categories")}
            onMouseLeave={() => setOpenDropdown(null)}
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
                  onClick={closeMobileMenu}
                >
                  Bollywood
                </Link>

                <Link
                  to="/category/actors"
                  onClick={closeMobileMenu}
                >
                  Actors
                </Link>

                <Link
                  to="/category/movie_posters"
                  onClick={closeMobileMenu}
                >
                  Movie Posters
                </Link>

                <Link
                  to="/category/pop_culture"
                  onClick={closeMobileMenu}
                >
                  Pop Culture
                </Link>

              </div>


              {/* Superheroes */}

              <div className="mega-col">

                <h4>Superheroes</h4>

                <Link
                  to="/category/marvel_dc"
                  onClick={closeMobileMenu}
                >
                  Marvel & DC
                </Link>

              </div>


              {/* Sports */}

              <div className="mega-col">

                <h4>Sports</h4>

                <Link
                  to="/category/sports"
                  onClick={closeMobileMenu}
                >
                  Sports
                </Link>

                <Link
                  to="/category/football"
                  onClick={closeMobileMenu}
                >
                  Football
                </Link>

                <Link
                  to="/category/cricket"
                  onClick={closeMobileMenu}
                >
                  Cricket
                </Link>

              </div>


              {/* Lifestyle */}

              <div className="mega-col">

                <h4>Lifestyle</h4>

                <Link
                  to="/category/cars"
                  onClick={closeMobileMenu}
                >
                  Cars
                </Link>

                <Link
                  to="/category/gym"
                  onClick={closeMobileMenu}
                >
                  Gym
                </Link>

              </div>


              {/* Aesthetic */}

              <div className="mega-col">

                <h4>Aesthetic</h4>

                <Link
                  to="/category/aesthetic"
                  onClick={closeMobileMenu}
                >
                  Aesthetic
                </Link>

                <Link
                  to="/category/aesthetic_texts"
                  onClick={closeMobileMenu}
                >
                  Aesthetic Texts
                </Link>

                <Link
                  to="/category/motivational"
                  onClick={closeMobileMenu}
                >
                  Motivational
                </Link>

              </div>


              {/* Spiritual */}

              <div className="mega-col">

                <h4>Spiritual</h4>

                <Link
                  to="/category/spiritual"
                  onClick={closeMobileMenu}
                >
                  Spiritual
                </Link>

                <Link
                  to="/category/divine"
                  onClick={closeMobileMenu}
                >
                  Divine
                </Link>

                <Link
                  to="/category/devotional"
                  onClick={closeMobileMenu}
                >
                  Devotional
                </Link>

              </div>


              {/* Nature & Icons */}

              <div className="mega-col">

                <h4>Nature & Icons</h4>

                <Link
                  to="/category/nature"
                  onClick={closeMobileMenu}
                >
                  Nature
                </Link>

                <Link
                  to="/category/anime"
                  onClick={closeMobileMenu}
                >
                  Anime
                </Link>

                <Link
                  to="/category/legends"
                  onClick={closeMobileMenu}
                >
                  Legends
                </Link>

                <Link
                  to="/category/icons"
                  onClick={closeMobileMenu}
                >
                  Icons
                </Link>

              </div>

            </div>

          </div>


          {/* SPLIT POSTERS */}

          <div
            className="menu-item dropdown"
            onMouseEnter={() => setOpenDropdown("split")}
            onMouseLeave={() => setOpenDropdown(null)}
          >

            <span
              className="menu-label"
              onClick={() => toggleDropdown("split")}
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
                onClick={closeMobileMenu}
              >
                2 Set
              </Link>

              <Link
                to="/split/3"
                onClick={closeMobileMenu}
              >
                3 Set
              </Link>

              <Link
                to="/split/4"
                onClick={closeMobileMenu}
              >
                4 Set
              </Link>

              <Link
                to="/split/6"
                onClick={closeMobileMenu}
              >
                6 Set
              </Link>

              <Link
                to="/split/8"
                onClick={closeMobileMenu}
              >
                8 Set
              </Link>

              <Link
                to="/split/10"
                onClick={closeMobileMenu}
              >
                10 Set
              </Link>

              <Link
                to="/split/20"
                onClick={closeMobileMenu}
              >
                20 Set
              </Link>

            </div>

          </div>


          {/* POLAROIDS */}

          <div
            className="menu-item dropdown"
            onMouseEnter={() => setOpenDropdown("polarized")}
            onMouseLeave={() => setOpenDropdown(null)}
          >

            <span
              className="menu-label"
              onClick={() => toggleDropdown("polarized")}
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
                onClick={closeMobileMenu}
              >
                12 Posters
              </Link>

              <Link
                to="/polarized/24"
                onClick={closeMobileMenu}
              >
                24 Posters
              </Link>

              <Link
                to="/polarized/36"
                onClick={closeMobileMenu}
              >
                36 Posters
              </Link>

              <Link
                to="/polarized/48"
                onClick={closeMobileMenu}
              >
                48 Posters
              </Link>

            </div>

          </div>


          {/* COLLECTION */}

          <div
            className="menu-item dropdown"
            onMouseEnter={() => setOpenDropdown("collection")}
            onMouseLeave={() => setOpenDropdown(null)}
          >

            <span
              className="menu-label"
              onClick={() => toggleDropdown("collection")}
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
                onClick={closeMobileMenu}
              >
                Cars
              </Link>

              <Link
                to="/collection/anime"
                onClick={closeMobileMenu}
              >
                Anime
              </Link>

              <Link
                to="/collection/cricket"
                onClick={closeMobileMenu}
              >
                Cricket
              </Link>

              <Link
                to="/collection/bollywood"
                onClick={closeMobileMenu}
              >
                Bollywood
              </Link>

              <Link
                to="/collection/movies"
                onClick={closeMobileMenu}
              >
                Movies
              </Link>

              <Link
                to="/collection/spiritual"
                onClick={closeMobileMenu}
              >
                Spiritual
              </Link>

              <Link
                to="/collection/motivational"
                onClick={closeMobileMenu}
              >
                Motivational
              </Link>

              <Link
                to="/collection/more"
                onClick={closeMobileMenu}
              >
                More
              </Link>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

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
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

    </nav>

  );
}