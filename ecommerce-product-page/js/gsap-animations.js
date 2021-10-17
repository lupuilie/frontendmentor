import { swiper, lightboxSlider } from "./swiper.js";

const mobileNav = document.querySelector(".mobile-menu");
const mobileMenuWrapper = document.querySelector(
  ".mobile-menu .mobile-menu-wrapper"
);
const mobileMenuWidth = "auto";
const mobileNavOpen = document.querySelector("#mobile-nav-open");
const mobileNavClose = document.querySelector("#mobile-nav-close");

const cartDropdownToggleBtn = document.querySelector("#cart-dropdown-toggle");
const headerCart = document.querySelector("#header-cart-wrapper");

const lightbox = document.querySelector("#lightbox");
const lightboxCloseBtn = document.querySelector("#lightbox-close-btn");

/* Header -> Cart */
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

const closeHeaderCart = () => {
  // hide cart
  if (headerCart.dataset.visible === "1") {
    gsap.to(headerCart, { duration: 0.3, height: "0" });
    headerCart.dataset.visible = 0;
    return;
  }
};

cartDropdownToggleBtn.addEventListener("click", toggleHeaderCart);

document.addEventListener("click", (e) => {
  let targetEl = e.target; // clicked element
  const cartDropdownListItem = headerCart.closest(".list-item");
  const listItem = e.target.closest(".list-item");

  do {
    // If click is on cart -> return
    if (
      targetEl === headerCart ||
      targetEl === cartDropdownToggleBtn ||
      targetEl === listItem
    ) {
      return;
    }
    targetEl = targetEl.parentNode;
  } while (targetEl);

  // if cart is open, close it
  closeHeaderCart();
});

/* /Header -> Cart */

/* Mobile Navigation Menu */
const showMobileNav = () => {
  gsap.to(mobileNav, { width: "100%", duration: 0.2 });
  gsap.to(mobileMenuWrapper, { duration: 0.3, x: "50vw" });
};

const closeMobileNav = () => {
  gsap.to(mobileNav, { width: 0, duration: 0.1 });
  gsap.to(mobileMenuWrapper, { duration: 0.3, x: "-50vw" });
};

mobileNavOpen.addEventListener("click", showMobileNav);
mobileNavClose.addEventListener("click", closeMobileNav);

mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) closeMobileNav();
});
/* /Mobile Navigation Menu */

/* Lightbox */
lightboxCloseBtn.addEventListener("click", () => {
  hideLightbox();
});

swiper.on("click", (e) => {
  lightboxSlider.slideTo(swiper.clickedIndex);
  showLightbox();
});

const showLightbox = () =>
  gsap.to(lightbox, { duration: 0.2, css: { scaleX: 1, scaleY: 1 } });
const hideLightbox = () =>
  gsap.to(lightbox, { duration: 0.2, css: { scaleX: 0, scaleY: 0 } });
