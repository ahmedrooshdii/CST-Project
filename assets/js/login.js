//const inputs = document.querySelectorAll('.form-control');

//const span = document.querySelectorAll('#span');

// inputs.forEach(input => {
//   input.addEventListener('focus', () => {
//     input.parentElement.classList.add('focused');
//   });
//   input.addEventListener('blur', () => {
//     input.parentElement.classList.remove('focused');

//   });
// });


 // Bootstrap Validation

  (() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  })();


 
function login(e) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  if (!email || !password) {
       showToast("Please complete data", "warning");
        return;
    }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showToast("Invalid username or password", "danger");
    e.preventDefault();
    return;
} else {
    showToast("Login successful!", "success");

    e.preventDefault();

    setTimeout(function () {
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else if (user.role === "seller") {
            window.location.href = "seller.html";
        } else {
            window.location.href = "../../Home.html";
        }
    }, 1000);
}
}

window.addEventListener('load',function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
if (user) {
  window.location.href = "../../Home.html";
}
});

    function showToast(message, type = "danger") {
    let toastEl = document.getElementById("toastMessage");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    
    toastEl.querySelector(".toast-body").textContent = message;

    let toast = new bootstrap.Toast(toastEl);
    toast.show();
}


// const user = JSON.parse(sessionStorage.getItem("currentUser"));
// if (!user || user.role !== "admin") {
//   alert("Access denied");
//   window.location.href = "login.html";
// }