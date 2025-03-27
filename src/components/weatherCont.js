import Component from "../class/Component.js";
import { constant, events } from "../modules/enums.js";
import getWeather from "../modules/getWeather.js";
import icon from "./icon.js";
import toggleIcon from "../asset/icons/toggle.svg";
import { loading } from "../modules/globals.js";

export default (function weatherCont() {
  let weatherData = null;
  let iconImg = null;
  let metric = constant.celsius;

  const metricButton = new Component("button")
    .attributes({ id: "metric-button" })
    .setup((node) => {
      node.children(
        metric,
        new Component("img").attributes({ src: toggleIcon }),
      );
    })
    .render();

  metricButton.on("click", async () => {
    metric =
      metric === constant.celsius ? constant.farenheit : constant.celsius;
    loading.value = true;
    weatherCont.render();
    const data = await getWeather(
      document.querySelector("input[type='search']").value,
      metric,
    );
    Component.emit(events.weatherDataFetched, data);
  });

  const weatherCont = new Component("section").attributes({
    id: "weather-cont",
    class: "hidden",
  });

  const address = new Component("h2")
    .attributes({ id: "city-name" })
    .setup((node) => {
      node.children(`${weatherData?.address}`, metricButton);
    })
    .render();

  const conditions = new Component("p")
    .attributes({ id: "city-condition" })
    .setup((node) => {
      node.children(
        `<span>Conditions</span>`,
        `<span id="condition-desc">${weatherData?.conditions} ${iconImg?.string()}</span>`,
      );
    })
    .render();

  const temp = new Component("p")
    .attributes({ id: "city-temp" })
    .setup((node) => {
      node.children(
        `<span>Temperature</span>`,
        `<span>${weatherData?.temp} ${metric === constant.celsius ? "°C" : "°F"}</span>`,
      );
    })
    .render();

  const tz = new Component("p")
    .attributes({ id: "city-tz" })
    .setup((node) => {
      node.children(
        `<span>Timezone</span>`,
        `<span>${weatherData?.timezone}</span>`,
      );
    })
    .render();

  const dt = new Component("p")
    .attributes({ id: "city-dt" })
    .setup((node) => {
      node.children(
        `<span>Last Update</span>`,
        `<span>${weatherData?.updatedAt}</span>`,
      );
    })
    .render();

  const sunrise = new Component("p")
    .attributes({ id: "city-sunrise" })
    .setup((node) => {
      node.children(
        `<span>Sunrise</span>`,
        `<span>${weatherData?.sunrise}</span>`,
      );
    })
    .render();

  const sunset = new Component("p")
    .attributes({ id: "city-sunset" })
    .setup((node) => {
      node.children(
        `<span>Sunset</span>`,
        `<span>${weatherData?.sunset}</span>`,
      );
    })
    .render();

  Component.emitter(events.weatherDataFetched, async (data) => {
    loading.value = false;
    weatherData = data;
    await import(`../asset/icons/${data.icon}.svg`).then((src) => {
      iconImg = icon(src);
    });
    weatherCont.render();
  });

  return weatherCont
    .setup((node) => {
      if (loading.value) {
        node.children("<span>Loading.. Please Wait</span>");
      } else {
        node.children(address, conditions, temp, tz, dt, sunrise, sunset);
      }
    })
    .render();
})();
