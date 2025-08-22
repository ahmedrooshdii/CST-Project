document.addEventListener("DOMContentLoaded", () => {
  const cartKey = "cartItems"; // localStorage key
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
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
            <button class="btn btn-dark w-100 add-to-cart">Buy Now</button>
          </div>
        </div>
      `;
      // Card click → go to single product page (exclude Buy Now)
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
      // Set initial state if product is already favorited
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === currentUser.email);
        if (user?.favorites?.includes(product.id)) {
          favBtn.classList.remove("text-muted");
          favBtn.classList.add("text-danger");
          favBtn.classList.replace("far", "fas");
        }
      }
      // Click handler to toggle favorite
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent card click
        if (!currentUser) {
          window.location.href = "../../pages/auth/login.html";
          return;
        }
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find((u) => u.email === currentUser.email);
        if (!user.favorites) user.favorites = [];
        const id = `${product.id}`;
        const index = user.favorites.includes(id);
        if (user.favorites.includes(id)) {
          // remove from favorites
          user.favorites = user.favorites.filter(
            (productId) => productId != id
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
        // Save updates
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      });
      productsContainer.appendChild(col);
    });
    updateProductCount();
  }
  // Attach Buy Now buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (!currentUser) {
        window.location.href = "../../pages/auth/login.html";
        return;
      }
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const card = e.target.closest(".product-card");
      const productId = card.dataset.id;
      const productName = card.dataset.name;
      const quantity = 1;
      users.forEach((user) => {
        if (user.email === currentUser.email) {
          if (!user.cart) user.cart = [];
          const existingItem = user.cart.find(
            (item) => item.productId === productId
          );
          if (existingItem) existingItem.quantity += 1;
          else user.cart.push({ productId, quantity });
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
      showToast(`Product ${productName} added to your cart!`);
    });
  });
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
  // Function so we can reuse search filter
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
    headSearch.value = searchFromUrl; // fill input box
    applySearchFilter(searchFromUrl.toLowerCase()); // apply filter immediately
  }
  // PRODUCT COUNT
  function updateProductCount() {
    const count = Array.from(document.querySelectorAll(".product-card")).filter(
      (card) => card.style.display !== "none"
    ).length;
    document.getElementById("productCount").textContent = count;
  }
  // NAVBAR CLICK → CATEGORY FILTER
  // Auto-select category from URL
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
  // Apply Bootstrap contextual background
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;
  // Update body message
  toastEl.querySelector(".toast-body").textContent = message;
  // Create Bootstrap toast instance
  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000, // auto hide after 3s
  });
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
    let count = user?.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
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
