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
  const { type, specifics, userId } = req.body;

  // check type to be updated
  if (type === "user_session" && specifics === "days_online") {
    // increment points
    const data = await UserAchievement.incrementSessionPoints(userId);

    if (!data) {
      throw new BadRequestError(`Error in updating your achievement points. Try again later.`);
    }

    // check if an achievement is accomplished
    const check = await UserAchievement.checkDaysOnlineAchievement(userId);

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
    return;
  }
};

module.exports = {
  receiveAchievement,
  getUserAchievement,
  getAllUserAchievements,
  checkUserAchievement,
  updateUserAchievements,
};
