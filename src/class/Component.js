export default class Component {
  #children;
  #setupFunc;
  #type;
  constructor(type, attr) {
    this.element = document.createElement(type);
    this.attr = attr;
    this.parent = null;
    this.#type = type;
    this.#children = [];
    this.#setupFunc = null;
  }

  on(event, fn) {
    this.element.addEventListener(event, fn);
  }

  setup(fn) {
    this.#setupFunc = fn ? fn : () => {};
    this.runSetup(this);
    return this;
  }

  render() {
    this.element = document.createElement(this.#type);
    this.runSetup(this);
    this.#appendChildren();
    return this.element;
  }

  children(childArray) {
    this.#children = childArray;
    return this.#children;
  }

  #setAttributes() {
    for (const key in this.attr) {
      const item = this.attr[key];
      this.element.setAttribute(key, item);
    }
  }

  #appendChildren() {
    this.#children.forEach((child) => {
      if (child instanceof Component) {
        child.parent = this;
        child.runSetup(child);
        this.element.append(child.render());
      } else {
        this.element.append(child);
      }
    });
  }

  runSetup() {
    this.#setAttributes();
    this.#setupFunc(this);
  }
}
