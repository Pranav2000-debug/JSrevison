const inputName = document.getElementById("expense-name");
const inputAmt = document.getElementById("expense-amount");
const submitExpBtn = document.querySelector("button[type=submit]");
const expenseList = document.getElementById("expense-list");
const totalDiv = document.getElementById("total");
const form = document.getElementById("expense-form");

const expensesArray = JSON.parse(localStorage.getItem("expenses")) || [];
console.log(expensesArray);

function loadPrevContent() {
  expensesArray.forEach((item) => addExpToList(item));
}
loadPrevContent();
submitExpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const expenseName = inputName.value.trim();
  const expenseAmt = inputAmt.value;
  if (
    !expenseName ||
    !expenseAmt ||
    Number.isNaN(expenseAmt) ||
    expenseAmt <= 0
  )
    return;

  const expense = {
    id: Number((Math.random() * (10 - 1 + 1) + 1).toString().replace(".", "")),
    name: expenseName,
    amount: Number(expenseAmt),
  };
  expensesArray.push(expense);
  addExpToList(expense);
  updateStorage(expense);

  // calculateTotal();
  e.target.closest("form").reset();
});

function updateStorage() {
  localStorage.setItem("expenses", JSON.stringify(expensesArray));
}

function addExpToList(exp) {
  const li = document.createElement("li");
  const delLiBtn = document.createElement("button");
  li.dataset.id = exp.id;
  delLiBtn.textContent = "delete";
  li.textContent = `${exp.name} - $${exp.amount}`;
  li.append(delLiBtn);
  expenseList.append(li);
  updateDom();

  // ADDING A LISTENER TO THE BUTTON HERE, SINCE CREATION WAS HERE OR USED EVENT DELEGATION BELOW
}

function calculateTotal() {
  return (total = expensesArray.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0));
}

function updateDom() {
  const totalAmt = calculateTotal();
  totalDiv.querySelector("#total-amount").textContent = totalAmt;
}

// EVENT DELEGATION
expenseList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const itemToDelete = event.target.closest("li");
    const itemId = +itemToDelete.dataset.id;
    // console.log(itemId);
    // console.log(itemToDelete);
    itemToDelete.remove();
    const expenseIndex = expensesArray.findIndex((item) => item.id === itemId);
    // console.log(expenseIndex);
    expensesArray.splice(expenseIndex, 1);
    updateDom();
    updateStorage();
  }
});
