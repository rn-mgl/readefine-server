const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TestQuestion = require("../../../models/test/TestQuestion");
const Test = require("../../../models/test/Test");

const getAllQuestions = async (req, res) => {
  const { testId } = req.query;

  const ifExist = await Test.getTest(testId);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to view does not exist.`);
  }

  const testQuestion = await TestQuestion.getAllQuestions(testId);

  if (!testQuestion) {
    throw new BadRequestError(`There was a problem in getting the questions.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

const getQuestion = async (req, res) => {
  const { question_id } = req.params;

  const testQuestion = await TestQuestion.getQuestion(question_id);

  if (!testQuestion) {
    throw new NotFoundError(`The test question you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

module.exports = { getAllQuestions, getQuestion };
