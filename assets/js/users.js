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



let users = JSON.parse(localStorage.getItem("users")) || [];

function showData() {
  let table = "";
  for (let i = 0; i < users.length; i++) {
    table += ` 
      <tr> 
        <td>${i + 1}</td>
        <td>${users[i].name}</td>
        <td>${users[i].email}</td>
        <td>${users[i].role}</td>
        <td>
            <button class="btn btn-sm btn-dark" onclick="updateData(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Update</button>
        </td>
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
  users.splice(i, 1);
  localStorage.users = JSON.stringify(users);

  showData();
}

  function updateData(index) {
    currentIndex = index;
    document.getElementById("updateName").value = users[index].name;
    document.getElementById("updateEmail").value = users[index].email;
    document.getElementById("updateRole").value = users[index].role;
  }

 function saveUpdate() {
    if (currentIndex !== null) {
      users[currentIndex].name = document.getElementById("updateName").value;
      users[currentIndex].email = document.getElementById("updateEmail").value;
      users[currentIndex].role = document.getElementById("updateRole").value;
      localStorage.setItem("users", JSON.stringify(users));
      showData();

      const modal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
      modal.hide();
    }
  }

  function deleteData(index) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    showData();
  }

  showData();


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
