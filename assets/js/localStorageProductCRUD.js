// Created by: Ahmed Roshdi

window.addEventListener("load", function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }

  if (user.role !== "admin" && user.role !== "seller") {
    window.location.href = "../../Home.html";
  }

  let products = JSON.parse(localStorage.getItem("products")) || [];
  const userProducts = products.filter(
    (product) => product.sellerEmail === user.email
  );

  if (user.role === "admin") {
    products.forEach((product) => {
      renderProduct(product);
    });
  }

  if (user.role === "seller") {
    userProducts.forEach((product) => {
      renderProduct(product);
    });
  }

  loadCategoriesIntoSelect();
});

function renderProduct(product) {
  // Get table tbody
  const tbody = document.querySelector("#productsTable tbody");

  // Create new row
  const newRow = document.createElement("tr");

  // Determine status badge class
  let statusClass = "bg-success";
  if (product.status === "Out of Stock" || productStock == 0) {
    statusClass = "bg-danger";
  } else if (product.status === "Inactive") {
    statusClass = "bg-warning";
  }

  // Create row HTML
  newRow.setAttribute("data-id", product.id);
  newRow.innerHTML = `
        <td>${product.name}</td>
        <td>${parseFloat(product.price).toFixed(2)}</td>
        <td>${product.stock}</td>
        <td><span class="badge ${statusClass}">${product.status}</span></td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="editProduct(this)">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(this)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
    `;

  // Add row to table
  tbody.appendChild(newRow);
}

function loadCategoriesIntoSelect() {
  const categorySelect = document.getElementById("productCategory");

  categorySelect.innerHTML = `<option value="">Select Category</option>`;

  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.name;
    option.textContent = cat.name;
    categorySelect.appendChild(option);
  });
}

let imageUrl;

function initProductPage() {
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const imageInput = document.getElementById("productImage");
    const preview = document.getElementById("preview");
    const imageInputU = document.getElementById("productImageUpdate");
    const previewU = document.getElementById("previewUpdate");

    // البحث
    if (searchInput) {
      searchInput.addEventListener("keyup", searchProducts);
    }

    // عرض الصور
    imageInput?.addEventListener("change", function () {
      handleImagePreview(this, preview);
    });

    imageInputU?.addEventListener("change", function () {
      handleImagePreview(this, previewU);
    });
  });
}

function searchProducts() {
  const searchTerm = this.value.toLowerCase();
  const table = document.getElementById("productsTable");
  const tbody = table.querySelector("tbody");

  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let found = false;

    for (let i = 0; i < cells.length - 1; i++) {
      if (cells[i].textContent.toLowerCase().includes(searchTerm)) {
        found = true;
        break;
      }
    }

    row.style.display = found || searchTerm === "" ? "" : "none";
  });
}

function handleImagePreview(input, previewElement) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (ev) {
      imageUrl = ev.target.result;
      previewElement.src = imageUrl;
      previewElement.classList.remove("d-none");
    };
    reader.readAsDataURL(file);
  }
}

function addProduct() {
  const form = document.getElementById("addProductForm");
  const formData = new FormData(form);

  const productName = formData.get("productName").trim();
  const productPrice = formData.get("productPrice");
  const productStock = formData.get("productStock");
  const productStatus = formData.get("productStatus");
  const productDescription = formData.get("productDescription").trim();
  const productCategory = formData.get("productCategory");

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const sellerEmail = currentUser?.email;

  if (!productName || !productPrice || !productStock || !imageUrl) {
    alert(
      "Please fill in all required fields (Product Name, Price, Stock Quantity , Image)"
    );
    return;
  }

  let products = JSON.parse(localStorage.getItem("products")) || [];

  const newProduct = {
    id: Date.now(),
    name: productName,
    price: productPrice,
    stock: productStock,
    status: productStatus,
    description: productDescription,
    category: productCategory,
    sellerEmail: sellerEmail,
    image: imageUrl,
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  appendProductRow(newProduct);

  form.reset();
  bootstrap.Modal.getInstance(
    document.getElementById("addProductModal")
  ).hide();
  showToast("Product added successfully!", "success");
}

function appendProductRow(product) {
  const tbody = document.querySelector("#productsTable tbody");
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", product.id);

  let statusClass = "bg-success";
  if (product.status === "Out of Stock" || product.stock == 0) {
    statusClass = "bg-danger";
  } else if (product.status === "Inactive") {
    statusClass = "bg-warning";
  }

  newRow.innerHTML = `
        <td>${product.name}</td>
        <td>${parseFloat(product.price).toFixed(2)}</td>
        <td>${product.stock}</td>
        <td><span class="badge ${statusClass}">${product.status}</span></td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="editProduct(this)">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(this)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
    `;
  tbody.appendChild(newRow);
}

function deleteProduct(button) {
  if (confirm("Are you sure you want to delete this product?")) {
    const row = button.closest("tr");
    const productId = parseInt(row.getAttribute("data-id"), 10);

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter((product) => product.id !== productId);
    localStorage.setItem("products", JSON.stringify(products));

    row.remove();
    showToast("Product deleted successfully!", "success");
  }
}

function editProduct(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");
  const productId = row.getAttribute("data-id");

  // Store row index for saving later
  document.getElementById("editRowIndex").value = row.rowIndex;

  // Load products from localStorage ----------------------
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Find the selected product ----------------------------
  const product = products.find((p) => p.id === +productId);

  if (!product) return;

  // Fill modal fields ------------------------------------
  document.getElementById("editProductId").value = product.id;
  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductPrice").value = product.price;
  document.getElementById("editProductStock").value = product.stock;
  document.getElementById("editProductStatus").value = product.status;
  document.getElementById("editProductDescription").value = product.description;

  new bootstrap.Modal(document.getElementById("editProductModal")).show();
}

function saveProductChanges() {
  const index = document.getElementById("editRowIndex").value;
  const table = document.getElementById("productsTable");
  const row = table.rows[index];

  // ROSHDI ADDs
  const productId = document.getElementById("editProductId").value;

  const name = document.getElementById("editProductName").value.trim();
  const price = document.getElementById("editProductPrice").value;
  const stock = document.getElementById("editProductStock").value;
  const status = document.getElementById("editProductStatus").value;
  const description = document
    .getElementById("editProductDescription")
    .value.trim();

  //#region Updating LocalStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];

  products = products.map((product) => {
    if (product.id == productId) {
      product.name = document.getElementById("editProductName").value.trim();
      product.price = document.getElementById("editProductPrice").value;
      product.stock = document.getElementById("editProductStock").value;
      product.status = document.getElementById("editProductStatus").value;
      product.description = document
        .getElementById("editProductDescription")
        .value.trim();
      product.image = imageUrl;
    }
    return product;
  });

  localStorage.setItem("products", JSON.stringify(products));
  //#endregion

  // Determine badge class
  let statusClass = "bg-success";
  if (status === "Out of Stock" || stock == 0) {
    statusClass = "bg-danger";
  } else if (status === "Inactive") {
    statusClass = "bg-warning";
  }

  // Update table cells
  row.cells[0].innerText = name;
  row.cells[1].innerText = price;
  row.cells[2].innerText = stock;
  row.cells[3].innerHTML = `<span class="badge ${statusClass}">${status}</span>`;

  // Close modal
  const editModal = bootstrap.Modal.getInstance(
    document.getElementById("editProductModal")
  );
  editModal.hide();

  showToast("Product updated successfully!", "success");
}

function showToast(message, type = "danger") {
  let toastEl = document.getElementById("toastMessage");

  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  toastEl.querySelector(".toast-body").textContent = message;

  let toast = new bootstrap.Toast(toastEl);
  toast.show();
}
initProductPage();
