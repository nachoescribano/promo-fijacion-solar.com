(function () {
  const tabInteractive = document.querySelector(".js-tab-interactive");
  if (tabInteractive) {
    function activateTab(event) {
      if (this.getAttribute("aria-selected") === "true") return;
      const actualActiveTab = tabInteractive.querySelector(
        "[aria-selected=true]"
      );
      if (actualActiveTab) {
        actualActiveTab.setAttribute("aria-selected", "false");
        const actualActivePanel = tabInteractive.querySelector(
          `#${actualActiveTab.getAttribute("aria-controls")}`
        );
        actualActivePanel.classList.add("hidden");
      }
      this.setAttribute("aria-selected", "true");
      const newActivePanel = tabInteractive.querySelector(
        `#${this.getAttribute("aria-controls")}`
      );
      newActivePanel.classList.remove("hidden");
    }

    function generateEventListener(eventName) {
      document.addEventListener(
        eventName,
        (event) => {
          const elements = tabInteractive.querySelectorAll("[role=tab]");
          const path = event.composedPath();
          path.forEach((node) => {
            elements.forEach((elem) => {
              if (node === elem) {
                activateTab.call(elem, event);
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
