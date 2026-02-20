import { useState } from "react";

export default function AddPoster() {
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    await fetch("/api/posters", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
      },
      body: data
    });

    alert("Poster Added");
  };

  return (
    <div className="admin-container">
      <h2 className="admin-header">Add Poster</h2>

      <input placeholder="Name"
        onChange={(e)=>setForm({...form, name:e.target.value})}/>

      <h3>A4 Pricing</h3>
      <input placeholder="Display Price"
        onChange={(e)=>setForm({...form, A4_display:e.target.value})}/>
      <input placeholder="Discounted Price"
        onChange={(e)=>setForm({...form, A4_discount:e.target.value})}/>

      <h3>A5 Pricing</h3>
      <input placeholder="Display Price"
        onChange={(e)=>setForm({...form, A5_display:e.target.value})}/>
      <input placeholder="Discounted Price"
        onChange={(e)=>setForm({...form, A5_discount:e.target.value})}/>

      <h3>12x18 Pricing</h3>
      <input placeholder="Display Price"
        onChange={(e)=>setForm({...form, size12_display:e.target.value})}/>
      <input placeholder="Discounted Price"
        onChange={(e)=>setForm({...form, size12_discount:e.target.value})}/>

      <h3>Custom Size Pricing</h3>
      <input placeholder="Display Price"
        onChange={(e)=>setForm({...form, custom_display:e.target.value})}/>
      <input placeholder="Discounted Price"
        onChange={(e)=>setForm({...form, custom_discount:e.target.value})}/>

      <input placeholder="Quantity"
        onChange={(e)=>setForm({...form, quantity:e.target.value})}/>

      <textarea placeholder="Description"
        onChange={(e)=>setForm({...form, description:e.target.value})}/>

      <h3>Upload 5 Images (First = Thumbnail)</h3>
      <input type="file" multiple
        onChange={(e)=>setImages(e.target.files)}/>

      <button className="btn-accent" onClick={handleSubmit}>
        Add Poster
      </button>
    </div>
  );
}