const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Sorry, we have some technical problems. Please wait for a while.`,
  };

  if (err?.status === 504) {
    customError.statusCode = StatusCodes.GATEWAY_TIMEOUT;
    customError.msg = `The server is warming up, please wait and refresh the page.`;
  }

  if (err?.errno === 1062) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `Input for ${err.sqlMessage.split(" ")[2]} already exists`;
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorMiddleware;
