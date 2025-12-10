// Navbar Fixed on Scroll
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger Menu Toggle
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Klik di luar hamburger menu
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// Dark Mode Toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");
darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// pindahkan posisi toggle sesuai mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// ----------------------------------------------------
// KONTAK FORM (EMAILJS + SWEETALERT INTEGRATION)
// ----------------------------------------------------

// 1. Inisialisasi EmailJS (WAJIB DIGANTI)
(function () {
  // Masukkan Public Key Anda dari dashboard EmailJS
  emailjs.init("0KqMTpLRVSKO09Ela");
})();

const contactForm = document.querySelector("#contactForm");
const submitBtn = document.querySelector("#submitBtn");

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah reload halaman

    // 2. Ubah tombol menjadi loading state
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Mengirim...";
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-70", "cursor-not-allowed");

    // 3. Kirim Form menggunakan EmailJS
    // Ganti 'YOUR_SERVICE_ID' dan 'YOUR_TEMPLATE_ID' dengan ID Anda
    emailjs
      .sendForm("service_b0fhh2m", "template_7g85nyk", this)
      .then(
        function () {
          // 4. SUKSES: Tampilkan Popup Cantik (SweetAlert2)
          Swal.fire({
            title: "Berhasil!",
            text: "Pesan Anda telah terkirim ke dimasagng31@gmail.com.",
            icon: "success",
            confirmButtonText: "Oke",
            confirmButtonColor: "#14b8a6", // Sesuaikan dengan warna primary (Teal/Cyan)
          });

          contactForm.reset(); // Kosongkan form setelah kirim
        },
        function (error) {
          // 5. GAGAL: Tampilkan Popup Error
          console.error("FAILED...", error);
          Swal.fire({
            title: "Gagal!",
            text: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
            icon: "error",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#d33",
          });
        }
      )
      .finally(function () {
        // 6. Kembalikan tombol seperti semula
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
      });
  });
}

// ----------------------------------------------------
// TYPEWRITER EFFECT (ANIMASI TEKS)
// ----------------------------------------------------

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = this.txt;

    // Initial Type Speed
    let typeSpeed = 100; // Kecepatan mengetik

    if (this.isDeleting) {
      typeSpeed /= 2; // Lebih cepat saat menghapus
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.getElementById("typewriter");
  // Array kata-kata yang ingin dianimasikan
  const words = ["IT Networking Enthusiast", "Music Producer"];
  const wait = 2000; // Waktu tunggu sebelum menghapus (2 detik)

  if (txtElement) {
    new TypeWriter(txtElement, words, wait);
  }
}
