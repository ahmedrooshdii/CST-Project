window.addEventListener('load', function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "../../pages/auth/login.html";
    return;
  } 
  
  if (user.role !== "admin") {
    window.location.href = "../../Home.html";
  }

});



let contact = JSON.parse(localStorage.getItem("contactUs")) || [];

function showData() {
  let table = "";
  for (let i = 0; i < contact.length; i++) {
    table += ` 
      <tr> 
        <td>${i + 1}</td>
        <td>${contact[i].email}</td>
        <td>${contact[i].username}</td>
        <td>${contact[i].message}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteData(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();

function deleteData(i) {
  
  if (confirm("Are you sure delete Message")) {
    contact.splice(i, 1); 
    localStorage.contactUs = JSON.stringify(contact); 
    showData(); 
    showToast("Deleted successfully!", "success");

  }
}
      function showToast(message, type = "danger") {
    let toastEl = document.getElementById("toastMessage");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    
    toastEl.querySelector(".toast-body").textContent = message;

    let toast = new bootstrap.Toast(toastEl);
    toast.show();
}


//search
const searchInput = document.getElementById('searchInput');
  const tableBody = document.querySelector('#usersTable tbody');

  searchInput.addEventListener('input', function () {
    const filter = this.value.toLowerCase();

    Array.from(tableBody.rows).forEach(row => {
      const rowText = Array.from(row.cells)
        .map(cell => cell.textContent.toLowerCase())
        .join(' ');
      row.style.display = rowText.includes(filter) ? '' : 'none';
    });
  });
