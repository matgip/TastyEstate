const assert = require("assert");

class InvalidInputError extends Error {
  constructor(description, isOperational) {
    super(description);
    assert(description);
    this.description = description;
    this.isOperational = isOperational;

    Error.stackTraceLimit = 2;
  }

  get name() {
    return this.constructor.name;
  }
}

class ConnectionError extends Error {
  constructor(description, isOperational) {
    super(description);
    assert(description);
    this.description = description;
    this.isOperational = isOperational;

    Error.stackTraceLimit = 2;
  }

  get name() {
    return this.constructor.name;
  }
}

class CommandError extends Error {
  constructor() {
    super("The command was aborted");
  }
}

module.exports = {
  InvalidInputError,
  ConnectionError,
  CommandError,
};
