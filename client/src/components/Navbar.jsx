import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="logo">MudrArt</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {isLoggedIn ? (
          <Link to="/account">My Account</Link>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}