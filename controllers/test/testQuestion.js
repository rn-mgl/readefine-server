const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const TestQuestion = require("../../models/test/TestQuestion");

const createQuestion = async (req, res) => {
  const { test_id } = req.params;
  const { id } = req.user;
  const { question } = req.body;

  const testQuestion = new TestQuestion(test_id, question, id);

  const data = await testQuestion.createQuestion();

  if (!data) {
    throw new BadRequestError(`Error in creating question. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateQuestion = async (req, res) => {
  const { question_id } = req.params;
  const { id } = req.user;
  const { question } = req.body;

  const testQuestion = await TestQuestion.updateQuestion(question_id, question, id);

  if (!testQuestion) {
    throw new BadRequestError(`Error in updating question. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

const deleteQuestion = async (req, res) => {
  const { question_id } = req.params;

  const testQuestion = await TestQuestion.deleteQuestion(question_id);

  if (!testQuestion) {
    throw new BadRequestError(`Error in deleting test question. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

const getAllQuestions = async (req, res) => {
  const { test_id } = req.params;

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

module.exports = { createQuestion, updateQuestion, deleteQuestion, getAllQuestions, getQuestion };
