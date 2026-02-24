import { useNavigate } from "react-router-dom";

export default function SelectProductType() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h2>Select Product Type</h2>

      <div className="selection-grid">

        <button
          onClick={() => navigate("/admin/add?type=single")}
        >
          Single Poster
        </button>

        <button
          onClick={() => navigate("/admin/add?type=set")}
        >
          Set Poster
        </button>

        <button
          onClick={() => navigate("/admin/add?type=polarized")}
        >
          Polarized Set
        </button>

      </div>
    </div>
  );
}