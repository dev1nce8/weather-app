import Component from "../class/Component.js";
import searchBar from "./searchBar.js";

export default (function main() {
  const main = new Component("main", {
    id: "main",
  }).setup((root) => {
    root.children([searchBar]);
  });

  return main;
})();
