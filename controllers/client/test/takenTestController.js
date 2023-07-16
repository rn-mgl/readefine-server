const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TakenTest = require("../../../models/test/TakenTest");
const AnsweredQuestion = require("../../../models/answers/AnsweredQuestion");
const UserLexile = require("../../../models/users/UserLexile");
const UserAchievement = require("../../../models/achievements/UserAchievement");

const takeTest = async (req, res) => {
  const { id } = req.user;
  const { selectedChoices, testId, score, legibleForGrowth, lexile } = req.body;

  // record test
  const takenTest = new TakenTest(id, testId, score);

  const data = await takenTest.takeTest();

  if (!data) {
    throw new BadRequestError(`Error in recording the test you took. Try again later.`);
  }

  // record answers
  for (let i = 1; i <= 10; i++) {
    const { answer, questionId } = selectedChoices[`choice${i}`];

    const answerQuestion = new AnsweredQuestion(questionId, id, answer, data.insertId);

    const newAnswer = answerQuestion.createAnswer();

    if (!newAnswer) {
      throw new BadRequestError(`Error in recording the answer. Try again later.`);
    }
  }

  // check if user took test within their lexile range
  if (legibleForGrowth) {
    const toAdd = Math.floor(score / 2);

    const userLexile = new UserLexile(id, lexile + toAdd);

    const newLexileRecord = userLexile.createLexile();

    if (!newLexileRecord) {
      throw new BadRequestError(`Error in recording your new lexile. Try again later.`);
    }

    // return to add to make request in front end for user lexile points
    res.status(StatusCodes.OK).json({ toAdd });
    return;
  }

  res.status(StatusCodes.OK).json({ toAdd: 0 });
};

const getAllTakenTests = async (req, res) => {
  const { id } = req.user;
  const { testId } = req.query;

  const takenTest = await TakenTest.getAllTakenTests(id, testId);

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
