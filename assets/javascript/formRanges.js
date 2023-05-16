(function () {
  const formRanges = document.querySelectorAll(".js-form-range");
  if (formRanges) {
    formRanges.forEach((formRange) => {
      const formRangeOutput = document.querySelector(`#${formRange.id}Output`);
      const updateFormRange = (event) => {
        const measure = formRangeOutput.dataset.unitMeasure;
        formRangeOutput.value = measure
          ? `${formRange.value} ${measure}`
          : formRange.value;
        const percentPos =
          ((formRange.value - formRange.min) * 100) / formRange.max;
        let sliderMargin;
        if (percentPos <= 50) {
          sliderMargin = ((50 - percentPos) * 0.75) / 50;
        } else {
          sliderMargin = ((percentPos - 50) * -0.75) / 50;
        }
        formRangeOutput.style.marginLeft = `calc(${percentPos}% - ${
          formRangeOutput.clientWidth / 2
        }px + ${sliderMargin}rem)`;
      };
      formRange.oninput = updateFormRange;
      formRange.value = 0;
      updateFormRange();
    });
  }
})();
