import { Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AddPoster from "./admin/AddPoster";
import { useEffect, useState } from "react";

function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then(res => res.json())
      .then(setPosters);
  }, []);

  return (
    <div>
      <h1>🎨 MudrArt</h1>
      {posters.map(p => (
        <div key={p._id}>
          <img src={`/uploads/${p.image}`} width="200" />
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/add" element={<AddPoster />} />
    </Routes>
  );
}

export default App;