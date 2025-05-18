const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart");
const cartTotal = document.getElementById("cart-total");
const priceTotal = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

const products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 39.99 },
  { id: 4, name: "Product 4", price: 34.99 },
];

const cart = JSON.parse(localStorage.getItem("product")) || [];

function loadPrevCart() {
  if(cart.length) {
    console.log(cart);
    cart.forEach(item => {
      renderCart(item);
    })
  }
}
loadPrevCart()



products.forEach((item) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
  <span>${item.name} - $${item.price.toFixed(2)}</span>
  <button data-id="${item.id}">Add to cart</button>
  `;
  productList.append(productDiv);
});

productList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const btnId = +event.target.dataset.id;
    const itemToAdd = products.find((prod) => prod.id === btnId);
    // console.log(itemToAdd);

    cart.push(itemToAdd);
    console.log(cart);

    renderCart(itemToAdd);
    updateStorage();
  }
});



function renderCart(cItem) {
  if (cart.length === 0) {
    console.log("Err");
  } else {
    cartTotal.classList.remove("hidden");
    emptyCartMessage.classList.add("hidden");

    const cartProd = document.createElement("p");
    cartProd.setAttribute("data-id", cItem.id);

    const delProdbtn = document.createElement("button");
    delProdbtn.setAttribute("class", "delete-btn");
    delProdbtn.textContent = "delete";
    cartProd.textContent = `${cItem.name} - $${cItem.price}`;
    cartProd.append(delProdbtn);
    cartItems.append(cartProd);

    // check calcs here
    updateTotal();

    delProdbtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.tagName === "BUTTON") {
        // console.log(e.target);
        const prodItem = e.target.closest("p");
        const prodId = +prodItem.dataset.id;
        const prodIdToSubtract = cart.findIndex((i) => i.id === prodId);
        if (prodIdToSubtract !== -1) {
          cart.splice(prodIdToSubtract, 1);
        }
        updateStorage();
        prodItem.remove();
        if (cart.length === 0) {
          emptyCartMessage.classList.remove("hidden");
          cartTotal.classList.add("hidden");
        }
        updateTotal();
      }
    });
  }
}

checkoutBtn.addEventListener("click", () => {
  while (cart.length) {
    cart.pop();
  }
  updateStorage();
  console.log(cart);

  cartItems
    .querySelectorAll("p:not(#empty-cart)")
    .forEach((child) => child.remove());
  emptyCartMessage.classList.remove("hidden");
  updateTotal();
  cartTotal.classList.add("hidden");
  alert("Cart is empty");
});

function updateTotal() {
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
  priceTotal.textContent = totalPrice;
  console.log(totalPrice);
}

function updateStorage() {
  localStorage.setItem("product", JSON.stringify(cart));
}
