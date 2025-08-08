const carousel = document.querySelector(".categories__carousel");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: 150, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -150, behavior: "smooth" });
});
