import "./gsap-animations.js";
import { swiper, swiper2 } from "./swiper.js";
import { products } from "./data.js";

// App State
let cart = [];

// DOM Elements
const currPriceEl = document.querySelector("#current-price");
const discountEl = document.querySelector("#discount");
const oldPriceEl = document.querySelector("#old-price");

const addToCartBtn = document.querySelector("#add-to-cart");

const cartContent = document.querySelector(
  "#header-cart-wrapper .cart-content"
);
const cartEmptyEl = document.querySelector(
  "#header-cart-wrapper .cart-content .cart-empty"
);

// Quantity Selector
const orderQty = document.querySelector("#order-qty-value");
const orderQtyMinus = document.querySelector("#order-qty-minus");
const orderQtyPlus = document.querySelector("#order-qty-plus");

orderQtyMinus.addEventListener("click", () =>
  +orderQty.value - 1 < 1 ? (orderQty.value = 1) : +orderQty.value--
);
orderQtyPlus.addEventListener("click", () => +orderQty.value++);

// Update product prices and discounts
const idx = swiper.realIndex;
currPriceEl.innerText = products[idx].price.toFixed(2);
discountEl.innerText = `${products[idx].discount}%`;
oldPriceEl.innerText = products[idx].old_price.toFixed(2);

let currentProd = { id: idx, ...products[idx] };

swiper.on("slideChangeTransitionEnd", () => {
  currPriceEl.innerText = products[swiper.realIndex].price.toFixed(2);
  discountEl.innerText = `${products[swiper.realIndex].discount}%`;
  oldPriceEl.innerText = products[swiper.realIndex].old_price.toFixed(2);

  currentProd = { id: swiper.realIndex, ...products[swiper.realIndex] };
});

// Add items to cart
addToCartBtn.addEventListener("click", () => {
  // Selected product is already in cart
  const cartIndex = cart.findIndex((prod) => prod.id === currentProd.id);

  if (cartIndex === -1) {
    cart.push({ ...currentProd, qty: 1 });
    addElementToCart({ ...currentProd, qty: 1 });
  } else {
    cart[cartIndex].qty++;
  }
  console.log(cart);
});

function addElementToCart(prod) {
  if (!cartEmptyEl.classList.contains("hide") && cart.length > 0)
    cartEmptyEl.classList.add("hide");

  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  const item = document.createElement("div");
  item.classList.add("item");
  const thumbImg = document.createElement("img");
  thumbImg.src = prod.src;
  thumbImg.alt = "PRoduct image";
  const itemDetails = document.createElement("div");
  itemDetails.classList.add("item-details");
  const p1 = document.createElement("p");
  p1.appendChild(document.createTextNode("Autumn Limited Edition Sneakers"));
  const p2 = document.createElement("p");
  p2.innerHTML = `${"123"} x ${1} <b>$${123}</b>`;
  const deleteBtn = document.createElement("button");
  const btnImg = document.createElement("img");
  btnImg.src = "./images/icon-delete.svg";
  btnImg.alt = "Delete Item from Cart";

  deleteBtn.appendChild(btnImg);
  itemDetails.appendChild(p1);
  itemDetails.appendChild(p2);
  item.appendChild(thumbImg);
  item.appendChild(itemDetails);
  listItem.appendChild(item);
  listItem.appendChild(deleteBtn);

  cartContent.appendChild(listItem);
}
