(function () {
  const measureAnchorForm = document.querySelector(".js-measure-anchor-form");
  if (measureAnchorForm) {
    const formInputs = measureAnchorForm.querySelectorAll("input");
    formInputs.forEach((formInput) => {
      formInput.addEventListener(
        "input",
        (event) => {
          let i = 0;
          let formFilling = true;
          do {
            formFilling = formInputs[i].value !== "";
            i++;
          } while (formFilling && i < formInputs.length);
          const laceLength = measureAnchorForm.querySelector(
            "#measureAnchorFormLaceLength"
          );
          const maximumThickness = measureAnchorForm.querySelector(
            "#measureAnchorFormMaximumThickness"
          );
          if (formFilling) {
            const hd = parseFloat(
              measureAnchorForm.querySelector("#measureAnchorFormThickness")
                .value
            );
            const ttol =
              parseFloat(
                measureAnchorForm.querySelector(
                  "#measureAnchorFormLayerThickness"
                ).value
              ) +
              parseFloat(
                measureAnchorForm.querySelector("#measureAnchorFormLayer").value
              );
            const hef = parseFloat(
              measureAnchorForm.querySelector("#measureAnchorFormDepth").value
            );
            const la = hd + ttol + hef;
            const maxHd = la - ttol - hef;

            const laceLengthMeasure = laceLength.dataset.unitMeasure;
            laceLength.value = laceLengthMeasure
              ? `${la} ${laceLengthMeasure}`
              : la;
            const maximumThicknessMeasure =
              maximumThickness.dataset.unitMeasure;
            maximumThickness.value = maximumThicknessMeasure
              ? `${maxHd} ${maximumThicknessMeasure}`
              : maxHd;
          } else {
            laceLength.value = "-";
            maximumThickness.value = "-";
          }
        },
        false
      );
    });
  }
})();
