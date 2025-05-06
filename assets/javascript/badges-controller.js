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

  function smoothScrollTo(targetY, duration = 1000) {
    const startY = window.pageYOffset;
    const distanceY = targetY - startY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      window.scrollTo(0, startY + distanceY * ease);
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }

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

    if (activeContainer) {
      setTimeout(() => {
        const yOffset = -320;
        const y =
          activeContainer.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        smoothScrollTo(y, 1200); // duración en milisegundos
      }, 100);
    }

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
