// Created by: Ahmed Roshdi

function seedProducts() {
  let existingProducts = JSON.parse(localStorage.getItem("products")) || [];
  if (existingProducts.length > 0) return;

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const sampleProducts = [
    // Phones
    {
      name: "iPhone 14 Pro",
      price: 42000,
      stock: 5,
      status: "Active",
      description: "Apple flagship smartphone with A16 chip",
      category: "Phones",
      image: "/assets/images/Iphone 14 pro 1 (9).png",
    },
    {
      name: "Samsung Galaxy S23",
      price: 35000,
      stock: 8,
      status: "Active",
      description: "High-end Android smartphone",
      category: "Phones",
      image: "/assets/images/galaxys23.png",
    },
    {
      name: "Xiaomi Redmi Note 12",
      price: 12000,
      stock: 12,
      status: "Active",
      description: "Affordable smartphone with strong battery life",
      category: "Phones",
      image: "/assets/images/redminote12.png",
    },

    // Smart Watch
    {
      name: "Apple Watch Series 8",
      price: 15000,
      stock: 10,
      status: "Active",
      description: "Smart watch with health tracking features",
      category: "Smart Watch",
      image: "/assets/images/applewatch8.png",
    },
    {
      name: "Samsung Galaxy Watch 5",
      price: 11000,
      stock: 7,
      status: "Active",
      description: "Stylish smart watch with fitness tracking",
      category: "Smart Watch",
      image: "/assets/images/galaxywatch5.webp",
    },
    {
      name: "Fitbit Versa 4",
      price: 6000,
      stock: 15,
      status: "Active",
      description: "Fitness-oriented smartwatch",
      category: "Smart Watch",
      image: "/assets/images/fitbitversa4.png",
    },

    // Cameras
    {
      name: "Canon EOS 250D",
      price: 20000,
      stock: 4,
      status: "Active",
      description: "Entry-level DSLR camera",
      category: "Cameras",
      image: "/assets/images/canon250d.png",
    },
    {
      name: "Sony Alpha a6400",
      price: 31000,
      stock: 3,
      status: "Active",
      description: "Mirrorless camera for professionals",
      category: "Cameras",
      image: "/assets/images/sonya6400.png",
    },
    {
      name: "Nikon D7500",
      price: 28000,
      stock: 6,
      status: "Active",
      description: "High-performance DSLR camera",
      category: "Cameras",
      image: "/assets/images/nikond7500.webp",
    },

    // Headphones
    {
      name: "Sony WH-1000XM5",
      price: 12000,
      stock: 9,
      status: "Active",
      description: "Noise-cancelling wireless headphones",
      category: "Headphones",
      image: "/assets/images/sonywh1000xm5.webp",
    },
    {
      name: "Apple AirPods Pro 2",
      price: 9000,
      stock: 12,
      status: "Active",
      description: "Wireless earbuds with ANC",
      category: "Headphones",
      image: "/assets/images/airpodspro2.png",
    },
    {
      name: "JBL Tune 760NC",
      price: 4000,
      stock: 20,
      status: "Active",
      description: "Affordable over-ear headphones",
      category: "Headphones",
      image: "/assets/images/jbltune760.png",
    },

    // Computers
    {
      name: "MacBook Pro 14",
      price: 60000,
      stock: 5,
      status: "Active",
      description: "Apple laptop with M2 Pro chip",
      category: "Computers",
      image: "/assets/images/Macbook 1.png",
    },
    {
      name: "Dell XPS 13",
      price: 45000,
      stock: 7,
      status: "Active",
      description: "Premium ultrabook with sleek design",
      category: "Computers",
      image: "/assets/images/dellxps13.png",
    },
    {
      name: "HP Pavilion 15",
      price: 20000,
      stock: 10,
      status: "Active",
      description: "Affordable laptop for students",
      category: "Computers",
      image: "/assets/images/hppavilion15.png",
    },

    // Gaming
    {
      name: "PlayStation 5",
      price: 30000,
      stock: 6,
      status: "Active",
      description: "Next-gen Sony gaming console",
      category: "Gaming",
      image: "/assets/images/PlayStation.png",
    },
    {
      name: "Xbox Series X",
      price: 28000,
      stock: 4,
      status: "Active",
      description: "Microsoft gaming console with 4K support",
      category: "Gaming",
      image: "/assets/images/xboxseriesx.png",
    },
    {
      name: "Nintendo Switch OLED",
      price: 12000,
      stock: 9,
      status: "Active",
      description: "Hybrid gaming console",
      category: "Gaming",
      image: "/assets/images/switcholed.png",
    },
    {
      name: "Logitech G Pro Controller",
      price: 3500,
      stock: 15,
      status: "Active",
      description: "Professional gaming controller",
      category: "Gaming",
      image: "/assets/images/logitechgpro.webp",
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
