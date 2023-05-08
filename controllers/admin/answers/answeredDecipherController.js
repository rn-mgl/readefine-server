const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AnsweredDecipher = require("../../../models/answers/AnsweredDecipher");

const createAnswer = async (req, res) => {
  const { question_id, answer } = req.body;
  const { id } = req.user;

  const answeredDecipher = new AnsweredDecipher(question_id, id, answer);

  const data = await answeredDecipher.createAnswer();

  if (!data) {
    throw new BadRequestError(`Error in answering the decipher. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredDeciphers = async (req, res) => {
  const { id } = req.user;

  const answeredDecipher = await AnsweredDecipher.getAllAnsweredDeciphers(id);

  if (!answeredDecipher) {
    throw new BadRequestError(`Error in getting all answered deciphers. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredDecipher);
};

const getAnsweredDecipher = async (req, res) => {
  const { decipher_id } = req.params;

  const answeredDecipher = await AnsweredDecipher.getAnsweredDecipher(decipher_id);

  if (!answeredDecipher) {
    throw new BadRequestError(`Error in getting answered decipher. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredDecipher);
};

module.exports = { createAnswer, getAllAnsweredDeciphers, getAnsweredDecipher };
