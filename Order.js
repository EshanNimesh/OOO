let cart = [];

function addToCart() {
  cart = []; // Reset the cart
  const inputs = document.querySelectorAll("input[type='number']");
  let total = 0;

  inputs.forEach(input => {
    const qty = parseInt(input.value);
    if (!isNaN(qty) && qty > 0) {
      const name = input.dataset.name;
      const price = parseInt(input.dataset.price);
      const subtotal = qty * price;
      total += subtotal;
      cart.push({ name, qty, price, subtotal });
    }
  });

  renderCart(total);
}

function renderCart(total) {
  const table = document.getElementById("cartTable");
  table.innerHTML = `
    <tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th><th>Remove</th></tr>
  `;

  cart.forEach((item, index) => {
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>
        <td>${item.subtotal}</td>
        <td><button onclick="removeFromCart(${index})">❌</button></td>
      </tr>
    `;
  });

  document.getElementById("totalPrice").textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item from cart
  const total = cart.reduce((sum, item) => sum + item.subtotal, 0); // Recalculate total
  renderCart(total);
}


function saveFavourite() {
  if (cart.length === 0) {
    alert("Please add some items before saving.");
    return;
  }
  localStorage.setItem("favouriteOrder", JSON.stringify(cart));
  alert("✅ Favourite order saved!");
}

function applyFavourite() {
  const fav = JSON.parse(localStorage.getItem("favouriteOrder"));
  if (!fav) {
    alert("❌ No favourite order found.");
    return;
  }

  // Set inputs based on favourite data
  fav.forEach(item => {
    const input = document.querySelector(`input[data-name="${item.name}"]`);
    if (input) input.value = item.qty;
  });

  cart = fav;
  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  renderCart(total);
}


function goToCheckout() {
    window.location.href = 'Checkout.html';
}


function goToCheckout() {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "CheackOut.html";
}
function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("show");
  renderCartSidebar(); // Show items when sidebar opens
}


function checkout() {
  alert("Proceeding to checkout!");
}
// 🛒 Update cart icon count from localStorage
function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    let totalQty = 0;
    cart.forEach(item => totalQty += item.qty);
    cartCount.textContent = totalQty;
  }
}

// Run this when checkout page loads (if the cart icon exists)
window.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
function renderCartSidebar() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = ""; // Clear previous content

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.style.borderBottom = "1px solid #ccc";
    itemDiv.style.padding = "10px 0";
    itemDiv.innerHTML = `
      <strong>${item.name}</strong><br>
      Qty: ${item.qty}<br>
      Price: Rs${item.price}<br>
      Subtotal: Rs${item.qty * item.price}
    `;
    cartItemsContainer.appendChild(itemDiv);
  });
}
