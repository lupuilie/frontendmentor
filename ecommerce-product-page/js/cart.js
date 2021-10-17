import { swiper } from "./swiper.js";
import { products } from "./data.js";

// State
let cart = [];

// DOM Elements
const cartContent = document.querySelector(
  "#header-cart-wrapper .cart-content"
);
const cartEmptyEl = document.querySelector(
  "#header-cart-wrapper .cart-content .cart-empty"
);
const currPriceEl = document.querySelector("#current-price");
const discountEl = document.querySelector("#discount");
const oldPriceEl = document.querySelector("#old-price");

const addToCartBtn = document.querySelector("#add-to-cart");
const cartQtyTooltip = document.querySelector("#cart-qty-tooltip");

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
  const cartIndex = cart.findIndex((prod) => prod.id === currentProd.id);

  // Product is not in cart
  if (cartIndex === -1) {
    cart.push({ ...currentProd, qty: +orderQty.value });
    addElementToCart({ ...currentProd, qty: +orderQty.value });
    document.querySelector("#order-qty-value").value = 1;
  } else {
    // Product is in cart -> update Quantity
    cart[cartIndex].qty += +orderQty.value;
    const itemTotal = cartContent.querySelector(
      `.list-item[data-product-id="${cart[cartIndex].id}"] .item-total`
    );
    itemTotal.innerText = `$${cart[cartIndex].price} x ${cart[cartIndex].qty}`;
    const b = document.createElement("b");
    b.appendChild(
      document.createTextNode("$" + cart[cartIndex].price * cart[cartIndex].qty)
    );
    itemTotal.appendChild(b);

    // Set qty selector to 1
    document.querySelector("#order-qty-value").value = 1;

    cartUpdated();
  }
});

function deleteFromCart(e) {
  const element = e.target.closest(".list-item");
  const productId = element.dataset.productId;
  const cartIndex = cart.findIndex((prod) => prod.id === +productId);

  element.remove();
  cart.splice(cartIndex, 1);
  cartUpdated();
}

function addElementToCart(prod) {
  if (!cartEmptyEl.classList.contains("hide") && cart.length > 0)
    cartEmptyEl.classList.add("hide");

  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.dataset.productId = prod.id;

  const item = document.createElement("div");
  item.classList.add("item");
  const thumbImg = document.createElement("img");
  thumbImg.src = prod.src;
  thumbImg.alt = "Product image";

  const itemDetails = document.createElement("div");
  itemDetails.classList.add("item-details");

  const p1 = document.createElement("p");
  p1.appendChild(document.createTextNode("Autumn Limited Edition Sneakers"));
  const p2 = document.createElement("p");
  p2.innerText = `$${prod.price} x ${prod.qty}`;
  const total = document.createElement("b");
  total.appendChild(document.createTextNode(`$${prod.price * prod.qty}`));
  p2.appendChild(total);
  p2.classList.add("item-total");

  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", deleteFromCart);
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
  cartUpdated();
}

const cartUpdated = () => {
  console.log("cart updated");
  const cartTotalQty = cart.reduce((a, c) => (a += c.qty), 0);

  if (!cartEmptyEl.classList.contains("hide") && cart.length > 0) {
    cartEmptyEl.classList.add("hide");
    cartQtyTooltip.classList.add("not-empty");
  }
  if (cart.length > 0) {
    cartQtyTooltip.innerText = cartTotalQty;
    if (!cartQtyTooltip.classList.contains("not-empty"))
      cartQtyTooltip.classList.add("not-empty");
  } else {
    cartEmptyEl.classList.remove("hide");
    cartQtyTooltip.classList.remove("not-empty");
  }
};
