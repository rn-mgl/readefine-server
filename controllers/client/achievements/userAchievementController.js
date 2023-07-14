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

const getAllUserAchievements = async (req, res) => {};

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

  if (type === "session") {
    const data = await UserAchievement.checkSessionAchievement(user_id);

    if (!data) {
      throw new BadRequestError(`Error in checking achievements. Try again later.`);
    }

    const achievement = data[0];

    if (achievement?.achievement_id) {
      const userAchievement = new UserAchievement(achievement?.achievement_id, user_id);

      const newAchievement = await userAchievement.receiveAchievement();

      if (!newAchievement) {
        throw new BadRequestError(`Error in receiving achievement. Try again later.`);
      }
    }

    res.status(StatusCodes.OK).json(achievement);
    return;
  }
};

module.exports = {
  receiveAchievement,
  getUserAchievement,
  getAllUserAchievements,
  checkUserAchievement,
};
