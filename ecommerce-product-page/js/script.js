import "./gsap-animations.js";
import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";
const orderQty = document.querySelector("#order-qty-value");
const orderQtyMinus = document.querySelector("#order-qty-minus");
const orderQtyPlus = document.querySelector("#order-qty-plus");

orderQtyMinus.addEventListener("click", () =>
  +orderQty.value - 1 < 0 ? (orderQty.value = 0) : +orderQty.value--
);
orderQtyPlus.addEventListener("click", () => +orderQty.value++);

const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  lazy: {
    loadPrevNext: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
