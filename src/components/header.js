import Component from "../class/Component.js";

export default (function header() {
  const logo = new Component("h1").setup((node) => {
    node.html.innerText = "Weather App";
  });

  return new Component("header")
    .attributes({
      id: "header",
    })
    .setup((node) => {
      node.children(logo);
    });
})();
