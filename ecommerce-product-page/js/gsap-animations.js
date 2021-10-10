const mobileNav = document.querySelector(".mobile-menu");
const mobileNavOpen = document.querySelector("#mobile-nav-open");
const mobileNavClose = document.querySelector("#mobile-nav-close");

const cartDropdownToggleBtn = document.querySelector("#cart-dropdown-toggle");
const headerCart = document.querySelector("#header-cart-wrapper");

const showMobileNav = () =>
  gsap.to(mobileNav, { duration: 0.4, width: "100%" });

const closeMobileNav = () => gsap.to(mobileNav, { duration: 0.3, width: "0" });

const toggleHeaderCart = () => {
  // show cart
  if (headerCart.dataset.visible === "0") {
    gsap.to(headerCart, { duration: 0.3, height: "auto" });
    headerCart.dataset.visible = 1;
    return;
  }
  // hide cart
  if (headerCart.dataset.visible === "1") {
    gsap.to(headerCart, { duration: 0.3, height: "0" });
    headerCart.dataset.visible = 0;
    return;
  }
};

mobileNavOpen.addEventListener("click", showMobileNav);
mobileNavClose.addEventListener("click", closeMobileNav);
mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) closeMobileNav();
});

cartDropdownToggleBtn.addEventListener("click", toggleHeaderCart);
