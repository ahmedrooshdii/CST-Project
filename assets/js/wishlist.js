//declare vars
const currentUserLocal = JSON.parse(sessionStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users"));
let user = getCurrentUser();
const products = JSON.parse(localStorage.getItem("products"));
let favoriteContainer;
//document load
window.addEventListener("load", () => {
  //query elements
  favoriteContainer = document.getElementById("favoriteContainer");
  renderFavorites();
});

// get user from local storage
function getCurrentUser() {
  return users.find((u) => u.email === currentUserLocal?.email);
}
//save user
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

//get product from all products
function getProduct(id) {
  let product = products.filter((el) => {
    return el.id == id;
  })[0];
  return product;
}
function deleteFavorite(id) {
  user.favorites = user.favorites.filter((el) => el != id);
  saveUsers();
  renderFavorites();
}
function navigateToProductDetails(id) {
  window.location.href = `../../pages/products/single-product.html?id=${id}`;
}

function renderFavorites() {
  favoriteContainer.innerHTML = "";
  let length = user.favorites.length;
  if (length > 0) {
    user.favorites.forEach((element) => {
      let currentProduct = getProduct(element);
      favoriteContainer.innerHTML += `
        <div onclick="navigateToProductDetails(${element})" class="product-card">
                <div onclick="deleteFavorite(${element})" class="product-favorite">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <img
                  src="${currentProduct.image}"
                  class="product-img"
                />
                <h3 class="product-name text-capitalize">
                  ${currentProduct.name}
                </h3>
                <p class="product-price">$${currentProduct.price}</p>
                <div>
                  <button class="btn btn-primary" id="cartBtn" onclick="addToCart(${currentProduct.id});">Buy Now</button>
                </div>
              </div>
          `;
    });
  } else {
    favoriteContainer.style.display = "block";
    favoriteContainer.innerHTML = `<p class="py-2 text-secondary h3 fw-light" >There is No Favorite Items </p>`;
  }
}

function checkStock(quantity, id) {
  let product = getProduct(id);

  if (product.stock - quantity >= 0) {
    return true;
  }
  return false;
}

function addToCart(id) {
  event.stopPropagation();
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }

  user.cart = user.cart || [];
  const existingItem = user.cart.find((item) => item.productId === id);
  if (existingItem) {
    if (checkStock(existingItem.quantity + 1, id)) {
      existingItem.quantity += Number(1);
      showToast(
        "The Item Already exist in Cart and quantity was incremented by one",
        "success"
      );
    } else {
      showToast("The Item Is Out Of Stock", "danger");
    }
  } else {
    if (checkStock(1, id)) {
      user.cart.push({ productId: id, quantity: 1 });
      showToast("The Item has been Added To Cart", "success");
    } else {
      showToast("The Item Is Out Of Stock", "danger");
    }
  }

  saveUsers();
}

function showToast(message, type = "danger") {
  let toastEl = document.getElementById("toastMessage");

  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  toastEl.querySelector(".toast-body").textContent = message;

  let toast = new bootstrap.Toast(toastEl);
  toast.show();
}
