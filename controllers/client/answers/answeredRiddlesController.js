const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AnsweredRiddles = require("../../../models/answers/AnsweredRiddles");
const Riddles = require("../../../models/minigames/Riddles");

const createAnswer = async (req, res) => {
  const { riddleId, answer, timer } = req.body;
  const { id } = req.user;

  const ifExist = await Riddles.getRiddle(riddleId);

  if (!ifExist) {
    throw new NotFoundError(`The riddle you are trying to answer does not exist.`);
  }

  const answeredRiddles = new AnsweredRiddles(riddleId, id, answer, timer);

  const data = await answeredRiddles.createAnswer();

  if (!data) {
    throw new BadRequestError(`There was a problem in answering the riddle.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredRiddles = async (req, res) => {
  const { id } = req.user;

  const answeredRiddles = await AnsweredRiddles.getAllAnsweredRiddles(id);

  if (!answeredRiddles) {
    throw new BadRequestError(`There was a problem in getting all of your answered riddles.`);
  }

  res.status(StatusCodes.OK).json(answeredRiddles);
};

const getAnsweredRiddle = async (req, res) => {
  const { riddle_id } = req.params;

  const answeredRiddles = await AnsweredRiddles.getAnsweredRiddle(riddle_id);

  if (!answeredRiddles) {
    throw new NotFoundError(`The answered riddle you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(answeredRiddles);
};

module.exports = { createAnswer, getAllAnsweredRiddles, getAnsweredRiddle };
