const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const HeadSession = require("../../../models/users/HeadSession");
const Head = require("../../../models/users/Head");

const createSession = async (req, res) => {
  const { type, headId } = req.body;

  const head = await Head.getHead(headId);

  if (!head) {
    throw new NotFoundError(`The head does not exist.`);
  }

  const headSession = new HeadSession(headId, type);

  const newSession = await headSession.createSession();

  if (!newSession) {
    throw new BadRequestError(`Error in creating session. Try again later.`);
  }

  res.status(StatusCodes.OK).json(newSession);
};

module.exports = { createSession };
