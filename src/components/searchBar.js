import Component from "../class/Component.js";

export default (function searchBar() {
  const input = new Component("input", {
    id: "search-input",
    type: "search",
  }).setup();

  const button = new Component("button", {
    id: "search-button",
  }).setup((btn) => {
    btn.children(["Search"]);
  });

  return new Component("div", {
    id: "search-bar",
  }).setup((root) => {
    root.children([input, button]);
  });
})();
