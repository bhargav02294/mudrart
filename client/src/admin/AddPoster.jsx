import { useState } from "react";

export default function AddPoster() {
  const [form, setForm] = useState({ title:"", description:"", price:"" });
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("image", image);

    await fetch("/api/posters", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
      },
      body: data
    });

    alert("Poster added");
  };

  return (
    <div className="admin-container">
  <h2 className="admin-header">Add Poster</h2>
      <input placeholder="Title"
        onChange={(e)=>setForm({...form,title:e.target.value})}/>
      <input placeholder="Description"
        onChange={(e)=>setForm({...form,description:e.target.value})}/>
      <input placeholder="Price"
        onChange={(e)=>setForm({...form,price:e.target.value})}/>
      <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
       <button className="btn-accent">Add Poster</button>
</div>
  );
}