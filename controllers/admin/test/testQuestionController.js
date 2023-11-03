const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TestQuestion = require("../../../models/test/TestQuestion");
const Test = require("../../../models/test/Test");

const createQuestion = async (req, res) => {
  const { test_id, question } = req.body;

  const ifExist = await Test.getTest(test_id);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to add a question to does not exist.`);
  }

  const testQuestion = new TestQuestion(test_id, question);

  const data = await testQuestion.createQuestion();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the test question.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateQuestion = async (req, res) => {
  const { question_id } = req.params;
  const { question } = req.body;

  const ifExist = await TestQuestion.getQuestion(question_id);

  if (!ifExist) {
    throw new NotFoundError(`The test question you are updating does not exist.`);
  }

  const testQuestion = await TestQuestion.updateQuestion(question_id, question);

  if (!testQuestion) {
    throw new BadRequestError(`There was a problem in updating the test question.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

const deleteQuestion = async (req, res) => {
  const { question_id } = req.params;

  const ifExist = await TestQuestion.getQuestion(question_id);

  if (!ifExist) {
    throw new NotFoundError(`The test question you are deleting does not exist.`);
  }

  const testQuestion = await TestQuestion.deleteQuestion(question_id);

  if (!testQuestion) {
    throw new BadRequestError(`There was a problem in deleting the test question.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

const getAllQuestions = async (req, res) => {
  const { testId } = req.query;

  const testQuestion = await TestQuestion.getAllQuestions(testId);

  if (!testQuestion) {
    throw new BadRequestError(`There was a problem in getting all the test questions.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

const getQuestion = async (req, res) => {
  const { question_id } = req.params;

  const testQuestion = await TestQuestion.getQuestion(question_id);

  if (!testQuestion) {
    throw new NotFoundError(`The test question you are trying to get does not exist.`);
  }

  res.status(StatusCodes.OK).json(testQuestion);
};

module.exports = { createQuestion, updateQuestion, deleteQuestion, getAllQuestions, getQuestion };
