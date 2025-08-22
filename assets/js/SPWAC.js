//declare variable
const productId = new URLSearchParams(location.search).get("id");
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const productsList = JSON.parse(localStorage.getItem("products"));
let userss = JSON.parse(localStorage.getItem("users"));

window.addEventListener("load", () => {
  // query elenents
  let whishlistBtn = document.getElementById("wishListBtn"),
    cartBtn = document.getElementById("cartBtn");
  updateCartCount();
  updateWishCount();
  // event listener
  // event for whislist
  whishlistBtn.addEventListener("click", function () {
    const user = getCurrentUser();
    if (!user) {
      window.location.href = "../../pages/auth/login.html";
      return;
    }

    user.favorites = user.favorites || [];

    if (user.favorites.includes(productId)) {
      // user.favorites = user.favorites.filter((id) => id !== productId);
      showToast("The Item Already exist in wishlist", "warning");
    } else {
      showToast("Item has been Added", "success");
      user.favorites.push(productId);
    }

    saveUsers();
  });
  cartBtn.addEventListener("click", function () {
    const user = getCurrentUser();
    if (!user) {
      window.location.href = "../../pages/auth/login.html";
      return;
    }

    user.cart = user.cart || [];
    const existingItem = user.cart.find((item) => item.productId === productId);
    if (existingItem) {
      if (checkStocki(existingItem.quantity + 1)) {
        existingItem.quantity += Number(1);
        showToast(
          "The Item Already exist in Cart and quantity was incremented by one",
          "success"
        );
      } else {
        showToast("The Item Is Out Of Stock", "danger");
      }
    } else {
      if (checkStocki(1)) {
        user.cart.push({ productId, quantity: 1 });
        showToast("The Item has been Added To Cart", "success");
      } else {
        showToast("The Item Is Out Of Stock", "danger");
      }
    }

    saveUsers();
  });
});

function showToast(message, type = "danger") {
  let toastEl = document.getElementById("toastMessage");

  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  toastEl.querySelector(".toast-body").textContent = message;

  let toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function checkStocki(quantity) {
  let product = getProduct(productId);

  if (product.stock - quantity >= 0) {
    return true;
  }
  return false;
}
function checkStock(id, quantity) {
  let product = getProduct(id);

  if (product.stock - quantity >= 0) {
    return true;
  }
  return false;
}

//get product from all products
function getProduct(id) {
  let product = productsList.filter((el) => {
    return el.id == id;
  })[0];
  return product;
}

// add to cart function
function addToCart(id) {
  event.stopPropagation();
  const user = getCurrentUser();

  user.cart = user.cart || [];

  const existingItem = user.cart.find((item) => item.productId == id);
  console.log(existingItem);

  if (existingItem) {
    if (checkStock(id, existingItem.quantity + 1)) {
      existingItem.quantity += Number(1);
      showToast(
        "The Item Already exist in Cart and quantity was incremented by one",
        "success"
      );
    } else {
      showToast("The Item Is Out Of Stock", "danger");
    }
  } else {
    if (checkStock(id, 1)) {
      user.cart.push({ productId: `${id}`, quantity: 1 });
      showToast("The Item has been Added To Cart", "success");
    } else {
      showToast("The Item Is Out Of Stock", "danger");
    }
  }

  saveUsers();
}

// get user from local storage
function getCurrentUser() {
  return userss.find((u) => u.email === currentUser?.email);
}

//save user
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(userss));
  updateCartCount();
  updateWishCount();
}

//naviagte to product
function navigateToProductDetails(id) {
  window.location.href = `../../pages/products/single-product.html?id=${id}`;
}

//add to favorite
function addToFavorite(id) {
  event.stopPropagation();
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }

  user.favorites = user.favorites || [];
  id = `${id}`;
  if (user.favorites.includes(id)) {
    user.favorites = user.favorites.filter((productId) => productId != id);
    showToast("Removed from wishlist", "success");
  } else {
    user.favorites.push(id);
    showToast("Added to wishlist", "success");
  }
  console.log(user.favorites);

  saveUsers();
  renderFavorites();
}

//render faavorite
function renderFavorites() {
  const user = getCurrentUser();
  if (!user) return;

  document.querySelectorAll(".product-favorite").forEach((icon) => {
    const card = icon.closest("[data-id]");
    if (!card) return; // لو ملقاش card فيه data-id يخرج
    const productId = card.dataset.id;

    if (user.favorites.includes(productId)) {
      console.log("true");

      icon.querySelector(".fav__icon").classList.add("makeFavorite");
    } else {
      icon.querySelector(".fav__icon").classList.remove("makeFavorite");
    }
  });
}
