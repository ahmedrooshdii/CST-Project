document.addEventListener('DOMContentLoaded', function () {

    var div = document.getElementById("navbartop");
    var user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (user) { 
      
        div.innerHTML = ""; 

       
        let newLink = document.createElement("a");
        newLink.href = "newpage.html";
        newLink.innerHTML = '<i class="fa-solid fa-user"></i> Hello ' + user.name;
        div.appendChild(newLink);

         let separator = document.createElement("span");
        separator.textContent = " | ";
        div.appendChild(separator);

         let logoutLink = document.createElement("a");
        logoutLink.href = "#";
        logoutLink.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            sessionStorage.removeItem("currentUser");
            window.location.href = "../../pages/auth/login.html";
        });
        div.appendChild(logoutLink);
    }
    

});
