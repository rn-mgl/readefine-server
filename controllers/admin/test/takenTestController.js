const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TakenTest = require("../../../models/test/TakenTest");

// not used, maintain

const takeTest = async (req, res) => {
  const { id } = req.user;
  const { test_id } = req.params;

  const takenTest = new TakenTest(id, test_id);

  const data = await takenTest.takeTest();

  if (!data) {
    throw new BadRequestError(`Error in recording the test you took. Try again later.`);
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

const getTakenTestsOfUser = async (req, res) => {
  const { userId, quizMonth } = req.query;

  const takenTest = await TakenTest.getTakenTestsOfUser(userId, quizMonth);

  if (!takenTest) {
    throw new BadRequestError(`Error in getting all taken tests. Try again later.`);
  }

  res.status(StatusCodes.OK).json(takenTest);
};

module.exports = { takeTest, getAllTakenTests, getTakenTestsOfUser };
