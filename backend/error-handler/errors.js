class InvalidInputError {
  constructor(description, isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.description = description;
    this.isOperational = isOperational;
  }
}

InvalidInputError.prototype = Object.create(Error.prototype);
InvalidInputError.prototype.constructor = InvalidInputError;

module.exports.InvalidInputError = InvalidInputError;
