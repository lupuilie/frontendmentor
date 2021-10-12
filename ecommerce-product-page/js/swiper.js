import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";

import { products } from "./data.js";

export const swiper2 = new Swiper(".thumbs-slider", {
  spaceBetween: 20,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

export const swiper = new Swiper(".main-slider", {
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
  thumbs: {
    swiper: swiper2,
  },
});

// Add slides
products.forEach((product) => {
  swiper.appendSlide(`<div class="swiper-slide">
  <img src="${product.src}" />
</div>`);
  swiper2.appendSlide(`<div class="swiper-slide">
<img src="${product.thumb}" />
</div>`);
});
