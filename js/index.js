// Filtro de productos
function filterProducts() {
    const filter = document.getElementById("productFilter").value;
    const products = document.querySelectorAll(".card");

    products.forEach((product) => {
      if (filter === "all" || product.classList.contains(filter)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cart = [];
let total = 0;

// Función para actualizar el carrito
function updateCart() {
  cartItems.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">X</button>
    `;

    cartItems.appendChild(listItem);
    total += item.price * item.quantity;
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Suma de todas las cantidades
  totalPrice.textContent = total.toFixed(2);
}

// Función para agregar productos al carrito
function addToCart(event) {
  const card = event.target.closest(".card");
  const name = card.querySelector(".card-title").textContent;
  const price = parseFloat(card.querySelector(".price").textContent.replace("$", ""));
  const image = card.querySelector("img").src;

  // Busca si el producto ya existe en el carrito
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    existingItem.quantity += 1;
  } else {
    // Si el producto no está en el carrito, agrégalo con cantidad inicial 1
    cart.push({ name, price, image, quantity: 1 });
  }

  updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
  const item = cart[index];

  if (item.quantity > 1) {
    // Si la cantidad es mayor a 1, simplemente reduce la cantidad
    item.quantity -= 1;
  } else {
    // Si la cantidad es 1, elimina el producto del carrito
    cart.splice(index, 1);
  }

  updateCart();
}

// Agrega el evento a cada botón "Agregar al carrito"
addToCartButtons.forEach(button => {
  button.addEventListener("click", addToCart);
});

  