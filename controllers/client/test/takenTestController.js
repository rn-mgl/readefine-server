const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TakenTest = require("../../../models/test/TakenTest");
const AnsweredQuestion = require("../../../models/answers/AnsweredQuestion");

const takeTest = async (req, res) => {
  const { id } = req.user;
  const { selectedChoices, score } = req.body;
  const { taken_id } = req.params;

  const takenTest = new TakenTest(id, taken_id, score);

  const data = await takenTest.takeTest();

  if (!data) {
    throw new BadRequestError(`Error in recording the test you took. Try again later.`);
  }

  for (let i = 1; i <= 10; i++) {
    const { answer, questionId } = selectedChoices[`choice${i}`];

    const answerQuestion = new AnsweredQuestion(questionId, id, answer);
    const newAnswer = answerQuestion.createAnswer();

    if (!newAnswer) {
      throw new BadRequestError(`Error in recording the answer. Try again later.`);
    }
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllTakenTests = async (req, res) => {
  const { id } = req.user;

  const takenTest = await TakenTest.getAllTakenTests(id);

  if (!takenTest) {
    throw new BadRequestError(`Error in getting all taken tests. Try again later.`);
  }

  res.status(StatusCodes.OK).json(takenTest);
};

const getTakenTest = async (req, res) => {
  const { taken_id } = req.params;

  const takenTest = await TakenTest.getTakenTest(taken_id);

  if (!takenTest) {
    throw new BadRequestError(`Error in getting taken test. Try again later.`);
  }

  res.status(StatusCodes.OK).json(takenTest);
};

module.exports = { takeTest, getAllTakenTests, getTakenTest };
