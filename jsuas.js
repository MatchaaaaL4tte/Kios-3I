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

/// ========== FORM PEMESANAN KE WHATSAPP ==========

// Pastikan form dan elemen-elemennya ada
const form = document.getElementById("orderForm");
const totalDisplay = document.getElementById("totalPrice");
const menuList = document.getElementById("menuList");

// Fungsi menghitung total harga pesanan
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

// Event: tombol tambah menu baru
document.getElementById("addMenu").addEventListener("click", () => {
  const newItem = document.querySelector(".menu-item").cloneNode(true);
  newItem.querySelectorAll("input, select").forEach(el => el.value = "");
  newItem.querySelector(".quantity").value = 1;
  menuList.appendChild(newItem);
  addItemEvents(newItem);
});

// Fungsi menambahkan event ke item menu baru
function addItemEvents(item) {
  item.querySelector(".menuSelect").addEventListener("change", updateTotal);
  item.querySelector(".quantity").addEventListener("input", updateTotal);
  item.querySelector(".removeMenu").addEventListener("click", () => {
    item.remove();
    updateTotal();
  });
}
document.querySelectorAll(".menu-item").forEach(addItemEvents);

// Event: update total harga saat menu berubah
document.querySelectorAll(".menuSelect, .quantity").forEach(el => {
  el.addEventListener("input", updateTotal);
});

// Event: kirim pesanan ke WhatsApp
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validasi form
  if (!name || !email) {
    alert("⚠️ Mohon isi nama dan email terlebih dahulu!");
    return;
  }

  // Format pesan WhatsApp
  let pesan = `🍽️ *RASA NUSANTARA ORDER FORM*\n\n`;
  pesan += `👤 *Nama:* ${name}\n📧 *Email:* ${email}\n\n🛒 *Pesanan Anda:*\n`;

  let total = 0;
  document.querySelectorAll(".menu-item").forEach((item, i) => {
    const select = item.querySelector(".menuSelect");
    const qty = item.querySelector(".quantity").value;
    const spice = item.querySelector(".spice").value || "-";
    const note = item.querySelector(".note").value || "-";
    const price = select.options[select.selectedIndex].getAttribute("data-price");

    if (select.value && price) {
      const subtotal = parseInt(price) * parseInt(qty);
      total += subtotal;
      pesan += `\n${i + 1}. *${select.value}* x${qty} (${spice})\n📝 Catatan: ${note}\n💰 Rp${subtotal.toLocaleString("id-ID")}\n`;
    }
  });

  pesan += `\n──────────────────────────────\n💵 *Total Bayar:* Rp${total.toLocaleString("id-ID")}\n\n🙏 Terima kasih sudah memesan di *Rasa Nusantara!* ❤️`;

  // Nomor WA kamu
  const phoneNumber = "6289696407241"; // Ganti sesuai nomor kamu
  const pesanEncoded = encodeURIComponent(pesan);
  const waApp = `whatsapp://send?phone=${phoneNumber}&text=${pesanEncoded}`;
  const waWeb = `https://wa.me/${phoneNumber}?text=${pesanEncoded}`;

  // Deteksi perangkat
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Buka langsung ke WhatsApp
  if (isMobile) {
    window.location.href = waApp;
  } else {
    window.open(waWeb, "_blank");
  }

  // Notifikasi kecil
  setTimeout(() => {
    alert("✅ Pesanan Anda telah siap dikirim ke WhatsApp!");
  }, 500);

  form.reset();
  totalDisplay.textContent = "Rp0";
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
