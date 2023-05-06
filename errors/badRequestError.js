const CustomAPIError = require("./customAPIError");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
