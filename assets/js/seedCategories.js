// Created by: Ahmed Roshdi

function seedProducts() {
  let existingCategories = JSON.parse(localStorage.getItem("categories")) || [];
  if (existingCategories.length > 0) return;

  console.log(existingCategories);

  const categories = [
    {
      id: Date.now(),
      name: "Phones",
      description: "Smartphones and mobile accessories.",
      status: "active",
    },
    {
      id: Date.now() + 1,
      name: "Smart Watch",
      description: "Wearable smart devices and fitness trackers.",
      status: "active",
    },
    {
      id: Date.now() + 2,
      name: "Cameras",
      description: "Digital cameras, lenses, and photography accessories.",
      status: "active",
    },
    {
      id: Date.now() + 3,
      name: "Headphones",
      description: "Wired and wireless headphones and earphones.",
      status: "active",
    },
    {
      id: Date.now() + 4,
      name: "Computers",
      description: "Laptops, desktops, and computer accessories.",
      status: "active",
    },
    {
      id: Date.now() + 5,
      name: "Gaming",
      description: "Gaming consoles, controllers, and accessories.",
      status: "active",
    },
  ];

  localStorage.setItem("categories", JSON.stringify(categories));
}

window.addEventListener("load", seedProducts);
