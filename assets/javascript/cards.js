(function () {
  const cardsContainerInteractive = document.querySelector(
    ".js-index-cards-container--interactive"
  );
  if (cardsContainerInteractive) {
    function activeCard(event) {
      const activeItem = cardsContainerInteractive.querySelector(
        ".index-card--interactive--active"
      );
      const activeID = activeItem.dataset.showId;

      activeItem.classList.remove("index-card--interactive--active");
      const fullCardVisible = document.querySelector(
        "[data-id=" + activeID + "]"
      );
      fullCardVisible && fullCardVisible.classList.add("index-card--hidden");
      this.classList.add("index-card--interactive--active");
      const newActiveID = this.dataset.showId;
      const newFullCardVisible = document.querySelector(
        "[data-id=" + newActiveID + "]"
      );
      if (newFullCardVisible) {
        newFullCardVisible.classList.remove("index-card--hidden");
        newFullCardVisible
          .querySelectorAll("[class*=js-swiper-container-]")
          .forEach((swiperSlider) => {
            if (swiperSlider.swiper) {
              swiperSlider.swiper.update();
            }
          });
      }
    }
    function generateEventListener(eventName) {
      document.addEventListener(
        eventName,
        (event) => {
          const elements = cardsContainerInteractive.querySelectorAll(
            ".js-index-cards--interactive"
          );
          const path = event.composedPath();
          path.forEach((node) => {
            elements.forEach((elem) => {
              if (node === elem) {
                activeCard.call(elem, event);
              }
            });
          });
        },
        true
      );
    }

    generateEventListener("click");
    generateEventListener("touchstart");
  }
})();
