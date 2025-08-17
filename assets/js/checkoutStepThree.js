const form = document.getElementById("payment-form");

const validators = {
  "cardholder-name": (value) =>
    value.trim() !== "" || "Cardholder name is required",

  "card-number": (value) => {
    const clean = value.replace(/\s+/g, "");
    return /^\d{16}$/.test(clean) || "Card number must be 16 digits";
  },

  "exp-date": (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return "Format must be MM/YY";
    const [mm, yy] = value.split("/").map(Number);
    if (mm < 1 || mm > 12) return "Invalid month";
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (yy < currentYear || (yy === currentYear && mm < currentMonth))
      return "Card expired";
    return true;
  },

  cvv: (value) => /^\d{3}$/.test(value) || "CVV must be 3 digits",
};

function showError(input, message) {
  const errorMsg = input.parentElement.querySelector(".error-msg");
  if (message === true) {
    errorMsg.textContent = "";
    input.classList.remove("invalid");
  } else {
    errorMsg.textContent = message;
    input.classList.add("invalid");
  }
}

Object.keys(validators).forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("blur", () => {
    const result = validators[id](input.value);
    showError(input, result);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  Object.keys(validators).forEach((id) => {
    const input = document.getElementById(id);
    const result = validators[id](input.value);
    showError(input, result);
    if (result !== true) valid = false;
  });
  if (valid) {
    alert("Payment submitted successfully!");
    form.reset();
  }
});
