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


          {/* CATEGORIES (NEW MEGA MENU) */}

<div
  className="menu-item dropdown"
  onMouseEnter={() => setOpenDropdown("categories")}
  onMouseLeave={() => setOpenDropdown(null)}
>

  <span
    className="menu-label"
    onClick={() => toggleDropdown("categories")}
  >
    Categories
    <IoChevronDown className={`arrow ${openDropdown === "categories" ? "rotate" : ""}`} />
  </span>

  <div className={`dropdown-menu mega-menu ${openDropdown === "categories" ? "show" : ""}`}>

    {/* 🎬 Entertainment */}
    <div className="mega-col">
      <h4>Entertainment</h4>
      <Link to="/category/bollywood">Bollywood</Link>
      <Link to="/category/actors">Actors</Link>
      <Link to="/category/movie_posters">Movie Posters</Link>
      <Link to="/category/pop_culture">Pop Culture</Link>
    </div>

    {/* 🦸 Superheroes */}
    <div className="mega-col">
      <h4>Superheroes</h4>
      <Link to="/category/marvel_dc">Marvel & DC</Link>
    </div>

    {/* 🏏 Sports */}
    <div className="mega-col">
      <h4>Sports</h4>
      <Link to="/category/sports">Sports</Link>
      <Link to="/category/football">Football</Link>
      <Link to="/category/cricket">Cricket</Link>
    </div>

    {/* 🚗 Lifestyle */}
    <div className="mega-col">
      <h4>Lifestyle</h4>
      <Link to="/category/cars">Cars</Link>
      <Link to="/category/gym">Gym</Link>
    </div>

    {/* 🎨 Aesthetic */}
    <div className="mega-col">
      <h4>Aesthetic</h4>
      <Link to="/category/aesthetic">Aesthetic</Link>
      <Link to="/category/aesthetic_texts">Aesthetic Texts</Link>
      <Link to="/category/motivational">Motivational</Link>
    </div>

    {/* 🧘 Spiritual */}
    <div className="mega-col">
      <h4>Spiritual</h4>
      <Link to="/category/spiritual">Spiritual</Link>
      <Link to="/category/divine">Divine</Link>
      <Link to="/category/devotional">Devotional</Link>
    </div>

    {/* 🌿 Nature & Icons */}
    <div className="mega-col">
      <h4>Nature & Icons</h4>
      <Link to="/category/nature">Nature</Link>
      <Link to="/category/anime">Anime</Link>
      <Link to="/category/legends">Legends</Link>
      <Link to="/category/icons">Icons</Link>
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
              <IoChevronDown className={`arrow ${openDropdown === "split" ? "rotate" : ""}`} />
            </span>

            <div className={`dropdown-menu ${openDropdown === "split" ? "show" : ""}`}>

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

          <div
            className="menu-item dropdown"
            onMouseEnter={() => setOpenDropdown("polarized")}
            onMouseLeave={() => setOpenDropdown(null)}
          >

            <span
              className="menu-label"
              onClick={() => toggleDropdown("polarized")}
            >
              Polarized
              <IoChevronDown className={`arrow ${openDropdown === "polarized" ? "rotate" : ""}`} />
            </span>

            <div className={`dropdown-menu ${openDropdown === "polarized" ? "show" : ""}`}>

              <Link to="/polarized/12">12 Posters</Link>
              <Link to="/polarized/24">24 Posters</Link>
              <Link to="/polarized/36">36 Posters</Link>
              <Link to="/polarized/48">48 Posters</Link>

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
              <IoChevronDown className={`arrow ${openDropdown === "collection" ? "rotate" : ""}`} />
            </span>

            <div className={`dropdown-menu ${openDropdown === "collection" ? "show" : ""}`}>

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