//declare vars
const currentUserLocal = JSON.parse(sessionStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users"));
let user = getCurrentUser();
const products = JSON.parse(localStorage.getItem("products"));
let totalSum;
let cartContainer;
let checkoutBtn;
let subTotalPrice;
let taxPrice;
let totalPrice;

if (!currentUserLocal) {
  location.href = "/pages/auth/login.html";
}
// document load
window.addEventListener("load", () => {
  //query elements
  cartContainer = document.getElementById("cart-content");
  checkoutBtn = document.getElementById("checkoutBtn");
  subTotalPrice = document.getElementById("subTotalPrice");
  taxPrice = document.getElementById("taxPrice");
  totalPrice = document.getElementById("totalPrice");
  renderCart();
  updateWishCount();
});

// get user from local storage
function getCurrentUser() {
  return users.find((u) => u.email === currentUserLocal?.email);
}
//save user
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}
function renderCart() {
  cartContainer.innerHTML = "";
  totalSum = 0;
  let length = user.cart.length;
  if (length > 0) {
    user.cart.forEach((element, index) => {
      let currentProduct = getProduct(element.productId);
      let price = currentProduct.price * element.quantity;
      totalSum += price;
      cartContainer.innerHTML += `
           <div class="cart-item">
                        <div class="item-image" style="background-image: url('${
                          currentProduct.image
                        }');background-size: contain;background-repeat: no-repeat; "></div>
                        
                        <div class="item-details">
                            <div class="item-info">
                                <div class="item-name">${
                                  currentProduct.name
                                }</div>
                                <div class="item-id">#${currentProduct.id}</div>
                            </div>
                            
                            <div class="item-controls">
                                <div class="quantity-controls">
                                    <button onclick="decrementQuantity(${
                                      element.productId
                                    })"  class="quantity-btn minus-btn">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </button>
                                    <div class="quantity-display">${
                                      element.quantity
                                    }</div>
                                    <button onclick="incrementQuantity(${
                                      element.productId
                                    })" class="quantity-btn plus-btn">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </button>
                                </div>
                                
                                <div class="item-price">$${price}</div>
                                
                                <button onclick="deleteCartItem(${
                                  element.productId
                                })" class="remove-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    ${
                      index + 1 == length ? "" : "<div class='separator'></div>"
                    }
           `;
    });
    subTotalPrice.innerHTML = `$${totalSum}`;
    taxPrice.innerHTML = `$${totalSum * 0.05}`;
    totalPrice.innerHTML = `$${totalSum * 0.05 + totalSum + 15}`;
  } else {
    cartContainer.innerHTML = `<p class="p-2 lead h3">No Items To Display</p>`;
    checkoutBtn.disabled = true;
    subTotalPrice.innerHTML = `$ 0`;
    taxPrice.innerHTML = `$0`;
    totalPrice.innerHTML = `$0`;
  }
  updateCartCount();
}
//get product from all products
function getProduct(id) {
  let product = products.filter((el) => {
    return el.id == id;
  })[0];
  return product;
}
//increement the quantity
function incrementQuantity(id) {
  cartItem = user.cart.find((el) => el.productId == id);
  if (+cartItem.quantity < 50) {
    if (checkStock(id, cartItem.quantity)) {
      cartItem.quantity++;
      saveUsers();
      renderCart();
    } else {
      showToast("The Product Is Out Of Stock");
    }
  }
}
//increement the quantity
function decrementQuantity(id) {
  cartItem = user.cart.find((el) => el.productId == id);
  if (+cartItem.quantity > 1) {
    cartItem.quantity--;
    saveUsers();
    renderCart();
  }
}

function deleteCartItem(id) {
  user.cart = user.cart.filter((el) => el.productId != id);
  saveUsers();
  renderCart();
}

function checkStock(id, quantity) {
  let product = getProduct(id);

  if (product.stock > quantity) {
    return true;
  }
  return false;
}

function showToast(message, type = "danger") {
  let toastEl = document.getElementById("toastMessage");

  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  toastEl.querySelector(".toast-body").textContent = message;

  let toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function proceedToCheckout() {
  console.log("proceeding....");
  let orderProcessing = {
    items: user.cart,
  };
  localStorage.setItem("orderProcessing", JSON.stringify(orderProcessing));
  window.location.href = "../../pages/cart/checkout-step-1.html";
}
