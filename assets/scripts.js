const form = document.getElementById("expenseForm");
const inputName = document.getElementById("expenseName");
const inputNominal = document.getElementById("expenseAmount");
const expensesList = document.getElementById("expensesList");
const totalExpenses = document.getElementById("totalExpenses");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderPengeluaran() {
  expensesList.innerHTML = "";
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    let item = expenses[i];

    total = total + Number(item.amount);

    const newListItem = document.createElement("li");
    newListItem.className = "list-group-item px-0 py-3 d-flex justify-content-between align-items-center";

    newListItem.innerHTML = `
      <span class="text-dark fw-semibold small">${item.name}</span>
      <span class="fw-bold text-danger small">Rp ${Number(item.amount).toLocaleString("id-ID")}</span>
    `;

    expensesList.appendChild(newListItem);
  }

  totalExpenses.innerText = `Rp ${Number(total).toLocaleString("id-ID")}`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // disini bikin data setelah di input itu ga ilang dulu sebelum di refresh

  const nameValue = inputName.value;
  const nominalValue = inputNominal.value;

  // validasi kalau input ga boleh kosong, dan memakai trim, supaya user ga bisa isen kalau "   " . . .q
  if (nameValue.trim() === "" || Number(nominalValue) <= 0) {
    alert("isi dulu bro");
  } else {
    const newExpense = {
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
