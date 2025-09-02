document.addEventListener("DOMContentLoaded", () => {
  updateWishCount();
  updateCartCount();

  const productsContainer = document.querySelector(
    ".row.row-cols-1.row-cols-md-3.g-4"
  );
  productsContainer.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    productsContainer.innerHTML = `<p class="text-center w-100">No products available.</p>`;
  } else {
    products.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col product-card";
      col.setAttribute("data-id", product.id);
      col.setAttribute("data-name", product.name);
      col.setAttribute("data-price", product.price);
      col.setAttribute("data-img", product.image);
      col.setAttribute("data-description", product.description);
      col.setAttribute("data-category", product.category);
      col.setAttribute("data-stock", product.stock);

      col.innerHTML = `
        <div class="card h-100 text-center position-relative product-link">
          <div class="position-absolute top-0 end-0 p-2">
            <i class="far fa-heart text-muted favorite-btn" style="cursor:pointer;"></i>
          </div>
          <div class="card-body">
            <img src="${product.image}" class="card-img-top mb-3" alt="${
        product.name
      }">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text fs-4 fw-bold">$${parseFloat(
              product.price
            ).toFixed(2)}</p>
            ${
              product.stock == 0
                ? `<div class="out-of-stock text-danger fw-bold">Out of Stock</div>`
                : `<button class="btn btn-dark w-100 add-to-cart">Add To Cart</button>`
            }
          </div>
        </div>
      `;

      // Card click → go to single product page (exclude Buy/Add to cart/Favorite)
      col.querySelector(".product-link").addEventListener("click", (e) => {
        if (
          e.target.classList.contains("add-to-cart") ||
          e.target.classList.contains("favorite-btn")
        )
          return;
        window.location.href = `single-product.html?id=${product.id}`;
      });

      // Favorite button logic
      const favBtn = col.querySelector(".favorite-btn");
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === currentUser.email);
        if (user?.favorites?.includes(String(product.id))) {
          favBtn.classList.remove("text-muted");
          favBtn.classList.add("text-danger");
          favBtn.classList.replace("far", "fas");
        }
      }

      favBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent card click
        if (!currentUser) {
          window.location.href = "../../pages/auth/login.html";
          return;
        }
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find((u) => u.email === currentUser.email);
        if (!user.favorites) user.favorites = [];
        const id = String(product.id);

        if (user.favorites.includes(id)) {
          // remove from favorites
          user.favorites = user.favorites.filter(
            (productId) => productId !== id
          );
          favBtn.classList.remove("text-danger");
          favBtn.classList.add("text-muted");
          favBtn.classList.replace("fas", "far");
        } else {
          // add to favorites
          user.favorites.push(id);
          favBtn.classList.remove("text-muted");
          favBtn.classList.add("text-danger");
          favBtn.classList.replace("far", "fas");
        }
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        updateWishCount();
      });

      // Add to cart logic
      const addBtn = col.querySelector(".add-to-cart");
      if (addBtn) {
        addBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
          if (!currentUser) {
            window.location.href = "../../pages/auth/login.html";
            return;
          }

          let users = JSON.parse(localStorage.getItem("users")) || [];
          const productId = String(product.id);
          const productName = product.name;
          const quantity = 1;

          // Add to user's cart
          users.forEach((u) => {
            if (u.email === currentUser.email) {
              if (!u.cart) u.cart = [];
              const existingItem = u.cart.find(
                (item) => item.productId === productId
              );
              if (existingItem) {
                existingItem.quantity += 1;
                showToast(
                  `Product ${productName} added to your cart!`,
                  "success"
                );
              } else {
                u.cart.push({ productId, quantity });
                showToast(
                  `Product ${productName} added to your cart!`,
                  "success"
                );
              }
            }
          });

          localStorage.setItem("users", JSON.stringify(users));
          let updatedUser = users.find((u) => u.email === currentUser.email);
          sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
          updateCartCount();
        });
      }

      productsContainer.appendChild(col);
    });
    updateProductCount();
  }

  // CATEGORY FILTER
  const filterContainer = document.getElementById("categoryFilters");
  const searchInput = document.getElementById("searchCategoryFilter");
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  function renderCategories(list) {
    filterContainer.innerHTML = "";
    list.forEach((cat) => {
      const div = document.createElement("div");
      div.className = "filter-check mb-2";
      div.innerHTML = `
        <input class="form-check-input" type="checkbox" id="cat-${cat.id}" value="${cat.name}">
        <label class="form-check-label d-flex justify-content-between w-100" for="cat-${cat.id}">
          <span>${cat.name}</span>
        </label>
      `;
      filterContainer.appendChild(div);
    });
    document
      .querySelectorAll('#collapseCategory input[type="checkbox"]')
      .forEach((cb) => {
        cb.addEventListener("change", filterProducts);
      });
  }
  renderCategories(categories);

  searchInput.addEventListener("keyup", function () {
    const searchText = this.value.toLowerCase();
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchText)
    );
    renderCategories(filtered);
  });

  // COMBINED FILTER
  function filterProducts() {
    const priceFrom =
      parseFloat(document.getElementById("priceFrom").value) || 0;
    const priceTo =
      parseFloat(document.getElementById("priceTo").value) || Infinity;
    const selectedCategories = Array.from(
      document.querySelectorAll(
        '#collapseCategory input[type="checkbox"]:checked'
      )
    ).map((cb) => cb.value.toLowerCase());
    document.querySelectorAll(".product-card").forEach((card) => {
      const productCategory = card.dataset.category?.toLowerCase();
      const productPrice = parseFloat(card.dataset.price);
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(productCategory);
      const matchPrice = productPrice >= priceFrom && productPrice <= priceTo;
      card.style.display = matchCategory && matchPrice ? "" : "none";
    });
    updateProductCount();
  }

  document
    .getElementById("priceFrom")
    .addEventListener("input", filterProducts);
  document.getElementById("priceTo").addEventListener("input", filterProducts);
  filterProducts();

  // HEAD SEARCH
  const headSearch = document.getElementById("productSearch");
  headSearch.addEventListener("input", () => {
    const searchText = headSearch.value.toLowerCase();
    applySearchFilter(searchText);
  });

  function applySearchFilter(searchText) {
    document.querySelectorAll(".product-card").forEach((card) => {
      const name = card.dataset.name?.toLowerCase() || "";
      const cat = card.dataset.category?.toLowerCase() || "";
      card.style.display =
        name.includes(searchText) || cat.includes(searchText) ? "" : "none";
    });
    updateProductCount();
  }

  // ✅ Run search if query param exists
  const urlParamsSearch = new URLSearchParams(window.location.search);
  const searchFromUrl = urlParamsSearch.get("search");
  if (searchFromUrl) {
    headSearch.value = searchFromUrl;
    applySearchFilter(searchFromUrl.toLowerCase());
  }

  // PRODUCT COUNT
  function updateProductCount() {
    const count = Array.from(document.querySelectorAll(".product-card")).filter(
      (card) => card.style.display !== "none"
    ).length;
    document.getElementById("productCount").textContent = count;
  }

  // NAVBAR CLICK → CATEGORY FILTER
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category");
  if (categoryFromUrl) {
    const checkbox = Array.from(
      document.querySelectorAll('#collapseCategory input[type="checkbox"]')
    ).find((cb) => cb.value.toLowerCase() === categoryFromUrl.toLowerCase());
    if (checkbox) {
      checkbox.checked = true;
      filterProducts();
    }
  }
});

function showToast(message, type = "success") {
  const toastEl = document.getElementById("toastMessage");
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;
  toastEl.querySelector(".toast-body").textContent = message;
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

function updateCartCount() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const cartCount = document.getElementById("cartCount");
  if (!currentUser) {
    cartCount.style.display = "none";
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((u) => u.email === currentUser.email);
  if (user && user.cart && user.cart.length > 0) {
    let count = user.cart.reduce((acc, item) => acc + item.quantity, 0) || 0;
    cartCount.textContent = count;
    cartCount.style.display = "inline-block";
  } else {
    cartCount.style.display = "none";
  }
}

window.addEventListener("load", updateCartCount);

function goToCart() {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }
  window.location.href = `/pages/cart/shopping-cart.html`;
}

//update wish count
function updateWishCount() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const wishCount = document.getElementById("wishCount");
  if (!currentUser) {
    wishCount.style.display = "none";
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((u) => u.email === currentUser.email);
  if (user && user.favorites && user.favorites.length > 0) {
    wishCount.textContent = user.favorites.length;
    wishCount.style.display = "inline-block";
  } else {
    wishCount.style.display = "none";
  }
}
