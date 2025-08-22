// Created by: Ahmed Roshdi

function seedProducts() {
  let existingProducts = JSON.parse(localStorage.getItem("products")) || [];
  if (existingProducts.length > 0) return;


  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const sampleProducts = [
    {
      name: "Apple iPhone 14 Pro Max 128GB · Deep Purple (MQ9T3RX/A)",
      price: 900,
      stock: 12,
      status: "Active",
      description: "Apple flagship smartphone with A16 chip",
      category: "Electronics",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      price: 42000,
      stock: 8,
      status: "Active",
      description: "Samsung's top-tier smartphone with Snapdragon 8 Gen 2",
      category: "Electronics",
      image: "/assets/images/Iphone 14 pro 1 (2).png",
    },
    {
      name: "MacBook Air M2",
      price: 58000,
      stock: 5,
      status: "Active",
      description: "Apple's lightweight laptop with M2 chip",
      category: "Electronics",
      image: "/assets/images/Macbook 1.png",
    },
    {
      name: "PlayStation 5",
      price: 27000,
      stock: 4,
      status: "Out of Stock",
      description: "Next-gen gaming console from Sony",
      category: "Electronics",
      image: "/assets/images/PlayStation.png",
    },
    {
      name: "Nike Air Force 1",
      price: 3500,
      stock: 15,
      status: "Active",
      description: "Classic Nike sneakers",
      category: "Clothing",
      image: "/assets/images/3.png",
    },
    {
      name: "Adidas Ultraboost 22",
      price: 4000,
      stock: 9,
      status: "Active",
      description: "High performance running shoes",
      category: "Clothing",
      image: "/assets/images/6.png",
    },
    {
      name: "Levi's 501 Jeans",
      price: 1500,
      stock: 20,
      status: "Active",
      description: "Iconic straight-leg jeans",
      category: "Clothing",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "The Lean Startup",
      price: 350,
      stock: 25,
      status: "Active",
      description: "Book on entrepreneurship by Eric Ries",
      category: "Books",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Atomic Habits",
      price: 300,
      stock: 30,
      status: "Active",
      description: "Book on habit building by James Clear",
      category: "Books",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Rich Dad Poor Dad",
      price: 250,
      stock: 28,
      status: "Active",
      description: "Financial literacy book by Robert Kiyosaki",
      category: "Books",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Philips Air Fryer XXL",
      price: 4800,
      stock: 7,
      status: "Active",
      description: "Large capacity air fryer",
      category: "Home & Garden",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Dyson V15 Detect Vacuum",
      price: 15000,
      stock: 3,
      status: "Inactive",
      description: "High-end cordless vacuum cleaner",
      category: "Home & Garden",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Tefal Non-Stick Cookware Set",
      price: 2200,
      stock: 10,
      status: "Active",
      description: "Durable non-stick cookware set",
      category: "Home & Garden",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Wilson Pro Staff RF97 Tennis Racket",
      price: 3500,
      stock: 6,
      status: "Active",
      description: "Professional tennis racket endorsed by Roger Federer",
      category: "Sports",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Adidas FIFA World Cup Ball",
      price: 1200,
      stock: 15,
      status: "Active",
      description: "Official match ball for FIFA World Cup",
      category: "Sports",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Yonex Astrox 99 Badminton Racket",
      price: 2000,
      stock: 5,
      status: "Inactive",
      description: "Advanced badminton racket",
      category: "Sports",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Kindle Paperwhite",
      price: 3500,
      stock: 12,
      status: "Active",
      description: "E-reader with high-resolution display",
      category: "Electronics",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "GoPro HERO11 Black",
      price: 11500,
      stock: 7,
      status: "Active",
      description: "Action camera for adventure filming",
      category: "Electronics",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Apple Watch Series 8",
      price: 12000,
      stock: 9,
      status: "Active",
      description: "Latest Apple smartwatch",
      category: "Electronics",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
    {
      name: "Logitech MX Master 3S",
      price: 2500,
      stock: 14,
      status: "Active",
      description: "High-performance wireless mouse",
      category: "Electronics",
      image: "/assets/images/Iphone 14 pro 1 (4).png",
    },
  ];

  const productsWithMeta = sampleProducts.map((p, index) => ({
    id: Date.now() + index,
    sellerEmail: "admin@cyber.com",
    ...p,
  }));

  localStorage.setItem("products", JSON.stringify(productsWithMeta));
  console.log("20 real-looking products added to localStorage");
}

window.addEventListener("load", seedProducts);

function addAdminUser() {
  let user = {
    addresses: [],
    cart: [],
    email: "admin@cyber.com",
    favorites: [],
    name: "Admin",
    password: "123456",
    reviews: [],
    role: "admin",
    storename: "Admin Store",
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users?.length == 0) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

addAdminUser();
