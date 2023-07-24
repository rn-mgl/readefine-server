const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const UserAchievement = require("../../../models/achievements/UserAchievement");

const receiveAchievement = async (req, res) => {
  const { achievement_id } = req.body;
  const { id } = req.user;

  const userAchievement = new UserAchievement(achievement_id, id);

  const data = await userAchievement.receiveAchievement();

  if (!data) {
    throw new BadRequestError(`Error in receiving achievement. Try again later.`);
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
    throw new BadRequestError(`Error in getting all achievements. Try again later.`);
  }

  res.status(StatusCodes.OK).json(achievement);
};

const getUserAchievement = async (req, res) => {
  const { user_achievement_id } = req.params;
  const userAchievement = await UserAchievement.getAchievement(user_achievement_id);

  if (!userAchievement) {
    throw new BadRequestError(`Error in getting achievement. Try again later.`);
  }

  res.status(StatusCodes.OK).json(userAchievement);
};

const checkUserAchievement = async (req, res) => {
  const { type } = req.query;
  const { user_id } = req.params;

  if (type === "days online") {
    const data = await UserAchievement.checkDaysOnlineAchievement(user_id);

    if (!data) {
      throw new BadRequestError(`Error in checking achievements. Try again later.`);
    }

    res.status(StatusCodes.OK).json(data);
    return;
  }
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
    throw new BadRequestError(`Error in updating your achievement points. Try again later.`);
  }

  // check if an achievement is accomplished
  const check = await UserAchievement.checkUserAchievementPoints(id, type, specifics);

  if (!check) {
    throw new BadRequestError(`Error in checking your achievement points. Try again later.`);
  }

  // see those achievements for it to not be repeated
  check?.map(async (achievement) => {
    const seeAchievement = await UserAchievement.seeUserAchievements(
      achievement.user_achievement_id
    );

    if (!seeAchievement) {
      throw new BadRequestError(`Error in seeing your achievement points. Try again later.`);
    }
  });

  // return array of achievements
  res.status(StatusCodes.OK).json(check);
};

module.exports = {
  receiveAchievement,
  getUserAchievement,
  getAllUserAchievements,
  checkUserAchievement,
  updateUserAchievements,
};
