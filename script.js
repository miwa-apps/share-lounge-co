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
  if (mobileLayout.matches && event.target.closest("a")) {
    const section = document.querySelector(event.target.hash);
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
