const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const AnsweredQuestion = require("../../models/answers/AnsweredQuestion");

const createAnswer = async (req, res) => {
  const { question_id, answer } = req.body;
  const { id } = req.user;

  const answeredQuestion = new AnsweredQuestion(question_id, id, answer);

  const data = await answeredQuestion.createAnswer();

  if (!data) {
    throw new BadRequestError(`Error in answering the question. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllAnsweredQuestions = async (req, res) => {
  const { id } = req.user;

  const answeredQuestion = await AnsweredQuestion.getAllAnsweredQuestions(id);

  if (!answeredQuestion) {
    throw new BadRequestError(`Error in getting all answered questions. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredQuestion);
};

const getAnsweredQuestion = async (req, res) => {
  const { answer_id } = req.params;

  const answeredQuestion = await AnsweredQuestion.getAnsweredQuestion(answer_id);

  if (!answeredQuestion) {
    throw new BadRequestError(`Error in getting answered question. Try again later.`);
  }

  res.status(StatusCodes.OK).json(answeredQuestion);
};

module.exports = { createAnswer, getAllAnsweredQuestions, getAnsweredQuestion };
