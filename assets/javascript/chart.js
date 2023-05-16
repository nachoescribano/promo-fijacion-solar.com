import { graphicalData } from "./graphicalData.js";

(function () {
  const htmlDoc = document.querySelector("HTML");
  const currentLanguage = htmlDoc.lang;
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
  const chartData = {
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: "#003A6A",
        borderWidth: 0,
      },
    ],
  };

  const barOptions = {
    events: false,
    showTooltips: false,
    legend: {
      position: "bottom",
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            padding: 10,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
    animation: {
      duration: 500,
      easing: "easeInSine",
      onComplete: function () {
        let fontSize = 13;
        if (document.body.clientWidth > 1024) {
          fontSize = 18;
        }
        let ctx = this.chart.ctx;
        ctx.font = Chart.helpers.fontString(
          fontSize,
          "bold",
          Chart.defaults.global.defaultFontFamily
        );
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        for (let i = 0; i < this.data.datasets.length; i++) {
          const dataset = this.data.datasets[i];
          for (let e = 0; e < dataset.data.length; e++) {
            const model =
              dataset._meta[Object.keys(dataset._meta)[0]].data[e]._model;
            ctx.fillStyle = "#003A6A";
            ctx.fillText(
              Intl.NumberFormat("de-DE").format(dataset.data[e]),
              model.x,
              model.y - 5
            );
          }
        }
      },
    },
  };

  const buttonschartChange = document.querySelectorAll(".js-chart-change");
  const ctx = document.getElementById("myChart");
  let myBar;

  const throttled = _.throttle(onscroll, 60);
  window.addEventListener("scroll", throttled);
  onscroll();

  function onscroll() {
    if (
      ctx &&
      window.scrollY + window.innerHeight > ctx.offsetTop + ctx.offsetHeight &&
      !myBar
    ) {
      myBar = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: barOptions,
      });
      let buttonschartChangeActive;
      buttonschartChange.forEach((buttonchartChange, index) => {
        const chartChange = (event) => {
          if (event && event.type === "click") {
            event.preventDefault({ type: "none" });
          }
          if (buttonschartChangeActive === buttonchartChange) return;
          buttonschartChangeActive &&
            buttonschartChangeActive.classList.remove("icon__link--active");
          buttonchartChange.classList.add("icon__link--active");
          buttonschartChangeActive = buttonchartChange;
          const selectedGraphical =
            graphicalData[buttonchartChange.dataset.type];
          myBar.data.labels = selectedGraphical.labels;
          myBar.data.datasets.forEach((dataset, index) => {
            dataset.label =
              selectedGraphical.datasets[index].label[currentLanguage];
            dataset.data = selectedGraphical.datasets[index].data;
            delete myBar.options.scales.yAxes[0].ticks.max;
          });
          myBar.update();
          const ticks = myBar.boxes.find((box) => box.id === "y-axis-0").ticks;
          if (ticks.length < 2) return;
          const tickStep = parseFloat(ticks[0]) - parseFloat(ticks[1]);
          myBar.options.scales.yAxes[0].ticks.max =
            parseFloat(ticks[0]) + tickStep;
          myBar.update();
        };
        if (index === 0) {
          chartChange();
        }
        buttonchartChange.addEventListener("click", chartChange, false);
        buttonchartChange.addEventListener(
          "touchstart",
          chartChange,
          supportsPassive ? { passive: true } : false
        );
      });
    }
  }
})(graphicalData);
