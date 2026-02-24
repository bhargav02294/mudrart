import { useState } from "react";
import { useSearchParams } from "react-router-dom";


const FIXED_PRICING = {
  single: {
    A3: { display: 199, discount: 149 },
    A4: { display: 129, discount: 99 },
    A5: { display: 99, discount: 69 }
  }
};

export default function AddPoster() {

  const type = searchParams.get("type") || "single";
const setCount = searchParams.get("count") || 1;
  const [searchParams] = useSearchParams();


  const [form, setForm] = useState({
    name: "",
    quantity: "",
    description: "",
    downloadPrice: 19
  });

  const [files, setFiles] = useState({});

  const handleSubmit = async () => {
    const data = new FormData();

      data.append("productType", type);
data.append("setCount", setCount);

    Object.keys(form).forEach(key =>
      data.append(key, form[key])
    );

    Object.keys(files).forEach(key =>
      data.append(key, files[key])
    );

    await fetch("/api/posters", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
      },
      body: data
    });

    alert("Product Added Successfully");
  };

  return (
    <div className="admin-container">

      <h2>Add {type.toUpperCase()} Poster</h2>

      <input
        placeholder="Product Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <h3>Images</h3>

      <input
        type="file"
        onChange={(e) =>
          setFiles({ ...files, thumbnail: e.target.files[0] })
        }
      />

      <input
        type="file"
        onChange={(e) =>
          setFiles({ ...files, image1: e.target.files[0] })
        }
      />

      <input
        type="file"
        onChange={(e) =>
          setFiles({ ...files, image2: e.target.files[0] })
        }
      />

      <input
        type="file"
        onChange={(e) =>
          setFiles({ ...files, image3: e.target.files[0] })
        }
      />

      <h3>Downloadable File</h3>

      <input
        type="file"
        onChange={(e) =>
          setFiles({ ...files, downloadableFile: e.target.files[0] })
        }
      />

      <h3>Digital Download Price (₹)</h3>
      <input
        type="number"
        value={form.downloadPrice}
        onChange={(e) =>
          setForm({ ...form, downloadPrice: e.target.value })
        }
      />

      <h3>Stock Quantity</h3>
      <input
        type="number"
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button onClick={handleSubmit}>
        Submit Product
      </button>

    </div>
  );
}