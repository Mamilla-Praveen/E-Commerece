# E-Commerece

# 🛍️ E-Commerce Website

A fully functional and stylish **E-Commerce Website** built using **HTML**, **CSS**, and **JavaScript**, with **MockAPI** integration for backend operations. This project simulates a real-world online shopping experience with user and admin roles, cart and checkout functionality, and product/order management.

---

## 🔗 Live Preview
> Add your live GitHub Pages or deployment link here, if available.

---

## 📌 Features

### 🧑‍💻 User Side
- 🏠 **Homepage** with product listings and carousel
- 🔍 **Search** and **Filter** products by name or category
- 📦 **View Product Details** on click
- 🛒 **Cart Functionality**:
  - Add to Cart
  - View Cart
  - Remove from Cart
  - Total Price Calculation
- 💳 **Buy Now** feature:
  - Redirects to order form
  - Sends order to MockAPI
- 📋 **Checkout Form**:
  - Collects name, address, phone
  - Validates inputs
- 📱 Responsive design for mobile and desktop

### 🛠️ Admin Side
- 🔐 **Admin Login** with fixed credentials  
  - `Username: admin`  
  - `Password: admin123`
- 📥 **Product Management**:
  - Add Product
  - Edit Product
  - Delete Product
- 📦 **Order Management**:
  - View all orders
  - Update order status (e.g., pending, shipped, delivered)

---

## 📁 Folder Structure

ecommerce-site/
│
├── index.html # Homepage
├── login.html # User/Admin Login Page
├── cart.html # Cart Page
├── checkout.html # Order Form Page
├── admin.html # Admin Dashboard
├── add-product.html # Add/Edit Product Page
├── orders.html # Admin Order Management
│
├── css/
│ └── style.css # All styles
│
├── js/
│ ├── main.js # Homepage logic
│ ├── cart.js # Cart logic
│ ├── checkout.js # Order form logic
│ ├── admin.js # Admin logic
│ └── auth.js # Login and role-based redirect
│
└── assets/
└── images/ # Product and carousel images


---

## 🧪 Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5     | Structure of the site |
| CSS3      | Styling and layout |
| JavaScript (ES6) | Dynamic behavior and DOM manipulation |
| MockAPI   | Simulated backend for products and orders |
| LocalStorage | Cart and session management |

---

## 🔐 Login Details

### 👤 User
- Any username/password allowed

### 👑 Admin
- Username: `admin`
- Password: `admin123`

---

## 📦 Sample API Schemas (MockAPI)

### Products
```json
{
  "id": "1",
  "title": "Nike Air Max",
  "price": 4999,
  "image": "https://cloudinary.com/.../nike.jpg",
  "category": "shoes"
}


{
  "id": "1",
  "productId": "1",
  "productName": "Nike Air Max",
  "price": 4999,
  "name": "John Doe",
  "address": "New York",
  "phone": "1234567890",
  "status": "pending",
  "createdAt": "2025-06-29T12:00:00Z"
}

----------------

# Clone this repository:

git clone https://github.com/your-username/ecommerce-site.git
cd ecommerce-site


## License
This project is open-source and available under the MIT License.

