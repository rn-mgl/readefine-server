const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Achievement = require("../../../models/achievements/Achievement");

const getAllUserAchievements = async (req, res) => {
  const { searchFilter, goalRangeFilter, sortFilter } = req.query;

  const achievement = await Achievement.getAllUserAchievements(
    searchFilter,
    goalRangeFilter,
    sortFilter
  );

  if (!achievement) {
    throw new BadRequestError(`Error in getting all achievements. Try again later.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

module.exports = { getAllUserAchievements };
