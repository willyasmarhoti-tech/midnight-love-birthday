const pages = [...document.querySelectorAll(".page")];
const dots = [...document.querySelectorAll(".progress-dot")];
let currentPage = 0;

function showPage(index) {
  currentPage = Math.max(0, Math.min(index, pages.length - 1));
  pages.forEach((page, i) => {
    page.classList.toggle("active", i === currentPage);
    page.setAttribute("aria-hidden", i === currentPage ? "false" : "true");
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPage);
    dot.classList.toggle("done", i < currentPage);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (currentPage === pages.length - 1) makeConfetti(55);
}

document.querySelectorAll(".next-btn").forEach(button => button.addEventListener("click", () => showPage(currentPage + 1)));
document.querySelectorAll(".prev-btn").forEach(button => button.addEventListener("click", () => showPage(currentPage - 1)));
document.getElementById("restartBtn").addEventListener("click", () => showPage(0));

document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("flipped");
    card.setAttribute("aria-expanded", String(flipped));
  });
});

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Jeda musik";
      musicBtn.setAttribute("aria-pressed", "true");
    } catch {
      musicLabel.textContent = "Tambahkan musik.mp3";
      alert("Tambahkan file musik yang boleh kamu gunakan dengan nama assets/musik.mp3, lalu coba lagi.");
    }
  } else {
    music.pause();
    musicLabel.textContent = "Putar musik";
    musicBtn.setAttribute("aria-pressed", "false");
  }
});

const photo = document.getElementById("couplePhoto");
const photoFallback = document.getElementById("photoFallback");
photo.addEventListener("load", () => { photo.style.display = "block"; photoFallback.style.display = "none"; });
photo.addEventListener("error", () => { photo.style.display = "none"; photoFallback.style.display = "flex"; });

function makeConfetti(count = 40) {
  const symbols = ["✦", "♥", "✧", "♡", "✿"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${3 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random()}s`;
    piece.style.fontSize = `${10 + Math.random() * 14}px`;
    piece.style.color = ["#ffacd8", "#d5bdff", "#ffe5a6", "#ffffff"][Math.floor(Math.random() * 4)];
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 8000);
  }
}
document.getElementById("wishBtn").addEventListener("click", () => {
  document.getElementById("wishMessage").textContent = "Semoga semua harapan baikmu menemukan jalan pulang kepadamu. ♡";
  document.getElementById("flame").textContent = "♡";
  makeConfetti(60);
});
showPage(0);
