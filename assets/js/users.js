window.addEventListener('load',function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
if (!user) {
   window.location.href = "../../pages/auth/login.html";
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
          <button class="btn btn-sm btn-dark" onclick="updateData(${i})">Update</button>
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