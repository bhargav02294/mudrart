import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("userToken");

  return (
    <nav className="navbar">
      <div className="logo">MudrArt</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {token ? (
          <Link to="/account">My Account</Link>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}