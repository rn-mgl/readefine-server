const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Achievement = require("../../../models/achievements/Achievement");

const getAllAchievements = async (req, res) => {
  const { searchFilter, goalRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const achievement = await Achievement.getAllAchievements(
    searchFilter,
    goalRangeFilter,
    sortFilter,
    dateRangeFilter
  );

  if (!achievement) {
    throw new BadRequestError(`Error in getting all achievements. Try again later.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

module.exports = { getAllAchievements };
