(function () {
  const menuBtn = document.querySelector(".js-mobile-button");
  const header = document.querySelector(".js-header");
  const navMenu = document.querySelector(".js-navMenu");
  const navMenuList = document.querySelector(".js-navMenuList");
  const htmlContainer = document.querySelector("html");
  const separatorLogo = document.querySelector(".js-separtator-logo");
  const mainSectionImage = document.querySelector(".js-main-section__image");
  const buttonMenuMobile = document.querySelector(".js-buttonMenuMobile");

  let scrollBefore = 0;

  navMenuList.classList.remove("nav-menu__list--deactivate-animation");

  const menuBtnFn = () => {
    navMenuList.classList.toggle("nav-menu__list--show");
    navMenuList.classList.toggle("nav-menu__list--hide");
  };

  menuBtn.addEventListener("click", menuBtnFn, false);

  function goToAnchor(event) {
    let anchorLink = event.target.getAttribute("href");
    event.preventDefault();
    let tmpTarget = event.target;
    if (!anchorLink) {
      do {
        tmpTarget = tmpTarget.parentNode;
      } while (!tmpTarget.getAttribute("href"));
      anchorLink = tmpTarget.getAttribute("href");
    }
    const anchor = document.querySelector(
      '[id="' + anchorLink.substring(1) + '"]'
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
      navMenuList.classList.remove("nav-menu__list--show");
      buttonMenuMobile.classList.remove("menu-sections__button-menu--active");
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchorLink) => {
    anchorLink.addEventListener("click", goToAnchor, false);
    anchorLink.addEventListener("touchend", goToAnchor, false);
  });

  const throttled = _.throttle(onscroll, 60);
  window.addEventListener("scroll", throttled);
  onscroll();

  function onscroll() {
    const mQuery = window.matchMedia("(min-width: 992px)");

    const scrollPosition = htmlContainer.scrollTop;
    const mainSectionImageCoors = mainSectionImage.getBoundingClientRect();
    const headerHight = header.clientHeight;
    const controlHeightScroll =
      Math.abs(mainSectionImageCoors.top) + headerHight;
    const isAfterMainSection =
      controlHeightScroll >= mainSectionImageCoors.height;
    if (scrollPosition <= 0) {
      menuBtn.classList.add("mobile-button-menu--show");
      navMenuList.classList.add("nav-menu__list--hide");
      navMenu.classList.remove("nav-menu--white");
      separatorLogo.classList.add("separtator-logo--white");
      if (mQuery.matches) {
        header.classList.remove("header--force-bg-white");
        navMenu.classList.remove("nav-menu--force-white");
        separatorLogo.classList.remove("separtator-logo--force");
      }
      if (separatorLogo.classList.contains("separtator-logo--disappear")) {
        separatorLogo.classList.remove("separtator-logo--disappear");
      }
    } else if (scrollPosition <= scrollBefore && isAfterMainSection) {
      separatorLogo.classList.add("separtator-logo--disappear");
      navMenuList.classList.add("nav-menu__list--hide");
      menuBtn.classList.add("mobile-button-menu--show");
      separatorLogo.classList.remove("separtator-logo--disappear");
    } else if (isAfterMainSection) {
      separatorLogo.classList.add("separtator-logo--disappear");
      navMenuList.classList.remove("nav-menu__list--hide");
      menuBtn.classList.remove("mobile-button-menu--show");
      navMenu.classList.add("nav-menu--white");
      navMenuList.classList.remove("nav-menu__list--white");
      separatorLogo.classList.remove("separtator-logo--white");
    } else if (scrollPosition <= scrollBefore && !isAfterMainSection) {
      menuBtn.classList.add("mobile-button-menu--show");
      navMenuList.classList.add("nav-menu__list--hide");
      navMenu.classList.remove("nav-menu--white");
      separatorLogo.classList.add("separtator-logo--white");
      if (mQuery.matches) {
        header.classList.remove("header--force-bg-white");
        navMenu.classList.remove("nav-menu--force-white");
        separatorLogo.classList.remove("separtator-logo--force");
      }
      if (separatorLogo.classList.contains("separtator-logo--disappear")) {
        separatorLogo.classList.remove("separtator-logo--disappear");
      }
    } else {
      menuBtn.classList.add("mobile-button-menu--show");
      navMenuList.classList.add("nav-menu__list--hide");
      navMenu.classList.remove("nav-menu--white");
      separatorLogo.classList.add("separtator-logo--white");
      separatorLogo.classList.add("separtator-logo--disappear");
      if (mQuery.matches) {
        header.classList.remove("header--force-bg-white");
        navMenu.classList.remove("nav-menu--force-white");
        separatorLogo.classList.remove("separtator-logo--force");
      }
    }

    scrollBefore = scrollPosition;
  }

  buttonMenuMobile.addEventListener(
    "click",
    (e) => {
      buttonMenuMobile.classList.toggle("menu-sections__button-menu--active");
    },
    false
  );

  buttonMenuMobile.addEventListener(
    "blur",
    (e) => {
      buttonMenuMobile.classList.remove("menu-sections__button-menu--active");
    },
    false
  );
})();
