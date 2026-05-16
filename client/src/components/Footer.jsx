import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="footer">

      {/* =========================
      TOP AREA
      ========================= */}

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <h2 className="footer-logo">

            <span className="logo-main">
              Mudr
            </span>

            <span className="logo-accent">
              Art
            </span>

          </h2>

          <p className="footer-tagline">

            Mudrart is India’s premium wall poster and aesthetic room decor platform offering anime posters, spiritual artwork, gaming room posters, split posters, motivational artwork and modern wall decor.

          </p>

          {/* CONTACT */}

          <div className="footer-contact">

            <div className="footer-contact-item">

              <FaEnvelope />

              <a href="mailto:mudrart1@gmail.com">
                mudrart1@gmail.com
              </a>

            </div>

            <div className="footer-contact-item">

              <FaInstagram />

              <a
                href="https://www.instagram.com/mudrart.in"
                target="_blank"
                rel="noreferrer"
              >
                @mudrart.in
              </a>

            </div>

            <div className="footer-contact-item">

              <FaPhoneAlt />

              <span>
                Customer Support Available
              </span>

            </div>

          </div>

        </div>

        {/* LINKS */}

        <div className="footer-links">

          {/* SHOP */}

          <div className="footer-column">

            <h4>
              Shop
            </h4>

            <Link to="/posters/single">
              Single Posters
            </Link>

            <Link to="/split/3">
              3 Poster Sets
            </Link>

            <Link to="/polarized/12">
              Polaroid Posters
            </Link>

            <Link to="/category/anime">
              Anime Posters
            </Link>

            <Link to="/category/cars">
              Car Posters
            </Link>

          </div>

          {/* COMPANY */}

          <div className="footer-column">

            <h4>
              Company
            </h4>

            <Link to="/about">
              About Us
            </Link>

            <Link to="/contact">
              Contact Us
            </Link>

            <Link to="/faq">
              FAQs
            </Link>

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

          </div>

          {/* POLICIES */}

          <div className="footer-column">

            <h4>
              Policies
            </h4>

            <Link to="/terms-and-conditions">
              Terms & Conditions
            </Link>

            <Link to="/shipping-policy">
              Shipping Policy
            </Link>

            <Link to="/refund-policy">
              Refund Policy
            </Link>

          </div>

        </div>

      </div>

      {/* =========================
      COPYRIGHT
      ========================= */}

      <div className="footer-bottom">

        © {new Date().getFullYear()} Mudrart.in — Premium Wall Posters & Aesthetic Room Decor India

      </div>

      {/* =========================
      DISCLAIMER
      ========================= */}

      <div className="footer-disclaimer">

  Artwork and poster visuals displayed on Mudrart are fan-inspired or decorative creations and remain the property of their respective owners. For copyright or content concerns, contact us at

  <a href="mailto:mudrart1@gmail.com">
    {" "}mudrart1@gmail.com
  </a>

</div>
    </footer>

  );

}