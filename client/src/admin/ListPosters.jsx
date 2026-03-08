import { useEffect, useState } from "react";

export default function ListPosters() {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(data => {
        setPosters(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    await fetch(`/api/posters/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    setPosters(prev => prev.filter(p => p._id !== id));
  };

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">

      <h2 className="admin-header">All Products</h2>

      {posters.length === 0 && (
        <div className="empty-state">
          No products found.
        </div>
      )}

      <div className="poster-grid">

        {posters.map((p) => (

          <div className="poster-card-modern" key={p._id}>

            <div className="poster-image-wrapper">
              <img
                src={p.thumbnail}
                alt={p.name}
              />
            </div>

            <div className="poster-card-body">

              <div className="poster-type-badge">
                {p.productType === "single" && "Single"}
                {p.productType === "set" && `Set of ${p.setCount}`}
                {p.productType === "polarized" && `Polarized (${p.setCount})`}
              </div>

                <h3>{p.name}</h3>

                <div className="poster-category">
                  Category: {p.category}
                </div>
                
              <p className="poster-description">
                {p.description || "No description"}
              </p>

              <div className="poster-meta">

                <div>
                  <strong>Stock:</strong> {p.quantity || 0}
                </div>

                <div>
                  <strong>Download:</strong> ₹{p.downloadPrice || 0}
                </div>

              </div>

              <button
                className="delete-btn"
                onClick={() => handleDelete(p._id)}
              >
                Delete Product
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}