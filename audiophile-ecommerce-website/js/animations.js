const mobileMenuToggler = document.querySelector(".menu-toggler");
const mobileMenu = document.querySelector(".mobile-menu");
const pageHeader = document.querySelector(".hero header") || 0;
const bodyOverlayVisible = false;

const toggleMobileMenu = () => {
  if (!mobileMenu.dataset.visible || mobileMenu.dataset.visible === "false") {
    mobileMenu.style.transform = "translateX(0)";
    mobileMenu.style.opacity = "1";
    mobileMenu.style.boxShadow = `0 0 0 100vh rgba(0,0,0,0.6)`;
    console.log(pageHeader.clientHeight);
    mobileMenu.dataset.visible = true;
    return;
  }
  if (mobileMenu.dataset.visible === "true") {
    mobileMenu.style.transform = "translateX(-100%)";
    mobileMenu.style.boxShadow = "none";
    // mobileMenu.style.opacity = "0";
    mobileMenu.dataset.visible = false;
  }
};

mobileMenuToggler.addEventListener("click", toggleMobileMenu);
