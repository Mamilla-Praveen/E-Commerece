// Carousel Auto-Rotate
let index = 0;
setInterval(() => {
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => slide.classList.remove('active'));
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 1500);

// API Endpoints
const PRODUCT_API = 'https://6826de9b397e48c913178784.mockapi.io/products/products';
const ORDER_API = 'https://6826de9b397e48c913178784.mockapi.io/products/orders';

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const welcomeMsgElem = document.getElementById("welcomeMessage");
    if (welcomeMsgElem) {
      welcomeMsgElem.textContent = `Welcome, ${user.username}`;
    }
  }

  // Load all products initially
  loadProducts();

  // Filter by Category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      loadProducts(category);
    });
  });

  // Search input
  const searchInput = document.getElementById("searchBar");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      loadProducts(null, e.target.value.trim());
    });
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
});

// Load products from API, optionally filtered by category and/or search term
async function loadProducts(category = null, search = "") {
  try {
    const res = await fetch(PRODUCT_API);
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

    let products = await res.json();

    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    displayProducts(products);
  } catch (err) {
    console.error("Failed to load products:", err);
    const container = document.getElementById("product-list");
    if (container) {
      container.innerHTML = `<p style="color:red;">Error loading products. Please try again later.</p>`;
    }
  }
}

// Render product cards on the page
function displayProducts(products) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-image" data-id="${p.id}" />
      <h4 class="product-name" data-id="${p.id}">${p.name}</h4>
      <p><strong>Category:</strong> ${p.category}</p>
      <p><strong>₹${p.price}</strong></p>
      <p><small>Stock: ${p.stock}</small></p>
      <button onclick="addToCart('${p.id}')">Add to Cart</button>
      <button onclick="buyNow('${p.id}', '${encodeURIComponent(p.name)}', ${p.price})">Buy Now</button>
    `;

    container.appendChild(card);
  });

  // Make product images and names clickable to open product details page
  document.querySelectorAll('.product-image, .product-name').forEach(el => {
    el.style.cursor = "pointer";
    el.addEventListener('click', () => {
      const productId = el.getAttribute('data-id');
      if (productId) {
        // Navigate in the same tab
        window.location.href = `product.html?productId=${productId}`;
      }
    });
  });
}

// Add product to cart saved in localStorage
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

 
  cart.push(productId);

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// Buy Now button redirects to order page with product info in URL query string
function buyNow(id, encodedName, price) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  const productName = decodeURIComponent(encodedName);

  // Redirect with properly encoded URL parameters
  const params = new URLSearchParams({
    productId: id,
    productName: productName,
    productPrice: price
  });

  window.location.href = `order.html?${params.toString()}`;
}
