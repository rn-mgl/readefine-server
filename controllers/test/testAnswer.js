const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const TestAnswer = require("../../models/test/TestAnswer");

const createAnswer = async (req, res) => {
  const { question_id } = req.params;
  const { id } = req.user;
  const { answer, choice_1, choice_2, choice_3, choice_4 } = req.body;

  const testAnswer = new TestAnswer(
    question_id,
    answer,
    choice_1,
    choice_2,
    choice_3,
    choice_4,
    id
  );

  const data = await testAnswer.createAnswer();

  if (!data) {
    throw new BadRequestError(`Error in creating answer. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateAnswer = async (req, res) => {
  const { answer_id } = req.params;
  const { id } = req.user;
  const { answer, choice_1, choice_2, choice_3, choice_4 } = req.body;

  const testAnswer = await TestAnswer.updateAnswer(
    answer_id,
    answer,
    choice_1,
    choice_2,
    choice_3,
    choice_4,
    id
  );

  if (!testAnswer) {
    throw new BadRequestError(`Error in updating test answer. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

const deleteAnswer = async (req, res) => {
  const { answer_id } = req.params;

  const testAnswer = await TestAnswer.deleteAnswer(answer_id);

  if (!testAnswer) {
    throw new BadRequestError(`Error in deleting test answer. Try again later.`);
  }

  res.status(StatusCodes.OK).json(testAnswer);
};

const getAllAnswers = async (req, res) => {
  const { test_id } = req.params;

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

module.exports = { createAnswer, updateAnswer, deleteAnswer, getAllAnswers, getAnswer };
