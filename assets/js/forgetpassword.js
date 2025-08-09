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

const checkEmailBtn = document.getElementById("checkEmailBtn");
const resetStep = document.getElementById("resetStep");
const emailStep = document.getElementById("emailStep");
const newPassInput = document.getElementById("pass");
const confirmPassInput = document.getElementById("cpass");
const resetPassBtn = document.getElementById("resetPassBtn");
let currentUserEmail = "";

checkEmailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let email = emailInput.value.trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.some(u => u.email === email);

    if (!email || emailInput.classList.contains("is-invalid")) {
        showToast("Please enter your email", "warning");
        return;
    }

    if (!userExists) {
        showToast("Email not found!", "danger");
        return;
    }

    currentUserEmail = email;
    emailStep.style.display = "none";
    resetStep.style.display = "block";
    showToast("Email found! Please enter your new password.", "success");
});

function resetPass(e) {
    e.preventDefault();

    let newPass = newPassInput.value.trim();
    let confirmPass = confirmPassInput.value.trim();

    if (!newPass || !confirmPass ||
       confirmPassInput.classList.contains("is-invalid") ||
        newPassInput.classList.contains("is-invalid")) {
        showToast("Please fill in all password fields", "warning");
        return;
    }

    if (newPass.length < 6) {
        showToast("Password must be at least 6 characters", "warning");
        return;
    }

    if (newPass !== confirmPass) {
        showToast("Passwords do not match", "danger");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(user => {
        if (user.email === currentUserEmail) {
            return { ...user, password: newPass };
        }
        return user;
    });

    localStorage.setItem("users", JSON.stringify(users));

    showToast("Password reset successfully!", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}

newPassInput.addEventListener("input", checkpass);

function checkpass() {
    if (newPassInput.value.length < 6) {
        newPassInput.classList.add("is-invalid");
        newPassInput.classList.remove("is-valid");
        passError.innerText = "Password must be at least 6 characters";
    } else {
        newPassInput.classList.remove("is-invalid");
        newPassInput.classList.add("is-valid");
        passError.textContent = "";
    }

    if (confirmPassInput.value) {
        if (confirmPassInput.value !== newPassInput.value) {
            confirmPassInput.classList.add("is-invalid");
            confirmPassInput.classList.remove("is-valid");
        } else {
            confirmPassInput.classList.remove("is-invalid");
            confirmPassInput.classList.add("is-valid");
        }
    }
}

confirmPassInput.addEventListener("input", checkconfirmpass);

function checkconfirmpass() {
    if (confirmPassInput.value && confirmPassInput.value !== newPassInput.value) {
        confirmPassInput.classList.add("is-invalid");
        confirmPassInput.classList.remove("is-valid");
    } else if (confirmPassInput.value && confirmPassInput.value === newPassInput.value) {
        confirmPassInput.classList.remove("is-invalid");
        confirmPassInput.classList.add("is-valid");
    } else {
        confirmPassInput.classList.remove("is-invalid", "is-valid");
    }
}
    function showToast(message, type = "danger") {
    let toastEl = document.getElementById("toastMessage");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    
    toastEl.querySelector(".toast-body").textContent = message;

    let toast = new bootstrap.Toast(toastEl);
    toast.show();
}

window.addEventListener('load',function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
if (user) {
  window.location.href = "../../home.html";
}
});