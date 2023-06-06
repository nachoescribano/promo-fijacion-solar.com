(function () {
  const badges = document.querySelectorAll(".js-badge");
  const containers = document.querySelectorAll(
    ".js-badged-container-controlled"
  );
  let activeBadge = document.querySelector(
    ".js-badge.badges-list__item--active"
  );

  let selectedId = activeBadge?.dataset.containerId;
  let activeContainer = document.querySelector(
    `.js-badged-container-controlled[data-id="${selectedId}"]`
  );
  activeContainer?.classList.remove("d-none");
  const handlerBagdeClick = (event) => {
    if (event.target === activeBadge) return;
    activeBadge?.classList.remove("badges-list__item--active");
    selectedId = event.target.dataset.containerId;
    activeBadge = event.target;
    activeBadge.classList.add("badges-list__item--active");
    activeContainer?.classList.add("d-none");
    activeContainer = document.querySelector(
      `.js-badged-container-controlled[data-id="${selectedId}"]`
    );
    activeContainer?.classList.remove("d-none");
    const swiperContainer = activeContainer?.querySelector(".swiper-container");
    swiperContainer?.swiper?.update();
  };
  badges.forEach((badge) => {
    badge.addEventListener("click", handlerBagdeClick);
  });
  window.requestAnimationFrame(() => {
    const swiperContainer = activeContainer?.querySelector(".swiper-container");
    swiperContainer?.swiper?.update();
  });
})();
