const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AnsweredQuestion = require("../../../models/answers/AnsweredQuestion");
const Question = require("../../../models/test/TestQuestion");

const createAnswer = async (req, res) => {
  const { question_id, answer } = req.body;
  const { id } = req.user;

  const ifExist = await Question.getQuestion(question_id);

  if (!ifExist) {
    throw new NotFoundError(`The test question you are trying to answer does not exist.`);
  }

  const answeredQuestion = new AnsweredQuestion(question_id, id, answer);

  const data = await answeredQuestion.createAnswer();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the answer to the test question.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredQuestions = async (req, res) => {
  const { id } = req.user;

  const answeredQuestion = await AnsweredQuestion.getAllAnsweredQuestions(id);

  if (!answeredQuestion) {
    throw new BadRequestError(`There was a problem in getting all your answered questions.`);
  }

  res.status(StatusCodes.OK).json(answeredQuestion);
};

const getAnsweredQuestion = async (req, res) => {
  const { answer_id } = req.params;

  const answeredQuestion = await AnsweredQuestion.getAnsweredQuestion(answer_id);

  if (!answeredQuestion) {
    throw new NotFoundError(`The answered question you are trying to get does not exist.`);
  }

  res.status(StatusCodes.OK).json(answeredQuestion);
};

module.exports = { createAnswer, getAllAnsweredQuestions, getAnsweredQuestion };
