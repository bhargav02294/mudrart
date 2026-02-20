import { useState } from "react";

export default function AddPoster() {
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});

  const handleSubmit = async () => {
    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    Object.keys(files).forEach(key => {
      data.append(key, files[key]);
    });

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
      <h2>Add Poster</h2>

      <input placeholder="Name"
        onChange={(e)=>setForm({...form, name:e.target.value})}/>

      <h3>Images</h3>

      <label>Thumbnail (Required)</label>
      <input type="file"
        onChange={(e)=>setFiles({...files, thumbnail:e.target.files[0]})}/>

      <label>Image 1</label>
      <input type="file"
        onChange={(e)=>setFiles({...files, image1:e.target.files[0]})}/>

      <label>Image 2</label>
      <input type="file"
        onChange={(e)=>setFiles({...files, image2:e.target.files[0]})}/>

      <label>Image 3</label>
      <input type="file"
        onChange={(e)=>setFiles({...files, image3:e.target.files[0]})}/>

      <label>Image 4</label>
      <input type="file"
        onChange={(e)=>setFiles({...files, image4:e.target.files[0]})}/>

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

      <button onClick={handleSubmit}>Add Poster</button>
    </div>
  );
}