export default class PubSub {
  static events = {};

  static sub(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events.push(fn);
  }
}

export const events = {};
