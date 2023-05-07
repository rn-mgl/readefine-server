const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const Test = require("../../models/test/Test");

const createTest = async (req, res) => {
  const { story_id } = req.body;

  const test = new Test(story_id);

  const data = await test.createTest();

  if (!data) {
    throw new BadRequestError(`Error in creating test. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllTests = async (req, res) => {
  const test = await Test.getAllTests();

  if (!test) {
    throw new BadRequestError(`Error in getting all tests. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const getTest = async (req, res) => {
  const { test_id } = req.params;

  const test = await Test.getTest(test_id);

  if (!test) {
    throw new BadRequestError(`Error in getting test. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const deleteTest = async (req, res) => {
  const { test_id } = req.params;

  const test = await Test.deleteTest(test_id);

  if (!test) {
    throw new BadRequestError(`Error in deleting test. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

module.exports = { createTest, getAllTests, getTest, deleteTest };
