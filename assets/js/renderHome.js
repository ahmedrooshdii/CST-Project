// Created by: Ahmed Roshdi

document.addEventListener("DOMContentLoaded", function () {
  renderProductCards();
  attachCardListeners();
  renderCategoryCards();
  updateCartCount();
});

function renderProductCards() {
  const newArrivalContainer = document.querySelector(".new-arrival");
  const bestSellerContainer = document.querySelector(".bestseller");
  newArrivalContainer.innerHTML = ""; // clear old cards
  bestSellerContainer.innerHTML = ""; // clear old cards

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const activeProducts = products.filter((p) => p.status !== "Inactive");
  const bestProducts = activeProducts.filter((p) =>
    p.reviews?.some((r) => r.stars >= 4)
  );

  activeProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.setAttribute("data-id", product.id);
    card.innerHTML = `
            <button class="btn favorite">
                <svg class="fav__icon" width="32" height="32" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path class="heart-icon-strok"
                        d="M5.93415 18.5443L15.3152 27.3569C15.6397 27.6616 15.8019 27.814 15.9999 27.814C16.1979 27.814 16.3602 27.6616 16.6846 27.3569L26.0657 18.5443C28.6739 16.0942 28.9907 12.0622 26.797 9.2348L26.3845 8.70316C23.7603 5.32081 18.4928 5.88806 16.6488 9.75157C16.3883 10.2973 15.6115 10.2973 15.351 9.75157C13.5071 5.88806 8.23955 5.32081 5.61531 8.70316L5.20284 9.2348C3.00918 12.0622 3.32592 16.0942 5.93415 18.5443Z"
                        stroke="#919191" stroke-opacity="0.77" stroke-width="1.4"/>
                </svg>
            </button>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
           </div>
           <div>
                ${
                  product.status === "Out of Stock"
                    ? `<div class="out-of-stock" style="text-align: center; color: red">Out of Stock</div>`
                    : ""
                }
                </div >
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">$${parseFloat(product.price).toFixed(
                  2
                )}</div>
                ${
                  product.status === "Out of Stock"
                    ? ``
                    : `<button class="btn btn--buy" 
                >Add To Cart</button>`
                }
                
            </div>
        `;
    newArrivalContainer.appendChild(card);
  });

  console.log(bestProducts);

  bestProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.setAttribute("data-id", product.id);
    card.innerHTML = `
            <button class="btn favorite">
                <svg class="fav__icon" width="32" height="32" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path class="heart-icon-strok"
                        d="M5.93415 18.5443L15.3152 27.3569C15.6397 27.6616 15.8019 27.814 15.9999 27.814C16.1979 27.814 16.3602 27.6616 16.6846 27.3569L26.0657 18.5443C28.6739 16.0942 28.9907 12.0622 26.797 9.2348L26.3845 8.70316C23.7603 5.32081 18.4928 5.88806 16.6488 9.75157C16.3883 10.2973 15.6115 10.2973 15.351 9.75157C13.5071 5.88806 8.23955 5.32081 5.61531 8.70316L5.20284 9.2348C3.00918 12.0622 3.32592 16.0942 5.93415 18.5443Z"
                        stroke="#919191" stroke-opacity="0.77" stroke-width="1.4"/>
                </svg>
            </button>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">$${parseFloat(product.price).toFixed(
                  2
                )}</div>
                <button class="btn btn--buy">Add To Cart</button>
            </div>
        `;
    console.log(product);

    bestSellerContainer.appendChild(card);
  });
}

function attachCardListeners() {
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      console.log("added");

      if (e.target.closest(".favorite")) return;
      if (e.target.closest(".btn")) {
        addToCart(e);
        return;
      }
      const productId = card.getAttribute("data-id");
      const user = JSON.parse(sessionStorage.getItem("currentUser"))?.email;
      window.location.href = `/pages/products/single-product.html?id=${productId}`;
    });
  });
}

function renderCategoryCards() {
  const categoriesCarousel = document.querySelector(".categories__carousel");

  // Get categories array from localStorage
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  const activeCategories = categories.filter(
    (cat) => cat.status !== "inactive"
  );
  // Clear existing HTML
  categoriesCarousel.innerHTML = "";

  // Loop through categories and render
  activeCategories.forEach((category) => {
    const categoryCard = document.createElement("a");
    categoryCard.href = `/pages/products/product page.html?id=${category.id}`; // you can set this to category link later
    categoryCard.classList.add("category-card");
    categoryCard.setAttribute("data-id", category.id);

    // Example: pick image path based on name (optional)
    // let imgSrc = "";
    // switch (category.name.toLowerCase()) {
    //   case "phones":
    //     imgSrc = "assets/icons/phone.svg";
    //     break;
    //   case "smart watch":
    //     imgSrc = "assets/icons/watch.svg";
    //     break;
    //   case "cameras":
    //     imgSrc = "assets/icons/camera.svg";
    //     break;
    //   case "headphones":
    //     imgSrc = "assets/icons/headphone.svg";
    //     break;
    //   case "computers":
    //     imgSrc = "assets/icons/computer.svg";
    //     break;
    //   case "gaming":
    //     imgSrc = "assets/icons/gaming.svg";
    //     break;
    //   default:
    //     imgSrc = category.imageUrl;
    // }

    categoryCard.innerHTML = `
      <img src="${category.imageUrl}" alt="${category.name}" />
      <p>${category.name}</p>
    `;

    categoriesCarousel.appendChild(categoryCard);
  });
}

function updateCartCount() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))?.email;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find((u) => u.email === currentUser);

  let count = user?.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  document.getElementById("cartCount").textContent = count;
}

function addToCart(e) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }
  let users = JSON.parse(localStorage.getItem("users"));

  const card = e.target.closest(".product-card");
  const productId = card.dataset.id; // get id from HTML

  const quantity = 1;

  users.forEach((user) => {
    if (user.email === currentUser.email) {
      if (!user.cart) user.cart = [];
      const existingItem = user.cart.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity += Number(1);
      } else {
        user.cart.push({ productId, quantity });
      }
    }
  });

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(users));
  updateCartCount();
}
