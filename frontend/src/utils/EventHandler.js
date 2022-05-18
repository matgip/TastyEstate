class EventHandler {
  #eventHandler;

  constructor() {
    this.#eventHandler = {};
  }

  addHandler(event, ...handlerFn) {
    this.#eventHandler[event] = [...handlerFn];
  }

  handle(event) {
    for (const handlerFn of this.#eventHandler[event]) {
      handlerFn();
    }
  }
}

export const $eventHandler = new EventHandler();
