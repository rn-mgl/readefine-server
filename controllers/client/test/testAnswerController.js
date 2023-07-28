const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TestAnswer = require("../../../models/test/TestAnswer");
const Test = require("../../../models/test/Test");

const getAllAnswers = async (req, res) => {
  const { test_id } = req.body;

  const ifExist = await Test.getTest(test_id);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to get the answer to does not exist.`);
  }

  const testAnswer = await TestAnswer.getAllAnswers(test_id);

  if (!testAnswer) {
    throw new BadRequestError(`There was a problem in getting all test answers.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

const getAnswer = async (req, res) => {
  const { answer_id } = req.params;

  const testAnswer = await TestAnswer.getAnswer(answer_id);

  if (!testAnswer) {
    throw new NotFoundError(`The test answer you are trying to get does not exist.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

module.exports = { getAllAnswers, getAnswer };
