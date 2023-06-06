(function () {
  const panels = document.querySelectorAll(".js-solar-panel");
  const panelContainer = document.querySelector(".js-solar-panel__container");
  const spanTextPanel = document.querySelector(".js-solar-text-panel");
  const spanTextKit = document.querySelector(".js-solar-text-kit");
  const extensionCard = document.querySelector(".js-solar-extension-card");
  const extensionCardBase = extensionCard.cloneNode(true);
  const cardsContainer = document.querySelector(".js-solar-cards-container");
  const swiperCardsContainer = cardsContainer.parentElement;
  const jsSolarSwiper = document.querySelector(".js-solar-swiper");

  const jsSolarSwiperClassList = [...jsSolarSwiper.classList];
  const swiperId = Number(
    jsSolarSwiperClassList
      .find((text) => text.includes("js-swiper-container"))
      .split("-")[3]
  );
  const { textSingular, textPlural } = spanTextPanel.dataset;
  const { textKit, textKitExtension, textKitExtensionPlural } =
    spanTextKit.dataset;
  extensionCard.remove();
  let activePanels = document.querySelectorAll(
    ".js-solar-panel.solar-panel--active"
  );

  let totalActivePanels = activePanels?.length;

  window.requestAnimationFrame(() => {
    swiperCardsContainer?.swiper?.update();
  });

  const handlerPanelsOver = (event) => {
    let target = event.target;
    while (!target.classList.contains("js-solar-panel")) {
      target = target.parentElement;
    }
    const totalOverPanels = parseInt(target.dataset.solarPanel);
    panels.forEach((panel) => {
      if (parseInt(panel.dataset.solarPanel) > totalOverPanels) {
        panel.classList.remove("solar-panel--hover");
        panel.classList.remove("solar-panel--hover-active");
        if (parseInt(panel.dataset.solarPanel) <= totalActivePanels) {
          panel.classList.add("solar-panel--hover-active");
        }
      } else {
        panel.classList.remove("solar-panel--hover-active");
        panel.classList.add("solar-panel--hover");
      }
    });
  };
  const handlerPanelsClick = (event) => {
    let target = event.target;
    while (!target.classList.contains("js-solar-panel")) {
      target = target.parentElement;
    }
    totalActivePanels = parseInt(target.dataset.solarPanel);
    panels.forEach((panel) => {
      if (parseInt(panel.dataset.solarPanel) > totalActivePanels) {
        panel.classList.remove("solar-panel--active");
      } else {
        panel.classList.add("solar-panel--active");
      }
    });
    const panelsHoverActives = document.querySelectorAll(
      ".solar-panel--hover-active"
    );
    panelsHoverActives.forEach((panel) => {
      panel.classList.remove("solar-panel--hover-active");
    });
    let { solarPanel, solarOrigin, solarExtension } = target.dataset;
    solarPanel = parseInt(solarPanel);
    solarOrigin = parseInt(solarOrigin);
    solarExtension = parseInt(solarExtension);
    let solarPanelText;
    if (solarPanel === 1) {
      solarPanelText = textSingular.replace("{num}", solarPanel);
    } else {
      solarPanelText = textPlural.replace("{num}", solarPanel);
    }
    spanTextPanel.innerHTML = solarPanelText;
    let solarTextKit;
    let totalExtensionCard = document.querySelectorAll(
      ".js-solar-extension-card:not(.d-none)"
    );
    if (isNaN(solarExtension)) {
      solarTextKit = textKit.replace("{num}", solarOrigin);
      totalExtensionCard.forEach((el) => el.remove());
    } else {
      if (totalExtensionCard.length < solarExtension) {
        while (totalExtensionCard.length < solarExtension) {
          cardsContainer.appendChild(extensionCardBase.cloneNode(true));

          if (swiperCardsContainer?.swiper) {
            destroySwiper(swiperId);
            createSwiper(swiperId);
          }

          totalExtensionCard = document.querySelectorAll(
            ".js-solar-extension-card:not(.d-none)"
          );
        }
      } else {
        while (totalExtensionCard.length > solarExtension) {
          cardsContainer.removeChild(cardsContainer.lastChild);
          totalExtensionCard = document.querySelectorAll(
            ".js-solar-extension-card:not(.d-none)"
          );
        }
      }
      if (solarExtension > 1) {
        solarTextKit = textKitExtensionPlural.replace("{num}", solarOrigin);
      } else {
        solarTextKit = textKitExtension.replace("{num}", solarOrigin);
      }
      solarTextKit = solarTextKit.replace("{num2}", solarExtension);
    }
    spanTextKit.innerHTML = solarTextKit;
    swiperCardsContainer?.swiper?.update();
  };

  const handlerPanelContainerLeave = (event) => {
    panels.forEach((panel) => {
      panel.classList.remove("solar-panel--hover");
      panel.classList.remove("solar-panel--hover-active");
    });
  };
  panels.forEach((panel) => {
    panel.addEventListener("click", handlerPanelsClick);
    panel.addEventListener("mouseover", handlerPanelsOver);
  });
  panelContainer.addEventListener("mouseleave", handlerPanelContainerLeave);
})();
