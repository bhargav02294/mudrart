import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AddPoster() {

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type") || "single";
  const setCount = searchParams.get("count") || 1;

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    description: "",
    downloadPrice: ""
  });

  const [files, setFiles] = useState({});

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("productType", type);
    data.append("setCount", setCount);

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

    alert("Product Added Successfully");
  };

  return (
    <div className="admin-container">

      <h2>
        Add {type.toUpperCase()}
        {type !== "single" && ` (Set of ${setCount})`}
      </h2>

      {/* NAME */}
      <input
        placeholder="Product Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* CATEGORY */}
      <h3>Category</h3>

      <select
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        <option value="">Select Category</option>

        {/* 🎬 Entertainment */}
        <option value="bollywood">Bollywood</option>
        <option value="actors">Actors</option>
        <option value="movie_posters">Movie Posters</option>
        <option value="pop_culture">Pop Culture</option>

        {/* 🦸 Superheroes */}
        <option value="marvel_dc">Marvel & DC</option>

        {/* 🏏 Sports */}
        <option value="sports">Sports</option>
        <option value="football">Football</option>
        <option value="cricket">Cricket</option>

        {/* 🚗 Lifestyle */}
        <option value="cars">Cars</option>
        <option value="gym">Gym</option>

        {/* 🎨 Aesthetic */}
        <option value="aesthetic">Aesthetic</option>
        <option value="aesthetic_texts">Aesthetic Texts</option>
        <option value="motivational">Motivational</option>

        {/* 🧘 Spiritual */}
        <option value="spiritual">Spiritual</option>
        <option value="divine">Divine</option>
        <option value="devotional">Devotional</option>

        {/* 🌿 Nature */}
        <option value="nature">Nature</option>

        {/* 🎌 Anime */}
        <option value="anime">Anime</option>

        {/* 🌟 Icons */}
        <option value="legends">Legends</option>
        <option value="icons">Icons</option>

      </select>

      {/* IMAGES */}
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

      {/* DOWNLOAD FILE */}
      <h3>Downloadable File</h3>

      <input
        type="file"
        onChange={(e) =>
          setFiles({ ...files, downloadableFile: e.target.files[0] })
        }
      />

      {/* DIGITAL PRICE */}
      <h3>Digital Download Price (₹)</h3>

      <input
        type="number"
        value={form.downloadPrice}
        onChange={(e) =>
          setForm({ ...form, downloadPrice: e.target.value })
        }
      />

      {/* STOCK */}
      <h3>Stock Quantity</h3>

      <input
        type="number"
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* SUBMIT */}
      <button onClick={handleSubmit}>
        Submit Product
      </button>

    </div>
  );
}