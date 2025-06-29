const PRODUCT_API = "https://6826de9b397e48c913178784.mockapi.io/products/products";
const ORDER_API = "https://6826de9b397e48c913178784.mockapi.io/products/orders";

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartItems = [];

async function fetchProducts() {
  const res = await fetch(PRODUCT_API);
  const products = await res.json();

  cartItems = products.filter(p => cart.includes(p.id));
  displayCart();
}

function displayCart() {
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  let total = 0;

  cartItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" />
      <h4>${item.name}</h4>
      <p>₹${item.price}</p>
    `;
    container.appendChild(card);

    total += Number(item.price);
  });

  const totalElement = document.createElement("div");
  totalElement.className = "cart-total";
  totalElement.innerHTML = `<h3>Total: ₹${total}</h3>`;
  container.appendChild(totalElement);
}

async function checkout() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  if (cartItems.length === 0) {
    alert("Cart is empty!");
    return;
  }

  // Save cartItems to localStorage for use on order.html
  localStorage.setItem("cartForCheckout", JSON.stringify(cartItems));

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  // Redirect with total in query string
  window.location.href = `order.html?total=${total}`;
}


fetchProducts();
