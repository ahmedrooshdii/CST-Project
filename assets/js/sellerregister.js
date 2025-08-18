
let passInput = document.getElementById("pass");
let confirmInput = document.getElementById("cpass");
let errorSpan = document.getElementById("errorspan");
let passError = document.getElementById("passError");


confirmInput.addEventListener("input", checkconfirmpass)


passInput.addEventListener("input", checkpass);

function checkconfirmpass() {
    if (confirmInput.value && confirmInput.value !== passInput.value) {
        confirmInput.classList.add("is-invalid");
        confirmInput.classList.remove("is-valid");
    } else if (confirmInput.value && confirmInput.value === passInput.value) {
        confirmInput.classList.remove("is-invalid");
        confirmInput.classList.add("is-valid");
    } else {
        confirmInput.classList.add("is-invalid");
        confirmInput.classList.remove("is-valid");
          }
};

passInput.addEventListener("input", checkpass);

function checkpass() {

    if (passInput.value.length < 6) {
        passInput.classList.add("is-invalid");
        passInput.classList.remove("is-valid");
        passError.innerText = "Password must be at least 6 characters";
    } else {
        passInput.classList.remove("is-invalid");
        passInput.classList.add("is-valid");
        passError.textContent = "";
    }

    if (confirmInput.value) {
        if (confirmInput.value !== passInput.value) {
            confirmInput.classList.add("is-invalid");
            confirmInput.classList.remove("is-valid");
        } else {
            confirmInput.classList.remove("is-invalid");
            confirmInput.classList.add("is-valid");
        }
    }
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

const emailInput = document.getElementById("email");
const emailFeedback = document.querySelector("#email + .invalid-feedback") || document.getElementById("span");

function validateEmailField() {
  const val = emailInput.value.trim();

  if (!val) {
    emailInput.classList.remove("is-valid", "is-invalid");
    return false;
  }

  if (isValidEmail(val)) {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    if (emailFeedback) emailFeedback.textContent = "";
    return true;
  } else {
    emailInput.classList.remove("is-valid");
    emailInput.classList.add("is-invalid");
    if (emailFeedback) emailFeedback.textContent = "Please enter a valid email address.";
    return false;
  }
}

 emailInput.addEventListener("blur", validateEmailField);


function register(e) {
  e.preventDefault();
     var name = document.getElementById("name").value;
     var storename = document.getElementById("sname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

   if (!name || !email || !password ||
        confirmInput.classList.contains("is-invalid") ||
        passInput.classList.contains("is-invalid") ||
        emailInput.classList.contains("is-invalid")) {

       showToast("Please complete data", "warning");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === email)) {
        showToast("Email already exists", "danger");
        return;
  }

   role = "seller";
  users.push({ storename, name, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));
    showToast("Registered successfully!", "success");
    
    setTimeout(function () {
    window.location.href = "login.html";
}, 2000);
}

    function showToast(message, type = "danger") {
    let toastEl = document.getElementById("toastMessage");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    
    toastEl.querySelector(".toast-body").textContent = message;

    let toast = new bootstrap.Toast(toastEl);
    toast.show();
}

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

  window.addEventListener('load',function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
if (user) {
  window.location.href = "../../Home.html";
}
});

//  function showAlert(message, type = "danger") {
//       const alertContainer = document.getElementById("alertContainer");
//       alertContainer.innerHTML = `
//         <div class="alert alert-${type} alert-dismissible fade show" role="alert">
//           ${message}
//           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//         </div>
//       `;
//     }
//        <!-- مكان ظهور الـ alert -->
// <div id="alertContainer"></div>