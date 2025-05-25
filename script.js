document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("productContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const darkToggle = document.getElementById("darkToggle");

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = '<div class="modal-content"></div>';
  document.body.appendChild(modal);

  let products = [];

  async function loadProducts() {
    const res = await fetch("data/products.json");
    products = await res.json();
    displayProducts(products);
  }

  function displayProducts(items) {
    productContainer.innerHTML = "";
    items.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy"/>
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
      `;
      card.onclick = () => openModal(product);
      productContainer.appendChild(card);
    });
  }

  function openModal(product) {
    const content = modal.querySelector(".modal-content");
    content.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel elit nec purus hendrerit accumsan.</p>
      <button onclick="document.querySelector('.modal').style.display = 'none'">Close</button>
    `;
    modal.style.display = "flex";
  }

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  function filterProducts() {
    const keyword = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = products.filter(p => {
      return (
        (category === "all" || p.category === category) &&
        p.name.toLowerCase().includes(keyword)
      );
    });

    displayProducts(filtered);
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  loadProducts();
});
