const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AnsweredDangle = require("../../../models/answers/AnsweredDangle");
const Words = require("../../../models/words/Words");

const createAnswer = async (req, res) => {
  const { wordId, answer, timer } = req.body;
  const { id } = req.user;

  const ifExist = await Words.getWordById(wordId);

  if (!ifExist) {
    throw new NotFoundError(`The word associated to the dangle does not exist.`);
  }

  const answeredDangle = new AnsweredDangle(id, wordId, answer, timer);

  const data = await answeredDangle.createAnswer();

  if (!data) {
    throw new BadRequestError(`There was a problem in answering the dangle.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredDangles = async (req, res) => {
  const { id } = req.user;

  const answeredDangle = await AnsweredDangle.getAllAnsweredDangles(id);

  if (!answeredDangle) {
    throw new BadRequestError(`There was a problem in getting all your answered dangles.`);
  }

  res.status(StatusCodes.OK).json(answeredDangle);
};

const getAnsweredDangle = async (req, res) => {
  const { dangle_id } = req.params;

  const answeredDangle = await AnsweredDangle.getAnsweredDangle(dangle_id);

  if (!answeredDangle) {
    throw new NotFoundError(`The answer to the dangle you are trying to get does not exist.`);
  }

  res.status(StatusCodes.OK).json(answeredDangle);
};

module.exports = { createAnswer, getAllAnsweredDangles, getAnsweredDangle };
