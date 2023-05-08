const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TestAnswer = require("../../../models/test/TestAnswer");

const getAllAnswers = async (req, res) => {
  const { test_id } = req.body;

  const testAnswer = await TestAnswer.getAllAnswers(test_id);

  if (!testAnswer) {
    throw new BadRequestError(`Error in getting all test answers. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

const getAnswer = async (req, res) => {
  const { answer_id } = req.params;

  const testAnswer = await TestAnswer.getAnswer(answer_id);

  if (!testAnswer) {
    throw new BadRequestError(`Error in getting test answers. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

module.exports = { getAllAnswers, getAnswer };
