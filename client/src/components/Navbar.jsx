import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("userToken");

  return (
    <nav className="navbar">
      <div className="logo">MudrArt</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/admin/login">Admin</Link>

        {token ? (
          <>
            <Link to="/account">My Account</Link>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("userToken");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/account">Login</Link>
        )}
      </div>
    </nav>
  );
}