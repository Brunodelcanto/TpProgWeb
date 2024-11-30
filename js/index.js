//Funcion de filtrado de productos
function filterProducts() {
    const filter = document.getElementById("productFilter").value; //obtenemos el valor del filtro
    const products = document.querySelectorAll(".card"); //seleccionamos todos los productos

    products.forEach((product) => {
      //si el filtro seleccionado es "all" o si el producto esta dentro de nuestra lista de filtrado
      if (filter === "all" || product.classList.contains(filter)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

//almacenamos los elementos del dom en constantes
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

//variables para el carrito
let cart = [];
let total = 0;


function updateCart() {
  cartItems.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    const listItem = document.createElement("li"); //crea un nuevo elemento en la lista

    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity)}</span>
      <button onclick="removeFromCart(${index})">X</button>
    `;

    cartItems.appendChild(listItem); //añade a la lista
    total += item.price * item.quantity; //calcula el precio total
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); //actualiza la cantidad de productos
  totalPrice.textContent = total;
}


function addToCart(event) {
  const card = event.target.closest(".card"); //tarjeta del producto a la que se le hizo click
  const name = card.querySelector(".card-title").textContent;
  const price = parseFloat(card.querySelector(".price").textContent.replace("$", "")); 
  const image = card.querySelector("img").src;
  

  const existingItem = cart.find(item => item.name === name);//buscamos si existe un producto en el carrito con el mismo nombre

  if (existingItem) {
  
    existingItem.quantity += 1; //si existe incrementamos la cantidad
  } else {

    cart.push({ name, price, image, quantity: 1 }); //si no lo agregamos con push
  }

  updateCart();
}


function removeFromCart(index) {
  const item = cart[index]; //utilizamos el indice para obtener el producto del carrito

  if (item.quantity > 1) {
  
    item.quantity -= 1; //si hay mas de uno disminuimos la cantidad
  } else {

    cart.splice(index, 1); //si solo hay 1, eliminamos el producto con splice
  }

  updateCart();
}


// agregamos el evento click a los botones para ejecutar la funcion addToCart
addToCartButtons.forEach(button => {
  button.addEventListener("click", addToCart); 
});


//funcion para redirigir a la url proporcionada
function redes(url){
  window.location.href = url;
}
  