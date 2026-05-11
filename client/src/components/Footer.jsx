import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer className="footer">

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
            Mudrart is India’s premium destination for aesthetic wall posters, anime posters, spiritual wall art, motivational posters, car posters, room decor artwork and digital poster downloads.
          </p>

        </div>

        {/* LINKS */}

        <div className="footer-links">

          {/* SHOP */}

          <div className="footer-column">

            <h4>Shop Posters</h4>

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

            <Link to="/category/cricket">
              Cricket Posters
            </Link>

          </div>

          {/* COLLECTIONS */}

          <div className="footer-column">

            <h4>Collections</h4>

            <Link to="/collection/trending">
              Trending Collection
            </Link>

            <Link to="/collection/spiritual">
              Spiritual Collection
            </Link>

            <Link to="/collection/cinema">
              Cinema Collection
            </Link>

            <Link to="/collection/fan">
              Fan Zone
            </Link>

          </div>

          {/* ACCOUNT */}

          <div className="footer-column">

            <h4>Account</h4>

            <Link to="/auth">
              Login
            </Link>

            <Link to="/account">
              My Account
            </Link>

            <Link to="/cart">
              Shopping Cart
            </Link>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()} Mudrart.in — Premium Wall Poster Store India

      </div>

    </footer>

  );

}