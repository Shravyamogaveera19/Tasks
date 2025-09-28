const products = [
  {
    id: 1,
    name: "Sneakers",
    price: 1200,
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center",
    description: "Comfortable running sneakers",
  },
  {
    id: 2,
    name: "Headphones",
    price: 2000,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&crop=center",
    description: "High-quality wireless headphones",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 3500,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&crop=center",
    description: "Advanced fitness tracking smartwatch",
  },
  {
    id: 4,
    name: "Backpack",
    price: 900,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop&crop=center",
    description: "Durable travel backpack",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 1500,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop&crop=center",
    description: "Portable wireless speaker with deep bass",
  },
  {
    id: 6,
    name: "Laptop",
    price: 45000,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&crop=center",
    description: "High-performance laptop for work and gaming",
  },
  {
    id: 7,
    name: "Smartphone",
    price: 25000,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center",
    description: "Latest smartphone with advanced camera",
  },
  {
    id: 9,
    name: "Wireless Mouse",
    price: 800,
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop&crop=center",
    description: "Ergonomic wireless mouse with precision tracking",
  },
  {
    id: 10,
    name: "Sunglasses",
    price: 1800,
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop&crop=center",
    description: "Stylish sunglasses with UV protection",
  },
  {
    id: 11,
    name: "Water Bottle",
    price: 450,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop&crop=center",
    description: "Stainless steel insulated water bottle",
  },
  {
    id: 12,
    name: "Desk Lamp",
    price: 1200,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop&crop=center",
    description: "LED desk lamp with adjustable brightness",
  },
  {
    id: 13,
    name: "Gaming Controller",
    price: 3200,
    img: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=200&h=200&fit=crop&crop=center",
    description: "Wireless gaming controller with haptic feedback",
  },
  {
    id: 14,
    name: "Book",
    price: 350,
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop&crop=center",
    description: "Bestselling novel - perfect for book lovers",
  },
  {
    id: 15,
    name: "Fitness Band",
    price: 2500,
    img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop&crop=center",
    description: "Activity tracker with heart rate monitor",
  },
  {
    id: 16,
    name: "Keyboard",
    price: 2200,
    img: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=200&fit=crop&crop=center",
    description: "Mechanical keyboard with RGB backlighting",
  },
];

// Load cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Initialize the application
function init() {
  renderProducts();
  updateCart();
}

// Render products to the DOM
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}" loading="lazy" />
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <p class="price">₹${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
        Add to Cart
      </button>
    `;
    list.appendChild(productDiv);
  });
}
// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    console.error("Product not found");
    return;
  }

  // Check if product already exists in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  saveCartToLocalStorage();
  showNotification(`${product.name} added to cart!`);
}
// Update cart display
function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;

  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
    document.getElementById("cart-total").innerText = "0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const listItem = document.createElement("li");
    listItem.className = "cart-item";
    listItem.innerHTML = `
      <div class="cart-item-details">
        <span class="item-name">${item.name}</span>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${index})" class="quantity-btn">-</button>
          <span class="quantity">${item.quantity}</span>
          <button onclick="increaseQuantity(${index})" class="quantity-btn">+</button>
        </div>
        <span class="item-price">₹${itemTotal.toLocaleString()}</span>
        <button onclick="removeFromCart(${index})" class="remove-btn">❌</button>
      </div>
    `;
    cartItems.appendChild(listItem);
  });

  document.getElementById("cart-total").innerText = total.toLocaleString();
}
// Increase item quantity
function increaseQuantity(index) {
  if (cart[index]) {
    cart[index].quantity += 1;
    updateCart();
    saveCartToLocalStorage();
  }
}

// Decrease item quantity
function decreaseQuantity(index) {
  if (cart[index] && cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    updateCart();
    saveCartToLocalStorage();
  } else if (cart[index] && cart[index].quantity === 1) {
    removeFromCart(index);
  }
}

// Remove item from cart
function removeFromCart(index) {
  if (cart[index]) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    updateCart();
    saveCartToLocalStorage();
    showNotification(`${removedItem.name} removed from cart`);
  }
}
// Toggle cart visibility
function toggleCart() {
  const cartElement = document.getElementById("cart");
  cartElement.classList.toggle("active");

  // Close cart when clicking outside
  if (cartElement.classList.contains("active")) {
    document.addEventListener("click", closeCartOnOutsideClick);
  } else {
    document.removeEventListener("click", closeCartOnOutsideClick);
  }
}

// Close cart when clicking outside
function closeCartOnOutsideClick(event) {
  const cart = document.getElementById("cart");
  const cartIcon = document.querySelector(".cart-icon");

  if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
    cart.classList.remove("active");
    document.removeEventListener("click", closeCartOnOutsideClick);
  }
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const confirmMessage = `Are you sure you want to checkout?\n\nItems: ${itemCount}\nTotal: ₹${total.toLocaleString()}`;

  if (confirm(confirmMessage)) {
    showNotification(
      "Thank you for shopping with us! Order placed successfully!",
      "success"
    );
    cart = [];
    updateCart();
    saveCartToLocalStorage();
    toggleCart();
  }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Show notification
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create new notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 20px",
    backgroundColor:
      type === "error" ? "#e74c3c" : type === "success" ? "#27ae60" : "#3498db",
    color: "white",
    borderRadius: "5px",
    zIndex: "1000",
    fontSize: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Clear entire cart
function clearCart() {
  if (cart.length === 0) {
    showNotification("Cart is already empty!", "info");
    return;
  }

  if (confirm("Are you sure you want to clear the entire cart?")) {
    cart = [];
    updateCart();
    saveCartToLocalStorage();
    showNotification("Cart cleared successfully!", "info");
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
