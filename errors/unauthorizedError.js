const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customAPIError");

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    this.message = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
