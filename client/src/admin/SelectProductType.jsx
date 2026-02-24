import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectProductType() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);

  const SET_OPTIONS = [2, 3, 4, 6, 8, 9, 10, 20];
  const POLARIZED_OPTIONS = [12, 24, 36, 48];

  return (
    <div className="admin-container">
      <h2>Select Product Type</h2>

      {!mode && (
        <div className="selection-grid">

          <button
            onClick={() => navigate("/admin/add?type=single")}
          >
            Single Poster
          </button>

          <button onClick={() => setMode("set")}>
            Set Poster
          </button>

          <button onClick={() => setMode("polarized")}>
            Polarized Set
          </button>

        </div>
      )}

      {mode === "set" && (
        <div className="set-selection">
          <h3>Select Set Quantity</h3>

          <div className="set-grid">
            {SET_OPTIONS.map(num => (
              <button
                key={num}
                onClick={() =>
                  navigate(`/admin/add?type=set&count=${num}`)
                }
              >
                Set of {num}
              </button>
            ))}
          </div>

          <button className="back-btn" onClick={() => setMode(null)}>
            Back
          </button>
        </div>
      )}

      {mode === "polarized" && (
        <div className="set-selection">
          <h3>Select Polarized Quantity</h3>

          <div className="set-grid">
            {POLARIZED_OPTIONS.map(num => (
              <button
                key={num}
                onClick={() =>
                  navigate(`/admin/add?type=polarized&count=${num}`)
                }
              >
                {num} Pieces
              </button>
            ))}
          </div>

          <button className="back-btn" onClick={() => setMode(null)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}