const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AnsweredDangle = require("../../../models/answers/AnsweredDangle");

const createAnswer = async (req, res) => {
  const { question_id, answer } = req.body;
  const { id } = req.user;

  const answeredDangle = new AnsweredDangle(question_id, id, answer);

  const data = await answeredDangle.createAnswer();

  if (!data) {
    throw new BadRequestError(`Error in answering the dangle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredDangles = async (req, res) => {
  const { id } = req.user;

  const answeredDangle = await AnsweredDangle.getAllAnsweredDangles(id);

  if (!answeredDangle) {
    throw new BadRequestError(`Error in getting all answered dangles. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredDangle);
};

const getAnsweredDangle = async (req, res) => {
  const { dangle_id } = req.params;

  const answeredDangle = await AnsweredDangle.getAnsweredDangle(dangle_id);

  if (!answeredDangle) {
    throw new BadRequestError(`Error in getting answered dangle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredDangle);
};

module.exports = { createAnswer, getAllAnsweredDangles, getAnsweredDangle };
