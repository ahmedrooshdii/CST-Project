// Created by: Ahmed Roshdi

window.addEventListener("load", function () {
  /* -------- Categories carousel --------*/
  const carousel = document.querySelector(".categories__carousel");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: 150, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -150, behavior: "smooth" });
  });

  /* -------- Products tabs and content --------*/
  const tabs = document.querySelectorAll(".tab__btn");
  const allContent = document.querySelectorAll(".content");
  const favIcons = document.querySelectorAll(".favorite");

  function activeTab(e, index) {
    // Clear active class from active tab
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Adding it to the triggered one
    // I don't know why (this) not working, so I replaced it by (e.currentTarget)
    e.currentTarget.classList.add("active");
    const line = document.querySelector(".line");
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    // Show the products related
    allContent.forEach((cont) => cont.classList.remove("active"));
    allContent[index].classList.add("active");
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", (e) => activeTab(e, i));
    tab.addEventListener("focus", (e) => activeTab(e, i));
  });

  // Favorites -----------------------------
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  let users = JSON.parse(localStorage.getItem("users")) || [];

  function getCurrentUser() {
    return users.find((u) => u.email === currentUser?.email);
  }

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));

    let user = users.find((u) => u.email === currentUser.email);
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  }

  function renderFavorites() {
    const user = getCurrentUser();
    if (!user) return;

    document.querySelectorAll(".favorite").forEach((icon) => {
      const card = icon.closest("[data-id]");
      if (!card) return; // لو ملقاش card فيه data-id يخرج
      const productId = card.dataset.id;
      if (user.favorites && user.favorites.includes(productId)) {
        icon.querySelector(".fav__icon").classList.add("makeFavorite");
      } else {
        icon.querySelector(".fav__icon").classList.remove("makeFavorite");
      }
    });
  }

  document.querySelectorAll(".favorite").forEach((icon) => {
    icon.addEventListener("click", function () {
      const user = getCurrentUser();
      if (!user) {
        window.location.href = "../../pages/auth/login.html";
        return;
      }

      const productId = icon.closest("[data-id]").dataset.id;
      user.favorites = user.favorites || [];

      if (user.favorites.includes(productId)) {
        user.favorites = user.favorites.filter((id) => id !== productId);
      } else {
        user.favorites.push(productId);
      }

      saveUsers();
      renderFavorites();
    });
  });

  renderFavorites();

  // favIcons.forEach((icon) => {
  //   icon.addEventListener("click", function (e) {
  //     icon.querySelector(".fav__icon").classList.toggle("makeFavorite");
  //   });
  // });
});
