//declare vars
const currentUserLocal = JSON.parse(sessionStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users"));
let user = getCurrentUser();
let orderProcessing = JSON.parse(localStorage.getItem("orderProcessing"));
let nextBtn;
//check validity
if (!orderProcessing) {
  location.href = "../../pages/cart/shopping-cart.html";
}
// document load
window.addEventListener("load", () => {
  //query elements
  nextBtn = document.getElementById("nextBtn");
  const addressContainer = document.getElementById("addressContainer");
  const addModal = new bootstrap.Modal(
    document.getElementById("addAddressModal")
  );

  //-------------event handler-------------------
  document.querySelector("#saveAddress").addEventListener("click", function () {
    const title = document.getElementById("addressTitle").value.trim();
    const specification = document
      .getElementById("addressSpecification")
      .value.trim();
    const desc = document.getElementById("addressDescription").value.trim();
    const phone = document.getElementById("addressPhoneNumber").value;

    if (title && specification && desc && phone) {
      addAddress(title, specification, desc, phone);
      document.getElementById("addressTitle").value = "";
      document.getElementById("addressSpecification").value = "";
      document.getElementById("addressDescription").value = "";
      document.getElementById("addressPhoneNumber").value = "";

      addModal.hide();
    } else {
      showToast("Please fill data first!", "warning");
    }
  });

  renderAddress();
});

// get user from local storage
function getCurrentUser() {
  return users.find((u) => u.email === currentUserLocal?.email);
}
//save user
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}
function saveOrder() {
  localStorage.setItem("orderProcessing", JSON.stringify(orderProcessing));
}

//------------------show toast----------------------
function showToast(message, type = "danger") {
  let toastEl = document.getElementById("toastMessage");

  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  toastEl.querySelector(".toast-body").textContent = message;

  let toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function checkradio(index) {
  let selected = document.querySelector(".address-card .radio-button.selected");
  if (selected) {
    selected.classList.remove("selected");
  }

  document
    .querySelector(`#address${index} .radio-button`)
    .classList.add("selected");

  // save address
  orderProcessing.address = user.addresses[index];
}

//render addresses
function renderAddress() {
  addressContainer.innerHTML = "";
  let length = user.addresses.length;
  if (length > 0) {
    orderProcessing.address = user.addresses[0];
    user.addresses.forEach((element, index) => {
      addressContainer.innerHTML += `
            <div class="address-card" id="address${index}" onclick="checkradio(${index})">
              <div class="address-content">
                <div class="address-header">
                  <div class="radio-button ${index == 0 ? "selected" : ""}">
                    <div class="radio-inner"></div>
                  </div>
                  <div class="address-info">
                    <div class="address-name">${element.title}</div>
                    <div class="address-badge home">${
                      element.specification
                    }</div>
                  </div>
                </div>
                <div class="address-details">
                  <p class="address-text">
                    ${element.description}
                  </p>
                  <p class="phone-text">${element.phone}</p>
                </div>
              </div>
              <div class="address-actions">
                
                <button class="action-btn" onclick="event.stopPropagation();deleteAddress(${index})" aria-label="Delete address">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
           `;
    });
  } else {
    addressContainer.innerHTML = `<p class="p-2 lead h3">No Address To Display</p>`;
    console.log(nextBtn);

    nextBtn.disabled = true;
  }
}

// -----------------add address---------------------------
function addAddress(title, specification, description, phone) {
  const newAddress = {
    id: Date.now(),
    title,
    specification,
    description,
    phone,
  };

  user.addresses = user.addresses ?? [];

  user.addresses.push(newAddress);
  saveUsers();
  renderAddress();
  showToast("Added successfully!", "success");
}
//delete address
function deleteAddress(index) {
  user.addresses = user.addresses.filter(
    (el) => el.id != user.addresses[index].id
  );
  saveUsers();
  renderAddress();
}
function navigateToSteptwo() {
  saveOrder();
  window.location.href = "../../pages/cart/checkout-step-2.html";
}

function goBack() {
  window.location.href = "../../pages/cart/shopping-cart.html";
}
