//declare vars
const form = document.getElementById("payment-form");
const currentUserLocal = JSON.parse(sessionStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users"));
let user = getCurrentUser();
let orderProcessing = JSON.parse(localStorage.getItem("orderProcessing"));
const products = JSON.parse(localStorage.getItem("products"));
let totalSum;
let cartContainer;
let subTotalPrice;
let taxPrice;
let totalPrice;
let orders = JSON.parse(localStorage.getItem("orders")) || [];

itemsContainer = document.getElementById("itemsContainer");
subTotalPrice = document.getElementById("subTotalPrice");
taxPrice = document.getElementById("taxPrice");
totalPrice = document.getElementById("totalPrice");
let address = document.getElementById("address");
let shipmentMethod = document.getElementById("shipmentMethod");
let shipmentMethodPrice = document.getElementById("shipmentMethodPrice");

//check validity
if (!orderProcessing) {
  location.href = "../../pages/cart/shopping-cart.html";
}

//validator object
const validators = {
  "cardholder-name": (value) =>
    value.trim() !== "" || "Cardholder name is required",

  "card-number": (value) => {
    const clean = value.replace(/\s+/g, "");
    return /^\d{16}$/.test(clean) || "Card number must be 16 digits";
  },

  "exp-date": (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return "Format must be MM/YY";
    const [mm, yy] = value.split("/").map(Number);
    if (mm < 1 || mm > 12) return "Invalid month";
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (yy < currentYear || (yy === currentYear && mm < currentMonth))
      return "Card expired";
    return true;
  },

  cvv: (value) => /^\d{3}$/.test(value) || "CVV must be 3 digits",
};
//show error func for each input
function showError(input, message) {
  const errorMsg = input.parentElement.querySelector(".error-msg");
  if (message === true) {
    errorMsg.textContent = "";
    input.classList.remove("invalid");
  } else {
    errorMsg.textContent = message;
    input.classList.add("invalid");
  }
}

//add event listener for each input
Object.keys(validators).forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("blur", () => {
    const result = validators[id](input.value);
    showError(input, result);
  });
});

//add event listener for form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  Object.keys(validators).forEach((id) => {
    const input = document.getElementById(id);
    const result = validators[id](input.value);
    showError(input, result);
    if (result !== true) valid = false;
  });
  if (valid) {
    showToast("Order Has Been Added Successfully", "success");
    orderProcessing.id = Date.now();
    orderProcessing.time = new Date(Date.now()).toLocaleString();
    orderProcessing.totalPrice = totalPrice.innerHTML;
    orderProcessing.userId = currentUserLocal.id;
    orders.push(orderProcessing);
    user.cart = [];
    updateStock();
    saveOrder();
    saveUsers();
    form.reset();
    location.href = "../../pages/dashboard/orders.html";
  }
});

//functions
// get user from local storage
function getCurrentUser() {
  return users.find((u) => u.email === currentUserLocal?.email);
}
//save user
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}
//save order
function saveOrder() {
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("orderProcessing");
}
//------------------show toast----------------------
function showToast(message, type = "danger") {
  let toastEl = document.getElementById("toastMessage");

  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  toastEl.querySelector(".toast-body").textContent = message;

  let toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function navigateToSteptwo() {
  saveOrder();
  window.location.href = "../../pages/cart/checkout-step-2.html";
}

function goBack() {
  window.location.href = "../../pages/cart/checkout-step-2.html";
}

//get product from all products
function getProduct(id) {
  let product = products.find((el) => {
    return el.id == id;
  })[0];
  return product;
}

//render items
function renderItems() {
  itemsContainer.innerHTML = "";
  totalSum = 0;
  orderProcessing.items.forEach((element, index) => {
    let currentProduct = getProduct(element.productId);
    let price = currentProduct.price * element.quantity;
    totalSum += price;
    itemsContainer.innerHTML += `
           <div class="product-item">
           <span class="px-2">${element.quantity}</span>
              <div
                class="product-image"
                style="
                  background-image: url(${currentProduct.image});
                "
              ></div>
              <div class="product-details">
                <div class="product-name">${currentProduct.name}</div>
                <div class="product-price">$${currentProduct.price}</div>
              </div>
            </div>
           `;
  });
  subTotalPrice.innerHTML = `$${totalSum}`;
  taxPrice.innerHTML = `$${totalSum * 0.05}`;
  address.innerHTML = orderProcessing.address.description;
  shipmentMethod.innerHTML = orderProcessing.shipment;
  shipmentMethodPrice.innerHTML = orderProcessing.shipment == "free" ? 0 : 9;
  totalPrice.innerHTML = `$${
    totalSum * 0.05 + totalSum + 15 + +shipmentMethodPrice.innerText
  }`;
}

renderItems();
