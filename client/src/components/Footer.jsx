import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

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

        </div>

        <div className="footer-links">

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

          </div>

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

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms-and-conditions">
              Terms & Conditions
            </Link>

          </div>

          <div className="footer-column">

            <h4>
              Policies
            </h4>

            <Link to="/shipping-policy">
              Shipping Policy
            </Link>

            <Link to="/refund-policy">
              Refund Policy
            </Link>

            <Link to="/cart">
              Cart
            </Link>

            <Link to="/account">
              My Account
            </Link>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()} Mudrart.in — Premium Wall Posters India

      </div>

    </footer>

  );

}