const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TestAnswer = require("../../../models/test/TestAnswer");
const Test = require("../../../models/test/Test");

const createAnswer = async (req, res) => {
  const { question_id, answer, choice_1, choice_2, choice_3, choice_4 } = req.body;

  const testAnswer = new TestAnswer(question_id, answer, choice_1, choice_2, choice_3, choice_4);

  const data = await testAnswer.createAnswer();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the answer ${answer}.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateAnswer = async (req, res) => {
  const { answer_id } = req.params;
  const { answer, choice_1, choice_2, choice_3, choice_4 } = req.body;

  const ifExist = await TestAnswer.getAnswer(answer_id);

  if (!ifExist) {
    throw new NotFoundError(`The answer you are trying to update does not exist.`);
  }

  const testAnswer = await TestAnswer.updateAnswer(answer_id, answer, choice_1, choice_2, choice_3, choice_4);

  if (!testAnswer) {
    throw new BadRequestError(`There was a problem in trying to update the answer.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

const deleteAnswer = async (req, res) => {
  const { answer_id } = req.params;

  const ifExist = await TestAnswer.getAnswer(answer_id);

  if (!ifExist) {
    throw new NotFoundError(`The answer you are trying to delete does not exist.`);
  }

  const testAnswer = await TestAnswer.deleteAnswer(answer_id);

  if (!testAnswer) {
    throw new BadRequestError(`There was a problem in deleting the test answer.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

const getAllAnswers = async (req, res) => {
  const { test_id } = req.body;

  const ifExist = await Test.getTest(test_id);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to get does not exist.`);
  }

  const testAnswer = await TestAnswer.getAllAnswers(test_id);

  if (!testAnswer) {
    throw new BadRequestError(`There was a problem in getting all the test answers.`);
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

module.exports = { createAnswer, updateAnswer, deleteAnswer, getAllAnswers, getAnswer };
