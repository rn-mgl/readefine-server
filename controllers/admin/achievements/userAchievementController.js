const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const UserAchievement = require("../../../models/achievements/UserAchievement");
const Achievement = require("../../../models/achievements/Achievement");

// not used, maintain

const recieveAchievement = async (req, res) => {
  const { achievement_id } = req.body;
  const { id } = req.user;

  const ifExist = await Achievement.getAchievement(achievement_id);

  if (!ifExist) {
    throw new NotFoundError(`The achievement you are trying to receive does not exist.`);
  }

  const userAchievement = new UserAchievement(achievement_id, id);

  const data = await userAchievement.recieveAchievement();

  if (!data) {
    throw new BadRequestError(`There was a problem in receiving the achievement.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getAllUserAchievements = async (req, res) => {
  const { id } = req.user;

  const userAchievement = await UserAchievement.getAllUserAchievements(id);

  if (!userAchievement) {
    throw new BadRequestError(`There was a problem in getting all the user's achievements.`);
  }

  res.status(StatusCodes.OK).json(userAchievement);
};

const getAllAchievements = async (req, res) => {
  const userAchievement = await UserAchievement.getAllAchievements();

  if (!userAchievement) {
    throw new BadRequestError(`There was a problem in getting all the user's achievements.`);
  }

  res.status(StatusCodes.OK).json(userAchievement);
};

const getAchievement = async (req, res) => {
  const { user_achievement_id } = req.params;
  const userAchievement = await UserAchievement.getAchievement(user_achievement_id);

  if (!userAchievement) {
    throw new NotFoundError(`The achievement you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(userAchievement);
};

module.exports = { recieveAchievement, getAchievement, getAllAchievements, getAllUserAchievements };
