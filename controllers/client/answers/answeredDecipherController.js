const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AnsweredDecipher = require("../../../models/answers/AnsweredDecipher");
const Words = require("../../../models/words/Words");

const createAnswer = async (req, res) => {
  const { wordId, answer, timer } = req.body;
  const { id } = req.user;

  const ifExist = await Words.getWordById(wordId);

  if (!ifExist) {
    throw new NotFoundError(`The word associated to the dangle does not exist.`);
  }

  const answeredDecipher = new AnsweredDecipher(id, wordId, answer, timer);

  const data = await answeredDecipher.createAnswer();

  if (!data) {
    throw new BadRequestError(`There was a problem in answering the decipher.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredDeciphers = async (req, res) => {
  const { id } = req.user;

  const answeredDecipher = await AnsweredDecipher.getAllAnsweredDeciphers(id);

  if (!answeredDecipher) {
    throw new BadRequestError(`There was a problem in getting all your answered deciphers.`);
  }

  res.status(StatusCodes.OK).json(answeredDecipher);
};

const getAnsweredDecipher = async (req, res) => {
  const { decipher_id } = req.params;

  const answeredDecipher = await AnsweredDecipher.getAnsweredDecipher(decipher_id);

  if (!answeredDecipher) {
    throw new NotFoundError(`The answer to the decipher you are trying to get does not exist.`);
  }

  res.status(StatusCodes.OK).json(answeredDecipher);
};

module.exports = { createAnswer, getAllAnsweredDeciphers, getAnsweredDecipher };
