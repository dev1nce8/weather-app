import Component from "../class/Component.js";

export default function icon(src) {
  const icon = new Component("img").attributes({
    src: src.default,
    id: "icon",
  });

  return icon.render();
}
