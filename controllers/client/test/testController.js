const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Test = require("../../../models/test/Test");

const getAllTests = async (req, res) => {
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const test = await Test.getAllTests(searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter);

  if (!test) {
    throw new BadRequestError(`Error in getting all tests. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const getAllUserTests = async (req, res) => {
  const { id } = req.user;
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const test = await Test.getAllUserTests(
    id,
    searchFilter,
    lexileRangeFilter,
    sortFilter,
    dateRangeFilter
  );

  if (!test) {
    throw new BadRequestError(`Error in getting all user's tests. Try again later.`);
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

module.exports = { getAllTests, getTest, getAllUserTests };
