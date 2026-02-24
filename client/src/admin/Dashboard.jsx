import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">

      <h2>Admin Control Panel</h2>

      <div className="admin-grid">

        <div
          className="admin-card"
          onClick={() => navigate("/admin/select")}
        >
          Add Product
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/list")}
        >
          View Products
        </div>

        <div
          className="admin-card danger"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin/login");
          }}
        >
          Logout
        </div>

      </div>
    </div>
  );
}