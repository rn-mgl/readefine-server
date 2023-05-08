const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AnsweredRiddles = require("../../../models/answers/AnsweredRiddles");

const createAnswer = async (req, res) => {
  const { riddle_id, answer, duration } = req.body;
  const { id } = req.user;

  const answeredRiddles = new AnsweredRiddles(riddle_id, id, answer, duration);

  const data = await answeredRiddles.createAnswer();

  if (!data) {
    throw new BadRequestError(`Error in answering the riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredRiddles = async (req, res) => {
  const { id } = req.user;

  const answeredRiddles = await AnsweredRiddles.getAllAnsweredRiddles(id);

  if (!answeredRiddles) {
    throw new BadRequestError(`Error in getting all answered riddles. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredRiddles);
};

const getAnsweredRiddle = async (req, res) => {
  const { riddle_id } = req.params;

  const answeredRiddles = await AnsweredRiddles.getAnsweredRiddle(riddle_id);

  if (!answeredRiddles) {
    throw new BadRequestError(`Error in getting answered riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredRiddles);
};

module.exports = { createAnswer, getAllAnsweredRiddles, getAnsweredRiddle };
