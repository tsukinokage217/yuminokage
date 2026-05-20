// Sticky Navbar Blur
const topbar = document.getElementById("topbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
});


// Mobile Menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
}

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  mobileOverlay.classList.add("active");
});

closeMenu.addEventListener("click", closeMobileMenu);
mobileOverlay.addEventListener("click", closeMobileMenu);


// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));


// Sakura Particles Canvas
const canvas = document.getElementById("sakuraCanvas");
const ctx = canvas.getContext("2d");

let petals = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createPetal() {
  return {
    x: Math.random() * w,
    y: Math.random() * h - h,
    size: Math.random() * 6 + 4,
    speedY: Math.random() * 1.6 + 0.7,
    speedX: Math.random() * 0.8 - 0.4,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 2 - 1,
    opacity: Math.random() * 0.5 + 0.25
  };
}

for (let i = 0; i < 55; i++) {
  petals.push(createPetal());
}

function drawPetal(p) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);

  ctx.fillStyle = "rgba(255, 120, 180, 0.85)";
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size, p.size / 2, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  petals.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    drawPetal(p);

    if (p.y > h + 30) {
      p.y = -30;
      p.x = Math.random() * w;
    }

    if (p.x < -50) p.x = w + 50;
    if (p.x > w + 50) p.x = -50;
  });

  requestAnimationFrame(animate);
}

animate();