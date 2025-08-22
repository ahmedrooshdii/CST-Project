document.addEventListener("DOMContentLoaded", function () {
  var div = document.getElementById("navbartop");
  var user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (user) {
    div.innerHTML = "";

    let newLink = document.createElement("a");
    newLink.href = "../../pages/dashboard/profile.html";
    newLink.innerHTML = `<i class="fa-solid fa-user"></i> Hello ${user.name}`;
    div.appendChild(newLink);

    let separator = document.createElement("span");
    separator.textContent = " | ";
    div.appendChild(separator);

    let logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.innerHTML =
      '<i class="fa-solid fa-right-from-bracket"></i> Logout';
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      sessionStorage.removeItem("currentUser");
      window.location.href = "../../pages/auth/login.html";
    });
    div.appendChild(logoutLink);
  }

  //  <li><a id ="dash" href="dashboard.html" class="nav-link">📊 Dashboard</a></li>
  //     <li><a href="profile.html" class="nav-link active">👤 profile</a></li>
  //     <li><a id="usersPage" href="users.html" class="nav-link ">👤 Users</a></li>
  //     <li><a href="orders.html" class="nav-link">🛒 Orders</a></li>
  //     <li><a id="sellerord" href="seller_orders.html" class="nav-link">🛒 seller's Orders</a></li>
  //     <li><a id="product" href="products.html" class="nav-link">🛒 Products</a></li>
  //     <li><a id="cat" href="categories.html" class="nav-link">👥 Categories</a></li>
  //     <li><a id ="contact" href="contactus.html" class="nav-link">👥 Contact us</a></li>

  // role
  var userspage = document.getElementById("usersPage");
  var contactspage = document.getElementById("contact");
  var productspage = document.getElementById("product");
  var catspage = document.getElementById("cat");
  var dashpage = document.getElementById("dash");
  var sellerorder = document.getElementById("sellerord");

  if (user?.role !== "admin") {
    if (userspage) userspage.style.display = "none";
    if (contactspage) contactspage.style.display = "none";
  }

  if (user?.role == "user") {
    if (productspage) productspage.style.display = "none";
    if (catspage) catspage.style.display = "none";
    if (dashpage) dashpage.style.display = "none";
  }

  if (user?.role == "user") {
    if (sellerorder) sellerorder.style.display = "none";
  }
});

//update cart count
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
    let count = user?.favorites?.reduce((acc, item) => acc + 1, 0) || 0;
    wishCount.textContent = count;
    wishCount.style.display = "inline-block";
  } else {
    wishCount.style.display = "none";
  }
}
