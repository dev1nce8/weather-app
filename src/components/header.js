import Component from "../class/Component.js";

export default (function header() {
  const logo = new Component("h1", {
    id: "main-logo",
  }).setup((logo) => logo.children(["Weather App"]));

  return new Component("header", {
    id: "header",
  }).setup((root) => {
    root.children([logo]);
  });
})();
