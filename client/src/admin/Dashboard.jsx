import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
  <h2 className="admin-header">Admin Dashboard</h2>

  <div className="dashboard-grid">
    <div className="dashboard-card" onClick={()=>navigate("/admin/add")}>
      Add Poster
    </div>

    <div className="dashboard-card" onClick={()=>navigate("/admin/list")}>
      View Posters
    </div>

    <div className="dashboard-card" onClick={()=>{
      localStorage.removeItem("token");
      navigate("/admin/login");
    }}>
      Logout
    </div>
  </div>
</div>
  );
}