(function () {
  // Test via a getter in the options object to see if the passive property is accessed
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {}

  const filterCovering = document.querySelector(".js-filterCovering");
  const filterBar = document.querySelector(".js-filterBar");

  function filteringCover(val) {
    const allItems = filterCovering.querySelectorAll("[data-covering]");
    const findRegExp = val && new RegExp(val, "i");
    allItems.forEach((item) => {
      if (val && !findRegExp.test(item.dataset.covering)) {
        item.classList.add("filter__item--hide");
        item.classList.remove("filter__item--show");
      } else {
        item.classList.remove("filter__item--hide");
        item.classList.add("filter__item--show");
      }
    });
    // Si estamos en vista movil swiper[0] contiene el slider de elementos filtrados y lo actualiza después de aplicar el filtro para tener el número de bullets correcto.
    filterCovering.parentElement.swiper &&
      filterCovering.parentElement.swiper.update();
  }

  function findFilterButton(target) {
    let internalTarget = target;
    while (
      !(
        internalTarget &&
        internalTarget.classList &&
        internalTarget.classList.contains("filter-button")
      ) &&
      internalTarget
    ) {
      internalTarget = internalTarget.parentNode;
    }

    return internalTarget;
  }

  function AddFilter(event) {
    const item = findFilterButton(event.target);
    if (item) {
      const filter = item.dataset.filter;
      filteringCover(filter === "Reset" ? false : filter);
      activateStyleFilter(filter === "Reset" ? false : item);
    }
  }

  let showingInfoFilter = false;

  // Función para expandir el botón de filtro y mostrar el texto que tiene dentro.
  function showInfoFilter(event) {
    const item = findFilterButton(event.target);
    if (item) {
      if (item.style.width) return;
      const filterButtonText = item.querySelector(".filter-button__text");
      if (filterButtonText) {
        // item.style.transition = "";
        item.style.width = "auto";
        const newWidth = filterButtonText.getBoundingClientRect().width;
        item.style.width = "";
        window.requestAnimationFrame(() => {
          item.style.width = `${newWidth}px`;
        });
      }
    }
  }

  function activateStyleFilter(item) {
    const activeClass = "filter-button--active";
    const actualFilter = filterBar.querySelector("." + activeClass);
    actualFilter && actualFilter.classList.remove(activeClass);
    if (item) item.classList.add(activeClass);
  }

  function hideInfoFilter(event) {
    const item = event.fromElement;
    if (item.style.width) item.style.width = "";
  }
  const throttledShowInfoFilter = _.throttle(showInfoFilter, 60);
  const throttledHideInfoFilter = _.throttle(hideInfoFilter, 60);
  filterBar.addEventListener("click", AddFilter, false);
  filterBar.addEventListener(
    "touchstart",
    AddFilter,
    supportsPassive ? { passive: true } : false
  );
  filterBar.querySelectorAll(".filter-button").forEach((filterButton) => {
    filterButton.addEventListener("mouseover", throttledShowInfoFilter, false);
    filterButton.addEventListener("mouseleave", throttledHideInfoFilter, false);
  });
})();
