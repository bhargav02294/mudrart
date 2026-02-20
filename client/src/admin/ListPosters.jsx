import { useEffect, useState } from "react";

export default function ListPosters() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(setPosters);
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/posters/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    setPosters(posters.filter(p => p._id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-header">All Posters</h2>

      {posters.map(p => (
        <div className="poster-card" key={p._id}>
          <img src={`/uploads/${p.images[0]}`} alt="" />

          <div className="poster-info">
            <div className="poster-title">{p.name}</div>
            <div className="poster-desc">{p.description}</div>

            <p>A4: ₹{p.sizes.A4.discountedPrice}</p>
            <p>A5: ₹{p.sizes.A5.discountedPrice}</p>
            <p>12x18: ₹{p.sizes["12x18"].discountedPrice}</p>

            <button className="btn-danger"
              onClick={()=>handleDelete(p._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}