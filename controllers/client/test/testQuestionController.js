const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TestQuestion = require("../../../models/test/TestQuestion");

const getAllQuestions = async (req, res) => {
  const { test_id } = req.body;

  const testQuestion = await TestQuestion.getAllQuestions(test_id);

  if (!testQuestion) {
    throw new BadRequestError(`Error in getting all test question. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

const getQuestion = async (req, res) => {
  const { question_id } = req.params;

  const testQuestion = await TestQuestion.getQuestion(question_id);

  if (!testQuestion) {
    throw new BadRequestError(`Error in getting test question. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

module.exports = { getAllQuestions, getQuestion };
