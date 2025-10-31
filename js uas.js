// ========== SCROLL KE MENU ==========
document.getElementById("learnMore").addEventListener("click", () => {
  document.querySelector("#mainMenu").scrollIntoView({ behavior: "smooth" });
});

// ========== POPUP DESKRIPSI MENU ==========
const popup = document.getElementById("menuPopup");
const popupImg = document.getElementById("popupImg");
const popupName = document.getElementById("popupName");
const popupDesc = document.getElementById("popupDesc");
const popupPrice = document.getElementById("popupPrice");
const closePopupBtn = document.getElementById("closePopupBtn");

document.querySelectorAll(".gallery .item").forEach(item => {
  item.addEventListener("click", () => {
    popupImg.src = item.dataset.img;
    popupName.textContent = item.dataset.name;
    popupDesc.textContent = item.dataset.desc;
    popupPrice.textContent = item.dataset.price;
    popup.classList.add("active");
  });
});

closePopupBtn.addEventListener("click", () => popup.classList.remove("active"));
popup.addEventListener("click", e => {
  if (e.target === popup) popup.classList.remove("active");
});

// ========== FORM PEMESANAN ==========
const form = document.getElementById("orderForm");
const totalDisplay = document.getElementById("totalPrice");
const menuList = document.getElementById("menuList");

// Fungsi hitung total harga
function updateTotal() {
  let total = 0;
  document.querySelectorAll(".menu-item").forEach(item => {
    const select = item.querySelector(".menuSelect");
    const qty = parseInt(item.querySelector(".quantity").value) || 0;
    const price = select.options[select.selectedIndex].getAttribute("data-price");
    if (price) total += parseInt(price) * qty;
  });
  totalDisplay.textContent = "Rp" + total.toLocaleString("id-ID");
}

// Tambah menu baru
document.getElementById("addMenu").addEventListener("click", () => {
  const newItem = document.querySelector(".menu-item").cloneNode(true);
  newItem.querySelectorAll("input, select").forEach(el => el.value = "");
  newItem.querySelector(".quantity").value = 1;
  menuList.appendChild(newItem);
  addItemEvents(newItem);
});

// Tambah event listener ke setiap item
function addItemEvents(item) {
  item.querySelector(".menuSelect").addEventListener("change", updateTotal);
  item.querySelector(".quantity").addEventListener("input", updateTotal);
  item.querySelector(".removeMenu").addEventListener("click", () => {
    item.remove();
    updateTotal();
  });
}
document.querySelectorAll(".menu-item").forEach(addItemEvents);

// ========== EFEK FADE-IN SAAT SCROLL ==========
const fadeEls = document.querySelectorAll(".fade-in");
function handleScroll() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", handleScroll);
handleScroll();
