const form = document.getElementById("expenseForm");
const inputName = document.getElementById("expenseName");
const inputNominal = document.getElementById("expenseAmount");
const expensesList = document.getElementById("expensesList");
const totalExpenses = document.getElementById("totalExpenses");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function deleteItem(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderPengeluaran();
}

function renderPengeluaran() {
  expensesList.innerHTML = ""; // ini mencegah menduplikat data lama ke halaman tapi tidak di data local nya . . .
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    let item = expenses[i];

    total = total + Number(item.amount);

    const newListItem = document.createElement("li");
    newListItem.className = "list-group-item px-0 py-3 d-flex justify-content-between align-items-center";

    newListItem.innerHTML = `
      <span class="text-dark fw-semibold small">${item.name}</span>
      <div class="d-flex align-items-center gap-3">
        <span class="fw-bold text-danger small">Rp ${Number(item.amount).toLocaleString("id-ID")}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    expensesList.appendChild(newListItem);
  }

  totalExpenses.innerText = `Rp ${Number(total).toLocaleString("id-ID")}`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = inputName.value;
  const nominalValue = inputNominal.value;

  // validasi kalau input ga boleh kosong, dan memakai trim, supaya user ga bisa isen kalau "   " . . .q
  if (nameValue.trim() === "" || Number(nominalValue) <= 0) {
    alert("isi dulu bro");
  } else {
    const newExpense = {
      id: Date.now(),
      name: nameValue,
      amount: nominalValue,
    };

    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderPengeluaran();
    form.reset();
  }
});

// Panggil fungsi ini agar data dirender saat halaman pertama kali dibuka / direfresh
renderPengeluaran();
