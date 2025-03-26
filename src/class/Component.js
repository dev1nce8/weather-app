export default class Component {
  #children;
  #state;
  #setupfunc;
  constructor(type, attr) {
    this.element = document.createElement(type);
    this.#children = [];
    this.attr = attr;
    this.#state = {};
    this.#setupfunc = null;

    for (const key in this.attr) {
      const item = this.attr[key];
      this.element.setAttribute(key, item);
    }
  }

  on(event, fn) {
    this.element.addEventListener(event, fn);
  }

  setup(fn) {
    this.#setupfunc = fn ? fn : () => {};
    this.#setupfunc(this);

    return this;
  }

  render() {
    this.element.innerHTML = "";
    this.#children.forEach((child) => {
      if (child instanceof Component) {
        this.element.append(child.render());
      } else {
        this.element.append(child);
      }
    });
    return this.element;
  }

  setState(key, value) {
    this.#state[key] = value;
    if (this.#setupfunc) {
      this.#setupfunc(this);
      this.render();
    }
  }

  getState(key) {
    return this.#state[key];
  }

  children(childArray) {
    this.#children = childArray;
    return this.#children;
  }
}
