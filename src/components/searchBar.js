import Component from "../class/Component.js";
import { events } from "../modules/enums.js";
import getWeather from "../modules/getWeather.js";
import { loading } from "../modules/globals.js";
import weatherCont from "./weatherCont.js";

export default (function searchBar() {
  const input = new Component("input").attributes({ type: "search" }).render();
  const button = new Component("button")
    .setup((node) => {
      node.html.innerText = "Search";
    })
    .on("click", async () => {
      weatherCont.attributes({ class: "" });
      loading.value = true;
      weatherCont.render();
      const weatherData = await getWeather(input.html.value);
      Component.emit(events.weatherDataFetched, weatherData);
    })
    .render();

  return new Component("div")
    .attributes({ id: "search-bar" })
    .setup((node) => {
      node.children(input, button);
    })
    .render();
})();
