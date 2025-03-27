export default class Component {
  static root = null;
  static events = {};
  constructor(type) {
    this.html = document.createElement(type);
    this.fn = null;
    this.attr = {};
  }

  setup(fn) {
    this.fn = fn ? fn : () => {};
    this.render();
    return this;
  }

  render() {
    this.html.innerHTML = "";
    this.#setAttr();
    if (!this.fn) {
      this.fn = () => {};
    }
    this.fn(this);
    return this;
  }

  string() {
    return this.html.outerHTML;
  }

  children(...children) {
    children.forEach((c) => {
      if (c instanceof Component) {
        c.render();
        this.html.append(c.html);
      } else if (typeof c === "string") {
        this.html.innerHTML += c;
      }
    });
  }

  on(event, fn) {
    this.html.addEventListener(event, fn);
    return this;
  }

  attributes(object) {
    this.attr = { ...this.attr, ...object };
    this.render();
    return this;
  }

  #setAttr() {
    for (const key in this.attr) {
      const item = this.attr[key];
      this.html.setAttribute(key, item);
    }
  }

  static emitter(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(fn);
  }

  static emit(event, ...args) {
    this.events[event].forEach((fn) => {
      fn(...args);
    });
  }

  static setRoot(id) {
    this.root = document.getElementById(id);
  }
  static append(...element) {
    this.root.append(...element);
  }
}
