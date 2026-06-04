const form = document.getElementById("guestbookForm");
const inputName = document.getElementById("inputName");
const inputMessage = document.getElementById("inputMessage");
const messageList = document.getElementById("messageList");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // disini bikin data setelah di input itu ga ilang dulu sebelum di refresh

  const nameValue = inputName.value;
  const messageValue = inputMessage.value;

  const newListItem = document.createElement("li");
  newListItem.innerHTML = `<strong>${nameValue}</strong>: "${messageValue}"`;

  // memasukkan element baru ke dalam list kita
  messageList.appendChild(newListItem);

  form.reset();
});
