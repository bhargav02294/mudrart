import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  useEffect(() => {
  fetch("/api/posters")
    .then(res => res.json())
    .then(setPosters);
}, []);

{posters.map(p => (
  <div key={p._id}>
    <img src={`/uploads/${p.image}`} width="200"/>
    <h3>{p.title}</h3>
    <p>{p.description}</p>
  </div>
))}


  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🎨 MudrArt</h1>
      <p>Backend Response:</p>
      <h3>{message}</h3>
    </div>
  );
}

export default App;