const header = document.querySelector(".header");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const mobileLayout = window.matchMedia("(max-width: 48rem)");

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.hidden = !isOpen;
}

function syncMenuLayout() {
  menuButton.hidden = !mobileLayout.matches;
  setMenuOpen(!mobileLayout.matches);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(navigation.hidden);
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (mobileLayout.matches && link) {
    const section = document.getElementById(link.hash.slice(1));
    setMenuOpen(false);
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileLayout.matches && !navigation.hidden) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

mobileLayout.addEventListener("change", syncMenuLayout);
syncMenuLayout();

function syncHeaderBackground() {
  header.classList.toggle("is-scrolled", window.scrollY > 0);
}

header.classList.add("is-enhanced");
window.addEventListener("scroll", syncHeaderBackground, { passive: true });
syncHeaderBackground();

const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroMessages = [...document.querySelectorAll(".hero-message")];
const heroToggle = document.querySelector(".hero-toggle");
const heroDots = document.querySelector(".hero-dots");
const slideDots = [...heroDots.children];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentSlide = 0;
let slideTimer;
let slideshowPaused = false;

function advanceHeroSlide() {
  for (let offset = 1; offset < heroSlides.length; offset++) {
    const next = (currentSlide + offset) % heroSlides.length;
    const incoming = heroSlides[next];
    if (!incoming.complete || !incoming.naturalWidth) continue;

    const outgoing = heroSlides[currentSlide];
    outgoing.classList.add("is-leaving");
    outgoing.classList.remove("is-current");
    incoming.classList.remove("is-leaving");
    incoming.classList.add("is-current");
    heroMessages[currentSlide].classList.remove("is-current");
    heroMessages[currentSlide].setAttribute("aria-hidden", "true");
    heroMessages[next].classList.add("is-current");
    heroMessages[next].removeAttribute("aria-hidden");
    slideDots[currentSlide].classList.remove("is-current");
    slideDots[next].classList.add("is-current");
    heroDots.setAttribute("aria-label", `スライド ${next + 1} / ${heroSlides.length}`);
    currentSlide = next;
    return;
  }
}

function syncHeroSlideshow() {
  window.clearInterval(slideTimer);
  heroToggle.hidden = reducedMotion.matches || heroSlides.length < 2;
  heroToggle.classList.toggle("is-paused", slideshowPaused);
  heroToggle.setAttribute("aria-label", slideshowPaused ? "スライドを再生" : "スライドを一時停止");
  if (!heroToggle.hidden && !slideshowPaused) {
    slideTimer = window.setInterval(advanceHeroSlide, 6000);
  }
}

heroToggle.addEventListener("click", () => {
  slideshowPaused = !slideshowPaused;
  syncHeroSlideshow();
});
reducedMotion.addEventListener("change", syncHeroSlideshow);
syncHeroSlideshow();
