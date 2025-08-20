window.addEventListener("load",function () {

    //declare vars
const currentUserLocal = JSON.parse(sessionStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users"));
let user = getCurrentUser();
const products = JSON.parse(localStorage.getItem("products"));
let favoriteContainer;

if (!currentUserLocal) {
  location.href = "../../pages/auth/login.html";
}
    
})