// Sticky navbar effect
const topbar = document.getElementById("topbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
});

// Mobile menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  mobileOverlay.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
});

mobileOverlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
});


// Sakura Particles (Canvas)
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
    speedY: Math.random() * 1.5 + 0.8,
    speedX: Math.random() * 0.6 - 0.3,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 2 - 1,
    opacity: Math.random() * 0.5 + 0.3
  };
}

for (let i = 0; i < 50; i++) {
  petals.push(createPetal());
}

function drawPetal(p) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);

  ctx.fillStyle = "rgba(255, 120, 180, 0.8)";
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

    if (p.y > h + 20) {
      p.y = -20;
      p.x = Math.random() * w;
    }
  });

  requestAnimationFrame(animate);
}

animate();