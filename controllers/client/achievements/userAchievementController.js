const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const UserAchievement = require("../../../models/achievements/UserAchievement");
const Achievement = require("../../../models/achievements/Achievement");

const receiveAchievement = async (req, res) => {
  const { achievement_id } = req.body;
  const { id } = req.user;

  const ifExist = await Achievement.getAchievement(achievement_id);

  if (!ifExist) {
    throw new NotFoundError(`The achievement you are trying to receive does not exist.`);
  }

  const userAchievement = new UserAchievement(achievement_id, id);

  const data = await userAchievement.receiveAchievement();

  if (!data) {
    throw new BadRequestError(`There was a problem in receiving the achievement.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllUserAchievements = async (req, res) => {
  const { searchFilter, goalRangeFilter, sortFilter } = req.query;
  const { id } = req.user;

  const achievement = await UserAchievement.getAllUserAchievements(
    searchFilter,
    goalRangeFilter,
    sortFilter,
    id
  );

  if (!achievement) {
    throw new BadRequestError(`There was a problem in getting all your achievements.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

const getUserAchievement = async (req, res) => {
  const { user_achievement_id } = req.params;

  const userAchievement = await UserAchievement.getAchievement(user_achievement_id);

  if (!userAchievement) {
    throw new NotFoundError(`The achievement you are trying to get does not exist.`);
  }

  res.status(StatusCodes.OK).json(userAchievement);
};

const updateUserAchievements = async (req, res) => {
  const { type, specifics, toAdd } = req.body;

  const { id } = req.user;

  const TYPES = {
    sessions: type === "user_session" && specifics === "days_online",
    lexile: type === "user_lexile" && specifics === "lexile_growth",
    readCount: type === "read_story" && specifics === "book_count",
    testCount: type === "answered_tests" && specifics === "book_count",
  };

  // increment points
  const data = await UserAchievement.incrementUserAchievementPoints(id, toAdd, type, specifics);

  if (!data) {
    throw new BadRequestError(`There was a problem in updating your achievement.`);
  }

  // check if an achievement is accomplished
  const check = await UserAchievement.checkUserAchievementPoints(id, type, specifics);

  if (!check) {
    throw new BadRequestError(`There was a problem in checking your achievement.`);
  }

  // see those achievements for it to not be repeated
  check?.map(async (achievement) => {
    const seeAchievement = await UserAchievement.seeUserAchievements(
      achievement.user_achievement_id
    );

    if (!seeAchievement) {
      throw new BadRequestError(`There was a problem in viewing your achievements.`);
    }
  });

  // return array of achievements
  res.status(StatusCodes.OK).json(check);
};

module.exports = {
  receiveAchievement,
  getUserAchievement,
  getAllUserAchievements,
  updateUserAchievements,
};
