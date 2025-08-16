//declare variable
const productId = new URLSearchParams(location.search).get("id");
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

let userss = JSON.parse(localStorage.getItem("users"));

window.addEventListener("load", () => {
  // query elenents
  let whishlistBtn = document.getElementById("wishListBtn"),
    cartBtn = document.getElementById("cartBtn");

  // get user from local storage
  function getCurrentUser() {
    return userss.find((u) => u.email === currentUser?.email);
  }

  //save user
  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(userss));
  }

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
      existingItem.quantity += Number(1);
      showToast(
        "The Item Already exist in Cart and quantity was incremented by one",
        "success"
      );
    } else {
      user.cart.push({ productId, quantity: 1 });
      showToast("The Item has been Added Cart", "success");
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
