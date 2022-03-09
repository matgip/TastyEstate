const httpStatus = require("http-status-codes");
const { InvalidInputError, ConnectionError } = require("../errors");

const getErrorCode = (err) => {
  if (err instanceof InvalidInputError) {
    return httpStatus.StatusCodes.BAD_REQUEST;
  } else if (err instanceof ConnectionError) {
    return httpStatus.StatusCodes.SERVICE_UNAVAILABLE;
  } else {
    return httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

const getReason = (code) => {
  return httpStatus.getReasonPhrase(code);
};

module.exports = {
  getErrorCode,
  getReason,
};
