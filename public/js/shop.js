// shop.js (fetch products from backend)
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("product-grid");
    data.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${p.images[0]}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <a href="product.html?id=${p._id}">View</a>
      `;
      grid.appendChild(div);
    });
  });
