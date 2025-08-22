// Created by: Ahmed Roshdi

function seedProducts() {
  let existingCategories = JSON.parse(localStorage.getItem("categories")) || [];
  if (existingCategories.length > 0) return;

  const categories = [
    {
      id: Date.now(),
      name: "Phones",
      description: "Smartphones and mobile accessories.",
      status: "active",
      imageUrl: "/assets/icons/phone.svg",
    },
    {
      id: Date.now() + 1,
      name: "Smart Watch",
      description: "Wearable smart devices and fitness trackers.",
      status: "active",
      imageUrl: "/assets/icons/watch.svg",
    },
    {
      id: Date.now() + 2,
      name: "Cameras",
      description: "Digital cameras, lenses, and photography accessories.",
      status: "active",
      imageUrl: "/assets/icons/camera.svg",
    },
    {
      id: Date.now() + 3,
      name: "Headphones",
      description: "Wired and wireless headphones and earphones.",
      status: "active",
      imageUrl: "/assets/icons/headphone.svg",
    },
    {
      id: Date.now() + 4,
      name: "Computers",
      description: "Laptops, desktops, and computer accessories.",
      status: "active",
      imageUrl: "/assets/icons/computer.svg",
    },
    {
      id: Date.now() + 5,
      name: "Gaming",
      description: "Gaming consoles, controllers, and accessories.",
      status: "active",
      imageUrl: "/assets/icons/gaming.svg",
    },
  ];

  localStorage.setItem("categories", JSON.stringify(categories));
}

window.addEventListener("load", seedProducts);
