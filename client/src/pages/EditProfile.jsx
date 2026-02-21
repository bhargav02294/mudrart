import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    })
      .then(res => res.json())
      .then(data => setForm(data));
  }, []);

  const handleSave = async () => {
    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken")
      },
      body: JSON.stringify(form)
    });

    navigate("/account");
  };

  return (
    <div className="account-container">
      <h2>Edit Profile</h2>

      <input placeholder="Name"
        value={form.name || ""}
        onChange={e=>setForm({...form,name:e.target.value})} />

      <input placeholder="Mobile"
        value={form.address?.mobile || ""}
        onChange={e=>setForm({
          ...form,
          address:{...form.address,mobile:e.target.value}
        })} />

      <input placeholder="Address Line 1"
        value={form.address?.addressLine1 || ""}
        onChange={e=>setForm({
          ...form,
          address:{...form.address,addressLine1:e.target.value}
        })} />

      <input placeholder="Area"
        value={form.address?.area || ""}
        onChange={e=>setForm({
          ...form,
          address:{...form.address,area:e.target.value}
        })} />

      <input placeholder="District"
        value={form.address?.district || ""}
        onChange={e=>setForm({
          ...form,
          address:{...form.address,district:e.target.value}
        })} />

      <input placeholder="State"
        value={form.address?.state || ""}
        onChange={e=>setForm({
          ...form,
          address:{...form.address,state:e.target.value}
        })} />

      <input placeholder="Pincode"
        value={form.address?.pincode || ""}
        onChange={e=>setForm({
          ...form,
          address:{...form.address,pincode:e.target.value}
        })} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}