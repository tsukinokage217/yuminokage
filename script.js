// Simple smooth effect on scroll
window.addEventListener("scroll", () => {
  document.body.style.backgroundPositionY = window.scrollY * 0.2 + "px";
});