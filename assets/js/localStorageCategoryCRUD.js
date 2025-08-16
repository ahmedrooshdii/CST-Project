// Created by: Ahmed Roshdi

window.addEventListener("load", function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }

  // if (user.role !== "admin") {
  //   window.location.href = "../../Home.html";
  // }

  // Query Elements -----------------------
  const categoryTbody = document.getElementById("categoryTbody");
  const imageInput = document.getElementById("categoryImage");
  const preview = document.getElementById("preview");
  const imageInputUpdate = document.getElementById("categoryImageUpdate");
  const previewUpdate = document.getElementById("previewUpdate");
  const addModal = new bootstrap.Modal(
    document.getElementById("addCategoryModal")
  );
  const editModal = new bootstrap.Modal(
    document.getElementById("editCategoryModal")
  );

  // Declare categories --------------------
  let categories = [];
  let currentEditId = null;
  // Declare image url variable --------------------
  let imageUrl = "";

  // CRUD METHODS --------------------------
  function loadCategories() {
    categories = JSON.parse(localStorage.getItem("categories")) || [];
  }

  function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  function renderCategories(data = categories) {
    categoryTbody.innerHTML = "";
    data.forEach((cat) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cat.id}</td>
        <td>${cat.name}</td>
        <td>${cat.description}</td>
        <td>
          <span class="badge ${
            cat.status === "active" ? "bg-success" : "bg-secondary"
          }">
            ${cat.status.charAt(0).toUpperCase() + cat.status.slice(1)}
          </span>
        </td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn" data-id="${cat.id}">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${cat.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      categoryTbody.appendChild(row);
    });
  }

  function addCategory(name, description, status) {
    const newCategory = {
      id: Date.now(),
      name,
      description,
      status,
      imageUrl,
    };
    categories.push(newCategory);
    saveCategories();
    renderCategories();
    showToast("Added successfully!", "success");
  }

  function updateCategory(id, name, description, status) {
    const index = categories.findIndex((c) => c.id === id);
    if (index !== -1) {
      categories[index] = { id, name, description, status, imageUrl };
      saveCategories();
      renderCategories();
      showToast("Updated successfully!", "success");
    }
  }

  function deleteCategory(id) {
    categories = categories.filter((cat) => cat.id !== id);
    saveCategories();
    renderCategories();
    showToast("Deleted successfully!", "success");
  }

  function searchCategories(searchText) {
    const filtered = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchText) ||
        cat.description.toLowerCase().includes(searchText)
    );
    renderCategories(filtered);
  }

  function showToast(message, type = "danger") {
    let toastEl = document.getElementById("toastMessage");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;

    toastEl.querySelector(".toast-body").textContent = message;

    let toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  // ==== EVENT HANDLERS ====
  document.querySelector("#saveCat").addEventListener("click", function () {
    const name = document.getElementById("categoryName").value.trim();
    const desc = document.getElementById("categoryDescription").value.trim();
    const status = document.getElementById("categoryStatus").value;
    // const imageUrl = document.getElementById("categoryImage").value;

    console.log(imageUrl);

    if (name && desc && imageUrl) {
      addCategory(name, desc, status);
      console.log("addedddddddd");
      document.getElementById("categoryName").value = "";
      document.getElementById("categoryDescription").value = "";
      document.getElementById("categoryStatus").value = "active";
      document.getElementById("categoryImage").value = "";

      preview.classList.add("d-none");
      imageUrl = "";

      addModal.hide();
    } else {
      showToast("Please fill data first!", "warning");
    }
  });

  document.querySelector("#updateCat").addEventListener("click", () => {
    const nameInput = document
      .querySelector("#editCategoryModal input.form-control")
      .value.trim();
    const descInput = document
      .querySelector("#editCategoryModal textarea.form-control")
      .value.trim();

    const imgInput = document
      .querySelector("#editCategoryModal #categoryImageUpdate")
      .value.trim();
    const statusSelect = document.querySelector(
      "#editCategoryModal select.form-select"
    ).value;

    updateCategory(currentEditId, nameInput, descInput, statusSelect, imgInput);
    editModal.hide();
  });

  categoryTbody.addEventListener("click", function (event) {
    const target = event.target.closest("button");
    if (!target) return;

    const id = parseInt(target.dataset.id);

    if (target.classList.contains("delete-btn")) {
      if (confirm("Are you sure you want to delete this category?")) {
        deleteCategory(id);
      }
    }

    if (target.classList.contains("edit-btn")) {
      const category = categories.find((cat) => cat.id === id);
      if (!category) return;

      currentEditId = id;
      document.querySelector("#editCategoryModal input.form-control").value =
        category.name;
      document.querySelector("#editCategoryModal textarea.form-control").value =
        category.description;
      document.querySelector("#editCategoryModal select.form-select").value =
        category.status;
      imageUrl = category.imageUrl;
      if (imageUrl) {
        previewUpdate.src = imageUrl;
        previewUpdate.classList.remove("d-none");
      }
      editModal.show();
    }
  });

  document
    .getElementById("searchCategory")
    .addEventListener("keyup", function () {
      searchCategories(this.value.toLowerCase());
    });

  // Image Converting on adding File
  //add form
  imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (ev) {
        imageUrl = ev.target.result;
        preview.src = imageUrl;
        preview.classList.remove("d-none");
      };
      reader.readAsDataURL(file);
    }
  });
  //update form
  imageInputUpdate.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (ev) {
        imageUrl = ev.target.result;
        previewUpdate.src = imageUrl;
        previewUpdate.classList.remove("d-none");
      };
      reader.readAsDataURL(file);
    }
  });

  // ==== INIT ====
  loadCategories();
  renderCategories();
});
