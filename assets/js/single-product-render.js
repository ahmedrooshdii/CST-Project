// declare variables
//getting id from href path
const id = new URLSearchParams(location.search).get("id");
let products = JSON.parse(localStorage.getItem("products"));
let users = JSON.parse(localStorage.getItem("users"));
let currentProduct;
let seller;
window.addEventListener("load", () => {
  //get product and seller details
  getProductAndsellerDetails();
  console.log(currentProduct);
  console.log(seller);
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
