import Component from "../class/Component.js";

export default (function weather() {
  return new Component("section", {
    id: "weather",
    class: "hidden",
  }).setup((root) => {
    root.children(["Weather Result"]);
  });
})();
