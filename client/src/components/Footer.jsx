import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* LOGO */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            <span className="logo-main">Mudr</span>
            <span className="logo-accent">Art</span>
          </h2>

          <p className="footer-tagline">
            Premium spiritual and aesthetic poster art.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">

          <div className="footer-column">

            <h4>Shop</h4>

            <Link to="/">All Posters</Link>
            <Link to="/cart">Cart</Link>

          </div>

          <div className="footer-column">

            <h4>Account</h4>

            <Link to="/auth">Login</Link>
            <Link to="/account">My Account</Link>

          </div>

          <div className="footer-column">

            <h4>Company</h4>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MudrArt. All rights reserved.
      </div>

    </footer>

  );

}