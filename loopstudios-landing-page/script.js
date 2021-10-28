const openMobileMenu = document.querySelector("#open-mobile-menu");
const closeMobileMenu = document.querySelector("#mobile-menu-close");
const mobileMenu = document.querySelector("#mobile-menu");

const toggleMobileMenu = () => mobileMenu.classList.toggle("active");

openMobileMenu.addEventListener("click", toggleMobileMenu);
closeMobileMenu.addEventListener("click", toggleMobileMenu);
