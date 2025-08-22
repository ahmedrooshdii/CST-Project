// declare variables
//getting id from href path
const id = new URLSearchParams(location.search).get("id");
let products = JSON.parse(localStorage.getItem("products"));
let recommended = getRandomProducts(products, 4);
let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

let currentProduct;
let seller;
window.addEventListener("load", () => {
  //get product and seller details
  getProductAndsellerDetails();
  //query elements
  const productImg = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("price");
  const productDesc = document.getElementById("product-description-info");
  const productCategory = document.getElementById("product-category");
  const productSatus = document.getElementById("product-status");
  const productStock = document.getElementById("product-stock");
  const sellerName = document.getElementById("seller-name");
  const sellerContact = document.getElementById("seller-contact");
  const sellerStoreName = document.getElementById("seller-storename");
  recommendedContainer = document.getElementById("recommended-container");
  // setting product values
  productImg.src = currentProduct.image;
  productTitle.innerText = currentProduct.name;
  productPrice.innerText = "$ " + currentProduct.price;
  productDesc.innerText = currentProduct.description;
  productCategory.innerText = currentProduct.category;
  productSatus.innerText = currentProduct.status;
  productStock.innerText = currentProduct.stock;
  //setting seller values
  sellerName.innerText = seller.name;
  sellerContact.innerText = seller.email;
  sellerStoreName.innerText = seller.storename;
  //render recommended
  renderRecommended();
});

// filtering products func to get the product

function getProductAndsellerDetails() {
  currentProduct = products.filter((el) => {
    if (+el.id == id) return el;
  })[0];
  seller = users.filter((el) => {
    if (el.email == currentProduct.sellerEmail) return el;
  })[0];
}

// Function to get 4 random products
function getRandomProducts(arr, count = 4) {
  // Shuffle using sort & Math.random()
  let shuffled = [...arr].sort(() => 0.5 - Math.random());
  // Slice first "count" items
  return shuffled.slice(0, count);
}

function renderRecommended() {
  if (recommended.length > 0) {
    recommendedContainer.innerHTML = "";
    recommended.forEach((el) => {
      recommendedContainer.innerHTML += `
      <div class="product-card" data-id="${el.id}" onclick="navigateToProductDetails(${el.id})">
            <div class="product-favorite" onclick="addToFavorite(${el.id})">
              <svg
              class="fav__icon"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path>
              </svg>
            </div>
            <img
              src="${el.image}"
              alt="iPhone 14 Pro"
              class="product-img"
            />
            <h3 class="product-name">${el.name}</h3>
            <p class="product-price">$${el.price}</p>
            <div>
              <button class="btn btn-primary" onclick="addToCart(${el.id})">Buy Now</button>
            </div>
          </div>
      `;
    });
    renderFavorites();
  }
}

//render faavorite
function renderFavorites() {
  const user = getCurrentUser();
  if (!user) return;

  document.querySelectorAll(".product-favorite").forEach((icon) => {
    const card = icon.closest("[data-id]");
    if (!card) return; // لو ملقاش card فيه data-id يخرج
    const productId = card.dataset.id;
    if (user.favorites && user.favorites.includes(+productId)) {
      icon.querySelector(".fav__icon").classList.add("makeFavorite");
    } else {
      icon.querySelector(".fav__icon").classList.remove("makeFavorite");
    }
  });
}
