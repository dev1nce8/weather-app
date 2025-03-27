import Component from "../class/Component.js";
import searchBar from "./searchBar.js";
import weatherCont from "./weatherCont.js";

export default (function main() {
  return new Component("main")
    .attributes({ id: "main" })
    .setup((node) => {
      node.children(searchBar, weatherCont);
    })
    .render();
})();
