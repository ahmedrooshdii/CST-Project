function addProductToLocalStorage() {
  const form = document.getElementById("addProductForm");
  const formData = new FormData(form);

  const productName = formData.get("productName").trim();
  const productPrice = formData.get("productPrice");
  const productStock = formData.get("productStock");
  const productStatus = formData.get("productStatus");
  const productDescription = formData.get("productDescription").trim();
  const productCategory = formData.get("productCategory");

  // Simulated seller ID (in real scenario from sessione)
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const sellerEmail = currentUser?.email; // "ahmedrooshdii@gmail.com"

  //   if (!productName || !productPrice || isNaN(productStock)) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  // Get products from localStorage or empty array
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const newProduct = {
    id: Date.now(), // unique ID
    name: productName,
    price: productPrice,
    stock: productStock,
    status: productStatus,
    description: productDescription,
    category: productCategory,
    sellerEmail: sellerEmail,
    image: "assets/images/Iphone 14 pro 1 (4).png", // placeholder
  };

  // Save to localStorage
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  // Reset and close modal
  form.reset();
  bootstrap.Modal.getInstance(
    document.getElementById("addProductModal")
  ).hide();

  //   alert("Product added successfully!");
}

function renderProductCard(product) {
  return `
    <div class="product-card">
        <button class="btn favorite">
            <svg class="fav__icon" width="32" height="32" viewBox="0 0 32 32">
                <path class="heart-icon-strok" d="M5.93415 18.5443L15.3152 27.3569C15.6397 27.6616 15.8019 27.814 15.9999 27.814C16.1979 27.814 16.3602 27.6616 16.6846 27.3569L26.0657 18.5443C28.6739 16.0942 28.9907 12.0622 26.797 9.2348L26.3845 8.70316C23.7603 5.32081 18.4928 5.88806 16.6488 9.75157C16.3883 10.2973 15.6115 10.2973 15.351 9.75157C13.5071 5.88806 8.23955 5.32081 5.61531 8.70316L5.20284 9.2348C3.00918 12.0622 3.32592 16.0942 5.93415 18.5443Z"
                stroke="#919191" stroke-opacity="0.77" stroke-width="1.4"/>
            </svg>
        </button>
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-info">
            <div class="product-title">${product.name}</div>
            <div class="product-price">$${product.price}</div>
            <button class="btn btn--buy">Buy Now</button>
        </div>
    </div>
    `;
}

// window.addEventListener("load", function () {
//   const addProductBtn = this.document.getElementById("add-product-btn");
//   addProductBtn.addEventListener("click", addProductToLocalStorage);
// });
