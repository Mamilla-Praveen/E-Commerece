const PRODUCT_API = 'https://6826de9b397e48c913178784.mockapi.io/products/products';
const ORDER_API = 'https://6826de9b397e48c913178784.mockapi.io/products/orders';

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadOrders();

  // Handle add product form
  const addForm = document.getElementById("addProductForm");
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
      name: document.getElementById("name").value,
      category: document.getElementById("category").value,
      price: parseFloat(document.getElementById("price").value),
      image: document.getElementById("image").value,
      description: document.getElementById("description").value,
      stock: parseInt(document.getElementById("stock").value)
    };

    try {
      const res = await fetch(PRODUCT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });

      if (res.ok) {
        alert("Product added successfully!");
        addForm.reset();
        loadProducts();
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  });

  // Logout
  const logoutBtn = document.querySelector("button[onclick='logout()']");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
});

function loadProducts() {
  fetch(PRODUCT_API)
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("admin-product-list");
      container.innerHTML = "";

      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}" />
          <h4>${p.name}</h4>
          <p><strong>Category:</strong> ${p.category}</p>
          <p><strong>₹${p.price}</strong></p>
          <p><small>Stock: ${p.stock}</small></p>
          <button onclick="editProduct('${p.id}')">Edit</button>
          <button onclick="deleteProduct('${p.id}')">Delete</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Failed to load products:", err));
}

function editProduct(id) {
  // Fetch product details and populate the form for editing
  fetch(`${PRODUCT_API}/${id}`)
    .then(res => res.json())
    .then(product => {
      document.getElementById("name").value = product.name;
      document.getElementById("category").value = product.category;
      document.getElementById("price").value = product.price;
      document.getElementById("image").value = product.image;
      document.getElementById("description").value = product.description;
      document.getElementById("stock").value = product.stock;
      document.getElementById("productId").value = product.id;
    })
    .catch(err => console.error("Failed to fetch product:", err));
}

function deleteProduct(id) {
  fetch(`${PRODUCT_API}/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (res.ok) {
        alert("Product deleted successfully!");
        loadProducts();
      } else {
        alert("Failed to delete product.");
      }
    })
    .catch(err => console.error("Error deleting product:", err));
}


async function loadOrders() {
  try {
    const res = await fetch(ORDER_API);
    const orders = await res.json();
    const container = document.getElementById("order-list");

    container.innerHTML = "";

    orders.forEach(order => {
      const div = document.createElement("div");
      div.className = "order-card";
      div.innerHTML = `
        <p><strong>Product:</strong> ${order.productName}</p>
        <p><strong>Price:</strong> ₹${order.price}</p>
        <p><strong>User:</strong> ${order.name}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Time:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load orders:", err);
  }
}


