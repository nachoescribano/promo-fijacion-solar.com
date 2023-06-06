(function () {
  let swiper = new Array(
    document.querySelectorAll("[class*=js-swiper-container]").length
  );

  function controlClassSlider(selector, method) {
    const swiperContainer = document.querySelector(selector);
    const swiperWrapper = swiperContainer && swiperContainer.children[0];
    if (!swiperContainer || !swiperWrapper) return;
    swiperWrapper.classList[method]("swiper-wrapper");
    for (let i = 0; i < swiperWrapper.children.length; i++) {
      swiperWrapper.children[i].classList[method]("swiper-slide");
    }
    if (method === "add") {
      swiperContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="swiper-pagination"></div>`
      );
    } else {
      const swiperPagination =
        swiperContainer.querySelector(".swiper-pagination");
      swiperContainer.removeChild(swiperPagination);
    }
  }
  function createSwiper(i) {
    if (!swiper[i]) {
      const swiperContainerOuter = document.querySelector(
        `.js-swiper-item-outer-container-${i}`
      );
      const cardInteractive = document.querySelector(
        `.js-swiper-container-${i} .js-index-cards-container--interactive`
      );
      const swiperItemsOuter =
        swiperContainerOuter &&
        swiperContainerOuter.querySelectorAll(".js-swiper-item-outer");
      if (swiperContainerOuter && swiperItemsOuter.length > 0) {
        console.log({ swiperContainerOuter });
        swiperItemsOuter.forEach((swiperItemOuter) => {
          swiperContainerOuter.appendChild(swiperItemOuter);
        });
      }
      controlClassSlider(`.js-swiper-container-${i}`, "add");
      const swiperContainer = document.querySelector(
        `.js-swiper-container-${i}`
      );
      const { slidesPerView, spaceBetween } = swiperContainer.dataset;
      swiper[i] = new Swiper(`.js-swiper-container-${i}`, {
        ...(slidesPerView ? { slidesPerView: parseFloat(slidesPerView) } : {}),
        ...(spaceBetween ? { spaceBetween: parseFloat(spaceBetween) } : {}),
        autoHeight: false, //enable auto height
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      if (cardInteractive) {
        const cardInteractiveChildren = cardInteractive.children;
        let e = 0;
        while (
          !cardInteractiveChildren[e].classList.contains(
            "index-card--interactive--active"
          )
        ) {
          e++;
        }
        swiper[i].pagination.bullets[e].click();
      }
    }
  }

  function destroySwiper(i) {
    if (swiper[i]) {
      if (
        swiper[i] &&
        swiper[i].eventsListeners &&
        Object.keys(swiper[i].eventsListeners).length !== 0
      ) {
        swiper[i].destroy();
      }
      swiper[i] = null;
      controlClassSlider(`.js-swiper-container-${i}`, "remove");
      const swiperContainerOuter = document.querySelector(
        `.js-swiper-item-outer-container-${i}`
      );
      const swiperItemsOuter =
        swiperContainerOuter &&
        swiperContainerOuter.querySelectorAll(".js-swiper-item-outer");
      const swiperContainer =
        document.querySelector(`.js-swiper-container-${i} .row`) ||
        document.querySelector(`.js-swiper-container-${i}`);
      if (swiperContainerOuter && swiperItemsOuter.length > 0) {
        swiperItemsOuter.forEach((swiperItemOuter) => {
          swiperContainer.appendChild(swiperItemOuter);
        });
      }
    }
  }

  function ControlShowSlider() {
    const mQuery = window.matchMedia("(min-width: 768px)");
    if (mQuery.matches && swiper[0]) {
      for (let i = 0; i < swiper.length; i++) {
        destroySwiper(i);
      }
    } else if (!mQuery.matches && !swiper[0]) {
      for (let i = 0; i < swiper.length; i++) {
        createSwiper(i);
      }
    }
  }
  ControlShowSlider();
  const throttledControlShowSlider = _.throttle(ControlShowSlider, 60);
  window.addEventListener("resize", throttledControlShowSlider);
  window.createSwiper = createSwiper;
  window.destroySwiper = destroySwiper;
})(window);
