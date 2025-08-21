# 🛍️ E-Commerce Platform

## 📌 Overview

This project is a **responsive e-commerce platform** that allows users to register as customers or sellers, browse and purchase products, and manage their orders. It also includes a blog section, wishlist, shopping cart, and an admin panel to manage users and site-wide activities.

The system is designed to cover **all e-commerce lifecycle processes**:

- User authentication (Login / Signup for Customers & Sellers)
- Product management (Add / Edit / Delete by sellers)
- Cart & Wishlist management
- Checkout & Payment with validation
- Order tracking for customers and sellers
- Admin functionalities for managing users, products, and reviews

---

## 🚀 Features

### 👤 Authentication & Users

- User **Login / Signup** (with separate Seller signup).
- Roles: **Customer, Seller, Admin**.
- Profile management for all users.
- Sellers can manage their stores & products.
- Admin can manage all users and their roles.

### 🏠 Home Page

- Display featured products.
- Global **search bar** in the navbar (available everywhere).
- Add to **Wishlist** or **Cart** directly from the homepage.

### 🛒 Products

- **All Products page** with:
  - Filtering by category and price.
  - Pagination.
  - Wishlist & Cart actions.
- **Product Details page** with:
  - Seller information.
  - Product reviews (Add/Edit/Delete).
  - Recommended products section.

### ❤️ Wishlist

- Add/remove products to wishlist.
- Manage wishlist items easily.

### 🛍️ Cart & Checkout

- Shopping cart page with:
  - Order summary.
  - Remove or update items.
- Checkout process includes:
  - Address selection or add new address.
  - Shipment type (Free or Express).
  - Final order summary with validation.
  - **Credit card payment form with validation**.
- Once order is placed:
  - Stock is updated (decreased automatically).
  - If stock reaches 0 → product status changes to **Out of Stock**.
  - Order is sent to the respective seller dashboard.

### 📦 Orders

- Customers can track their orders with **status updates**.
- Sellers can see all incoming orders placed by customers.
- Admin can monitor all orders.

### 📊 Dashboards

- **Customer Dashboard**: Orders, Profile details.
- **Seller Dashboard**: Store details, Product management, Orders received.
- **Admin Dashboard**: User management (Add/Edit/Delete), Role management, Review moderation.

### 📝 Blog

- Users can view blog posts.
- Sellers/Admin can add, update, or delete blogs.
- Commenting system with moderation.

### ✉️ Contact Us

- Users can send messages directly to admin.
- Stored locally with `id, email, message, username`.

### 🎨 UI & UX

- Fully **responsive design**.
- **Form validation** across all forms (Signup, Checkout, Payment, etc.).
- **Toaster notifications** for all actions (Add to cart, Checkout success, Errors, etc.).

---

## 🗄️ Data Storage (Local Storage)

The project uses **Local Storage** to simulate backend operations:

- **Categories** → `{ id, name, description }`
- **Contact Us Messages** → `{ id, email, message, username }`
- **Orders** → `{ id, address, shipment, status, time, totalPrice, items[] }`
- **Products** → `{ id, name, description, category, price, sellerEmail, status, stock, image }`
- **Users** → `{ id, name, email, password, role, storeName, address[], cart[], favorites[], reviews[] }`

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Storage:** LocalStorage (for demo purposes)
- **UI/UX Enhancements:** Responsive Design, Toaster Notifications, Form Validations

## 👨‍💻 Contributors

- Ahmed Talaat
- Ahmed Roshdi
- Yasser Ahmed
- Mohamed Basiouny

---
