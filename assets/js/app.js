/* -------- Categories carousel --------*/
const carousel = document.querySelector(".categories__carousel");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
  //   carousel.scrollBy({ left: 150, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  //   carousel.scrollBy({ left: -150, behavior: "smooth" });
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

favIcons.forEach((icon) => {
  icon.addEventListener("click", function (e) {
    icon.querySelector(".fav__icon").classList.toggle("makeFavorite");
  });
});
