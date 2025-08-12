var emailInput = document.getElementById("email");
var nameInput = document.getElementById("username");
var messageInput = document.getElementById("message");

function sendMessage(e) {
    e.preventDefault();

    if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
        showToast("Please complete data", "warning");
        return;
    }

    let contact = {
        email: emailInput.value,
        username: nameInput.value,
        message: messageInput.value,
    };

    let contacts = JSON.parse(localStorage.getItem("contactUs")) || [];
    contacts.push(contact);
    localStorage.setItem("contactUs", JSON.stringify(contacts));

    emailInput.value = "";
    nameInput.value = "";
    messageInput.value = "";
    showToast("Thank you! Your message has been sent successfully.", "success");

   
}





    function showToast(message, type = "danger") {
    let toastEl = document.getElementById("toastMessage");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    
    toastEl.querySelector(".toast-body").textContent = message;

    let toast = new bootstrap.Toast(toastEl);
    toast.show();
}