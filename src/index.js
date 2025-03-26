import "./css/vars.css";
import "./css/reset.css";
import "./css/style.css";
import Component from "./class/Component.js";
import header from "./components/header.js";
import main from "./components/main.js";
import getWeather from "./modules/getWeather.js";

const app = new Component("div", {
  id: "app",
});

app.setup(() => {
  app.children([header, main]);
});

getWeather("Manila");

document.querySelector("body").append(app.render());
