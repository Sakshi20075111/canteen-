/* =========================================================
   CAMPUS CANTEEN — SCRIPT.JS
   Everything below is vanilla JS, no backend/database.
   Cart + orders live only in memory (they reset on page reload).
   ========================================================= */

/* ---------------------------------------------------------
   1. SAMPLE FOOD DATA
   To add/change items: just add/edit an object in this array.
   Fields:
     id            -> unique number
     name          -> food name
     desc          -> short description
     price         -> number (in ₹, no symbol)
     category      -> must match a category id below
     veg           -> true = veg, false = non-veg
     rating        -> number out of 5
     icon          -> any emoji used as the "image"
     inStock       -> true/false, controls Available/Out of Stock
     popular       -> true = shows in "Popular Right Now"
--------------------------------------------------------- */
const CATEGORIES = [
  { id: "breakfast",  name: "Breakfast",   icon: "🍳" },
  { id: "snacks",     name: "Snacks",      icon: "🥟" },
  { id: "main",       name: "Main Course", icon: "🍛" },
  { id: "beverages",  name: "Beverages",   icon: "🥤" },
  { id: "fastfood",   name: "Fast Food",   icon: "🍟" },
  { id: "desserts",   name: "Desserts",    icon: "🍩" },
];

const FOOD_ITEMS = [
  { id: 1,  name: "Masala Dosa",        desc: "Crispy rice crepe with spiced potato filling & chutney", price: 55, category: "breakfast", veg: true,  rating: 4.6, icon: "🥞", inStock: true,  popular: true },
  { id: 2,  name: "Poha",               desc: "Flattened rice tempered with peanuts & curry leaves",     price: 30, category: "breakfast", veg: true,  rating: 4.3, icon: "🍚", inStock: true,  popular: false },
  { id: 3,  name: "Bread Omelette",     desc: "Double egg omelette with toasted bread and ketchup",      price: 40, category: "breakfast", veg: false, rating: 4.4, icon: "🍳", inStock: true,  popular: true },
  { id: 4,  name: "Idli Sambar",        desc: "Steamed rice cakes served with sambar & coconut chutney", price: 35, category: "breakfast", veg: true,  rating: 4.5, icon: "🍥", inStock: true,  popular: false },

  { id: 5,  name: "Samosa (2 pcs)",     desc: "Deep-fried pastry filled with spiced potatoes & peas",    price: 20, category: "snacks",    veg: true,  rating: 4.7, icon: "🥟", inStock: true,  popular: true },
  { id: 6,  name: "Veg Cutlet",         desc: "Crumb-fried mixed vegetable patty with mint chutney",     price: 25, category: "snacks",    veg: true,  rating: 4.2, icon: "🧆", inStock: true,  popular: false },
  { id: 7,  name: "Chicken Roll",       desc: "Spiced chicken wrapped in soft paratha",                  price: 60, category: "snacks",    veg: false, rating: 4.6, icon: "🌯", inStock: false, popular: false },
  { id: 8,  name: "Bhel Puri",          desc: "Puffed rice tossed with chutneys, onion & sev",           price: 30, category: "snacks",    veg: true,  rating: 4.4, icon: "🥗", inStock: true,  popular: false },

  { id: 9,  name: "Veg Thali",          desc: "Dal, sabzi, rice, 3 rotis, salad & pickle",               price: 70, category: "main",      veg: true,  rating: 4.8, icon: "🍛", inStock: true,  popular: true },
  { id: 10, name: "Chicken Biryani",    desc: "Fragrant basmati rice layered with spiced chicken",       price: 110, category: "main",     veg: false, rating: 4.9, icon: "🍗", inStock: true,  popular: true },
  { id: 11, name: "Paneer Butter Masala",desc:"Cottage cheese cubes in a rich tomato-butter gravy",       price: 90, category: "main",      veg: true,  rating: 4.6, icon: "🍲", inStock: true,  popular: false },
  { id: 12, name: "Rajma Chawal",       desc: "Kidney bean curry served over steamed rice",              price: 55, category: "main",      veg: true,  rating: 4.3, icon: "🍚", inStock: true,  popular: false },
  { id: 13, name: "Chole Bhature",      desc: "Spiced chickpeas with fluffy fried bread",                price: 60, category: "main",      veg: true,  rating: 4.7, icon: "🫓", inStock: true,  popular: true },

  { id: 14, name: "Masala Chai",        desc: "Hot spiced tea brewed with milk",                         price: 12, category: "beverages", veg: true,  rating: 4.8, icon: "☕", inStock: true,  popular: true },
  { id: 15, name: "Cold Coffee",        desc: "Chilled coffee blended with milk & ice cream",             price: 45, category: "beverages", veg: true,  rating: 4.5, icon: "🥤", inStock: true,  popular: true },
  { id: 16, name: "Fresh Lime Soda",    desc: "Refreshing lime juice with soda, sweet or salted",         price: 25, category: "beverages", veg: true,  rating: 4.4, icon: "🍋", inStock: true,  popular: false },
  { id: 17, name: "Mango Lassi",        desc: "Thick yogurt shake blended with mango pulp",               price: 40, category: "beverages", veg: true,  rating: 4.6, icon: "🥭", inStock: false, popular: false },

  { id: 18, name: "Cheese Burger",      desc: "Grilled patty with melted cheese in a soft bun",           price: 65, category: "fastfood",  veg: false, rating: 4.5, icon: "🍔", inStock: true,  popular: true },
  { id: 19, name: "French Fries",       desc: "Crispy golden fries with peri-peri seasoning",             price: 45, category: "fastfood",  veg: true,  rating: 4.6, icon: "🍟", inStock: true,  popular: true },
  { id: 20, name: "Veg Pizza Slice",    desc: "Loaded with capsicum, corn, onion & cheese",               price: 50, category: "fastfood",  veg: true,  rating: 4.3, icon: "🍕", inStock: true,  popular: false },
  { id: 21, name: "Chicken Tikka Wrap", desc: "Grilled chicken tikka rolled with veggies & sauce",        price: 70, category: "fastfood",  veg: false, rating: 4.7, icon: "🌮", inStock: true,  popular: false },

  { id: 22, name: "Gulab Jamun (2 pcs)",desc: "Soft milk-solid dumplings soaked in sugar syrup",          price: 25, category: "desserts",  veg: true,  rating: 4.8, icon: "🍡", inStock: true,  popular: true },
  { id: 23, name: "Chocolate Brownie",  desc: "Fudgy brownie served warm with choco drizzle",             price: 40, category: "desserts",  veg: true,  rating: 4.7, icon: "🍫", inStock: true,  popular: false },
  { id: 24, name: "Ice Cream Cup",      desc: "Vanilla / chocolate / strawberry, pick your favourite",    price: 30, category: "desserts",  veg: true,  rating: 4.5, icon: "🍨", inStock: true,  popular: false },
];

/* ---------------------------------------------------------
   2. APP STATE
--------------------------------------------------------- */
// cart = { [itemId]: quantity }
let cart = {};
const PACKAGING_FEE_PER_ORDER = 5; // flat ₹5 packaging fee when cart is non-empty

let activeCategoryFilter = "all";
let searchQuery = "";

/* ---------------------------------------------------------
   3. DOM REFERENCES
--------------------------------------------------------- */
const categoryRow   = document.getElementById("categoryRow");
const popularGrid    = document.getElementById("popularGrid");
const menuGrid        = document.getElementById("menuGrid");
const filterChips     = document.getElementById("filterChips");
const searchInput     = document.getElementById("searchInput");
const resultsCount    = document.getElementById("resultsCount");
const noResultsMsg    = document.getElementById("noResults");

const cartCountBadge  = document.getElementById("cartCount");
const cartBtn         = document.getElementById("cartBtn");
const cartOverlay     = document.getElementById("cartOverlay");
const cartDrawer      = document.getElementById("cartDrawer");
const closeDrawerBtn  = document.getElementById("closeDrawer");
const drawerItems     = document.getElementById("drawerItems");
const drawerEmpty     = document.getElementById("drawerEmpty");
const drawerFooter    = document.getElementById("drawerFooter");
const drawerTotal     = document.getElementById("drawerTotal");

const cartItemsList   = document.getElementById("cartItemsList");
const cartEmptyMsg    = document.getElementById("cartEmptyMsg");
const cartSummary     = document.getElementById("cartSummary");
const cartPanelCount  = document.getElementById("cartPanelCount");
const subtotalAmt     = document.getElementById("subtotalAmt");
const packagingAmt    = document.getElementById("packagingAmt");
const totalAmt        = document.getElementById("totalAmt");
const formTotal        = document.getElementById("formTotal");

const orderForm       = document.getElementById("orderForm");
const placeOrderBtn   = document.getElementById("placeOrderBtn");

const modalOverlay    = document.getElementById("modalOverlay");
const modalOrderId    = document.getElementById("modalOrderId");
const modalCloseBtn   = document.getElementById("modalCloseBtn");

const toastEl         = document.getElementById("toast");
const hamburger       = document.getElementById("hamburger");
const navLinks         = document.getElementById("navLinks");

/* ---------------------------------------------------------
   4. HELPERS
--------------------------------------------------------- */
function formatRupees(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function findItem(id) {
  return FOOD_ITEMS.find((item) => item.id === id);
}

function getTotalCartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function getSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = findItem(Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

/* ---------------------------------------------------------
   5. RENDER: CATEGORIES (homepage row)
--------------------------------------------------------- */
function renderCategories() {
  categoryRow.innerHTML = CATEGORIES.map((cat) => `
    <a href="#menu" class="category-card" data-cat="${cat.id}">
      <div class="cat-icon">${cat.icon}</div>
      <div class="cat-name">${cat.name}</div>
    </a>
  `).join("");

  // Clicking a homepage category jumps to the menu and filters it
  categoryRow.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeCategoryFilter = card.dataset.cat;
      renderFilterChips();
      renderMenuGrid();
    });
  });
}

/* ---------------------------------------------------------
   6. RENDER: FILTER CHIPS (menu page)
--------------------------------------------------------- */
function renderFilterChips() {
  const chips = [{ id: "all", name: "All Items" }, ...CATEGORIES];
  filterChips.innerHTML = chips.map((cat) => `
    <button class="chip ${activeCategoryFilter === cat.id ? "active" : ""}" data-cat="${cat.id}">
      ${cat.name}
    </button>
  `).join("");

  filterChips.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCategoryFilter = chip.dataset.cat;
      renderFilterChips();
      renderMenuGrid();
    });
  });
}

/* ---------------------------------------------------------
   7. BUILD A SINGLE FOOD CARD (shared by popular + menu grid)
   `withStepper` = true shows a quantity stepper (used on menu page)
--------------------------------------------------------- */
function buildFoodCard(item, withStepper) {
  const qty = cart[item.id] || 0;
  const vegClass = item.veg ? "" : "nonveg";
  const stockClass = item.inStock ? "in-stock" : "";
  const stockLabel = item.inStock ? "Available" : "Out of Stock";

  const actionHtml = withStepper
    ? (qty > 0
        ? `<div class="qty-stepper" data-id="${item.id}">
             <button class="qty-minus" aria-label="Decrease quantity">−</button>
             <span>${qty}</span>
             <button class="qty-plus" aria-label="Increase quantity">+</button>
           </div>`
        : `<button class="add-btn" data-id="${item.id}" ${item.inStock ? "" : "disabled"}>
             ${item.inStock ? "Add to Cart" : "Unavailable"}
           </button>`)
    : `<button class="add-btn ${qty > 0 ? "added" : ""}" data-id="${item.id}" ${item.inStock ? "" : "disabled"}>
         ${!item.inStock ? "Unavailable" : (qty > 0 ? `Added (${qty})` : "Add to Cart")}
       </button>`;

  return `
    <article class="food-card">
      <div class="food-thumb">
        <div class="veg-badge ${vegClass}" title="${item.veg ? "Veg" : "Non-Veg"}"></div>
        <span class="stock-badge ${stockClass}">${stockLabel}</span>
        ${item.icon}
      </div>
      <div class="food-body">
        <div class="food-top">
          <span class="food-name">${item.name}</span>
          <span class="food-rating">★ ${item.rating}</span>
        </div>
        <p class="food-desc">${item.desc}</p>
        <div class="food-bottom">
          <span class="food-price">${formatRupees(item.price)}</span>
          ${actionHtml}
        </div>
      </div>
    </article>
  `;
}

/* ---------------------------------------------------------
   8. RENDER: POPULAR ITEMS (homepage)
--------------------------------------------------------- */
function renderPopular() {
  const popularItems = FOOD_ITEMS.filter((item) => item.popular);
  popularGrid.innerHTML = popularItems.map((item) => buildFoodCard(item, false)).join("");
  attachAddButtons(popularGrid, false);
}

/* ---------------------------------------------------------
   9. RENDER: FULL MENU GRID (search + filter applied)
--------------------------------------------------------- */
function renderMenuGrid() {
  const query = searchQuery.trim().toLowerCase();

  const filtered = FOOD_ITEMS.filter((item) => {
    const matchesCategory = activeCategoryFilter === "all" || item.category === activeCategoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  resultsCount.textContent = `${filtered.length} item${filtered.length !== 1 ? "s" : ""} found`;
  noResultsMsg.hidden = filtered.length !== 0;
  menuGrid.style.display = filtered.length === 0 ? "none" : "grid";

  menuGrid.innerHTML = filtered.map((item) => buildFoodCard(item, true)).join("");
  attachAddButtons(menuGrid, true);
}

/* ---------------------------------------------------------
   10. WIRE UP "ADD TO CART" / STEPPER BUTTONS
   Re-run after every render because innerHTML wipes old listeners.
--------------------------------------------------------- */
function attachAddButtons(container, withStepper) {
  container.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      addToCart(id);
      if (withStepper) {
        renderMenuGrid();
      } else {
        renderPopular();
      }
    });
  });

  if (withStepper) {
    container.querySelectorAll(".qty-plus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.closest(".qty-stepper").dataset.id);
        addToCart(id);
        renderMenuGrid();
      });
    });
    container.querySelectorAll(".qty-minus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.closest(".qty-stepper").dataset.id);
        removeOneFromCart(id);
        renderMenuGrid();
      });
    });
  }
}

/* ---------------------------------------------------------
   11. CART LOGIC
--------------------------------------------------------- */
function addToCart(id) {
  const item = findItem(id);
  if (!item || !item.inStock) return;
  cart[id] = (cart[id] || 0) + 1;
  showToast(`${item.name} added to cart`);
  refreshCartUI();
}

function removeOneFromCart(id) {
  if (!cart[id]) return;
  cart[id] -= 1;
  if (cart[id] <= 0) delete cart[id];
  refreshCartUI();
}

function removeItemCompletely(id) {
  delete cart[id];
  refreshCartUI();
  renderMenuGrid();
  renderPopular();
}

/* Re-renders every place the cart is shown: badge, drawer, cart panel, form total */
function refreshCartUI() {
  const count = getTotalCartCount();
  cartCountBadge.textContent = count;
  cartCountBadge.classList.remove("bump");
  void cartCountBadge.offsetWidth; // restart animation
  cartCountBadge.classList.add("bump");

  renderCartDrawer();
  renderCartPanel();
}

/* ---- Slide-out drawer ---- */
function renderCartDrawer() {
  const entries = Object.entries(cart);
  drawerEmpty.style.display = entries.length === 0 ? "block" : "none";
  drawerFooter.hidden = entries.length === 0;

  drawerItems.innerHTML = entries.map(([id, qty]) => {
    const item = findItem(Number(id));
    return `
      <div class="cart-line">
        <div class="cart-line-icon">${item.icon}</div>
        <div class="cart-line-info">
          <div class="name">${item.name}</div>
          <div class="unit-price">${formatRupees(item.price)} × ${qty}</div>
        </div>
        <div class="qty-stepper" data-id="${item.id}">
          <button class="qty-minus" aria-label="Decrease quantity">−</button>
          <span>${qty}</span>
          <button class="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">🗑</button>
      </div>
    `;
  }).join("");

  drawerTotal.textContent = formatRupees(getSubtotal() + (entries.length ? PACKAGING_FEE_PER_ORDER : 0));

  drawerItems.querySelectorAll(".qty-plus").forEach((btn) =>
    btn.addEventListener("click", () => { addToCart(Number(btn.closest(".qty-stepper").dataset.id)); renderMenuGrid(); renderPopular(); })
  );
  drawerItems.querySelectorAll(".qty-minus").forEach((btn) =>
    btn.addEventListener("click", () => { removeOneFromCart(Number(btn.closest(".qty-stepper").dataset.id)); renderMenuGrid(); renderPopular(); })
  );
  drawerItems.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", () => removeItemCompletely(Number(btn.dataset.id)))
  );
}

/* ---- Full cart panel inside the Orders section ---- */
function renderCartPanel() {
  const entries = Object.entries(cart);
  const count = getTotalCartCount();
  cartPanelCount.textContent = `(${count} item${count !== 1 ? "s" : ""})`;

  cartEmptyMsg.style.display = entries.length === 0 ? "block" : "none";
  cartSummary.hidden = entries.length === 0;
  placeOrderBtn.disabled = entries.length === 0;

  cartItemsList.innerHTML = entries.map(([id, qty]) => {
    const item = findItem(Number(id));
    return `
      <div class="cart-line">
        <div class="cart-line-icon">${item.icon}</div>
        <div class="cart-line-info">
          <div class="name">${item.name}</div>
          <div class="unit-price">${formatRupees(item.price)} × ${qty}</div>
        </div>
        <div class="qty-stepper" data-id="${item.id}">
          <button class="qty-minus" aria-label="Decrease quantity">−</button>
          <span>${qty}</span>
          <button class="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">🗑</button>
      </div>
    `;
  }).join("");

  const subtotal = getSubtotal();
  const packaging = entries.length ? PACKAGING_FEE_PER_ORDER : 0;
  const total = subtotal + packaging;

  subtotalAmt.textContent = formatRupees(subtotal);
  packagingAmt.textContent = formatRupees(packaging);
  totalAmt.textContent = formatRupees(total);
  formTotal.textContent = formatRupees(total);

  cartItemsList.querySelectorAll(".qty-plus").forEach((btn) =>
    btn.addEventListener("click", () => { addToCart(Number(btn.closest(".qty-stepper").dataset.id)); renderMenuGrid(); renderPopular(); })
  );
  cartItemsList.querySelectorAll(".qty-minus").forEach((btn) =>
    btn.addEventListener("click", () => { removeOneFromCart(Number(btn.closest(".qty-stepper").dataset.id)); renderMenuGrid(); renderPopular(); })
  );
  cartItemsList.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", () => removeItemCompletely(Number(btn.dataset.id)))
  );
}

/* ---------------------------------------------------------
   12. CART DRAWER OPEN / CLOSE
--------------------------------------------------------- */
function openDrawer() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("show");
}
function closeDrawer() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("show");
}
cartBtn.addEventListener("click", openDrawer);
closeDrawerBtn.addEventListener("click", closeDrawer);
cartOverlay.addEventListener("click", closeDrawer);
document.getElementById("drawerCheckoutBtn").addEventListener("click", closeDrawer);

/* ---------------------------------------------------------
   13. SEARCH INPUT
--------------------------------------------------------- */
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderMenuGrid();
});

/* ---------------------------------------------------------
   14. MOBILE NAV TOGGLE
--------------------------------------------------------- */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    navLinks.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active-link"));
    link.classList.add("active-link");
  });
});

/* ---------------------------------------------------------
   15. ORDER FORM — VALIDATION + SUBMIT
--------------------------------------------------------- */
function validateField(id, condition, message) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById("err-" + id);
  if (!condition) {
    input.classList.add("invalid");
    errorEl.textContent = message;
    return false;
  }
  input.classList.remove("invalid");
  errorEl.textContent = "";
  return true;
}

function generateOrderId() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `#CC${random}`;
}

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (getTotalCartCount() === 0) {
    showToast("Your cart is empty — add some items first!");
    return;
  }

  const name = document.getElementById("studentName").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pickupTime = document.getElementById("pickupTime").value;

  // Run all validations (don't short-circuit, so every field shows its own error)
  const nameValid = validateField("studentName", name.length >= 2, "Please enter your full name.");
  const rollValid = validateField("rollNo", rollNo.length >= 3, "Please enter a valid student ID.");
  const phoneValid = validateField("phone", /^[6-9]\d{9}$/.test(phone), "Enter a valid 10-digit mobile number.");
  const timeValid = validateField("pickupTime", pickupTime !== "", "Please choose a pickup slot.");

  if (!(nameValid && rollValid && phoneValid && timeValid)) {
    return;
  }

  // "Place" the order
  const orderId = generateOrderId();
  modalOrderId.textContent = orderId;
  modalOverlay.classList.add("show");

  // Reset everything for a fresh order
  cart = {};
  refreshCartUI();
  renderMenuGrid();
  renderPopular();
  orderForm.reset();
});

modalCloseBtn.addEventListener("click", () => modalOverlay.classList.remove("show"));
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove("show");
});

/* ---------------------------------------------------------
   16. CONTACT FORM (front-end only — shows a confirmation toast)
--------------------------------------------------------- */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Message sent! We'll get back to you soon.");
  e.target.reset();
});

/* ---------------------------------------------------------
   17. INITIAL RENDER
--------------------------------------------------------- */
renderCategories();
renderPopular();
renderFilterChips();
renderMenuGrid();
refreshCartUI();
